"use client"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      
      {/* Main Heading */}
      <h1 className="text-6xl font-extrabold text-indigo-700 mb-12 tracking-tight sm:text-7xl">
        Crazy Eights 🃏
      </h1>

      {/* Button Container */}
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        
        {/* Play Button */}
        <Link
          className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white text-xl font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          href="/game"
          onClick={() => console.log("Play button clicked")}
          
        >
          Play Game
        </Link>
        
        {/* Create Player Button */}
        <Link
          className="w-full py-4 px-6 bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          href="/create-player"
          onClick={() => console.log("Create Player button clicked")}
        >
          Create Player
        </Link>

        <Link
          className="w-full py-4 px-6 bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          href="/example"
          onClick={() => console.log("Create Player button clicked")}
        >
          Example
        </Link>

      </div>
      
    </div>
  );
}