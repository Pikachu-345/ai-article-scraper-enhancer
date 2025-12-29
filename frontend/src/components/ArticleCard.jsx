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
        <Link to={`/article/${article._id}`} className="block h-full group">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 h-full flex flex-col relative overflow-hidden">

                {/* Decorative Tape Effect */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-white/90 border-l border-r border-white/20 rotate-1 shadow-sm z-20 pointer-events-none"></div>

                {article.imageUrl && (
                    <div className="h-48 overflow-hidden border-b-2 border-black relative bg-stone-200">
                        {/* Halftone texture overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none z-10 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:4px_4px]"></div>
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <div className="p-5 flex flex-col flex-grow bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]">
                    <div className="flex items-start justify-between mb-4">
                        <span className={`
                            border-2 border-black px-2 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                            transform -rotate-2
                            ${article.isUpdated ? 'bg-cyan-400 text-black' : 'bg-pink-500 text-white'}
                        `}>
                            {article.isUpdated ? '✨ Enhanced' : '📄 Original'}
                        </span>
                        {article.publishedDate && (
                            <span className="text-xs font-mono font-bold text-stone-500 border-b-2 border-black/10">
                                {new Date(article.publishedDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-black text-black uppercase leading-none mb-3 group-hover:text-pink-600 transition-colors">
                        {article.title}
                    </h3>

                    <p className="text-stone-800 font-mono text-sm leading-tight mb-6 flex-grow border-l-2 border-black pl-3">
                        {stripMarkdown(article.excerpt || article.content?.substring(0, 150)) + '...'}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t-2 border-black border-dashed mt-auto">
                        <span className="text-xs font-bold uppercase bg-black text-white px-1">
                            By {article.author}
                        </span>

                        {article.references && article.references.length > 0 && (
                            <span className="text-xs font-bold text-stone-600 flex items-center group-hover:underline">
                                <span className="mr-1">🔗</span>
                                {article.references.length} REFS
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ArticleCard;