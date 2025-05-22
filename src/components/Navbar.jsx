import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "/twp_logo-nobg.png"
import { BiMenu, BiX } from 'react-icons/bi';

export default function Navbar() {
    const navList = ["Home", "Webtoons", "TWP-Original", "About", "Contact", "Login", "SignUp"];
    const [width, setWidth] = React.useState(window.innerWidth)
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)
  
    useEffect(() => {
      const handleResize = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen)
    }

    
  return (
    <div className='w-full p-[10px] flex justify-between items-center bg-white nav'>
        <div className="logo w-[100px] h-[100px] flex justify-center items-center">
            <img src={Logo} alt="logo" className="w-full h-full" />
        </div>
        {
            width > 800 ?
            <div className="nav-items gap-[25px] flex items-center">
            {navList.map((item, index) => (
                <NavLink 
                    to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    key={index}
                    className={({isActive}) => `
                        p-[8px] text-[13px] ${
                        item === "Login" || item === "SignUp"
                        ? `bg-[#ff0000] text-[#ffff] rounded-[20px] w-[80px] h-[27px] flex justify-center items-center nav-btn-shadow font-bold ${isActive ? "active-btn" : ""}` 
                        : `nav-item relative hover:text-[#ff0000] font-bold cursor-pointer transition-colors duration-300 ease-in-out ${isActive ? "text-[#ff0000] active" : "text-gray-600"}`
                    }`}
                >
                {item}
                </NavLink>
            ))}
        </div>
        :
        <div className="mobile-nav">
            <BiMenu className='w-[30px] h-[30px] cursor-pointer'color='red' onClick={handleMobileNav} />
            {
                isMobileNavOpen && (
                    <div className="mobile-nav-items fixed top-0 w-full left-0 h-full bg-white flex flex-col justify-center items-center gap-[20px]">
                        {navList.map((item, index) => (
                            <NavLink 
                                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                                key={index}
                                className={({isActive}) => `nav-item relative hover:text-[#ff0000] font-bold cursor-pointer transition-colors duration-300 ease-in-out ${isActive ? "text-[#ff0000] active" : "text-gray-600"}`}
                                onClick={handleMobileNav}
                            >
                            {item}
                            </NavLink>
                        ))}
                        <BiX className={`w-[30px] h-[30px] cursor-pointer absolute top-5 right-5 text-gray-600 hover:text-[#ff0000]`} onClick={handleMobileNav} />
                    </div>
                )
            }
        </div>
        }
    </div>
  )
}
