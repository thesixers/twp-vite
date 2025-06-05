import React, { useState, Fragment } from "react";
import { Plus, X } from "lucide-react";
import axios from "axios";

export default function EpisodeUpload({setShowEpisodeUploadForm, webtoonID}) {
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [episodePages, setEpisodePages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ message: null, type: null });

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setEpisodePages((prev) => [...prev, ...previews]);
  };

  const handleRemovePage = (indexToRemove) => {
    setEpisodePages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadStatus({ message: null, type: null });

    const data = new FormData();
    data.append("eptitle", episodeTitle);
    data.append("epcover", coverImage);
    episodePages.forEach((page, index) => {
      data.append(`page${index + 1}`, page.file);
    });
    data.append("seriesid", webtoonID);

    try {
      const res = await axios.post("https://twp2.onrender.com/twp/webtoon/episode", data, {withCredentials: true})
      if (res.data.M) {
        setUploadStatus({ message: "Episode uploaded successfully!", type: "success" });
      } else if (res.data.E) {
        setUploadStatus({ message: "An error occurred while uploading the episode. Please try again.", type: "error" });
      }
    } catch (error) {
      console.error("Upload error details:", error.response || error);
      let displayMessage = "Upload failed. Please check your connection and try again.";
      if (error.response && error.response.data) {
        if (typeof error.response.data.message === 'string') {
          displayMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string' && error.response.data.length < 150) {
          displayMessage = error.response.data;
        }
      } else if (error.message) {
        displayMessage = error.message;
      }
      setUploadStatus({ message: displayMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="mx-auto relative top-[100px] w-full max-w-[500px] bg-white rounded-3xl shadow-md p-6 space-y-6">
        <X className="cursor-pointer absolute top-5 right-5 text-gray-500" size={25} onClick={() => !isLoading && setShowEpisodeUploadForm(false)} />
        <h2 className="text-2xl font-bold text-center">Upload Episode</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Episode Title</label>
            <input
              type="text"
              className="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none"
              value={episodeTitle}
              onChange={(e) => setEpisodeTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <div className="relative w-[100%] h-[150px] border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 flex items-center justify-center cursor-pointer">
              {coverPreview ? (
                <img src={coverPreview} alt="Preview" className="h-full w-full object-cover rounded" />
              ) : (
                <div className="text-gray-400 text-center flex flex-col items-center">
                  <Plus className="w-10 h-10" />
                  <span className="text-sm">Upload Image</span>
                </div>
              )}
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleCoverChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Episode Pages</label>
            <div className={`border-2 border-dashed border-blue-200 rounded-md p-4 text-center ${isLoading ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}>
              <label htmlFor="page-upload" className={`${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} block`}>
                <div className="text-blue-500 text-3xl mb-2">☁️</div>
                <strong>Drag and drop files here</strong>
                <div className="text-gray-600">or click to upload</div>
                <input
                  type="file"
                  id="page-upload"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handlePageUpload}
                  disabled={isLoading}
                />
              </label>
            </div>

            <div className="mt-4 overflow-x-scroll flex gap-[10px] scroll-auto">
              {episodePages.map((page, idx) => (
                <div key={idx} className="relative group w-28 flex-shrink-0">
                  <img
                    src={page.preview}
                    alt={`Page ${idx + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                  {!isLoading && (
                    <button
                      type="button"
                      onClick={() => handleRemovePage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
                    >
                      ✕
                    </button>
                  )}
                  <div className="text-center text-sm text-gray-700 mt-1">Page {idx + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff0000] hover:bg-red-600 text-white py-2 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!episodeTitle || !coverImage || episodePages.length === 0 || isLoading}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Loading Popup */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#ffffff5d] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#e44616] mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Uploading, please wait...</p>
          </div>
        </div>
      )}

      {/* Status Popup (Success/Error) */}
      {uploadStatus.message && (
        <div className="fixed inset-0 bg-[#ffffff5d] bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className={`bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center w-full max-w-md mx-auto`}>
            <h3 className={`text-2xl font-bold mb-4 ${uploadStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {uploadStatus.type === 'success' ? 'Success!' : 'Error!'}
            </h3>
            <p className="text-gray-700 mb-6 whitespace-pre-wrap">{uploadStatus.message}</p>
            <button
              onClick={() => {
                if (uploadStatus.type === 'success') {
                  setShowEpisodeUploadForm(false);
                  window.location.reload();
                }
                setUploadStatus({ message: null, type: null });
              }}
              className={`w-full px-6 py-2.5 rounded-md text-white font-semibold transition-colors duration-150
                          ${uploadStatus.type === 'success' 
                            ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' 
                            : 'bg-[#e44616ef] hover:bg-[#e44616] focus:ring-[#ff855f]'}
                          focus:outline-none focus:ring-2 focus:ring-opacity-75`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
