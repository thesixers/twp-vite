import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { serverUrl } from '../../requests/apicalls';
import axios from 'axios';
import { useUserContext } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const { setUser, user } = useUserContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    genre: [],
    author: '',
    illustrator: '',
    description: '',
    coverImage: null
  });

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  })


  const [message, setMessage] = useState({ text: '', type: '' });
  const genres = ['Supernatural', 'Romance', 'Fantasy', 'Horror', 'Comedy', 'Scifi', "Mini-series"];
  const [coverPreview, setCoverPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'genre') {
      const selectedGenres = form.genre.includes(value)
        ? form.genre.filter((g) => g !== value)
        : [...form.genre, value];
      setForm({
        ...form,
        genre: selectedGenres,
      });
    } else if (name === 'coverImage') {
      const file = files[0];
      setForm({
        ...form,
        coverImage: file
      });
      setCoverPreview(URL.createObjectURL(file))
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
     data.append(key, value)
    });

    try {
      const response = await axios.post(`${serverUrl}/twp/webtoon`, data, {
        withCredentials: true
      })

      if (response.data.M) {
        setMessage({ text: 'Webtoon uploaded successfully!', type: 'success' });
        setForm({
          title: '',
          genre: [],
          author: '',
          illustrator: '',
          description: '',
          coverImage: null
        });
        setCoverPreview(null)
        let { toonzId, user, M } = response.data;
        setUser(user)
        navigate(`/webtoon/${toonzId}`)
      } else {
        setMessage({ text: response.E || 'Upload failed.', type: 'error' });
      }
    } catch (error) {
      console.error('Error uploading webtoon:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Upload Webtoon</h2>

        {message.text && (
          <div
            className={`text-center py-2 px-4 rounded-md font-medium text-sm ${
              message.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <div className="relative w-full border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 flex items-center justify-center cursor-pointer">
            {coverPreview ? (
              <img src={coverPreview} alt="Preview" className="max-h-60 rounded" />
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
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Genre(s)</label>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <label
                key={g}
                className={`flex items-center space-x-2 border px-3 py-1 rounded-full text-sm cursor-pointer ${
                  form.genre.includes(g) ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  name="genre"
                  value={g}
                  checked={form.genre.includes(g)}
                  onChange={handleChange}
                  className="accent-red-600"
                />
                <span>{g}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Illustrator</label>
          <input
            type="text"
            name="illustrator"
            value={form.illustrator}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary / Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Brief summary of the Webtoon"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={form.title === '' || form.author === '' || form.coverImage === null}
          className={`w-full py-3 font-semibold rounded-md transition duration-300 ${
            form.title === '' || form.author === '' || form.coverImage === null
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Upload Webtoon
        </button>
      </form>
    </div>
  );
}
