import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useUserContext } from "../../context/UserProvider";
import yt from "/yt.png";
import tk from "/tik-tok.png";

export default function Footer() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [navList, setNavList] = useState([
    "Home",
    "Webtoons",
    "About",
    "Login",
    "SignUp",
    "Publish",
  ]);
  const [toggleMessage, setToggleMessage] = useState(false);

  useEffect(() => {
    if (user) setNavList(["Home", "Webtoons", "About", "Become an Author"]);
  }, [user]);

  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4">
      {/* Social Media (moved above) */}
      <div className="flex justify-center gap-6 mb-6">
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
      <nav className="flex flex-wrap justify-center gap-6 mb-6">
        {navList.map((item, index) => (
          <Link
            key={index}
            to={
              item !== "Publish"
                ? `/${item === "Home" ? "" : item.toLowerCase()}`
                : user
                ? `/${item.toLowerCase()}`
                : ""
            }
            className="relative text-[15px] font-medium text-gray-00 border-r border-orange-600 px-1 cursor-pointer transition-colors duration-300
                       after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#e44616] after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => {
              if (item === "Publish") {
                if (user) {
                  navigate("/Publish");
                } else {
                  setToggleMessage(true);
                }
              }
            }}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-00">
        © {new Date().getFullYear()}{" "}
          The Webtoon Project
      </div>

      {/* Popup Notice */}
      {toggleMessage && (
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
      )}
    </footer>
  );
}
