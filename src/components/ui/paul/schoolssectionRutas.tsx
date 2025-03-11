import React from "react";
import { IoSearch } from "react-icons/io5"; // Asegúrate de instalar react-icons si no lo tienes
import "aos/dist/aos.css"; // Importa los estilos de AOS
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos"; // Importa AOS
import Link from "next/link";
import Cardrutas from "./cardrutas";

const SchoolsSection = () => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <>
    <div className="flex h-[600px]  relative w-full overflow-hidden justify-center items-center">
      {/* Degradados radiales */}
    <div
      className="absolute -left-80  w-[600px] h-[600px] pointer-events-none "
      style={{
        background:
          "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%"}}
    />   
    <div
      className="w-full overflow-hidden flex justify-center items-center py-10 z-20"
      data-aos="zoom-in-down"
      data-aos-anchor-placement="top-bottom"
    >
      

      <div
        className="h-full w-[70%] max-xl:w-[75%] max-2xl:w-[65%] 
              min-[1620px]:w-[60%] min-[1920px]:w-[55%] max-sm:w-[90%]  
              flex flex-col justify-center items-center gap-7 mx-auto z-50"
      >
      

        {/* Tarjetas */}
        <div
          className="flex flex-wrap justify-center gap-8 mt-6"
          data-aos="fade-up"
        >
          {/* Tarjeta 1 - Gestión */}
          <div
            className="relative w-[250px] h-[250px] border border-red-500
            rounded-2xl shadow-[0_0_15px_7px_rgba(255,0,0,0.5)] overflow-hidden
            group transition duration-500 hover:scale-105"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(255,0,0,0.8), transparent)",
            }}
          >
            <div
              className="absolute inset-0 border-2 border-red-500 rounded-lg 
            blur-sm opacity-50 group-hover:opacity-100 transition"
            ></div>
            <div
              className="relative flex flex-col justify-center pt-0 transition-all
            items-center h-full gap-3 duration-1000"
            >
              <img
                src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`}
                alt="Gestión Icon"
                className="w-[100px] h-[100px] mx-auto"
              />
              <p className="text-lg text-white">Gestión</p>
              <Link href="/gestion"
                className="text-base translate-y-[7px] pointer-events-none 
              mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
              >
                <div className="flex">
                  <span className="hidden group-hover:flex text-base text-white">
                    Ir a la escuela
                  </span>
                  <span>
                    <FaArrowRight
                      className="text-white text-[18px] pl-1 items-center relative 
                    group-hover:translate-y-[2px]"
                    />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Tarjeta 2 - Ingeniería */}
          <div
            className="relative w-[250px] h-[250px] border border-blue-500
            rounded-2xl shadow-[0_0_15px_7px_rgba(59,130,255,0.5)] overflow-hidden
            group transition duration-500 hover:scale-105"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(0,96,254,0.8), transparent)",
            }}
          >
            <div
              className="absolute inset-0 border-2 border-blue-500 rounded-lg 
            blur-sm opacity-50 group-hover:opacity-100 transition"
            ></div>
            <div
              className="relative flex flex-col justify-center pt-0 transition-all
             items-center h-full gap-3 duration-1000"
            >
              <img
                src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`}
                alt="Ingeniería Icon"
                className="w-[100px] h-[100px] mx-auto"
              />
              <p className="text-lg text-white">Ingeniería</p>
              <Link href="/ingenieria"
                className="text-base translate-y-[7px] pointer-events-none 
              mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
              >
                <div className="flex">
                  <span className="hidden group-hover:flex text-base text-white">
                    Ir a la escuela
                  </span>
                  <span>
                    <FaArrowRight
                      className="text-white text-[18px] pl-1 items-center relative 
                    group-hover:translate-y-[2px]"
                    />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Tarjeta 3 - Minería */}
          <div
            className="relative w-[250px] h-[250px] border border-orange-500
            rounded-2xl shadow-[0_0_15px_7px_rgba(249,115,22,0.5)] overflow-hidden
            group transition duration-500 hover:scale-105"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(249,115,22,0.8), transparent)",
            }}
          >
            <div className="absolute inset-0 border-2 border-orange-500 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition"></div>
            <div className="relative flex flex-col justify-center pt-0 transition-all items-center h-full gap-3 duration-1000">
              <img
                src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`}
                alt="Minería Icon"
                className="w-[100px] h-[100px] mx-auto"
              />
              <p className="text-lg text-white">Minería</p>
              <Link href="/mineria"
                className="text-base translate-y-[7px] pointer-events-none 
              mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
              >
                <div className="flex">
                  <span className="hidden group-hover:flex text-base text-white">
                    Ir a la escuela
                  </span>
                  <span>
                    <FaArrowRight className="text-white text-[18px] pl-1 items-center relative group-hover:translate-y-[2px]" />
                  </span>
                </div>
              </Link >
            </div>
          </div>
        </div>

        {/* Barra de Búsqueda */}
        <div
          className="group relative w-full mt-8 flex justify-center items-center"
          data-aos="fade-up"
        >
          <div className="relative w-[80%] max-w-2xl">
            <input
              type="text"
              placeholder="Encuentra tu curso o diploma"
              className="w-full px-6 py-3 text-white bg-[#0a0e27] 
              border border-cyan-500 text-xl rounded-full text-center 
              placeholder:text-white focus:placeholder-transparent 
              focus:outline-none focus:ring-2 focus:ring-cyan-300 
              group-hover:outline-none group-hover:ring-2 
              group-hover:ring-cyan-300 transition duration-300"
            />
            <button className="absolute right-3 top-[50%] p-2 -translate-y-[50%] rounded-full transition duration-500">
              <IoSearch className="w-5 h-5 text-cyan-500 group-hover:cyan-300 group-hover:scale-[1.20] transition duration-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
     <div
      className="absolute -right-80  w-[600px] h-[600px] pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%"}}
    />
     
    </div>
    </>
  );
};

export default SchoolsSection;
