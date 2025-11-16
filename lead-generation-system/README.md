# Lead Generation System

A comprehensive lead generation and management system with full API connectivity and Excel export functionality. Built with Flask backend and modern JavaScript frontend.

## 🚀 Features

- **Lead Generation Form** - Capture comprehensive lead information
- **Lead Management** - View, edit, and delete leads
- **RESTful API** - Full CRUD operations via API endpoints
- **Excel Export** - Export all leads to Excel format with formatting
- **Real-time Statistics** - Dashboard with lead statistics
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern UI** - Beautiful, intuitive interface

## 🛠️ Technologies

### Backend
- **Python 3.8+** - Programming language
- **Flask** - Web framework
- **SQLite** - Database
- **openpyxl** - Excel file generation
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern design
- **JavaScript (ES6+)** - Interactivity and API calls

## 📋 Prerequisites

- **Python 3.8 or higher** (includes pip)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## ⚠️ First Time Setup - Installing Python

### If Python is NOT installed:

1. **Download Python**
   - Visit: https://www.python.org/downloads/
   - Click "Download Python 3.12.x" (latest version)

2. **Install Python**
   - Run the downloaded installer
   - **IMPORTANT**: ✅ Check "Add Python to PATH" at the bottom
   - Click "Install Now"
   - Wait for installation to complete

3. **Verify Installation**
   - Close and reopen your terminal/command prompt
   - Run: `python --version` (should show version number)
   - Run: `pip --version` (should show pip version)

4. **Run Setup Checker** (Windows)
   ```bash
   check_setup.bat
   ```
   This will verify Python and pip are installed correctly.

> 📖 **Detailed installation guide**: See [INSTALL_PYTHON.md](INSTALL_PYTHON.md) for step-by-step instructions.

## 🔧 Installation

1. **Clone the repository** (if not already done)
```bash
git clone https://github.com/goginenirakesh5-stack/Portfolio.git
cd Portfolio/lead-generation-system
```

2. **Verify Python is installed**
```bash
python --version
pip --version
```

3. **Create a virtual environment (recommended)**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

4. **Install dependencies**
```bash
pip install -r requirements.txt
```

> 💡 **Troubleshooting**: If `python` doesn't work, try `py` instead (Windows Python Launcher)

## 🚀 Running the Application

### Step 1: Start the Flask Backend

```bash
python app.py
```

The API server will start on `http://localhost:5000`

### Step 2: Open the Frontend

Open `index.html` in your web browser, or use a local server:

```bash
# Using Python's built-in server
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns API health status.

### Get All Leads
```
GET /api/leads
```
Returns a list of all leads.

### Create Lead
```
POST /api/leads
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "jobTitle": "Manager",
  "industry": "Technology",
  "leadSource": "Website",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipCode": "10001",
  "notes": "Interested in our services",
  "status": "New"
}
```

### Get Single Lead
```
GET /api/leads/{id}
```
Returns a specific lead by ID.

### Update Lead
```
PUT /api/leads/{id}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  ...
}
```

### Delete Lead
```
DELETE /api/leads/{id}
```
Deletes a lead by ID.

### Export to Excel
```
GET /api/leads/export
```
Downloads an Excel file with all leads.

## 📊 Database Schema

The system uses SQLite with the following schema:

```sql
CREATE TABLE leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    job_title TEXT,
    industry TEXT,
    lead_source TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    zip_code TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Usage

### Generating a Lead

1. Fill out the lead generation form with required information
2. Click "Generate Lead" to save the lead
3. The lead will be stored in the database

### Viewing Leads

1. Click "View All Leads" button
2. See all leads in a table format
3. View statistics dashboard

### Editing a Lead

1. Click "Edit" button next to any lead
2. Form will be populated with lead data
3. Make changes and click "Update Lead"

### Exporting to Excel

1. Click "Export to Excel" button
2. Excel file will be downloaded automatically
3. File includes all leads with formatting

## 🔒 API Configuration

To change the API URL in the frontend, edit `script.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Change this to your production API URL when deploying.

## 📁 Project Structure

```
lead-generation-system/
├── app.py                 # Flask backend application
├── index.html            # Frontend HTML
├── styles.css            # Frontend styling
├── script.js             # Frontend JavaScript
├── requirements.txt      # Python dependencies
├── README.md            # This file
├── .gitignore           # Git ignore rules
└── leads.db             # SQLite database (created automatically)
```

## 🚀 Deployment

### Backend Deployment

1. **Heroku**
   - Create a `Procfile` with: `web: python app.py`
   - Deploy using Heroku CLI

2. **PythonAnywhere**
   - Upload files via web interface
   - Configure WSGI file

3. **AWS/GCP/Azure**
   - Use containerization (Docker)
   - Deploy to cloud services

### Frontend Deployment

1. **GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in settings

2. **Netlify/Vercel**
   - Connect repository
   - Deploy automatically

## 🐛 Troubleshooting

### API Connection Error
- Make sure Flask server is running on port 5000
- Check firewall settings
- Verify CORS is enabled

### Database Issues
- Delete `leads.db` to reset database
- Restart Flask server

### Excel Export Not Working
- Ensure `openpyxl` is installed
- Check file permissions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Rakesh Babu Gogineni**

- GitHub: [@goginenirakesh5-stack](https://github.com/goginenirakesh5-stack)
- Portfolio: [Portfolio](https://goginenirakesh5-stack.github.io/Portfolio/)

## 🙏 Acknowledgments

- Flask team for the amazing framework
- openpyxl for Excel functionality
- All contributors and users

---

Built with ❤️ by Rakesh Babu Gogineni

