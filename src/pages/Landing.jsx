import React from 'react'
import ToonSlider from '../components/ToonSlider'
import ToonCard from '../components/ToonCard'
import ChapterCard from '../components/ChapterCard'
import { useUserContext } from '../../context/UserProvider'

export default function Landing() {
  const { webtoons, episodes, isLoading, scripture } = useUserContext()

  React.useEffect(() => {

  }, [])

  if (!webtoons || webtoons.length < 1) {
    return <div className="flex justify-center items-center h-screen text-red-500">Failed to load webtoon. Please try again.</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full py-[10px] px-[10px]'>
      <ToonSlider webtoons={webtoons.slice(0, 4)} />
      <div className='py-[50px] w-[100%] max-w-[1000px]'>
        <div className="font-bold large-font text-gray-700 text-center">
          New Webtoon
        </div>
        <div className="container">
          {webtoons.slice(0, 4).map((toon, index) => (
            <ToonCard key={index} toon={toon} />
          ))}
        </div>
      </div>
      <div className='py-[50px] w-[100%] max-w-[1000px]'>
      <div className="font-bold large-font text-gray-700 text-center">
        New Chapters
      </div>
        <div className="container">
          {episodes.slice(0, 4).map((toon, index) => (
            <ChapterCard key={index} toon={toon} />
          ))}
        </div>
        
      </div>
      <div class="scriptures">
        <div class="title">Scripture for the week</div>
        <div class="bible">{scripture.word}</div>
        <div class="bible-v">{scripture.book}</div>
      </div>
    </div>
  )
}
