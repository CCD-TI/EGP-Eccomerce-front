import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { IoCloseOutline, IoSend } from "react-icons/io5";
import Image from "next/image";

interface Props {
  footerRef: any;
}

const WhatsAppButton = () => {
  const phoneNumber = "51908841254";
  const defaultMessage =
    "Hola deseo más información, vengo de la página del CCD 📲😁📣";
  const [message, setMessage] = useState(defaultMessage);
  //   const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
  //     message
  //   )}`;
  const isMobile = /iPhone|Android|iPad|iPod/.test(navigator.userAgent);
  const handleSend = () => {
    // Genera la URL de WhatsApp
    const whatsappURL = isMobile
    ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;



    // Abre WhatsApp en una nueva pestaña
    window.open(whatsappURL, "_blank");

    // Reinicia el mensaje después de enviarlo
    setTimeout(() => {
      setMessage(defaultMessage);
    }, 500);
  };

  const [isStopped, setIsStopped] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  //   const popoverRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState("");
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  let inactivityTimer: NodeJS.Timeout;

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      setIsOpenPopover(false); // Oculta el popover cuando el usuario interactúa

      inactivityTimer = setTimeout(() => {
        setIsOpenPopover(true); // Muestra el popover después de inactividad
      }, 5000); // Cambia 5000 por el tiempo en milisegundos que deseas (5 segundos en este caso)
    };

    // Eventos que detectan la interacción del usuario
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // Establece el temporizador inicial
    inactivityTimer = setTimeout(() => {
        setIsOpenPopover(true);
    }, 5000);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return (
    <>
    <div className="group">

      <button
        ref={buttonRef}
        className={`bg-green-600 rounded-full fixed z-[20] right-8 transition-all duration-300 group-hover:scale-110 hover:shadow-lg ${
          isOpen ? "bottom-10" : "bottom-8"
        }`}
        onClick={() => {
           onOpen()
          setTime(getCurrentTime()); // Actualiza la hora cuando se abre el modal
        }}
       
      >
        {isOpen ? (
          <IoCloseOutline className="w-20 h-20 p-2 max-sm:w-14 max-sm:h-14 max-sm:p-2.5 rounded-full text-white pointer-events-auto" />
        ) : (
          <FaWhatsapp className="w-20 h-20 p-4 max-sm:w-14 max-sm:h-14 max-sm:p-2.5 text-white" />
        )}
      </button>

      {/* POPOVER DE AYUDA CON HOVER SOBRE EL BOTÓN */}
      <div
        className={` fixed flex gap-2 items-center z-[21] p-2 px-2 pl-6 rounded-2xl bg-white shadow-lg left-auto right-[120px] max-sm:right-[85px] bottom-12 max-sm:bottom-[2.6rem] w-[17rem] group-hover:opacity-100 transition-opacity duration-300 ${
          isOpenPopover ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-base max-sm:text-sm">¿Necesitas ayuda?</div>
        <div className="text-sm  max-sm:text-xs font-extrabold text-gray-600">Contáctanos</div>
      </div>
    </div>

      <Modal
      placement="center"
        isOpen={isOpen}
        ref={modalRef}
        shouldBlockScroll={false}
        onOpenChange={onOpenChange}
        classNames={{
          body: "",
          backdrop: "bg-trasparent",
          base: "border-[#292f46] !w-[380px] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hidden",
        }}
        className={`fixed max-sm3:right-0  max-sm3:bottom-32 right-8  m-0 p-0 z-20 bottom-20 ${
          isStopped ? "absolute bottom-8" : ""
        }`}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody className="!p-0 !gap-0">
              <div className="size-full flex flex-col bg-WspBtn w-[380px] rounded-lg  ">
                <div className="flex flex-row gap-4 items-center bg-[#1a8975] p-4 rounded-t-lg">
                  <button
                    className="absolute top-4 right-4  text-2xl"
                    onClick={onClose}
                  >
                    <IoCloseOutline className="text-2xl" />
                  </button>
                  <div className="bg-white rounded-full size-[55px] flex items-center relative">
                    <Image
                      src="/Multimedia/Imagen/logos/LogoCCD.png"
                      height={80}
                      width={60}
                      alt="logo ccd"
                      className="p-2"
                    />
                    <div className="size-[14px] absolute bottom-0 -right-0 bg-[#2DB742] rounded-full border-[2.5px] border-[#1a8975] "></div>
                  </div>
                  <div>
                    <p className="text-white text-xl font-bold">Asesor CCD</p>
                    <p className="text-white text-sm">Online</p>
                  </div>
                </div>

                <div className="p-4 h-[150px] w-full overflow-y-auto scrollbar-hide">
                  <div className="  rounded-l-xl flex flex-col gap-4 items-center  p-4">
                    <h1 className="text-center text-xs">{time}</h1>
                    <div
                      className={`relative inline-block ${
                        message ===
                        "Hola deseo más información, vengo de la página del CCD 📲😁📣"
                          ? "mr-[4rem]"
                          : "mr-auto py-8"
                      } `}
                    >
                      {/* Pequeña curva en la esquina superior izquierda */}
                      <div
                        className="absolute  -left-5 w-5 h-5 bg-white"
                        style={{
                          clipPath: "polygon(0 0, 100% 100%, 100% 0)",
                        }}
                      />
                      <div className={`bg-white rounded-b-2xl rounded-r-2xl pr-16 shadow-lg
                        
                        ${ message ===
                          "Hola deseo más información, vengo de la página del CCD 📲😁📣"
                            ? "p-3"
                            : "p-5"}`}>
                        <p className="text-gray-800 text-left text-sm">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" relative w-[380px]">
                <input
                  type="text"
                  maxLength={30}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-black bg-white rounded-b-2xl px-6 h-[48px]  placeholder:text-xl  "
                  placeholder=" Ingrese su mensaje..."
                />
                <button
                  onClick={handleSend}
                  className=" bg-[#2DB742] rounded-full absolute p-1 right-5 bottom-3"
                >
                  <IoSend className=" size-7 text-white  p-1 " />
                </button>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WhatsAppButton;
