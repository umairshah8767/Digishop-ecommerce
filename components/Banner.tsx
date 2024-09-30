import React from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee"; // Install with npm or yarn

const Banner = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Background Image */}
      <Image
        src="/Home.png" // Replace with your banner image path
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-70"
      />

      {/* Overlay content */}
      <div className="z-10 text-center text-white p-8 md:p-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
          Discover the Latest Fashion Trends!
        </h1>
        <Marquee className="text-lg md:text-2xl font-semibold mb-6" speed={50}>
          Shop the latest arrivals and exclusive deals! | Free shipping on orders over $50! | New styles added weekly!
        </Marquee>

        {/* CTA Button */}
        <Link href="/shop">
          <button className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-white/10 backdrop-blur-md"></div>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-400 opacity-50 filter blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-yellow-400 opacity-60 filter blur-2xl"></div>
    </div>
  );
};

export default Banner;
