import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SafeMarkdown from '../components/SafeMarkdown';
import { articleService } from '../services/api';
import Loader from '../components/Loader';

function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('original'); // 'original', 'enhanced', 'comparison'

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const data = await articleService.getArticle(id);
            setArticle(data);

            // Default to enhanced view if available
            if (data.isUpdated) {
                setViewMode('enhanced');
            }

            setError(null);
        } catch (err) {
            console.error('Error fetching article:', err);
            setError('Failed to load article');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (error || !article) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="glass-effect rounded-xl p-8 text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
                    <Link to="/" className="text-white/80 hover:text-white underline">
                        ← Back to articles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-smooth">
                <span className="mr-2">←</span> Back to Articles
            </Link>

            <div className="glass-effect rounded-xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-white bg-white/20 px-4 py-2 rounded-full">
                            {article.isUpdated ? '✨ Enhanced Available' : '📄 Original'}
                        </span>
                        {article.publishedDate && (
                            <span className="text-sm text-white/90">
                                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        {article.title}
                    </h1>

                    <div className="flex items-center text-white/90 text-sm">
                        <span>By {article.author}</span>
                        {article.url && (
                            <>
                                <span className="mx-2">•</span>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-smooth underline"
                                >
                                    View Original Source →
                                </a>
                            </>
                        )}
                    </div>
                </div>

                {/* View Toggle */}
                {article.isUpdated && (
                    <div className="bg-white/10 px-8 py-4 flex space-x-2">
                        <button
                            onClick={() => setViewMode('original')}
                            className={`px-4 py-2 rounded-lg transition-smooth ${viewMode === 'original'
                                ? 'bg-white text-purple-600 font-semibold'
                                : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                        >
                            📄 Original
                        </button>
                        <button
                            onClick={() => setViewMode('enhanced')}
                            className={`px-4 py-2 rounded-lg transition-smooth ${viewMode === 'enhanced'
                                ? 'bg-white text-purple-600 font-semibold'
                                : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                        >
                            ✨ Enhanced
                        </button>
                        <button
                            onClick={() => setViewMode('comparison')}
                            className={`px-4 py-2 rounded-lg transition-smooth ${viewMode === 'comparison'
                                ? 'bg-white text-purple-600 font-semibold'
                                : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                        >
                            🔄 Side-by-Side
                        </button>
                    </div>
                )}

                {/* Content Display */}
                <div className="p-8 bg-white/95">
                    {viewMode === 'comparison' && article.isUpdated ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">📄</span> Original Content
                                </h3>
                                <SafeMarkdown className="prose prose-sm max-w-none text-gray-700">
                                    {article.content}
                                </SafeMarkdown>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">✨</span> Enhanced Content
                                </h3>
                                <SafeMarkdown className="prose prose-sm max-w-none text-gray-700">
                                    {article.updatedContent}
                                </SafeMarkdown>
                            </div>
                        </div>
                    ) : (
                        <div className="prose prose-lg max-w-none">
                            <SafeMarkdown className="text-gray-800 leading-relaxed">
                                {viewMode === 'enhanced' && article.updatedContent
                                    ? article.updatedContent
                                    : article.content}
                            </SafeMarkdown>
                        </div>
                    )}

                    {/* References Section */}
                    {article.references && article.references.length > 0 &&
                        (viewMode === 'enhanced' || viewMode === 'comparison') && (
                            <div className="mt-12 pt-8 border-t border-gray-300">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">📚 References</h3>
                                <div className="space-y-3">
                                    {article.references.map((ref, index) => (
                                        <div key={index} className="bg-gray-100 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <span className="font-bold text-purple-600 mr-3">{index + 1}.</span>
                                                <div>
                                                    <a
                                                        href={ref.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                                                    >
                                                        {ref.title}
                                                    </a>
                                                    <div className="text-sm text-gray-500 mt-1 break-all">
                                                        {ref.url}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;
