import React, { useState, useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { LuVideo } from "react-icons/lu";
import axios from "axios";
import { environment } from "@/environments/environment";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { IoSearch } from "react-icons/io5"; // Asegúrate de instalar react-icons si no lo tienes
import "aos/dist/aos.css"; // Importa los estilos de AOS
import { FaArrowRight } from "react-icons/fa6";

type Especializacion = {
  IdEspecializacion: number;
  Especializacion: string;
};

interface Ruta {
  Ruta_id: number;
  Ruta: string;
  ImagenPortada: string | null;
  Descripcion: string | null;
  Escuela: string | null;
  Productos: Producto[];
  Integrantes: number;
  Popularidad: string; // Ejemplo: "80% (4)"
}

interface Producto {
  TipoModalidad: string;
  IdProducto: number;
  Precio: number | null;
  FechaInicio: string | null; // Ejemplo: "15 de Marzo"
  Horario: string | null;
  RutaImagen: string;
  RutaBrochure: string;
  CantidadModulos: number;
  TipoCurso: string;
}

function Cardrutas() {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
  const logos = {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/gestion.png`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/gestion.png`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/gestion.png`,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [rutasCompletas, setRutasCompletas] = useState<Ruta[]>([]);
  const [filteredCursos, setFilteredCursos] = useState<Ruta[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEspecializaciones, setSelectedEspecializaciones] = useState<
    number[]
  >([]);
  const [especializaciones, setEspecializaciones] = useState<Especializacion[]>(
    []
  );
  const [selectedTipoCurso, setSelectedTipoCurso] = useState<string[]>([]);
  const [selectedModalidades, setSelectedModalidades] = useState<string[]>([]);
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  // Fetch inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Obtener cursos
        const responseCursos = await api.post("/inicio/getRutas", {});

        setRutasCompletas(responseCursos.data.data[0] || []);
        setFilteredCursos(responseCursos.data.data[0] || []);

        // Obtener especializaciones
        const responseEspecializaciones = await api.post(
          "/inicio/listaespecializacion",
          { 
            // Escuela: escuela 
          }
        );
        setEspecializaciones(responseEspecializaciones.data.data[0] || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Búsqueda en tiempo real
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();

    // Aplicar búsqueda en tiempo real
    if (term) {
      const searched = rutasCompletas.filter((curso) =>
        curso.Ruta.toLowerCase().includes(term)
      );
      setFilteredCursos(searched);
    } else {
      // Si no hay término de búsqueda, mostrar todos los cursos
      setFilteredCursos(rutasCompletas);
    }

    setCurrentPage(1); // Reiniciar la paginación al buscar
  }, [searchTerm, rutasCompletas]);

  const items = [
    {
      key: "new",
      label: "Más antiguo",
    },
    {
      key: "copy",
      label: "Más reciente",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];
  const logoUrls = Object.values(logos); // Extrae los valores del objeto como un arreglo
  const visibleLogos = logoUrls.slice(0, 3); // Muestra solo los primeros 3 logos
  const remainingCount = logoUrls.length - visibleLogos.length;



  return (
    <>
      {/* // School Sections */}
      <div className="flex h-[600px]  relative w-full overflow-hidden justify-center items-center">
        {/* Degradados radiales */}
        <div
          className="absolute -left-80  w-[600px] h-[600px] pointer-events-none "
          style={{
            background:
              "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%",
          }}
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
                  <Link
                    href="/gestion"
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
                  <Link
                    href="/ingenieria"
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
                  <Link
                    href="/mineria"
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
                  </Link>
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
              "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%",
          }}
        />
      </div>

      <div className="flex flex-col gap-8 justify-center w-full bg-[#131939]">
      
        <div className="flex flex-col gap-8 w-[80%] mx-auto mb-4  ">
          <div
            className=" flex gap-6 bg-gradient-to-br from-[rgba(0,97,254,0)]  via-[rgba(22,46,84,0.42)] ] 
            to-[rgba(0,97,254,0.23)] ] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl "
          >
            <div className="w-[25%] bg-colors-dark-blue-ccd p-6 rounded-2xl ">
              <img
                src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/Portada/BIM%20REVIT%20ARQUITECTURA.png"
                className="rounded-2xl"
                alt=""
              />
              <div className="flex flex-col gap-4 text-white mt-4">
                <h1 className="flex gap-2 items-center">
                  <span className="flex gap-2 items-center">
                    <FaUser /> 00000 integrantes{" "}
                  </span>
                  <span className="font-bold text-colors-cyan-ccd">|</span>
                  <span className="flex gap-2 items-center">
                    <BiSolidLike /> 99% (7k){" "}
                  </span>
                </h1>
                <Link href="/cursodetalleRuta" className="w-full">
                  <button className="w-full p-2 px-4 rounded-xl bg-colors-cyan-ccd text-colors-dark-blue-ccd  text-lg font-bold">
                    Descubrir Ruta
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-[75%] flex flex-col gap-4 text-white p-6">
              <div className="w-full flex gap-6">
                <div className="w-[70%] flex flex-col gap-3">
                  <h1 className=" w-full text-3xl">rutas retoricas</h1>
                  <div className="w-full h-[3px] bg-[#3185F7] "></div>
                  <h2>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel, omnis maxime enim delectus earum atque, autem quibusdam
                    consectetur vero, ad velit amet cupiditate. Ut, atque aut.
                    Nisi modi dignissimos sint!
                  </h2>
                </div>
                <div className="w-[30%] flex ">
                  {visibleLogos.map((logo, index) => (
                    <div key={index} className="">
                      <img
                        src={logo}
                        alt={`logo-${index}`}
                        className="size-16"
                      />
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <div className=" rounded-full border border-gray-300 flex items-center justify-center">
                      <span className="text-lg m-2 p-1 px-2  font-semibold">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                <li>
                  <h1 className="p-[8px] w-full rounded-full border-2 border-[#0E4C5A] relative">
                    <span className="  bg-[#142143] absolute -top-[2px] left-[-6px] rounded-full border-2 border-[#0E4C5A] p-2 px-4 text-colors-cyan-ccd text-base">
                      1
                    </span>
                    <h1 className="pl-8">curso 1</h1>
                  </h1>
                </li>
              </ul>
            </div>
          </div>
        </div>


        
      </div>
    </>
  );
}

export default Cardrutas;
