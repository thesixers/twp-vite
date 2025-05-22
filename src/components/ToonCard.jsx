import React from 'react'
import { Link } from 'react-router-dom'

export default function ToonCard({toon:{title, genre, coverImage, id}}) {
  return (
    <div class="webToon">
        <div class="img-cover">
            <Link to={`/webtoon/${id}`}>
                <img src={coverImage} alt={`${title}`}/>
            </Link>
        </div>
        <div class="webToonDetails">
            <div class="name">
                <a href={`/twp/webtoon/${id}`} class="title">{title}</a>
            </div> 
            <span class="genres">{genre}</span>
        </div>
    </div>
  )
}
