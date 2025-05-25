import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../../requests/apicalls'
import ToonCard from '../components/ToonCard'
import { Link } from 'react-router-dom'

export default function Author() {
  const [myWebtoons, setMyWebtoons] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMyWebtoons = async () => {
      
      try {
        let res = await axios.get(`${serverUrl}/twp/author`, {withCredentials: true})
        console.log(res.data);
        if(res.data.webtoons){
          setMyWebtoons(res.data.webtoons)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error);
      }

    }

    getMyWebtoons()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading My webtoons...</div>;
  }

  return (
    <div className='w-full relative'>
          <div className="header flex flex-wrap px-[20px] toons-header-container justify-between items-center w-full">
            <h1 className='font-bold text-2xl text-gray-700 text-center all-wt-text'>All Webtoons</h1>
          </div>
          <div className="alltoons">
              {myWebtoons.map((toon, index) => (
                <div class="webToon" key={index}>
                  <div class="img-cover relative">
                      <Link to={`/webtoon/${toon._id}`}>
                          <img src={toon.coverImage} alt={`${toon.title}`}/>
                      </Link>
                      <div className={`absolute z-50 top-2 left-1 rounded-[20px] text-xs p-1 ${toon.status === "approved" ? "text-green-700 bg-green-100" : toon.status === "pending" ? "text-yellow-700 bg-yellow-100" : "text-red-700 bg-red-100"} `}>{toon.status}</div>
                  </div>
                  <div class="webToonDetails">
                      <div class="name">
                          <a href={`/webtoon/${toon._id}`} class="title">{toon.title}</a>
                      </div> 
                      <span class="genres">{toon.genre}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
  )
}
