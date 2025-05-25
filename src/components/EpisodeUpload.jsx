import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Plus, X } from "lucide-react";

export default function EpisodeUpload({setShowEpisodeUploadForm}) {
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [episodePages, setEpisodePages] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ episodeTitle, coverImage, episodePages });
    // Add submission logic
  };

  return (
    <div className=" mx-auto relative top-[100px] w-full max-w-[500px] bg-white rounded-3xl shadow-md p-6 space-y-6">
      <X className="cursor-pointer absolute top-5 right-5 text-gray-500" size={25} onClick={() => setShowEpisodeUploadForm(false)} />
      <h2 className="text-2xl font-bold text-center">Upload Episode</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Episode Title</label>
          <input
            type="text"
            className="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none"
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)}
          />
        </div>

        {/* <div>
          <label className="block font-medium mb-1">Cover Image</label>
          <div className="flex items-center space-x-4">
            <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </label>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-16 h-16 object-cover rounded"
              />
            )}
          </div>
        </div> */}
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
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Episode Pages</label>
          <div className="border-2 border-dashed border-blue-200 rounded-md p-4 text-center cursor-pointer">
            <label htmlFor="page-upload" className="cursor-pointer block">
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
              />
            </label>
          </div>

          <div className="mt-4  overflow-x-scroll flex gap-[10px] scroll-auto">
            {episodePages.map((page, idx) => (
              <div key={idx} className="relative group w-28 flex-shrink-0">
                <img
                  src={page.preview}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 hidden group-hover:block"
                >
                  ✕
                </button>
                <div className="text-center text-sm text-gray-700 mt-1">Page {idx + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#ff0000] hover:bg-red-600 text-white py-2 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
