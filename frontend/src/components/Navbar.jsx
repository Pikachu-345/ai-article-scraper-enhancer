import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="glass-effect shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-white">
                            📝 BeyondChats
                        </div>
                    </Link>

                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-smooth hover:bg-white/20"
                        >
                            All Articles
                        </Link>
                        <Link
                            to="/original"
                            className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-smooth hover:bg-white/20"
                        >
                            Original
                        </Link>
                        <Link
                            to="/enhanced"
                            className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-smooth hover:bg-white/20"
                        >
                            Enhanced
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
