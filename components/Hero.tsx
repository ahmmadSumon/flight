"use client";

import Link from "next/link";
import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white mt-32">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          You are just One Step Behind with Flight Booking
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Discover, manage, and book flights effortlessly with our advanced system.
        </p>
        <div className="mt-8 flex justify-center space-x-4 relative z-50">
          {/* Button 1 */}
          <Link href="/all-flights">
            <div className="px-6 py-3 text-lg font-medium bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition cursor-pointer">
              Book Now
            </div>
          </Link>
          {/* Button 2 */}
          <Link href="/all-flights">
            <div className="px-6 py-3 text-lg font-medium bg-blue-700 hover:bg-blue-800 rounded-lg shadow-lg transition cursor-pointer">
              View Flights
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0">
        <svg
          className="w-full h-16 md:h-32 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path
            fillOpacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,213.3C672,235,768,277,864,277.3C960,277,1056,235,1152,224C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};
