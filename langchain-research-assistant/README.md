# 🤖 AI Research Assistant - LangChain & LangGraph

A sophisticated AI-powered research assistant that uses LangChain for document Q&A and LangGraph for complex research workflows.

## ✨ Features

- **Document Q&A**: Upload documents (PDF, TXT, MD) and ask questions using RAG (Retrieval Augmented Generation)
- **Research Mode**: Advanced LangGraph workflow that breaks down complex queries into research steps
- **Vector Store**: Uses FAISS for efficient document retrieval
- **LangChain Integration**: Leverages LangChain for document processing and Q&A chains
- **LangGraph Workflow**: Multi-step research process with state management

## 🛠️ Technologies

- **LangChain**: Document processing, RAG, and Q&A chains
- **LangGraph**: Workflow orchestration and state management
- **OpenAI GPT**: Language model for Q&A and research synthesis
- **FAISS**: Vector database for document embeddings
- **Flask**: Backend API server
- **Python**: Core programming language

## 📋 Prerequisites

- Python 3.8+
- OpenAI API key
- pip package manager

## 🚀 Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd langchain-research-assistant
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## 🎯 Usage

1. **Start the Flask server**
   ```bash
   python app.py
   ```

2. **Open your browser**
   Navigate to: `http://localhost:5002`

3. **Upload a document**
   - Click the upload area or drag and drop a file
   - Supported formats: PDF, TXT, MD

4. **Ask questions**
   - **Simple Q&A**: Direct question-answering using RAG
   - **Research Mode**: Advanced LangGraph workflow that:
     - Analyzes your query
     - Breaks it into research steps
     - Gathers information for each step
     - Synthesizes a comprehensive answer

## 📖 How It Works

### Simple Q&A Mode
1. Document is split into chunks
2. Chunks are embedded using OpenAI embeddings
3. FAISS vector store is created
4. Query retrieves relevant chunks
5. LLM generates answer based on retrieved context

### Research Mode (LangGraph)
1. **Analyze Query**: LLM breaks down query into research steps
2. **Gather Information**: For each step, retrieve relevant information
3. **Synthesize**: Combine all findings into comprehensive answer

## 🔧 Configuration

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Model Settings
You can modify the LLM settings in `app.py`:
```python
llm = ChatOpenAI(
    temperature=0.7,  # Adjust creativity (0-1)
    model_name="gpt-3.5-turbo",  # or "gpt-4"
)
```

## 📁 Project Structure

```
langchain-research-assistant/
├── app.py                 # Flask backend with LangChain/LangGraph
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Frontend HTML
└── static/
    ├── styles.css        # Styling
    └── script.js         # Frontend JavaScript
```

## 🎨 Features Explained

### LangChain Components
- **Document Loaders**: Load PDF, TXT, MD files
- **Text Splitters**: Chunk documents for processing
- **Embeddings**: Convert text to vectors
- **Vector Stores**: FAISS for similarity search
- **RetrievalQA**: Q&A chain with document retrieval

### LangGraph Workflow
- **State Management**: TypedDict for structured state
- **Nodes**: Individual processing steps
- **Edges**: Control flow between nodes
- **Conditional Logic**: Dynamic workflow routing

## 🐛 Troubleshooting

### "No documents loaded" error
- Make sure you've uploaded a document before querying
- Check file format (PDF, TXT, MD only)

### API Key errors
- Verify your OpenAI API key is set in `.env`
- Check that the key has sufficient credits

### Import errors
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check Python version (3.8+ required)

## 📝 API Endpoints

- `POST /api/upload`: Upload and process documents
- `POST /api/query`: Simple Q&A query
- `POST /api/research`: Research query using LangGraph

## 🔒 Security Notes

- Never commit your `.env` file with API keys
- Keep your OpenAI API key secure
- Consider rate limiting for production use

## 🚀 Future Enhancements

- [ ] Support for more file formats
- [ ] Multi-document research
- [ ] Conversation history
- [ ] Export research reports
- [ ] Custom LangGraph workflows

## 📄 License

This project is part of the portfolio showcase.

## 👨‍💻 Author

**Rakesh Babu Gogineni**
- Portfolio: https://glistening-moonbeam-3cb84b.netlify.app/
- Email: goginenirakesh5@gmail.com

---

Built with ❤️ using LangChain & LangGraph

