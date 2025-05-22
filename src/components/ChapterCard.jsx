import React from 'react'
import { Link } from 'react-router-dom'

export default function ChapterCard({toon:{title, releaseDate, coverImage, id}}) {
  return (
    <div class="webToon">
        <div class="img-cover">
            <Link to={`/twp/webtoon/${id}`}>
                <img src={coverImage} alt={`${title}`}/>
            </Link>
        </div>
        <div class="webToonDetails">
            <div class="name">
                <Link to={`/twp/webtoon/${id}`} class="title">{title}</Link>
            </div> 
            <span class="genres">{releaseDate}</span>
        </div>
    </div>
  )
}


