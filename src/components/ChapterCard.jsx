import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserProvider'

export default function ChapterCard({episode}) {
    const { _id, title, coverImage, releaseDate } = episode;
    const { webtoons, episodes, comments } = useUserContext()
    const [webtoonData, setWebtoonData] = useState(null)
    const [currentEpisode, setCurrentEpisode] = useState(null)

    useEffect(() => {
        // find the webtoon that has the episode 
        filterWebtoonData()
    }, [])



    const filterWebtoonData = () => {
        if(webtoons){
            let webtoon = webtoons.find(toon => toon?.chapters.includes(_id))
            const toonEpisodes = []
            const toonComments = []
            webtoon?.chapters.forEach((chapter) => {
                toonEpisodes.push(episodes.find(ep => ep?._id === chapter))
            })
            webtoon?.comments.forEach((comment) => {
                toonComments.push(comments.find(com => com?._id === comment))
            })
            setWebtoonData({...webtoon, episodes: toonEpisodes || [], comments: toonComments || []})
            setCurrentEpisode(episode)
        }
    }



  return (
    <div class="max-w-[320px] w-full bg-white rounded-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
  <div class="relative aspect-[5/6] overflow-hidden group">
    <Link to="/read" state={{ webtoonData, currentEpisode }}>
      <img 
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" 
        src={coverImage.replace("forestgreen-woodpecker-273365.hostingersite.com", "thewebtoonproject.com").replace("?", "%3F")} 
        alt={`${title}`} 
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Link>
  </div>

  <div class="p-4 flex flex-col gap-2">
    <Link 
      to="/read" 
      state={{ webtoonData, currentEpisode }} 
      class="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300"
    >
      {title}
    </Link>

    <div class="flex items-center justify-between text-sm text-gray-500">
      <span class="font-medium text-orange-500">{releaseDate}</span>
      <span class="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
        New
      </span>
    </div>
  </div>
</div>

  )
}


