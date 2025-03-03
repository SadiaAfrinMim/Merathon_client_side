export default function StatsSection() {
    return (
      <div className="py-24 px-4 bg-gradient-to-b from-orange-900 to-orange-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Marathon Live Tracker
            <span className="block mt-2 text-2xl text-orange-300">🏃 Real-Time Race Updates</span>
          </h2>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {/* Total Runners Stat */}
            <div className="stats glass bg-orange-500/90 text-orange-100 hover:scale-105 transition-transform">
              <div className="stat">
                <div className="stat-figure text-orange-200">
                  <span className="text-4xl">🏃♂️</span>
                </div>
                <div className="stat-title text-orange-100">Total Runners</div>
                <div className="stat-value text-white">2,548</div>
                <div className="stat-desc text-orange-200">↗︎ 420 On Course</div>
              </div>
            </div>
  
            {/* Distance Covered */}
            <div className="stats glass bg-orange-600/90 text-orange-100 hover:scale-105 transition-transform">
              <div className="stat">
                <div className="stat-figure text-orange-200">
                  <span className="text-4xl animate-pulse">📍</span>
                </div>
                <div className="stat-title">Distance Covered</div>
                <div className="stat-value text-white">12,842km</div>
                <div className="stat-desc text-orange-200">42% of Total</div>
              </div>
            </div>
  
            {/* Checkpoints Passed */}
            <div className="stats glass bg-orange-700/90 text-orange-100 hover:scale-105 transition-transform">
              <div className="stat">
                <div className="stat-figure text-orange-200">
                  <span className="text-4xl">🏁</span>
                </div>
                <div className="stat-title">Checkpoints</div>
                <div className="stat-value text-white">1.2M</div>
                <div className="stat-desc text-orange-200">3.8k/hr Rate</div>
              </div>
            </div>
  
            {/* Average Pace */}
            <div className="stats glass bg-orange-800/90 text-orange-100 hover:scale-105 transition-transform">
              <div className="stat">
                <div className="stat-figure text-orange-200">
                  <span className="text-4xl">⏱️</span>
                </div>
                <div className="stat-title">Avg Pace</div>
                <div className="stat-value text-white">5'42"</div>
                <div className="stat-desc text-orange-200">-15s vs Last Year</div>
              </div>
            </div>
          </div>
  
          {/* Live Leaderboard */}
          <div className="card bg-orange-500/20 backdrop-blur-sm border-2 border-orange-200/30 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-3xl text-white mb-6">
                Live Leaderboard
                <span className="text-orange-200 text-xl ml-2">🏅 Current Top Runners</span>
              </h3>
              
              <div className="overflow-x-auto">
                <table className="table">
                  {/* Gradient Header */}
                  <thead className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
                    <tr>
                      <th className="rounded-l-xl">Rank</th>
                      <th>Runner</th>
                      <th>Time</th>
                      <th className="rounded-r-xl">Progress</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="hover:bg-orange-100/10 transition-colors">
                        <th className="text-orange-200">{i + 1}</th>
                        <td className="font-bold text-white">
                          <span className="mr-2">🏃♀️</span>
                          Runner {String.fromCharCode(65 + i)}
                        </td>
                        <td className="text-orange-200">2:{45 - i*5}'{30 - i*6}"</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-orange-200/20 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-orange-400 to-amber-500 h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${80 - i*15}%` }}
                              ></div>
                            </div>
                            <span className="text-orange-200 text-sm">{80 - i*15}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
  
              {/* Section Divider */}
              <div className="mt-8 flex items-center justify-center gap-4 text-orange-200">
                <div className="h-px w-1/4 bg-current/30"></div>
                <span className="text-sm">Last Updated: 15:42:35</span>
                <div className="h-px w-1/4 bg-current/30"></div>
              </div>
            </div>
          </div>
  
          {/* Animated Finish Line */}
          <div className="mt-12 flex justify-center gap-2 animate-marquee">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-3xl">🎌</span>
            ))}
          </div>
        </div>
      </div>
    );
  }