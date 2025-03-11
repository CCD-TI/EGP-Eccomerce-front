import { Heart, ThumbsUp, User2 } from "lucide-react";
import React from "react";
import Slider from "react-slick";

// Importa solo los estilos básicos de Slick Carousel
import "slick-carousel/slick/slick.css";

// Datos de testimonios
const testimonials = [
  {
    id: 1,
    name: "Cristhian Maldonado",
    title: "Ingeniero Civil",
    content:
      "Muy buen curso, buen profesor que sabe del tema 100% recomendado.",
    likes: 20,
    hearts: 20,
  },
  {
    id: 2,
    name: "Carlos Pérez",
    title: "Desarrollador Web",
    content:
      "Excelente contenido, cubre muchos aspectos importantes de la programación.",
    likes: 15,
    hearts: 10,
  },
  {
    id: 3,
    name: "Ana González",
    title: "Ingeniera de Software",
    content:
      "La explicación es clara y concisa, lo recomendaría a mis colegas.",
    likes: 25,
    hearts: 30,
  },
];

const CarouselComponent = () => {
  // Configuración del carrusel
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 400, // Velocidad de transición
    slidesToShow: 2, // Número de slides a mostrar por defecto
    slidesToScroll: 1, // Número de slides a desplazar al navegar
    autoplay: true, // Activa el autoplay
    autoplaySpeed: 1500, // Configura la velocidad del autoplay en milisegundos
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
        className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-600 focus:outline-none border-2 border-transparent active:border-blue-500" // Añadimos un borde para cuando esté activo
      />
    ),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div
      className="flex flex-col carousel-container py-8 w-[70%] max-2xl:w-[70%] max-sm:w-full   px-[6rem] max-sm:px-0 min-[500px]:px-0 lg:px-0  lg:max-w-7xl   relative"
      data-aos="zoom-out-right"
      data-aos-delay="200"
    >
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="!bg-transparent  px-6">
            <div className="relative p-6 py-16 bg-white/ backdrop-blur-sm rounded-2xl">
              {/* Máscara con bordes en gradiente */}
              <div className="absolute inset-0  border-transparent bg-gradient-to-br from-white/20 to-transparent mask mask-border rounded-2xl" />

              {/* Contenido */}
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <User2 className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-white/80 mb-4 relative z-10">
                {testimonial.content}
              </p>
              <div className="flex gap-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{testimonial.hearts}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{testimonial.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Componentes de flecha personalizados
const CustomNextArrow = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    className="absolute top-[44%] -right-6 max-sm:right-[0.5rem] transform -translate-y-1/2  hover:bg-white text-colors-cyan-ccd p-2 rounded-full z-10 focus:outline-none"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

const CustomPrevArrow = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    className="absolute top-[44%] -left-6 max-sm:left-[0.5rem] transform -translate-y-1/2   hover:bg-white text-colors-cyan-ccd p-2 rounded-full z-10 focus:outline-none"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

export default CarouselComponent;
