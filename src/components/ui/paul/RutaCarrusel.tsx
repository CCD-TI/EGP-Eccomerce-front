"use client";

import { Avatar, AvatarGroup } from "@heroui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import axios from "axios";
import { environment } from "@/environments/environment";

interface Producto {
  Curso: string;
  TipoModalidad: string;
}

interface Ruta {
  IdRuta: number;
  Ruta: string;
  ImagenPortada: string | null;
  Descripcion: string | null;
  Integrantes: number;
  Popularidad: string;
  Productos: Producto[];
}

export default function LearningPathCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rutas, setRutas] = useState<Ruta[]>([]);

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";

  // Función para obtener las rutas desde la API y seleccionar 7 aleatorias
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await axios.post(
          `${environment.baseUrl}/inicio/getRutas`,
          {}
        );
        let rutasData = response.data.data || [];

        // Aleatoriza y selecciona solo 7 rutas
        const rutasAleatorias = rutasData
          .sort(() => Math.random() - 0.5)
          .slice(0, 7);

        setRutas(rutasAleatorias);
      } catch (error) {
        console.error("Error fetching rutas:", error);
      }
    };

    fetchRutas();
  }, []);

  // Navegación del carrusel
  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % rutas.length);
    }
  };

  // Auto-movimiento del carrusel cada 3 segundos
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % rutas.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(autoSlide); // Limpieza del intervalo al desmontar el componente
  }, [rutas]);

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + rutas.length) % rutas.length);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Tiempo de transición

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="h-full bg-[#0B1120] py-12 px-4 md:px-8">
      <div className="w-[90%] max-w-[100rem] mx-auto">
        {/* Título */}
        <div className="text-center mb-12 flex flex-col gap-3">
          <h1 className="text-colors-cyan-ccd text-4xl md:text-5xl font-bold">
            Descubre
          </h1>
          <h2 className="text-white text-4xl md:text-5xl font-bold filter drop-shadow-lg neon-white">
            MÁS RUTAS
          </h2>
        </div>

        {/* Carrusel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {rutas.map((ruta, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="flex max-lg:flex-col gap-6 bg-gradient-to-br from-[rgba(0,97,254,0)] via-[rgba(22,46,84,0.19)] to-[rgba(0,97,254,0.16)] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl">
                  <div className="w-[380px] max-lg:w-full bg-colors-dark-blue-ccd p-6 rounded-2xl flex flex-col max-lg:gap-4 max-lg:flex-row justify-center max-lg:items-center max-sm:flex-col">
                    <img
                      src={storageUrl + ruta.ImagenPortada}
                      alt={ruta.Ruta}
                      className="rounded-2xl max-lg:w-[50%] max-sm:w-full"
                    />
                    <div className="flex flex-col gap-4 text-white mt-4 max-lg:w-[50%] max-sm:w-full">
                      <h1 className="flex gap-2 items-center justify-center">
                        <span className="flex gap-2 items-center">
                          <FaUser /> {ruta.Integrantes} integrantes
                        </span>
                        <span className="font-bold text-colors-cyan-ccd">
                          |
                        </span>
                        <span className="flex gap-2 items-center">
                          <BiSolidLike /> {ruta.Popularidad}
                        </span>
                      </h1>
                      <Link
                        href={`/rutadetalle/${ruta.Ruta.toLowerCase().replace(
                          /\s+/g,
                          "-"
                        )}?rid=${ruta.IdRuta}`}
                        className="w-full"
                      >
                        <button className="w-full p-2 px-4 rounded-xl bg-colors-cyan-ccd text-colors-dark-blue-ccd text-lg font-bold">
                          Descubrir Ruta
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-4 text-white p-6">
                    <div className="w-full flex gap-6 max-md:flex-col items-end">
                      <div className="w-[70%] max-md:w-full flex flex-col gap-3">
                        <h1 className="w-full text-3xl">{ruta.Ruta}</h1>
                        <div className="w-full h-[3px] bg-[#3185F7]" />
                        <h2>{ruta.Descripcion}</h2>
                      </div>
                    </div>

                    {/* Módulos */}
                    <ul className="flex flex-col gap-4">
                      {Array.from(
                        new Set(
                          ruta.Productos.map((producto) => producto.Curso)
                        )
                      ).map((curso, idx) => (
                        <li key={idx}>
                          <h1 className="p-[8px] w-full rounded-full border-2 border-[#0E4C5A] relative">
                            <span className="bg-[#142143] absolute -top-[2px] left-[-6px] rounded-full border-2 border-[#0E4C5A] p-2 px-4 text-colors-cyan-ccd text-base">
                              {idx + 1}
                            </span>
                            <h1 className="pl-8">{curso}</h1>{" "}
                            {/* Solo muestra el nombre del curso */}
                          </h1>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navegación del Carrusel */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="text-cyan-400 p-2 hover:scale-110 transition-transform disabled:opacity-50"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
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

            {rutas.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-cyan-400 w-4" : "bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
              />
            ))}

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="text-cyan-400 p-2 hover:scale-110 transition-transform disabled:opacity-50"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
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
          </div>
        </div>
      </div>
    </div>
  );
}
