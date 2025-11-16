// API Base URL
const API_BASE = '';

// DOM Elements
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const uploadStatus = document.getElementById('upload-status');
const queryInput = document.getElementById('query-input');
const simpleQueryBtn = document.getElementById('simple-query-btn');
const researchBtn = document.getElementById('research-btn');
const resultsSection = document.getElementById('results-section');
const resultsContent = document.getElementById('results-content');
const researchSteps = document.getElementById('research-steps');
const stepsContent = document.getElementById('steps-content');

// File Upload Handling
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#6366f1';
    uploadArea.style.background = 'rgba(99, 102, 241, 0.1)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '';
    uploadArea.style.background = '';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '';
    uploadArea.style.background = '';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    uploadStatus.textContent = 'Uploading...';
    uploadStatus.className = 'status-message';
    uploadStatus.style.display = 'block';
    
    try {
        const response = await fetch(`${API_BASE}/api/upload`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            uploadStatus.textContent = `✓ ${data.message} (${data.chunks} chunks processed)`;
            uploadStatus.className = 'status-message success';
        } else {
            uploadStatus.textContent = `✗ ${data.error}`;
            uploadStatus.className = 'status-message error';
        }
    } catch (error) {
        uploadStatus.textContent = `✗ Error: ${error.message}`;
        uploadStatus.className = 'status-message error';
    }
}

// Simple Query Handler
simpleQueryBtn.addEventListener('click', async () => {
    const query = queryInput.value.trim();
    
    if (!query) {
        alert('Please enter a question');
        return;
    }
    
    simpleQueryBtn.disabled = true;
    simpleQueryBtn.innerHTML = '<span class="loading"></span> Processing...';
    resultsSection.style.display = 'block';
    resultsContent.innerHTML = '<div class="loading"></div> Processing your query...';
    researchSteps.style.display = 'none';
    
    try {
        const response = await fetch(`${API_BASE}/api/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            let html = `<h3>Answer:</h3><p>${data.answer}</p>`;
            
            if (data.sources && data.sources.length > 0) {
                html += `<h4 style="margin-top: 1.5rem;">Sources:</h4>`;
                data.sources.forEach((source, idx) => {
                    html += `<div style="margin-top: 0.5rem; padding: 0.75rem; background: var(--bg); border-radius: 8px; font-size: 0.9rem; color: var(--text-secondary);">${source}...</div>`;
                });
            }
            
            resultsContent.innerHTML = html;
        } else {
            resultsContent.innerHTML = `<p style="color: var(--error);">Error: ${data.error}</p>`;
        }
    } catch (error) {
        resultsContent.innerHTML = `<p style="color: var(--error);">Error: ${error.message}</p>`;
    } finally {
        simpleQueryBtn.disabled = false;
        simpleQueryBtn.textContent = 'Simple Q&A';
    }
});

// Research Query Handler (LangGraph)
researchBtn.addEventListener('click', async () => {
    const query = queryInput.value.trim();
    
    if (!query) {
        alert('Please enter a research question');
        return;
    }
    
    researchBtn.disabled = true;
    researchBtn.innerHTML = '<span class="loading"></span> Researching...';
    resultsSection.style.display = 'block';
    resultsContent.innerHTML = '<div class="loading"></div> Running LangGraph research workflow...';
    researchSteps.style.display = 'block';
    stepsContent.innerHTML = '<p>Initializing research process...</p>';
    
    try {
        const response = await fetch(`${API_BASE}/api/research`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Display research steps
            if (data.research_steps && data.research_steps.length > 0) {
                let stepsHtml = '<h4>Research Steps:</h4>';
                data.research_steps.forEach((step, idx) => {
                    stepsHtml += `<div class="step-item"><span class="step-number">${idx + 1}.</span>${step}</div>`;
                });
                stepsContent.innerHTML = stepsHtml;
            }
            
            // Display findings
            if (data.findings && data.findings.length > 0) {
                let findingsHtml = '<h4 style="margin-top: 1rem;">Findings:</h4>';
                data.findings.forEach((finding, idx) => {
                    findingsHtml += `<div class="step-item" style="margin-top: 0.5rem;">${finding}</div>`;
                });
                stepsContent.innerHTML += findingsHtml;
            }
            
            // Display final answer
            resultsContent.innerHTML = `<h3>Research Summary:</h3><p style="line-height: 1.8;">${data.answer}</p>`;
        } else {
            resultsContent.innerHTML = `<p style="color: var(--error);">Error: ${data.error}</p>`;
        }
    } catch (error) {
        resultsContent.innerHTML = `<p style="color: var(--error);">Error: ${error.message}</p>`;
    } finally {
        researchBtn.disabled = false;
        researchBtn.textContent = 'Research Mode (LangGraph)';
    }
});

// Allow Enter key for queries
queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        simpleQueryBtn.click();
    }
});

