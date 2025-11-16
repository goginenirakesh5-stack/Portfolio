// Airbnb Listing Finder Agent - Frontend JavaScript

const API_BASE_URL = window.location.origin;

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const exampleBtns = document.querySelectorAll('.example-btn');
const loading = document.getElementById('loading');
const resultsSection = document.getElementById('results-section');
const resultsGrid = document.getElementById('results-grid');
const resultsTitle = document.getElementById('results-title');
const resultsCount = document.getElementById('results-count');
const noResults = document.getElementById('no-results');
const errorDiv = document.getElementById('error');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        searchInput.value = query;
        handleSearch();
    });
});

// Search Handler
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('Please enter a search query');
        return;
    }
    
    // Hide previous results
    hideAllSections();
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Search failed');
        }
        
        hideLoading();
        
        if (data.results && data.results.length > 0) {
            displayResults(data);
        } else {
            showNoResults();
        }
        
    } catch (error) {
        console.error('Search error:', error);
        hideLoading();
        showError(error.message || 'An error occurred. Please try again.');
    }
}

// Display Results
function displayResults(data) {
    resultsTitle.textContent = `Found ${data.count} listing${data.count !== 1 ? 's' : ''}`;
    resultsCount.textContent = `for "${data.query}"`;
    
    resultsGrid.innerHTML = '';
    
    data.results.forEach(listing => {
        const card = createListingCard(listing);
        resultsGrid.appendChild(card);
    });
    
    resultsSection.classList.remove('hidden');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Create Listing Card
function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    
    const matchScore = listing.match_score || 0;
    const matchPercentage = Math.min(100, Math.round((matchScore / 50) * 100));
    
    card.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}" class="listing-image" onerror="this.src='https://via.placeholder.com/400x220?text=No+Image'">
        <div class="listing-content">
            <div class="listing-header">
                <div>
                    <h3 class="listing-title">${listing.title}</h3>
                    <p class="listing-location">📍 ${listing.location}</p>
                </div>
                <div class="listing-rating">
                    <span class="star">⭐</span>
                    <span>${listing.rating}</span>
                    <span style="color: #717171; font-size: 0.85rem;">(${listing.reviews})</span>
                    ${matchScore > 20 ? `<span class="match-badge">${matchPercentage}% Match</span>` : ''}
                </div>
            </div>
            <p style="color: #717171; font-size: 0.9rem; margin-bottom: 1rem;">${listing.description}</p>
            <div class="listing-details">
                <div class="listing-detail">
                    <span>🛏️</span>
                    <span>${listing.bedrooms} bed${listing.bedrooms !== 1 ? 's' : ''}</span>
                </div>
                <div class="listing-detail">
                    <span>🚿</span>
                    <span>${listing.bathrooms} bath${listing.bathrooms !== 1 ? 's' : ''}</span>
                </div>
                <div class="listing-detail">
                    <span>👥</span>
                    <span>${listing.guests} guest${listing.guests !== 1 ? 's' : ''}</span>
                </div>
            </div>
            <div class="listing-amenities">
                ${listing.amenities.slice(0, 4).map(amenity => 
                    `<span class="amenity-tag">${amenity}</span>`
                ).join('')}
                ${listing.amenities.length > 4 ? `<span class="amenity-tag">+${listing.amenities.length - 4} more</span>` : ''}
            </div>
            <div class="listing-price">
                $${listing.price}
                <span>/ night</span>
            </div>
        </div>
    `;
    
    // Add click handler (could open booking page or show details)
    card.addEventListener('click', () => {
        alert(`Selected: ${listing.title}\n\nThis is a demo. In a real application, this would open the booking page.`);
    });
    
    return card;
}

// UI Helper Functions
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showNoResults() {
    noResults.classList.remove('hidden');
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}

function hideAllSections() {
    loading.classList.add('hidden');
    resultsSection.classList.add('hidden');
    noResults.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

// Initialize - Load all listings on page load (optional)
window.addEventListener('load', () => {
    // You can load initial listings here if needed
    console.log('Airbnb Listing Finder Agent loaded');
});

