"use client";
import { Button, Link } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { RiBroadcastFill } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { MdAddCircle, MdKeyboardArrowDown } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useCartProductoStore } from "@/context/cartProducto";
import { ChevronLeft } from "lucide-react";

const steps = [
  {
    title: "Selecciona tus cursos o diplomas",
    description: "Elige los cursos que deseas tomar",
  },
  {
    title: "Información de pago",
    description: "Ingresa los detalles de tu pago",
  },
  {
    title: "Confirmación",
    description: "Revisa y confirma tu orden",
  },
];

const ShoppingCartCourseSelectorProfesional: React.FC = () => {

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
  const img = {
    icon: {
      gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
      ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-ingenieria.svg`,
      mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-mineria.svg`,
    },
  };

  interface CursoDetalle {
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
    NumeroWhatsapp: string;
    Escuela: string;
    Especializacion: string;
    IdProducto: number;
    TipoModalidad: string;
    Precio: number;
    FechaInicio?: string | null;
    Horario?: string | null;
    IdCurso: number;
    Curso: string;
    TipoCurso: string;
    RutaImagen: string[];
    CantidadModulos: string;
    isSelected: boolean;
  }

  interface Curso {
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
    NumeroWhatsapp: string;
    Escuela: string;
    Especializacion: string;
    IdProducto: number;
    TipoModalidad: string;
    Precio: number;
    FechaInicio?: string | null;
    Horario?: string | null;
    IdCurso: number;
    Curso: string;
    TipoCurso: string;
    RutaImagen: string[];
    CantidadModulos: string;
  }

  // Data Cursos
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Curso[]>([]);
  const [cursosCompletos, setcursosCompletos] = React.useState<CursoDetalle[]>(
    []
  );

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // Switch
  const [isLive, setIsLive] = useState(true); // true => En Vivo, false => Asincrónico
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalidadIndex, setModalidadIndex] = useState(0);
  const [preciocarrito, setpreciocarrito] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.post("/inicio/getcursosav", {});

        // Transformar los datos para que coincidan con la interfaz CursoDetalle
        const transformedData = response.data.data.map((item: any) => ({
          ...item.json_build_object, // Extraer las propiedades del objeto interno
          isSelected: false, // Inicializar isSelected como falso
        }));

        setcursosCompletos(transformedData);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setError("Error al cargar los datos del curso.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  // Estado para manejar los cursos seleccionados
  type SelectedCourse = {
    college: string;
    title: string;
    imageUrl: string;
    startDate: string;
    startTime: string;
    modality: string;
    courseType: string;
  };
  // REGRESAR AQUÍ

  // Desplegable
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Ordenar por");
  const [animationKey, setAnimationKey] = useState<number>(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  type PaymentStep = "method" | "form" | "confirmation";

  const [currentStep, setCurrentStep] = useState<PaymentStep>("method");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "qr">("card");

  const handlePaymentMethodSelect = (method: "card" | "qr") => {
    setSelectedMethod(method);
    setCurrentStep("form");
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("confirmation");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "form":
        setCurrentStep("method");
        break;
      case "confirmation":
        setCurrentStep("form");
        break;
      default:
        // If we're already at the first step, we could potentially navigate away from the payment flow
        // For now, we'll just keep the user on the first step
        break;
    }
  };

  const cart = useCartProductoStore((state) => state.cart);

  const handleBoxToggle = (courseId: number) => {
    // Buscar el curso por su ID
    const selectedCourse = cursosCompletos.find(
      (curso) => curso.IdProducto === courseId
    );
  
    if (!selectedCourse) {
      console.warn(`Curso con ID ${courseId} no encontrado.`);
      return;
    }
  
    // Verificar si ya está seleccionado
    const isAlreadySelected = selectedCourses.some(
      (curso) => curso.IdProducto === courseId
    );
  
    if (isAlreadySelected) {
      // Si ya está seleccionado, lo quitamos de la lista de seleccionados
      setSelectedCourses((prevSelected) =>
        prevSelected.filter((curso) => curso.IdProducto !== courseId)
      );
      // También actualizamos el estado general de los cursos
      setcursosCompletos((prevCursos) =>
        prevCursos.map((curso) =>
          curso.IdProducto === courseId
            ? { ...curso, isSelected: false }
            : curso
        )
      );
    } else {
      // Contar cuántos cursos de cada modalidad han sido seleccionados
      const hasAsynchronous = selectedCourses.filter(
        (curso) => curso.TipoModalidad === "Asincrónico"
      ).length;
  
      const hasLive = selectedCourses.filter(
        (curso) => curso.TipoModalidad === "En Vivo"
      ).length;
  
      // Limitar la cantidad de cursos seleccionados por modalidad
      if (
        (selectedCourse.TipoModalidad === "Asincrónico" && hasAsynchronous >= 2) ||
        (selectedCourse.TipoModalidad === "En Vivo" && hasLive >= 2)
      ) {
        showModal(
          `Solo se permite añadir hasta 2 cursos con la modalidad "${selectedCourse.TipoModalidad}".`
        );
        return;
      }
  
      // Si no está seleccionado, lo agregamos a la lista de seleccionados
      setSelectedCourses((prevSelected) => [...prevSelected, selectedCourse]);
  
      // Actualizamos el estado general de los cursos
      setcursosCompletos((prevCursos) =>
        prevCursos.map((curso) =>
          curso.IdProducto === courseId ? { ...curso, isSelected: true } : curso
        )
      );
    }
  };
  



  const modalidad = 1;
  // const filteredSelectedCourses = cursosCompletos.filter(
  //   (curso) => curso.isSelected
  // );

  // Verifica si ambos cursos están seleccionados para habilitar el botón de compra
  // const isPurchaseReady =
  //   selectedCourses.some((curso) =>
  //     curso.Productos.some(
  //       (producto) => producto.TipoModalidad === "Asincrónico"
  //     )
  //   ) &&
  //   selectedCourses.some((curso) =>
  //     curso.Productos.some((producto) => producto.TipoModalidad === "En Vivo")
  //   );

  const [brochure, setbrochure] = useState("");

  if (isLoading) return <div>Cargando cursos...</div>;

  return (
    <>
      <div className={`flex flex-col max-lg:flex-col overflow-y-auto h-full ${currentStep === "form" ? "justify-center" : "justify-between"}  bg-[#0A1128] bg-double-esferas2 text-white p-6 gap-6`}>
        {/* START Parte Superior */}

        <div>
          <div className="w-fit  relative flex  gap-10 justify-self-center items-center mb-12  ">
            {/* Dashed background */}
            <div className="flex gap-24">
              <div className="absolute top-10 left-2 w-full  h-[6px] -translate-y-1/2 px-10 ">
                <div className=" dashed-background w-full h-full   rounded-full"></div>
              </div>
              <div className="absolute top-10 left-2 w-full h-[6px] -translate-y-1/2  px-10">
                <div className="w-full h-full  rounded-full">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-300 rounded-full"
                    style={{
                      width:
                        currentStep === "method"
                          ? "0%"
                          : currentStep === "form"
                          ? "50%"
                          : currentStep === "confirmation"
                          ? "75%"
                          // Nuevo valor para un tercer paso
                          : "100%",
                    }}
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full [mask-image:linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0);] [mask-size:9px_2px] [mask-repeat:repeat]"></div>
              </div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold
              ${
                currentStep !== "confirmation"
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-slate-400 text-white/50"
              }`}
                >
                  1
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`font-medium ${
                      currentStep !== "confirmation"
                        ? "text-cyan-400"
                        : "text-white/50"
                    }`}
                  >
                    Selecciona tus cursos <br /> o diplomas{" "}
                  </p>
                  <p
                    className={`font-medium ${
                      currentStep !== "confirmation"
                        ? "text-cyan-400"
                        : "text-white/50"
                    }`}
                  ></p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
              ${
                currentStep === "form"
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-white text-slate-600"
              }`}
                >
                  2
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`font-medium ${
                      currentStep === "form"
                        ? "text-cyan-400"
                        : "text-white/50"
                    }`}
                  >
                    Información de pago
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
              ${
                currentStep === "confirmation"
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-white text-slate-600"
              }`}
                >
                  3
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`font-medium ${
                      currentStep === "confirmation"
                        ? "text-cyan-400"
                        : "text-white/50"
                    }`}
                  >
                    Confirmación
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full mx-auto">
          {/* Left Column - Payment Flow */}
          <div className="flex-1">
            {currentStep === "method" && (
              <>
                <div className="flex flex-col justify-center items-center">
                  {/* Proceso de Carrito */}

                  {/* Progress Steps with dashed-background */}

                  <div className="w-min py-10 px-6 flex flex-col items-center justify-center gap-10">
                    {/* Sección de Opciones */}
                    <div className="flex  gap-10">
                      {/* Gestión */}
                      <div
                        className="group text-white py-2 px-4 rounded-xl w-[210px] hover:w-[290px] flex gap-4 items-center justify-center
                            bg-gradient-to-r from-transparent to-[rgba(255,0,0,0.8)] bg-[length:160%] bg-[linear-gradient(to right, transparent 65%, rgba(255,0,0,0.8) 35%)]
                            shadow-[0_0_15px_rgba(255,0,0,0.6)] transition-all duration-1000
                          border-[rgba(255,0,0,0.8)] border-2 hover:to-[rgba(255,0,0,1)]"
                      >
                        {/* Icono */}
                        <div>
                          <img src={img.icon.gestion} className="w-8" />
                        </div>

                        {/* Título */}
                        <div className="flex text-center">Gestión</div>

                        {/* Texto y Flecha */}
                        <div className="flex gap-2 h-8 group-hover:w-36 items-center bg-red-500 px-2 rounded-[8px] transition-all duration-700">
                          {/* Texto que aparece en hover */}
                            <Link href="/gestion"
                            className="hidden w-4 group-hover:flex whitespace-nowrap group-hover:opacity-100 transition-opacity duration-200">
                            Ir a la escuela
                            </Link>

                          {/* Flecha */}
                          <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[70px]" />
                        </div>
                      </div>

                      {/* Ingeniería */}
                      <div
                        className="group text-white py-2 px-4 rounded-xl w-[210px] hover:w-[290px] flex gap-4 items-center justify-center
                  bg-gradient-to-r from-transparent to-[rgba(0,96,254,0.8)] bg-[length:160%] bg-[linear-gradient(to right, transparent 65%, rgba(255,0,0,0.8) 35%)]
                  shadow-[0_0_15px_rgba(0,96,254,0.6)] transition-all duration-1000
                  border-[rgba(0,96,254,0.8)] border-2 hover:to-[rgba(0,96,254,1)]"
                      >
                        {/* Icono */}
                        <div>
                          <img src={img.icon.ingenieria} className="w-8" />
                        </div>

                        {/* Título */}
                        <div className="flex text-center">Ingeniería</div>

                        {/* Texto y Flecha */}
                        <div className="flex gap-2 h-8 w-fit group-hover:w-36 items-center bg-[rgba(0,96,254,0.8)] px-2 rounded-[8px] transition-all duration-700">
                          {/* Texto que aparece en hover */}
                          <Link href="/ingenieria"
                          className="hidden w-4 group-hover:flex whitespace-nowrap group-hover:opacity-100 transition-opacity duration-200">
                            Ir a la escuela
                          </Link>

                          {/* Flecha */}
                          <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[70px]" />
                        </div>
                      </div>

                      {/* Minería */}
                      <div
                        className="group text-white py-2 px-4 rounded-xl w-[210px] hover:w-[290px] flex gap-4 items-center justify-center
                  bg-gradient-to-r from-transparent to-[rgba(249,115,22,0.8)] bg-[length:160%] bg-[linear-gradient(to right, transparent 65%, rgba(249,115,22,0.8) 35%)]
                  shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-1000
                  border-[rgba(249,115,22,0.8)] border-2 hover:to-[rgba(249,115,22,1)]"
                      >
                        {/* Icono */}
                        <div>
                          <img src={img.icon.mineria} className="w-8" />
                        </div>

                        {/* Título */}
                        <div className="flex text-center">Minería</div>

                        {/* Texto y Flecha */}
                        <div className="flex gap-2 h-8 w-fit group-hover:w-36 items-center bg-[rgba(249,115,22,0.8)] px-2 rounded-[8px] transition-all duration-700">
                          {/* Texto que aparece en hover */}
                          <Link href="/mineria"
                          className="hidden w-4 group-hover:flex whitespace-nowrap group-hover:opacity-100 transition-opacity duration-200">
                            Ir a la escuela
                          </Link>

                          {/* Flecha */}
                          <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[70px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-10">
                  {/* Lista de Cursos */}
                  <div className="flex-1">
                    {/* START Filtros */}
                    <div className="flex justify-between mb-6">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-4">
                          {/* Switch */}
                          <div
                            className="relative flex items-center w-16 h-8 border-2 border-colors-cyan-ccd rounded-full cursor-pointer"
                            onClick={() => setIsLive((prev) => !prev)} // Cambia el estado
                          >
                            {/* Indicador del switch */}
                            <div
                              className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                                isLive ? "translate-x-8" : "translate-x-1" // Posición del indicador
                              }`}
                            ></div>
                          </div>

                          {/* Texto e Icono dinámico */}
                          <div
                            className="flex items-center gap-2 text-colors-cyan-ccd cursor-pointer"
                            onClick={() => setIsLive((prev) => !prev)} // Cambia el estado al hacer clic
                          >
                            {isLive ? (
                              <>
                                <span className="text-sm font-medium">
                                  Curso en Vivo
                                </span>
                                <RiBroadcastFill size={20} />
                              </>
                            ) : (
                              <>
                                <span className="text-sm font-medium">
                                  Curso Asincrónico
                                </span>
                                <BsCameraVideoFill size={20} />
                              </>
                            )}
                          </div>
                        </div>
                        <div className="w-64">
                          {/* Botón desplegable */}
                          <button
                            onClick={toggleDropdown}
                            className="flex justify-between items-center w-max px-4 py-2 bg-colors-dark-blue-ccd rounded-[6px] text-white focus:outline-none"
                          >
                            <span>{selectedOption}</span>
                            <MdKeyboardArrowDown
                              className={`text-2xl text-colors-cyan-ccd transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Opciones */}
                          {isOpen && (
                            <ul className="absolute z-10 mt-2 w-max bg-[#131939] rounded-[8px] shadow-lg text-white">
                              <li
                                onClick={() => handleOptionClick("Ordenar por")}
                                className="px-4 py-2 hover:bg-colors-dark-blue-ccd cursor-pointer"
                              >
                                Ordenar por
                              </li>
                              <li
                                onClick={() => handleOptionClick("Fecha")}
                                className="px-4 py-2 hover:bg-colors-dark-blue-ccd cursor-pointer"
                              >
                                Fecha
                              </li>
                              <li
                                onClick={() => handleOptionClick("Duración")}
                                className="px-4 py-2 hover:bg-colors-dark-blue-ccd cursor-pointer"
                              >
                                Duración
                              </li>
                              <li
                                onClick={() => handleOptionClick("Popularidad")}
                                className="px-4 py-2 hover:bg-colors-dark-blue-ccd cursor-pointer"
                              >
                                Popularidad
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                      {/* Barra de Búsqueda */}
                      <div
                        className="group flex justify-center items-center"
                        data-aos="fade-up"
                      >
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Encuentra tu curso o diploma"
                            className="w-[250px] text-left pl-4 px-2 py-2 text-white bg-[#0a0e27] border-2 border-colors-dark-blue-ccd text-sm rounded-full
                          placeholder:text-white transition duration-300 focus:placeholder-transparent
                          group-hover:ring-colors-dark-blue-ccd focus:border-colors-dark-blue-ccd
                          focus:outline-none focus:colors-dark-blue-ccd "
                          />
                          <button className="absolute right-3 top-[50%] focus:border-colors-dark-blue-ccd p-2 -translate-y-[50%] rounded-full transition duration-500">
                            <IoSearch className="w-5 h-5 text-colors-cyan-ccd focus:border-colors-dark-blue-ccd group-hover:scale-[1.20] transition duration-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* END Filtros */}

                    {/* START Cursos */}
                    {cursosCompletos.map(
                      (producto: CursoDetalle, index: number) => {
                        if (!producto || !Array.isArray(producto.RutaImagen)) {
                          console.warn(
                            `El curso en índice ${index} tiene un formato inválido:`,
                            producto
                          );
                          return null;
                        }

                        return (
                          <>
                            {/* {filteredCourses.map((course, index) => ( */}
                            <div
                              key={index}
                              className="flex items-center gap-4 pl-5 py-4 px-6 mb-4 rounded-xl bg-[#131939] hover:bg-[#1B2551] transition"
                            >
                              {/* Icono en la esquina superior izquierda */}
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-14 h-14 p-1 -mr-8 z-10
                              bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] 
                              rounded-full shadow-md flex items-center justify-center ${
                                producto.Escuela === "Gestión"
                                  ? "border-red-500 border-[2px]"
                                  : producto.Escuela === "Ingeniería"
                                  ? "border-blue-500 border-[2px]"
                                  : "border-orange-500 border-[2px]"
                              }`}
                                  >
                                    <img
                                      src={
                                        producto.Escuela === "Minería"
                                          ? img.icon.mineria
                                          : producto.Escuela === "Ingeniería"
                                          ? img.icon.ingenieria
                                          : img.icon.gestion
                                      }
                                      alt="Icono Colegio"
                                      className="w-8 h-8"
                                    />
                                  </div>
                                  <img
                                    src={
                                      storageUrl +
                                      ((Array.isArray(producto.RutaImagen)
                                        ? producto.RutaImagen.find(
                                            (ruta: string) =>
                                              ruta.includes("PortadaFinal")
                                          )
                                        : "") || "")
                                    }
                                    alt={producto.Curso}
                                    className="w-[250px]"
                                  />
                                </div>
                              </div>

                              {/* Contenido */}
                              <div className="flex-1 ">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    {producto.Curso}
                                  </h3>
                                </div>
                                <div className="py-[5px]">
                                  <hr className="bg-colors-sky-ccd h-[2px] w-full border-transparent mx-auto rounded" />
                                </div>
                                {producto.TipoModalidad === "En Vivo" && (
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex text-base items-center text-colors-cyan-ccd gap-2">
                                      Inicio:
                                      <span className="text-colors-cyan-ccd text-lg">
                                        {`${producto.FechaInicio} - ${producto.Horario}`}
                                      </span>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mt-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <FaUser className="text-base" />
                                    <span className="text-base">
                                      {producto.Seguidores}
                                    </span>
                                  </div>

                                  <span className="text-[#01C0D6]">|</span>
                                  {/* <span>{course.rating}</span> */}
                                  <div className="flex items-center gap-2">
                                    <AiFillLike className="text-base" />
                                    <span className="text-base">
                                      {Math.round(
                                        (Number(producto.Calificacion) * 100) /
                                          Number(producto.Seguidores)
                                      )}
                                      % ({producto.Calificacion})
                                    </span>
                                  </div>
                                </div>
                                <div className="pt-1">
                                  <span className="bg-gray-300 px-[6px] text-gray-600 rounded-[8px]">
                                    {producto.TipoModalidad}
                                  </span>
                                </div>
                              </div>

                              {/* Acciones */}
                              <div className="flex flex-col gap-2">
                                <Button
                                  onClick={() =>
                                    handleBoxToggle(producto.IdProducto)
                                  }
                                  className={`bg-white text-colors-sky-ccd ${
                                    selectedCourses.some(
                                      (item) =>
                                        item.IdProducto === producto.IdProducto
                                    )
                                      ? "border-green-500"
                                      : "border-gray-500"
                                  }`}
                                  color="primary">
                                  {selectedCourses.some(
                                    (item) =>
                                      item.IdProducto === producto.IdProducto
                                  ) ? (
                                    <FaCheck className="text-2xl" />
                                  ) : (
                                    <span className="flex font-bold gap-1">
                                      {producto.TipoCurso}{" "}
                                      <MdAddCircle className="text-xl text-colors-sky-ccd" />
                                    </span>
                                  )}
                                </Button>

                                {/* <button className="flex font-bold gap-1 w-min bg-[#01C0D6] text-black px-4 py-2 hover:bg-[#01A0B0] rounded-[8px]">
                                  Brochure <IoMdDownload className="text-xl" />
                                </button> */}
                                <Button
                                  className="bg-[#01C0D6] text-black hover:bg-[#01A0B0] flex font-bold gap-1"
                                  onClick={() =>
                                    window.open(storageUrl + producto.RutaImagen[1], "_blank")
                                  }
                                >
                                  Brochure <IoMdDownload className="text-xl" />
                                </Button>
                              </div>
                            </div>
                            {/*  ))} */}
                          </>
                        );
                      }
                    )}
                    {/* END Cursos */}
                  </div>

                  {/* Resumen de Selección */}
                  <div className="w-[30%] bg-[#131939] rounded-2xl p-6 h-fit sticky top-6">
                    <h3 className="text-lg text-white mb-4">
                      Mi Plan{" "}
                      <span className="text-colors-sky-ccd font-bold text-lg">
                        BÁSICO
                      </span>
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Selecciona los cursos que deseas agregar a tu plan.
                    </p>
                    <hr className="h-2 border-colors-sky-ccd" />
                    <ul className="mb-2">
                      {selectedCourses.length === 0 ? (
                        <p className="text-gray-400">
                          No has seleccionado ningún curso.
                        </p>
                      ) : (
                        selectedCourses.map((curso, index) => (
                          <React.Fragment key={curso.IdProducto}>
                            {index > 0 && (
                              <hr className="h-2 border-colors-sky-ccd my-1" />
                            )}
                            <li className="text-sm text-white flex items-center justify-between mb-5 relative">
                              <div className="flex flex-col">
                                <div className="pb-2">
                                  <span>{curso.Curso}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={storageUrl + curso.RutaImagen[0]}
                                    alt={curso.Escuela}
                                    className="w-[100px]"
                                  />
                                  <div className="flex flex-col">
                                    <div>
                                      <span>{curso.TipoCurso}</span>
                                      <span className="px-1 text-colors-cyan-ccd">
                                        |
                                      </span>
                                      <span className="text-colors-cyan-ccd">
                                        {curso.TipoModalidad}
                                      </span>
                                    </div>
                                    {curso.FechaInicio && curso.Horario && (
                                      <span className="text-xs text-gray-400">
                                        {`${curso.FechaInicio} - ${curso.Horario}`}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClickCapture={() =>
                                  handleBoxToggle(curso.IdProducto)
                                }
                                className="absolute bottom-0 right-0 mb-2 mr-2"
                              >
                                <FaTrashAlt className="text-gray-500 hover:text-white" />
                              </button>
                            </li>
                          </React.Fragment>
                        ))
                      )}
                    </ul>

                    <button
                      disabled={selectedCourses.length === 0}
                      onClick={() => handlePaymentMethodSelect("card")}
                      className={`w-full px-4 py-2 rounded-lg ${
                        selectedCourses.length > 0
                          ? "bg-colors-cyan-ccd font-bold rounded-xl text-colors-dark-blue-ccd hover:text-white hover:bg-colors-sky-ccd"
                          : "bg-gray-400 bg-opacity-20 rounded-xl text-white cursor-not-allowed"
                      }`}
                    >
                      Continuar compra
                    </button>
                  </div>
                </div>
              </>
            )}

            {currentStep === "form" && (
              <div className="flex justify-center gap-6 h-full">
                <div className="flex flex-col items-center max-lg:mt-[45rem] ">
                  <div className="w-full flex">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                    >
                      <ChevronLeft className="w-6 h-6" />
                      Regresar
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-6 ">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                      Información de pago
                    </h2>
                  </div>

                  <div
                    className="flex  justify-center bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl"
                  >
                    <div
                      key={animationKey}
                      className="flex flex-col justify-center items-center gap-4 p-4 !bg-transparent !rounded-none  !h-full"
                      data-aos="fade-up"
                    >
                      <div className="flex flex-col gap-4 p-6 justify-center   !bg-transparent !rounded-none !h-full">
                        <div className="container">
                          <div
                            id="myPaymentForm"
                            className="flex justify-center overflow-auto"
                          >
                            <div
                              className="kr-smart-form"
                              kr-card-form-expanded="true"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-[550px]">
                  <div className=" rounded-3xl p-6 backdrop-blur-sm">
                    <div
                      className="flex  max-sm:flex-col items-center gap-4 mb-6  bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
           to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] px-4 py-8 rounded-3xl "
                    >
                      <div className=" relative w-36 max-sm:w-full h-full  max-sm:pt-2 pt-10 overflow-hidden flex-shrink-0 ">
                        <img
                          src={environment.baseUrlStorage + modalidad}
                          alt="Course thumbnail"
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="">
                        <h1 className="flex gap-4 items-center">
                          <span className="text-xl"> {}</span>
                          <span className="text-colors-cyan-ccd text-2xl">
                            |
                          </span>
                          {modalidad == 1 ? (
                            <>
                              <span className="text-sm font-medium text-[#00EADE]">
                                Curso En Vivo
                              </span>{" "}
                              <RiBroadcastFill
                                size={20}
                                className="text-[#00EADE]"
                              />
                            </>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-[#00EADE]">
                                Curso Asincrónico
                              </span>{" "}
                              <BsCameraVideoFill
                                size={20}
                                className="text-[#00EADE]"
                              />
                            </>
                          )}
                        </h1>
                        <h3 className="text-xl  text-cyan-400 mb-2">{}</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            Dictado por varios docentes
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-colors-cyan-ccd">
                      <span className="text-lg">
                      { ` ${currentStep} === "confirmation"
                          ? "Total cobrado:"
                          : "Total:" `}
                      </span>
                      <span className="text-2xl font-bold">S/ {}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === "confirmation" && (
              <div>2</div>
              // <div className="text-center">
              //   <div className="flex items-center justify-center gap-2 mb-4">
              //     <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              //     <h1 className="text-2xl font-bold">Compra Exitosa</h1>
              //   </div>
              //   <p className="text-white/80 mb-8">
              //     Hemos enviado un correo de confirmación a{" "}
              //     <span className="text-cyan-400">{formData.email}</span>
              //   </p>
              //   <h2 className="text-2xl font-bold mb-8">
              //     ¡Ya puedes disfrutar del contenido de tu ruta!
              //   </h2>
              //   <div className="flex flex-col sm:flex-row justify-center gap-4">
              //     <Link
              //       href="/mis-cursos"
              //       className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
              //     >
              //       Ir a Mis Cursos
              //     </Link>
              //     <Link
              //       href="/rutas"
              //       className="inline-flex justify-center items-center px-8 py-3 rounded-full border-2 border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-colors"
              //     >
              //       Conocer mas rutas
              //     </Link>
              //   </div>
              // </div>
            )}
          </div>

          {/* Right Column - Course Summary */}
        </div>
      </div>
      <div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <p className="text-gray-800 mb-4">{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCartCourseSelectorProfesional;
