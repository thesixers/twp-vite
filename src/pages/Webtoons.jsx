import React, { useEffect, useRef, useState } from "react";
import ToonCard from "../components/ToonCard";
import { BiSearch, BiChevronDown } from "react-icons/bi";
import { serverUrl } from "../../requests/apicalls";
import axios from "axios";

export default function Webtoons() {
  const [webtoons, setWebtoons] = useState([]);
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

  const [page, setPage] = useState(0);
  const pageLimit = 20;
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(null);
  const [fetching, setFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState(true);
  

  useEffect(() => {
    setFilteredWebtoons(webtoons);
  }, [webtoons]);

  useEffect(() => {
    if(page === 0) return;
    fetchWebtoons();
  }, [page]);

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

  const returnJsx = () => {
    const n = Math.floor(selectedGenre.length / 2);
    const [t, m] = [selectedGenre.slice(0, n), selectedGenre.slice(n)];
    
    return (
      <span>
        <span className="text-orange-500">
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </span>
        {m}
      </span>
    );
  };

  // fetch webtoons
  const fetchWebtoons = async () => {
    if(!hasMore || fetching) return;
    setFetching(true);
    setFetchingError(false);
    try{
      let res = await axios.get(`${serverUrl}/twp/webtoon?page=${page}&limit=${pageLimit}`);
      if(res.data){
        const { toonz, pages } = res.data;
        setWebtoons((prevToons) => [...prevToons, ...toonz]);
        if(page >= pages) {
          setHasMore(false);
        }
      }
    }catch (error) {
      console.error("Error fetching webtoons:", error);
      setFetchingError(true);
    }finally{
      setFetching(false);
    }
  }

  useEffect(() => {
    if(!loadingRef.current) return;
    const Observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    }, {threshold: 1.0});

    Observer.observe(loadingRef.current);

    return () => Observer.disconnect();
  }, [hasMore])
  

  return (
    <div className="w-full px-4 md:px-10 py-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="font-bold text-2xl md:text-3xl flex-1 md:text-left text-center text-gray-800">
          {selectedGenre === "all" && (
            <span>
              <span className="text-orange-500">To</span>ons
            </span>
          )}
          {selectedGenre !== "all" && returnJsx()}
        </h1>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 relative">
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
                      selectedGenre === genre
                        ? "font-semibold text-[#e44616]"
                        : ""
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

      { hasMore && <div className="border text-center border-gray-100" ref={loadingRef}>
        { fetching && <p className="text-gray-500 py-2">Loading more toons...</p> }
        { fetchingError && <p className="text-red-500 py-2">Error fetching toons <button onClick={fetchWebtoons} className="cursor-pointer px-5 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors">retry</button></p> }
      </div> }
    </div>
  );
}
