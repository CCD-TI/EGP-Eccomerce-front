import React from "react";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { PiBookBookmarkFill } from "react-icons/pi";
import { TbClockHour8Filled } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
const img = {
  logos: {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
  },
};

const CourseCard: React.FC<any> = ({ array, escuela, openSideSheet }: any) => {
  const router = useRouter();

   const handleMoreInfoClick = () => {
    const slug = array.Curso
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remover tildes
      .replace(/\s+/g, "-"); // Reemplazar espacios por guiones

    router.push(`/curso/${slug}`);
  };
  

  return (
    <div
      onClick={() => openSideSheet(array)}
      className="group my-5 relative bg-opacity-100 w-[300px] rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-300"
    >
      {/* Icono en la esquina superior izquierda */}
      <div
        className={`flex justify-center items-center z-10 w-16 h-16 absolute -top-8 left-5 bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] rounded-full p-3 shadow-md ${
          escuela === "Gestión"
            ? "border-red-500 border-[2px]"
            : escuela === "Ingeniería"
            ? "border-blue-500 border-[2px]"
            : "border-orange-500 border-[2px]"
        }`}
      >
        <img
          src={
            escuela === "Gestión"
              ? img.logos.gestion
              : escuela === "Ingeniería"
              ? img.logos.ingenieria
              : img.logos.mineria
          }
          alt="Icono Colegio"
          className="w-10 h-10"
        />
      </div>

      {/* Imagen */}
      <div className="relative">
        <img
          src={storageUrl + array.RutaImagen}
          alt="Curso"
          className="w-[300px] h-full object-cover"
        />
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

        {/* Botón Curso */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleMoreInfoClick}
            className="w-full text-xl py-1 bg-colors-dark-blue-ccd group-hover:bg-white text-white
          group-hover:text-colors-dark-blue-ccd rounded-[8px] cursor-pointer"
          >
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
