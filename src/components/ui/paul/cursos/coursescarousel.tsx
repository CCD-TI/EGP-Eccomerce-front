"use client";

import React, { useState,useEffect } from "react";
import CourseCard from "@/components/ui/paul/coursecard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

const courses = [
    {
      college: "gestión",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso-hd.png`,
      label: "Top ventas",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "ingeniería",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso-hd.png`,
      label: "Nuevo",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "minería",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso2-hd.png`,
      label: "Top ventas",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "gestión",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso2-hd.png`,
      label: "Nuevo",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "gestión",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso-hd.png`,
      label: "Top ventas",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "ingeniería",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso-hd.png`,
      label: "Nuevo",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "minería",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso2-hd.png`,
      label: "Top ventas",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "gestión",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso2-hd.png`,
      label: "Nuevo",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "gestión",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso-hd.png`,
      label: "Top ventas",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "ingeniería",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso-hd.png`,
      label: "Nuevo",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "minería",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso2-hd.png`,
      label: "Top ventas",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    {
      college: "gestión",
      imageUrl: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/curso2-hd.png`,
      label: "Nuevo",
      title: "Nombre del curso (Pero no más de dos líneas)",
      participants: "0000 Integrantes",
      rating: "99% (7K)",
      modules: "00 Módulos",
      hours: "00 Horas",
      oldPrice: "S/2334.80",
      newPrice: "S/1796.00",
    },
    // Agrega más Cursos...
  ];

  const CoursesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const visibleCards = 4; // Tarjetas visibles
    const totalCards = courses.length;
  
    // Lógica para avanzar al siguiente curso
    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    };
  
    // Lógica para retroceder al curso anterior
    const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    };
  
    // Movimiento automático
    useEffect(() => {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="bg-[#131939] py-10 flex items-center justify-center text-center relative">
        <div className="w-full max-w-[1200px] relative flex items-center">
          {/* Botón Izquierdo */}
          <button
            onClick={handlePrev}
            className="absolute left-[-40px] transform bg-cyan-400 text-[#131939] rounded-full p-3 z-10 hover:bg-cyan-300"
          >
            <FaChevronLeft size={20} />
          </button>
  
          {/* Contenedor del Carrusel */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                width: `${(totalCards / visibleCards) * 100}%`,
              }}
            >
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="px-2 box-border"
                  style={{ flex: `0 0 ${100 / visibleCards}%` }}
                >
                  <CourseCard {...course} />
                </div>
              ))}
            </div>
          </div>
  
          {/* Botón Derecho */}
          <button
            onClick={handleNext}
            className="absolute right-[-40px] transform bg-cyan-400 text-[#131939] rounded-full p-3 z-10 hover:bg-cyan-300"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };
  
  export default CoursesCarousel;