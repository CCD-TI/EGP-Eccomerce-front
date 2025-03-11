"use client";
import Link from "next/link";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const CollegeSections: React.FC = () => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
 
  return (
    <div className="py-20 max-lg:py-10 bg-double-esferas2" data-aos="fade-up" data-aos-delay="700" >
      {/* Tarjetas */}
      <div
        className="flex flex-wrap justify-center gap-8 mt-6 mb-6"
        data-aos="fade-up"
      >
        {/* Tarjeta 1 - Gestión */}
        <Link href="/gestion">
          <div
            className="relative w-[250px] h-[250px] max-lg:size-fit border border-red-500
          rounded-2xl shadow-[0_0_15px_7px_rgba(255,0,0,0.5)] overflow-hidden
          group transition duration-500 hover:scale-105 max-lg:p-6 my-auto"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(255,0,0,0.8), transparent)",
            }}
          >
            <div
              className="absolute inset-0 border-2 border-red-500 rounded-lg 
          blur-sm opacity-50 group-hover:opacity-100 transition "
            ></div>
            <div
              className="relative  flex flex-col max-lg:flex-row justify-center pt-0 transition-all
          items-center h-full gap-3 duration-1000"
            >
              <img
                src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`}
                alt="Gestión Icon"
                className="w-[100px] h-[100px] mx-auto max-lg:size-[40px] "
              />
              <p className="text-lg text-white">Gestión</p>
              <Link
                href="/gestion"
                className="text-lg translate-y-[7px] pointer-events-none 
                mt-4 px-4 py-2 bg-red-700 text-white rounded-2xl hover:bg-red-700 
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
                transition-all duration-1000"
              >
                <div className="flex">
                  <span className="text-[0px] group-hover:text-base transition-all duration-500 ease-in-out text-white">
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
        </Link>

        {/* Tarjeta 2 - Ingeniería */}
        <Link href="/ingenieria">
          <div
            className="relative w-[250px] h-[250px] border border-blue-500
          rounded-2xl shadow-[0_0_15px_7px_rgba(59,130,255,0.5)] overflow-hidden
          group transition duration-500 hover:scale-105 max-lg:size-fit max-lg:p-6"
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
              className="relative flex flex-col max-lg:flex-row justify-center pt-0 transition-all
           items-center h-full gap-3 duration-1000"
            >
              <img
                src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`}
                alt="Ingeniería Icon"
                className="w-[100px] h-[100px] mx-auto max-lg:size-[40px]"
              />
              <p className="text-lg text-white">Ingeniería</p>
              <Link
                href="/ingenieria"
                className="text-base translate-y-[7px] pointer-events-none 
            mt-4 max-lg:mt-0 max-lg:mb-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
            transition-all duration-1000"
              >
                <div className="flex">
                <span className="text-[0px] group-hover:text-base transition-all duration-400 ease-in-out delay-200 text-white">
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
        </Link>

        {/* Tarjeta 3 - Minería */}
        <Link href="/mineria">
          <div
            className="relative w-[250px] h-[250px] border border-orange-500
          rounded-2xl shadow-[0_0_15px_7px_rgba(249,115,22,0.5)] overflow-hidden
          group transition duration-500 hover:scale-105 max-lg:size-fit max-lg:p-6"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(249,115,22,0.8), transparent)",
            }}
          >
            <div className="absolute inset-0 border-2 border-orange-500 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition"></div>
            <div className="relative flex flex-col max-lg:flex-row justify-center pt-0 transition-all items-center h-full gap-3 duration-1000">
              <img
                src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`}
                alt="Minería Icon"
                className="w-[100px] h-[100px] mx-auto max-lg:size-[40px]"
              />
              <p className="text-lg text-white">Minería</p>
              <Link
                href="/mineria"
                className="text-base translate-y-[7px] pointer-events-none 
            mt-4 px-6 py-2 max-lg:mt-0 max-xl:mb-4 bg-orange-500 text-white rounded-full hover:bg-orange-700 
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
            transition-all duration-1000"
              >
                <div className="flex">
                <span className="text-[0px] group-hover:text-base transition-all duration-400 ease-in-out delay-200 text-white">
                Ir a la escuela
                  </span>
                  <span>
                    <FaArrowRight className="text-white text-[18px] pl-1 items-center relative group-hover:translate-y-[2px]" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CollegeSections;
