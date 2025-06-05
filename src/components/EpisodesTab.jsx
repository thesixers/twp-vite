import axios from 'axios';
import React from 'react'
import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom'

export default function EpisodesTab({ webtoon, setWebtoonData, isEditable }) {
  const [showEpDeleteConfirmation, setEpShowDeleteConfirmation] = React.useState(false);
  const [currentEpisode, setCurrentEpisode] = React.useState(null)


  const confirmEpDelete = async () => {
    if (currentEpisode) {
      let res = await axios.delete(`https://twp2.onrender.com/twp/webtoon/episode/${currentEpisode}`)
      // let res = await axios.delete(`http://localhost:3001/twp/webtoon/episode/${currentEpisode}`)
      if(res.data){
        let newEpisodes = webtoon.episodes.filter(ep => ep._id !== currentEpisode)
        setWebtoonData({...webtoon, episodes: newEpisodes})
        setEpShowDeleteConfirmation(false)
        setCurrentEpisode(null)
      }
    }
  }

  const handleDeleteEpisode = (id) => {
    setCurrentEpisode(id);
    setEpShowDeleteConfirmation(true);
  }


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
                        <img src={episode.coverImage.replace("forestgreen-woodpecker-273365.hostingersite.com", "thewebtoonproject.com").replace("?", "%3F")} alt={episode.title} className="w-full h-full object-cover"/>
                      </div>
                    </Link>
                    <Link state={{ currentEpisode: episode, webtoonData: webtoon }} to={`/read`} className="ep-title-link">
                      <div className="ep-title text-sm font-medium text-gray-800 hover:text-red-600 transition-colors">
                        EP{ index + 1 } - {episode.title || 'Untitled Episode'}
                      </div>
                    </Link>
                </div>
                <div className="right">
                    <div className="date text-xs text-gray-500">{episode.releaseDate}</div>
                    {
                      isEditable && (
                        <div 
                          className="like-button-wrapper  z-10 flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-black/20 hover:bg-black/50 transition-colors"
                          onClick={() => {handleDeleteEpisode(episode._id)}}
                          role="button"
                        >
                          <BiTrash color='white' className='cursor-pointer'/>
                        </div>
                      )
                    }
                </div>
              </div>
            )
          })
        }
      </div>

      {showEpDeleteConfirmation && (
            <div className="fixed inset-0 bg-[#ffffff4f] bg-opacity-50 flex items-center justify-center z-50 px-[20px]">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to delete this episode? This action cannot be reversed.</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setCurrentEpisode(null)
                      setEpShowDeleteConfirmation(false)
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEpDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}
