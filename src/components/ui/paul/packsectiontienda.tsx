import { FaCircleCheck } from "react-icons/fa6";
import CountdownTimer from "@/components/ui/paul/countdowntimer"; // Asegúrate de tener el componente CountdownTimer
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
// import { Modal } from "@mui/material"; // Importamos el Modal de Material-UI
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ShoppingCartCourseSelector from "./carrito/shoppingcartcourseselector";
import ShoppingcartPremiun from "./carrito/shoppingcartProfesional";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { environment } from "@/environments/environment";


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

const PacksSectionTienda = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

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
        className=" max-md:!bg-none bg-center-bottom py-16 flex items-center justify-center"
        style={{
          backgroundImage: `url(${img.fondos.pack})`,
        }}
      >
        <div className="w-10/12  max-sm:w-full flex flex-col justify-center items-center scale-95">
          {/* Título principal */}
          <div className="text-center">
            <h1 className="md:text-4xl font-extrabold text-white">
              <span className="text-3xl mr-2">VERANO</span>
              <span className="text-3xl md:text-4xl font-extrabold text-colors-cyan-ccd">
                FEST
              </span>
              <span className="text-3xl md:text-4xl font-extrabold text-white">
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
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-colors-dark-blue-ccd font-extrabold tracking-wide neon-white-cyan text-center"
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
          <div className="flex flex-wrap justify-center mx-auto gap-10 mt-5">
            {listarplan.map((item: any, index: number) => (
              <div key={index} className={`
                ${item.IdPlan == 1 ? 'from-colors-sky-ccd hover:shadow-[0_0_15px_7px_rgba(49,133,247,0.4)]' : ''}
                ${item.IdPlan == 2 ? 'from-colors-cyan-ccd hover:shadow-[0_0_15px_7px_rgba(0,234,223,0.4)]' : ''}
                ${item.IdPlan == 3 ? 'from-colors-violet-ccd2 hover:shadow-[0_0_15px_7px_rgba(98,50,250,0.4)]' : ''} group bg-gradient-to-t  to-colors-dark-blue-ccd shadow-lg p-6 w-[300px] rounded-2xl border-2 border-white  transition duration-300 hover:scale-105`}>
                <h3 className="text-3xl text-center text-white">Plan</h3>
                <h2 className={`text-4xl font-extrabold text-center ${item.IdPlan == 1 ? 'text-colors-sky-ccd' : ''} ${item.IdPlan == 2 ? 'text-colors-cyan-ccd' : ''} ${item.IdPlan == 3 ? 'text-colors-violet-ccd2' : ''}`}>
                  {item.Plan.toUpperCase()}
                </h2>
                <div className={`${item.IdPlan == 1 ? 'bg-colors-sky-ccd' : ''}
                ${item.IdPlan == 2 ? 'bg-white ' : ''}
                ${item.IdPlan == 3 ? 'bg-colors-cyan-ccd' : ''} w-8 h-[4px] mx-auto   mt-2`}></div>
                <ul className="mt-4 space-y-2 text-white">
                  {item.IdPlan == 1 && (<> <li className="flex items-center font-sans text-lg">
                    <FaCircleCheck className="mr-2 text-colors-sky-ccd text-lg" />
                    1 Curso en vivo
                  </li>
                    <li className="flex items-center font-sans text-lg">
                      <FaCircleCheck className="mr-2 text-colors-sky-ccd text-lg" />
                      1 Curso asincrónico
                    </li>
                    <li className="flex items-center font-sans text-lg">
                      <FaCircleCheck className="mr-2 text-colors-sky-ccd text-lg" />
                      2 Certificados de CCD
                    </li></>)}
                  {item.IdPlan == 2 && (<> <li className="flex items-center text-lg">
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
                  {item.IdPlan == 3 && (<> <li className="flex items-center text-lg">
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
                <p className="text-5xl font-extrabold text-center text-white">
                  <span className="relative top-[-15px] text-2xl">S/</span>
                  {item.Precio}
                </p>
                <div className="flex justify-center">
                  {item.IdPlan == 1 ? (<button
                    className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                    style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                    onClick={() => {
                      setprecioplan(item.Precio)
                      setidplan(item.IdPlan)
                      onOpen()
                    }} // Abre el modal
                  >
                    Adquirir plan
                  </button>) : ''}
                  {item.IdPlan == 2 ? (<button
                    className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                    style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                    onClick={() => {
                      setprecioplan(item.Precio)
                      setidplan(item.IdPlan)

                      onOpen2()
                    }} // Abre el modal
                  >
                    Adquirir plan
                  </button>) : ''}
                  {item.IdPlan == 3 ? (<button
                    className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                    style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                    onClick={() => {
                      setprecioplan(item.Precio)
                      setidplan(item.IdPlan)

                      onOpen()
                    }} // Abre el modal
                  >
                    Adquirir plan
                  </button>) : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Texto final */}
          <p className="text-center my-5">
            <span
              className="text-5xl text-colors-cyan-ccd inline-block mr-2 neon-cyan"
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#00eadf",
              }}
            >
              ¡Obtén acceso total
            </span>
            <span
              className="text-5xl font-extrabold text-colors-violet-ccd2 inline-block neon-white-cyan"
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#00eadf",
              }}
            >
              a nuestros cursos!
            </span>
          </p>

          {/* Temporizador */}
          <div className="flex items-center justify-center flex-wrap gap-4">
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
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className="bg-[#0A1128]  !scrollbar-hide"
          hideCloseButton
          classNames={{
            body: "overflow-hidden py-0 px-0",
            base: "no-scrollbar",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent
            style={{
              width: "90%",
              height: "90%",
              maxWidth: "90%",
              maxHeight: "90%",
            }}
            className="relative"
          >
            {(onClose) => (
              <>

                <ModalBody className=" ">
                  {/* Botón de cerrar modal */}
                  <button
                    onClick={onClose} // Llama a la función para cerrar el modal
                    className="absolute top-2 right-8 hover:text-colors-dark-blue-ccd text-xl px-3 hover:bg-gray-300 hover:bg-opacity-60 text-gray-300 rounded-[40px] "
                  >
                    ✕
                  </button>
                  <ShoppingCartCourseSelector precioplan={precioplan} idplan={idplan}/>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isOpen2}
          onOpenChange={onOpenChange2}
          placement="center"
          className="bg-[#0A1128]  !scrollbar-hide"
          hideCloseButton
          classNames={{
            body: "overflow-hidden py-0 px-0",
            base: "no-scrollbar",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent
            style={{
              width: "90%",
              height: "90%",
              maxWidth: "90%",
              maxHeight: "90%",
            }}
            className="relative"
          >
            {(onClose) => (
              <>

                <ModalBody className=" ">
                  {/* Botón de cerrar modal */}
                  <button
                    onClick={onClose} // Llama a la función para cerrar el modal
                    className="absolute top-2 right-8 hover:text-colors-dark-blue-ccd text-xl px-3 hover:bg-gray-300 hover:bg-opacity-60 text-gray-300 rounded-[40px] "
                  >
                    ✕
                  </button>
                  <ShoppingcartPremiun  precioplan={precioplan} idplan={idplan}/>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default PacksSectionTienda;
