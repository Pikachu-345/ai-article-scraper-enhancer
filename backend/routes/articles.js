const express = require('express');
const router = express.Router();
const {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    scrapeArticles
} = require('../controllers/articleController');

// CRUD routes
router.get('/', getAllArticles);
router.get('/:id', getArticle);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

// Scraping route
router.post('/scrape/beyondchats', scrapeArticles);

module.exports = router;
