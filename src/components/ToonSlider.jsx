import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import coverImage from "/maincover.png";

export default function ToonSlider({ webtoons }) {
  const navigate = useNavigate();

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="mySwiper w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden"
    >
      {/* Welcome Slide */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src={coverImage}
            alt="twp_banner_img"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-10 left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Welcome to <span className="text-[#e44616]">TWP</span>
            </h1>
            <p className="text-gray-200 text-sm md:text-base">
              Discover amazing webtoons, explore stories, and support creators.
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Dynamic Webtoons */}
      {webtoons.map((toon, index) => {
        const { title, coverImage, _id, likes } = toon;

        return (
          <SwiperSlide key={index}>
            <Link to={`/toon/${_id}`}>
              <div className="relative w-full h-full">
                <img
                  src={coverImage
                    .replace(
                      "forestgreen-woodpecker-273365.hostingersite.com",
                      "thewebtoonproject.com"
                    )
                    .replace("?", "%3F")}
                  alt={`Cover for ${title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Title */}
                <div className="absolute bottom-10 left-6">
                  <h2 className="text-white text-2xl md:text-3xl font-bold">
                    {title}
                  </h2>
                  <span className="text-[#e44616] text-sm font-semibold">
                    Mini-Series
                  </span>
                </div>

                {/* Like Button */}
                <div
                  className="absolute bottom-6 right-6 flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/webtoon/${_id}`);
                  }}
                  role="button"
                >
                  <FontAwesomeIcon
                    icon={faHeartSolid}
                    className="text-xl text-[#e44616]"
                  />
                  <span className="text-white font-semibold">{likes}</span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
