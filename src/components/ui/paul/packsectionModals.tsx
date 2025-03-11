"use client"
import { FaCircleCheck } from "react-icons/fa6";
import CountdownTimer from "@/components/ui/paul/countdowntimer"; // Asegúrate de tener el componente CountdownTimer
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
// import { Modal } from "@mui/material"; // Importamos el Modal de Material-UI
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import ShoppingCartCourseSelector from "./carrito/shoppingcartcourseselector";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { environment } from "@/environments/environment";
import PagarPlanSesionComponent from "../bruno/pagarplansesion";
import ShoppingCartProfesional from "./carrito/shoppingcartProfesional";
import ShoppingCartPremiun from "./carrito/shoppingcartPremiun";


const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const contador:string = environment.contador;

const img = {
  copa: `${storageUrl}/Multimedia/Imagen/Ccd/Banners/copa-mejor-institucion-latam.png`,
  icons: {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-gestion.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-ingenieria.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-mineria.svg`,
  },
  logos: {
    autodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-autodesk-institute-white.svg`,
    pmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-pmi-white.svg`,
    cdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdidp-white.svg`,
    compactccd: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdd-white5.svg`,
    compactpmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-pmi-white.svg`,
    compactcdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdidp-white.svg`,
    compactautodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-autodesk-white.svg`,
  },
  fondos: {
    pack: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/pack.png`,
  },
};


interface Background {
  bg: string;
  
}


const PacksSection = ({bg}:Background) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const toggleModal = () => setModalOpen(!isModalOpen);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onOpenChange: onOpenChange3,
  } = useDisclosure();


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

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const [listarplan, setlistarplan] = useState([]);
  const [precioplan, setprecioplan] = useState(0);
  const [idplan, setidplan] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.post("/inicio/listarplanv2", {
        });
        setlistarplan(response.data.data[0]);
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
      }
    };

    fetchCourseDetails();
  }, []);

    
  return (
    <>
      <div
        className={` bg-center-bottom flex items-center justify-center ${bg}`}
       
      >
        <div className="w-10/12 flex flex-col justify-center items-center scale-95 h-full">
          {/* Título principal */}
          <div className="text-center">
            <h1 className="md:text-4xl font-extrabold text-white">
              <span className="text-2xl mr-2">VERANO</span>
              <span className="text-3xl md:text-2xl font-extrabold text-colors-cyan-ccd">
                FEST
              </span>
              <span className="text-3xl md:text-2xl font-extrabold text-white">
                2025
              </span>
            </h1>
            <div className="flex flex-wrap justify-center items-center py-2 space-x-4">
              {/* Línea izquierda */}
              <div>
                <span className="block bg-white w-0 md:w-24 lg:w-56 h-[6px] neon-white-cyan"></span>
              </div>

              {/* Texto central */}
              <div>
                <h1
                  className="text-5xl sm:text-5xl md:text-4xl lg:text-6xl text-colors-dark-blue-ccd font-extrabold tracking-wide neon-white-cyan text-center"
                  style={{
                    WebkitTextStrokeWidth: "1px", // Ancho del trazo
                    WebkitTextStrokeColor: "#00eadf", // Color neon
                  }}
                >
                  PROMOCIÓN
                </h1>
              </div>

              {/* Línea derecha */}
              <div>
                <span className="block bg-white w-0 md:w-24 lg:w-56 h-[6px] neon-white-cyan"></span>
              </div>
            </div>

            <p className="text-2xl text-white mt-4 mb-4 border-2 border-colors-cyan-ccd rounded-2xl px-6 inline-block shadow-[0_0_15px_7px_rgba(0,234,223,0.2)]">
              HASTA UN 50% DSCTO
            </p>
          </div>

          {/* Tarjetas de precios */}
          <div className="flex flex-wrap justify-center gap-10 mt-5 h-full">
            {listarplan.map((item: any, index: number) => (
              <div key={index} className={`
                ${item.IdPlan == 1 ? 'from-colors-sky-ccd hover:shadow-[0_0_15px_7px_rgba(49,133,247,0.4)]' : ''}
                ${item.IdPlan == 2 ? 'from-colors-cyan-ccd hover:shadow-[0_0_15px_7px_rgba(0,234,223,0.4)]' : ''}
                ${item.IdPlan == 3 ? 'from-colors-violet-ccd2 hover:shadow-[0_0_15px_7px_rgba(98,50,250,0.4)]' : ''} group bg-gradient-to-t  to-colors-dark-blue-ccd shadow-lg p-6 w-[300px] rounded-2xl border-2 border-white  transition duration-300 hover:scale-105`}>
                <h3 className="text-2xl text-center text-white">Plan</h3>
                <h2 className={`text-3xl font-extrabold text-center ${item.IdPlan == 1 ? 'text-colors-sky-ccd' : ''} ${item.IdPlan == 2 ? 'text-colors-cyan-ccd' : ''} ${item.IdPlan == 3 ? 'text-colors-violet-ccd2' : ''}`}>
                  {item.Plan.toUpperCase()}
                </h2>
                <div className={`${item.IdPlan == 1 ? 'bg-colors-sky-ccd' : ''}
                ${item.IdPlan == 2 ? 'bg-white ' : ''}
                ${item.IdPlan == 3 ? 'bg-colors-cyan-ccd' : ''} w-8 h-[4px] mx-auto   mt-2`}></div>
                <ul className="mt-4 space-y-2 text-white">
                  {item.IdPlan == 1 && (<> <li className="flex items-center font-sans base">
                    <FaCircleCheck className="mr-2 text-colors-sky-ccd text-base" />
                    1 Curso en vivo
                  </li>
                    <li className="flex items-center font-sans text-lg">
                      <FaCircleCheck className="mr-2 text-colors-sky-ccd text-base" />
                      1 Curso asincrónico
                    </li>
                    <li className="flex items-center font-sans text-lg">
                      <FaCircleCheck className="mr-2 text-colors-sky-ccd text-base" />
                      2 Certificados de CCD
                    </li></>)}
                  {item.IdPlan == 2 && (<> <li className="flex items-center text-base">
                    <FaCircleCheck className="mr-2 text-white" />1 Año de acceso
                    total
                  </li>
                    <li className="flex items-center text-lg">
                      <FaCircleCheck className="mr-2 text-white" />
                      Más de 40 cursos
                    </li>
                    <li className="flex items-center text-lg">
                      <FaCircleCheck className="mr-2 text-white" />
                      Certificados ilimitados
                    </li></>)}
                  {item.IdPlan == 3 && (<> <li className="flex items-center text-base">
                    <FaCircleCheck className="mr-2 text-colors-violet-ccd2" />2
                    Cursos en vivo
                  </li>
                    <li className="flex items-center text-lg">
                      <FaCircleCheck className="mr-2 text-colors-violet-ccd2" />2
                      Cursos asincrónicos
                    </li>
                    <li className="flex items-center text-lg">
                      <FaCircleCheck className="mr-2 text-colors-violet-ccd2" />4
                      Certificados PMI
                    </li></>)}
                </ul>
                <p className="text-white text-lg line-through text-center mt-4">
                  S/ {((item.Precio * 2) + 0.01).toFixed(2)}
                </p>
                <p className="text-3xl font-extrabold text-center text-white">
                  <span className="relative top-[-15px] text-2xl">S/</span>
                  {item.Precio}
                </p>
                <div className="flex justify-center">
                  {item.IdPlan == 1 ? (
                    <>

                    {session?.user ? (
                    <button
                    className=" text-base border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white  font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                    style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                    onClick={() => {
                      setprecioplan(item.Precio)
                      setidplan(item.IdPlan)
                      onOpen()
                    }} // Abre el modal
                  >
                    Adquirir plan
                  </button>) : (<PagarPlanSesionComponent array={{}} />)}

</>
                
                
                ) : ''}
                  {item.IdPlan == 2 ? (
                    <>

                    {session?.user ? (
                    <button
                    className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-base font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                    style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                    onClick={() => {
                      setprecioplan(item.Precio)
                      setidplan(item.IdPlan)

                      onOpen2()
                    }} // Abre el modal
                  >
                    Adquirir plan
                  </button>
                ) : (<PagarPlanSesionComponent array={{}} />)}

                </>
                ) : ''}
                  {item.IdPlan == 3 ? (
                    <>

                    {session?.user ? (
                    <button
                    className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-base font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                    style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                    onClick={() => {
                      setprecioplan(item.Precio)
                      setidplan(item.IdPlan)

                      onOpen3()
                    }} // Abre el modal
                  >
                    Adquirir plan
                  </button> 
                  ) : (<PagarPlanSesionComponent array={{}} />)}
                  </>
                
                ) : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Texto final */}
          <p className="text-center my-5">
            <span
              className="text-3xl text-colors-cyan-ccd inline-block mr-2 neon-cyan"
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#00eadf",
              }}
            >
              ¡Obtén acceso total
            </span>
            <span
              className="text-3xl font-extrabold text-colors-violet-ccd2 inline-block neon-white-cyan"
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#00eadf",
              }}
            >
              a nuestros cursos!
            </span>
          </p>

          {/* Temporizador */}
          <div className="flex items-center justify-around flex-wrap gap-4">
            <div className="flex-1 max-sm:hidden">
              <Image
                src="/Multimedia/Imagen/ccdcorp/newccdCorp/promociones/VERANO FEST/FLECHAS/Group 449.png"
                alt=""
                layout="responsive"
                width={800} // Puedes ajustar este valor según lo que necesites
                height={300} // Ajusta la altura también si es necesario
                className="object-contain"
              />
            </div>

            <div className="flex justify-center items-center flex-1">
            <CountdownTimer targetDate={contador} />
            </div>

            <div className="flex-1 max-sm:hidden">
              <Image
                src="/Multimedia/Imagen/ccdcorp/newccdCorp/promociones/VERANO FEST/FLECHAS/Group 450.png"
                alt=""
                layout="responsive"
                width={800} // Lo mismo aquí, ajusta el tamaño
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Modal
        size={sizeRes}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className="bg-[#0A1128]  !scrollbar-hide "
      
          classNames={{
            body: "overflow-hidden py-0 px-0",
            base: "no-scrollbar",
            closeButton: " m-4 bg-white",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent
           
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

                <ModalBody className="">
                  {/* Botón de cerrar modal */}
                  {/* <button
                    onClick={onClose} // Llama a la función para cerrar el modal
                    className="absolute top-2 right-8 hover:text-colors-dark-blue-ccd text-xl px-3 hover:bg-gray-300 hover:bg-opacity-60 text-gray-300 rounded-[40px] "
                  >
                    ✕
                  </button> */}
                  <ShoppingCartCourseSelector precioplan={precioplan} idplan={idplan}/>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
        size={sizeRes}
          isOpen={isOpen2}
          onOpenChange={onOpenChange2}
          placement="center"
          className="bg-[#0A1128]  !scrollbar-hide w-[80vw] h-[80vh] max-w-[90vw] max-h-[90vh] max-xl:w-[100vh] max-xl:h-[100vh] max-xl:max-w-[100vh] max-xl:max-h-[100vh]"
      
          classNames={{
            body: "overflow-hidden py-0 px-0",
            base: "no-scrollbar",
            closeButton: " m-4 bg-white",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent
           
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

                <ModalBody className="">
                  {/* Botón de cerrar modal */}
                  {/* <button
                    onClick={onClose} // Llama a la función para cerrar el modal
                    className="absolute top-2 right-8 hover:text-colors-dark-blue-ccd text-xl px-3 hover:bg-gray-300 hover:bg-opacity-60 text-gray-300 rounded-[40px] "
                  >
                    ✕
                  </button> */}
                  <ShoppingCartPremiun precioplan={precioplan} idplan={idplan}/>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
        size={sizeRes}
          isOpen={isOpen3}
          onOpenChange={onOpenChange3}
          placement="center"
          className="bg-[#0A1128]  !scrollbar-hide "
          classNames={{
            body: "overflow-hidden py-0 px-0",
            base: "no-scrollbar",
            closeButton: "text-black bg-white m-3",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent
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

                <ModalBody className=" ">
                  {/* Botón de cerrar modal */}
                 
                  <ShoppingCartProfesional  precioplan={precioplan} idplan={idplan}/>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default PacksSection;
