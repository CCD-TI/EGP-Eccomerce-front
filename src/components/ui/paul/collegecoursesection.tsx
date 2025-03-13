"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "@/components/ui/paul/coursecard";
import axios from "axios";
import { environment } from "@/environments/environment";
import { IoSearch } from "react-icons/io5";
import { FaFilter, FaTrashAlt } from "react-icons/fa";
import SheetResponsive from "./sheetResponsive";

type Especializacion = {
  IdEspecializacion: number;
  Especializacion: string;
};

type Producto = {
  TipoModalidad: string;
  IdProducto: number;
  Precio: number;
};

type CursoDetalleTP = {
  Productos: Producto[];
  Especializacion: string;
  IdCurso: number;
  Curso: string;
  TipoCurso: string;
  RutaImagen: string;
};

const CollegeCourseSection: React.FC<{
  escuela: string;
  t1: string;
  t2: string;
  t4: string;
}> = ({ escuela, t1, t2, t4 }) => {
  const [especializaciones, setEspecializaciones] = useState<Especializacion[]>(
    []
  );
  const [cursosCompletos, setCursosCompletos] = useState<CursoDetalleTP[]>([]);
  const [filteredCursos, setFilteredCursos] = useState<CursoDetalleTP[]>([]);
  const [selectedEspecializaciones, setSelectedEspecializaciones] = useState<
    number[]
  >([]);
  const [selectedTipoCurso, setSelectedTipoCurso] = useState<string[]>([]);
  const [selectedModalidades, setSelectedModalidades] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 15;
  const [isLoading, setIsLoading] = useState(false);

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const [especializacion, setEspecializacion] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const espe = params.get("especializacion");
    setEspecializacion(espe || "");
  }, []);

  useEffect(() => {
    // Este useEffect se ejecuta cuando especializacion cambia
  }, [especializacion]); //

  // Fetch inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Obtener cursos
        const responseCursos = await api.post(
          "/inicio/vercursosespecializacionescuela",
          { Escuela: escuela, T1: t1, T2: t2, T4: t4 }
        );

        setCursosCompletos(responseCursos.data.data[0] || []);
        setFilteredCursos(responseCursos.data.data[0] || []);

        // Obtener especializaciones
        const responseEspecializaciones = await api.post(
          "/inicio/listaespecializacion",
          { Escuela: escuela }
        );
        setEspecializaciones(responseEspecializaciones.data.data[0] || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [escuela, t1, t2, t4]);

  // Búsqueda en tiempo real
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();

    // Aplicar búsqueda en tiempo real
    if (term) {
      const searched = cursosCompletos.filter((curso) =>
        curso.Curso.toLowerCase().includes(term)
      );
      setFilteredCursos(searched);
    } else {
      // Si no hay término de búsqueda, mostrar todos los cursos
      setFilteredCursos(cursosCompletos);
    }

    setCurrentPage(1); // Reiniciar la paginación al buscar
  }, [searchTerm, cursosCompletos]);

  // Aplicar filtros
  const aplicarFiltros = () => {
    const filtered = cursosCompletos.filter((curso) => {
      const matchesEspecializacion =
        selectedEspecializaciones.length === 0 ||
        selectedEspecializaciones.includes(
          especializaciones.find(
            (especializacion) =>
              especializacion.Especializacion === curso.Especializacion
          )?.IdEspecializacion || 0
        );
      const matchesTipoCurso =
        selectedTipoCurso.length === 0 ||
        selectedTipoCurso.includes(curso.TipoCurso);
      const matchesModalidad =
        selectedModalidades.length === 0 ||
        selectedModalidades.some((modalidad) =>
          curso.Productos.some(
            (producto) => producto.TipoModalidad === modalidad
          )
        );

      return matchesEspecializacion && matchesTipoCurso && matchesModalidad;
    });

    setFilteredCursos(filtered);
    setCurrentPage(1); // Reinicia la paginación
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setSelectedEspecializaciones([]);
    setSelectedTipoCurso([]);
    setSelectedModalidades([]);
    aplicarFiltros();
  };
  const [isOpen, setIsOpen] = useState(false);
  // Paginación
  const totalPages = Math.ceil(filteredCursos.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCursos.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const [isOpen2, setIsOpen2] = useState(false);

  const handleOpen = () => setIsOpen2(true);
  const handleClose = () => setIsOpen2(false);
  const [isVisible, setIsVisible] = useState(window.innerWidth > 1020);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 1020);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const espe = params.get("especializacion");

    if (espe) {
      // Si el parámetro existe, agregarlo al estado si aún no está presente
      setSelectedEspecializaciones((prev) =>
        prev.includes(Number(espe)) ? prev : [...prev, Number(espe)]
      );
    }
  }, []);

  useEffect(() => {
    if (cursosCompletos.length > 0 && especializaciones.length > 0) {
      aplicarFiltros();
    }
  }, [cursosCompletos, especializaciones]);

  return (
   

    <div className="w-[95%] mx-auto  ">
      {/* Search Bar */}
      <div
        className=" relative w-full mt-8 mb-8 flex gap-8 justify-center items-center max-sm:px-8"
        data-aos="fade-up"
      >
        <SheetResponsive
          btn={
            <button
              className="rounded-full bg-colors-sky-ccd border-1 border-white hidden max-lg:block transition-opacity duration-500 ease-out "
              onClick={handleOpen}
            >
              <FaFilter className="size-[3rem] text-white p-[9px] " />
            </button>
          }
          content={
            <aside className="w-fit h-fit   text-white rounded-xl ">
              <div className="">
                <h2 className="text-lg font-bold mb-6 pb-3">Especialización</h2>
                {especializaciones.map((especializacion) => (
                  <label
                    key={especializacion.IdEspecializacion}
                    className="block mb-2"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedEspecializaciones.includes(
                        especializacion.IdEspecializacion
                      )}
                      onChange={(e) => {
                        const id = especializacion.IdEspecializacion;
                        setSelectedEspecializaciones((prev) =>
                          e.target.checked
                            ? [...prev, id]
                            : prev.filter((item) => item !== id)
                        );
                      }}
                    />
                    {especializacion.Especializacion}
                  </label>
                ))}
              </div>

              <hr className="bg-colors-sky-ccd h-[2px] w-full my-6 border-transparent mx-auto rounded" />

              {/* Filtro por Tipo de Curso */}
              <div className="">
                <h2 className="text-lg font-bold mb-4 pb-3">Producto</h2>
                {["Curso", "Diploma"].map((tipo) => (
                  <label key={tipo} className="block mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedTipoCurso.includes(tipo)}
                      onChange={(e) => {
                        setSelectedTipoCurso((prev) =>
                          e.target.checked
                            ? [...prev, tipo]
                            : prev.filter((item) => item !== tipo)
                        );
                      }}
                    />
                    {tipo}
                  </label>
                ))}
              </div>

              <hr className="bg-colors-sky-ccd h-[2px] w-full my-6 border-transparent mx-auto rounded" />

              {/* Filtro por Modalidad */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4 pb-3">Modalidad</h2>
                {["En Vivo", "Asincrónico"].map((modalidad) => (
                  <label key={modalidad} className="block mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedModalidades.includes(modalidad)}
                      onChange={(e) => {
                        setSelectedModalidades((prev) =>
                          e.target.checked
                            ? [...prev, modalidad]
                            : prev.filter((item) => item !== modalidad)
                        );
                      }}
                    />
                    {modalidad}
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <button
                  className="px-4 py-2 bg-colors-sky-ccd hover:bg-white hover:text-colors-sky-ccd text-white rounded-xl duration-400"
                  onClick={() => {
                    aplicarFiltros();
                    handleClose();
                  }}
                >
                  Aplicar filtros
                </button>
                <button
                  className="px-4 py-2 bg-white text-colors-sky-ccd hover:bg-colors-sky-ccd hover:text-white rounded-xl duration-400"
                  onClick={() => {
                    limpiarFiltros();
                    handleClose();
                  }}
                >
                  Limpiar selección{" "}
                  <FaTrashAlt className="inline-block ml-1 -translate-y-[2px]" />
                </button>
              </div>
            </aside>
          }
        />

       

        <div className="relative w-[80%] max-w-2xl">
          <input
            type="text"
            placeholder="Encuentra tu curso o diploma"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Búsqueda en tiempo real
            className="w-full !placeholder:overflow-ellipsis placeholder:truncate px-6 max-sm:placeholder:text-sm py-3 text-white bg-[#0a0e27] border border-cyan-500 text-xl rounded-full text-center placeholder:text-white focus:placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 group-hover:outline-none group-hover:ring-2 group-hover:ring-cyan-300 transition duration-300"
          />
          <button
            className="absolute right-3 top-[50%] p-2 -translate-y-[50%] rounded-full transition duration-500"
            onClick={() => setSearchTerm("")} // Botón para limpiar búsqueda
          >
            <IoSearch className="w-5 h-5 text-cyan-500 group-hover:cyan-300 group-hover:scale-[1.20] transition duration-500" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen gap-10">
        {/* Sidebar con filtros */}
        {isVisible && (
          <aside className="w-fit h-fit p-6 bg-colors-dark-blue-ccd text-white ">
            <div className="">
              <h2 className="text-lg font-bold mb-6 pb-3">Especialización</h2>
              {especializaciones.map((especializacion) => (
                <label
                  key={especializacion.IdEspecializacion}
                  className="block mb-2"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedEspecializaciones.includes(
                      especializacion.IdEspecializacion
                    )}
                    onChange={(e) => {
                      const id = especializacion.IdEspecializacion;
                      setSelectedEspecializaciones((prev) =>
                        e.target.checked
                          ? [...prev, id]
                          : prev.filter((item) => item !== id)
                      );
                    }}
                  />
                  {especializacion.Especializacion}
                </label>
              ))}
            </div>

            <hr className="bg-colors-sky-ccd h-[2px] w-full my-6 border-transparent mx-auto rounded" />

            {/* Filtro por Tipo de Curso */}
            <div className="">
              <h2 className="text-lg font-bold mb-4 pb-3">Producto</h2>
              {["Curso", "Diploma"].map((tipo) => (
                <label key={tipo} className="block mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedTipoCurso.includes(tipo)}
                    onChange={(e) => {
                      setSelectedTipoCurso((prev) =>
                        e.target.checked
                          ? [...prev, tipo]
                          : prev.filter((item) => item !== tipo)
                      );
                    }}
                  />
                  {tipo}
                </label>
              ))}
            </div>

            <hr className="bg-colors-sky-ccd h-[2px] w-full my-6 border-transparent mx-auto rounded" />

            {/* Filtro por Modalidad */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4 pb-3">Modalidad</h2>
              {["En Vivo", "Asincrónico"].map((modalidad) => (
                <label key={modalidad} className="block mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedModalidades.includes(modalidad)}
                    onChange={(e) => {
                      setSelectedModalidades((prev) =>
                        e.target.checked
                          ? [...prev, modalidad]
                          : prev.filter((item) => item !== modalidad)
                      );
                    }}
                  />
                  {modalidad}
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="px-4 py-2 bg-colors-sky-ccd hover:bg-white hover:text-colors-sky-ccd text-white rounded-xl duration-400"
                onClick={aplicarFiltros}
              >
                Aplicar filtros
              </button>
              <button
                className="px-4 py-2 bg-white text-colors-sky-ccd hover:bg-colors-sky-ccd hover:text-white rounded-xl duration-400"
                onClick={limpiarFiltros}
              >
                Limpiar selección{" "}
                <FaTrashAlt className="inline-block ml-1 -translate-y-[2px]" />
              </button>
            </div>
          </aside>
        )}
        {/* Cursos */}
        <main className="lg:w-3/4">
          {isLoading ? (
            <p className="text-white text-center">Cargando cursos...</p>
          ) : filteredCursos.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-6 px-0 mx-0 justify-center  py-10">
                {currentCourses.map((curso) => (
                  <CourseCard
                    key={curso.IdCurso}
                    array={curso}
                    pid={curso.IdCurso}
                    ruta={curso.Curso.replace(/\//g,"-").toLowerCase()}
                    escuela={escuela}
                    openSideSheet={() => {}}
                  />
                ))}
              </div>
              {/* Paginación */}
              <div className="flex justify-center gap-2 mt-6">
                <button
                  className="px-4 py-2 bg-white rounded"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                  className="px-4 py-2 bg-white rounded"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-white">
              No se encontraron resultados.
            </p>
          )}
        </main>
      </div>
    </div>
    
  );
};

export default CollegeCourseSection;
