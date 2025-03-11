"use client";
import CompraRapida from "@/components/ui/paul/compraRapida/payment-flow";

import { Button, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useParams, useSearchParams } from "next/navigation";
import { RiBroadcastFill } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";

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

  const searchParams = useSearchParams();
  const idCurso = searchParams.get("pid"); // Obtiene el valor del parámetro "idcurso"
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cursosCompletos, setcursosCompletos] = React.useState<CursoDetalle[]>(
    []
  );

  const [modalidadIndex, setModalidadIndex] = useState(0);

  // Función para cambiar la modalidad
  const cambiarModalidad = () => {
    if (cursosCompletos?.length > 0) {
      setModalidadIndex(
        (prevIndex) => (prevIndex + 1) % cursosCompletos[0].Productos?.length
      );
    }
  };

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

        const data = response.data.data;
        setcursosCompletos(Array.isArray(data) ? data : [data]);
        console.log("Cursos recibidos:", Array.isArray(data) ? data : [data]);

        console.log("Respuesta del backend:", response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        setError("Error al cargar los datos del curso.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [idCurso]);

  const [selects, setSelects] = useState({
    tipoProducto: 1,
    fecha: null,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* <h1>{idCurso}</h1> */}

      {/* Contenedor Izquierdo */}
      {cursosCompletos.map((producto: CursoDetalle, index: number) => {
        return (
          <>
            <div className="flex justify-center">
              <div className="max-w-5xl h-[530px] bg-[#131939] rounded-2xl text-white p-6 flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <div
                      className={`bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-16 h-16 rounded-full 
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
                        className={`text-white w-10 ${
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
                      <span className="text-base italic -mb-[1px] tracking-wider">
                        ESCUELA DE
                      </span>
                      <span
                        className={`text-2xl font-bold
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
                    <h3 className="bg-colors-sky-ccd rounded-xl p-1 px-7 w-fit shadow-[0_0_15px_3px_rgba(49,133,247,0.5)]">
                      Curso de Alta Especializacion
                    </h3>
                  </div>
                  <div className="text-4xl py-2">
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
                    <hr className="bg-colors-sky-ccd h-[1.5px] border-transparent" />
                  </div>
                  <div className="py-2">
                    <h4>Selecciona tu modalidad:</h4>
                  </div>

                  {/* ... (tu código existente) */}
                  {/* SWITCH START */}
                  <div className="py-2">
                    <div className="flex items-center gap-4">
                      <div
                        className="relative flex items-center w-16 h-8 border-2 border-colors-cyan-ccd rounded-full cursor-pointer"
                        onClick={cambiarModalidad}
                      >
                        {/* Indicador del switch */}
                        <div
                          className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            modalidadIndex === 0
                              ? "translate-x-1"
                              : "translate-x-8"
                          }`}
                        ></div>
                      </div>

                      {/* Texto y Icono */}
                      {modalidadIndex === 0 ? (
                        <div
                          className="flex items-center gap-2 text-colors-cyan-ccd cursor-pointer"
                          onClick={cambiarModalidad}
                        >
                          {producto.Productos?.length > 0 ? (
                            <>
                              <span className="text-sm font-medium">
                                Curso {producto.Productos[0].TipoModalidad}
                              </span>
                              <RiBroadcastFill size={20} />
                            </>
                          ) : (
                            <span className="text-sm font-medium">
                              Curso en proceso
                            </span>
                          )}
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-2 text-colors-cyan-ccd cursor-pointer"
                          onClick={cambiarModalidad}
                        >
                          <span className="text-sm font-medium">
                            Curso {producto.Productos[1].TipoModalidad}
                          </span>
                          <BsCameraVideoFill size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* SWITCH END */}

                  {/* ... (tu código existente) */}

                  {/* Fecha e Integrantes */}
                  {producto.Productos[modalidadIndex].FechaInicio && (
                    <p className="text-xl mb-4">
                      Inicio:{" "}
                      <span className="text-xl font-bold">
                        {producto.Productos[modalidadIndex].FechaInicio}
                      </span>
                      <span className="text-xl font-bold">
                        {" "}
                        - {producto.Productos[modalidadIndex].Horario}
                      </span>
                    </p>
                  )}

                  <div className="flex px-3 py-4 rounded-xl w-fit items-center gap-6 border-2 border-colors-sky-ccd">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-xl" />
                      <span className="text-xl">
                        {producto.Seguidores} Integrantes
                      </span>
                    </div>
                    <span className="w-[1.5px] h-9 bg-colors-cyan-ccd"></span>
                    <div className="flex items-center gap-2">
                      <AiFillLike className="text-xl" />
                      <span className="text-xl">
                        {Math.round(
                          (Number(producto.Calificacion) * 100) /
                            Number(producto.Seguidores)
                        )}
                        % ({producto.Calificacion})
                      </span>
                    </div>
                  </div>
                  <div className="-ml-4 -mb-2 text-left">
                    <Button
                      onPress={onOpen}
                      className="bg-transparent text-white"
                    >
                      <h4>Comprar Ahora</h4>
                    </Button>
                  </div>

                  {/* Precio */}
                  <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center gap-2">
                      {/* {producto.Productos[0].Precio} */}
                      {producto.Productos?.length > 0 ? (
                        <>
                          <Button
                            onPress={onOpen}
                            className="text-3xl bg-colors-cyan-ccd rounded-xl p-3 font-bold text-colors-dark-blue-ccd"
                          >
                            S/.{producto.Productos[modalidadIndex].Precio}
                          </Button>
                          <div className="text-lg line-through text-white decoration-colors-cyan-ccd">
                            S/.{" "}
                            {Math.round(
                              producto.Productos[modalidadIndex].Precio * 1.3
                            )}
                          </div>
                        </>
                      ) : (
                        <p>En proceso</p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center h-full">
                      <button className="flex flex-col items-center">
                        <h4 className="text-[10px] pb-2">Agregar al carrito</h4>
                        <FaCartPlus className="text-4xl" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contenedor Derecho */}
                <div className="lg:w-1/2 mt-6 lg:mt-0 flex flex-col justify-center items-center">
                  <img
                    src={storageUrl + producto.RutaImagen}
                    alt="Course Image"
                    width={500}
                    height={300}
                    className="rounded-xl shadow-lg"
                  />
                  {/* Botones */}
                  <div className="flex justify-center gap-4 py-5">
                    <button
                      className="px-4 py-2 rounded-[6px] bg-[#00D3C5] hover:text-colors-dark-blue-ccd hover:bg-white text-white shadow-lg transition-all"
                      onClick={() =>
                        window.open(
                          storageUrl + producto.RutaBrochure,
                          "_blank"
                        )
                      }
                    >
                      Descargar Brochure
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 rounded-[6px] text-white flex hover:text-green-500 items-center gap-2 shadow-lg hover:bg-gray-200 transition-all"
                      onClick={() =>
                        window.open(`${producto.NumeroWhatsapp}}`, "_blank")
                      }
                    >
                      <FaWhatsapp className="text-xl" /> Más Información
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <>
              <Modal
                backdrop="opaque"
                classNames={{
                  backdrop:
                    "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                  closeButton: "bg-white",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className=""
              >
                <ModalContent
                  className="bg-gradient-to-br from-[#0B1120] to-[#0E1B37] "
                  style={{
                    width: "90%",
                    height: "90%",
                    maxWidth: "90%",
                    maxHeight: "90%",
                  }}
                >
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <CompraRapida />
                      </ModalBody>
                      <ModalFooter>
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
                      </ModalFooter>
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
