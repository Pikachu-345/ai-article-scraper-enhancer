const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class ArticleScraper {
    constructor() {
        this.browser = null;
    }

    async initialize() {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }
    }

    async scrapeArticle(url) {
        try {
            console.log(`📰 Scraping article: ${url}`);

            await this.initialize();
            const page = await this.browser.newPage();

            await page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            );

            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            await new Promise(resolve => setTimeout(resolve, 2000));

            const html = await page.content();
            await page.close();

            const $ = cheerio.load(html);

            // Remove unwanted elements
            $('script, style, nav, header, footer, aside, .advertisement, .ad, .sidebar, .comments').remove();

            // Try multiple selectors to find main content
            const contentSelectors = [
                'article',
                '[role="main"]',
                '.article-content',
                '.post-content',
                '.entry-content',
                '.content',
                'main',
                '.article-body',
                '.post-body'
            ];

            let content = '';
            let title = '';

            // Extract title
            title = $('h1').first().text().trim() ||
                $('title').text().trim() ||
                $('meta[property="og:title"]').attr('content') ||
                'Untitled';

            // Try to find main content
            for (const selector of contentSelectors) {
                const element = $(selector);
                if (element.length > 0) {
                    const text = element.text().trim();
                    if (text.length > content.length) {
                        content = text;
                    }
                }
            }

            // Fallback: get all paragraphs
            if (content.length < 200) {
                content = '';
                $('p').each((i, elem) => {
                    const text = $(elem).text().trim();
                    if (text.length > 50) {
                        content += text + '\n\n';
                    }
                });
            }

            // Clean up content
            content = content
                .replace(/\s+/g, ' ')
                .replace(/\n\s+\n/g, '\n\n')
                .trim();

            console.log(`✅ Scraped ${content.length} characters`);

            return {
                title,
                content,
                url
            };

        } catch (error) {
            console.error(`❌ Error scraping ${url}:`, error.message);
            return null;
        }
    }

    async scrapeMultiple(urls) {
        const results = [];

        for (const urlData of urls) {
            const url = typeof urlData === 'string' ? urlData : urlData.url;
            const article = await this.scrapeArticle(url);

            if (article && article.content.length > 200) {
                results.push(article);
            }

            // Delay between requests
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        return results;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

module.exports = ArticleScraper;
