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
    }, [])


  return (
    <div class="webToon">
        <div class="img-cover">
            <Link to="/read" state={{webtoonData, currentEpisode}}>
                <img src={coverImage} alt={`${title}`}/>
            </Link>
        </div>
        <div class="webToonDetails">
            <div class="name">
                <Link to="/read" state={{webtoonData, currentEpisode}} class="title">{title}</Link>
            </div> 
            <span class="genres">{releaseDate}</span>
        </div>
    </div>
  )
}


