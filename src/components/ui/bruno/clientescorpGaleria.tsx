import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const imageItems = [
  '/Multimedia/Imagen/ccdcorp/corporativas/9.png',
  '/Multimedia/Imagen/ccdcorp/corporativas/6.png',
  '/Multimedia/Imagen/ccdcorp/corporativas/4.png',
  '/Multimedia/Imagen/ccdcorp/corporativas/7.png',
  '/Multimedia/Imagen/ccdcorp/corporativas/8.png',
  '/Multimedia/Imagen/ccdcorp/corporativas/1.png',
  '/Multimedia/Imagen/ccdcorp/corporativas/2.png',
];

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    beforeChange: (oldIndex: any, newIndex: React.SetStateAction<number>) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center mt-4 space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-600 focus:outline-none border-2 border-transparent active:border-blue-500" />
    ),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div
      className="flex flex-col carousel-container py-8 w-[90%] max-2xl:w-[70%] max-sm:w-full px-[6rem] max-sm:px-0 min-[500px]:px-0 lg:px-0"
      data-aos="zoom-out-right"
      data-aos-delay="200"
    >
      <Slider {...settings}>
        {imageItems.map((imageUrl, index) => {
          // Determinamos el índice de la imagen central
          const isMiddleImage =
            index === (currentSlide + 1) % imageItems.length; // El índice medio es el actual + 1 en un carrusel de 3
          return (
            <div key={index} className="p-6">
              <div
                className={`flex justify-center items-center rounded-lg ${
                  isMiddleImage ? 'h-[16rem]' : 'h-[13rem] my-7'
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full rounded-lg mb-4"
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

// Componentes de flecha personalizados
const CustomNextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
  <>
    <button
      className="absolute top-1/2 -right-16 max-sm:right-[1rem] transform -translate-y-1/2 bg-[#00DACF] hover:bg-white text-[#142D52] p-2 rounded-full z-10 focus:outline-none hidden max-xl:block"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
    <div className='absolute top-[42.5%] right-[21px] transform -translate-y-1/2 bg-gradient-to-r from-white/30 to-black/60 h-[60%] w-[10%] rounded-lg block max-xl:hidden'>
      <button
        className="relative top-1/2 left-[2rem] max-sm:left-[1rem] transform -translate-y-1/2 bg-[#00DACF] hover:bg-white text-[#142D52] p-2 rounded-full z-10 focus:outline-none"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </>
);

const CustomPrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
  <>
    <button
      className="absolute top-1/2 -left-16 max-sm:left-4 transform -translate-y-1/2 bg-[#00DACF] hover:bg-white text-[#142D52] p-2 rounded-full z-10 focus:outline-none hidden max-xl:block"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <div className='absolute top-[42.5%] left-6 transform -translate-y-1/2 z-10 bg-gradient-to-r from-black/60 to-white/30 h-[60%] w-[10%] rounded-lg block max-xl:hidden'>
      <button
        className="absolute top-1/2 left-12 transform -translate-y-1/2 bg-[#00DACF] hover:bg-white text-[#142D52] p-2 rounded-full focus:outline-none"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  </>
);

export default CarouselComponent;
