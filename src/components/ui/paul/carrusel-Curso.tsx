"use client";

import { Heart, ThumbsUp, User2 } from "lucide-react";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import CourseCard from "@/components/ui/paul/coursecard";
import axios from "axios";
import { environment } from "@/environments/environment";

// Importa solo los estilos básicos de Slick Carousel
import "slick-carousel/slick/slick.css";
import CourseCardFront from "./coursecardfront";
import CourseCardFront2 from "./CourseCardFront2";

const courses = [
  {
    id: 1,
    Curso: "Nombre del curso (Pero no mas de dos líneas) Color - Ingeniería",
    RutaImagen: "/Multimedia/Imagen/Cursos/PortadaFinal/101_PVSB.png",
    participants: 0,
    completionRate: 99,
    modules: 0,
    hours: 0,
  },
  {
    id: 2,
    Curso: "Nombre del curso (Pero no mas de dos líneas) Color - Seguridad",
    RutaImagen: "/Multimedia/Imagen/Cursos/PortadaFinal/101_PVSB.png",
    participants: 0,
    completionRate: 99,
    modules: 0,
    hours: 0,
  },
  {
    id: 3,
    Curso:
      "Nombre del curso (Pero no mas de dos líneas) Color - Medio ambiente",
    RutaImagen: "/Multimedia/Imagen/Cursos/PortadaFinal/101_PVSB.png",
    participants: 0,
    completionRate: 99,
    modules: 0,
    hours: 0,
  },
  {
    id: 4,
    Curso:
      "Nombre del curso (Pero no mas de dos líneas) Color - Medio ambiente",
    RutaImagen: "/Multimedia/Imagen/Cursos/PortadaFinal/101_PVSB.png",
    participants: 0,
    completionRate: 99,
    modules: 0,
    hours: 0,
  },
  {
    id: 5,
    Curso: "Nombre del curso (Pero no mas de dos líneas) Color - Tecnología",
    RutaImagen: "/Multimedia/Imagen/Cursos/PortadaFinal/101_PVSB.png",
    participants: 0,
    completionRate: 99,
    modules: 0,
    hours: 0,
  },
];

type Producto = {
  TipoModalidad: string;
  IdProducto: number;
  Precio: number;
};

type CursoDetalleTP = {
  Productos: Producto[];
  Descripcion: string;
  Calificacion: string;
  Seguidores: string;
  Nivel: string;
  MarcasRespaldo: string;
  ExamenParcial: number;
  ExamenFinal: number;
  Profesores: string;
  Frecuencia: string;
  HorasAcademicas: string;
  Estado_id: string;
  UltimaFechMod: string;
  Escuela: string;
  Especializacion: string;
  IdEspecializacion: number;
  IdCurso: number;
  Curso: string;
  TipoCurso: string;
  RutaImagen: string;
  CantidadModulos: number;
};

const CarouselComponent = ({
  escuela,
  especializacion,
}: {
  escuela: string;
  especializacion: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cursoDetalle, setCursoDetalle] = React.useState<CursoDetalleTP[]>([]);
  const [error, setError] = useState<string | null>(null);
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  // Configuración del carrusel
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 400, // Velocidad de transición
    slidesToShow: 4, // Número de slides a mostrar por defecto
    slidesToScroll: 1, // Número de slides a desplazar al navegar
    autoplay: true, // Activa el autoplay
    autoplaySpeed: 1500, // Configura la velocidad del autoplay en milisegundos
    responsive: [
      {
        breakpoint: 1920, // Pantallas grandes, monitores UHD/4K
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1600, // Pantallas anchas
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440, // Laptops grandes y pantallas de escritorio estándar
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // Resolución común para laptops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablets grandes o laptops pequeñas
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Dispositivos móviles grandes
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Dispositivos móviles pequeños
        settings: {
          slidesToShow: 1,
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

  // Fetch Especializaciones
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Obtener cursos
        const responseCursos = await api.post(
          "/inicio/getcursoescuelaespecializacion",
          {
            Escuela: escuela,
            Especializacion: especializacion,
          }
        );

        // Convierte a un array si es necesario
        const data = responseCursos.data.data;
        setCursoDetalle(Array.isArray(data) ? data : [data]);
        console.log("Cursos recibidos:", Array.isArray(data) ? data : [data]);

        // console.log("Respuesta del backend:", responseCursos.data);
      } catch (error: any) {
        console.error(
          "Error al obtener datos:",
          error.response ? error.response.data : error.message
        );
        setError("Error al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="flex flex-col carousel-container py-8 w-[90%] xxl:w-[50%] qhd:w-[40%] 4k:w-[25%] mx-auto max-2xl:w-[80%] max-sm:w-full   px-[6rem] max-sm:px-0 min-[500px]:px-0 lg:px-0    relative"
      data-aos="zoom-out-right"
      data-aos-delay="200"
    >
      <div>
        <h2 className="text-4xl font-bold text-center text-colors-cyan-ccd mb-10">
          Continua potenciando
        </h2>
        <p className="text-center font-bold neon-white text-4xl">TU PERFIL</p>
      </div>
      <Slider {...settings}>
        {cursoDetalle.map((course, index) => (
          <div
            key={index}
            className={`w-full sm:w-1/2 lg:w-1/4 transition-transform duration-300 ease-in-out  py-10 px-6`}
          >
            <CourseCardFront2
              array={course}
              pid={course.IdCurso}
              ruta={course.Curso}
              openSideSheet={() => {}}
            />
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
    className="absolute top-[44%] -right-6 max-sm:right-[0.5rem] transform -translate-y-1/2   text-colors-cyan-ccd p-2 rounded-full z-10 focus:outline-none"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
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
    className="absolute top-[44%] -left-6 max-sm:left-[0.5rem] transform -translate-y-1/2 text-colors-cyan-ccd p-2 rounded-full z-10 focus:outline-none"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
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
