import React from "react";

const Banner = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-400 to-yellow-300 transform -skew-y-6 -rotate-6 origin-top-left"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-40 right-40 animate-float-delayed">
        <div className="w-48 h-48 bg-orange-300/30 rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative pt-24 pb-48 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Animated Title */}
          <h1 className="text-7xl md:text-9xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-500 animate-text-shine">
            RUN
            <span className="block text-4xl md:text-6xl mt-4 text-amber-100 font-medium">
              Revolution 2024
            </span>
          </h1>

          {/* Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:transform hover:-translate-y-4 transition-all duration-500 cursor-pointer group"
              >
                <div className="mb-4 text-6xl animate-bounce">
                  {item === 1 ? '🏃♂️' : item === 2 ? '🏅' : '🔥'}
                </div>
                <h3 className="text-2xl font-bold text-amber-100 mb-2">
                  {item === 1 ? '5K Challenge' : item === 2 ? 'Elite Race' : 'Speed Run'}
                </h3>
                <p className="text-amber-200">
                  {item === 1 
                    ? 'Perfect for beginners and fun runners' 
                    : item === 2 
                    ? 'Professional competitive race' 
                    : 'High-intensity speed challenge'}
                </p>
                <div className="mt-4 w-full bg-orange-200/30 rounded-full h-2">
                  <div className={`bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full 
                    ${item === 1 ? 'w-3/4' : item === 2 ? 'w-1/2' : 'w-4/5'} animate-progress-glow`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated CTA Section */}
          <div className="text-center">
            <button className="relative inline-block text-2xl font-bold px-12 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 
              hover:from-orange-600 hover:to-amber-500 transform hover:scale-110 hover:shadow-2xl transition-all duration-300
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:to-transparent before:opacity-0 
              hover:before:opacity-100 before:transition-opacity before:duration-500 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Join Now 
                <span className="animate-bounce">🚀</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-amber-200/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 8}s infinite`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
