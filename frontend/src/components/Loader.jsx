function Loader() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-stone-900">
            <div className="relative">
                {/* Outer spinning box */}
                <div className="w-24 h-24 bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] animate-spin">
                    {/* Inner detail */}
                    <div className="absolute inset-0 m-2 border-2 border-dashed border-black"></div>
                </div>
            </div>

            {/* Text Label */}
            <div className="mt-12 bg-pink-500 border-2 border-black px-6 py-2 transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <span className="text-white font-mono font-bold text-xl uppercase tracking-widest animate-pulse">
                    Printing...
                </span>
            </div>
        </div>
    );
}

export default Loader;