import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const images = [
  // `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-autodesk-institute-cyan.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-pmi-white.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdidp-cyan.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdedp-white.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-ccd-cyan.svg`,
  // `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-autodesk-institute-white.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-pmi-cyan.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdidp-white.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdedp-cyan.svg`,
  `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-ccd-white.svg`,
];

const CarouselComponent = () => {
  const settings = {
    dots: false, // Sin puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 4000, // Velocidad del desplazamiento (más alta para un efecto continuo)
    autoplay: true, // Activar autoplay
    autoplaySpeed: 0, // El autoplay es continuo, no tiene pausas
    cssEase: 'linear', // Movimiento continuo
    slidesToShow: 5, // Mostrar 5 imágenes en pantalla
    slidesToScroll: 1, // Desplazar una imagen a la vez
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Pantallas menores a 1024px
        settings: {
          slidesToShow: 3, // Mostrar 3 imágenes
        },
      },
      {
        breakpoint: 768, // Pantallas menores a 768px
        settings: {
          slidesToShow: 2, // Mostrar 2 imágenes
        },
      },
      {
        breakpoint: 480, // Pantallas menores a 480px
        settings: {
          slidesToShow: 1, // Mostrar 1 imagen
        },
      },
    ],
  };

  return (
    <div className="carousel-container w-full overflow-hidden bg-[#0b1026]">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="flex justify-center items-center px-2">
              <img
                src={image}
                alt={`Logo ${index + 1}`}
                className="max-h-40 w-80" // Ajusta el tamaño del logo
              />
            </div>
          ))}
        </Slider>
    </div>
  );
};

export default CarouselComponent;
