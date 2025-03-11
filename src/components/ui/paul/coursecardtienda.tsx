import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { PiBookBookmarkFill } from "react-icons/pi";
import { TbClockHour8Filled } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import { environment } from "@/environments/environment";
import Image from "next/image";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
const img = {
    logos: {
        gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
        ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
        mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
    },
};

const CourseCardTienda: React.FC<any> = ({
    array,
    pid,
    ruta,
    openSideSheet,
}: any) => {
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const router = useRouter();

    const handleMoreInfoClick = () => {
        const slug = ruta.toLowerCase().replace(/\s+/g, "-");
        console.log("Redirigiendo a /cursodetalle/[curso] con pid:", pid);
        router.push(`/cursodetalle/${slug}?pid=${pid}`);
    };


    return (
        <div
            onClick={() => openSideSheet(array)}
            className="group my-5 relative bg-opacity-100 w-[300px]    rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-300"
        >
            {/* Icono en la esquina superior izquierda */}
            <div
                className={`flex justify-center items-center z-10 w-16 h-16 absolute -top-8 left-5 bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] rounded-full p-3 shadow-md ${array.Escuela === "Gestión"
                    ? "border-red-500 border-[2px]"
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
                <Image
                width={900}
                height={800}
                    src={
                        storageUrl +
                        (Array.isArray(array.RutaImagen)
                            ? array.RutaImagen.find((ruta: any) => ruta.includes("PortadaFinal")) || array.RutaImagen[0]
                            : Array.isArray(JSON.parse(array.RutaImagen))
                                ? JSON.parse(array.RutaImagen).find((ruta: any) => ruta.includes("PortadaFinal")) || JSON.parse(array.RutaImagen)[0]
                                : array.RutaImagen)
                    }
                    alt="Curso"
                    className="w-[300px] max-sm3:w-[250px] max-sm3:mx-auto h-full object-cover"
                    
                    />
            </div>

            {/* Contenido */}
            <div
                className={`p-4 text-white rounded-b-2xl rounded-t-none h-[155px] max-sm3:w-[250px]  max-sm3:mx-auto flex flex-col justify-between -mt-4 pt-7 ${array.Escuela === "Gestión"
                    ? "group-hover:bg-gradient-to-br group-hover:from-[rgba(255,0,0,0.4)] group-hover:via-[rgba(22,46,84,0.5)] group-hover:to-[rgba(255,0,0,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
                    : array.Escuela === "Ingeniería"
                        ? "group-hover:bg-gradient-to-br group-hover:from-[rgba(0,96,254,0.4)] group-hover:via-[rgba(22,46,84,0.5)] group-hover:to-[rgba(0,96,254,0.4)] border-2 border-[rgba(22,46,84,0.4)]"
                        : "group-hover:bg-gradient-to-br group-hover:from-[rgba(249,115,22,0.6)] group-hover:via-[rgba(22,46,84,0.5)] group-hover:to-[rgba(255,115,22,0.5)] border-2 border-[rgba(22,46,84,0.4)]"
                    }`}
            >
                {/* Título */}
                {/* <h3
                    className="font-bold text-xl leading-tight mb-2 tooltip z-10"
                    title={array.Curso}
                >
                    {array.Curso.length > 60
                        ? `${array.Curso.substring(0, 50)}...`
                        : array.Curso}
                </h3> */}
                {/*<p className="text-sm font-semibold text-white italic">{array.Descripcion}</p>*/}

                {/* Estadísticas */}
                <div className="flex items-center gap-2 mt-3 text-white">
                    <span className="flex items-center text-base max-sm:text-xs gap-1">
                        <div className="flex items-center gap-1">
                              <FaUser /> 
                               {array.Seguidores}
                        </div>
                      
                       Integrantes
                    </span>
                    <span className="text-colors-cyan-ccd text-base max-sm:text-xs">|</span>
                    <span className="flex items-center text-base gap-1">
                     
                        <AiFillLike />
                        {Math.round(
                            (Number(array.Calificacion) * 100) / Number(array.Seguidores)
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
                        <TbClockHour8Filled /> {array.HorasAcademicas} Horas
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

export default CourseCardTienda;
