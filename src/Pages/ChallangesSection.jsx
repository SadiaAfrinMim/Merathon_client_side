export default function ChallengeSection() {
    const challenges = [
      { id: 1, title: "Desert Dash", icon: "🏎️", duration: "48h", participants: 142 },
      { id: 2, title: "Circuit Rush", icon: "🏁", duration: "24h", participants: 89 },
      { id: 3, title: "Night Rider", icon: "🌌", duration: "72h", participants: 204 },
    ];
  
    return (
      <div className="py-24 px-4 bg-gradient-to-b from-orange-900 to-orange-100">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Racing Challenges
          <span className="block mt-2 text-2xl text-orange-300">Start Your Engines!</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id}
              className="group relative card bg-orange-500 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 transform overflow-hidden"
            >
              {/* Speed Lines Background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIyMDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')]"></div>
              </div>
  
              <div className="card-body items-center text-center p-8">
                {/* Animated Icon */}
                <div className="text-6xl mb-4 animate-bounce group-hover:animate-none group-hover:scale-125 transition-transform">
                  {challenge.icon}
                </div>
  
                {/* Title & Participants */}
                <h3 className="card-title text-3xl text-white font-black mb-2">
                  {challenge.title}
                  <span className="block mt-2 text-sm font-normal text-orange-100">
                    {challenge.participants} Racers Joined
                  </span>
                </h3>
  
                {/* Progress Bar */}
                <div className="w-full bg-orange-300 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-orange-100 to-teal-400 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((challenge.participants / 250) * 100, 100)}%` }}
                  ></div>
                </div>
  
                {/* Glowing Duration Badge */}
                <div className="badge badge-lg border-2 border-orange-100 bg-orange-600 text-orange-100 glow animate-pulse">
                  ⏱️ {challenge.duration}
                </div>
  
                {/* Action Button */}
                <div className="card-actions mt-6">
                  <button className="btn btn-wide bg-gradient-to-r from-orange-100 to-teal-400 text-orange-900 font-bold 
                                  hover:from-teal-400 hover:to-orange-100 hover:scale-105 hover:shadow-lg 
                                  transition-all duration-300 border-0">
                    JOIN RACE
                    <span className="ml-2 text-xl">🏁</span>
                  </button>
                </div>
              </div>
  
              {/* Corner Flag */}
              <div className="absolute top-2 right-2 text-3xl opacity-75">🚩</div>
            </div>
          ))}
        </div>
  
        {/* Section Decoration */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-orange-300">
            <div className="h-1 w-24 bg-current"></div>
            <span className="text-xl">Full Throttle Experience</span>
            <div className="h-1 w-24 bg-current"></div>
          </div>
        </div>
      </div>
    );
  }