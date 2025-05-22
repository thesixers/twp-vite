import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import EpisodesTab from '../components/EpisodesTab'
import ToonDetailsTab from '../components/ToonDetailsTab'
import CommentsTab from '../components/CommentsTab'
import axios from 'axios'
import { fetchWebtoonDetails } from '../../requests/apicalls'

export default function Webtoon() {
  let params = useParams()
  const [webtoonData, setWebtoonData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); 
  const [navItems, setNavItems] = useState(["Details", "Episodes", "Comments"])
  const [currentNav, setCurrentNav] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const setWebToonDetails = async () => {
      if (!params.webtoon_id) {
        setIsLoading(false);
      }
      setIsLoading(true);

      // let { toon, episodes: episodesArray, comments: commentsArray } 
      let data = await fetchWebtoonDetails(params.webtoon_id)
      if(!data){
        setIsLoading(false);
        return
      }
      console.log(data);
      const { toon, episodes: episodesArray, comments: commentsArray } = data;
      setWebtoonData({ ...toon, episodes: episodesArray || [], comments: commentsArray || [] });
      setLikeCount(toon.likes || 0);
      setIsLoading(false);
    };

    setWebToonDetails();
  }, [params.webtoon_id]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    const optimisticComment = {
      userId: "currentUserStaticId",
      username: "Current User", 
      comment: newComment.trim(),
    };


    setWebtoonData(prev => ({ ...prev, comments: [optimisticComment, ...prev.comments] }));
    setNewComment("");
    // TODO: Send comment to backend API here
    // e.g., await axios.post(`/api/webtoon/${params.webtoon_id}/comments`, { comment: newComment.trim() });
    // Handle success/error from API, potentially update/remove optimisticComment
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading webtoon details...</div>;
  }

  if (!webtoonData) {
    return <div className="flex justify-center items-center h-screen text-red-500">Failed to load webtoon. Please try again.</div>;
  }

  // Destructure for easier use, provide defaults for safety
  const { title = "Webtoon Title", coverImage = "/placeholder-cover.png", episodes = [], comments = [] } = webtoonData;

  return (
    <div>
      <section className='w-[100%] h-[100%] max-w-[1000px] mx-auto px-[15px]'>
        <div className="toon-image-wrapper w-full h-[350px] relative overflow-hidden rounded-lg shadow-md">
          <img
            src={coverImage}
            alt={`Cover for ${title}`}
            className="toon-image w-full h-full object-cover"
          />
          <div className="toon-title absolute top-2 left-4 z-10  text-white text-2xl font-bold rounded-md">
            Giants In Madik 
          </div>
          <div 
            className="like-button-wrapper absolute bottom-4 right-4 z-10 flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
            onClick={handleLikeClick}
            role="button"
            tabIndex={0} 
            onKeyDown={(e) => e.key === 'Enter' && handleLikeClick()}
          >
            <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} className={`text-2xl ${isLiked ? 'text-red-500' : 'text-white'}`} />
            <span className="text-white font-semibold text-lg">{likeCount}</span>
          </div>
        </div>

        <div className="other-details-section">
          <div className="mini-nav flex gap-[20px] justify-center items-center p-[10px]">
            {
              navItems.map((item, index) => 
                (
                <span 
                  onClick={() => setCurrentNav(index)}
                  className={`nav-item 
                    relative font-medium hover:text-[#ff0000] 
                    transition-colors duration-300 p-[5px]
                    ease-in-out cursor-pointer text-[14px] 
                    ${navItems[currentNav] === item ? 
                    "text-[#ff0000] active" : "text-gray-400"
                  }`} 
                  key={index}>{item}</span>
                ))
            }
          </div>

          <div className="details-section ">
          <div className="details-section-content min-h-[350px] rounded-lg">
            {navItems[currentNav] === "Details" && (<ToonDetailsTab details={webtoonData} likeCount={likeCount} isLiked={isLiked}/>)}

            {navItems[currentNav] === "Episodes" && (<EpisodesTab webtoon={webtoonData} />)}

            {navItems[currentNav] === "Comments" && (<CommentsTab handleCommentChange={handleCommentChange} handleSubmitComment={handleSubmitComment} comments={comments}/>)}
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}
