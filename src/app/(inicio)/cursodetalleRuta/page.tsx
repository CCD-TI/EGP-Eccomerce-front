"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5"; // Asegúrate de instalar react-icons si no lo tienes
import "aos/dist/aos.css"; // Importa los estilos de AOS
import {
  FaArrowRight,
  FaBookBookmark,
  FaCartShopping,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa6";
import AOS from "aos"; // Importa AOS
import Link from "next/link";
import { BiSolidLike } from "react-icons/bi";
import { TiPlus } from "react-icons/ti";
import { HiDocumentArrowDown, HiOutlinePlus } from "react-icons/hi2";
import { IoIosTime } from "react-icons/io";
import RutaVideo from "@/components/ui/paul/RutaVideo";
import RutaCarrusel from "@/components/ui/paul/RutaCarrusel";
import RutaEnd from "@/components/ui/paul/RutaEnd";

const SchoolsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: true, // Si la animación se ejecuta solo una vez
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
      // delay: 500,
      // startEvent: 'load'
    });
  }, []);

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const [isOpen, setIsOpen] = useState(false);

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const logos = {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/gestion.png`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/gestion.png`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/gestion.png`,
  };

  return (
    <>
      <div className="flex   relative w-full overflow-hidden justify-center items-center">
        {/* Degradados radiales */}
        <div
          className="absolute -left-80  w-[750px] h-[600px] pointer-events-none "
          style={{
            background:
              "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%",
          }}
        />
        <div
          className="w-full overflow-hidden flex justify-center items-center py-10 z-20"
          data-aos="zoom-in-down"
          data-aos-anchor-placement="top-bottom"
        >
          <div
            className="h-full w-[90%]   
              flex flex-col justify-center items-center gap-7 mx-auto z-50"
          >
            <div className=" flex gap-6  rounded-2xl ">
              <div className="w-[35%]  p-6 rounded-2xl ">
                <img
                  src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Cursos/Portada/BIM%20REVIT%20ARQUITECTURA.png"
                  className="rounded-2xl"
                  alt=""
                />
                <div className="flex flex-col gap-6 text-white mt-4">
                  <h1 className="flex gap-2 items-center justify-center">
                    <span className="flex gap-2 items-center">
                      <FaUser /> 00000 integrantes{" "}
                    </span>
                    <span className="font-bold text-colors-cyan-ccd">|</span>
                    <span className="flex gap-2 items-center">
                      <BiSolidLike /> 99% (7k){" "}
                    </span>
                  </h1>
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-sm  mb-1">Comprar Ahora</h1>
                      <div className="flex items-center gap-2 ">
                        <Link href="/pago" className="w-full  p-2 px-4 rounded-xl bg-colors-cyan-ccd text-colors-dark-blue-ccd  text-4xl font-bold">
                          S/2345.00
                        </Link>
                        <h1 className="flex size-full  items-center line-through decoration-colors-cyan-ccd decoration-2 text-xl font-light">
                          
                          S/2445.00
                        </h1>
                      </div>
                    </div>

                    <div>
                      <h1 className="text-xs my-1">Agregar al carrito</h1>
                      <div className="flex items-center">
                        <HiOutlinePlus  className="size-14" />
                        <FaCartShopping className="size-16" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-4 flex items-center justify-center rounded-xl bg-white ">
                    <button className="flex items-center text-colors-sky-ccd gap-2 text-2xl">
                      
                      <FaWhatsapp className="size-10" /> Más Información
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[65%] flex flex-col gap-4 text-white p-6">
                <div className="w-full flex gap-6">
                  <div className="w-full flex flex-col gap-3">
                    <h1 className=" w-full text-3xl">rutas retoricas</h1>
                    <div className="w-full h-[2px] bg-[#3185F7] "></div>
                    <h2>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Vel, omnis maxime enim delectus earum atque, autem
                      quibusdam consectetur vero, ad velit amet cupiditate. Ut,
                      atque aut. Nisi modi dignissimos sint!
                    </h2>
                  </div>
                </div>

                <div className="relative cursor-pointer flex w-full items-center gap-2">
                  <div className="w-full flex items-center gap-2 relative pl-[25px]">
                    <div className="w-full flex  justify-between">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg relative top-[16px] left-[-35px] ">
                        <span className="text-xl font-bold text-cyan-400">
                          1
                        </span>
                        <div className="absolute right-[-2px] bg-cyan-400 h-2 w-2 rounded-full"></div>
                      </div>
                      <img
                        src={logos.gestion}
                        alt="Logo Gestión"
                        className="size-[5rem] absolute -top-[6.5px] left-[25px]"
                      />

                      <Accordion variant="splitted" className="">
                        <AccordionItem
                          key="1"
                          aria-label="Accordion 1"
                          title={<div className="pl-10">INGENIERÍA GEOLÓGICA APLICADA A OBRAS CIVILES Y MINERA </div>}
                          className="mb-2 bg-transparent border-[#0E4C5A] border-2   "
                        >
                          <div className="flex gap-4">
                            <Button
                              className="bg-colors-sky-ccd  text-white"
                              endContent={
                                <HiDocumentArrowDown className="size-5" />
                              }
                            >
                              Brochure
                            </Button>

                            <h1 className="flex gap-2 items-center justify-center">
                              <span className="flex gap-2 items-center">
                                <FaBookBookmark className="text-colors-cyan-ccd" /> 00 Módulos
                              </span>
                              <span className="font-bold text-colors-cyan-ccd">
                                |
                              </span>
                              <span className="flex gap-2 items-center">
                                <IoIosTime className="text-colors-cyan-ccd" size={18} />00 Horas
                              </span>
                            </h1>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="relative cursor-pointer flex w-full items-center gap-2">
                  <div className="w-full flex items-center gap-2 relative pl-[25px]">
                    <div className="w-full flex  justify-between">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg relative top-[16px] left-[-35px] ">
                        <span className="text-xl font-bold text-cyan-400">
                          1
                        </span>
                        <div className="absolute right-[-2px] bg-cyan-400 h-2 w-2 rounded-full"></div>
                      </div>
                      <img
                        src={logos.gestion}
                        alt="Logo Gestión"
                        className="size-[5rem] absolute -top-[6.5px] left-[25px]"
                      />

                      <Accordion variant="splitted" className="">
                        <AccordionItem
                          key="1"
                          aria-label="Accordion 1"
                          title={<div className="pl-10">INGENIERÍA GEOLÓGICA APLICADA A OBRAS CIVILES Y MINERA </div>}
                          className="mb-2 bg-transparent border-[#0E4C5A] border-2  "
                        >
                          <div className="flex gap-4">
                            <Button
                              className="bg-colors-sky-ccd  text-white"
                              endContent={
                                <HiDocumentArrowDown className="size-5" />
                              }
                            >
                              Brochure
                            </Button>

                            <h1 className="flex gap-2 items-center justify-center">
                              <span className="flex gap-2 items-center">
                                <FaBookBookmark className="text-colors-cyan-ccd" /> 00 Módulos
                              </span>
                              <span className="font-bold text-colors-cyan-ccd">
                                |
                              </span>
                              <span className="flex gap-2 items-center">
                                <IoIosTime className="text-colors-cyan-ccd" size={18} />00 Horas
                              </span>
                            </h1>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="relative cursor-pointer flex w-full items-center gap-2">
                  <div className="w-full flex items-center gap-2 relative pl-[25px]">
                    <div className="w-full flex  justify-between">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg relative top-[16px] left-[-35px] ">
                        <span className="text-xl font-bold text-cyan-400">
                          1
                        </span>
                        <div className="absolute right-[-2px] bg-cyan-400 h-2 w-2 rounded-full"></div>
                      </div>
                      <img
                        src={logos.gestion}
                        alt="Logo Gestión"
                        className="size-[5rem] absolute -top-[6.5px] left-[25px]"
                      />

                      <Accordion variant="splitted" className="">
                        <AccordionItem
                          key="1"
                          aria-label="Accordion 1"
                          title={<div className="pl-10">INGENIERÍA GEOLÓGICA APLICADA A OBRAS CIVILES Y MINERA </div>}
                          className="mb-2 bg-transparent border-[#0E4C5A] border-2  "
                        >
                          <div className="flex gap-4">
                            <Button
                              className="bg-colors-sky-ccd  text-white"
                              endContent={
                                <HiDocumentArrowDown className="size-5" />
                              }
                            >
                              Brochure
                            </Button>

                            <h1 className="flex gap-2 items-center justify-center">
                              <span className="flex gap-2 items-center">
                                <FaBookBookmark className="text-colors-cyan-ccd" /> 00 Módulos
                              </span>
                              <span className="font-bold text-colors-cyan-ccd">
                                |
                              </span>
                              <span className="flex gap-2 items-center">
                                <IoIosTime className="text-colors-cyan-ccd" size={18} />00 Horas
                              </span>
                            </h1>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="relative cursor-pointer flex w-full items-center gap-2">
                  <div className="w-full flex items-center gap-2 relative pl-[25px]">
                    <div className="w-full flex  justify-between">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg relative top-[16px] left-[-35px] ">
                        <span className="text-xl font-bold text-cyan-400">
                          1
                        </span>
                        <div className="absolute right-[-2px] bg-cyan-400 h-2 w-2 rounded-full"></div>
                      </div>
                      <img
                        src={logos.gestion}
                        alt="Logo Gestión"
                        className="size-[5rem] absolute -top-[6.5px] left-[25px]"
                      />

                      <Accordion variant="splitted" className="">
                        <AccordionItem
                          key="1"
                          aria-label="Accordion 1"
                          title={<div className="pl-10">INGENIERÍA GEOLÓGICA APLICADA A OBRAS CIVILES Y MINERA </div>}
                          className="mb-2 bg-transparent border-[#0E4C5A] border-2  "
                        >
                          <div className="flex gap-4">
                            <Button
                              className="bg-colors-sky-ccd  text-white"
                              endContent={
                                <HiDocumentArrowDown className="size-5" />
                              }
                            >
                              Brochure
                            </Button>

                            <h1 className="flex gap-2 items-center justify-center">
                              <span className="flex gap-2 items-center">
                                <FaBookBookmark className="text-colors-cyan-ccd" /> 00 Módulos
                              </span>
                              <span className="font-bold text-colors-cyan-ccd">
                                |
                              </span>
                              <span className="flex gap-2 items-center">
                                <IoIosTime className="text-colors-cyan-ccd" size={18} />00 Horas
                              </span>
                            </h1>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="relative cursor-pointer flex w-full items-center gap-2">
                  <div className="w-full flex items-center gap-2 relative pl-[25px]">
                    <div className="w-full flex  justify-between">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg relative top-[16px] left-[-35px] ">
                        <span className="text-xl font-bold text-cyan-400">
                          1
                        </span>
                        <div className="absolute right-[-2px] bg-cyan-400 h-2 w-2 rounded-full"></div>
                      </div>
                      <img
                        src={logos.gestion}
                        alt="Logo Gestión"
                        className="size-[5rem] absolute -top-[6.5px] left-[25px]"
                      />

                      <Accordion variant="splitted" className="">
                        <AccordionItem
                          key="1"
                          aria-label="Accordion 1"
                          title={<div className="pl-10">INGENIERÍA GEOLÓGICA APLICADA A OBRAS CIVILES Y MINERA </div>}
                          className="mb-2 bg-transparent border-[#0E4C5A] border-2  "
                        >
                          <div className="flex gap-4">
                            <Button
                              className="bg-colors-sky-ccd  text-white"
                              endContent={
                                <HiDocumentArrowDown className="size-5" />
                              }
                            >
                              Brochure
                            </Button>

                            <h1 className="flex gap-2 items-center justify-center">
                              <span className="flex gap-2 items-center">
                                <FaBookBookmark className="text-colors-cyan-ccd" /> 00 Módulos
                              </span>
                              <span className="font-bold text-colors-cyan-ccd">
                                |
                              </span>
                              <span className="flex gap-2 items-center">
                                <IoIosTime className="text-colors-cyan-ccd" size={18} />00 Horas
                              </span>
                            </h1>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute -right-80  w-[750px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #265495 0%, rgba(38,84,149,0.5) 23%,rgba(38,84,149,0.15) 45%,rgba(38,84,149,0.03) 60%, rgba(19,25,57,0.7) 70%, rgba(19,25,57,1) 85%, rgba(19,25,57,1) 100%",
          }}
        />
      </div>
      <RutaVideo/>
      <RutaCarrusel/>
      <RutaEnd/>
    </>
  );
};

export default SchoolsSection;
