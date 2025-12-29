const Article = require('../models/Article');
const BlogScraper = require('../scrapers/blogScraper');

// Get all articles
exports.getAllArticles = async (req, res) => {
    try {
        const { isUpdated, limit = 50 } = req.query;

        let query = {};
        if (isUpdated !== undefined) {
            query.isUpdated = isUpdated === 'true';
        }

        const articles = await Article.find(query)
            .sort({ publishedDate: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            count: articles.length,
            data: articles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single article
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                error: 'Article not found'
            });
        }

        res.json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Create article
exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);

        res.status(201).json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Update article
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!article) {
            return res.status(404).json({
                success: false,
                error: 'Article not found'
            });
        }

        res.json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                error: 'Article not found'
            });
        }

        res.json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Scrape and save articles
exports.scrapeArticles = async (req, res) => {
    try {
        const { count = 2 } = req.body;

        console.log('🚀 Starting scraping process...');
        const scraper = new BlogScraper();
        const scrapedArticles = await scraper.scrapeArticles(count);

        // Save to database
        const savedArticles = [];
        for (const articleData of scrapedArticles) {
            try {
                // Check if article already exists
                const existing = await Article.findOne({ url: articleData.url });

                if (existing) {
                    console.log(`⏭️  Article already exists: ${articleData.title}`);
                    savedArticles.push(existing);
                } else {
                    const article = await Article.create(articleData);
                    console.log(`💾 Saved: ${article.title}`);
                    savedArticles.push(article);
                }
            } catch (err) {
                console.error(`❌ Error saving article: ${err.message}`);
            }
        }

        res.json({
            success: true,
            count: savedArticles.length,
            data: savedArticles
        });
    } catch (error) {
        console.error('❌ Scraping failed:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
