import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="w-full sticky top-0 z-50 p-4 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
                <div className="flex justify-between items-center h-20">

                    {/* Logo: Rotated Sticker Style */}
                    <Link to="/" className="group relative">
                        <div className="bg-yellow-400 border-2 border-black px-4 py-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                            <div className="text-2xl font-black text-black uppercase tracking-tighter">
                                📝 BeyondChats
                            </div>
                        </div>
                    </Link>

                    {/* Links: Cutout Cards with Hard Shadows */}
                    <div className="flex space-x-4">
                        {[
                            { path: "/", label: "All Articles", color: "hover:bg-cyan-400" },
                            { path: "/original", label: "Original", color: "hover:bg-pink-500 hover:text-white" },
                            { path: "/enhanced", label: "Enhanced", color: "hover:bg-green-400" }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                    bg-white border-2 border-black px-4 py-2 text-sm font-bold font-mono uppercase tracking-wide text-black
                                    shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
                                    transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                    transition-all duration-200
                                    ${link.color}
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;