"""
AI Research Assistant using LangChain and LangGraph
A sophisticated document Q&A system with research workflow capabilities
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from typing import Dict, List, Any
import json

# LangChain imports
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.schema import Document

# LangGraph imports
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from typing_extensions import TypedDict, Annotated
import operator

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'md'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize LLM and embeddings
llm = ChatOpenAI(
    temperature=0.7,
    model_name="gpt-3.5-turbo",
    openai_api_key=os.getenv("OPENAI_API_KEY", "")
)

embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY", ""))

# Global vector store
vector_store = None
qa_chain = None


# LangGraph State Definition
class ResearchState(TypedDict):
    query: str
    documents: List[Document]
    research_steps: List[str]
    findings: List[str]
    final_answer: str
    current_step: int


# LangGraph Node Functions
def analyze_query(state: ResearchState) -> ResearchState:
    """Analyze the research query and determine research steps"""
    query = state["query"]
    
    # Use LLM to break down the query into research steps
    analysis_prompt = f"""
    Analyze this research query and break it down into 3-5 specific research steps:
    Query: {query}
    
    Return a JSON list of research steps as strings.
    Example: ["Understand the core concept", "Find relevant examples", "Identify key applications"]
    """
    
    response = llm.invoke(analysis_prompt)
    steps = json.loads(response.content) if isinstance(response.content, str) else []
    
    state["research_steps"] = steps if isinstance(steps, list) else [steps]
    state["current_step"] = 0
    return state


def gather_information(state: ResearchState) -> ResearchState:
    """Gather information from documents using RAG"""
    query = state["query"]
    current_step = state["current_step"]
    research_steps = state["research_steps"]
    
    if current_step < len(research_steps):
        step_query = f"{query}. Focus on: {research_steps[current_step]}"
        
        if vector_store and qa_chain:
            try:
                result = qa_chain.invoke({"query": step_query})
                finding = result.get("result", "No information found")
            except Exception as e:
                finding = f"Error retrieving information: {str(e)}"
        else:
            finding = "No documents loaded. Please upload documents first."
        
        state["findings"].append(f"Step {current_step + 1}: {finding}")
        state["current_step"] += 1
    
    return state


def synthesize_answer(state: ResearchState) -> ResearchState:
    """Synthesize final answer from all findings"""
    query = state["query"]
    findings = state["findings"]
    
    synthesis_prompt = f"""
    Based on the following research findings, provide a comprehensive answer to the query.
    
    Query: {query}
    
    Findings:
    {chr(10).join(findings)}
    
    Provide a well-structured, comprehensive answer that synthesizes all the findings.
    """
    
    response = llm.invoke(synthesis_prompt)
    state["final_answer"] = response.content if hasattr(response, 'content') else str(response)
    
    return state


# Build LangGraph Workflow
def create_research_graph():
    """Create the LangGraph workflow for research"""
    workflow = StateGraph(ResearchState)
    
    # Add nodes
    workflow.add_node("analyze", analyze_query)
    workflow.add_node("gather", gather_information)
    workflow.add_node("synthesize", synthesize_answer)
    
    # Define edges
    workflow.set_entry_point("analyze")
    workflow.add_edge("analyze", "gather")
    
    # Conditional edge: continue gathering or synthesize
    def should_continue(state: ResearchState) -> str:
        if state["current_step"] < len(state["research_steps"]):
            return "gather"
        return "synthesize"
    
    workflow.add_conditional_edges(
        "gather",
        should_continue,
        {
            "gather": "gather",
            "synthesize": "synthesize"
        }
    )
    
    workflow.add_edge("synthesize", END)
    
    return workflow.compile()


# Initialize research graph
research_graph = create_research_graph()


@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')


@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file upload and create vector store"""
    global vector_store, qa_chain
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        try:
            filepath = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(filepath)
            
            # Load and process document
            if filepath.endswith('.pdf'):
                loader = PyPDFLoader(filepath)
            else:
                loader = TextLoader(filepath)
            
            documents = loader.load()
            
            # Split documents
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200
            )
            splits = text_splitter.split_documents(documents)
            
            # Create vector store
            vector_store = FAISS.from_documents(splits, embeddings)
            
            # Create QA chain
            qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff",
                retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
                return_source_documents=True
            )
            
            return jsonify({
                'message': 'File uploaded and processed successfully',
                'chunks': len(splits)
            })
        except Exception as e:
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400


@app.route('/api/query', methods=['POST'])
def query_documents():
    """Handle simple Q&A query"""
    global qa_chain
    
    data = request.json
    query = data.get('query', '')
    
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    
    if not qa_chain:
        return jsonify({
            'error': 'No documents loaded. Please upload a document first.',
            'answer': None
        }), 400
    
    try:
        result = qa_chain.invoke({"query": query})
        answer = result.get("result", "No answer found")
        sources = []
        
        if "source_documents" in result:
            sources = [doc.page_content[:200] for doc in result["source_documents"]]
        
        return jsonify({
            'answer': answer,
            'sources': sources
        })
    except Exception as e:
        return jsonify({'error': f'Error processing query: {str(e)}'}), 500


@app.route('/api/research', methods=['POST'])
def research_query():
    """Handle research query using LangGraph workflow"""
    global vector_store, qa_chain
    
    data = request.json
    query = data.get('query', '')
    
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    
    if not vector_store or not qa_chain:
        return jsonify({
            'error': 'No documents loaded. Please upload a document first.',
            'answer': None
        }), 400
    
    try:
        # Initialize state
        initial_state: ResearchState = {
            "query": query,
            "documents": [],
            "research_steps": [],
            "findings": [],
            "final_answer": "",
            "current_step": 0
        }
        
        # Run the research graph
        result = research_graph.invoke(initial_state)
        
        return jsonify({
            'answer': result.get('final_answer', 'No answer generated'),
            'research_steps': result.get('research_steps', []),
            'findings': result.get('findings', [])
        })
    except Exception as e:
        return jsonify({'error': f'Error processing research query: {str(e)}'}), 500


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    app.run(debug=True, port=5002)

