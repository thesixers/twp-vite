import React from 'react'
import { Link } from 'react-router-dom'

export default function EpisodesTab({ webtoon }) {

  if (!webtoon || !webtoon.episodes || webtoon.episodes.length === 0) {
    return (
      <div className="episodes animate-fadeIn p-4 text-center text-gray-500">
        No episodes available yet.
      </div>
    );
  }

  return (
    <div className="episodes animate-fadeIn">
      <div className="text-gray-600 episodes-wrapper flex flex-col gap-4 h-[400px] overflow-y-scroll">
        {
          webtoon.episodes.map((episode, index) => {
            return (
              <div className="ep flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-50 transition-colors" key={episode._id || index}>
                <div className="left flex items-center gap-3">
                    <Link state={{ currentEpisode: episode, webtoonData: webtoon }} to={`/read`} className="img-link">
                      <div className="img w-24 h-16 overflow-hidden rounded-md shadow">
                        <img src={episode.coverImage} alt={episode.title} className="w-full h-full object-cover"/>
                      </div>
                    </Link>
                    <Link state={{ currentEpisode: episode, webtoonData: webtoon }} to={`/read`} className="ep-title-link">
                      <div className="ep-title text-sm font-medium text-gray-800 hover:text-red-600 transition-colors">
                        EP{ index + 1 } - {episode.title || 'Untitled Episode'}
                      </div>
                    </Link>
                </div>
                <div className="right">
                    <div className="date text-xs text-gray-500">{episode.releaseDate ? new Date(episode.releaseDate).toLocaleDateString() : 'N/A'}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
