import React from 'react';
import { Link } from 'react-router-dom';

const Timeline = () => {

       
            return (
              <div className="relative min-h-screen overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5"
                    alt="Marathon Runners"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 via-amber-500/70 to-yellow-400/60"></div>
                </div>
          
                {/* Floating Particles */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-amber-300 rounded-full animate-float"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>
          
                {/* Content */}
                <div className="relative pt-32 pb-24 px-6">
                  <div className="max-w-7xl mx-auto text-center">
                    
                    {/* Animated Logo */}
                    <div className="mb-12 animate-pulse-slow">
                      <div className="inline-block bg-amber-100/20 p-6 rounded-full backdrop-blur-sm">
                        <span className="text-6xl">🏃♀️</span>
                      </div>
                    </div>
          
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-600 drop-shadow-2xl">
                      CITY MARATHON
                      <span className="block text-3xl md:text-4xl mt-4 text-amber-100">
                        November 24, 2024 | Downtown Streets
                      </span>
                    </h1>
          
                    {/* Image Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-16">
                      {[1].map((item) => (
                        <div 
                          key={item}
                          className="relative group overflow-hidden rounded-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                        >
                        
                          <div className="absolute inset-0 bg-gradient-to-t from-orange-600/60 to-transparent"></div>
                        </div>
                      ))}
                    </div>
          
                    {/* CTA Section */}
                    <div className="inline-block relative">
                      <Link to={'/login'} className="bg-gradient-to-br from-amber-400 to-orange-600 px-12 py-5 rounded-full text-xl font-bold text-white 
                        hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                        Register Now 🏅
                      </Link>
                      <div className="absolute -inset-4 bg-amber-400/30 rounded-full blur-2xl -z-10 animate-pulse"></div>
                    </div>
          
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border-2 border-amber-200/30">
                        <div className="text-4xl font-bold text-amber-400">5K+</div>
                        <div className="text-amber-100">Participants</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border-2 border-amber-200/30">
                        <div className="text-4xl font-bold text-amber-400">42KM</div>
                        <div className="text-amber-100">Full Distance</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border-2 border-amber-200/30">
                        <div className="text-4xl font-bold text-amber-400">50+</div>
                        <div className="text-amber-100">Countries</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border-2 border-amber-200/30">
                        <div className="text-4xl font-bold text-amber-400">$1M+</div>
                        <div className="text-amber-100">Prizes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
    );
};

export default Timeline;