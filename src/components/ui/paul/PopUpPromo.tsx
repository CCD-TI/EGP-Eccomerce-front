"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import CountdownTimer from "./countdowntimer";
import { environment } from "@/environments/environment";
import { sendGAEvent } from "@next/third-parties/google";

export default function App() {
  const phoneNumber = "51908841254";
  const defaultMessage =
    "Hola deseo más información, vengo de la página del CCD 📲😁📣";
  const [message, setMessage] = useState(defaultMessage);
  //   const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
  //     message
  //   )}`;
  const isMobile = /iPhone|Android|iPad|iPod/.test(navigator.userAgent);
  const contador: string = environment.contador;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  useEffect(() => {
    
    const timer = setTimeout(() => {
        onOpen(); 
    }, 5000); 

    
    return () => clearTimeout(timer);
}, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    

const handleSend = () => {
  // Genera la URL de WhatsApp
  const whatsappURL = isMobile
    ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;

  // Abre WhatsApp en una nueva pestaña
  window.open(whatsappURL, "_blank");

  // Envía el evento a Google Analytics
  sendGAEvent('event', 'buttonClicked', { value: 'ccc_clicked' });

  // Reinicia el mensaje después de enviarlo
  setTimeout(() => {
    setMessage(defaultMessage);
  }, 500);
};

  const Contenido = [
    {
      bg_color: "bg-gradient-to-t from-colors-sky-ccd to-colors-dark-blue-ccd",
      bg_arrow: "bg-blue-700",
      colorText: "text-blue-700",
      bordershadow: "hover:shadow-blue-700/80 ",
      title: "Potencia tu CV",
      discount: "80",
      type: 2,
      description: " Cursos y Diplomas en Vivo",
    },
    {
      bg_color: "bg-gradient-to-t from-red-700",
      bg_arrow: "bg-red-700",
      bordershadow: "hover:shadow-red-700/80 ",
      colorText: "text-red-700",
      title: "Gestión Pública",
      discount: "29",
      type: 1,
      description: "Cursos y Diplomas Asincrónicos",
    },
    {
      bg_color: "bg-gradient-to-t from-orange-700 to-colors-dark-blue-ccd",
      bg_arrow: "bg-orange-700",
      bordershadow: "hover:shadow-orange-700/80 ",
      colorText: "text-orange-700",
      title: " Certificate",
      discount: "55",
      type: 2,

      description: "Cursos y Diplomas de Minería e Ingeniería en Asincrónico",
    },
  ];
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={sizeRes} // Tamaño del modal
      classNames={{
        body: "bg-sectors-PromoForm2  overflow-y-auto !p-0 !h-full",
        closeButton: "bg-white",
      }}
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
            <ModalBody className="overflow-y-auto h-full scrollbar-hide ">
              <div className="text-center">
                {/* <h1 className="md:text-4xl font-extrabold text-white">
                  <span className="text-2xl mr-2">VERANO</span>
                  <span className="text-3xl md:text-2xl font-extrabold text-colors-cyan-ccd">
                    FEST
                  </span>
                  <span className="text-3xl md:text-2xl font-extrabold text-white">
                    2025
                  </span>
                </h1> */}
                <div className="flex flex-wrap justify-center items-center py-2 space-x-4">
                  {/* Línea izquierda */}
                  <div>
                    <span className="block bg-white w-0 md:w-24 lg:w-56 h-[6px] neon-white-cyan"></span>
                  </div>

                  {/* Texto central */}
                  <div>
                    <h1
                      className="text-5xl sm:text-5xl md:text-4xl lg:text-6xl pt-5 text-colors-dark-blue-ccd font-extrabold tracking-wide neon-white-cyan text-center"
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
                  Cursos y Diplomas
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-12">
                {Contenido.map((item, index) => (
                  <button
                    key={index}
                    onClick={handleSend}
                    className={`flex flex-col gap-1 w-[22rem] h-[28rem] rounded-xl ${item.bg_color} text-white p-5 border-2 hover:scale-105 hover:shadow-lg ${item.bordershadow} transition-transform duration-300 ease-in-out`}
                  >
                    <h1 className="text-3xl text-center font-semibold">
                      <h1 className="text-3xl font-semibold neon-white">
                        Promoción{" "}
                      </h1>
                      <span
                        className={`text-4xl font-extrabold ${item.colorText}`}
                      >
                        {item.title}{" "}
                        <div
                          className={`${item.bg_arrow} w-[70px] h-[5px] mx-auto mt-2`}
                        ></div>
                      </span>
                    </h1>
                    {item.type === 1 ? (
                      <p className="text-9xl flex gap-2 justify-center items-center neon-white font-bold text-center">
                        <div className="flex flex'row  gap-2 justify-center  items-start flex-col">
                          <span className="text-xl">Desde: </span>
                          <span className="text-7xl">S/</span>
                        </div>
                        {item.discount}
                        <span className="text-3xl">.99</span>
                      </p>
                    ) : (
                      <p className="text-9xl flex gap-2 justify-center items-center neon-white font-bold text-center">
                        {item.discount}
                        <div className="flex gap-2 justify-center pt-3 items-start flex-col">
                          <span className="text-6xl">%</span>
                          <span className="text-2xl">DSCT</span>
                        </div>
                      </p>
                    )}
                    <div className="text-xl flex flex-col gap-2 justify-end h-full items-center">
                      <p className="text-3xl text-center font-semibold">
                        {" "}
                        En todos nuestros{" "}
                      </p>
                      <p className="text-xl text-center"> {item.description}</p>
                    </div>
                    <button
                      onClick={handleSend}
                      className="w-[80%] mx-auto flex justify-center gap-3 items-center text-xl p-1 border-2 border-colors-dark-blue-ccd rounded-3xl mt-6 hover:bg-colors-dark-blue-ccd hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-transform duration-300 ease-in-out"
                    >
                      ¡Contáctanos!
                      <FaWhatsapp className="text-3xl" />
                    </button>
                  </button>
                ))}
              </div>
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
              {/* <div className="flex justify-center items-center">
                <div className="flex flex-col gap-1 w-[22rem] h-[28rem] 
                rounded-xl bg-gradient-to-t from-colors-sky-ccd to-colors-dark-blue-ccd
                 text-white p-5 border-2 hover:scale-105 hover:shadow-lg hover:shadow-blue-700/80 transition-transform duration-300 ease-in-out">
                  <h1 className="text-3xl text-center font-semibold">
                    <h1 className="text-3xl font-semibold neon-white">
                      Promoción{" "}
                    </h1>
                    <span className="text-4xl font-extrabold text-blue-700">
                      {" "}
                      Potencia tu CV{" "}
                      <div className="bg-blue-700 w-[70px] h-[5px] mx-auto mt-2"></div>
                    </span>
                  </h1>
                  <p className="text-9xl flex gap-2 justify-center items-center neon-white font-bold text-center">
                    80
                    <div className="flex gap-2 justify-center pt-3 items-start flex-col">
                      <span className="text-6xl">%</span>
                      <span className="text-2xl">DSCT</span>
                    </div>
                  </p>
                  <div className="text-xl flex flex-col gap-2 justify-center items-center">
                    <p className="text-3xl text-center font-semibold">
                      {" "}
                      En todos nuestros{" "}
                    </p>
                    <p className="text-xl text-center">
                      {" "}
                      Cursos y Diplomas de{" "}
                      <span className="text-colors-sky-ccd font-bold text-xl">
                        Ingeniería
                      </span>{" "}
                      y{" "}
                      <span className="text-orange-500 text-xl font-bold">
                        Mineria{" "}
                      </span>
                      En Vivo
                    </p>
                  </div>
                  <button
                    onClick={handleSend}
                    className="w-[80%] mx-auto flex justify-center gap-3 items-center text-xl p-1 border-2 border-colors-dark-blue-ccd rounded-3xl mt-6 hover:bg-colors-dark-blue-ccd hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-transform duration-300 ease-in-out"
                  >
                    Contactanos!
                    <FaWhatsapp className="text-3xl" />
                  </button>
                </div>
              </div> */}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
