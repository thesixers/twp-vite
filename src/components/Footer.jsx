import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import tk from "/tik-tok.png"
import fb from "/facebook.png"
import yt from "/yt.png"
import { useUserContext } from '../../context/UserProvider'

export default function Footer() {
  const [navList, setNavList] = useState(["Home", "Webtoons", "About", "Login", "SignUp", "Become an Author"]);
  const { user } = useUserContext();

  useEffect(() => {
    if(user) setNavList(["Home", "Webtoons", "About", "Become an Author"]);
  }, [user])


  return (
    <div className='pt-[10px]'>
      <footer className='w-full p-[20px]'>
        <div className='flex justify-center items-center w-full h-full gap-[10px] flex-wrap'>
          {
            navList.map((item, index) => {
              return(
                <Link to={`/${item === "Home" ? "" : item.toLowerCase()}`} className="foot-nav text-[14px] text-gray-200 hover:text-gray-400" key={index}>{item.toLowerCase()}</Link>
              )
            })
          }
        </div>
          <div className="m-auto flex justify-center items-center gap-[10px] p-[10px]" title='Youtube'>
            <a href="https://www.youtube.com/@TheWebtoonProject" target="_blank" className='socials'>
              <img src={yt} alt="" />
            </a>
            <a href="https://www.tiktok.com/@the_webtoon_project?lang=en" target="_blank" className='socials' title='TikTok'>
              <img src={tk} alt="" />
            </a>
          </div>
      </footer>
    </div>
  )
}
