import React from 'react'
import { Link } from "react-router-dom"
import ig from "/instagram.png"
import tk from "/tik-tok.png"
import fb from "/facebook.png"

export default function Footer() {
  const navList = ["Home", "Webtoons", "TWP-Original", "About", "Contact", "Login", "SignUp"];
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
          <div className="m-auto flex justify-center items-center gap-[10px] p-[10px]">
            <a href="" target="_blank" className='socials'>
              <img src={ig} alt="" />
            </a>
            <a href="" target="_blank" className='socials'>
              <img src={tk} alt="" />
            </a>
            <a href="" target="_blank" className='socials'>
              <img src={fb} alt="" />
            </a>
          </div>
      </footer>
    </div>
  )
}
