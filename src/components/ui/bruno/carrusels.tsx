import React from 'react';
import Slider from 'react-slick';

// Importa solo los estilos básicos de Slick Carousel
import 'slick-carousel/slick/slick.css';

// Datos para los slides del carrusel
const items = [
  {
    name: 'Jose Buleje Guillen',
    profession: 'Profesional en Ingeniería Civil',
    specialization: 'Ing. Civil',
    imageUrl: '/Multimedia/Imagen/relleno/Profesor.webp', // Usamos la misma imagen para todos
  },
  {
    name: 'María Pérez',
    profession: 'Profesora de Matemáticas',
    specialization: 'Matemáticas Avanzadas',
    imageUrl: '/Multimedia/Imagen/relleno/Profesor.webp', // Usamos la misma imagen para todos
  },
  {
    name: 'Carlos García',
    profession: 'Experto en Programación',
    specialization: 'Desarrollador Full Stack',
    imageUrl: '/Multimedia/Imagen/relleno/Profesor.webp', // Usamos la misma imagen para todos
  },
];

const CarouselComponent = () => {
  // Configuración del carrusel
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 3, // Número de slides a mostrar
    slidesToScroll: 1, // Número de slides a desplazar al navegar
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
      <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-600 focus:outline-none border-2 border-transparent active:border-blue-500" />
    ),
    nextArrow: <CustomNextArrow />, 
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="carousel-container w-full flex flex-col  justify-center py-8 max-w-xl  px-[6rem] max-sm:px-0 min-[500px]:px-0 lg:px-0 lg:max-w-7xl relative">
      <Slider {...settings}>
        {items.map((item, index) => (
        <div key={index} className="px-6">
          <div  className="w-full h-full flex flex-col  items-center  rounded-lg text-white bg-white/20">
            <div className="w-full h-[70%] flex justify-center items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="w-full h-[40%] flex flex-col justify-center items-center  p-4 ">
              <p className="mt-2 text-center text-sx lg:text-base font-bold">{item.name}</p>
              <p className="mt-2  text-center">{item.profession}</p>
              <div className="w-full text-xs lg:text-md  border-t-2 border-gray-300 my-4"></div>
              <p className="mt-2 text-xs lg:text-md text-center p-2  text-white  rounded-md">
                {item.specialization}
              </p>
            </div>
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
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#00EADE]  text-[#162E54] p-2 rounded-full z-10 focus:outline-none"
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
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#00EADE] text-[#162E54] p-2 rounded-full z-10 focus:outline-none"
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
