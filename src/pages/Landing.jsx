import React from "react";
import ToonSlider from "../components/ToonSlider";
import ToonCard from "../components/ToonCard";
import ChapterCard from "../components/ChapterCard";
import { useUserContext } from "../../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Landing() {
  const { webtoons, episodes, scripture } = useUserContext();

  return (
    <div className="flex flex-col items-center w-full h-full bg-gray-50">
      {/* Hero / Slider */}
      <section className="w-full max-w-[1200px] px-4 md:px-6 lg:px-8 mt-6">
        <ToonSlider webtoons={webtoons.slice(0, 4)} />
      </section>

      {/* Trending Toons */}
      <section className="py-16 w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="flex justify-between p-4 items-center mb-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center">
            <span className="text-orange-500">Trending</span> Toons
          </h2>
          <Link to="/toons" className="text-sm text-gray-500">
            view all
            <FontAwesomeIcon
              icon={faGreaterThan}
              className="text-gray-500 "
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {webtoons.length > 0 &&
            webtoons
              .slice(0, 8)
              .map((toon, index) => <ToonCard key={index} toon={toon} />)}
        </div>
      </section>

      {/* Trending Episodes */}
      <section
        id="episodes"
        className="py-10 w-full max-w-[1200px] px-4 md:px-6 lg:px-8 bg-white rounded-3xl shadow-sm"
      >
        <div className="flex justify-between p-4 items-center mb-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center">
            <span className="text-orange-500">Trending</span> Episodes
          </h2>
          <Link to="#episodes" className="text-sm text-gray-500">
            View all{" "}
            <FontAwesomeIcon
              icon={faGreaterThan}
              className="text-gray-500 "
              width={10}
              height={20}
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {episodes.length > 0 &&
            episodes
              .slice(0, 4)
              .map((episode, index) => (
                <ChapterCard key={index} episode={episode} />
              ))}
        </div>
      </section>

      {/* Scripture Section */}
      <section className="relative max-w-3xl w-full mx-auto my-20 px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-orange-100 overflow-hidden relative">
          {/* Accent line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-300"></div>

          <div className="p-8 text-center">
            {/* Heading */}
            <div className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-4">
              Scripture for the Week
            </div>

            {/* Word */}
            <div className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-snug mb-4">
              {scripture[0]?.word}
            </div>

            {/* Book reference */}
            <div className="text-base font-medium text-gray-500">
              {scripture[0]?.book}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
