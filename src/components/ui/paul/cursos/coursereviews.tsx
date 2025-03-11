"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaUsers, FaComments, FaHeart, FaThumbsUp } from "react-icons/fa";
import CarruselComend from "@/components/ui/paul/carruselComend";

// Datos dinámicos del carrusel
const testimonials = [
  {
    name: "Cristhian Maldonado",
    profession: "Ingeniero Civil",
    comment:
      "Muy buen curso, buen profesor que sabe del tema 100% recomendado.",
    likes: 20,
    hearts: 20,
  },
  {
    name: "María Fernández",
    profession: "Arquitecta",
    comment:
      "Excelente contenido y plataforma. El curso es práctico y fácil de entender.",
    likes: 18,
    hearts: 25,
  },
  {
    name: "Luis González",
    profession: "Ingeniero Mecánico",
    comment: "La certificación me ayudó a mejorar profesionalmente.",
    likes: 22,
    hearts: 30,
  },
];

// Configuración del carrusel
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CourseReviews: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 h-[800px] text-white py-12 px-6 overflow-x-visible bg-CursoComends ">
      {/* Título */}

      <h2 className="flex flex-col text-center  justify-center items-center">
        <span className="text-5xl font-bold neon-white">OPINIONES</span>
        <span className="text-cyan-400 text-4xl font-bold">Del Curso</span>
      </h2>
      {/* Contenido en dos columnas */}
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto justify-center items-center h-full pb-[12rem]  max-xl:pb-0 ">
        {/* Primera Columna: Métricas */}
        <div
          className="flex max-2xl:flex-col w-fit  max-sm:mt-5    gap-6 items-center justify-center 
        p-4 px-10 rounded-2xl shadow-md bg-gradient-to-br from-[rgba(0,97,254,0.14)] via-[rgba(22,46,84,0.22)] to-[rgba(0,97,254,0.13)] border-2 border-[rgba(22,46,84,0.7)]"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <FaUsers size={50} className="text-white" />
              <div className="flex gap-4 items-center">
                <h3 className="text-5xl  max-lg:text-2xl font-bold">035.340</h3>
                <p className="text-2xl  max-lg:text-xl text-gray-300">
                  Estudiantes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaComments size={50} className="text-white" />
              <div className="flex gap-4 items-center">
                <h3 className="text-5xl  max-lg:text-2xl font-bold">145.430</h3>
                <p className="text-2xl max-lg:text-xl text-gray-300">
                  Opiniones
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-8xl  max-lg:text-5xl font-bold text-white neon-white">98%</h3>
            <p className="text-2xl text-gray-300">Recomendación</p>
          </div>
        </div>

        {/* Segunda Columna: Carrusel de Opiniones */}
        <CarruselComend />
      </div>
    </section>
  );
};

// Flecha izquierda personalizada
const CustomLeftArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10 text-cyan-400 text-4xl hover:text-cyan-300 transition-all"
  >
    &#8249;
  </button>
);

// Flecha derecha personalizada
const CustomRightArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10 text-cyan-400 text-4xl hover:text-cyan-300 transition-all"
  >
    &#8250;
  </button>
);

export default CourseReviews;
