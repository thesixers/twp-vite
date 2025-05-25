import { Swiper, SwiperSlide } from 'swiper/react';
import coverImage from "/WELCOME TO TWP (3).png"
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function ToonSlider({webtoons}) {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="toon-image-wrapper w-full h-full relative overflow-hidden rounded-lg shadow-md">
            <img
              src={coverImage}
              alt={`twp_banner_img`}
              className="toon-image w-full h-full object-cover"
            />
            <div className="toon-title absolute top-2 left-4 z-10  text-gray-900 text-2xl font-bold rounded-md">
              Welcome to TWP 
            </div>
          </div>
        </SwiperSlide>
        {
          webtoons.map((toon, index) => {
            const {title, coverImage, _id, likes} = toon;
            
            return(
              <SwiperSlide key={index}>
                <div className="toon-image-wrapper w-full h-full relative overflow-hidden shadow-md">
                  <img
                    src={coverImage}
                    alt={`Cover for ${title}`}
                    className="toon-image w-full h-full object-cover"
                  />
                  <div className="toon-title absolute top-2 left-4 z-10  text-white text-2xl font-bold rounded-md">
                    {title}
                  </div>
                  <span className='absolute top-[50px] left-4 z-10  text-white text-[14px] font-bold rounded-md'>miniseries</span>
                  <div 
                    className="like-button-wrapper absolute bottom-4 right-4 z-10 flex items-center gap-2 cursor-pointer p-2 rounded-lg  hover:bg-black/10 transition-colors"
                    onClick={ () => {navigate(`/webtoon/${_id}`)}}
                    role="button"
                  >
                    <FontAwesomeIcon icon={faHeartSolid} className={`text-2xl text-red-500`} />
                    <span className="text-white font-semibold text-lg">{likes}</span>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}
