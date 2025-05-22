import React, { useEffect, useState } from 'react'
import ToonCard from "../components/ToonCard"
import { BiSearch } from 'react-icons/bi'
import { fetchWebtoons } from '../../requests/apicalls';

export default function Webtoons() {

  const [webtoons, setWebtoons] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [genres, setGenres] = React.useState(["all","romance", "supernatural", "thriller", "comedy", "sci-fi", "miniservice", "horror", "miniseries"])
  const [filteredWebtoons, setFilteredWebtoons] = React.useState(webtoons);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedGenre, setSelectedGenre] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(true);
  const [episodes, setEpisodes] = useState([])


useEffect(() => {
  const loadWebtoons = async () => {
    let res = await fetchWebtoons();
    if(!res){
      setIsLoading(false);
      return;
    }
    const { episodes, toonz } = res;
    console.log({episodes, toonz});

    setWebtoons(toonz);
    setEpisodes(episodes);
    setFilteredWebtoons(toonz);
    setIsLoading(false);
  };

  
  loadWebtoons();
}, [])

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
    if (selectedGenre === 'all') {
      setFilteredWebtoons(webtoons);
    } else {
      const filteredWebtoons = webtoons.filter((toon) => toon.genre === selectedGenre || toon.genre.includes(selectedGenre));
      setFilteredWebtoons(filteredWebtoons);
    }
    setIsFilterOpen(false);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedGenre]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading webtoon details...</div>;
  }

  if (!webtoons) {
    return <div className="flex justify-center items-center h-screen text-red-500">Failed to load webtoon. Please try again.</div>;
  }

  return (
    <div className='w-full relative'>
      <div className="header flex flex-wrap px-[20px] toons-header-container justify-between items-center w-full">
        <h1 className='font-bold text-2xl text-gray-700 text-center all-wt-text'>All Webtoons</h1>
        <div className="left-items flex items-center gap-[10px] toons-search-filter-container relative">
          <div className='border border-gray-300 w-[250px] h-[35px] flex pl-[10px] rounded-[5px] items-center gap-[10px] text-gray-700'>
            <BiSearch className='h-full w-[20px] text-gray-500' size="10px"/>
            <input className='w-full h-full p-1 outline-0' onInput={handleSearch} value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} placeholder='Search' />
          </div>
          <div 
            className='text-[#ff0000] border-[#ff0000] 
            border-[1px] p-[2px] w-[80px] rounded-[5px] 
            text-center cursor-pointer hover:bg-[#ff0000] 
            hover:text-white'
            onClick={handleFilterClick}
          >
            Filter
          </div>
          {
            isFilterOpen && (
              <div className='filter-list-cover absolute bg-white top-[40px] right-0 w-[100px] border-gray-300 border'>
              <div className="w-full h-full p-[20px] flex flex-col gap-[10px] justify-center items-center">
                  {
                    genres.map((genre, index) => {
                      return (
                        <div className='text-gray-700 cursor-pointer hover:text-[#ff0000]' 
                          onClick={() => setSelectedGenre(genre)}
                          key={index}
                          >
                          {genre}
                        </div>
                      )
                    })
                  }
              </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="alltoons">
          {filteredWebtoons.map((toon, index) => (
            <ToonCard key={index} toon={toon} />
          ))}
      </div>
    </div>
  )
}
