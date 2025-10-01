import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ToonCard({ toon: { title, genre, coverImage, _id } }) {
    const [Title, setTitle] = useState('')
    const [Genre, setGenre] = useState('')
    const [CoverImage, setCoverImage] = useState('')
    const [Id, setId] = useState('')

    useEffect(() => {
        setCoverImage(coverImage
            .replace(
            "forestgreen-woodpecker-273365.hostingersite.com",
            "thewebtoonproject.com"
          )
          .replace("?", "%3F"))

          setTitle(title.length > 18 ? title.slice(0, 18) + "..." : title)
          let g = genre.replace("miniservice", "mini-series")
          setGenre(g.length > 18 ? g.slice(0, 18) + "..." : g)
          setId(_id)

    }, []);

  return (
    <div className="max-w-[250px] w-full bg-white rounded-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
  {/* Image Section */}
  <div className="relative aspect-[5/6] overflow-hidden group">
    <img
      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
      src={CoverImage}
      alt={Title}
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>

  {/* Content Section */}
  <div className="p-4 flex flex-col gap-2">
    {/* Title */}
    <Link
      to={`/webtoon/${Id}`}
      className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300 line-clamp-1"
    >
      {Title}
    </Link>

    {/* Genre */}
    <span className="text-sm px-2 py-1 text-orange-600 rounded-full w-fit font-medium">
      {Genre}
    </span>
  </div>
</div>

  );
}
