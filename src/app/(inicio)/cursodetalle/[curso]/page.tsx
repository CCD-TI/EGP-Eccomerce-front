"use client";
import CompraRapida from "@/components/ui/paul/compraRapida/payment-flow";

import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { FaCheckCircle, FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";
import {
  FaCheck,
} from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useCourseStore } from "@/context/cursodetalle";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { RiBroadcastFill } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiFillLike, AiOutlinePlus } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import CourseBenefits from "@/components/ui/paul/cursos/coursebenefits";
import CourseReviews from "@/components/ui/paul/cursos/coursereviews";
import PacksSection from "@/components/ui/paul/packsection";
import { useCartProductoStore } from "@/context/cartProducto";
import { Switch } from "@nextui-org/react";
import CarruselCurso from "@/components/ui/paul/carrusel-Curso";
import { IoIosArrowBack } from "react-icons/io";
import { ChevronLeft } from "lucide-react";
import PagarAhoraSesionComponent from "@/components/ui/bruno/pagarahorasesion";
import { IoTimeSharp } from "react-icons/io5";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
const img = {
  fondos: {
    mineria1: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria.png`,
    mineria2: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria2.png`,
    mineria3: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/carousel-mineria3.png`,
  },
  logos: {
    ccd: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/ccd-logo-white.svg`,
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
    rutas: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-rutas-white.svg`,
  },
};

interface Props {
  params: {
    curso: string;
  };
}

type Producto = {
  TipoModalidad: string;
  IdProducto: number;
  Precio: number;
  PrecioAnterior: number;
  FechaInicio: string;
  Horario: string;
};

type CursoDetalle = {
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
  NumeroWhatsapp: string;
  Escuela: string;
  Especializacion: string;
  IdCurso: number;
  Curso: string;
  TipoCurso: string;
  RutaImagen: string;
  RutaBrochure: string;
  CantidadModulos: number;
};

export default function Page({ params }: Props) {
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const { data: session } = useSession();
  const router = useRouter(); // Inicializas el hook useRouter

  const animals = [
    { key: "19 de agosto", label: "19 de agosto" },
    { key: "23 de agosto", label: "23 de agosto" },
    { key: "28 de agosto", label: "28 de agosto" },
    { key: "30 de agosto", label: "30 de agosto" },
  ];
  const [btnSeleccionadoModalidad, setbtnSeleccionadoModalidad] = useState("");
  const [IdProdSeleccionado, setIdProdSeleccionado] = useState("");
  const [listarEditarCursoGeneral, setlistarEditarCursoGeneral] = useState([]);
  const [listarProductoBeneficio, setlistarProductoBeneficio] = useState([]);
  const [listarCursoAdjuntos, setlistarCursoAdjuntos] = useState([]);
  const [isStopped, setIsStopped] = useState(false);
  const [selected, setSelected] = useState("photos");
  const [idprod, setidprod] = useState("");
  const [dataSelectTipoDocumento, setdataSelectTipoDocumento] = React.useState(
    []
  );
  const [dataSelectFecha, setdataSelectFecha] = React.useState([]);
  const [datomodulo, setdatomodulo] = useState([]);
  const [productos, setProductos] = useState<any>([]);
  const [datoprofesores, setdatoprofesores] = useState([]);
  const [modo, setmodo] = useState("");
  const [datofecha, setdatofecha] = useState([]);
  const [precioprod, setprecioprod] = useState("");
  const [lstClasificacion, setlstClasificacion] = useState("");
  const [lstModelo, setlstModelo] = useState("");
  const [lstRutaImagenPortada, setlstRutaImagenPortada] = useState("");
  const [lstRutaImagenBrochure, setlstRutaImagenBrochure] = useState("");
  const [lstRutaImagenVideo, setlstRutaImagenVideo] = useState("");

  const [preciosolo, setpreciosolo] = useState(0);

  const searchParams = useSearchParams();
  const idCurso = searchParams.get("pid"); // Obtiene el valor del parámetro "idcurso"
  const [courseData, setCourseData] = useState<CursoDetalle | null>(null);
  const [producto, setProducto] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cursosCompletos, setcursosCompletos] = React.useState<CursoDetalle[]>([]);

  const [modalidadIndex, setModalidadIndex] = useState(0);
  const [preciocarrito, setpreciocarrito] = useState(0);
  const [precioanteriorcarrito, setprecioanteriorcarrito] = useState(0);

  console.log("IDCURSO: ", idCurso);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (typeof idCurso !== "string") {
        setError("El idcurso no es válido.");
        return;
      }

      try {
        const response = await api.post("/inicio/getcursodetalle", {
          IdCurso: idCurso,
        });
        setcursosCompletos(response.data.data);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setError("Error al cargar los datos del curso.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [idCurso]);

  const [isincartt, setisincartt] = useState("");

  const [selects, setSelects] = useState({
    tipoProducto: 1,
    fecha: null,
  });
  const { Clasificacion, IdModelo } = useCourseStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const elementoRef = useRef(null);
  const footerRef = useRef(null);

  type Key = string | number;

  const addProductToCart = useCartProductoStore(
    (state) => state.addProductTocart
  );
  const removeProductFromCart = useCartProductoStore(
    (state) => state.removeProduct
  );
  const cart = useCartProductoStore((state) => state.cart);

  const handleCartToggle = (array: any) => {
    const TipoModalidad = isSelected ? "1" : "2";
    const isInCart = cart.some((item) => item.IdProducto === idproducto); // Calcular dentro de la función
    const nuevoarray = {
      ...array,
      Precio: preciocarrito.toFixed(2),
      PrecioAnterior: precioanteriorcarrito.toFixed(2),
      TipoModalidad: TipoModalidad,
      IdProducto: idproducto,
      RutaImagen: imagen,
      FechaInicio: fechaInicio,
    };

    if (isInCart) {
      removeProductFromCart(nuevoarray);
    } else {
      addProductToCart(nuevoarray);
    }
  };

  // Guardar la página anterior en localStorage
  const handleBack = () => {
    // Si hay historial, retrocede a la página anterior
    if (window.history.length > 2) {
      router.back();

      // Esperar un poco para que la página se cargue y luego hacer scroll al medio
      setTimeout(() => {
        // Calcular la posición para el centro de la pantalla
        const middlePosition = window.innerHeight * 1.5;
        window.scrollTo(0, middlePosition); // Hacer scroll al medio
      }, 50); // Espera un tiempo corto (50ms) para asegurar que la página recargue
    } else {
      // Si no hay historial, redirige a la página principal o la que prefieras
      router.push("/");
      window.scrollTo(0, 0); // Asegurarse de que cuando rediriges, el scroll sea al inicio
    }
  };

  const [modalidad, setmodalidad] = React.useState("");

  const [isSelected, setIsSelected] = React.useState(true);
  const [idproducto, setidproducto] = useState("");
  const [imagen, setimagen] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [brochure, setbrochure] = useState("");
  const [tipocurso, settipocurso] = useState("");
  const [curso, setcurso] = useState("");

  useEffect(() => {
    console.log("Cursos recibidos1:", cursosCompletos);

    if (cursosCompletos.length > 0) {
      settipocurso((cursosCompletos as any)[0].TipoCurso);
      setcurso((cursosCompletos as any)[0].Curso);

      // Ordenar los productos
      const productosOrdenados = (
        cursosCompletos as any
      )[0].Productos.slice().sort((a: any, b: any) => {
        if (a.TipoModalidad === "En Vivo" && b.TipoModalidad === "Asincrónico")
          return -1;
        if (a.TipoModalidad === "Asincrónico" && b.TipoModalidad === "En Vivo")
          return 1;
        return 0;
      });

      // Buscar el primer producto (En Vivo o Asincrónico)
      const productoInicial =
        productosOrdenados.find((p: any) => p.TipoModalidad === "En Vivo") ||
        productosOrdenados.find((p: any) => p.TipoModalidad === "Asincrónico");

      if (productoInicial) {
        setmodalidad(productoInicial.TipoModalidad);
        setpreciocarrito(productoInicial.Precio);
        setprecioanteriorcarrito(productoInicial.PrecioAnterior);
        setidproducto(productoInicial.IdProducto);

        // Asignar la fecha de inicio
        setFechaInicio(productoInicial.FechaInicio);

        const rutas = (cursosCompletos as any)[0].RutaImagen; // Tu array de rutas
        const rutaPortadaFinal = rutas.find((ruta: string) =>
          ruta.includes("PortadaFinal")
        );
        const BrochureCursos = rutas.find((ruta: string) =>
          ruta.includes("BrochureCursos")
        );
        setbrochure(BrochureCursos);
        setimagen(rutaPortadaFinal);
        if (productoInicial.TipoModalidad === "En Vivo") {
          setIsSelected(true);
        } else if (productoInicial.TipoModalidad === "Asincrónico") {
          setIsSelected(false);
        }
      }
    }
  }, [cursosCompletos]);

  const [sizeRes, setSizeRes] = useState<
    "md" | "full" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  >("md"); // Tipo explícito
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setSizeRes("full"); // Cambiar a "full" en pantallas pequeñas
      } else {
        setSizeRes("md"); // Usar "md" en pantallas grandes
      }
    };

    // Ejecutar la función al montar el componente y al redimensionar
    handleResize();
    window.addEventListener("resize", handleResize);

    // Limpieza del evento al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* <h1>{idCurso}</h1> */}

      {/* Contenedor Izquierdo */}
      {cursosCompletos.map((producto: CursoDetalle, index: number) => {
        // {cursosCompletos.map((curso: CursoDetalle, index: number) => {

        return (
          <>
            <div className="flex justify-center items-center h-full  relative w-full overflow-hidden  bg-double-esferas2 bg-[#0a0f25] ">
              <div className="max-w-[100rem]  w-[75%] max-2xl:w-[85%] max-[1560px]:w-[75%]  max-[1360px]:w-[90%] max h-fit rounded-2xl text-white p-6  flex flex-col lg:flex-row z-40 py-20  ">
                <div className="w-[40%] max-xl:w-[50%] max-lg:w-full mb-auto xxl::my-auto z-10  ">
                  <button
                    onClick={handleBack}
                    className={`btn-back z-50 
                     
                     p-3 rounded-2xl mb-2 flex items-center`}
                  >
                    <IoIosArrowBack className="text-2xl" />
                    Regresar
                  </button>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <div
                      className={`bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-20 h-20 rounded-full 
            outline outline-2 ${
              producto.Escuela === "Minería"
                ? "outline-orange-500"
                : producto.Escuela === "Ingeniería"
                ? "outline-blue-500"
                : "outline-red-500"
            }`}
                    >
                      <img
                        src={`
              ${
                producto.Escuela === "Minería"
                  ? img.logos.mineria
                  : producto.Escuela === "Ingeniería"
                  ? img.logos.ingenieria
                  : img.logos.gestion
              }
                   
                  `}
                        className={`text-white w-14 ${
                          producto.Escuela === "Minería"
                            ? ""
                            : producto.Escuela === "Ingeniería"
                            ? ""
                            : "-translate-y-[2.5px]"
                        }`}
                      />{" "}
                      {/* Tamaño del ícono ajustado */}
                    </div>
                    <div className="flex flex-col text-white px-2 py-1 rounded-md">
                      <span className="text-3xl italic -mb-[1px] tracking-wider">
                        ESCUELA DE
                      </span>
                      <span
                        className={`text-3xl font-bold
                  ${
                    producto.Escuela === "Minería"
                      ? "text-orange-500"
                      : producto.Escuela === "Ingeniería"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                      >
                        {/* {producto.Escuela.toUpperCase()} */}
                        {(producto.Escuela || "").toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="py-2">
                    <h3 className="bg-colors-sky-ccd rounded-xl text-lg p-1 px-7 w-fit shadow-[0_0_15px_3px_rgba(49,133,247,0.5)]">
                      {producto.TipoCurso} de Alta Especializacion
                    </h3>
                  </div>
                  <div className="py-2 text-3xl font-bold">
                    {/* <h2 className="text-4xl font">{courseName}</h2> */}
                    {/* <Link
                href={`/${encodeURIComponent(
                  producto.curso.toLowerCase().replace(/\s+/g, "-")
                )}`}
                className="text-4xl font"
              > */}
                    {producto.Curso}
                    {/* </Link> */}
                  </div>
                  <div className="py-2">
                    <hr className="bg-colors-sky-ccd h-[2.5px] rounded-full border-transparent" />
                  </div>
                  <div className="py-2">
                    <h4>Selecciona tu modalidad:</h4>
                  </div>

                  {/* ... (tu código existente) */}

                  <div className="py-2">
                    <div className="flex items-center gap-4">
                      <Switch
                        isSelected={isSelected}
                        onValueChange={(selected) => {
                          setIsSelected(selected);
                          const nuevaModalidad = selected
                            ? "En Vivo"
                            : "Asincrónico";
                          console.log(
                            "Modalidad seleccionada:",
                            nuevaModalidad
                          ); // Depuración
                          setmodalidad(nuevaModalidad);

                          // Buscar el producto correspondiente a la modalidad seleccionada
                          const productoCorrespondiente = (
                            cursosCompletos as any
                          )[0].Productos.find(
                            (p: any) => p.TipoModalidad === nuevaModalidad
                          );

                          if (productoCorrespondiente) {
                            setpreciocarrito(productoCorrespondiente.Precio);
                            setprecioanteriorcarrito(productoCorrespondiente.PrecioAnterior);
                            setidproducto(productoCorrespondiente.IdProducto);
                            setFechaInicio(productoCorrespondiente.FechaInicio);
                          }
                        }}
                        isDisabled={
                          (producto as any).Productos.length >= 2 ? false : true
                        }
                        classNames={{
                          wrapper: "border-[#00EADE] border-1 bg-[#131939]",
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

                  {/* Fecha e Integrantes */}

                  {modalidad === "En Vivo" &&
                    producto.Productos[modalidadIndex].FechaInicio && (
                      <p className="text-xl mb-4">
                        Inicio:{" "}
                        <span className="text-xl font-bold">
                          {producto.Productos[modalidadIndex].FechaInicio}
                        </span>
                      </p>
                    )}
                  <div className="w-fit max-lg:mx-auto">
                    <div className="flex max-sm:flex-col max-sm:mx-auto max-sm:w-[70%] max-lg:w-fit  px-3 py-4 rounded-xl w-full justify-center items-center gap-6 border-2 border-colors-sky-ccd">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-xl" />
                        <span className="text-lg block">
                          {producto.Seguidores} Integrantes
                        </span>
                      </div>
                      <span className="w-[1.5px] h-9 max-sm:w-full max-sm:h-1 bg-colors-cyan-ccd"></span>
                      <div className="flex items-center gap-2">
                        <AiFillLike className="text-xl" />
                        <span className="text-lg">
                          {Math.round(
                            (Number(producto.Calificacion) * 100) /
                              Number(producto.Seguidores)
                          )}
                          % ({producto.Calificacion})
                        </span>
                      </div>
                      <span className="w-[1.5px] h-9  max-sm:w-full max-sm:h-1 bg-colors-cyan-ccd"></span>
                      <div className="flex items-center gap-2">
                        <IoTimeSharp className="text-xl" />
                        <span className="text-lg leading-none">
                          {producto.HorasAcademicas} horas <br />{" "}
                          <span className="text-sm leading-none">
                            academicas
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Precio */}
                    <div className="flex gap-20 items-center justify-between   ">
                      <div className="flex flex-col  items-start ">
                        {session?.user ? (
                          <>
                            <div className="  ">
                              <Button
                                onPress={() => {
                                  onOpen();
                                  setpreciosolo(preciocarrito);
                                }}
                                className="bg-transparent !p-0 text-white"
                              >
                                <h4>Comprar Ahora</h4>
                                
                              </Button>
                            </div>
                            <div className="flex gap-2 items-center">
                            {producto.Productos?.length > 0 ? (
                          <>
                            <Button
                              onPress={() => {
                                onOpen();
                                setpreciosolo(preciocarrito);
                              }}
                              className="text-3xl bg-colors-cyan-ccd rounded-xl p-3 font-bold text-colors-dark-blue-ccd"
                            >
                              S/.{preciocarrito}
                            </Button>
                            <div className="text-lg line-through text-white decoration-colors-cyan-ccd">
                              S/. {Math.round(precioanteriorcarrito)}
                            </div>
                          </>
                        ) : (
                          <p>En proceso</p>
                        )}
                            </div>
                          </>
                        ) : (
                          <PagarAhoraSesionComponent
                            array={{}}
                            precio={preciocarrito}
                            productocurso={producto.Productos}
                            precioanterior={precioanteriorcarrito}
                          />
                        )}
                      </div>
                      <div className="flex flex-col pt-3 justify-center items-center">
                        <button>
                          <h4 className="text-[10px] pb-2">
                            Agregar al carrito
                          </h4>
                          <Button
                            onClick={() => {
                              handleCartToggle(producto);
                              console.log(JSON.stringify(producto));
                            }} // Alternar el estado
                            className="bg-[#00EADE] text-[#162E54] p-6 "
                            color="primary"
                          >
                            {cart.some(
                              (item) => item.IdProducto === idproducto
                            ) ? ( // Calcular isInCart directamente aquí
                              <FaCheck className="text-3xl" />
                            ) : (
                              <FaShoppingCart className="size-36" />
                            )}
                          </Button>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Contenedor Derecho */}
                </div>
                <div className="w-[60%] max-xl:w-[50%] max-lg:w-full mt-6 lg:mt-0 ml-auto  flex flex-col justify-center items-center max-xl:items-end max-lg:items-center z-10">
                  <div className="w-[65%] max-xl2:w-[80%]  max-xl:w-[90%] max-sm:w-full  max-xl:ml-0 2xl:mx-auto  mt-auto  max-lg:ml-0 flex flex-col gap-4 z-10 ml-auto">
                    <img
                      src={storageUrl + imagen}
                      alt="Course Image"
                      className="w-full h-fit rounded-2xl  "
                    />
                    {/* Botones */}
                    <div className="flex justify-between gap-4 max-sm:flex-col  ">
                      <button
                        className="py-4 px-6  max-sm:text-xl w-[50%] max-sm:w-full max-xl:text-xl max-xl:px-2 rounded-[6px] bg-[#00D3C5]  hover:bg-white text-colors-dark-blue-ccd shadow-lg transition-all text-xl"
                        onClick={() =>
                          window.open(storageUrl + brochure, "_blank")
                        }
                      >
                        Descargar Brochure
                      </button>
                      <button
                        className="text-xl max-sm:text-xl w-[50%] max-sm:w-full  max-xl:text-xl max-xl:px-2 py-4 px-6 bg-green-500 rounded-[6px] text-white flex hover:text-green-500 items-center  justify-center gap-2 shadow-lg hover:bg-gray-200 transition-all"
                        onClick={() =>
                          window.open(`${producto.NumeroWhatsapp}}`, "_blank")
                        }
                      >
                        <FaWhatsapp className="text-2xl" /> Más Información
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CourseBenefits />
            <CourseReviews />
            <CarruselCurso
              escuela={producto.Escuela}
              especializacion={producto.Especializacion}
            />
            <PacksSection bg="bg-sectors-PromoForm2" />
            <>
              <Modal
                size={sizeRes}
                backdrop="opaque"
                classNames={{
                  backdrop:
                    "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20  ",
                  closeButton: "bg-white",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="h-full mt-10 overflow-y-auto"
                isDismissable={false}
                isKeyboardDismissDisabled={true}
              >
                <ModalContent
                  className="!bg-colors-night-blue-ccd2 bg-double-esferas2"
                  style={
                    sizeRes === "full"
                      ? {}
                      : {
                          width: "90%", // Ajusta el ancho del modal
                          maxWidth: "100%", // Tamaño máximo opcional
                          height: "80vh", // Ajusta la altura del modal
                          maxHeight: "90vh", // Tamaño máximo opcional
                        }
                  }
                >
                  {(onClose) => (
                    <>
                      {/* <ModalHeader>
                        {" "}
                        <button
                          onClick={onclose}
                          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                        >
                          <ChevronLeft className="w-6 h-6" />
                          Regresar
                        </button>
                      </ModalHeader> */}
                      <ModalBody>
                        <CompraRapida
                          precio={preciosolo}
                          modalidad={modalidad}
                          imagen={imagen}
                          tipocurso={tipocurso}
                          curso={curso}
                          idproducto={idproducto}
                        />
                      </ModalBody>
                      {/* <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Action
                        </Button>
                      </ModalFooter> */}
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </>
        );
      })}
    </>
  );
}
