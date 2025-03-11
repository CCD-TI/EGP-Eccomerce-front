"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Carousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      loop={true}
      className="w-full h-screen"
    >
      <SwiperSlide className="flex items-center justify-center bg-gray-300">
        <img src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/landing/background_azul_ccd.png" alt="" />
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center bg-gray-400">
      <img src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/landing/background_azul_ccd.png" alt="" />

      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center bg-gray-500">
      <img src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/landing/background_azul_ccd.png" alt="" />
      </SwiperSlide>
    </Swiper>
  );
}
