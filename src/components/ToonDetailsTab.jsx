import React from 'react'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ToonDetailsTab({likeCount, isLiked, details:{author, illustrator, releaseDate, genre, description }}) {
  return (
    <div className="details space-y-6 animate-fadeIn text-center md:text-left">
                
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Author</h3>
            <p className="text-gray-800 text-base">{author}</p>
            </div>
            <div >
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Illustrators</h3>
            <p className="text-gray-800 text-base">{illustrator}</p>
            </div>
            {/* On small screens, items-center will center the icon and text. md:items-start for larger screens. justify-center for small, md:justify-start for large */}
            <div className='flex flex-col items-center md:flex-row md:items-start gap-[5px] justify-center md:justify-start'> 
            <h3 className="text-sm font-semibold text-gray-500 mb-1"><FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} className={`text-2xl text-red-500`} /></h3>
            <p className="text-red-600 font-bold text-base">{likeCount}</p>
            </div>
            <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Release Date</h3>
            <p className="text-gray-800 text-base ">{releaseDate}</p>
            </div>
        </div>

        <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Genres</h3>
            {/* Center genre tags on small screens */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {genre.split(',').map(genre => (
                <span key={genre} className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">{genre}</span>
            ))}
            </div>
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Description</h3>
            <p className="text-gray-700 text-base leading-relaxed">
                {description}
            </p>
        </div>
    </div>
  )
}
