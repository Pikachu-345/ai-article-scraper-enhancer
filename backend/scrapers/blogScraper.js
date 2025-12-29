const puppeteer = require('puppeteer');
const TurndownService = require('turndown');

// Configure HTML to Markdown converter
const turndownService = new TurndownService({
    headingStyle: 'atx',  // Use # style headings
    codeBlockStyle: 'fenced',  // Use ``` for code blocks
    bulletListMarker: '-'  // Use - for bullets
});

class BlogScraper {
    constructor() {
        this.baseUrl = 'https://beyondchats.com/blogs/';
        this.browser = null;
        this.page = null;
    }

    async initialize() {
        this.browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.page = await this.browser.newPage();
    }

    async scrapeArticles(count = 2) {
        try {
            await this.initialize();
            await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });

            const articlesList = await this.page.evaluate(() => {
                const cards = Array.from(document.querySelectorAll('article.entry-card'));

                return cards.map(card => {
                    const getText = (selector) => card.querySelector(selector)?.innerText.trim() || null;
                    const getLink = (selector) => card.querySelector(selector)?.href || null;
                    const getAttr = (selector, attr) => card.querySelector(selector)?.getAttribute(attr) || null;

                    return {
                        title: getText('h2.entry-title > a'),
                        url: getLink('h2.entry-title > a'),
                        dateString: getText('.meta-date time'),
                        author: getText('.meta-author .ct-meta-element-author'),
                        imageUrl: getAttr('img', 'src') || getAttr('.entry-image img', 'src'),
                        excerpt: getText('.entry-excerpt') || getText('.entry-card article > p'),
                    };
                });
            });
            const articles = [];

            for (const [index, article] of articlesList.entries()) {
                if (!article.url) continue;
                if (index >= count) break;
                console.log(`[${index + 1}/${articlesList.length}] Scraping: ${article.title}`);

                try {
                    await this.page.goto(article.url, { waitUntil: 'domcontentloaded' });

                    await this.page.locator('#content').wait();

                    const contentData = await this.page.evaluate(() => {
                        const contentDiv = document.querySelector('#content');
                        const imageEl = document.querySelector('.entry-image img') || document.querySelector('article img');
                        const excerptEl = document.querySelector('.entry-excerpt') || document.querySelector('article > p');

                        return {
                            // Get HTML content instead of text to preserve structure
                            contentHtml: contentDiv ? contentDiv.innerHTML : '<p>NO CONTENT FOUND</p>',
                            imageUrl: imageEl ? imageEl.src : null,
                            excerpt: excerptEl ? excerptEl.innerText.trim() : null
                        };
                    });

                    // Convert HTML to Markdown to preserve formatting
                    const contentMarkdown = turndownService.turndown(contentData.contentHtml);

                    articles.push({
                        title: article.title,
                        url: article.url,
                        content: contentMarkdown,  // Store as Markdown
                        publishedDate: article.dateString ? new Date(article.dateString) : null,
                        author: article.author || 'Unknown',
                        imageUrl: contentData.imageUrl || article.imageUrl,
                        excerpt: contentData.excerpt || article.excerpt
                    });

                    await new Promise(r => setTimeout(r, 1000));

                } catch (err) {
                    console.error(`Failed to scrape ${article.url}: ${err.message}`);
                    articles.push({
                        title: article.title,
                        url: article.url,
                        content: "Failed to load content",
                        publishedDate: article.dateString ? new Date(article.dateString) : null,
                        author: article.author || 'Unknown',
                        imageUrl: article.imageUrl,
                        excerpt: article.excerpt,
                        error: err.message
                    });
                }
            }

            await this.close();

            console.log(`\n✅ Successfully scraped ${articles.length} articles`);
            return articles;

        } catch (error) {
            console.error('❌ Scraping error:', error.message);
            await this.close();
            throw error;
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

module.exports = BlogScraper;
