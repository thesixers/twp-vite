import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function FourOhFour() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6 relative overflow-hidden">
      {/* Optional: Subtle background watermark/pattern */}
      <AlertTriangle
        className="absolute -bottom-1/4 -left-1/4 text-gray-300 opacity-50"
        size={500}
        strokeWidth={1}
      />
      {/*  Existing watermark top-right */}
      <AlertTriangle
        className="absolute -top-1/4 -right-1/4 text-gray-300 opacity-50"
        size={400}
        strokeWidth={1}
      />
      {/* New watermark top-left */}
      <AlertTriangle
        className="absolute -top-1/6 -left-1/6 text-gray-300 opacity-30"
        size={300}
        strokeWidth={0.75}
      />
      {/* New watermark bottom-right */}
      <AlertTriangle
        className="absolute -bottom-1/6 -right-1/6 text-gray-300 opacity-40"
        size={350}
        strokeWidth={0.75}
      />
      {/* New watermark center-ish, very faint */}
      <AlertTriangle
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 opacity-20"
        size={600}
        strokeWidth={0.5}
      />

      <div className="text-center z-10 bg-white p-8 sm:p-12 rounded-xl shadow-2xl border border-gray-200">
        <AlertTriangle className="mx-auto text-red-500 mb-6" size={80} strokeWidth={1.5} />
        <h1 className="text-8xl sm:text-9xl font-bold text-red-500 tracking-wider">404</h1>
        <p className="text-2xl sm:text-3xl font-semibold mt-4 mb-2 text-gray-700">Oops! Page Not Found.</p>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the URL.
        </p>
        <Link
          to="/" // Adjust this to your home route
          className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          <Home className="mr-2 -ml-1" size={20} />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
