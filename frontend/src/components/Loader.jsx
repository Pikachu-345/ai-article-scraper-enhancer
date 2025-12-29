function Loader() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <div className="mt-4 text-white text-center font-medium">
                    Loading articles...
                </div>
            </div>
        </div>
    );
}

export default Loader;
