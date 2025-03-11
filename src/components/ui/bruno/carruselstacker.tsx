import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

// Importa solo los estilos básicos de Slick Carousel
import 'slick-carousel/slick/slick.css';


// Datos de testimonios
const items = [
  {
    title: 'Testimonios',
    rating: "",
    text: 'todos nuestros clientes satisfechos',
    imageUrl: '/Multimedia/Imagen/logos/LogoCCDcontra.png',
    lorensito:
    '', 
   },
  {
    title: 'Testimonio 2',
    rating: 4.5,
    text: 'Muy recomendable...',
    imageUrl: '/Multimedia/Imagen/user/user2.jpg',
    lorensito:
    'es un buen curso me agrada el tema',  },
  {
    title: 'Testimonio 3',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user5.jpg',
    lorensito:
    'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user3.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user3.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user5.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user3.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user4.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user2.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user5.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user5.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user2.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user2.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
  {
    title: 'Testimonio 4',
    rating: 4.5,
    text: 'Aprendí mucho...',
    imageUrl: '/Multimedia/Imagen/user/user2.jpg',
    lorensito:
      'es un buen curso me agrada el tema',
  },
];

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para rastrear la diapositiva central
  const [isMobile, setIsMobile] = useState(false); // Estado para determinar si es vista móvil

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Establecer el estado inicial
    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Configuración del carrusel
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 300, // Velocidad de transición
    slidesToShow: isMobile ? 1 : 3, // Mostrar 1 slide si es móvil, de lo contrario 3
    autoplay: true, // Activa el autoplay
    autoplaySpeed: 2500, // Configura la velocidad del autoplay en milisegundos
    afterChange: (index: number) => setCurrentSlide(index + Math.floor(settings.slidesToShow / 2)), // Ajusta el índice central después del cambio
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
    appendDots: (dots: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => (
      <div>
        <ul className="flex justify-center mt-4 space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i: any) => (
      <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-600 focus:outline-none border-2 border-transparent active:border-blue-500" />
    ),
    nextArrow: <CustomNextArrow onClick={undefined} />,
    prevArrow: <CustomPrevArrow onClick={undefined} />,
  };

  return (
    <div className="flex flex-col carousel-container  py-8 max-w-xl px-[6rem] min-[500px]:px-0 lg:px-0 lg:max-w-7xl relative" >
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="flex flex-col justify-center">
            <div className='flex justify-center items-center w-full h-[10rem] font-bold text-xl'>
              {/* Mostrar el contenido <h1> solo si el slide está centrado en pantallas grandes o siempre en móvil */}
              {isMobile || (!isMobile && index === currentSlide) ? (
                <h1 className='text-center  text-white'>{item.lorensito}</h1>
              ) : null}
            </div>
           
            <div className="flex flex-col justify-center items-center gap-2 p-4">
              <div className='w-[11rem] h-[11rem] rounded-full p-2 bg-blue-600 flex justify-center items-center'>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[10rem] h-[10rem] rounded-full "
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              {/* <p className="text-gray-600 mb-2">Rating: {item.rating} ⭐</p> */}
              {/* <p className="text-gray-800">{item.text}</p> */}
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
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500/70 hover:bg-blue-700 text-white p-2 rounded-full z-10 focus:outline-none"
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
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-500/70 hover:bg-blue-700 text-white p-2 rounded-full z-10 focus:outline-none"
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