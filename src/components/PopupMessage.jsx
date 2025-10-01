import React from 'react'
import { X } from 'lucide-react';

export default function PopupMessage({setToggleMessage, navigate}) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full relative">
            <X
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-[#e44616] transition"
              onClick={() => setToggleMessage(false)}
            />
            <h2 className="text-xl font-semibold text-center text-[#e44616] mb-3">
              Notice
            </h2>
            <p className="text-gray-700 text-center mb-6">
              You must have an account or login to become a creator on <span className="text-[#e44616] font-semibold">TWP</span>.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                className="w-full py-2 rounded-lg bg-[#e44616] text-white font-medium transition hover:bg-[#c63a12]"
                onClick={() => {
                  setToggleMessage(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="w-full py-2 rounded-lg bg-[#e44616] text-white font-medium transition hover:bg-[#c63a12]"
                onClick={() => {
                  setToggleMessage(false);
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
  )
}
