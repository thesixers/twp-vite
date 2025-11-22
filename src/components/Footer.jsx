import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import yt from "/yt.png";
import tk from "/tik-tok.png";
import PopupMessage from "./PopupMessage"

export default function Footer() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const navList = [
    "Home",
    "Toons",
    "About",
    "Login",
    "SignUp",
    "Publish",
  ]
  const [toggleMessage, setToggleMessage] = useState(false);


  return (
    <footer className="p-2 rounded-lg relative z-10 shadow-lg border-t border-t-gray-100 bg-white">
      {/* Social Media (moved above) */}
      <div className="flex justify-center gap-6 p-2">
        <a
          href="https://www.youtube.com/@TheWebtoonProject"
          target="_blank"
          rel="noreferrer"
          className="transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_#e44616]"
        >
          <img src={yt} alt="YouTube" className="w-7 h-7" />
        </a>
        <a
          href="https://www.tiktok.com/@the_webtoon_project?lang=en"
          target="_blank"
          rel="noreferrer"
          className="transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_#e44616]"
        >
          <img src={tk} alt="TikTok" className="w-6 h-6" />
        </a>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-3 px-2">
        {navList.map((item, index) => (
          <button
            key={index}
            className="relative text-sm font-medium text-gray-500 hover:text-gray-600  px-1 cursor-pointer transition-colors duration-300"
            onClick={() => {
              if (item === "Publish") {
                user ? navigate("/publish") : setToggleMessage(true);
                return;
              }
              navigate(`/${item === "Home" ? "" : item.toLowerCase()}`)
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 py-3">
        © {new Date().getFullYear()}{" "}
        <span className="font-bold text-[#e44616]">The Webtoon Project</span> 🎨 All rights reserved.
      </div>

      {/* Popup Notice */}
      {toggleMessage && <PopupMessage setToggleMessage={setToggleMessage} navigate={navigate} />}
    </footer>
  );
}
