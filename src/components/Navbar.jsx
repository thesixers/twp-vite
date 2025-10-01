import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "/twp_logo-nobg.png";
import { BiMenu, BiX } from "react-icons/bi";
import { useUserContext } from "../../context/UserProvider";
import axios from "axios";
import { UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [navList, setNavList] = useState([
    "Home",
    "Webtoons",
    "Login",
    "SignUp",
  ]);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    checkUser();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    checkUser();
  }, [user]);

  const handleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const checkUser = () => {
    if (user) return setNavList(["Home", "Webtoons"]);
    return setNavList(["Home", "Webtoons", "Login", "SignUp"]);
  };

  const handleLogout = async () => {
    await axios.get("https://twp2.onrender.com/twp/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <div className="w-full px-[10px] relative z-[1000] border-b border-gray-200 flex justify-between items-center bg-white rounded-md">
      <Link
        to="/"
        className="logo w-[80px] h-[80px] flex justify-center items-center"
      >
        <img src="/twp.png" alt="logo" className="w-full h-full" />
      </Link>
      {width > 650 ? (
        <div className="nav-items gap-[25px] flex items-center px-[15px]">
          {navList.map((item, index) => (
            <NavLink
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              key={index}
              className={({ isActive }) => `
                            p-[8px] text-[13px] ${
                              item === "Login" || item === "SignUp"
                                ? `bg-[#e44616] text-[#ffff] rounded-[20px] w-[80px] h-[27px] flex justify-center items-center nav-btn-shadow font-bold ${
                                    isActive ? "active-btn" : ""
                                  }`
                                : `nav-item relative hover:text-[#e44616] font-bold cursor-pointer transition-colors duration-300 ease-in-out ${
                                    isActive
                                      ? "text-[#e44616] active"
                                      : "text-gray-600"
                                  }`
                            }`}
            >
              {item}
            </NavLink>
          ))}
          {user && (
            <>
              <div className="p-[5px] relative text-center w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white cursor-pointer">
                <UserCircle2 />
                <div className="absolute right-[-25px] top-[50px] mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 animate-dropdown">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <button
                        onClick={() => navigate("/mywebtoons")}
                        className="w-full text-left px-4 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
                      >
                        My Collection
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/admin")}
                        className="w-full text-left px-4 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
                      >
                        Admin
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mobile-nav flex gap-[20px] items-center">
          {user && (
            <>
              <div className="border border-[#e44616] p-[5px] text-center w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#e44616]">
                <span className="text-white font-bold text-[18px]">AN</span>
              </div>
            </>
          )}
          <BiMenu
            className="w-[30px] h-[30px] cursor-pointer"
            color="#e44616"
            onClick={handleMobileNav}
          />
          {isMobileNavOpen && (
            <div className="mobile-nav-items fixed top-0 w-full left-0 h-full bg-white flex flex-col pt-[50px] items-center gap-[20px]">
              {navList.map((item, index) => (
                <NavLink
                  to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  key={index}
                  className={({ isActive }) =>
                    `nav-item relative hover:text-[#e44616] font-bold cursor-pointer transition-colors duration-300 ease-in-out ${
                      isActive ? "text-[#e44616] active" : "text-gray-600"
                    }`
                  }
                  onClick={handleMobileNav}
                >
                  {item}
                </NavLink>
              ))}
              <BiX
                className={`w-[30px] h-[30px] cursor-pointer absolute top-5 right-5 text-gray-600 hover:text-[#e44616]`}
                onClick={handleMobileNav}
              />
              {user && (
                <div
                  className={`nav-item relative hover:text-[#e44616] font-bold cursor-pointer transition-colors duration-300 ease-in-out text-gray-600`}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
