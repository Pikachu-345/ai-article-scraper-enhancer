import { useState, useEffect } from 'react';
import { articleService } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';

function ArticleList({ filter }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, [filter]);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            let data;

            if (filter === 'all') {
                data = await articleService.getAllArticles();
            } else if (filter === 'original') {
                data = await articleService.getAllArticles(false);
            } else if (filter === 'enhanced') {
                data = await articleService.getAllArticles(true);
            }

            setArticles(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Failed to load articles. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="glass-effect rounded-xl p-8 text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Error Loading Articles</h2>
                    <p className="text-white/80 mb-4">{error}</p>
                    <button
                        onClick={fetchArticles}
                        className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-smooth"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="glass-effect rounded-xl p-8 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Articles Found</h2>
                    <p className="text-white/80">
                        {filter === 'enhanced'
                            ? 'No enhanced articles yet. Run the enhancement script to create some!'
                            : 'No articles available. Try scraping some articles first.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                    {filter === 'all' && '📚 All Articles'}
                    {filter === 'original' && '📄 Original Articles'}
                    {filter === 'enhanced' && '✨ Enhanced Articles'}
                </h1>
                <p className="text-white/80">
                    {articles.length} article{articles.length !== 1 ? 's' : ''} found
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                ))}
            </div>
        </div>
    );
}

export default ArticleList;
