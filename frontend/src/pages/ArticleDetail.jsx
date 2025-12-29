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
            <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
                <div className="bg-white border-2 border-black p-8 text-center max-w-lg w-full shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 relative">
                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/90 border-l border-r border-white/20 rotate-1 shadow-sm opacity-80 backdrop-blur-sm"></div>

                    <div className="text-8xl mb-4 font-black text-pink-500">404</div>
                    <h2 className="text-2xl font-black text-black uppercase mb-4 tracking-tighter">Page Missing</h2>
                    <p className="font-mono text-stone-600 mb-6">The article you are looking for has been redacted or does not exist.</p>
                    <Link to="/" className="inline-block bg-black text-white font-bold py-3 px-6 hover:bg-stone-800 transition-colors border-2 border-transparent hover:border-white">
                        ← RETURN TO ARCHIVES
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-900 p-4 md:p-8 font-mono selection:bg-pink-500 selection:text-white pb-20">
            {/* Background Texture */}
            <div className="fixed inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <Link to="/" className="inline-flex items-center mb-8 group">
                    <div className="bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all font-bold uppercase text-sm">
                        ← Back to Articles
                    </div>
                </Link>

                <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">

                    {/* Header Section */}
                    <div className="bg-yellow-400 border-b-2 border-black p-6 md:p-10 relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <div className="text-9xl font-black rotate-12">#</div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between mb-6 gap-4 relative z-10">
                            <span className={`
                                border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                ${article.isUpdated ? 'bg-cyan-400 text-black' : 'bg-pink-500 text-white'}
                            `}>
                                {article.isUpdated ? '✨ Enhanced Issue' : '📄 Original Print'}
                            </span>

                            {article.publishedDate && (
                                <span className="text-xs font-bold font-mono bg-white border-2 border-black px-2 py-1 transform rotate-1">
                                    {new Date(article.publishedDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-black uppercase leading-none mb-6 tracking-tighter">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center text-sm font-bold border-t-2 border-black border-dashed pt-4 gap-4">
                            <span className="bg-black text-white px-2 py-0.5 transform -rotate-1">By {article.author}</span>
                            {article.url && (
                                <>
                                    <span className="text-black hidden sm:inline">•</span>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:bg-black hover:text-white transition-colors underline decoration-2 decoration-black underline-offset-2 px-1"
                                    >
                                        View Original Source →
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* View Toggle Tabs */}
                    {article.isUpdated && (
                        <div className="bg-stone-100 border-b-2 border-black p-4 flex flex-wrap gap-2 md:gap-4 sticky top-0 z-20 backdrop-blur-sm bg-opacity-90">
                            {[
                                { id: 'original', label: '📄 Original' },
                                { id: 'enhanced', label: '✨ Enhanced' },
                                { id: 'comparison', label: '🔄 Split View' }
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => setViewMode(mode.id)}
                                    className={`
                                        px-4 py-2 text-sm font-bold uppercase tracking-wide border-2 border-black transition-all duration-200
                                        ${viewMode === mode.id
                                            ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] transform -translate-y-1' // Pink shadow for active
                                            : 'bg-white text-black hover:bg-stone-200'
                                        }
                                    `}
                                >
                                    {mode.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Content Display */}
                    <div className="p-6 md:p-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] min-h-[400px]">
                        {viewMode === 'comparison' && article.isUpdated ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:divide-x-2 md:divide-black md:divide-dashed">
                                <div className="pr-0 md:pr-4">
                                    <h3 className="text-xl font-black uppercase bg-stone-200 inline-block px-2 mb-6 border border-black transform -rotate-1">
                                        Original Content
                                    </h3>
                                    <SafeMarkdown className="prose prose-stone prose-headings:font-black prose-headings:uppercase prose-p:font-mono prose-a:text-pink-600 prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-yellow-50 max-w-none text-stone-800">
                                        {article.content}
                                    </SafeMarkdown>
                                </div>
                                <div className="pl-0 md:pl-4 pt-8 md:pt-0 border-t-2 border-black border-dashed md:border-t-0">
                                    <h3 className="text-xl font-black uppercase bg-cyan-200 inline-block px-2 mb-6 border border-black transform rotate-1">
                                        Enhanced Content
                                    </h3>
                                    <SafeMarkdown className="prose prose-stone prose-headings:font-black prose-headings:uppercase prose-p:font-medium prose-a:text-pink-600 prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-cyan-50 max-w-none text-black">
                                        {article.updatedContent}
                                    </SafeMarkdown>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto">
                                <SafeMarkdown className="prose prose-lg prose-stone prose-headings:font-black prose-headings:uppercase prose-p:font-mono prose-a:text-pink-600 hover:prose-a:bg-black hover:prose-a:text-white prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-stone-100 prose-blockquote:py-1 prose-blockquote:px-4 max-w-none text-stone-900 leading-relaxed">
                                    {viewMode === 'enhanced' && article.updatedContent
                                        ? article.updatedContent
                                        : article.content}
                                </SafeMarkdown>
                            </div>
                        )}

                        {/* References Section */}
                        {article.references && article.references.length > 0 &&
                            (viewMode === 'enhanced' || viewMode === 'comparison') && (
                                <div className="mt-16 pt-8 border-t-4 border-black">
                                    <div className="inline-block bg-black text-white px-4 py-1 mb-6 transform -rotate-1">
                                        <h3 className="text-xl font-bold uppercase">📚 References</h3>
                                    </div>
                                    <div className="grid gap-4">
                                        {article.references.map((ref, index) => (
                                            <div key={index} className="bg-stone-100 border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                                                <div className="flex items-start gap-3">
                                                    <span className="font-black text-white bg-black w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 mt-0.5">
                                                        {index + 1}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <a
                                                            href={ref.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-bold text-black uppercase hover:text-pink-600 hover:underline decoration-wavy block truncate"
                                                        >
                                                            {ref.title}
                                                        </a>
                                                        <div className="text-xs font-mono text-stone-500 mt-1 truncate">
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

                    {/* Footer decoration of card */}
                    <div className="bg-stone-200 h-4 border-t-2 border-black bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:4px_4px] opacity-20"></div>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;