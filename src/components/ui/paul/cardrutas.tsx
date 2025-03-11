import React, { useState, useEffect, useRef } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaUser, FaArrowRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useRouter } from "next/navigation";
import FilterRutas from "./filterRutas";
import BtnWhatssap from "../bruno/btnWhatssap";

interface Producto {
  Escuela: string | null;
  Curso: string | null;
  TipoModalidad: string;
  IdProducto: number;
  Precio: number | null;
  FechaInicio: string | null;
  Horario: string | null;
  RutaImagen: string;
  RutaBrochure: string;
  CantidadModulos: number;
  TipoCurso: string;
}

interface Ruta {
  IdRuta: number;
  Ruta: string;
  ImagenPortada: string | null;
  Descripcion: string | null;
  Escuela: string | null;
  EscuelaGeneral: string | null;
  Productos: Producto[];
  Integrantes: number;
  Popularidad: string;
}

function Cardrutas() {
  const [isLoading, setIsLoading] = useState(false);
  const [rutasCompletas, setRutasCompletas] = useState<Ruta[]>([]);
  const [filteredCursos, setFilteredCursos] = useState<Ruta[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";

  const [isVisible, setIsVisible] = useState(false); // Estado booleano
  const triggerRef = useRef<HTMLDivElement>(null); // Referencia al punto que vamos a observar

  // Función que se ejecuta cuando el usuario hace scroll
  // const handleScroll = () => {
  //   const element = triggerRef.current;
  //   if (element) {
  //     // Calculamos la distancia del elemento respecto a la parte superior de la página
  //     const rect = element.getBoundingClientRect();
  //     // Si el elemento está al menos 50% visible en la pantalla, cambia el estado
  //     if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
  //       setIsVisible(true); // El elemento es visible
  //     } else {
  //       setIsVisible(false); // El elemento no es visible
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // Agregar el listener de scroll cuando el componente se monta
  //   window.addEventListener("scroll", handleScroll);

  //   // Eliminar el listener cuando el componente se desmonta
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const img = {
    logos: {
      gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
      ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
      mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
    },
  };

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responseCursos = await api.post("/inicio/getRutas", {});
        const cursos = Array.isArray(responseCursos.data.data)
          ? responseCursos.data.data
          : [];
        setRutasCompletas(cursos);
        setFilteredCursos(cursos);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (term) {
      const searched = rutasCompletas.filter((curso) =>
        curso.Ruta.toLowerCase().includes(term)
      );
      setFilteredCursos(searched);
    } else {
      setFilteredCursos(rutasCompletas);
    }
    setCurrentPage(1);
  }, [searchTerm, rutasCompletas]);

  const totalPages = Math.ceil(filteredCursos.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCursos.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const filtrarPorEscuela = (escuela: string | null) => {
    if (escuela) {
      const filtradas = rutasCompletas.filter(
        (ruta) => ruta.EscuelaGeneral === escuela
      );
      setFilteredCursos(filtradas);
    } else {
      setFilteredCursos(rutasCompletas);
    }
    setCurrentPage(1);
  };

  // const logoUrls = Object.values(logos); // Extrae los valores del objeto como un arreglo
  // const visibleLogos = logoUrls.slice(0, 3); // Muestra solo los primeros 3 logos
  // const remainingCount = logoUrls.length - visibleLogos.length;

  // ✅ Lógica para agrupar productos por curso
  const agruparProductosPorCurso = (productos: Producto[]) => {
    const cursosMap = new Map<
      string,
      { curso: string; modalidades: string[] }
    >();

    productos.forEach((producto) => {
      if (producto.Curso) {
        if (cursosMap.has(producto.Curso)) {
          const cursoExistente = cursosMap.get(producto.Curso);
          if (
            cursoExistente &&
            !cursoExistente.modalidades.includes(producto.TipoModalidad)
          ) {
            cursoExistente.modalidades.push(producto.TipoModalidad);
          }
        } else {
          cursosMap.set(producto.Curso, {
            curso: producto.Curso,
            modalidades: [producto.TipoModalidad],
          });
        }
      }
    });

    return Array.from(cursosMap.values());
  };

  // ✅ Función para obtener escuelas únicas
  const obtenerEscuelasUnicas = (productos: Producto[]) => {
    const escuelasSet = new Set<string>();

    productos.forEach((producto) => {
      if (producto.Escuela) {
        escuelasSet.add(producto.Escuela); // Agrega la escuela si existe
      }
    });

    return Array.from(escuelasSet); // Convierte el Set en un array
  };

  const router = useRouter();

  const handleMoreInfoClick = (ruta: string, rid: number) => {
    const slug = ruta.toLowerCase().replace(/\s+/g, "-");
    console.log("Redirigiendo a /rutadetalle/[ruta] con rid:", rid);
    router.push(`/rutadetalle/${slug}?rid=${rid}`);
  };

  return (
    <>
      <div className="flex h-full  relative w-full overflow-hidden justify-center items-center bg-double-esferas2">
        {/* Degradados radiales */}

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
              <button
                onClick={() => filtrarPorEscuela("Gestión")}
                className="relative w-[250px] h-[250px] max-lg:h-fit border border-red-500
            rounded-2xl shadow-[0_0_15px_7px_rgba(255,0,0,0.5)] overflow-hidden
            group transition duration-500 hover:scale-105 p-8"
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
                  className="relative flex flex-col  max-lg:flex-row justify-center pt-0 transition-all
            items-center h-full gap-3 duration-1000"
                >
                  <img
                    src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`}
                    alt="Gestión Icon"
                    className="w-[100px] h-[100px] max-lg:size-[40px] "
                  />
                  <p className="text-lg text-white">Gestión</p>
                  <div
                    // href="/gestion"
                    className="text-base translate-y-[7px] pointer-events-none 
              mt-4 max-lg:mt-0  max-lg:mb-2 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
                  >
                    <div className="flex ">
                      <span className="text-[0px] group-hover:text-base  text-white transition-all duration-500 ease-in-out">
                        Filtrar
                      </span>
                      <span>
                        <FaArrowRight
                          className="text-white text-[20px] pl-1 items-center relative 
                    group-hover:translate-y-[2px]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Tarjeta 2 - Ingeniería */}
              <button
                onClick={() => filtrarPorEscuela("Ingeniería")}
                className="relative w-[250px] h-[250px] max-lg:h-fit p-8 border border-blue-500
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
                  className="relative flex flex-col max-lg:flex-row justify-center pt-0 transition-all
             items-center h-full gap-3 duration-1000"
                >
                  <img
                    src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`}
                    alt="Ingeniería Icon"
                    className="w-[100px] h-[100px] max-lg:size-[40px] "
                  />
                  <p className="text-lg text-white">Ingeniería</p>
                  <div
                    // href="/ingenieria"
                    className="text-base translate-y-[7px] pointer-events-none 
              mt-4  max-lg:mt-0 max-lg:mb-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
                  >
                    <div className="flex">
                      <span className="text-[0px] group-hover:text-base  text-white transition-all duration-500 ease-in-out">
                        Filtrar
                      </span>
                      <span>
                        <FaArrowRight
                          className="text-white text-[18px] pl-1 items-center relative 
                    group-hover:translate-y-[2px]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Tarjeta 3 - Minería */}
              <button
                onClick={() => filtrarPorEscuela("Minería")}
                className="relative w-[250px] h-[250px] max-lg:h-fit p-8 border border-orange-500
            rounded-2xl shadow-[0_0_15px_7px_rgba(249,115,22,0.5)] overflow-hidden
            group transition duration-500 hover:scale-105"
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
                    className="w-[100px] h-[100px] max-lg:size-[40px]"
                  />
                  <p className="text-lg text-white">Minería</p>
                  <div
                    // href="/mineria"
                    className="text-base translate-y-[7px] pointer-events-none 
              mt-4 px-6 max-lg:mt-0 max-lg:mb-2 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-700 
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
              transition-all duration-1000"
                  >
                    <div className="flex">
                    <span className="text-[0px] group-hover:text-base  text-white transition-all duration-500 ease-in-out">
                    Filtrar
                      </span>
                      <span>
                        <FaArrowRight className="text-white text-[18px] pl-1 items-center relative group-hover:translate-y-[2px]" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Barra de Búsqueda */}
            <div
              className="group relative w-full mt-8 flex justify-center items-center"
              data-aos="fade-up"
            >
              <div className="relative w-[80%] max-w-2xl">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Encuentra tu curso o diploma"
                  className="w-full px-6 py-3 text-white bg-[#0a0e27] 
              border border-cyan-500 text-xl rounded-full text-center 
              placeholder:text-white focus:placeholder-transparent 
              focus:outline-none focus:ring-2 focus:ring-cyan-300 
              group-hover:outline-none group-hover:ring-2 
              group-hover:ring-cyan-300 transition duration-300"
                />
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-[50%] p-2 -translate-y-[50%] rounded-full transition duration-500"
                >
                  <IoSearch className="w-5 h-5 text-cyan-500 group-hover:cyan-300 group-hover:scale-[1.20] transition duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-center  max-w-[100rem] mx-auto bg-[#131939]">
        {/* 📚 Lista de Cursos */}
        {isLoading ? (
          <p className="text-center">Cargando rutas...</p>
        ) : currentCourses.length > 0 ? (
          <div
            className="grid grid-cols-1 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-8 w-[90%] mx-auto mb-4  "
            ref={triggerRef}
          >
            {currentCourses.map((curso, index) => (
              <div
                ref={triggerRef}
                key={index}
                className=" flex max-xl:flex-col gap-6 bg-gradient-to-br from-[rgba(0,97,254,0)]  via-[rgba(22,46,84,0.42)] ] 
              to-[rgba(0,97,254,0.23)] ] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl "
              >
                <div className="w-[25%] h-fit  max-xl:h-[450px] max-xl:w-full bg-colors-dark-blue-ccd p-6 rounded-2xl ">
                  <img
                    src={storageUrl + curso.ImagenPortada}
                    className="rounded-2xl w-full h-[70%] mx-auto"
                    alt={curso.Ruta}
                  />
                  <div className="flex flex-col gap-4 text-white mt-4">
                    <h1 className="flex gap-2 justify-center items-center">
                      <span className="flex gap-2 items-center">
                        <FaUser /> {curso.Integrantes} integrantes{" "}
                      </span>
                      <span className="font-bold text-colors-cyan-ccd">|</span>
                      <span className="flex gap-2 items-center">
                        <BiSolidLike /> {curso.Popularidad}{" "}
                      </span>
                    </h1>
                    <button
                      onClick={() =>
                        handleMoreInfoClick(curso.Ruta, curso.IdRuta)
                      }
                      className="w-full p-2 px-4 rounded-xl bg-colors-cyan-ccd text-colors-dark-blue-ccd text-lg font-bold"
                    >
                      Descubrir Ruta
                    </button>
                  </div>
                </div>
                <div className="w-[75%] max-xl:w-full flex flex-col gap-4 text-white p-6">
                  <div className="w-full flex gap-6">
                    <div className="w-[70%] max-xl:w-full flex flex-col gap-3">
                      <h1 className=" w-full text-3xl max-xl:text-2xl">
                        {curso.Ruta}
                      </h1>
                      <div className="w-full h-[3px] bg-[#3185F7] "></div>
                      <h2 className="max-xl:text-[12px] ">
                        {curso.Descripcion}
                      </h2>
                    </div>
                    {/*  */}
                    <div className="flex relative  max-xl:static">
                      {obtenerEscuelasUnicas(curso.Productos)
                        .slice(0, 2) // Muestra solo los primeros 2 íconos
                        .map((escuela, index) => (
                          <div
                            key={index}
                            className={`flex justify-center items-center w-12 h-12 rounded-full p-2 shadow-md absolute max-xl:static ${
                              index === 0 ? "left-0" : "left-8"
                            } 
                            ${
                              escuela === "Gestión"
                                ? "border-red-500 border-[2.5px]"
                                : escuela === "Ingeniería"
                                ? "border-blue-500 border-[2.5px]"
                                : "border-orange-500 border-[2.5px]"
                            } bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)]`}
                          >
                            <img
                              src={
                                escuela === "Gestión"
                                  ? img.logos.gestion
                                  : escuela === "Ingeniería"
                                  ? img.logos.ingenieria
                                  : img.logos.mineria
                              }
                              alt={escuela}
                              className="w-8 h-8"
                            />
                          </div>
                        ))}

                      {/* Mostrar el contador si hay más de 2 escuelas */}
                      {obtenerEscuelasUnicas(curso.Productos).length > 2 && (
                        <div
                          className="flex justify-center items-center w-12 h-12 rounded-full p-2 shadow-md absolute left-16
                           border-[3px] border-blue-500 bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] text-white text-sm font-bold"
                        >
                          +{obtenerEscuelasUnicas(curso.Productos).length - 2}
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {agruparProductosPorCurso(curso.Productos).map(
                      (cursoAgrupado, index) => (
                        <li key={index}>
                          <div className="p-[8px] w-full max-xl:rounded-xl rounded-full border-2 border-[#0E4C5A] relative">
                            <span className="bg-[#142143] absolute -top-[2px] left-[-6px] rounded-full border-2 border-[#0E4C5A] p-2 px-4 text-colors-cyan-ccd text-base">
                              {index + 1}
                            </span>
                            <div className="pl-8 flex max-xl:flex-col items-center gap-4">
                              <h1 className="text-center">{cursoAgrupado.curso}</h1>
                              <div className="flex gap-2">
                                {cursoAgrupado.modalidades.map(
                                  (modalidad, idx) => (
                                    <span
                                      key={idx}
                                      // className={`px-2 py-1 text-xs rounded-full ${
                                      //   modalidad === "En Vivo"
                                      //     ? "bg-colors-sky-ccd text-white"
                                      //     : "bg-green-500 text-white"
                                      // }`}
                                      className="px-2 py-1 text-xs rounded-full text-colors-dark-blue-ccd bg-[#D1D5DB]"
                                    >
                                      {modalidad}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No hay rutas disponibles.</p>
        )}

        {/* ⏩ Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 my-8">
            <button
              className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-700"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-cyan-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-700"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
      {/* <FilterRutas
        truncate={isVisible}
        gestion={true}
        ingenieria={true}
        mineria={true}
        onClickGestion={() => filtrarPorEscuela("Gestión")}
        onClickIngenieria={() => filtrarPorEscuela("Ingeniería")}
        onClickMineria={() => filtrarPorEscuela("Minería")}
      /> */}

      {/* <BtnWhatssap  /> */}
    </>
  );
}
export default Cardrutas;
