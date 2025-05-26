import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "/twp_logo-nobg.png"
import { BiMenu, BiX } from 'react-icons/bi';
import { useUserContext } from '../../context/UserProvider';
import axios from 'axios';

export default function Navbar() {
    const [navList, setNavList] = useState(["Home", "Webtoons", "About", "Login", "SignUp"]);
    const [width, setWidth] = React.useState(window.innerWidth)
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)
    const { user, setUser } = useUserContext()
  
    useEffect(() => {
      const handleResize = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
      };

      checkUser()
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
        checkUser()
    }, [user])

    const handleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen)
    }

    const checkUser = () => {
        if(user){

            if(user.type === "regular"){
                if(user.isAuthor === true){
                    setNavList(["Home", "Webtoons", "Mywebtoons", "About"])
                }
                else{
                    setNavList(["Home", "Webtoons", "About"])
                }
            }

            if(user.type.includes("admin")){
                if(user.isAuthor === true){
                    setNavList(["Home", "Webtoons", "Mywebtoons", "About", "Admin"])
                }
                else{
                    setNavList(["Home", "Webtoons", "About", "Admin"])
                }
            }

            
        }else{
            setNavList(["Home", "Webtoons", "About", "Login", "SignUp"])
        }
    }

    const handleLogout = async () => {
        const res = await axios.get("https://twp2.onrender.com/twp/auth/logout", {withCredentials: true})
        setUser(null)
    }

    
  return (
    <div className='w-full p-[10px] flex justify-between items-center bg-white nav'>
        <div className="logo w-[100px] h-[100px] flex justify-center items-center">
            <img src={Logo} alt="logo" className="w-full h-full" />
        </div>
        {
            width > 650 ?
            <div className="nav-items gap-[25px] flex items-center px-[15px]">
                {navList.map((item, index) => (
                    <NavLink 
                        to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                        key={index}
                        className={({isActive}) => `
                            p-[8px] text-[13px] ${
                            item === "Login" || item === "SignUp"
                            ? `bg-[#e44616] text-[#ffff] rounded-[20px] w-[80px] h-[27px] flex justify-center items-center nav-btn-shadow font-bold ${isActive ? "active-btn" : ""}` 
                            : `nav-item relative hover:text-[#e44616] font-bold cursor-pointer transition-colors duration-300 ease-in-out ${isActive ? "text-[#e44616] active" : "text-gray-600"}`
                        }`}
                        // #e44616
                    >
                    {item}
                    </NavLink>
                ))}
                {
                    user && (
                        <>
                            <div
                            onClick={handleLogout}
                            className={`bg-[#e44616] cursor-pointer text-[#ffff] rounded-[20px] w-[80px] h-[27px] flex justify-center items-center nav-btn-shadow font-bold p-[8px] text-[13px]`}
                            >Logout
                            </div>
                            <div className='border border-[#e44616] p-[5px] text-center w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#e44616]'>
                            <span className='text-white font-bold text-[18px]'>{
                                user.name.split(" ")[0].split("")[0].toUpperCase() + user.name.split(" ")[1].split("")[0].toUpperCase()    
                            }</span>
                            </div>
                            
                        </>
                    )
                }
            </div>
        :
        <div className="mobile-nav flex gap-[20px] items-center">
            {
                user && (
                   <>
                     <div className='border border-[#e44616] p-[5px] text-center w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#e44616]'>
                        <span className='text-white font-bold text-[18px]'>AN</span>
                    </div>
                   </>
                )
            }
            <BiMenu className='w-[30px] h-[30px] cursor-pointer'color='#e44616' onClick={handleMobileNav} />
            {
                isMobileNavOpen && (
                    <div className="mobile-nav-items fixed top-0 w-full left-0 h-full bg-white flex flex-col pt-[50px] items-center gap-[20px]">
                        {navList.map((item, index) => (
                            <NavLink 
                                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                                key={index}
                                className={({isActive}) => `nav-item relative hover:text-[#e44616] font-bold cursor-pointer transition-colors duration-300 ease-in-out ${isActive ? "text-[#e44616] active" : "text-gray-600"}`}
                                onClick={handleMobileNav}
                            >
                            {item}
                            </NavLink>
                        ))}
                        <BiX className={`w-[30px] h-[30px] cursor-pointer absolute top-5 right-5 text-gray-600 hover:text-[#e44616]`} onClick={handleMobileNav} />
                        <div 
                        className={`nav-item relative hover:text-[#e44616] font-bold cursor-pointer transition-colors duration-300 ease-in-out text-gray-600`}
                        onClick={handleLogout}
                        >Logout</div>
                    </div>
                )
            }
        </div>
        }
    </div>
  )
}
