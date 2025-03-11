"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Certificado from "@/components/ui/paul/certificado";

function Page() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación
      delay: 200, // Retraso antes de la animación
      once: true, // Si solo se ejecuta una vez
    });
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // Realiza la solicitud para mantener la sesión activa
    fetch(
      "https://campus.ccdcapacitacion.edu.pe/mod/customcert/verify_certificate.php",
      {
        method: "GET",
        credentials: "include", // Importante para enviar las cookies de sesión
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Aquí puedes manejar la respuesta de Moodle si es necesario
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const [code, setCode] = useState("");
  const [isOpen2, setIsOpen2] = useState(false);

  const verifyCode = () => {
    if (code.trim() !== "") {
      setIsOpen2(true);
    }
  };

  const closeModal = () => {
    setIsOpen2(false);
  };

  if (isOpen2) {
    return (
      <>
        <Modal
          size="5xl"
          isOpen={isOpen2}
          classNames={{
            body: "bg-colors-dark-blue-ccd",
            closeButton: "hidden",
          }}
        >
          <ModalContent>
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full relative ">
                      <img
                        src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Certificados/CERTIFICADO%20PFE%20CCD_page-0001.jpg"
                        alt="Image 1"
                        className=" object-cover w-full h-full rounded-2xl"
                      />
                    </div>
                    <div className="aspect-square w-full relative">
                      <img
                        src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Certificados/CERTIFICADO%20PFE%20CCD_page-0002.jpg"
                        alt="Image 2"
                        className=" rounded-2xl object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="bg-colors-dark-blue-ccd">
                <Button color="danger" variant="solid" onPress={closeModal}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <div className="flex justify-center items-center bg-validacion h-full ">
      <div className="w-full h-[900px] my-10 mx-auto flex justify-center items-center py-20  ">
        <div className="flex flex-col  justify-center items-center gap-20 h-full ">
          <div
            className="size-full flex flex-col justify-center items-center gap-8 max-md:p-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1 className="text-white text-center text-lg">
              Ingresar Codigo de verificación
            </h1>
            {/* <div className="relative w-full max-w-md">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ejemplo: VFEMCCD2025"
              className="w-full border-[0.5px] border-white rounded-xl bg-[#1a1b26] px-10 max-lg:px-4 py-[0.6rem] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <button
              onClick={verifyCode}
              className="rounded-xl absolute right-1 top-1/2 -translate-y-1/2 bg-[#00ccbb] px-6 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-[#00e6c1]"
            >
              Verificar
            </button>
          </div> */}
            <Certificado />

            <>
              <Button onPress={onOpen}>
                verificar Certificado Plataforma antigua
              </Button>
              <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                  body: "!p-0",
                  closeButton: "hidden",
                }}
              >
                <ModalContent
                  style={{
                    width: "90%",
                    height: "90%",
                    maxWidth: "90%",
                    maxHeight: "90%",
                  }}
                >
                  {(onClose) => (
                    <>
                      {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
                      <ModalBody>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <iframe
                            src="https://campus.ccdcapacitacion.edu.pe/mod/customcert/verify_certificate.php"
                            width="100%"
                            height="100%"
                            style={{ clipPath: "inset(0 0 0 0)" }}
                          />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="solid"
                          onPress={onClose}
                        >
                          Cerrar
                        </Button>
                        {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </div>
          <div
            className="flex flex-col justify-center items-center "
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-colors-cyan-ccd text-4xl md:text-5xl lg:text-6xl font-extrabold mt-2">
              <span className="text-[30px] max-sm:text-[22px] font-bold">
                4 Puntos para{" "}
              </span>
            </h1>
            <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-extrabold neon-white">
              <span className="text-white text-[30px]">
                VALIDAR TU CERTIFICADO
              </span>
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="flex max-lg:grid max-lg:grid-cols-2 gap-24 max-lg:gap-10 max-sm:gap-5 max-sm:p-4">
              <div
                className="flex flex-col gap-4 justify-center items-center group"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="border-5 border-colors-cyan-ccd p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/Multimedia/Imagen/Validacion/Vector QR.svg"
                    alt=""
                    className="size-14 max-sm:size-9"
                  />
                </div>
                <h1 className="text-white text-xl text-center">
                  QR de verificación
                </h1>
                <hr className="w-[40%] border-3 border-blue-500 rounded-full group-hover:w-full transition-all duration-500 ease-in-out delay-200" />

                <h2 className="text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 text-center transition-all duration-500 ease-in-out delay-300">
                  Código de validación <br /> web y código QR.
                </h2>
              </div>
              <div
                className="flex flex-col gap-4 justify-center items-center group"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="border-5 border-colors-cyan-ccd p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/Multimedia/Imagen/Validacion/Vector NOTA.svg"
                    alt=""
                    className="size-14 max-sm:size-9"
                  />
                </div>
                <h1 className="text-white text-xl text-center">
                  Nota Aprobatoria
                </h1>
                <hr className="w-[40%] border-3 border-blue-500 rounded-full group-hover:w-full transition-all duration-300" />
                <h2 className="text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 text-center transition-all duration-500 ease-in-out delay-300">
                  Nota final mínima
                  <br />
                  de 14 puntos
                </h2>
              </div>
              <div
                className="flex flex-col gap-4 justify-center items-center group"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="border-5 border-colors-cyan-ccd p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/Multimedia/Imagen/Validacion/Vector CONTENIDO.svg"
                    alt=""
                    className="size-14 max-sm:size-9"
                  />
                </div>
                <h1 className="text-white text-xl text-center">Contenido</h1>
                <hr className="w-[50%] border-3 border-blue-500 rounded-full group-hover:w-full transition-all duration-300" />
                <h2 className="text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 text-center transition-all duration-500 ease-in-out delay-300">
                  Contenido del curso o diploma
                  <br />
                  de alta especialización.
                </h2>
              </div>
              <div
                className="flex flex-col gap-4 justify-center items-center group"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="border-5 border-colors-cyan-ccd p-6 rounded-full group-hover:scale-1  10 transition-transform duration-300">
                  <img
                    src="/Multimedia/Imagen/Validacion/Vector FIRMA.svg"
                    alt=""
                    className="size-14 max-sm:size-9"
                  />
                </div>
                <h1 className="text-white text-xl text-center">Firma</h1>
                <hr className="w-[50%] border-3 border-blue-500 rounded-full group-hover:w-full transition-all duration-300" />
                <h2 className="text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 text-center transition-all duration-500 ease-in-out delay-300">
                  Firma de representantes con
                  <br /> grado académico.{" "}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
