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
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";
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

const ShoppingCartPremiun: React.FC<{
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

  const [currentStep, setCurrentStep] = useState<PaymentStep>("form");
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
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [animationKey1, setAnimationKey1] = useState<number>(0);
  const [krInstance, setKrInstance] = useState<any>(null); // Estado para almacenar la instancia de KR

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = "https://api.micuentaweb.pe";
      const publicKey = environment.izipago;
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
                      "/inicio/comprarplanpremiumv2",
                      {
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
      // Validar si ya hay un curso de la misma modalidad seleccionado
      const hasAsynchronous = selectedCourses.some(
        (curso) => curso.TipoModalidad === "Asincrónico"
      );
      const hasLive = selectedCourses.some(
        (curso) => curso.TipoModalidad === "En Vivo"
      );

      if (
        (selectedCourse.TipoModalidad === "Asincrónico" && hasAsynchronous) ||
        (selectedCourse.TipoModalidad === "En Vivo" && hasLive)
      ) {
        showModal(
          `Solo se permite añadir un curso con la modalidad "${selectedCourse.TipoModalidad}".`
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
      <div
        className={`flex flex-col max-lg:flex-col  h-full ${
          currentStep === "form" ? "" : "justify-between"
        }  bg-[#0A1128] bg-double-esferas2 text-white p-6 gap-6 overflow-y-auto`}
      >
        {/* START Parte Superior */}
        <div className="hidden max-lg:block">
          <div className="w-fit  relative flex  gap-10 justify-self-center items-center mb-12   ">
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
                        currentStep === "form"
                          ? "0%"
                          : currentStep === "confirmation"
                          ? "50%"
                          : "100%",
                    }}
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full [mask-image:linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0);] [mask-size:9px_2px] [mask-repeat:repeat]"></div>
              </div>

              {/* Step 1 */}
              {/* <div className="relative z-10 flex flex-col items-center">
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
              </div> */}

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
                  1
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`font-medium ${
                      currentStep === "form" ? "text-cyan-400" : "text-white/50"
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
                currentStep === ("confirmation" as PaymentStep)
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-white text-slate-600"
              }`}
                >
                  2
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`font-medium ${
                      currentStep === ("confirmation" as PaymentStep)
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
            {currentStep === "form" && (
              <div className="flex max-lg:flex-col justify-center gap-6 ">
                <div className="flex flex-col items-center">
                  <div className="w-full flex">
                    {/* <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                    >
                      <ChevronLeft className="w-6 h-6" />
                      Regresar
                    </button> */}
                  </div>
                  <div className="flex justify-between items-center mb-6 ">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                      Información de pago
                    </h2>
                  </div>

                  <div
                    key={animationKey}
                    className="flex flex-col justify-center items-center gap-4 p-4 !bg-transparent   !h-full bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl "
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

                <div className="lg:w-[550px]">
                  <div className="w-fit  relative flex  gap-10 justify-self-center items-center mb-12  max-lg:hidden ">
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
                                currentStep === "form"
                                  ? "0%"
                                  : currentStep === "confirmation"
                                  ? "50%"
                                  : "100%",
                            }}
                          />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full [mask-image:linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0);] [mask-size:9px_2px] [mask-repeat:repeat]"></div>
                      </div>

                      {/* Step 1 */}
                      {/* <div className="relative z-10 flex flex-col items-center">
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
              </div> */}

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
                          1
                        </div>
                        <div className="mt-2 text-center">
                          <p
                            className={`font-medium ${
                              currentStep === "form"
                                ? "text-cyan-400"
                                : "text-white/50"
                            }`}
                          >
                            Información de pagos
                          </p>
                        </div>
                      </div>
                      {/* Step 3 */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
              ${
                currentStep === ("confirmation" as PaymentStep)
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-white text-slate-600"
              }`}
                        >
                          2
                        </div>
                        <div className="mt-2 text-center">
                          <p
                            className={`font-medium ${
                              currentStep === ("confirmation" as PaymentStep)
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
                  <div className=" rounded-3xl p-6 backdrop-blur-sm">
                    <div
                      className="w-full  bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                    >
                      {/* Decorative elements */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00E5BE]/10 to-transparent opacity-50" />
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00E5BE]/10 rounded-full blur-3xl" />
                      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00E5BE]/5 rounded-full blur-3xl" />

                      <div className="relative flex gap-10 items-center justify-center">
                        {/* Logo section */}
                        <div className="flex flex-col items-center gap-6 mb-8">
                          <div>
                            <h2 className="text-[#00E5BE] text-2xl font-semibold mb-2">
                              Beneficios
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-[#00E5BE] to-transparent rounded-full" />
                          </div>
                          <div className="relative w-24 h-24">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5BE] to-[#0A0B1A] rounded-full opacity-50 blur-md" />
                            <img
                              src="/Multimedia/Imagen/planpremiun.webp"
                              alt="Plan Premium"
                              className="relative w-full h-full object-cover rounded-full"
                            />
                          </div>
                        </div>

                        {/* Benefits list */}
                        <ul className="space-y-6">
                          {[
                            "1 Año de acceso total",
                            "Mas de 40 cursos",
                            "Certificados ilimitados",
                          ].map((benefit, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-3 text-white/90 group"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#00E5BE] to-[#00E5BE]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg
                                  className="w-4 h-4 text-[#0A0B1A]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                              <span className="text-lg font-medium group-hover:text-[#00E5BE] transition-colors">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Action button */}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between max-sm:justify-around items-center pt-4 border-t border-colors-cyan-ccd">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold">S/ 1499</span>
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

export default ShoppingCartPremiun;
