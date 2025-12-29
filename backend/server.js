require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const articleRoutes = require('./routes/articles');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'BeyondChats API',
        version: '1.0.0',
        endpoints: {
            articles: '/api/articles',
            scrape: 'POST /api/articles/scrape/beyondchats'
        }
    });
});

app.use('/api/articles', articleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}`);
    console.log(`📝 Articles: http://localhost:${PORT}/api/articles`);
    console.log(`🔍 Scrape: POST http://localhost:${PORT}/api/articles/scrape/beyondchats\n`);
});
