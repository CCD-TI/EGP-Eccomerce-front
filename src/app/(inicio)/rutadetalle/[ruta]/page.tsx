"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, Switch } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5"; // Asegúrate de instalar react-icons si no lo tienes
import "aos/dist/aos.css"; // Importa los estilos de AOS
import { FaCheck, FaMoneyBill1 } from "react-icons/fa6";
import PagarAhoraSesionComponent from "@/components/ui/bruno/pagarahorasesion";

import {
  FaArrowRight,
  FaBookBookmark,
  FaCartShopping,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa6";
import AOS from "aos"; // Importa AOS
import axios from "axios";
import { environment } from "@/environments/environment";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BiSolidLike } from "react-icons/bi";
import { TiPlus } from "react-icons/ti";
import { HiDocumentArrowDown, HiOutlinePlus } from "react-icons/hi2";
import { IoIosTime } from "react-icons/io";
import RutaVideo from "@/components/ui/paul/RutaVideo";
import RutaCarrusel from "@/components/ui/paul/RutaCarrusel";
import RutaEnd from "@/components/ui/paul/RutaEnd";
import { useRouter } from "next/navigation";
import ComprarRuta from "@/components/ui/paul/pagoRuta/payment-ruta";
import { FaShoppingCart } from "react-icons/fa";
import { useCartRutaStore } from "@/context/cartRuta";

interface CartRuta {
  IdRuta: number;
  Ruta: string;
  ImagenPortada: string;
  Cursos: { Curso: string; Modalidad: string }[];
  PrecioTotal: number;
  quantity: number;
  cupon: string;
  descuento: number;
}

interface Producto {
  Escuela: string | null;
  Curso: string | null;
  IdRuta: number | null;
  TipoModalidad: string;
  IdProducto: number;
  Precio: number | null;
  FechaInicio: string | null;
  Horario: string | null;
  CursoImagen: string;
  CursoBrochure: string;
  CantidadModulos: number | number;
  TipoCurso: string;
  HorasAcademicas: number | null;
}

interface Ruta {
  IdRuta: number;
  Ruta: string;
  ImagenPortada: string;
  Descripcion: string | null;
  Escuela: string | null;
  EscuelaGeneral: string | null;
  Productos: Producto[];
  Integrantes: number;
  Popularidad: string;
}

export default function Page() {
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const searchParams = useSearchParams();
  const rid = searchParams.get("rid"); // Obtiene el valor del parámetro "idcurso"

  const [error, setError] = useState<string | null>(null);
  const [rutasCompletas, setrutasCompletas] = React.useState<Ruta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalidades, setModalidades] = useState<{ [curso: string]: string }>(
    {}
  );
  const [precioTotal, setPrecioTotal] = useState<number>(0); // ✅ Estado para el precio total
  const [isSelected, setIsSelected] = React.useState(true);
  // Cart
  const addRutaToCart = useCartRutaStore((state) => state.addRutaToCart);
  const removeRutaFromCart = useCartRutaStore(
    (state) => state.removeRutaFromCart
  );
  const cart = useCartRutaStore((state) => state.cart);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: true, // Si la animación se ejecuta solo una vez
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
      // delay: 500,
      // startEvent: 'load'
    });
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (typeof rid !== "string") return;

      try {
        const response = await api.post("/inicio/getRutasDetalle", {
          Rid: rid,
        });
        const rutas = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setrutasCompletas(rutas);

        const initialModalidades: { [curso: string]: string } = {};

        rutas.forEach((ruta: Ruta) => {
          const cursosAgrupados = agruparPorCurso(ruta.Productos);
          cursosAgrupados.forEach(([cursoNombre, productos]) => {
            const tieneEnVivo = productos.some(
              (p) => p.TipoModalidad === "En Vivo"
            );
            initialModalidades[cursoNombre] = tieneEnVivo
              ? "En Vivo"
              : productos[0].TipoModalidad;
          });
        });

        setModalidades(initialModalidades);
        calcularPrecioTotal(initialModalidades); // ✅ Calcular el precio al terminar de cargar
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [rid]); // ✅ Ahora se actualiza si el ID de la ruta cambia

  useEffect(() => {
    if (rutasCompletas.length > 0) {
      const initialModalidades: { [curso: string]: string } = {};

      rutasCompletas.forEach((ruta: Ruta) => {
        const cursosAgrupados = agruparPorCurso(ruta.Productos);
        cursosAgrupados.forEach(([cursoNombre, productos]) => {
          const tieneEnVivo = productos.some(
            (p) => p.TipoModalidad === "En Vivo"
          );
          initialModalidades[cursoNombre] = tieneEnVivo
            ? "En Vivo"
            : productos[0].TipoModalidad;
        });
      });

      setModalidades(initialModalidades);
      calcularPrecioTotal(initialModalidades);
    }
  }, [rutasCompletas]);

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const [isOpen, setIsOpen] = useState(false);

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  const img = {
    logos: {
      gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
      ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
      mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
    },
  };

  // ✅ Agrupar productos por curso
  const agruparPorCurso = (productos: Producto[]) => {
    const cursosMap = new Map<string, Producto[]>();
    productos.forEach((producto) => {
      if (!cursosMap.has(producto.Curso!)) {
        cursosMap.set(producto.Curso!, []);
      }
      cursosMap.get(producto.Curso!)!.push(producto);
    });
    return Array.from(cursosMap.entries());
  };

  // ✅ Calcular el precio total basado en la modalidad seleccionada
  const calcularPrecioTotal = (modalidadesActualizadas: {
    [curso: string]: string;
  }) => {
    let total = 0;
    const cursosContados = new Set<string>();

    rutasCompletas.forEach((ruta) => {
      ruta.Productos.forEach((producto) => {
        const curso = producto.Curso?.trim(); // ✅ Aseguramos que no haya espacios en blanco

        if (curso && !cursosContados.has(curso)) {
          const productosDelCurso = ruta.Productos.filter(
            (p) => p.Curso?.trim() === curso
          );
          const modalidadSeleccionada = modalidadesActualizadas[curso];

          if (modalidadSeleccionada) {
            total += modalidadSeleccionada === "En Vivo" ? 300 : 150;
          } else {
            const tieneEnVivo = productosDelCurso.some(
              (p) => p.TipoModalidad === "En Vivo"
            );
            total += tieneEnVivo ? 300 : 150;
          }

          cursosContados.add(curso); // ✅ Aseguramos que el curso no se cuente dos veces
        }
      });
    });

    console.log("Precio total calculado:", total); // ✅ Depuración
    setPrecioTotal(total); // ✅ Actualizamos el estado
  };

  // ✅ Cambiar modalidad de un curso específico y recalcular el total
  const cambiarModalidad = (curso: string) => {
    const nuevasModalidades = {
      ...modalidades,
      [curso]: modalidades[curso] === "Asincrónico" ? "En Vivo" : "Asincrónico",
    };
    setModalidades(nuevasModalidades);
    calcularPrecioTotal(nuevasModalidades); // ✅ Recalcular el precio inmediatamente
  };

  // console.log(
  //   "RUTASCOMPLETAS",
  //   rutasCompletas.flatMap((r) => r.Productos)
  // );

  const obtenerCursosConModalidad = () => {
    const cursosConModalidad: { Curso: string; Modalidad: string }[] = [];

    rutasCompletas.forEach((ruta) => {
      agruparPorCurso(ruta.Productos).forEach(([cursoNombre, productos]) => {
        const modalidadSeleccionada =
          modalidades[cursoNombre] || productos[0].TipoModalidad;

        cursosConModalidad.push({
          Curso: cursoNombre,
          Modalidad: modalidadSeleccionada,
        });
      });
    });

    return cursosConModalidad;
  };

  const handleCartToggle = (ruta: Ruta) => {
    const isInCart = cart.some((item) => item.IdRuta === ruta.IdRuta);

    const cursosConModalidad = agruparPorCurso(ruta.Productos).map(
      ([cursoNombre, productos]) => {
        const modalidadSeleccionada =
          modalidades[cursoNombre] || productos[0].TipoModalidad;
        return {
          Curso: cursoNombre,
          Modalidad: modalidadSeleccionada,
        };
      }
    );

    const rutaParaCarrito: CartRuta = {
      IdRuta: ruta.IdRuta,
      Ruta: ruta.Ruta,
      ImagenPortada: ruta.ImagenPortada,
      Cursos: cursosConModalidad,
      PrecioTotal: precioTotal,
      quantity: 1,
      cupon: "",
      descuento: 0,
    };

    if (isInCart) {
      removeRutaFromCart(rutaParaCarrito); // Asegúrate que esta función elimina correctamente
    } else {
      addRutaToCart(rutaParaCarrito); // Asegúrate que esta función añade correctamente
    }
  };

  return (
    <>
      {isLoading ? (
        <p className="text-center text-white">Cargando...</p>
      ) : (
        rutasCompletas.map((ruta) => (
          <div
            key={ruta.IdRuta}
            className="flex pt-12 relative w-full overflow-hidden justify-center items-center bg-double-esferas2 bg-[#0D142D]"
          >
            {/* Degradados radiales */}
          
            <div
              className="w-full overflow-hidden flex justify-center items-center py-10 z-20"
              data-aos="zoom-in-down"
              data-aos-anchor-placement="top-bottom"
            >
              <div
                className="h-full w-[90%]   
              flex flex-col justify-center items-center gap-7 mx-auto z-50"
              >
                <div className=" h-full max-w-[100rem] flex max-lg:flex-col gap-6 w-full rounded-2xl ">
                   <div className="w-[420px] max-lg:flex max-md:flex-col max-lg:w-full max-md:w-[420px] max-sm3:w-full gap-10 p-6 rounded-2xl max-md:mx-auto">
                    <img
                      src={`${storageUrl ?? ""}${ruta.ImagenPortada ?? ""}`}
                      className="w-full max-lg:w-[50%] h-[20rem] rounded-2xl max-md:w-full"
                      alt=""
                    />
                    <div className=" max-lg:w-[50%] max-md:w-full max-lg:mt-auto flex flex-col gap-6 text-white mt-4">
                      <h1 className="flex gap-2 items-center justify-center">
                        <span className="flex gap-2 items-center">
                          <FaUser /> {ruta.Integrantes} integrantes{" "}
                        </span>
                        <span className="font-bold text-colors-cyan-ccd">
                          |
                        </span>
                        <span className="flex gap-2 items-center">
                          <BiSolidLike /> {ruta.Popularidad}{" "}
                        </span>
                      </h1>
                      <div className="flex justify-between items-center">
                        <ComprarRuta
                          precioTotal={precioTotal}
                          imagen={ruta.ImagenPortada}
                          curso={ruta.Ruta}
                          idproducto={ruta.IdRuta}
                          rutaProductos={obtenerCursosConModalidad()} // ✅ Ahora se envía el array con modalidad seleccionada
                        />

                        <div className="flex items-center justify-between mt-4">
                          <button>
                            <h4 className="text-[10px] pb-2">
                              Agregar al carrito
                            </h4>
                            <Button
                              onClick={() => handleCartToggle(ruta)}
                              className="bg-[#00EADE] text-[#162E54]"
                              color="primary"
                            >
                              {cart.some(
                                (item) => item.IdRuta === ruta.IdRuta
                              ) ? (
                                <FaCheck className="text-2xl" />
                              ) : (
                                <FaShoppingCart className="text-2xl" />
                              )}
                            </Button>
                          </button>

                          {/* <div className="text-lg font-bold">
                            Total: S/ {precioTotal}
                          </div> */}
                        </div>
                      </div>
                      <div className="w-full p-4 flex items-center justify-center rounded-xl bg-white ">
                        <button className="flex items-center text-colors-sky-ccd gap-2 text-2xl">
                          <FaWhatsapp className="size-10" /> Más Información
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4 text-white p-6">
                    <div className="w-full flex gap-6">
                      <div className="w-full flex flex-col gap-3">
                        <h1 className=" w-full text-3xl">{ruta.Ruta}</h1>
                        <div className="w-full h-[2px] bg-[#3185F7] "></div>
                        <h2>{ruta.Descripcion}</h2>
                      </div>
                    </div>

                    {/* ✅ LISTA DE CURSOS AGRUPADOS */}
                    {agruparPorCurso(ruta.Productos).map(
                      ([cursoNombre, productos], index) => {
                        const tieneAmbasModalidades =
                          productos.some(
                            (p) => p.TipoModalidad === "En Vivo"
                          ) &&
                          productos.some(
                            (p) => p.TipoModalidad === "Asincrónico"
                          );

                        const modalidad =
                          modalidades[cursoNombre] ||
                          productos[0].TipoModalidad;
                        const productoSeleccionado =
                          productos.find(
                            (p) => p.TipoModalidad === modalidad
                          ) || productos[0];

                        return (
                          <div
                            key={index}
                            className="relative cursor-pointer flex w-full items-center gap-2"
                          >
                            <div className="w-full flex items-center relative pl-[25px]">
                              <div className="w-full flex items-center  justify-between">
                                <div
                                  className="flex justify-center top-[12px] items-center absolute h-8 w-8
                             rounded-lg   left-[-35px]"
                                >
                                  <span className="text-xl font-bold text-cyan-400">
                                    {index + 1}
                                  </span>
                                  <div className="absolute right-[-6px] bg-cyan-400 h-2 w-2 rounded-full"></div>
                                </div>

                                <div
                                  className={`flex justify-center left-2 -top-[4.5px] items-center absolute w-16 h-16 rounded-full p-2 shadow-md
                            ${
                              productoSeleccionado.Escuela === "Gestión"
                                ? "border-red-500 border-[2.5px]"
                                : productoSeleccionado.Escuela === "Ingeniería"
                                ? "border-blue-500 border-[2.5px]"
                                : "border-orange-500 border-[2.5px]"
                            } bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)]`}
                                >
                                  <img
                                    src={
                                      productoSeleccionado.Escuela === "Gestión"
                                        ? img.logos.gestion
                                        : productoSeleccionado.Escuela ===
                                          "Ingeniería"
                                        ? img.logos.ingenieria
                                        : img.logos.mineria
                                    }
                                    // alt={producto.Escuela}
                                    className="w-8 h-8"
                                  />
                                </div>

                                <Accordion variant="splitted" className="">
                                  <AccordionItem
                                    key="1"
                                    aria-label="Accordion 1"
                                    title={
                                      <div className="flex max-sm3:flex-col items-center gap-8">
                                        <div className="pl-10">
                                          {productoSeleccionado.Curso}{" "}
                                        </div>
                                        {/* ✅ SWITCH PARA MODALIDADES */}
                                        <div className="flex items-center gap-2">
                                          <Switch
                                            isSelected={modalidad === "En Vivo"}
                                            onValueChange={() =>
                                              tieneAmbasModalidades &&
                                              cambiarModalidad(cursoNombre)
                                            }
                                            isDisabled={!tieneAmbasModalidades} // Desactivado si solo hay una modalidad
                                            classNames={{
                                              wrapper: !tieneAmbasModalidades
                                                ? "border-2 border-gray-400 bg-gray-500 cursor-not-allowed" // Switch gris y desactivado
                                                : "border-2 border-cyan-500 bg-gray-700", // Switch activo
                                              thumb: !tieneAmbasModalidades
                                                ? "bg-gray-300" // Botón gris si desactivado
                                                : "bg-cyan-400", // Botón azul si activo
                                            }}
                                          />
                                          <span
                                            className={`text-sm ${
                                              !tieneAmbasModalidades
                                                ? "text-gray-400"
                                                : "text-white"
                                            }`}
                                          >
                                            {modalidad}
                                          </span>
                                        </div>
                                      </div>
                                    }
                                    className="bg-transparent border-[#0E4C5A] border-2"
                                  >
                                    <div className="flex max-sm:flex-col gap-4">
                                      <Button
                                        as="a"
                                        href={`${storageUrl}${productoSeleccionado.CursoBrochure}`}
                                        download
                                        className="bg-cyan-500 text-white"
                                        endContent={<HiDocumentArrowDown />}
                                      >
                                        Descargar Brochure
                                      </Button>

                                      <h1 className="flex max-sm3:flex-col gap-2 items-center justify-center">
                                        <span className="flex gap-2 items-center">
                                          <FaBookBookmark className="text-colors-cyan-ccd" />{" "}
                                          {productoSeleccionado.CantidadModulos}{" "}
                                          Módulos
                                        </span>
                                        <span className="font-bold text-colors-cyan-ccd max-sm3:hidden">
                                          |
                                        </span>
                                        <hr className="border-1 border-colors-cyan-ccd w-[90%] hidden max-sm3:block" />
                                        <span className="flex gap-2 items-center">
                                          <IoIosTime
                                            className="text-colors-cyan-ccd"
                                            size={18}
                                          />
                                          {productoSeleccionado.HorasAcademicas}{" "}
                                          Horas
                                        </span>
                                        <span className="font-bold text-colors-cyan-ccd max-sm3:hidden">
                                          |
                                        </span>
                                        <hr className="border-1 border-colors-cyan-ccd w-[90%] hidden max-sm3:block" />
                                        {/* ✅ PRECIO DINÁMICO */}
                                        <span className="flex gap-2 items-center">
                                          <FaMoneyBill1
                                            className="text-colors-cyan-ccd"
                                            size={18}
                                          />

                                          {modalidad === "En Vivo"
                                            ? "S/ 300"
                                            : "S/ 150"}
                                        </span>
                                      </h1>
                                    </div>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                    {/* LISTA DE CURSO END */}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        ))
      )}

      <RutaVideo />
      <RutaCarrusel />
      <RutaEnd />
    </>
  );
}
