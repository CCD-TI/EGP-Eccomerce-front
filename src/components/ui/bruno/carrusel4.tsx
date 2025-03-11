import { environment } from '@/environments/environment';
import React from 'react';
import Slider from 'react-slick';

// Importa solo los estilos básicos de Slick Carousel
import 'slick-carousel/slick/slick.css';

// Datos de testimonios
const imageItems = [
  // environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-04.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-05.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-06.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-07.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-08.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-09.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-10.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-11.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-12.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-13.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-14.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-15.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-16.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-17.png',
  environment.baseUrlStorage+'/Multimedia/Imagen/Ccd/Logos/EMPRESAS-18.png',

  // Puedes agregar más URLs de imágenes aquí
];


const CarouselComponent = () => {
  // Configuración del carrusel
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 3, // Número de slides a mostrar por defecto
    slidesToScroll: 1, // Número de slides a desplazar al navegar
    autoplay: true, // Activa el autoplay
    autoplaySpeed: 2500, // Configura la velocidad del autoplay en milisegundos
    responsive: [
      {
        breakpoint: 1440, // Pantallas menores o iguales a 1440px
        settings: {
          slidesToShow: 2, // Mostrar 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Pantallas menores o iguales a 1024px
        settings: {
          slidesToShow: 1, // Mostrar 1 slide
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
      <button
        className="w-3 h-3 active:!bg-red-500 rounded-full bg-gray-300 hover:bg-gray-600 focus:outline-none border-2 border-transparent " // Añadimos un borde para cuando esté activo
      />
    ),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />

  };

  return (
    <div className="flex flex-col carousel-container py-8 w-full  max-sm:px-0 min-[500px]:px-0 lg:px-0  lg:max-w-7xl  relative">
      <Slider {...settings}>
        {imageItems.map((imageUrl, index) => (
          <div key={index} className="px-6">
            <div className="flex justify-center items-center  bg-white/20 shadow-md rounded-lg ">
              <img
                src={imageUrl}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full rounded-lg mb-4"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Componentes de flecha personalizados
const CustomNextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button
    className="absolute top-1/2 right-2 max-lg:right-12  transform -translate-y-1/2 translate-x-[200%] bg-[#00EADE] hover:bg-blue-700 text-[#162E54] p-2 rounded-full z-10 focus:outline-none"
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
);

const CustomPrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button
    className="absolute top-1/2 left-2 max-sm:left-12 transform -translate-y-1/2  -translate-x-[200%] bg-[#00EADE] hover:bg-blue-700 text-[#162E54] p-2 rounded-full z-10 focus:outline-none"
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
);

export default CarouselComponent;
