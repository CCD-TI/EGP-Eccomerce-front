"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import ProcessShop from "./processShop";
import { IoSearch } from "react-icons/io5";

const ShoppingProcess = () => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const img = {
    icon: {
      gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
      ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-ingenieria.svg`,
      mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-mineria.svg`,
    },
  };
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Proceso de Carrito */}
      
      {/* <ProcessShop/>       */}
      <div className="w-min py-10 px-6 flex flex-col items-center justify-center gap-10">
        {/* Sección de Opciones */}
        <div className="flex  gap-10">
          {/* Gestión */}
          <div
            className="group text-white py-2 px-4 rounded-xl w-[210px] hover:w-[290px] flex gap-4 items-center justify-center
            bg-gradient-to-r from-transparent to-[rgba(255,0,0,0.8)] bg-[length:160%] bg-[linear-gradient(to right, transparent 65%, rgba(255,0,0,0.8) 35%)]
            shadow-[0_0_15px_rgba(255,0,0,0.6)] transition-all duration-1000
          border-[rgba(255,0,0,0.8)] border-2 hover:to-[rgba(255,0,0,1)]"
          >
            {/* Icono */}
            <div>
              <img src={img.icon.gestion} className="w-8" />
            </div>

            {/* Título */}
            <div className="flex text-center">Gestión</div>

            {/* Texto y Flecha */}
            <div className="flex gap-2 h-8 group-hover:w-36 items-center bg-red-500 px-2 rounded-[8px] transition-all duration-700">
              {/* Texto que aparece en hover */}
              <span className="absolute opacity-0 w-20 group-hover:flex group-hover:opacity-100 whitespace-nowrap transition-all duration-200">
                Ir a la escuela
              </span>

              {/* Flecha */}
              <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[90px]" />
            </div>
          </div>

          {/* Ingeniería */}
          <div
            className="group text-white py-2 px-4 rounded-xl w-[210px] hover:w-[290px] flex gap-4 items-center justify-center
  bg-gradient-to-r from-transparent to-[rgba(0,96,254,0.8)] bg-[length:160%] bg-[linear-gradient(to right, transparent 65%, rgba(255,0,0,0.8) 35%)]
  shadow-[0_0_15px_rgba(0,96,254,0.6)] transition-all duration-1000
  border-[rgba(0,96,254,0.8)] border-2 hover:to-[rgba(0,96,254,1)]"
          >
            {/* Icono */}
            <div>
              <img src={img.icon.ingenieria} className="w-8" />
            </div>

            {/* Título */}
            <div className="flex text-center">Ingeniería</div>

            {/* Texto y Flecha */}
            <div className="flex gap-2 h-8 w-fit group-hover:w-36 items-center bg-[rgba(0,96,254,0.8)] px-2 rounded-[8px] transition-all duration-700">
              {/* Texto que aparece en hover */}
              <span className="absolute opacity-0 w-20 group-hover:flex group-hover:opacity-100 whitespace-nowrap transition-all duration-200">
                Ir a la escuela
              </span>

              {/* Flecha */}
              <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[90px]" />
            </div>
          </div>

          {/* Minería */}
          <div
            className="group text-white py-2 px-4 rounded-xl w-[210px] hover:w-[290px] flex gap-4 items-center justify-center
  bg-gradient-to-r from-transparent to-[rgba(249,115,22,0.8)] bg-[length:160%] bg-[linear-gradient(to right, transparent 65%, rgba(249,115,22,0.8) 35%)]
  shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-1000
  border-[rgba(249,115,22,0.8)] border-2 hover:to-[rgba(249,115,22,1)]"
          >
            {/* Icono */}
            <div>
              <img src={img.icon.mineria} className="w-8" />
            </div>

            {/* Título */}
            <div className="flex text-center">Minería</div>

            {/* Texto y Flecha */}
            <div className="flex gap-2 h-8 w-fit group-hover:w-36 items-center bg-[rgba(249,115,22,0.8)] px-2 rounded-[8px] transition-all duration-700">
              {/* Texto que aparece en hover */}
              <span className="absolute opacity-0 w-20 group-hover:flex group-hover:opacity-100 whitespace-nowrap transition-all duration-200">
                Ir a la escuela
              </span>

              {/* Flecha */}
              <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[90px]" />
            </div>
          </div>
        </div>
      </div>
      {/* Barra de Búsqueda */}
      {/* <div
        className="group relative w-full mt-8 flex justify-center items-center"
        data-aos="fade-up"
      >
        <div className="relative w-[80%] max-w-2xl">
          <input
            type="text"
            placeholder="Encuentra tu curso o diploma"
            className="w-full px-6 py-3 text-white bg-[#0a0e27] border border-cyan-500 text-xl rounded-full text-center placeholder:text-white focus:placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 group-hover:outline-none group-hover:ring-2 group-hover:ring-cyan-300 transition duration-300"
          />
          <button className="absolute right-3 top-[50%] p-2 -translate-y-[50%] rounded-full transition duration-500">
            <IoSearch className="w-5 h-5 text-cyan-500 group-hover:cyan-300 group-hover:scale-[1.20] transition duration-500" />
          </button>
        </div>
      </div> */}

    </div>
  );
};

export default ShoppingProcess;
