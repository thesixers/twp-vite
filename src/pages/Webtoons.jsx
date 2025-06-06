import React, { useEffect, useState } from "react";
import ToonCard from "../components/ToonCard";
import { BiSearch } from "react-icons/bi";
import { useUserContext } from "../../context/UserProvider";

export default function Webtoons() {
  const { webtoons, episodes, isLoading } = useUserContext();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [genres, setGenres] = React.useState([
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
  const [filteredWebtoons, setFilteredWebtoons] = React.useState(webtoons);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = React.useState("all");

  useEffect(() => {
    setFilteredWebtoons(webtoons);
  }, [webtoons]);

  // the search function
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const filteredWebtoons = webtoons.filter((toon) =>
      toon.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWebtoons(filteredWebtoons);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // the filter function
  const handleFilter = () => {
    const filteredWebtoons = webtoons.filter((toon) => {
      if (selectedGenre === "all") {
        return true;
      }
      if (selectedGenre === "twporiginals") {
        if (toon.twporiginal === true) return true;
      }
      if (selectedGenre === "miniseries") {
        if (toon.genre.includes("miniservice") || toon.genre === "mini-series")
          return true;
      }
      if (toon.genre === selectedGenre || toon.genre.includes(selectedGenre))
        return true;
    });
    setFilteredWebtoons(filteredWebtoons);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedGenre]);

  return (
    <div className="w-full relative">
      <div className="header flex flex-wrap px-[20px] toons-header-container justify-between items-center w-full">
        <h1 className="font-bold text-2xl text-gray-700 text-center all-wt-text">
          {" "}
          {selectedGenre === "all"
            ? "All Webtoons"
            : selectedGenre.toUpperCase()}{" "}
        </h1>
        <div className="left-items flex items-center gap-[10px] toons-search-filter-container relative">
          <div className="border border-gray-300 w-[250px] h-[35px] flex pl-[10px] rounded-[5px] items-center gap-[10px] text-gray-700">
            <BiSearch className="h-full w-[20px] text-gray-500" size="10px" />
            <input
              className="w-full h-full p-1 outline-0"
              onInput={handleSearch}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search"
            />
          </div>
          <div
            className="text-[#e44616] border-[#e44616] 
            border-[1px] p-[2px] w-[80px] rounded-[5px]  
            text-center cursor-pointer hover:bg-[#e44616] 
            duration-300 ease-in-out transition-colors
            hover:text-white"
            onClick={handleFilterClick}
          >
            Filter
          </div>
          {isFilterOpen && (
            <div className="filter-list-cover absolute bg-white top-[40px] right-0 w-[100px] border-gray-300 border">
              <div className="w-full h-full p-[20px] flex flex-col gap-[10px] justify-center items-center">
                {genres.length > 0 &&
                  genres.map((genre, index) => {
                    return (
                      <div
                        className="text-gray-700 cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#ff0000]"
                        onClick={() => setSelectedGenre(genre)}
                        key={index}
                      >
                        {genre}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="alltoons">
        {filteredWebtoons.length > 0 &&
          filteredWebtoons.map((toon, index) => (
            <ToonCard key={index} toon={toon} />
          ))}
      </div>
    </div>
  );
}
