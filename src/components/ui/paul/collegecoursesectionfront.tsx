"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "@/components/ui/paul/coursecard";
import axios from "axios";
import { environment } from "@/environments/environment";
import { IoSearch } from "react-icons/io5";
import CourseCardFront from "@/components/ui/paul/coursecardfront";
import Image from "next/image";

type Especializacion = {
  IdEspecializacion: number;
  Especializacion: string;
  Descripcion: string;
  Escuela_id: number;
  Estado_id: string;
  UltimaFechMod: string;
  UltimoUserMod: string;
  CantidadCursos: number;
};

type Producto = {
  TipoModalidad: string;
  IdProducto: number;
  Precio: number;
};

type CursoDetalleTP = {
  Productos: Producto[];
  Descripcion: string;
  Calificacion: string;
  Seguidores: string;
  Nivel: string;
  MarcasRespaldo: string;
  ExamenParcial: number;
  ExamenFinal: number;
  Profesores: string;
  Frecuencia: string;
  HorasAcademicas: string;
  Estado_id: string;
  UltimaFechMod: string;
  Escuela: string;
  Especializacion: string;
  IdEspecializacion: number;
  IdCurso: number;
  Curso: string;
  TipoCurso: string;
  RutaImagen: string;
  CantidadModulos: number;
};

const CollegeCourseSectionFront: React.FC<{
  t1: string;
  t2: string;
  t4: string;
}> = ({ t1, t2, t4 }) => {
  const [selectedEspecializaciones, setSelectedEspecializaciones] = useState<
    number[]
  >([]);
  const [especializaciones, setEspecializaciones] = useState<Especializacion[]>(
    []
  );

  const [cursoDetalleGestion, setCursoDetalleGestion] = useState<
    CursoDetalleTP[]
  >([]);
  const [cursoDetalleIngenieria, setCursoDetalleIngenieria] = useState<
    CursoDetalleTP[]
  >([]);
  const [cursoDetalleMineria, setCursoDetalleMineria] = useState<
    CursoDetalleTP[]
  >([]);

  // const [cursoDetalleGestion, setCursoDetalleGestion] = React.useState<
  //   CursoDetalleTP[]
  // >([]);
  // const [cursoDetalleIngenieria, setCursoDetalleIngenieria] = React.useState<
  //   CursoDetalleTP[]
  // >([]);
  // const [cursoDetalleMineria, setCursoDetalleMineria] = React.useState<
  //   CursoDetalleTP[]
  // >([]);

  const [cursosCompletos, setcursosCompletos] = React.useState<
    CursoDetalleTP[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Para el texto del buscador
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 15;
  const [selectedTipoCurso, setSelectedTipoCurso] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  // Manejar selección del tipo de curso
  const handleTipoCursoClick = (tipoCurso: string) => {
    setSelectedTipoCurso((prev) => (prev === tipoCurso ? null : tipoCurso));
  };

  // Ingeniería
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setIsLoading(true);

        // Caso 1: Búsqueda por palabra
        if (searchTerm.trim() !== "") {
          const response = await api.post("/inicio/buscarcursosporpalabra", {
            Palabra: searchTerm,
            Escuela: "Ingeniería",
            T1: t1,
            T2: t2,
            T4: t4,
          });
          setCursoDetalleIngenieria(response.data.cursos.slice(0, 4) || []);
          return;
        }

        // Caso 2: Filtro por especialización
        // if (selectedEspecializaciones.length > 0) {
        //   const promises = selectedEspecializaciones.map(async (id) => {
        //     const response = await api.post(
        //       "/inicio/vercursosespecializacionescuela",
        //       {
        //         IdEspecializacion: id,
        //         Escuela: escuela,
        //       }
        //     );
        //     return response.data.data[0];
        //   });
        //   const results = await Promise.all(promises);
        //   setCursosCompletos(results.flat().slice(0, 4));
        //   return;
        // }

        // Caso 3: Obtener todos los cursos
        const response = await api.post(
          "/inicio/vercursosespecializacionescuela",
          {
            Escuela: "Ingeniería",
            T1: t1,
            T2: t2,
            T4: t4,
          }
        );
        setCursoDetalleIngenieria(response.data.data[0].slice(0, 4));
      } catch (error) {
        console.error("Error fetching cursos:", error);
      } finally {
        setIsLoading(false);
        setCurrentPage(1); // Reinicia la paginación
      }
    };
    fetchCursos();
  }, [selectedEspecializaciones, searchTerm, "Ingeniería"]);

  // Gestión
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setIsLoading(true);

        // Caso 1: Búsqueda por palabra
        if (searchTerm.trim() !== "") {
          const response = await api.post("/inicio/buscarcursosporpalabra", {
            Palabra: searchTerm,
            Escuela: "Gestión",
            T1: t1,
            T2: t2,
            T4: t4,
          });
          setCursoDetalleGestion(response.data.cursos.slice(0, 4) || []);
          return;
        }

        // Caso 2: Filtro por especialización
        // if (selectedEspecializaciones.length > 0) {
        //   const promises = selectedEspecializaciones.map(async (id) => {
        //     const response = await api.post(
        //       "/inicio/vercursosespecializacionescuela",
        //       {
        //         IdEspecializacion: id,
        //         Escuela: escuela,
        //       }
        //     );
        //     return response.data.data[0];
        //   });
        //   const results = await Promise.all(promises);
        //   setCursosCompletos(results.flat().slice(0, 4));
        //   return;
        // }

        // Caso 3: Obtener todos los cursos
        const response = await api.post(
          "/inicio/vercursosespecializacionescuela",
          {
            Escuela: "Gestión",
            T1: t1,
            T2: t2,
            T4: t4,
          }
        );
        setCursoDetalleGestion(response.data.data[0].slice(0, 12));
      } catch (error) {
        console.error("Error fetching cursos:", error);
      } finally {
        setIsLoading(false);
        setCurrentPage(1); // Reinicia la paginación
      }
    };
    fetchCursos();
  }, [selectedEspecializaciones, searchTerm, "Gestión"]);

  // Minería
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setIsLoading(true);

        // Caso 1: Búsqueda por palabra
        if (searchTerm.trim() !== "") {
          const response = await api.post("/inicio/buscarcursosporpalabra", {
            Palabra: searchTerm,
            Escuela: "Minería",
            T1: t1,
            T2: t2,
            T4: t4,
          });
          setCursoDetalleMineria(response.data.cursos.slice(0, 4) || []);
          return;
        }
        // Caso 2: Filtro por especialización
        // if (selectedEspecializaciones.length > 0) {
        //   const promises = selectedEspecializaciones.map(async (id) => {
        //     const response = await api.post(
        //       "/inicio/vercursosespecializacionescuela",
        //       {
        //         IdEspecializacion: id,
        //         Escuela: escuela,
        //       }
        //     );
        //     return response.data.data[0];
        //   });
        //   const results = await Promise.all(promises);
        //   setCursosCompletos(results.flat().slice(0, 4));
        //   return;
        // }

        // Caso 3: Obtener todos los cursos
        const response = await api.post(
          "/inicio/vercursosespecializacionescuela",
          {
            Escuela: "Minería",
            T1: t1,
            T2: t2,
            T4: t4,
          }
        );
        setCursoDetalleMineria(response.data.data[0].slice(0, 4));
      } catch (error) {
        console.error("Error fetching cursos:", error);
      } finally {
        setIsLoading(false);
        setCurrentPage(1); // Reinicia la paginación
      }
    };
    fetchCursos();
  }, [selectedEspecializaciones, searchTerm, "Minería"]);

  // INICIO ###########################################################################################
  // Fetch Especializaciones
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await api.post("/inicio/frontgetcursodetalle", {
  //         Escuela: "Gestión",
  //         T1: t1,
  //         T2: t2,
  //         T4: t4,
  //       });
  //       const data = response.data.data;
  //       setCursoDetalleGestion(Array.isArray(data) ? data : [data]);
  //       // console.log("Cursos recibidos:", Array.isArray(data) ? data : [data]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Fetch Especializaciones
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await api.post("/inicio/frontgetcursodetalle", {
  //         Escuela: "Ingeniería",
  //         T1: t1,
  //         T2: t2,
  //         T4: t4,
  //       });
  //       const data = response.data.data;
  //       setCursoDetalleIngenieria(Array.isArray(data) ? data : [data]);
  //       // console.log("Cursos recibidos:", Array.isArray(data) ? data : [data]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await api.post("/inicio/frontgetcursodetalle", {
  //         Escuela: "Minería",
  //         T1: t1,
  //         T2: t2,
  //         T4: t4,
  //       });
  //       const data = response.data.data;
  //       setCursoDetalleMineria(Array.isArray(data) ? data : [data]);
  //       // console.log("Cursos recibidos:", Array.isArray(data) ? data : [data]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // FIN ###########################################################################################

  // Manejar búsqueda
  const handleSearch = () => {
    setSelectedEspecializaciones([]); // Reinicia los filtros al buscar por palabra
    setCurrentPage(1); // Reinicia la paginación
  };

  // Manejar selección de especialización
  const handleEspecializacionClick = (especializacionId: number) => {
    setSelectedEspecializaciones((prevSelected) =>
      prevSelected.includes(especializacionId)
        ? prevSelected.filter((id) => id !== especializacionId)
        : [...prevSelected, especializacionId]
    );
    setSearchTerm(""); // Reinicia la búsqueda al usar los filtros
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Imagen de fondo */}
        <Image
          src="https://pub-3d37c601c64a44ff8ec0a62bc03016eb.r2.dev/Ejemplos/bg-4.png"
          alt="Fondo azul CCD"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        {/* Search Bar */}
        <div>
          <div
            className="group relative w-full mt-8 mb-8 flex justify-center items-center  "
            data-aos="fade-up"
          >
            <div className="relative w-[80%] max-w-2xl">
              <input
                type="text"
                placeholder="Encuentra tu curso o diploma"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Buscar al presionar Enter
                className="w-full px-6 py-3 text-white bg-[#0a0e27] border-2 border-colors-egp-gold text-xl rounded-full text-center placeholder:text-white focus:placeholder-transparent focus:outline-none focus:ring-2 focus:ring-colors-egp-gold group-hover:outline-none group-hover:ring-2 group-hover:ring-colors-egp-gold transition duration-300"
              />
              <button
                className="absolute right-3 top-[50%] p-2 -translate-y-[50%] rounded-full transition duration-500"
                onClick={handleSearch}
              >
                <IoSearch className="w-5 h-5 text-colors-egp-gold group-hover:cyan-300 group-hover:scale-[1.20] transition duration-500" />
              </button>
            </div>
          </div>
          <div className=" max-w-[100rem]  mx-auto grid grid-cols-4  max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-2xl:w-fit gap-6 justify-center  py-10 px-4">
            {/* {cursoDetalleIngenieria.map(
              (producto: CursoDetalleTP, index: number) => (
                <div key={index}>
                  <CourseCardFront
                    array={producto}
                    pid={producto.IdCurso}
                    ruta={producto.Curso.replace(/\//g, "-").toLowerCase()}
                    openSideSheet={() => {}}
                  />
                </div>
              )
            )} */}
            {cursoDetalleGestion.map(
              (producto: CursoDetalleTP, index: number) => (
                // console.log("PRODUCTO ", producto.IdCurso),
                <div key={index}>
                  <CourseCardFront
                    array={producto}
                    pid={producto.IdCurso}
                    ruta={producto.Curso.replace(/\//g, "-").toLowerCase()}
                    openSideSheet={() => {}}
                  />
                </div>
              )
            )}
            {/* {cursoDetalleMineria.map(
              (producto: CursoDetalleTP, index: number) => (
                <div key={index}>
                  <CourseCardFront
                    array={producto}
                    pid={producto.IdCurso}
                    ruta={producto.Curso.replace(/\//g, "-").toLowerCase()}
                    openSideSheet={() => {}}
                  />
                </div>
              )
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeCourseSectionFront;
