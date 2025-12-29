import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, FileText, Layers } from 'lucide-react';
import ArticleCard from '../components/ArticleCard'; // Assuming component is in same directory
import Loader from '../components/Loader'; // Assuming component is in same directory
import { articleService } from '../services/api'; // Adjust path as needed

function ArticleList({ filter }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Map filters to visual identities
    const filterConfig = {
        all: {
            title: "The Full Archive",
            subtitle: "Uncensored & Unfiltered",
            icon: <Layers size={24} className="text-black" />,
            color: "bg-white",
            shadow: "shadow-white"
        },
        original: {
            title: "Raw Manuscripts",
            subtitle: "First Drafts Only",
            icon: <FileText size={24} className="text-black" />,
            color: "bg-pink-500",
            shadow: "shadow-pink-500"
        },
        enhanced: {
            title: "Remastered Editions",
            subtitle: "Digitally Augmented",
            icon: <Zap size={24} className="text-black" />,
            color: "bg-cyan-400",
            shadow: "shadow-cyan-400"
        }
    };

    const currentTheme = filterConfig[filter] || filterConfig.all;

    useEffect(() => {
        let isMounted = true;

        const fetchArticles = async () => {
            try {
                setLoading(true);
                // Artificial delay to show off the loader animation
                await new Promise(r => setTimeout(r, 600));

                let data;
                if (filter === 'all') {
                    data = await articleService.getAllArticles();
                } else if (filter === 'original') {
                    data = await articleService.getAllArticles(false);
                } else if (filter === 'enhanced') {
                    data = await articleService.getAllArticles(true);
                }

                if (isMounted) {
                    setArticles(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error fetching articles:', err);
                    setError('Connection severed. The underground wire is down.');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchArticles();

        return () => { isMounted = false; };
    }, [filter]);

    if (loading) return <Loader />;

    // --- Error State (Zine Style) ---
    if (error) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(255,0,0,1)] transform rotate-1 relative">
                    {/* Tape */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/90 border-l-2 border-r-2 border-white/20 rotate-1 shadow-sm opacity-80 backdrop-blur-sm"></div>

                    <div className="text-6xl mb-4 animate-bounce">⚠️</div>
                    <h2 className="text-3xl font-black text-black uppercase mb-2 tracking-tighter">System Glitch</h2>
                    <div className="bg-red-100 border-2 border-dashed border-red-500 p-4 mb-6 font-mono text-red-600 text-sm">
                        {error}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 bg-black text-white font-bold py-3 px-8 hover:bg-stone-800 transition-all border-2 border-transparent hover:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none"
                    >
                        <RefreshCw size={18} /> REBOOT SYSTEM
                    </button>
                </div>
            </div>
        );
    }

    // --- Empty State (Zine Style) ---
    if (articles.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-stone-100 border-2 border-black p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:20px_20px] opacity-5 pointer-events-none"></div>

                    <div className="text-6xl mb-6">📭</div>
                    <h2 className="text-4xl font-black text-black uppercase mb-4 tracking-tighter">Void Detected</h2>

                    <div className="inline-block bg-yellow-300 border-2 border-black px-4 py-2 transform rotate-2 mb-6">
                        <p className="font-bold text-black uppercase text-sm">Status: 404 Empty</p>
                    </div>

                    <p className="font-mono text-stone-600 text-lg max-w-md mx-auto leading-relaxed">
                        {filter === 'enhanced'
                            ? 'The editors haven\'t remastered any issues yet. Check back after the ink dries.'
                            : 'No manuscripts found in the archives. The writers are on strike.'}
                    </p>
                </div>
            </div>
        );
    }

    // --- Success State ---
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Area */}
            <div className="mb-16 text-center relative">
                <div className={`
                    inline-flex items-center gap-4 border-4 border-black px-8 py-5 
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                    transform -rotate-1 hover:rotate-0 transition-transform duration-300
                    ${currentTheme.color}
                `}>
                    <div className="bg-black text-white p-2 rounded-sm border border-white">
                        {currentTheme.icon}
                    </div>
                    <div className="text-left">
                        <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none">
                            {currentTheme.title}
                        </h1>
                        <p className="font-mono font-bold text-xs uppercase tracking-widest mt-1 text-black/80">
                            {currentTheme.subtitle}
                        </p>
                    </div>
                </div>

                {/* "Count" Sticker */}
                <div className="absolute -top-4 right-1/4 md:right-1/3 transform rotate-12 hidden sm:block">
                    <div className="bg-white border-2 border-black w-16 h-16 rounded-full flex items-center justify-center shadow-md animate-bounce-slow">
                        <div className="text-center leading-none">
                            <span className="block text-xl font-black">{articles.length}</span>
                            <span className="block text-[0.6rem] font-bold uppercase">Docs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {articles.map((article, index) => (
                    <div
                        key={article._id}
                        className="h-96"
                        style={{
                            // Subtle stagger for organic feel
                            animationDelay: `${index * 50}ms`
                        }}
                    >
                        <ArticleCard article={article} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArticleList;