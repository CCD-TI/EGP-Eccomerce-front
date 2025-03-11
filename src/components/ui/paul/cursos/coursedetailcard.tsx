"use client";

import React from "react";
import Image from "next/image";
import { FaUserFriends, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { RiBroadcastFill } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import Link from "next/link";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
const img = {
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

interface CourseDetailCardProps {
  college: String;
  school: string; // Nombre de la escuela (por ejemplo, "Minería")
  courseName: string;
  modalityLive: string;
  modalityAsync: string;
  startDate: string;
  startTime: string;
  participants: string;
  rating: string;
  price: string;
  oldPrice: string;
  imageUrl: string;
}

const CourseDetailCard: React.FC<CourseDetailCardProps> = ({
  college,
  school,
  courseName,
  modalityLive,
  modalityAsync,
  startDate,
  startTime,
  participants,
  rating,
  price,
  oldPrice,
  imageUrl,
}) => {
  
  return (
    <div className="max-w-5xl mx-auto bg-[#131939] rounded-2xl text-white p-6 flex flex-col lg:flex-row shadow-lg">
      {/* Contenedor Izquierdo */}
      <div className="lg:w-1/2">
        <div className="flex items-center gap-2 text-sm font-semibold mb-2">
          <div
            className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-16 h-16 rounded-full 
          outline outline-2 outline-orange-500"
          >
            <img
              src={`
            ${
              college === "mineria"
                ? img.logos.mineria
                : college === "ingenieria"
                ? img.logos.ingenieria
                : img.logos.gestion
            }
                 
                `}
              className={`text-white w-10 ${
                college === "mineria"
                  ? ""
                  : college === "ingenieria"
                  ? ""
                  : "-translate-y-[2.5px]"
              }`}
            />{" "}
            {/* Tamaño del ícono ajustado */}
          </div>
          <div className="flex flex-col text-white px-2 py-1 rounded-md">
            <span className="text-base italic -mb-[1px] tracking-wider">
              ESCUELA DE
            </span>
            <span
              className={`text-2xl font-bold
                ${
                  college === "mineria"
                    ? "text-orange-500"
                    : college === "ingenieria"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
            >
              {school.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="py-2">
          <h3 className="bg-colors-sky-ccd rounded-xl p-1 px-7 w-fit shadow-[0_0_15px_3px_rgba(49,133,247,0.5)]">
            Curso de Alta Especializacion
          </h3>
        </div>
        <div className="py-2">
          {/* <h2 className="text-4xl font">{courseName}</h2> */}
          <Link
            href={`/${encodeURIComponent(
              courseName.toLowerCase().replace(/\s+/g, "-")
            )}`}
            className="text-4xl font"
          >
            {courseName}
          </Link>
        </div>

        <div className="py-2">
          <hr className="bg-colors-sky-ccd h-[1.5px] border-transparent" />
        </div>
        <div className="py-2">
          <h4>Selecciona tu modalidad:</h4>
        </div>
        {/* Modalidad */}
        <div className="flex items-center gap-4 mb-4">
          <button className="flex px-4 py-2 bg-transparent border border-[#00D3C5] text-[#00D3C5] rounded-full text-sm">
            <span className="mr-2">{modalityLive}</span>
            <span className="translate-y-[2px]">
              <RiBroadcastFill />
            </span>
          </button>
          <button className="flex px-4 py-2 bg-transparent border border-[#00D3C5] text-[#00D3C5] rounded-full text-sm">
            <span className="mr-2">{modalityAsync}</span>
            <span className="translate-y-[2px]">
              <BsCameraVideoFill />
            </span>
          </button>
        </div>

        {/* Fecha e Integrantes */}
        <p className="text-xl mb-4">
          Inicio:{" "}
          <span className="text-xl font-bold">
            {startDate} - {startTime}
          </span>
        </p>

        <div className="flex px-3 py-4 rounded-xl w-fit items-center gap-6 border-2 border-colors-sky-ccd">
          <div className="flex items-center gap-2">
            <FaUser className="text-xl" />
            <span className="text-xl">{participants} Integrantes</span>
          </div>
          <span className="w-[1.5px] h-9 bg-colors-cyan-ccd"></span>
          <div className="flex items-center gap-2">
            <AiFillLike className="text-xl" />
            <span className="text-xl">{rating}</span>
          </div>
        </div>

        <div className="pt-3">
          <h4>Comprar Ahora</h4>
        </div>

        {/* Precio */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex justify-center items-center gap-2">
            <div className="text-3xl bg-colors-cyan-ccd rounded-xl p-3 font-bold text-colors-dark-blue-ccd">
              {price}
            </div>
            <div className="text-lg line-through text-white decoration-colors-cyan-ccd">
              {oldPrice}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button>
              <h4 className="text-[10px] pb-2">Agregar al carrito</h4>
              <FaCartPlus className="text-4xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor Derecho */}
      <div className="lg:w-1/2 mt-6 lg:mt-0 flex flex-col justify-center items-center">
        <img
          src={img.fondos.mineria1}
          alt="Course Image"
          width={500}
          height={300}
          className="rounded-xl shadow-lg"
        />
        {/* Botones */}
        <div className="flex justify-center gap-4 py-5">
          <button className="px-4 py-2 rounded-[6px] bg-[#00D3C5] text-white shadow-lg hover:bg-[#00bfb1] transition-all">
            Descargar Brochure
          </button>
          <button className="px-4 py-2 bg-green-500 rounded-[6px] text-white flex items-center gap-2 shadow-lg hover:bg-gray-200 transition-all">
            <FaWhatsapp className="text-xl" /> Más Información
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailCard;