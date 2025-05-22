import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faList, faGripHorizontal, faAngleDown, faAngleUp, faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import CommentsTab from '../components/CommentsTab';


export default function Read() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentEpisodeData, setCurrentEpisodeData] = useState(null);
  const [webtoonInfo, setWebtoonInfo] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('vertical'); // 'vertical' or 'horizontal'
  const [isLoading, setIsLoading] = useState(true);
  const [isEpisodeSelectorOpen, setIsEpisodeSelectorOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

  useEffect(() => {
    if (location.state && location.state.currentEpisode && location.state.webtoonData) {
      setCurrentEpisodeData(location.state.currentEpisode);
      setWebtoonInfo(location.state.webtoonData);
      setIsLoading(false);

      // Reset scroll to top when episode changes
      document.documentElement.scrollTop = 0; 
    } else {
      console.error("Read page: Missing location state for episode or webtoon data.");
      setIsLoading(false); 
    }
  }, [location.state]);

  const handleEpisodeChange = (episodeId) => {
    if (webtoonInfo && webtoonInfo.episodes) {
      const newEpisode = webtoonInfo.episodes.find(ep => ep._id === episodeId);
      if (newEpisode) {
        navigate(location.pathname, { 
            state: { currentEpisode: newEpisode, webtoonData: webtoonInfo }, 
            replace: true
        });
        setIsEpisodeSelectorOpen(false);
      }
    }
  };

  const sortedEpisodes = useMemo(() => {
    if (!webtoonInfo || !webtoonInfo.episodes) return [];
    return [...webtoonInfo.episodes]
  }, [webtoonInfo]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "" || !webtoonInfo) return;

    const optimisticComment = {
      _id: `temp-${Date.now()}`,
      userId: "currentUserStaticId",
      username: "Current User",
      comment: newComment.trim(),
      // webtoonId: webtoonInfo._id, // Useful if your backend needs it explicitly
      // episodeId: currentEpisodeData._id // If comments were per-episode
    };

    // Optimistically update UI
    setWebtoonInfo(prev => ({
      ...prev,
      comments: [optimisticComment, ...(prev.comments || [])]
    }));
    setNewComment("");
    // send to the backend
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-xl bg-white text-gray-900">Loading twp Reader...</div>;
  }

  if (!currentEpisodeData || !webtoonInfo) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4 text-[#ff0000]">Error Loading Episode</h1>
        <p className="text-gray-300 mb-6">Could not load the episode data. Please try again or go back.</p>
        <RouterLink to={webtoonInfo && webtoonInfo._id ? `/webtoon/${webtoonInfo._id}` : "/webtoons"} className="bg-[#ff0000] hover:bg-[#cc0000] text-white font-semibold py-2 px-4 rounded transition-colors">
          Go Back
        </RouterLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-lg p-3 h-20 md:h-20 flex-shrink-0 z-10">
        <div className="container mx-auto h-full flex items-center justify-between max-w-screen-xl">
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
            <button
              onClick={() => navigate(webtoonInfo._id ? `/webtoon/${webtoonInfo._id}` : -1)}
              className="text-gray-700 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Back to webtoon"
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm md:text-base font-semibold truncate text-gray-900" title={webtoonInfo.title}>{webtoonInfo.title || 'Webtoon'}</h1>
              <h2 className="text-xs md:text-sm text-[#ff0000] truncate" title={currentEpisodeData.title}>
                Ep. {currentEpisodeData.episodeNumber || sortedEpisodes.findIndex(e => e._id === currentEpisodeData._id) + 1}: {currentEpisodeData.title || 'Episode'}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <button
                onClick={() => setIsEpisodeSelectorOpen(!isEpisodeSelectorOpen)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 md:px-3 md:py-2 rounded-md text-xs md:text-sm transition-colors"
              >
                <span>Episodes</span>
                <FontAwesomeIcon icon={isEpisodeSelectorOpen ? faAngleUp : faAngleDown} />
              </button>
              {isEpisodeSelectorOpen && webtoonInfo.episodes && (
                <div className="absolute right-0 mt-2 w-60 md:w-72 bg-white border border-gray-300 rounded-md shadow-xl z-20 max-h-64 overflow-y-auto">
                  {sortedEpisodes.map((ep) => (
                    <button
                      key={ep._id}
                      onClick={() => handleEpisodeChange(ep._id)}
                      className={`block w-full text-left px-3 py-2 text-xs md:text-sm hover:bg-[#ff0000] hover:text-white transition-colors truncate ${currentEpisodeData._id === ep._id ? 'bg-[#ff0000] text-white font-semibold' : 'text-gray-700'}`}
                    >
                      Ep. {ep.episodeNumber || sortedEpisodes.findIndex(e => e._id === ep._id) + 1}: {ep.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center bg-gray-100 rounded-md p-0.5">
              {[ {label: "Vertical", icon: faList, value: "vertical"}, {label: "Horizontal", icon: faGripHorizontal, value: "horizontal"} ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setScrollDirection(opt.value)}
                  className={`px-2 py-1 md:px-2.5 md:py-1.5 rounded text-xs md:text-sm transition-colors flex items-center space-x-1 ${scrollDirection === opt.value ? 'bg-[#ff0000] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                  aria-label={`${opt.label} Scroll`}
                >
                  <FontAwesomeIcon icon={opt.icon} className="text-xs md:text-sm" /> <span className="hidden sm:inline">{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Comments Icon Button */}
            <button
              onClick={() => setIsCommentsModalOpen(true)}
              className="text-gray-600 hover:text-[#ff0000] transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Open Comments"
            >
              <FontAwesomeIcon icon={faComments} size="lg" />
            </button>
          </div>
        </div>
      </header>

      <main className={`flex-grow overflow-auto bg-black ${scrollDirection === 'horizontal' ? 'hide-scrollbar' : ''}`}>
        {currentEpisodeData.pages && currentEpisodeData.pages.length > 0 ? (
          scrollDirection === 'vertical' ? (
            <div className="flex flex-col items-center pt-2 pb-8 space-y-0">
              {currentEpisodeData.pages.map((pageUrl, index) => (
                <img key={index} src={pageUrl} alt={`Page ${index + 1}`} className="max-w-full md:max-w-3xl lg:max-w-[800px] h-auto object-contain block" loading="lazy" />
              ))}
            </div>
          ) : (
            <div className="flex flex-row h-full items-stretch p-0">
              {currentEpisodeData.pages.map((pageUrl, index) => (
                <div key={index} className="h-full flex-shrink-0 flex justify-center items-center snap-center">
                  <img src={pageUrl} alt={`Page ${index + 1}`} className="h-full w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400"><p>No pages available for this episode.</p></div>
        )}

        {/* Comments Modal */}
        {isCommentsModalOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 md:p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
              <button
                onClick={() => setIsCommentsModalOpen(false)}
                className="text-gray-500 hover:text-[#ff0000] transition-colors p-2 rounded-full hover:bg-gray-100"
                aria-label="Close Comments"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            <div className="flex-grow">
              <div className="max-w-2xl mx-auto w-full">
                <CommentsTab newComment={newComment} handleCommentChange={handleCommentChange} handleSubmitComment={handleSubmitComment} comments={webtoonInfo.comments || []} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
