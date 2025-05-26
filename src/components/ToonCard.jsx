import React from 'react'
import { Link } from 'react-router-dom'

export default function ToonCard({toon:{title, genre, coverImage, _id}}) {
  return (
    <div class="webToon">
        <div class="img-cover">
            <Link to={`/webtoon/${_id}`}>
                <img src={coverImage.replace("forestgreen-woodpecker-273365.hostingersite.com", "thewebtoonproject.com")} alt={`${title}`}/>
            </Link>
        </div>
        <div class="webToonDetails">
            <div class="name">
                <Link to={`/webtoon/${_id}`} class="title">{title}</Link>
            </div> 
            <span class="genres">{genre}</span>
        </div>
    </div>
  )
}
