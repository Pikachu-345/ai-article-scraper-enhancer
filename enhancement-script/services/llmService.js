const Groq = require('groq-sdk');

class LLMService {
    constructor(apiKey) {
        this.groq = new Groq({
            apiKey: apiKey || process.env.GROQ_API_KEY
        });
        this.model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    }

    async enhanceArticle(originalArticle, competitorArticles) {
        try {
            console.log('🤖 Enhancing article with LLM...');

            const prompt = this.buildPrompt(originalArticle, competitorArticles);

            const completion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert content writer and SEO specialist. Your task is to improve articles by analyzing top-performing content and incorporating best practices while maintaining authenticity.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: this.model,
                temperature: 0.7,
                max_tokens: 4000
            });

            const enhancedContent = completion.choices[0]?.message?.content;

            if (!enhancedContent) {
                throw new Error('No content generated from LLM');
            }

            console.log('✅ Article enhanced successfully');
            console.log(`📊 Generated ${enhancedContent.length} characters`);

            return enhancedContent;

        } catch (error) {
            console.error('❌ LLM enhancement error:', error.message);
            throw error;
        }
    }

    buildPrompt(originalArticle, competitorArticles) {
        const competitor1 = competitorArticles[0] || {};
        const competitor2 = competitorArticles[1] || {};

        return `
I need you to rewrite and enhance an article based on successful competitor content.

**ORIGINAL ARTICLE:**
Title: ${originalArticle.title}
Content: ${originalArticle.content.substring(0, 2000)}

**TOP-RANKING COMPETITOR 1:**
Title: ${competitor1.title || 'N/A'}
Content: ${competitor1.content?.substring(0, 1500) || 'N/A'}

**TOP-RANKING COMPETITOR 2:**
Title: ${competitor2.title || 'N/A'}
Content: ${competitor2.content?.substring(0, 1500) || 'N/A'}

**YOUR TASK:**
Rewrite the original article with the following improvements:

1. **Structure & Formatting**: Adopt the formatting style of the top-ranking articles (heading hierarchy, paragraph length, use of lists)

2. **Content Enhancement**: 
   - Maintain the original topic and core message
   - Incorporate relevant insights from competitor articles
   - Improve clarity and readability
   - Add more depth where competitors provide better coverage

3. **SEO Optimization**:
   - Use natural keyword integration similar to competitors
   - Improve meta-worthy content
   - Enhance engagement potential

4. **Tone & Style**: Match the professional, engaging tone of successful articles

5. **Length**: Aim for similar word count as the competitor articles

**IMPORTANT**: 
- Keep the enhanced article authentic and original
- Do not plagiarize; synthesize insights creatively
- Maintain factual accuracy from the original
- Write in a clear, engaging manner

**OUTPUT FORMAT**:
Provide only the rewritten article content. Do not include any preamble or explanation.

At the end of the article, add a "**References**" section citing the two competitor articles:

**References:**
1. [${competitor1.title}](${competitor1.url})
2. [${competitor2.title}](${competitor2.url})

Now, please provide the enhanced article:
`.trim();
    }
}

module.exports = LLMService;
