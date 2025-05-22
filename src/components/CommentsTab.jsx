import React from 'react'

export default function CommentsTab({newComment, handleCommentChange, handleSubmitComment, comments}) {
  return (
    <div className="comments animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Leave a Comment</h2>
            <form onSubmit={handleSubmitComment} className="mb-8 bg-white p-4 rounded-lg shadow">
                <textarea
                className="w-full h-[80px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                rows="4"
                placeholder="Write your comment here..."
                value={newComment}
                onChange={handleCommentChange}
                maxLength="100"
                required
                ></textarea>
                <button
                type="submit"
                className="mt-3 px-6 py-2 bg-[#ff0000] text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                Post Comment
                </button>
            </form>
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Comments Section</h2> */}
            {comments.length > 0 ? (
                <div className="space-y-6 overflow-scroll h-[250px] hide-scrollbar">
                {comments.map(c => (
                    <div key={c._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                        {/* Placeholder for user avatar - you can replace with an actual image if available */}
                        <div className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center text-white font-semibold">
                            {c.username ? c.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                        </div>
                        <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{c.username || 'Anonymous'}</p>
                        {/* Consider adding a timestamp here if available, e.g., <p className="text-xs text-gray-500">Posted 2 hours ago</p> */}
                        <p className="text-gray-700 mt-1 whitespace-pre-line">{c.comment}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No comments yet</h3>
                <p className="mt-1 text-sm text-gray-500">Be the first to share your thoughts!</p>
                </div>
            )}
    </div>
  )
}
