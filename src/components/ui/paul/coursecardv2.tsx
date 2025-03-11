import React from "react";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { PiBookBookmarkFill } from "react-icons/pi";
import { TbClockHour8Filled } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
const img = {
  logos: {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
  },
};


const CourseCardv2: React.FC<any> = ({array}:any) => {
  return (
    <div className="group relative bg-opacity-100 w-[300px] rounded-lg overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300">
      {/* Icono en la esquina superior izquierda */}
      <div className={`flex justify-center items-center z-10 w-16 h-16 absolute top-4 left-5 bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] rounded-full p-3 shadow-md ${
        array.Escuela === "Gestión"
        ? "border-red-500 border-[2px]"
        : array.Escuela === "Ingeniería"
        ? "border-blue-500 border-[2px]"
        : "border-orange-500 border-[2px]"
      }`}>
        <img
          src={
            array.Escuela === "minería"
              ? img.logos.mineria
              : array.Escuela === "ingeniería"
              ? img.logos.ingenieria
              : img.logos.gestion
          }
          alt="Icono Colegio"
          className="w-10 h-10"
        />
      </div>

      {/* Imagen */}
      <div className="relative">
        <img
          src={storageUrl+array.RutaImagen}
          alt="Curso"
          className="w-[300px] h-full object-cover"
        />
        {/* Etiqueta (Nueva o Top ventas) 
        <div
          className={`absolute top-[64px] right-4 -mr-2 px-[15px] py-[3px] rounded-[7px] text-xs font-semibold ${
            label === "Top ventas"
              ? "bg-teal-300 text-black " // Estilo para "Top ventas"
              : "bg-white" // Estilo para "Nuevo"
          }`}
        >
          {label}
        </div>*/}
      </div>

      {/* Contenido */}
      <div
        className={`p-4 text-white rounded-b-2xl rounded-t-none -mt-4 pt-7 ${
          array.Escuela === "Gestión"
            ? "group-hover:bg-gradient-to-br group-hover:from-[rgba(255,0,0,0.4)] group-hover:via-[rgba(22,46,84,0.5)] group-hover:to-[rgba(255,0,0,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
            : array.Escuela === "Ingeniería"
            ? "group-hover:bg-gradient-to-br group-hover:from-[rgba(0,96,254,0.4)] group-hover:via-[rgba(22,46,84,0.5)] group-hover:to-[rgba(0,96,254,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
            : "group-hover:bg-gradient-to-br group-hover:from-[rgba(249,115,22,0.6)] group-hover:via-[rgba(22,46,84,0.5)] group-hover:to-[rgba(255,115,22,0.5)] border-2 border-[rgba(22,46,84,0.4)]"
        }`}
      >
        {/* Título */}
        <h3 className="font-bold text-xl leading-tight mb-2">{array.Curso}</h3>
        {/*<p className="text-sm font-semibold text-white italic">{array.Descripcion}</p>*/}

        {/* Estadísticas */}
        <div className="flex items-center gap-2 mt-3 text-white">
          <span className="flex items-center text-base gap-1">
            <FaUser />
            {array.Seguidores} Integrantes
          </span>
          <span className="text-colors-cyan-ccd text-base">|</span>
          <span className="flex items-center text-base gap-1">
            <AiFillLike /> {array.Calificacion}% (7k) 
          </span>
        </div>
        <div className="flex items-center gap-2 text-white mt-2">
          <span className="flex items-center gap-1">
            <PiBookBookmarkFill /> {array.CantidadModulos} Módulos 
          </span>
          <span className="text-colors-cyan-ccd">|</span>
          <span className="flex items-center gap-1">
            <TbClockHour8Filled /> {array.HorasAcademicas} Horas
          </span>
        </div>

        {/* Precios */}
        {/* <div className="flex items-center justify-between mt-4">
          <span className="line-through text-[20px] text-white decoration-colors-cyan-ccd ml-4">
            {oldPrice}
          </span>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-colors-dark-blue-ccd group-hover:bg-white text-white text-2xl
          group-hover:text-colors-dark-blue-ccd rounded-2xl transition duration-400"
          >
            <FaCartShopping /> {newPrice}
          </button>
        </div> */}
        {/* Botón Curso */}
        <div className="pt-2">
        <span className="flex justify-center text-xl py-1 bg-colors-dark-blue-ccd group-hover:bg-white text-white
          group-hover:text-colors-dark-blue-ccd rounded-[8px] cursor-pointer">
          Más información
        </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCardv2;
