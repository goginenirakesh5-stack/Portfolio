# 🏠 Airbnb Listing Finder Agent

An AI-powered agent that helps users find the perfect Airbnb listings using natural language queries. Built with Python Flask backend and modern JavaScript frontend.

## ✨ Features

- **Natural Language Processing**: Search using conversational queries like "Find a cozy apartment in New York under $150"
- **AI-Powered Matching**: Intelligent algorithm that matches listings based on multiple criteria
- **Smart Search**: Extracts location, price range, bedrooms, guests, and amenities from natural language
- **Real-time Results**: Fast search with instant results display
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Match Scoring**: Shows how well each listing matches your criteria

## 🛠️ Technologies

- **Backend**: Python 3.x, Flask, Flask-CORS
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI/ML**: Natural Language Processing for query understanding
- **Architecture**: RESTful API design

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd airbnb-listing-finder-agent
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   - Navigate to: `http://localhost:5001`
   - Start searching for listings!

## 📖 Usage Examples

### Example Queries

- "Find a beachfront villa in Miami with pool"
- "2 bedroom apartment under $200"
- "Luxury penthouse in Los Angeles"
- "Cozy apartment in New York with WiFi and kitchen"
- "Family-friendly house with 4 bedrooms"

### How It Works

1. **Enter your query** in natural language
2. **AI Agent parses** your query to extract:
   - Location preferences
   - Price range
   - Number of bedrooms/guests
   - Desired amenities
   - Keywords (cozy, luxury, etc.)
3. **Search algorithm** matches listings based on criteria
4. **Results displayed** with match scores and details

## 🎯 API Endpoints

### POST `/api/search`
Search for listings using natural language query.

**Request:**
```json
{
  "query": "Find a cozy apartment in New York under $150"
}
```

**Response:**
```json
{
  "success": true,
  "query": "Find a cozy apartment in New York under $150",
  "criteria": {
    "location": "New York",
    "max_price": 150,
    "amenities": ["WiFi", "Kitchen"],
    "keywords": ["cozy"]
  },
  "results": [...],
  "count": 3
}
```

### GET `/api/listings`
Get all available listings.

**Response:**
```json
{
  "success": true,
  "listings": [...],
  "count": 8
}
```

## 🏗️ Project Structure

```
airbnb-listing-finder-agent/
├── app.py                 # Flask backend application
├── requirements.txt      # Python dependencies
├── templates/
│   └── index.html        # Frontend HTML
├── styles.css            # Frontend styles
├── script.js             # Frontend JavaScript
├── README.md             # This file
├── start.bat             # Windows startup script
└── start.sh              # Linux/Mac startup script
```

## 🔧 Configuration

### Port Configuration
Default port is `5001`. To change it, edit `app.py`:

```python
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change port here
```

### Adding More Listings
Edit the `MOCK_LISTINGS` array in `app.py` to add more listings.

## 🎨 Customization

### Styling
Edit `styles.css` to customize the appearance:
- Colors: Modify CSS variables in `:root`
- Layout: Adjust grid and spacing
- Animations: Customize transitions

### Search Algorithm
Modify the `AirbnbAgent` class in `app.py` to:
- Adjust match scoring weights
- Add new criteria parsing
- Implement different search strategies

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production Deployment
1. Use a production WSGI server (Gunicorn, uWSGI)
2. Set up environment variables
3. Configure reverse proxy (Nginx)
4. Enable HTTPS

Example with Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

## 📊 Features Explained

### Natural Language Processing
The agent uses regex patterns and keyword matching to extract:
- **Locations**: City names
- **Prices**: "under $X", "over $Y", "$X-$Y"
- **Bedrooms**: "2 bedroom", "3 bedrooms"
- **Guests**: "4 guests", "for 6 people"
- **Amenities**: WiFi, Pool, Kitchen, etc.
- **Keywords**: Cozy, Luxury, Beachfront, etc.

### Match Scoring Algorithm
Listings are scored based on:
- Location match: +10 points
- Price range match: Required (filtered out if doesn't match)
- Bedrooms/Guests: +5 points each
- Amenities: +2 points per match
- Keywords: +3 points per match
- Rating: +2 points per star

## 🐛 Troubleshooting

### Port Already in Use
If port 5001 is busy, change it in `app.py`:
```python
app.run(debug=True, port=5002)  # Use different port
```

### Dependencies Not Installing
Make sure you're using Python 3.7+:
```bash
python --version
```

### CORS Issues
If you encounter CORS errors, Flask-CORS is already configured. Check that it's installed:
```bash
pip install flask-cors
```

## 🔮 Future Enhancements

- [ ] Integration with real Airbnb API
- [ ] Machine Learning for better query understanding
- [ ] User authentication and saved searches
- [ ] Advanced filtering options
- [ ] Map view integration
- [ ] Booking functionality
- [ ] Multi-language support
- [ ] Voice search capability

## 📝 License

This project is part of a portfolio demonstration.

## 👤 Author

**Rakesh Babu Gogineni**
- Email: goginenirakesh5@gmail.com
- GitHub: [@goginenirakesh5-stack](https://github.com/goginenirakesh5-stack)
- Portfolio: [View Portfolio](https://goginenirakesh5-stack.github.io/Portfolio/)

---

Built with ❤️ using Python Flask and modern web technologies.

