require('dotenv').config();
const GoogleSearchService = require('./services/googleSearch');
const ArticleScraper = require('./services/articleScraper');
const LLMService = require('./services/llmService');
const APIClient = require('./services/apiClient');

class ArticleEnhancer {
    constructor() {
        this.searchService = new GoogleSearchService();
        this.articleScraper = new ArticleScraper();
        this.llmService = new LLMService();
        this.apiClient = new APIClient();
    }

    async enhanceArticle(articleId) {
        try {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`🚀 Starting enhancement for article ID: ${articleId}`);
            console.log('='.repeat(60));

            // Step 1: Fetch original article
            console.log('\n📥 Step 1: Fetching original article...');
            const originalArticle = await this.apiClient.getArticle(articleId);
            console.log(`✅ Fetched: "${originalArticle.title}"`);

            // Step 2: Search Google for the article title
            console.log('\n🔍 Step 2: Searching Google...');
            const searchResults = await this.searchService.searchArticle(
                originalArticle.title,
                parseInt(process.env.MAX_SEARCH_RESULTS) || 2
            );

            if (searchResults.length === 0) {
                throw new Error('No search results found');
            }

            // Small delay
            await new Promise(resolve =>
                setTimeout(resolve, parseInt(process.env.SEARCH_DELAY_MS) || 2000)
            );

            // Step 3: Scrape competitor articles
            console.log('\n📰 Step 3: Scraping competitor articles...');
            const competitorArticles = await this.articleScraper.scrapeMultiple(searchResults);
            console.log(`✅ Scraped ${competitorArticles.length} competitor articles`);

            if (competitorArticles.length === 0) {
                throw new Error('Failed to scrape any competitor articles');
            }

            // Step 4: Enhance with LLM
            console.log('\n🤖 Step 4: Enhancing article with LLM...');
            const enhancedContent = await this.llmService.enhanceArticle(
                originalArticle,
                competitorArticles
            );

            // Step 5: Update article in database
            console.log('\n💾 Step 5: Saving enhanced article...');
            const references = competitorArticles.map(article => ({
                title: article.title,
                url: article.url,
                scrapedAt: new Date()
            }));

            const updatedArticle = await this.apiClient.updateArticle(articleId, {
                isUpdated: true,
                updatedContent: enhancedContent,
                references: references,
                updatedAt: new Date()
            });

            console.log('✅ Article updated successfully!');
            console.log(`\n${'='.repeat(60)}`);
            console.log('🎉 Enhancement Complete!');
            console.log('='.repeat(60));
            console.log(`Article ID: ${updatedArticle._id}`);
            console.log(`Title: ${updatedArticle.title}`);
            console.log(`References: ${references.length}`);
            console.log(`Enhanced content length: ${enhancedContent.length} characters`);

            return updatedArticle;

        } catch (error) {
            console.error('\n❌ Enhancement failed:', error.message);
            throw error;
        }
    }

    async enhanceAllArticles() {
        try {
            console.log('🚀 Fetching all original articles...');
            const articles = await this.apiClient.getArticles({ isUpdated: false });

            console.log(`\nFound ${articles.length} articles to enhance\n`);

            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];
                console.log(`\n[${i + 1}/${articles.length}] Processing: ${article.title}`);

                try {
                    await this.enhanceArticle(article._id);

                    // Delay between articles to avoid rate limits
                    if (i < articles.length - 1) {
                        console.log('\n⏳ Waiting before next article...');
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                } catch (error) {
                    console.error(`Failed to enhance article ${article._id}:`, error.message);
                    console.log('Continuing with next article...');
                }
            }

            console.log('\n✅ All articles processed!');

        } catch (error) {
            console.error('❌ Batch enhancement failed:', error.message);
            throw error;
        }
    }

    async cleanup() {
        await this.searchService.close();
        await this.articleScraper.close();
        console.log('\n🧹 Cleanup complete');
    }
}

// Main execution
async function main() {
    const enhancer = new ArticleEnhancer();

    try {
        const args = process.argv.slice(2);

        if (args.length === 0) {
            console.log('📋 Usage:');
            console.log('  node index.js <article-id>  - Enhance single article');
            console.log('  node index.js --all          - Enhance all articles');
            process.exit(0);
        }

        if (args[0] === '--all') {
            await enhancer.enhanceAllArticles();
        } else {
            const articleId = args[0];
            await enhancer.enhanceArticle(articleId);
        }

    } catch (error) {
        console.error('\n💥 Fatal error:', error.message);
        process.exit(1);
    } finally {
        await enhancer.cleanup();
        process.exit(0);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = ArticleEnhancer;
