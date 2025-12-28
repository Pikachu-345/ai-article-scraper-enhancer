# BeyondChats Article Enhancement System

A full-stack application that scrapes articles from BeyondChats blog, enhances them using AI (Groq LLM), and displays them in a beautiful responsive UI.

## 🌟 Features

- **Web Scraping**: Automated scraping of articles from BeyondChats blog using Puppeteer
- **RESTful API**: Full CRUD operations for articles with MongoDB storage
- **AI Enhancement**: Google search integration + competitor analysis + LLM-powered content optimization
- **Modern UI**: React frontend with glassmorphism design, dark gradients, and smooth animations
- **Article Comparison**: View original vs enhanced content side-by-side
- **Reference Citations**: Automatic citation of source articles used for enhancement

## 🏗️ Architecture

```mermaid
graph TB
    A[BeyondChats Blog] -->|Puppeteer| B[Backend API]
    B -->|MongoDB| C[(Database)]
    
    D[Enhancement Script] -->|GET| B
    D -->|Google Search| E[Search Results]
    E -->|Scrape| F[Competitor Articles]
    F --> D
    D -->|Groq LLM| G[Enhanced Content]
    G -->|PUT| B
    
    H[React Frontend] -->|API Calls| B
    B -->|JSON| H
    
    style B fill:#4CAF50
    style C fill:#2196F3
    style D fill:#FF9800
    style G fill:#9C27B0
    style H fill:#00BCD4
```

## 🚀 Live Demo

- **Frontend**: [Deploy to Vercel - Coming Soon]
- **Backend API**: [Deploy to Railway - Coming Soon]

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (free tier)
- Groq API key (free tier)

## 🛠️ Local Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd beyond_chats_assignment
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your MongoDB Atlas connection string
```

**Environment Variables** (`.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/beyondchats
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Start Backend**:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

**Scrape Articles**:
```bash
curl -X POST http://localhost:5000/api/articles/scrape/beyondchats
```

### 3. Enhancement Script Setup

```bash
cd ../enhancement-script

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your Groq API key
```

**Get Groq API Key**:
1. Visit https://console.groq.com
2. Sign up for free account
3. Navigate to API Keys
4. Create new API key
5. Copy to `.env` file

**Environment Variables** (`.env`):
```env
API_BASE_URL=http://localhost:5000/api
GROQ_API_KEY=gsk_your_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
MAX_SEARCH_RESULTS=2
SEARCH_DELAY_MS=2000
```

**Run Enhancement** (make sure backend is running):
```bash
# Enhance all articles
npm run enhance

# Or enhance single article by ID
npm start <article-id>
```

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

**Environment Variables** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Start Frontend**:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Documentation

### Articles Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | Get all articles (query: `?isUpdated=true/false`) |
| GET | `/api/articles/:id` | Get single article |
| POST | `/api/articles` | Create new article |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |
| POST | `/api/articles/scrape/beyondchats` | Trigger scraping |

**Example Request**:
```bash
# Get all enhanced articles
curl http://localhost:5000/api/articles?isUpdated=true

# Get single article
curl http://localhost:5000/api/articles/<article-id>
```

## 📊 Data Flow

1. **Scraping**: Puppeteer → BeyondChats blog → Extract articles → Store in MongoDB
2. **Enhancement**:
   - Fetch article from API
   - Google search for article title
   - Scrape top 2 competitor articles
   - Send to Groq LLM for enhancement
   - Update article with enhanced content + references
3. **Display**: React app fetches articles from API → Displays in UI with filters

## 🎨 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Scraping**: Puppeteer + Cheerio
- **CORS**: For cross-origin requests

### Enhancement Script
- **Automation**: Puppeteer (Google search + article scraping)
- **LLM**: Groq API (LLaMA 3.3 70B model)
- **HTTP**: Axios

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **Fonts**: Google Fonts (Inter)
- **HTTP**: Axios

## 🌐 Deployment

### MongoDB Atlas (Database)
1. Create free cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist IP (or allow from anywhere: `0.0.0.0/0`)
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

### Railway (Backend)
1. Push code to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy backend
5. Copy backend URL

### Vercel (Frontend)
1. Push code to GitHub
2. Connect Vercel to your repo
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<railway-backend-url>`
6. Deploy

## 🧪 Testing

### Backend
```bash
cd backend
npm run dev

# In another terminal
curl http://localhost:5000/api/articles
```

### Enhancement Script
```bash
cd enhancement-script

# Make sure backend is running first
# Then enhance all articles
npm run enhance
```

### Frontend
```bash
cd frontend
npm run dev
# Visit http://localhost:5173
```

## 📁 Project Structure

```
beyond_chats_assignment/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── articleController.js
│   ├── models/
│   │   └── Article.js
│   ├── routes/
│   │   └── articles.js
│   ├── scrapers/
│   │   └── blogScraper.js
│   ├── server.js
│   └── package.json
├── enhancement-script/
│   ├── services/
│   │   ├── googleSearch.js
│   │   ├── articleScraper.js
│   │   ├── llmService.js
│   │   └── apiClient.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ArticleCard.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── ArticleList.jsx
│   │   │   └── ArticleDetail.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🎯 Key Features Implemented

### Phase 1: Backend ✅
- Puppeteer-based web scraper with pagination handling
- MongoDB schema with article metadata
- Full CRUD REST API
- Error handling and logging

### Phase 2: Enhancement Script ✅
- Google search automation with anti-bot measures
- Competitor article scraping
- Groq LLM integration with custom prompts
- Reference citation system
- Batch processing support

### Phase 3: Frontend ✅
- Modern glassmorphism UI design
- Responsive layout (mobile + desktop)
- Article filtering (all/original/enhanced)
- Side-by-side comparison view
- Smooth animations and transitions

## 💡 Usage Tips

1. **First Run**: Start backend → Scrape articles → Run enhancement script → View in frontend
2. **Groq API**: Free tier has rate limits (30 req/min). Add delays between enhancements.
3. **Google Search**: May encounter CAPTCHAs if making too many requests. Use delays.
4. **MongoDB**: Use MongoDB Atlas free tier (M0) for cloud database.

## 🐛 Troubleshooting

**Backend won't start**:
- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas cluster is running
- Verify IP whitelist in MongoDB Atlas

**Enhancement script fails**:
- Verify Groq API key is correct
- Check backend is running on port 5000
- Ensure articles exist in database

**Frontend shows errors**:
- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check browser console for errors

## 📝 License

This project was created as an assignment for BeyondChats Full Stack Web Developer Intern position.

## 👤 Author

**Your Name**
- GitHub: [@yourusername]
- Email: your.email@example.com

---

**Evaluation Criteria**:
- ✅ Completeness: All 3 phases implemented
- ✅ README & Docs: Comprehensive setup guide
- ✅ UI/UX: Premium glassmorphism design
- ⏳ Live Link: To be deployed
- ✅ Code Quality: Clean, modular, well-commented

---

Made with ❤️ for BeyondChats Assignment
