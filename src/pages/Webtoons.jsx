import React, { useEffect, useState } from "react";
import ToonCard from "../components/ToonCard";
import { BiSearch, BiChevronDown } from "react-icons/bi";
import { useUserContext } from "../../context/UserProvider";

export default function Webtoons() {
  const { webtoons } = useUserContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [genres] = useState([
    "all",
    "twporiginals",
    "romance",
    "supernatural",
    "thriller",
    "comedy",
    "sci-fi",
    "miniseries",
    "horror",
    "adventure",
    "fantasy",
    "drama",
  ]);
  const [filteredWebtoons, setFilteredWebtoons] = useState(webtoons);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    setFilteredWebtoons(webtoons);
  }, [webtoons]);

  // search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredWebtoons(
      webtoons.filter((toon) =>
        toon.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // filter
  const handleFilter = (genre) => {
    setSelectedGenre(genre);
    if (genre === "all") {
      setFilteredWebtoons(webtoons);
    } else if (genre === "twporiginals") {
      setFilteredWebtoons(webtoons.filter((toon) => toon.twporiginal));
    } else if (genre === "miniseries") {
      setFilteredWebtoons(
        webtoons.filter(
          (toon) =>
            toon.genre.includes("miniservice") || toon.genre === "mini-series"
        )
      );
    } else {
      setFilteredWebtoons(
        webtoons.filter(
          (toon) =>
            toon.genre === genre || toon.genre.toLowerCase().includes(genre)
        )
      );
    }
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full px-4 md:px-10 py-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="font-bold text-2xl md:text-3xl flex-1 md:text-left text-center text-gray-800">
          {selectedGenre === "all"
            ? "All Webtoons"
            : selectedGenre.toUpperCase()}
        </h1>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 relative border ">
          {/* Search Box */}
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 w-[230px] md:w-[300px] shadow-sm">
            <BiSearch className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              className="w-full py-2 outline-none text-sm text-gray-700"
              placeholder="Search webtoons..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Filter Dropdown */}
          <div
            className="flex items-center gap-1 px-4 py-2 rounded-md border border-[#e44616] text-[#e44616] font-medium cursor-pointer hover:bg-[#e44616] hover:text-white transition"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter <BiChevronDown size={18} />
          </div>

          {isFilterOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-[160px] z-20">
              <ul className="flex flex-col py-2">
                {genres.map((genre, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 text-sm text-gray-700 hover:bg-[#fff3ef] hover:text-[#e44616] cursor-pointer transition ${
                      selectedGenre === genre ? "font-semibold text-[#e44616]" : ""
                    }`}
                    onClick={() => handleFilter(genre)}
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Webtoons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredWebtoons.length > 0 ? (
          filteredWebtoons.map((toon, index) => (
            <ToonCard key={index} toon={toon} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No webtoons found.
          </div>
        )}
      </div>
    </div>
  );
}
