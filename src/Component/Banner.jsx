import React from "react";

const Banner = () => {
  return (
    <div className="carousel mt-4 w-full">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/FsstVbn/manchester-pic.webp"
          className="w-full object-cover h-[500px]"
          alt="Slide 1"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Empower Ideas with Your Support</h2>
          <p className="text-lg max-w-xl">
            Discover campaigns that ignite change and uplift communities. Your contributions turn aspirations into
            impactful realities. Be part of the movement!
          </p>
          <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none">
            Explore Campaigns
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/xJF1m7W/running-1944798-1280.jpg"
          className="w-full object-cover h-[500px]"
          alt="Slide 2"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Join Hands for a Brighter Future</h2>
          <p className="text-lg max-w-xl">
            Empower creators and innovators. Together, we can fund ideas that tackle challenges, foster creativity, and
            bring meaningful change.
          </p>
          <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none">
            Get Started
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/31qshSs/marathon-3753907-960-720.jpg"
          className="w-full object-cover h-[500px]"
          alt="Slide 3"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Make Your Contribution Count</h2>
          <p className="text-lg max-w-xl">
            Every small step creates a big impact. Donate to campaigns that resonate with you and help shape the world
            for the better.
          </p>
          <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none">
            Donate Now
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Slide 4 */}
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/F527FjT/sport-4399175-1280.jpg"
          className="w-full object-cover h-[500px]"
          alt="Slide 4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Inspire Transformations</h2>
          <p className="text-lg max-w-xl">
            Unite with change-makers to address challenges and create sustainable solutions. Let’s inspire and leave a
            lasting impact.
          </p>
          <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none">
            Learn More
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
