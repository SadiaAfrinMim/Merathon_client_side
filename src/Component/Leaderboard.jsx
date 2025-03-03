import React from 'react';

const Leaderboard = () => {
    return (
        <div className="bg-gradient-to-br from-orange-400 to-yellow-400 py-16 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
      🏆 Live Leaderboard
      <p className="text-xl mt-2 text-amber-100">Current Top Performers</p>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Runner Card 1 */}
      <div className="bg-orange-100/20 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:transform hover:-translate-y-2 transition-all duration-300 border-2 border-orange-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            1️⃣
          </div>
          <div>
            <h3 className="text-2xl font-bold text-orange-900">John Marathoner</h3>
            <p className="text-amber-800">🏃♂️ 38km Completed</p>
            <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-4/5 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Runner Card 2 */}
      <div className="bg-orange-100/20 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:transform hover:-translate-y-2 transition-all duration-300 border-2 border-orange-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            2️⃣
          </div>
          <div>
            <h3 className="text-2xl font-bold text-orange-900">Sarah Runner</h3>
            <p className="text-amber-800">🏃♀️ 35km Completed</p>
            <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Elements */}
    <div className="absolute right-20 top-1/3 animate-bounce">🏅</div>
    <div className="absolute left-20 bottom-1/4 animate-bounce-delayed">🥇</div>
  </div>
</div>
    );
};

export default Leaderboard;