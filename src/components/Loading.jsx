import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 bg-white">
      {/* Animated Logo Spinner */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute w-full h-full border-8 border-gray-200 rounded-full"></div>
        {/* Spinning Orange Arc */}
        <div className="absolute w-full h-full border-8 border-t-transparent border-[#e44616] rounded-full animate-spin"></div>
        {/* Inner Glow Pulse */}
        <div className="absolute w-12 h-12 bg-[#e44616] rounded-full animate-ping opacity-30"></div>
        {/* Brand Initial */}
        <span className="absolute text-[#e44616] text-2xl font-extrabold tracking-wide">
          WT
        </span>
      </div>

      {/* Loading Text */}
      <div className="flex items-center gap-2 text-gray-500 text-lg font-medium">
        <span className="text-[#e44616] animate-bounce">•</span>
        <span className="animate-pulse">Loading Webtoons</span>
        <span className="text-[#e44616] animate-bounce delay-200">•</span>
      </div>
    </div>
  );
}
