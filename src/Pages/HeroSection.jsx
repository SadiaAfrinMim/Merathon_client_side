export default function HeroSection() {
    return (
        <div className="hero min-h-screen bg-[url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5')] relative overflow-hidden">
    <div className="hero-overlay bg-gradient-to-br from-orange-900/80 to-amber-700/80"></div>
    
    {/* Animated runners */}
    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 animate-marquee">
        {[...Array(6)].map((_, i) => (
            <span key={i} className="text-4xl">🏃♂️</span>
        ))}
    </div>

    <div className="hero-content text-center relative">
        <div className="max-w-2xl space-y-8">
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                CITY MARATHON 2024
                <span className="block text-3xl mt-4 text-amber-200 font-medium">
                    42K Challenge Ahead
                </span>
            </h1>

            {/* Distance Progress */}
            <div className="space-y-4">
                <div className="w-full bg-orange-900/40 rounded-full h-3 mb-4 shadow-inner">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-600 h-3 rounded-full 
                                   relative overflow-hidden animate-progress-glow">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                      w-1/2 animate-progress-shimmer"></div>
                    </div>
                </div>
                
                <div className="flex justify-between text-amber-100 font-semibold px-4">
                    <span>Start</span>
                    <span>Finish</span>
                </div>
            </div>

            {/* Race Details */}
            <div className="grid grid-cols-3 gap-4 text-amber-100">
                <div className="p-4 bg-orange-800/30 rounded-xl backdrop-blur-sm">
                    <p className="text-4xl">🏁</p>
                    <p className="text-sm mt-2">Full Marathon</p>
                </div>
                <div className="p-4 bg-orange-800/30 rounded-xl backdrop-blur-sm">
                    <p className="text-4xl">📅</p>
                    <p className="text-sm mt-2">Nov 24, 2024</p>
                </div>
                <div className="p-4 bg-orange-800/30 rounded-xl backdrop-blur-sm">
                    <p className="text-4xl">⏱️</p>
                    <p className="text-sm mt-2">6h Time Limit</p>
                </div>
            </div>
        </div>
    </div>

    {/* Animated finish line */}
    <div className="absolute top-1/2 right-8 -translate-y-1/2 animate-bounce">
        <div className="text-6xl rotate-90">🎌</div>
    </div>
</div>
    );
  }