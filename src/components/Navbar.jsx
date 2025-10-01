import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import axios from "axios";
import { UserCircle2 } from "lucide-react";
import UserModal from "./UserModal";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [navList, setNavList] = useState(["Home", "Toons"]);
  const { user, setUser } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const handleLogout = async () => {
    await axios.get("https://twp2.onrender.com/twp/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <div className="w-full z-[1000] border-b border-gray-200 flex justify-between items-center bg-white rounded-md sticky top-0">
      <Link
        to="/"
        className="logo w-[80px] h-[80px] flex justify-center items-center"
      >
        <img src="/twp.png" alt="logo" className="w-full h-full" />
      </Link>
        <div className="nav-items gap-[15px] flex items-center px-[15px]">
          {navList.map((item, index) => (
            <NavLink
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              key={index}
              className={({ isActive }) => `
                            p-[8px] text-[15px] nav-item relative hover:text-[#e44616] font-bold cursor-pointer transition-colors duration-300 ease-in-out ${
                              isActive
                                ? "text-[#e44616] active"
                                : "text-gray-600"
                            }`}
            >
              {item}
            </NavLink>
          ))}
          {user && (
            <>
              <div
                onClick={() => setShowModal(!showModal)}
                className="p-[5px] relative text-center w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white cursor-pointer"
              >
                <UserCircle2 />
                {showModal && (
                  <UserModal user={user} handleLogout={handleLogout} />
                )}
              </div>
            </>
          )}

          {
            !user && <button onClick={() => navigate("/login")} className="border p-1 px-2 rounded-md bg-[#e44616] text-white border-none">Log in</button>
          }
        </div>
    </div>
  );
}
