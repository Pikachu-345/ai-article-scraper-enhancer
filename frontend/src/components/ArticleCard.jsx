import { Link } from 'react-router-dom';

// Helper function to strip Markdown formatting from text
const stripMarkdown = (text) => {
    if (!text) return '';
    return text
        .replace(/#{1,6}\s/g, '') // Remove heading markers
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, '') // Remove italic
        .replace(/`/g, '') // Remove code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract link text only
        .replace(/^[-*+]\s/gm, '') // Remove list markers
        .replace(/^\d+\.\s/gm, ''); // Remove numbered list markers
};

function ArticleCard({ article }) {
    return (
        <Link to={`/article/${article._id}`} className="block">
            <div className="glass-effect rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-smooth transform hover:-translate-y-2 h-full">
                {article.imageUrl && (
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover opacity-90"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
                            {article.isUpdated ? '✨ Enhanced' : '📄 Original'}
                        </span>
                        {article.publishedDate && (
                            <span className="text-xs text-white/70">
                                {new Date(article.publishedDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-gray-100 transition-smooth">
                        {article.title}
                    </h3>

                    <p className="text-white/80 text-sm line-clamp-3 mb-4">
                        {stripMarkdown(article.excerpt || article.content?.substring(0, 150)) + '...'}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">
                            {article.author}
                        </span>

                        {article.references && article.references.length > 0 && (
                            <span className="text-xs text-white/70 flex items-center">
                                <span className="mr-1">🔗</span>
                                {article.references.length} references
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ArticleCard;
