import React from 'react';
import Slider from 'react-slick';
import { environment } from '@/environments/environment';

// Importa solo los estilos básicos de Slick Carousel
import 'slick-carousel/slick/slick.css';
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';
// import { Autoplay } from 'swiper/modules';

// Datos para los slides del carrusel
const items = [
  {
    title: 'Mauricio Chumán',
    rating: 5,
    text: 'Mi experiencia en el centro de capacitación y desarrollo ha sido excelente. La atención es muy personalizada y tienen un enfoque práctico en todos sus cursos.',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/1.jpg',
  },
  {
    title: 'Luz Castañeda',
    rating: 4.5,
    text: 'lo recomiendo, los docentes el soporte la plataforma virtual que me dieron es excelente agradezco a mi asesor Adriano que fue de gran ayuda',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/luz castañeda.jpg',
  },
  {
    title: 'Jahayra Gutierrez',
    rating: 4.5,
    text: 'Mi experiencia en el centro de capacitación y desarrollo ha sido extraordinaria. Los docentes son profesionales de alta calidad. Además su aula virtual es muy funcional',

    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Jahayra Gutierrez.jpg',
  },
  {
    title: 'Stephany Sanchez',
    rating: 5,
    text: 'Me encanto el profesor de maestro de obra  muy didáctico y explica bien.',

    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Stephany Sanchez.jpg',
  },
  {
    title: 'Milko Ruiz',
    rating: 4.5,
    text: 'Muy buena metodología y enseñanza.',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Milko Ruiz.jpg',
  },
  {
    title: 'Mary Gutierrez',
    rating: 4.5,
    text: 'Me encanto su metodología de enseñanza, los docentes son unos capos. Su área administrativa muy atenta, excelente experiencia ',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Mary Gutierrez.jpg',
  },
  {
    title: 'Joanie Reyes',
    rating: 4.5,
    text: 'Excelente atención por mensajes. El curso me ayudo en mi perfil profesional. Recomendado!',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Joanie Reyes.jpg',
  },
  {
    title: 'Daniel Alva',
    rating: 4.5,
    text: '100% recomendado! Las clases son super dinámicas y los profesores son los mejores ',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Daniel Alva.jpg',
  },
  {
    title: 'David Paniura',
    rating: 4.5,
    text: 'Excelente 100% recomendado, docentes y parte administrativa de primer nivel, muy buenas especializaciones…',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/David Paniura.jpg',
  },
  {
    title: 'Jandira Maria',
    rating: 4.5,
    text: 'Excelente plana docente, malla curricular de primera,  competitiva en el área educativa...muy recomendado!',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Jandira Maria.jpg',
  },
  {
    title: 'Cesar Augusto',
    rating: 4.5,
    text: 'Gracias CCD, me especialicé y certifiqué con el CIP en tiempo corto y con una enseñanza de cálidad !',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Cesar Augusto.jpg',
  },
  {
    title: 'Gianella Atto',
    rating: 4.5,
    text: 'Muy satisfecha con el curso de Excel Profesional que recibí en el CCD.Los docentes son expertos y el enfoque práctico del cursonse adapta al ámbito laboral.EXCELENTES CURSOS!!',


    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Gianella Atto.jpg',
  },
  {
    title: 'Adriano Arollo',
    rating: 4.5,
    text: 'Excelente capacitación, estoy tomando mi 2do curso y buenos profesionales. Muy recomendado.',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Adriano Arollo.jpg',
  },
  {
    title: 'Rodrigo Nicho',
    rating: 4.5,
    text: 'Recomiendo mucho CCD para una buena capacitación. Sus programas están muy bien estructurados.',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Rodrigo Nicho.jpg',
  },
  {
    title: 'Raysha Caballero',
    rating: 4.5,
    text: 'Excelentes docentes, clases didácticas, atención personalizada.  ¡RECOMENDADO!',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Raysha Caballero.jpg',
  },
  {
    title: 'Diego Silva',
    rating: 4.5,
    text: 'Sus cursos te capacitan y enseñan lo que necesitas para cuando empieces a trabajar. Contenido de calidad!! Totalmente recomendado ',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Diego Silva.jpg',
  },
  {
    title: 'Fiore Alvarado',
    rating: 4.5,
    text: 'Clases didácticas, profesores capacitados y una atención muy buena.¡Los recomiendo!',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Fiore Alvarado.jpg',
  },
  {
    title: 'Zulema Zea',
    rating: 4.5,
    text: 'tienen clases muy didácticas',
    imageUrl: environment.baseUrlStorage + '/Multimedia/Imagen/Usuarios/Perfil/Zulema Zea.jpg',
  },
];

const CarouselComponent = () => {
  // Configuración del carrusel
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    autoplay: true, // Activa el autoplay
    autoplaySpeed: 2500,
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

  const RatingStars = ({ rating }: any) => {
    // Obtener la parte entera y decimal del rating
    const fullStars = Math.floor(rating); // estrellas llenas
    const hasHalfStar = rating % 1 !== 0; // media estrella si no es número entero
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // estrellas vacías

    return (
      <p className="mb-2 text-black flex gap-2">
        {/* Renderizar estrellas llenas */}
        {Array(fullStars).fill(<FaStar className='text-[#00EADE]' />)}

        {/* Renderizar media estrella si existe */}
        {hasHalfStar && <FaRegStarHalfStroke className='text-[#00EADE]' />}

        {/* Renderizar estrellas vacías */}
        {Array(emptyStars).fill(<FaRegStar className='text-[#00EADE]' />)}
      </p>
    );
  };

  return (
    <div className="carousel-container w-full flex flex-col  justify-center py-8 max-w-xl  px-[6rem] max-sm:px-0 min-[500px]:px-0 lg:px-0 lg:max-w-7xl relative">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-6 ">
            <div className="w-full h-[20rem] flex flex-col justify-center items-center gap-2 shadow-xl rounded-xl p-4 bg-white/20" >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-20 rounded-[50%] mb-4 text-black"
              />
              <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
              <RatingStars rating={item.rating} />
              <p className=" text-white ">{item.text}</p>
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
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#00EADE] hover:bg-blue-700 text-black p-2 rounded-full z-10 focus:outline-none"
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
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#00EADE] hover:bg-blue-700 text-black p-2 rounded-full z-10 focus:outline-none"
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
