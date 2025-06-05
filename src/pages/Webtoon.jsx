import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import EpisodesTab from '../components/EpisodesTab'
import ToonDetailsTab from '../components/ToonDetailsTab'
import CommentsTab from '../components/CommentsTab'
import { commentApi, fetchWebtoonDetails, likeWebtoon, serverUrl } from '../../requests/apicalls'
import { BiAddToQueue, BiTrash, BiPlus } from 'react-icons/bi'
import axios from 'axios'
import { useUserContext } from '../../context/UserProvider'
import EpisodeUpload from '../components/EpisodeUpload'

export default function Webtoon() {
  let params = useParams()
  const navigate = useNavigate()
  const { user, setComments } = useUserContext()
  const [webtoonData, setWebtoonData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); 
  const [navItems, setNavItems] = useState(["Details", "Episodes", "Comments"])
  const [currentNav, setCurrentNav] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEpisodeUploadForm, setShowEpisodeUploadForm] = useState(false);
  const [isEditable, setIsEditable] = useState(false)


  useEffect(() => {
    setWebToonDetails();
  }, [params.webtoon_id]);

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

    const { toon, episodes: episodesArray, comments: commentsArray } = data;
    setWebtoonData({ ...toon, episodes: episodesArray || [], comments: commentsArray || [] });
    setLikeCount(toon.likes || 0);
    setIsLoading(false);
    if(toon.uploadAcc === user?._id){
      setIsEditable(true)
    }
    if(toon?.likesArray.includes(user?._id)){
      setIsLiked(true)
    }
  };



  const handleLikeClick = () => {
    if(!user) return;
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      webtoonData.likes += 1;
      webtoonData?.likesArray.push(user._id)
    } else {
      setLikeCount(likeCount - 1);
      webtoonData.likes -= 1;
      let newLikesArray = webtoonData?.likesArray.filter(id => id !== user._id);
      webtoonData.likesArray = newLikesArray
    }
    likeWebtoon(webtoonData._id)
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    const optimisticComment = {
      userId: user ? user?._id : "1",
      username: user ? user?.name : "Guest", 
      comment: newComment.trim(),
      seriesId: webtoonData._id,
    };


    setWebtoonData(prev => ({ ...prev, comments: [optimisticComment, ...prev.comments] }));
    setComments(prev => [optimisticComment, ...prev])
    setNewComment("");
    let res = await commentApi(optimisticComment)
    if(res.M){
      console.log(res.M);
    }
  };

  const handleDeleteToon = async () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirmation(false);
    try {
      let res = await axios.delete(`${serverUrl}/twp/webtoon/${webtoonData._id}`);
      if(res.data){
        navigate(
          user.isAuthor === true ? "/mywebtoons" : "/webtoons"
        )
      }
    } catch (error) {
      console.error("Failed to delete webtoon:", error);
    }
  }


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
            src={coverImage.replace("?", "%3F")}
            alt={`Cover for ${title}`}
            className="toon-image w-full h-full object-cover"
          />
          <div className="toon-title absolute top-2 left-4 z-10  text-white text-2xl font-bold rounded-md">
            {title}
          </div>
          <div 
            className={`like-button-wrapper absolute bottom-4 z-10 flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors ${isEditable ? "right-16" : "right-4"}`}
            onClick={handleLikeClick}
            role="button"
            tabIndex={0} 
            onKeyDown={(e) => e.key === 'Enter' && handleLikeClick()}
          >
            <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} className={`text-2xl ${isLiked ? 'text-red-500' : 'text-white'}`} />
            <span className="text-white font-semibold text-lg">{likeCount}</span>
          </div>
          {
            isEditable && (
              <>
                <div 
                  className="like-button-wrapper absolute top-4 right-4 z-10 flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
                  onClick={handleDeleteToon}
                  role="button"
                >
                  <BiTrash color='white' className='cursor-pointer'/>
                </div>
          
          {showDeleteConfirmation && (
            <div className="fixed inset-0 bg-[#ffffff4f] bg-opacity-50 flex items-center justify-center z-50 px-[20px]">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to delete this webtoon? This action cannot be reversed.</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          <div 
            className="like-button-wrapper absolute bottom-4 right-4 z-10 flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
            onClick={() => {
              showEpisodeUploadForm ? setShowEpisodeUploadForm(false) : setShowEpisodeUploadForm(true)
            }}
            role="button"
          >
            <BiPlus size={25} color='white'/>
          </div>
              </>
            )
          }
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

            {navItems[currentNav] === "Episodes" && (<EpisodesTab webtoon={webtoonData} setWebtoonData={setWebtoonData} isEditable={isEditable} />)}

            {navItems[currentNav] === "Comments" && (<CommentsTab handleCommentChange={handleCommentChange} handleSubmitComment={handleSubmitComment} comments={comments}/>)}
          </div>
          </div>
        </div>

        {
          showEpisodeUploadForm &&(
            <div className='fixed overflow-scroll pt-[10px] inset-0 bg-[#ffffff4f] bg-opacity-50 flex items-center justify-center z-50 px-[20px]'>
              <EpisodeUpload webtoonID={webtoonData._id} setShowEpisodeUploadForm={setShowEpisodeUploadForm} />
            </div>
          )
        }
      </section>
    </div>
  )
}
