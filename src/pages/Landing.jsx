import React from 'react'
import ToonSlider from '../components/ToonSlider'
import ToonCard from '../components/ToonCard'
import ChapterCard from '../components/ChapterCard'

export default function Landing() {
  const webtoons = [
    {title: "the new beginning", genre: "drama", coverImage: "/WELCOME TO TWP (2).png", id: 1},
    {title: "the new beginning", genre: "drama", coverImage: "/WELCOME TO TWP (2).png", id: 1},
    {title: "the new beginning", genre: "drama", coverImage: "/WELCOME TO TWP (2).png", id: 1},
    {title: "the new beginning", genre: "drama", coverImage: "/WELCOME TO TWP (2).png", id: 1}
  ]
  const episodes = [
    {title: "the new beginning", releaseDate: "12th may 2025", coverImage: "/WELCOME TO TWP (2).png", id: 1},
    {title: "the new beginning", releaseDate: "12th may 2025", coverImage: "/WELCOME TO TWP (2).png", id: 1},
    {title: "the new beginning", releaseDate: "12th may 2025", coverImage: "/WELCOME TO TWP (2).png", id: 1},
    {title: "the new beginning", releaseDate: "12th may 2025", coverImage: "/WELCOME TO TWP (2).png", id: 1}
  ]

  return (
    <div className='flex flex-col items-center justify-center w-full h-full py-[10px]'>
      <ToonSlider />
      <div className='py-[50px] w-[100%] max-w-[1000px]'>
        <div className="font-bold text-2xl text-gray-700 text-center">
          New Webtoon
        </div>
        <div className="container">
          {webtoons.map((toon, index) => (
            <ToonCard key={index} toon={toon} />
          ))}
        </div>
      </div>
      <div className='py-[50px] w-[100%] max-w-[1000px]'>
      <div className="font-bold text-2xl text-gray-700 text-center">
        New Chapters
      </div>
        <div className="container">
          {episodes.map((toon, index) => (
            <ChapterCard key={index} toon={toon} />
          ))}
        </div>
        
      </div>
      <div class="scriptures">
        <div class="title">Scripture for the week</div>
        <div class="bible">Ask and u shall recieve seek and u shall find knock and the door shall be opened onto u</div>
        <div class="bible-v">Mathew 7:7</div>
      </div>
    </div>
  )
}
