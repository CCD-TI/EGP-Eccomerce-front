"use client";
import { Badge, Button, Link } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { RiBroadcastFill } from "react-icons/ri";
import { BsCameraVideoFill, BsFillHandbagFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { MdAddCircle, MdKeyboardArrowDown } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowRight, FaCartShopping } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useCartProductoStore } from "@/context/cartProducto";
import { ChevronLeft } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AOS from "aos"; // Importa AOS
import KRGlue from "@lyracom/embedded-form-glue";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ModalContents from "@/components/ui/modal/ModalContens";
import { Switch } from "@nextui-org/react";
import SheetResponsive from "../sheetResponsive";

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

const ShoppingCartProfesional: React.FC<{
  precioplan: number;
  idplan: number;
}> = ({ precioplan, idplan }) => {
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
    FechaInicioSinFormato?: Date | null;
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
  const { data: session } = useSession();

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };
  const router = useRouter(); // Inicializas el hook useRouter

  // Switch
  const [isLive, setIsLive] = useState(true); // true => En Vivo, false => Asincrónico
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCursos, setFilteredCursos] = useState<CursoDetalle[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>(""); // 🔹 Estado para la escuela seleccionada
  const [sortOption, setSortOption] = useState<string>(""); // 🔹 Estado para la opción de ordenamiento

  // Estado para filtrar los cursos por modalidad
  const [modalidad, setModalidad] = useState<"En Vivo" | "Asincrónico">(
    "En Vivo"
  );

  const [escuela, setEscuela] = useState<"Ingeniería" | "Gestión" | "Minería">(
    "Minería"
  );

  const [idproducto, setidproducto] = useState("");

  // Filtrar cursos basados en la modalidad seleccionada
  const cursosFiltrados = cursosCompletos.filter(
    (curso) => curso.TipoModalidad === modalidad
  );

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.post("/inicio/getcursosav", {});

        // 🔹 Extraer correctamente la data de `json_build_object`
        const transformedData = response.data.data.map((item: any) => ({
          ...item.json_build_object, // Extrae los datos internos
          isSelected: false, // Inicializar isSelected como falso
        }));

        setcursosCompletos(transformedData);
        setFilteredCursos(transformedData); // 🔹 Asegura que los cursos se muestren correctamente al inicio
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setError("Error al cargar los datos del curso.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();

    // 🔹 Filtrar por modalidad
    let cursosFiltrados = cursosCompletos.filter(
      (curso) => curso.TipoModalidad === modalidad
    );

    // 🔹 Filtrar por escuela seleccionada (si hay una)
    if (selectedSchool !== "") {
      cursosFiltrados = cursosFiltrados.filter(
        (curso) => curso.Escuela === selectedSchool
      );
    }

    // 🔹 Aplicar búsqueda si hay texto ingresado
    if (term !== "") {
      cursosFiltrados = cursosFiltrados.filter((curso) =>
        curso.Curso.toLowerCase().includes(term)
      );
    }

    // 🔹 Ordenar según la opción seleccionada
    if (sortOption === "Fecha") {
      cursosFiltrados.sort((a, b) => {
        const fechaA = a.FechaInicioSinFormato
          ? new Date(a.FechaInicioSinFormato).getTime()
          : Infinity;
        const fechaB = b.FechaInicioSinFormato
          ? new Date(b.FechaInicioSinFormato).getTime()
          : Infinity;
        return fechaA - fechaB;
      });
    } else if (sortOption === "Duración") {
      cursosFiltrados.sort(
        (a, b) => Number(a.HorasAcademicas) - Number(b.HorasAcademicas)
      );
    } else if (sortOption === "Popularidad") {
      cursosFiltrados.sort((a, b) => {
        const popularidadA =
          (Number(a.Calificacion) * 100) / Number(a.Seguidores);
        const popularidadB =
          (Number(b.Calificacion) * 100) / Number(b.Seguidores);
        return popularidadA - popularidadB;
      });
    }

    setFilteredCursos(cursosFiltrados);
  }, [searchTerm, modalidad, selectedSchool, cursosCompletos, sortOption]);

  // REGRESAR AQUÍ

  // Desplegable
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Ordenar por");
  const [animationKey, setAnimationKey] = useState<number>(0);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const toggleDropdown = () => {
    setIsOpen2(!isOpen2);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setSortOption(option); // 🔹 Guarda la opción de ordenamiento
    setIsOpen2(false);
  };
  type PaymentStep = "method" | "form" | "confirmation";

  const [currentStep, setCurrentStep] = useState<PaymentStep>("method");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "qr">("card");

  const handlePaymentMethodSelect = (method: "card" | "qr") => {
    if (selectedCourses.length !== 4) {
      const htmlMessage = "El plan PROFESIONAL requiere seleccionar 4 cursos.";
      showModal(htmlMessage); // Pasamos el mensaje HTML directamente
      return;
    }
    setSelectedMethod(method);
    setCurrentStep("form");
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const [message, setMessage] = useState("");
  const [animationKey1, setAnimationKey1] = useState<number>(0);
  const [krInstance, setKrInstance] = useState<any>(null); // Estado para almacenar la instancia de KR

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = "https://api.micuentaweb.pe";
      const publicKey =environment.izipago;
      let formToken = "";

      try {
        if (precioplan > 0) {
          const res = await fetch(environment.baseUrl + "/pago/CreatePayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: precioplan * 100, currency: "PEN" }),
          });
          formToken = await res.text();
          const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

          await KR.setFormConfig({
            formToken,
            "kr-language": "es-ES",
          });

          await KR.removeForms();
          await KR.renderElements("#myPaymentForm");

          setKrInstance(KR);

          await KR.onSubmit(async (paymentData: KRPaymentResponse) => {
            try {
              const response = await fetch(
                environment.baseUrl + "/pago/validatePayment",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(paymentData),
                }
              );
              if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                  title: "Su compra fue realizada con éxito",
                  text: "Completar el siguiente formulario para poder brindarle sus accesos a la plataforma",
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Empezar a completar el formulario",
                  allowOutsideClick: false,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const listarTemario = await api.post(
                      "/inicio/comprarplannopremiumv2",
                      {
                        fdata: selectedCourses,
                        fusuario_id: session?.user.uid,
                        fprecioplan: precioplan,
                        fplan_id: idplan,
                      }
                    );
                    window.location.reload();
                  }
                });
                setMessage("Payment successful!");
              } else {
                setMessage("Payment failed!");
              }
            } catch (error) {
              console.error("Error processing payment:", error);
              setMessage("Payment failed due to an error!");
            }

            return false; // Debemos devolver un booleano explícitamente
          });
        }
      } catch (error) {
        setMessage(error + " (ver consola para más detalles)");
        console.error("Error en la configuración del formulario:", error);
      }
    }

    setupPaymentForm();

    return () => {
      if (krInstance) {
        krInstance.removeForms(); // Remueve el formulario cuando el componente se desmonte
      }
    };
  }, [precioplan, currentStep]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: false, // Permite que las animaciones se repitan
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
    });
  }, []);

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

  const handleBoxToggle = (courseId: number) => {
    // Buscar el curso por su ID
    const selectedCourse = cursosCompletos.find(
      (curso) => curso.IdProducto === courseId
    );

    if (!selectedCourse) {
      console.warn(`Curso con ID ${courseId} no encontrado.`);
      return;
    }

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
      // Contar los cursos seleccionados por tipo de modalidad
      const liveCoursesCount = selectedCourses.filter(
        (curso) => curso.TipoModalidad === "En Vivo"
      ).length;
      const asyncCoursesCount = selectedCourses.filter(
        (curso) => curso.TipoModalidad === "Asincrónico"
      ).length;

      // Validar si ya hay dos cursos de cada tipo seleccionados
      if (
        (selectedCourse.TipoModalidad === "En Vivo" && liveCoursesCount >= 2) ||
        (selectedCourse.TipoModalidad === "Asincrónico" &&
          asyncCoursesCount >= 2)
      ) {
        showModal(
          "Debe seleccionar exactamente dos cursos de cada modalidad 'Asincrónico' y 'En Vivo' ."
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

  const [brochure, setbrochure] = useState("");

  if (isLoading) return <div>Cargando cursos...</div>;

  return (
    <>
      <div
        className={`flex flex-col max-lg:flex-col overflow-y-auto h-full ${
          currentStep === "form" ? "" : "justify-between"
        }  bg-[#0A1128] bg-double-esferas2 text-white p-6 max-sm:pt-12 gap-6`}
      >
        {/* START Parte Superior */}

        <div className="">
          <div className="w-fit  relative flex  gap-10 justify-self-center items-center mt-4   ">
            {/* Dashed background */}
            <div className="flex gap-24 max-md:gap-6">
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
                          ? "75%" // Nuevo valor para un tercer paso
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
                      currentStep === "form" ? "text-cyan-400" : "text-white/50"
                    }`}
                  ></p>
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

                  <div className="w-full py-4 px-6 flex flex-col items-center justify-center gap-14">
                    {/* Sección de Opciones */}
                    <div className="grid grid-cols-3 max-xl:grid-cols-1 grid-rows-2 gap-14 group ">
                      <div className="mx-auto">
                        {/* Gestión */}
                        <button
                          onClick={() => setSelectedSchool("Gestión")}
                          className="group text-white py-2 px-4 rounded-xl w-[210px] group-hover:w-[300px] flex gap-4 items-center justify-center
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
                          <div className="flex  h-8 group-hover:w-32 items-center mx-auto justify-center bg-red-500 px-2 rounded-[8px] transition-all duration-700">
                            {/* Texto que aparece en hover */}
                            <div className="hidden w-4 group-hover:flex whitespace-nowrap text-center text-xl group-hover:opacity-100 transition-opacity duration-200">
                              Filtrar
                            </div>

                            {/* Flecha */}
                            <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[70px]" />
                          </div>
                        </button>
                      </div>
                      <div className="mx-auto">
                        {/* Ingeniería */}
                        <button
                          onClick={() => setSelectedSchool("Ingeniería")}
                          className="group text-white py-2 px-4 rounded-xl w-[210px] group-hover:w-[300px] flex gap-4 items-center justify-center
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
                          <div className="flex  h-8 w-fit group-hover:w-32 justify-center  items-center bg-[rgba(0,96,254,0.8)] px-2 rounded-[8px] transition-all duration-700">
                            {/* Texto que aparece en hover */}
                            <div className="hidden w-4 group-hover:flex whitespace-nowrap group-hover:opacity-100 text-xl transition-opacity duration-200">
                              Filtrar
                            </div>

                            {/* Flecha */}
                            <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[70px]" />
                          </div>
                        </button>
                      </div>
                      <div className=" mx-auto">
                        {/* Minería */}
                        <button
                          onClick={() => setSelectedSchool("Minería")}
                          className="group text-white py-2 px-4 rounded-xl w-[210px] group-hover:w-[300px] flex gap-4 items-center justify-center
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
                          <div className="flex  h-8 w-fit group-hover:w-32 justify-center items-center bg-[rgba(249,115,22,0.8)] px-2 rounded-[8px] transition-all duration-700">
                            {/* Texto que aparece en hover */}
                            <div className="hidden w-4 group-hover:flex whitespace-nowrap text-xl group-hover:opacity-100 transition-opacity duration-200">
                              Filtrar
                            </div>

                            {/* Flecha */}
                            <FaArrowRight className="w-6 text-white text-2xl z-50 flex justify-end right-10 transition-all duration-700 group-hover:translate-x-[70px]" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-10">
                  {/* Lista de Cursos */}
                  <div className="flex-1">
                    {/* START Filtros */}
                    <div className="flex justify-between max-md:flex-col mb-6 max-md:gap-4">
                      <div className="flex max-xl:flex-col gap-4">
                        {/* ... (tu código existente) */}

                        <div className="py-2">
                          <div className="flex items-center gap-4">
                            <Switch
                              isSelected={modalidad === "En Vivo"}
                              onValueChange={(selected) =>
                                setModalidad(
                                  selected ? "En Vivo" : "Asincrónico"
                                )
                              }
                              // isDisabled={
                              //   !cursosCompletos.some(
                              //     (p) =>
                              //       p.IdCurso === producto.IdCurso &&
                              //       p.TipoModalidad !== producto.TipoModalidad
                              //   )
                              // }
                              classNames={{
                                wrapper:
                                  "border-[#00EADE] border-1 bg-[#131939]",
                              }}
                            ></Switch>
                            {modalidad == "En Vivo" ? (
                              <>
                                <span className="text-sm font-medium">
                                  Curso En Vivo
                                </span>{" "}
                                <RiBroadcastFill
                                  size={20}
                                  className="text-[#00EADE]"
                                />
                              </>
                            ) : (
                              <>
                                <span className="text-sm font-medium">
                                  Curso Asincrónico
                                </span>{" "}
                                <BsCameraVideoFill
                                  size={20}
                                  className="text-[#00EADE]"
                                />
                              </>
                            )}
                          </div>
                        </div>

                        {/* ... (tu código existente) */}

                        <div className="w-fit sticky top-0 z-50 py-2">
                          {/* Botón desplegable */}
                          <button
                            onClick={toggleDropdown}
                            className="flex justify-between items-center w-full px-4 py-2 bg-colors-dark-blue-ccd rounded-[6px] text-white focus:outline-none"
                          >
                            <span>{selectedOption}</span>
                            <MdKeyboardArrowDown
                              className={`text-2xl text-colors-cyan-ccd transition-transform duration-300 ${
                                isOpen2 ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Opciones del desplegable */}
                          {isOpen2 && (
                            <ul className="absolute z-50 mt-2 w-max rounded-[8px] shadow-lg text-white bg-[#131939]">
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
                    {filteredCursos.map(
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
                            <div
                              key={index}
                              className="flex max-sm2:flex-col items-center gap-4 pl-5 py-4 px-6 mb-4 rounded-xl bg-[#131939] hover:bg-[#1B2551] transition "
                            >
                              {/* Icono en la esquina superior izquierda */}
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-14 h-14 p-1 -mr-8 z-10 max-[400px]:hidden
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
                                    <div className="flex flex-col text-base  items-center text-colors-cyan-ccd">
                                      <h1 className="text-left w-full">
                                        {" "}
                                        Inicio:
                                      </h1>
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
                              <div className="flex flex-col max-sm2:flex-row gap-2">
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
                                  color="primary"
                                >
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

                                {/* <Button
                                  className="bg-[#01C0D6] text-black hover:bg-[#01A0B0] flex font-bold gap-1"
                                  onClick={() =>
                                    window.open(storageUrl + producto.RutaImagen[1], "_blank")
                                  }
                                >
                                  Brochure <IoMdDownload className="text-xl" />
                                </Button> */}
                                <ModalContents
                                  css={
                                    "bg-[#01C0D6] text-black hover:bg-[#01A0B0] flex font-bold gap-1"
                                  }
                                  titleHeader={""}
                                  btnicon={<IoMdDownload className="text-xl" />}
                                  btntitle={"Brochure"}
                                  btn={""}
                                  contents={undefined}
                                  RutaArchivo={`${
                                    storageUrl + producto.RutaImagen[1]
                                  }`}
                                />
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
                  <div className="w-[30%] bg-[#131939] rounded-2xl p-6 h-fit sticky top-6 max-xl:hidden">
                    <h3 className="text-lg text-white mb-2">
                      Mi Plan{" "}
                      <span className="text-colors-violet-ccd2 font-bold text-lg">
                        PROFESIONAL
                      </span>
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Selecciona los cursos que deseas agregar a tu plan.
                    </p>
                    <hr className="h-2 border-colors-sky-ccd" />
                    <ul className="mb-6">
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
                      onClick={() => {
                        handlePaymentMethodSelect("card");
                        console.log("chavo" + JSON.stringify(selectedCourses));
                      }}
                      className={`w-full px-4 py-2 rounded-lg ${
                        selectedCourses.length > 0
                          ? "bg-colors-cyan-ccd font-bold rounded-xl text-colors-dark-blue-ccd hover:text-white hover:bg-colors-sky-ccd"
                          : "bg-gray-400 bg-opacity-20 rounded-xl text-white cursor-not-allowed"
                      }`}
                    >
                      Continuar compra
                    </button>
                  </div>

                

                    <SheetResponsive
                      btn={
                        <div className="hidden max-xl:flex fixed right-16 bottom-14 max-sm:right-8">
                        <Badge
                          color="danger"
                          className="border-red-600"
                          content={selectedCourses.length}
                        >
                          <button
                            className=" p-4 bg-colors-sky-ccd rounded-2xl"
                            onClick={handleOpen}
                          >
                            <FaCartShopping className="text-2xl" />
                          </button>
                        </Badge>
                      </div>
                      }
                      content={ <div className="w-full bg-[#131939] rounded-2xl p-6 h-fit sticky top-6 ">
                        <h3 className="text-lg text-white mb-2">
                          Mi Plan{" "}
                          <span className="text-colors-violet-ccd2 font-bold text-lg">
                            PROFESIONAL
                          </span>
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          Selecciona los cursos que deseas agregar a tu plan.
                        </p>
                        <hr className="h-2 border-colors-sky-ccd" />
                        <ul className="mb-6">
                          {selectedCourses.length === 0 ? (
                            <p className="text-gray-400">
                              No has seleccionado ningún curso.
                            </p>
                          ) : (
                            selectedCourses.map((curso, index) => (
                              <React.Fragment key={curso.IdProducto}>
                                {index > 0 && (
                                  <hr className="h-2 border-colors-sky-ccd my-2" />
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
                                    className="absolute top-9 right-0 mb-2 mr-2"
                                  >
                                    <FaTrashAlt className="text-gray-500 hover:text-white text-xl" />
                                  </button>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
  
                        <button
                          disabled={selectedCourses.length === 0}
                          onClick={() => {
                            handlePaymentMethodSelect("card");
                            console.log(
                              "chavo" + JSON.stringify(selectedCourses)
                            );
                          }}
                          className={`w-full px-4 py-2 rounded-lg ${
                            selectedCourses.length > 0
                              ? "bg-colors-cyan-ccd font-bold rounded-xl text-colors-dark-blue-ccd hover:text-white hover:bg-colors-sky-ccd"
                              : "bg-gray-400 bg-opacity-20 rounded-xl text-white cursor-not-allowed"
                          }`}
                        >
                          Continuar compra
                        </button>
                      </div>}
                    
                    
                    />
                </div>
              </>
            )}

            {currentStep === "form" && (
              <div className="flex flex-row-reverse items-center justify-center gap-16 h-full  max-lg:flex-col ">
                <div className="flex flex-col ">
                  <div
                    className="flex  justify-center bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.22)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl flex-col p-8 py-6 mt-14"
                  >
                    <div className="flex flex-row-reverse justify-between items-center mb-3 w-full ">
                      <h2 className="text-xl md:text-2xl font-bold text-center ">
                        Información de pago
                      </h2>
                      <BsFillHandbagFill className="text-3xl" />
                    </div>
                    <hr className=" border-2 border-colors-sky-ccd" />
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
                <div>
                  <div className="w-full ">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                    >
                      <ChevronLeft className="w-6 h-6" />
                      Regresar
                    </button>
                  </div>
                  <div
                    className="lg:w-[550px]  p-8 bg-gradient-to-br from-[rgba(0,97,254,0.2)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
                          to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl"
                  >
                    <div className="flex justify-between items-center w-full mb-2">
                      <h1 className="text-xl">
                        Mi Plan{" "}
                        <span className="text-colors-violet-ccd2 text-xl font-bold">
                          PROFESIONAL
                        </span>
                      </h1>
                      <FaCartShopping className="text-3xl text-white" />
                    </div>
                    <hr className="w-full border-2 border-colors-sky-ccd rounded-full" />
                    <div className=" rounded-3xl p-6 w-full flex flex-col justify-start  items-start">
                      {selectedCourses.map((curso, index) => (
                        <>
                          <hr className="w-full border border-white/20 rounded-full" />
                          <div
                            key={curso.IdProducto}
                            className="flex  max-sm:flex-col items-center gap-4 mb-2   px-4 py-2 rounded-3xl "
                          >
                            {index > 0 && (
                              <hr className="h-2 border-colors-sky-ccd my-4" />
                            )}
                            <div className="text-sm text-white flex items-center justify-between mb-5 relative">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 w-full">
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
                                      <span className="font-bold">
                                        {curso.TipoModalidad}
                                      </span>
                                    </div>
                                    <div className="pb-2 text-colors-cyan-ccd font-semibold ">
                                      <span className="text-lg">
                                        {curso.Curso}
                                      </span>
                                    </div>
                                    {curso.FechaInicio && curso.Horario && (
                                      <span className="text-sm text-gray-400">
                                        Inicio:{" "}
                                        {`${curso.FechaInicio} - ${curso.Horario}`}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                      <hr className="w-full border-2 border-colors-sky-ccd rounded-full" />
                      <div className="flex w-full justify-between items-center pt-4 ">
                        <span className="text-lg">Total: </span>
                        <span className="text-2xl font-bold ">
                          S/ {precioplan}
                        </span>
                      </div>
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
            <div className="bg-white p-6 rounded-3xl shadow-lg max-w-sm w-full text-center">
              <p className="text-gray-800 mb-4">{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
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

export default ShoppingCartProfesional;
