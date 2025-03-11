"use client";

import { Button, Link } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import axios from "axios";
import { environment } from "@/environments/environment";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const BannerCarouselCollege: React.FC<{
  escuela: string;
  tipomodalidad: string;
}> = ({ escuela, tipomodalidad }) => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
  const img = {
    slide1: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria.png`,
    slide2: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria2.png`,
    slide3: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria3.png`,
  };

  // PRUEBA
  const slides = [
    {
      img: img.slide1,
      title: "INICIO DE CLASES",
      subtitle: "Control de operaciones mineras",
      date: "26 de Nov - 07:30 pm",
      buttons: [
        {
          text: "CONOCER MÁS DEL CURSO",
          style:
            "bg-[#00d3c5] shadow-[0_0_15px_3px_rgba(0,234,223,0.5)] text-colors-night-blue-ccd2",
        },
        {
          text: "OBTENER CON SUSCRIPCIÓN",
          style:
            "bg-[#fff] shadow-[0_0_15px_3px_rgba(255,255,255,0.5)] text-colors-sky-ccd",
        },
      ],
    },
    {
      img: img.slide2,
      title: "NUEVO PROGRAMA",
      subtitle: "Gestión en minería avanzada",
      date: "15 de Dic - 06:00 pm",
      buttons: [
        { text: "MÁS INFORMACIÓN", style: "bg-blue-500 text-white" },
        { text: "INSCRIBIRSE AHORA", style: "bg-white text-gray-800" },
      ],
    },
    {
      img: img.slide3,
      title: "DIPLOMADO",
      subtitle: "Seguridad en minería",
      date: "10 de Ene - 05:00 pm",
      buttons: [
        { text: "VER DETALLES", style: "bg-purple-500 text-white" },
        { text: "APÚNTATE YA", style: "bg-white text-gray-800" },
      ],
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // PRUEBA

  interface CursoDetalle {
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
    NumeroWhatsapp: string;
    Escuela: string;
    Especializacion: string;
    IdProducto: number;
    IdCurso: number;
    Curso: string;
    TipoCurso: string;
    TipoModalidad: string;
    Precio: number;
    FechaInicio: string | null;
    Horario: string | null;
    RutaImagen: string[];
    CantidadModulos: number;
    isSelected: boolean; // Propiedad adicional
  }

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  // Data cursos
  const [cursosCompletos, setcursosCompletos] = useState<CursoDetalle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Endpoint para obtener los cursos
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.post("/inicio/getcursosav", {});

        // Transformar los datos
        const transformedData = response.data.data.map((item: any) => ({
          ...item.json_build_object, // Extraer las propiedades del objeto interno
          isSelected: false, // Inicializar isSelected como falso
        }));

        // Filtrar según Escuela y TipoModalidad
        const filteredData = transformedData.filter(
          (curso: CursoDetalle) =>
            curso.Escuela === escuela && curso.TipoModalidad === tipomodalidad
        );

        setcursosCompletos(filteredData);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setError("Error al cargar los datos del curso.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [escuela, tipomodalidad]); // Escuchar cambios en escuela y tipomodalidad

  if (isLoading) {
    return <p>Cargando cursos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const img2 = {
    fondos: {
      mineria1: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria.png`,
      mineria2: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria2.png`,
      mineria3: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria3.png`,
    },
    logos: {
      ccd: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/ccd-logo-white.svg`,
      gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
      ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
      mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
      rutas: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-rutas-white.svg`,
    },
  };
  return (

    
    <div className="relative  -top-24 -mb-24 bg-gradient-to-br from-[#0F172A] to-[#1E293B] place-items-center -z-100 " data-aos="fade-up" >
      
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        arrows={false}
        showDots={false}
        className="w-full h-screen"
        partialVisbile={true}
        
      >
        {cursosCompletos.map((producto: CursoDetalle, index: number) => (
          
         <div key={index} className="relative flex items-center h-screen w-full">
         <Image
           src={storageUrl + producto.RutaImagen[0]} // La ruta de la imagen
           alt={`Imagen`} // Descripción alternativa
           layout="fill" // Hace que la imagen ocupe todo el contenedor
           objectFit="cover" // Para mantener la relación de aspecto de la imagen sin deformarse
           objectPosition="center top" // Centra la imagen verticalmente y la pega hacia arriba
           priority
           
           blurDataURL="/Multimedia/Imagen/fondo/Fondop1.jpeg" // Miniatura base64

         />
         
            {/* Overlay */}
            <div
              className={`absolute inset-0 
              ${
                producto.Escuela === "Gestión"
                  ? "bg-gradient-to-r from-neutral-900 to-red-800 bg-opacity-30  max-lg:bg-gradient-to-t max-lg:from-red-700/40 via-stone-900/80 max-lg:to-red-700/30"
                  : producto.Escuela === "Ingeniería"
                  ? "bg-gradient-to-r from-neutral-900 to-blue-900 bg-opacity-30   max-lg:bg-gradient-to-t max-lg:from-blue-700/40 via-stone-900/80 max-lg:to-blue-700/30"
                  : "bg-gradient-to-r from-neutral-900 to-orange-600/80 bg-opacity-80  max-lg:bg-gradient-to-t  max-lg:from-orange-700/40 via-stone-900/80  max-lg:to-orange-700/30"
              }
              `}
            ></div>
            {/* Content Overlaid */}
            <div className="relative max-w-7xl px-6 lg:px-40 flex flex-col gap-2 text-white pt-16">
              <div className="flex gap-4 mb-6">
                <div
                  className={`bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-16 h-16 rounded-full 
            outline outline-2 ${
              producto.Escuela === "Minería"
                ? "outline-orange-500"
                : producto.Escuela === "Ingeniería"
                ? "outline-blue-500"
                : "outline-red-500"
            }`}
                >
                  <img
                    src={`
              ${
                producto.Escuela === "Minería"
                  ? img2.logos.mineria
                  : producto.Escuela === "Ingeniería"
                  ? img2.logos.ingenieria
                  : img2.logos.gestion
              }
                   
                  `}
                    className={`text-white w-10 ${
                      producto.Escuela === "Minería"
                        ? ""
                        : producto.Escuela === "Ingeniería"
                        ? ""
                        : "-translate-y-[2.5px]"
                    }`}
                  />{" "}
                  {/* Tamaño del ícono ajustado */}
                </div>
                <div className="flex flex-col text-white px-2 py-1 rounded-md">
                  <span className="text-2xl italic -mb-[1px] tracking-wider">
                    ESCUELA DE
                  </span>
                  <span
                    className={`text-2xl font-bold
                  ${
                    producto.Escuela === "Minería"
                      ? "text-orange-500"
                      : producto.Escuela === "Ingeniería"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                  >
                    {/* {producto.Escuela.toUpperCase()} */}
                    {(producto.Escuela || "").toUpperCase()}
                  </span>
                </div>
              </div>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-white">
                PRÓXIMO
              </h3>
              <h1 className="text-4xl lg:text-5xl font-extrabold neon-cyan">
                INICIO DE CLASES
                {/* {producto.Curso} */}
              </h1>
              <h2 className="text-lg lg:text-[35px] leading-[40px]">
                {producto.Curso}
              </h2>
              <p className="text-5xl font-bold">{producto.FechaInicio}</p>
              <div className="flex justify-start items-center">
                <div className="flex flex-col justify-center items-center gap-4 mt-4">
                  <Link
                    href={producto.NumeroWhatsapp}
                    className={`px-6 py-4 w-fit font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all duration-300 bg-colors-cyan-ccd  text-colors-dark-blue-ccd`}
                  >
                    CONOCER MÁS DEL CURSO
                  </Link>
                  <Link
                    href="/promociones"
                    className={`text-center px-6 py-4 w-fit font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all duration-300 bg-white text-colors-sky-ccd flex justify-center`}
                  >
                    OBTENER CON SUSCRIPCIÓN
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarouselCollege;
