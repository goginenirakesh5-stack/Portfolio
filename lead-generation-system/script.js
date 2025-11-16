// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// ===== DOM Elements =====
const leadForm = document.getElementById('leadForm');
const viewLeadsBtn = document.getElementById('viewLeadsBtn');
const closeLeadsBtn = document.getElementById('closeLeadsBtn');
const exportBtn = document.getElementById('exportBtn');
const leadsSection = document.getElementById('leadsSection');
const leadsTableBody = document.getElementById('leadsTableBody');

// ===== Form Submission =====
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = leadForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    // Get form data
    const formData = new FormData(leadForm);
    const leadData = Object.fromEntries(formData.entries());
    
    // Add timestamp
    leadData.created_at = new Date().toISOString();
    
    try {
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Generating Lead...';
        submitBtn.disabled = true;
        
        // Send to API
        const response = await fetch(`${API_BASE_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showToast('Lead generated successfully!', 'success');
            leadForm.reset();
            
            // Refresh leads if section is visible
            if (leadsSection.style.display !== 'none') {
                loadLeads();
            }
        } else {
            showToast(result.error || 'Failed to generate lead', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Connection error. Make sure the API server is running.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ===== View Leads =====
viewLeadsBtn.addEventListener('click', async () => {
    leadsSection.style.display = 'block';
    await loadLeads();
    leadsSection.scrollIntoView({ behavior: 'smooth' });
});

closeLeadsBtn.addEventListener('click', () => {
    leadsSection.style.display = 'none';
});

// ===== Load Leads =====
async function loadLeads() {
    try {
        const response = await fetch(`${API_BASE_URL}/leads`);
        const leads = await response.json();
        
        displayLeads(leads);
        updateStats(leads);
    } catch (error) {
        console.error('Error loading leads:', error);
        showToast('Failed to load leads', 'error');
    }
}

// ===== Display Leads =====
function displayLeads(leads) {
    if (leads.length === 0) {
        leadsTableBody.innerHTML = `
            <tr>
                <td colspan="10" class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-text">No leads found. Generate your first lead!</div>
                </td>
            </tr>
        `;
        return;
    }
    
    leadsTableBody.innerHTML = leads.map(lead => `
        <tr>
            <td>${lead.id}</td>
            <td>${lead.first_name} ${lead.last_name}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
            <td>${lead.company || 'N/A'}</td>
            <td>${lead.industry || 'N/A'}</td>
            <td>${lead.lead_source}</td>
            <td><span class="status-badge status-${lead.status.toLowerCase()}">${lead.status}</span></td>
            <td>${formatDate(lead.created_at)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn action-btn-edit" onclick="editLead(${lead.id})">Edit</button>
                    <button class="action-btn action-btn-delete" onclick="deleteLead(${lead.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ===== Update Statistics =====
function updateStats(leads) {
    document.getElementById('totalLeads').textContent = leads.length;
    document.getElementById('newLeads').textContent = leads.filter(l => l.status === 'New').length;
    document.getElementById('qualifiedLeads').textContent = leads.filter(l => l.status === 'Qualified').length;
    document.getElementById('convertedLeads').textContent = leads.filter(l => l.status === 'Converted').length;
}

// ===== Edit Lead =====
async function editLead(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/leads/${id}`);
        const lead = await response.json();
        
        // Populate form with lead data
        document.getElementById('firstName').value = lead.first_name;
        document.getElementById('lastName').value = lead.last_name;
        document.getElementById('email').value = lead.email;
        document.getElementById('phone').value = lead.phone;
        document.getElementById('company').value = lead.company || '';
        document.getElementById('jobTitle').value = lead.job_title || '';
        document.getElementById('industry').value = lead.industry || '';
        document.getElementById('leadSource').value = lead.lead_source;
        document.getElementById('address').value = lead.address || '';
        document.getElementById('city').value = lead.city || '';
        document.getElementById('state').value = lead.state || '';
        document.getElementById('country').value = lead.country || '';
        document.getElementById('zipCode').value = lead.zip_code || '';
        document.getElementById('notes').value = lead.notes || '';
        document.getElementById('status').value = lead.status;
        
        // Change form to update mode
        const submitBtn = leadForm.querySelector('.btn-submit');
        submitBtn.textContent = 'Update Lead';
        submitBtn.dataset.mode = 'update';
        submitBtn.dataset.id = id;
        
        // Update form submission handler
        leadForm.onsubmit = async (e) => {
            e.preventDefault();
            await updateLead(id);
        };
        
        // Scroll to form
        leadForm.scrollIntoView({ behavior: 'smooth' });
        showToast('Lead loaded for editing', 'success');
    } catch (error) {
        console.error('Error loading lead:', error);
        showToast('Failed to load lead', 'error');
    }
}

// ===== Update Lead =====
async function updateLead(id) {
    const formData = new FormData(leadForm);
    const leadData = Object.fromEntries(formData.entries());
    
    try {
        const submitBtn = leadForm.querySelector('.btn-submit');
        submitBtn.innerHTML = '<span class="loading"></span> Updating...';
        submitBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showToast('Lead updated successfully!', 'success');
            leadForm.reset();
            submitBtn.textContent = 'Generate Lead';
            submitBtn.removeAttribute('data-mode');
            submitBtn.removeAttribute('data-id');
            
            // Restore original form handler
            leadForm.onsubmit = async (e) => {
                e.preventDefault();
                // Original submission logic
            };
            
            // Reload leads
            await loadLeads();
        } else {
            showToast(result.error || 'Failed to update lead', 'error');
        }
    } catch (error) {
        console.error('Error updating lead:', error);
        showToast('Failed to update lead', 'error');
    } finally {
        const submitBtn = leadForm.querySelector('.btn-submit');
        submitBtn.textContent = 'Generate Lead';
        submitBtn.disabled = false;
    }
}

// ===== Delete Lead =====
async function deleteLead(id) {
    if (!confirm('Are you sure you want to delete this lead?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('Lead deleted successfully!', 'success');
            await loadLeads();
        } else {
            const result = await response.json();
            showToast(result.error || 'Failed to delete lead', 'error');
        }
    } catch (error) {
        console.error('Error deleting lead:', error);
        showToast('Failed to delete lead', 'error');
    }
}

// ===== Export to Excel =====
exportBtn.addEventListener('click', async () => {
    try {
        exportBtn.innerHTML = '<span class="loading"></span> Exporting...';
        exportBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/leads/export`);
        
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `leads_export_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showToast('Leads exported to Excel successfully!', 'success');
        } else {
            showToast('Failed to export leads', 'error');
        }
    } catch (error) {
        console.error('Error exporting leads:', error);
        showToast('Failed to export leads. Make sure the API server is running.', 'error');
    } finally {
        exportBtn.innerHTML = 'Export to Excel';
        exportBtn.disabled = false;
    }
});

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Format Date =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Lead Generation System loaded');
    
    // Check API connection
    checkAPIConnection();
});

async function checkAPIConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('API connection successful');
        }
    } catch (error) {
        console.warn('API server not running. Please start the Flask server.');
        showToast('API server not connected. Please start the Flask server.', 'warning');
    }
}

