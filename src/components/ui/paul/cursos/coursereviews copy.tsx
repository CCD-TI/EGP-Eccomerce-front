"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaUsers, FaComments, FaHeart, FaThumbsUp } from "react-icons/fa";

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
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CourseReviews: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-6">
      {/* Título */}
      <h2 className="flex flex-col text-center mb-8">
        <span className="text-4xl font-bold neon-white">OPINIONES</span>
        <span className="text-cyan-400 text-3xl font-bold">Del Curso</span>
      </h2>

      {/* Contenido en dos columnas */}
      <div className="flex gap-8 max-w-6xl mx-auto items-center">
        {/* Primera Columna: Métricas */}
        <div className="flex w-2/5 gap-6 items-center justify-center p-4 rounded-2xl shadow-md hover:scale-105 transform transition duration-300
              bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)]">
          <div className="flex flex-col">

            <div className="flex items-center gap-4">
              <FaUsers size={40} className="text-cyan-400" />
              <div>
                <h3 className="text-3xl font-bold">000.000</h3>
                <p className="text-lg text-gray-300">Estudiantes</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaComments size={40} className="text-cyan-400" />
              <div>
                <h3 className="text-3xl font-bold">300.000</h3>
                <p className="text-lg text-gray-300">Opiniones</p>
              </div>
            </div>

          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-6xl font-extrabold text-cyan-400">98%</h3>
            <p className="text-lg text-gray-300">Recomendación</p>
          </div>
        </div>

        {/* Segunda Columna: Carrusel de Opiniones */}
        <div className="relative lg:w-3/5">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={5000}
            arrows
            showDots={false}
          >            
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-4"
              >
                {/* Encabezado */}
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-400 rounded-full p-4 text-gray-800 font-bold">
                    <FaUsers size={30} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{testimonial.name}</h4>
                    <p className="text-cyan-400">{testimonial.profession}</p>
                  </div>
                </div>

                {/* Comentario */}
                <p className="text-gray-300">{testimonial.comment}</p>

                {/* Reacciones */}
                <div className="flex gap-6 items-center">
                  <div className="flex items-center gap-2">
                    <FaHeart className="text-cyan-400" />
                    <span>{testimonial.hearts}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaThumbsUp className="text-cyan-400" />
                    <span>{testimonial.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CourseReviews;
