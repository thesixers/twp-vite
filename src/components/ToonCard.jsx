import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ToonCard({
  toon: { title, genre, coverImage, _id, releaseDate },
}) {
  const [CoverImage, setCoverImage] = useState("");
  const [diffDays, setDiffDays] = useState(0);

  useEffect(() => {
    setCoverImage(
      coverImage
        .replace(
          "forestgreen-woodpecker-273365.hostingersite.com",
          "thewebtoonproject.com"
        )
        .replace("?", "%3F")
    );

    let u = new Date(releaseDate);
    const now = new Date();
    setDiffDays((now - u) / (1000 * 60 * 60 * 24));
  }, []);

  return (
    <div className="max-w-[250px] w-full bg-inherit  duration-300 overflow-hidden border-none">
      {/* Image Section */}
      <Link to={`/toon/${_id}`}>
      <div className="relative aspect-[5/6] overflow-hidden border-gray-100 group rounded-sm">
        {diffDays <= 21 && (
          <span class="px-2 py-0.5 rounded-sm absolute top-1 left-1 bg-orange-100 text-orange-600 text-xs font-semibold">
            New
          </span>
        )}
        <img
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          src={CoverImage}
          alt={title}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-2 flex flex-col gap-2 bg-inherit">
        {/* Title */}
        <div className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300 line-clamp-1">
          {title}
        </div>

        {/* Genre */}
        <span className="text-sm py-1 text-orange-600 rounded-full w-fit font-medium line-clamp-1">
          {genre}
        </span>
      </div>
      </Link>
    </div>
  );
}
