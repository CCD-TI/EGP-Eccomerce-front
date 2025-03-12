import React from "react";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { PiBookBookmarkFill } from "react-icons/pi";
import { TbClockHour8Filled } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5"; // Asegúrate de instalar react-icons si no lo tienes

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
const img = {
  logos: {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
  },
};

const CourseCardFront: React.FC<any> = ({
  array,
  pid,
  ruta,
  openSideSheet,
}: any) => {
  const router = useRouter();

  const handleMoreInfoClick = () => {
    const slug = ruta.toLowerCase().replace(/\s+/g, "-");
    console.log("Redirigiendo a /cursodetalle/[curso] con pid:", pid);
    router.push(`/cursodetalle/${slug}?pid=${pid}`);
  };

  return (
    <>
    <button
       onClick={handleMoreInfoClick}
    >

      <div
        onClick={() => openSideSheet(array)}
        className="group my-5 relative bg-opacity-100 w-[300px]  rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-300"
      >
        {/* Icono en la esquina superior izquierda */}
        <div
          className={`flex justify-center items-center z-10 w-16 h-16 absolute -top-8 left-5 bg-gradient-to-t from-black to-colors-egp-gold rounded-full p-3 shadow-md ${
            array.Escuela === "Gestión"
              ? "border-colors-egp-silver border-[2px]"
              : array.Escuela === "Ingeniería"
              ? "border-blue-500 border-[2px]"
              : "border-orange-500 border-[2px]"
        }`}
        >
          <img
            src={
              array.Escuela === "Gestión"
                ? img.logos.gestion
                : array.Escuela === "Ingeniería"
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
          className={`p-4 text-white rounded-b-2xl rounded-t-none -mt-4 pt-7 h-[150px] ${
            array.Escuela === "Gestión"
              ? "bg-gradient-to-br from-[rgba(205,191,88,0.85)] via-transparent to-[rgba(205,191,88,0.85)] border-2 border-[rgba(22,46,84,0.4)]"
              : array.Escuela === "Ingeniería"
              ? "bg-gradient-to-br from-[rgba(0,96,254,0.4)] via-[rgba(22,46,84,0.5)] to-[rgba(0,96,254,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
              : "bg-gradient-to-br from-[rgba(249,115,22,0.6)] via-[rgba(22,46,84,0.5)] to-[rgba(255,115,22,0.5)] border-2 border-[rgba(22,46,84,0.4)]"
          }`}
        >
          {/* Título */}
          <div className="flex flex-col justify-between h-[150px] ">
            {/* <h3
              className="font-bold text-xl leading-tight mb-2 tooltip z-30 line-clamp-2"
              title={array.Curso}
            >
              {array.Curso}
            </h3> */}
            {/*<p className="text-sm font-semibold text-white italic">{array.Descripcion}</p>*/}

            {/* Estadísticas */}
            <div className="flex flex-col justify-center gap-[1px]">
              <div className="flex items-center gap-2 mt-3 text-white">
                <span className="flex items-center text-base gap-1">
                  <FaUser />
                  {array.Seguidores} Integrantes
                </span>
                <span className="text-colors-cyan-ccd text-base">|</span>
                <span className="flex items-center text-base gap-1">
                  <AiFillLike />{" "}
                  {Math.round(
                    (Number(array.Calificacion) * 100) /
                      Number(array.Seguidores)
                  )}
                  % ({array.Calificacion})
                </span>
              </div>
              <div className="flex items-center gap-2 text-white mt-2">
                {array.CantidadModulos > 0 && (
                  <>
                    <span className="flex items-center gap-1">
                      <PiBookBookmarkFill /> {array.CantidadModulos} Módulos
                    </span>
                    <span className="text-colors-cyan-ccd">|</span>
                  </>
                )}
                <span className="flex items-center gap-1">
                  <TbClockHour8Filled /> {array.HorasAcademicas} Horas A.
                </span>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleMoreInfoClick}
                   className="w-full text-xl py-1  font-bold  bg-colors-egp-silver  
          text-colors-egp-gold rounded-[8px] cursor-pointer border-2 border-colors-egp-silver group-hover:shadow-[0_0_25px_5px_rgba(168,123,4,0.7)] group-hover:border-colors-egp-gold"
                >
                  Más información
                </button>
              </div>
            </div>
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
        </div>
      </div>
    </button>
    </>
  );
};

export default CourseCardFront;
