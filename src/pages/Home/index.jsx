import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import images from "../../data";
import Footer from "../../components/Footer";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <div className="">
      <div className="p-12 text-left text-4xl   m-1 h-screen bg-green-200">
        <div className="flex gap-32">
          <div className="border-2 flex flex-col gap-11 p-5 justify-center items-center mt-20">
            <p>Welcome to Online Shopping</p>
            <p>Get Best</p>
            <p className="font-bold text-4xl text-red-500 italic">Deals</p>
          </div>
          <div className="w-2/6 h-32">
            <Swiper
              className="border-2 border-red h-96"
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              lazy={true}
              loop={true}
              modules={[Pagination, Navigation, Autoplay]}
            >
              {images.map((img) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={img.imgUrl}
                    alt="image"
                    className="w-full h-full "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <Marquee
          gradient={false}
          className="mt-20 p-20  h-20 w-20 border-2 border-black "
          speed={70}
          direction="left"
        >
          <img
            src="public/images/img1.webp"
            alt="Placeholder 1"
            className="mx-4  w-40 "
          />
          <img
            src="public/images/img2.avif"
            alt="Placeholder 2"
            className="mx-4 h-40 w-40 "
          />
          <img
            src="public/images/img3.jpg"
            alt="Placeholder 3"
            className="mx-4 w-40 "
          />
          <img
            src="public/images/img4.png "
            alt="Placeholder 4"
            className="mx-4  w-40  "
          />
          <img
            src="public/images/img5.jpg"
            alt="Placeholder 5"
            className="mx-4  w-40 "
          />
        </Marquee>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
