"""
Airbnb Listing Finder Agent
An AI-powered agent that helps users find the perfect Airbnb listings using natural language queries.
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import re
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)

# Mock Airbnb listings database
MOCK_LISTINGS = [
    {
        "id": 1,
        "title": "Cozy Downtown Apartment",
        "location": "New York, NY",
        "price": 120,
        "rating": 4.8,
        "reviews": 234,
        "bedrooms": 2,
        "bathrooms": 1,
        "guests": 4,
        "amenities": ["WiFi", "Kitchen", "Air Conditioning", "Washer"],
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
        "description": "Beautiful apartment in the heart of downtown with modern amenities."
    },
    {
        "id": 2,
        "title": "Beachfront Villa",
        "location": "Miami, FL",
        "price": 250,
        "rating": 4.9,
        "reviews": 156,
        "bedrooms": 3,
        "bathrooms": 2,
        "guests": 6,
        "amenities": ["WiFi", "Pool", "Beach Access", "Parking", "Kitchen"],
        "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        "description": "Stunning beachfront villa with private pool and direct beach access."
    },
    {
        "id": 3,
        "title": "Mountain Cabin Retreat",
        "location": "Aspen, CO",
        "price": 180,
        "rating": 4.7,
        "reviews": 89,
        "bedrooms": 2,
        "bathrooms": 1,
        "guests": 4,
        "amenities": ["WiFi", "Fireplace", "Mountain View", "Hot Tub", "Kitchen"],
        "image": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
        "description": "Peaceful mountain cabin with breathtaking views and modern comforts."
    },
    {
        "id": 4,
        "title": "Modern Loft in Soho",
        "location": "New York, NY",
        "price": 200,
        "rating": 4.6,
        "reviews": 312,
        "bedrooms": 1,
        "bathrooms": 1,
        "guests": 2,
        "amenities": ["WiFi", "Kitchen", "Gym Access", "Rooftop", "Washer"],
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        "description": "Stylish loft in trendy Soho neighborhood with rooftop access."
    },
    {
        "id": 5,
        "title": "Luxury Penthouse Suite",
        "location": "Los Angeles, CA",
        "price": 350,
        "rating": 4.9,
        "reviews": 201,
        "bedrooms": 3,
        "bathrooms": 2,
        "guests": 6,
        "amenities": ["WiFi", "Pool", "Gym", "Concierge", "Parking", "Kitchen"],
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400",
        "description": "Ultra-luxury penthouse with panoramic city views and premium amenities."
    },
    {
        "id": 6,
        "title": "Charming Studio Apartment",
        "location": "San Francisco, CA",
        "price": 95,
        "rating": 4.5,
        "reviews": 178,
        "bedrooms": 0,
        "bathrooms": 1,
        "guests": 2,
        "amenities": ["WiFi", "Kitchen", "Washer"],
        "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
        "description": "Cozy studio perfect for couples, located in vibrant neighborhood."
    },
    {
        "id": 7,
        "title": "Family-Friendly House",
        "location": "Orlando, FL",
        "price": 150,
        "rating": 4.8,
        "reviews": 267,
        "bedrooms": 4,
        "bathrooms": 2,
        "guests": 8,
        "amenities": ["WiFi", "Pool", "Kitchen", "Parking", "Washer", "TV"],
        "image": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
        "description": "Spacious family home near theme parks with private pool."
    },
    {
        "id": 8,
        "title": "Historic Brownstone",
        "location": "Boston, MA",
        "price": 175,
        "rating": 4.7,
        "reviews": 145,
        "bedrooms": 2,
        "bathrooms": 1,
        "guests": 4,
        "amenities": ["WiFi", "Kitchen", "Fireplace", "Washer"],
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        "description": "Beautifully restored historic brownstone with original character."
    }
]


class AirbnbAgent:
    """AI Agent for finding Airbnb listings based on natural language queries"""
    
    def __init__(self):
        self.listings = MOCK_LISTINGS
    
    def parse_query(self, query):
        """Parse natural language query to extract search criteria"""
        query_lower = query.lower()
        criteria = {
            "location": None,
            "max_price": None,
            "min_price": None,
            "bedrooms": None,
            "guests": None,
            "amenities": [],
            "keywords": []
        }
        
        # Extract location
        locations = ["new york", "miami", "aspen", "los angeles", "san francisco", "orlando", "boston"]
        for loc in locations:
            if loc in query_lower:
                criteria["location"] = loc.title()
                break
        
        # Extract price range
        price_patterns = [
            (r'under\s*\$?(\d+)', 'max_price'),
            (r'less than\s*\$?(\d+)', 'max_price'),
            (r'below\s*\$?(\d+)', 'max_price'),
            (r'over\s*\$?(\d+)', 'min_price'),
            (r'more than\s*\$?(\d+)', 'min_price'),
            (r'above\s*\$?(\d+)', 'min_price'),
            (r'\$?(\d+)\s*-\s*\$?(\d+)', 'range'),
        ]
        
        for pattern, ptype in price_patterns:
            match = re.search(pattern, query_lower)
            if match:
                if ptype == 'max_price':
                    criteria["max_price"] = int(match.group(1))
                elif ptype == 'min_price':
                    criteria["min_price"] = int(match.group(1))
                elif ptype == 'range':
                    criteria["min_price"] = int(match.group(1))
                    criteria["max_price"] = int(match.group(2))
        
        # Extract bedrooms
        bedroom_match = re.search(r'(\d+)\s*bedroom', query_lower)
        if bedroom_match:
            criteria["bedrooms"] = int(bedroom_match.group(1))
        
        # Extract guests
        guest_match = re.search(r'(\d+)\s*(?:guest|people|person)', query_lower)
        if guest_match:
            criteria["guests"] = int(guest_match.group(1))
        
        # Extract amenities
        amenity_keywords = {
            "pool": "Pool",
            "wifi": "WiFi",
            "kitchen": "Kitchen",
            "parking": "Parking",
            "beach": "Beach Access",
            "fireplace": "Fireplace",
            "gym": "Gym",
            "hot tub": "Hot Tub",
            "washer": "Washer"
        }
        
        for keyword, amenity in amenity_keywords.items():
            if keyword in query_lower:
                criteria["amenities"].append(amenity)
        
        # Extract keywords
        keywords = ["cozy", "luxury", "beachfront", "downtown", "mountain", "family", "studio", "penthouse"]
        for keyword in keywords:
            if keyword in query_lower:
                criteria["keywords"].append(keyword)
        
        return criteria
    
    def search_listings(self, criteria):
        """Search listings based on criteria"""
        results = []
        
        for listing in self.listings:
            match_score = 0
            
            # Location match
            if criteria["location"]:
                if criteria["location"].lower() in listing["location"].lower():
                    match_score += 10
                else:
                    continue  # Skip if location doesn't match
            
            # Price match
            if criteria["max_price"] and listing["price"] > criteria["max_price"]:
                continue
            if criteria["min_price"] and listing["price"] < criteria["min_price"]:
                continue
            
            # Bedrooms match
            if criteria["bedrooms"] is not None:
                if listing["bedrooms"] >= criteria["bedrooms"]:
                    match_score += 5
                else:
                    continue
            
            # Guests match
            if criteria["guests"]:
                if listing["guests"] >= criteria["guests"]:
                    match_score += 5
                else:
                    continue
            
            # Amenities match
            if criteria["amenities"]:
                matched_amenities = sum(1 for a in criteria["amenities"] if a in listing["amenities"])
                match_score += matched_amenities * 2
            
            # Keywords match
            listing_text = f"{listing['title']} {listing['description']}".lower()
            matched_keywords = sum(1 for k in criteria["keywords"] if k in listing_text)
            match_score += matched_keywords * 3
            
            # Rating boost
            match_score += listing["rating"] * 2
            
            if match_score > 0:
                listing_copy = listing.copy()
                listing_copy["match_score"] = match_score
                results.append(listing_copy)
        
        # Sort by match score
        results.sort(key=lambda x: x["match_score"], reverse=True)
        
        return results[:10]  # Return top 10 results


# Initialize agent
agent = AirbnbAgent()


@app.route('/')
def index():
    """Render main page"""
    return render_template('index.html')


@app.route('/api/search', methods=['POST'])
def search():
    """API endpoint for searching listings"""
    try:
        data = request.json
        query = data.get('query', '')
        
        if not query:
            return jsonify({"error": "Query is required"}), 400
        
        # Parse query using AI agent
        criteria = agent.parse_query(query)
        
        # Search listings
        results = agent.search_listings(criteria)
        
        return jsonify({
            "success": True,
            "query": query,
            "criteria": criteria,
            "results": results,
            "count": len(results)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/listings', methods=['GET'])
def get_all_listings():
    """Get all available listings"""
    return jsonify({
        "success": True,
        "listings": MOCK_LISTINGS,
        "count": len(MOCK_LISTINGS)
    })


if __name__ == '__main__':
    app.run(debug=True, port=5001)

