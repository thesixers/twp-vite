import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tk from "/tik-tok.png";
import yt from "/yt.png";
import { useUserContext } from "../../context/UserProvider";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [navList, setNavList] = useState([
    "Home",
    "Webtoons",
    "About",
    "Login",
    "SignUp",
    "Become an Author",
  ]);
  const { user } = useUserContext();
  const [toggleMessage, setToggleMessage] = useState(false);

  useEffect(() => {
    if (user) setNavList(["Home", "Webtoons", "About", "Become an Author"]);
  }, [user]);

  return (
    <div className="pt-[10px]">
      <footer className="w-full p-[20px]">
        <div className="flex justify-center items-center w-full h-full gap-[10px] flex-wrap">
          {navList.map((item, index) => {

            return (
              <Link
                to={item !== "Become an Author" ? `/${item === "Home" ? "" : item.toLowerCase()}`: user ? `/${item.toLowerCase()}` : ""}
                className="foot-nav text-[14px] text-gray-200 hover:text-gray-400"
                key={index}
                onClick={() => {
                  if(item === "Become an Author"){
                    if(user){
                      navigate("/become-an-author");
                    }else{
                      setToggleMessage(true);
                    }
                  }
                }}
              >
                {item.toLowerCase()}
              </Link>
            );
          })}
        </div>
        <div
          className="m-auto flex justify-center items-center gap-[10px] p-[10px]"
          title="Youtube"
        >
          <a
            href="https://www.youtube.com/@TheWebtoonProject"
            target="_blank"
            className="socials"
          >
            <img src={yt} alt="" />
          </a>
          <a
            href="https://www.tiktok.com/@the_webtoon_project?lang=en"
            target="_blank"
            className="socials"
            title="TikTok"
          >
            <img src={tk} alt="" />
          </a>
        </div>
      </footer>

      {/* message display card */}
      {toggleMessage && (
        <div className="fixed w-full h-screen px-[10px] bg-[#ffffff4f] top-0 z-50 flex items-center justify-center">
          <div className="border h-[200px] flex flex-col justify-between border-gray-200 max-w-[400px] rounded-[8px] bg-white w-full p-[15px] relative">
            <X
              className="absolute top-0 right-0 text-gray-600 cursor-pointer"
              onClick={() => setToggleMessage(false)}
            />
            <h2 className="text-[20px] text-center font-medium text-[#e44616]">
              Notice!!!
            </h2>
            <div className="text-gray-800 text-center">
              You must have and account or be logged in to upload a webtoon on
              our platform
            </div>
            <div className="flex gap-[10px] mt-[10px]">
              <button
                className="border p-1 w-full text-center cursor-pointer text-white bg-[#e44616] rounded-[8px] hover:active-btn"
                onClick={() => {
                  setToggleMessage(false);
                  navigate("/login");
                }}
              >
                login
              </button>
              <button
                className="border p-1 w-full text-center cursor-pointer  text-white bg-[#e44616] rounded-[8px]"
                onClick={() => {
                  setToggleMessage(false);
                  navigate("/signup");
                }}
              >
                signup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
