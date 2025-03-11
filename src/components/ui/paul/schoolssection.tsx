import React from "react";
import "aos/dist/aos.css"; // Importa los estilos de AOS
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import AOS from "aos"; // Importa AOS

const SchoolsSection = () => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <>
      <div className="flex relative w-full overflow-hidden justify-center items-center bg-double-esferas2">
        {/* Degradados radiales */}
        {/* <div
          className="absolute -left-80  w-[600px] h-[600px] pointer-events-none "
          style={{
            background:
              "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%",
          }}
        /> */}
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
            {/* Título principal */}
            <div className="flex flex-col justify-center items-center pb-10">
              <h1 className="text-colors-cyan-ccd text-4xl font-semibold mb-2">
                Escuelas de
              </h1>
              <h1 className="text-5xl max-sm:text-3xl text-center text-colors-dark-blue-ccd font-bold tracking-wide neon-white">
                ALTA ESPECIALIZACIÓN
              </h1>
            </div>

            {/* Subtítulo */}
            <div
              className="flex justify-center items-center"
              data-aos="fade-up"
            >
              <p>
                <span className="text-2xl text-white">
                  ¿Con cuál vas a empezar?
                </span>
              </p>
            </div>

            {/* Tarjetas */}
            <div
              className="flex flex-wrap justify-center gap-8 mt-6"
              data-aos="fade-up"
            >
              {/* Tarjeta 1 - Gestión */}
              <Link href="/gestion">
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
                    <Link
                      href="/gestion"
                      className="text-lg translate-y-[7px] pointer-events-none 
              mt-4 px-4 py-2 bg-red-700 text-white rounded-2xl hover:bg-red-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
                    >
                      <div className="flex items-center">
                       
                          <span className="text-[0px] group-hover:text-base  text-white transition-all duration-500 ease-in-out">
                            Ir a la escuela
                          </span>
                        
                        <span>
                          <FaArrowRight
                            className="text-white text-3xl pl-1 items-center relative 
                    group-hover:translate-y-[2px]"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Link>
              <Link href="/ingenieria">
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
                    <Link
                      href="/ingenieria"
                      className="text-lg translate-y-[7px] pointer-events-none 
              mt-4 px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
                    >
                      <div className="flex items-center">
                        
                          <span className="text-[0px] group-hover:text-base text-white transition-all duration-500 ease-in-out delay-200">
                            Ir a la escuela
                          </span>
                        
                        <span>
                          <FaArrowRight
                            className="text-white text-3xl pl-1 items-center relative 
                    group-hover:translate-y-[2px]"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Link>

              {/* Tarjeta 3 - Minería */}
              <Link href="/mineria">
                <div
                  className="relative w-[250px] h-[250px] border border-orange-500
  rounded-2xl shadow-[0_0_15px_7px_rgba(249, 115, 22, 0.5)] overflow-hidden
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
                    <Link
                      href="/mineria"
                      className="text-lg translate-y-[7px] pointer-events-none 
              mt-4 px-4 py-2 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
                    >
                      <div className="flex items-center">
                        <Link href="/mineria">
                          <span className="text-[0px] group-hover:text-base text-white transition-all duration-500 ease-in-out delay-200">
                            Ir a la escuela
                          </span>
                        </Link>
                        <span>
                          <FaArrowRight className="text-white text-3xl pl-1 items-center relative group-hover:translate-y-[2px]" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Tarjeta 2 - Ingeniería */}
        </div>
        {/* <div
          className="absolute -right-80  w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%",
          }}
        /> */}
      </div>
    </>
  );
};

export default SchoolsSection;
