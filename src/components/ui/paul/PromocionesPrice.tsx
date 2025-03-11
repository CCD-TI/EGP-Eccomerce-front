"use client";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import CountdownTimer from "@/components/ui/paul/countdowntimer"; // Asegúrate de tener el componente CountdownTimer
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { Modal } from "@mui/material"; // Importamos el Modal de Material-UI
import ShoppingProcess from "./carrito/shoppingprocess";
import ShoppingCartCourseSelector from "./carrito/shoppingcartcourseselector";
import { IoSearch } from "react-icons/io5";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
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
    pack: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/packCorp.png`,
  },
};

const PacksSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div
      className=" bg-PromoCorp py-16 "
      // style={{
      //   backgroundImage: `url(${img.fondos.pack})`,
      //   backgroundSize: "auto", // Mantiene el tamaño original
      //   backgroundRepeat: "no-repeat", // Evita repeticiones
      //   backgroundPosition: "center", // Centra la imagen
      // }}
    >
        
      <div>

      <div className="w-full h-full flex flex-col gap-14 justify-center items-center ">
        {/* Título principal */}
       
        <div className="text-center">
          <h1 className=" text-5xl max-sm:text-4xl font-extrabold text-colors-cyan-ccd">
            Paquetes
            {/* <span className="text-3xl mr-2">VERANO</span>
            <span className="text-3xl md:text-4xl font-extrabold text-colors-cyan-ccd">
              FEST
            </span>{" "}
            <span className="text-3xl md:text-4xl font-extrabold text-white">
              2025
            </span> */}
          </h1>
          <div className="flex flex-wrap justify-center items-center py-2 space-x-4">
            {/* Línea izquierda */}
            {/* <div>
              <span className="block bg-white w-0 md:w-24 lg:w-56 h-[6px] neon-white-cyan"></span>
            </div> */}

            {/* Texto central */}
            <div>
              <h1
                className=" text-5xl max-sm:text-4xl text-colors-dark-blue-ccd font-extrabold tracking-wide  text-center neon-white"
                // style={{
                //   WebkitTextStrokeWidth: "1px", // Ancho del trazo
                //   WebkitTextStrokeColor: "#00eadf", // Color neon
                // }}
              >
                CORPORATIVOS
              </h1>
            </div>

            {/* Línea derecha */}
            {/* <div>
              <span className="block bg-white w-0 md:w-24 lg:w-56 h-[6px] neon-white-cyan"></span>
            </div> */}
          </div>

          {/* <p className="text-2xl text-white mt-4 mb-4 border-2 border-colors-cyan-ccd rounded-2xl px-6 inline-block shadow-[0_0_15px_7px_rgba(0,234,223,0.2)]">
            HASTA UN 50% DSCTO
          </p> */}
        </div>

        {/* Tarjetas de precios */}
        <div className="flex flex-wrap justify-center items-center gap-10 mt-5">
          {/* Tarjeta Plan Básico */}
          <div className="group bg-gradient-to-t from-colors-sky-ccd to-colors-dark-blue-ccd shadow-lg p-6 w-[380px] h-fit rounded-2xl border-2 border-white hover:shadow-[0_0_15px_7px_rgba(49,133,247,0.4)] transition duration-300 hover:scale-105">
            <h3 className="text-3xl text-center text-white">Paquete</h3>
            <h2 className="text-4xl font-extrabold text-center text-colors-sky-ccd">
              BÁSICO
            </h2>
            <div className="w-8 h-[4px] mx-auto bg-colors-sky-ccd mt-2"></div>
            <ul className="mt-4 space-y-2 text-white">
              <li className="flex items-center font-sans text-lg">
                <FaCircleCheck className="mr-2 text-colors-sky-ccd text-lg" />1
               Acceso a cursos bàsicos.
              </li>
              <li className="flex items-center font-sans text-lg">
                <FaCircleCheck className="mr-2 text-colors-sky-ccd text-lg" />1
               evaluaciòn al finalizar
              </li>
              <li className="flex text-center items-center font-sans text-lg">
              
                Ideal para empresas que buscan formacion puntual.
              </li>
            </ul>
            <p className="text-white text-lg line-through text-center mt-4">
             desde
            </p>
            <p className="text-5xl font-extrabold text-center text-white">
              <span className="relative top-[-15px] text-2xl">$/</span>
              5,000
            </p>
            <p className="text-white text-lg  text-center mt-4">
            Por equipo de 20 personas
            </p>
            <div className="flex justify-center">
              <button
                className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                onClick={toggleModal} // Abre el modal
              >
                Adquirir Paquete
              </button>
            </div>
          </div>

          {/* Tarjeta Plan Premium */}
          <div className="group bg-gradient-to-t from-colors-cyan-ccd to-colors-dark-blue-ccd shadow-lg p-6 w-[380px] h-auto rounded-2xl border-2 border-white hover:shadow-[0_0_15px_7px_rgba(0,234,223,0.4)] transition duration-300 hover:scale-105">
            <h3 className="text-3xl text-center text-white">Paquete</h3>
            <h2 className="text-4xl font-extrabold text-center text-colors-cyan-ccd">
              PREMIUM
            </h2>
            <div className="w-8 h-[4px] mx-auto bg-white mt-2"></div>
            <ul className="mt-4 space-y-2 text-white">
              <li className="flex items-start text-lg">
                <FaCircleCheck className="mr-2 mt-1 text-white  text-lg" />
               Todas las funciones del paquete <br /> completo.
              </li>
              <li className="flex items-start text-lg">
                <FaCircleCheck className="mr-2 mt-1 text-white  text-lg" />
               Rutas de aprendizaje <br /> personalizados
              </li>
              <li className="flex items-start text-lg">
                <FaCircleCheck className="mr-2 mt-1 text-white  text-lg" />
               Acceso a toda la biblioteca de <br />cursos.
              </li>
              <li className="flex items-center text-lg">
                <FaCircleCheck className="mr-2 text-white  text-lg" />
              Soporte 24/7
              </li>
            </ul>
            <p className="text-white text-lg line-through text-center mt-4">
             desde
            </p>
            <p className="text-5xl font-extrabold text-center text-white">
              <span className="relative top-[-15px] text-2xl">$/</span>
              20,000
            </p>
            <p className="text-white text-lg  text-center mt-4">
            Por equipo de 20 personas.
            </p>
            <div className="flex justify-center">
              <button
                className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300
            group-hover:animate-buzz-scale"
                style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
              >
                Adquirir Paquete
              </button>
            </div>
          </div>

          {/* Tarjeta Plan Profesional */}
          <div className="group bg-gradient-to-t from-colors-violet-ccd2 to-colors-dark-blue-ccd shadow-lg p-6 w-[380px] h-fit  rounded-2xl border-2 border-white hover:shadow-[0_0_15px_7px_rgba(98,50,250,0.4)] transition duration-300 hover:scale-105">
            <h3 className="text-3xl text-center text-white">Paquete</h3>
            <h2 className="text-4xl font-extrabold text-center text-colors-violet-ccd2">
            Completo
            </h2>
            <div className="w-8 h-[4px] mx-auto bg-colors-cyan-ccd mt-2"></div>
            <ul className="mt-4 space-y-2 text-white">
              <li className="flex items-center text-lg">
                <FaCircleCheck className="mr-2 text-colors-violet-ccd2  text-lg" />
                Todas las funciones del paquete basico.
              </li>
              <li className="flex items-center text-lg">
                <FaCircleCheck className="mr-2 text-colors-violet-ccd2  w-[20px] h-[20px] " />
                Acceso a cursos especializados con certificaciòn.
              </li>
              <li className="flex items-center text-lg">
                <FaCircleCheck className="mr-2 text-colors-violet-ccd2  text-lg" />
                Reporte semanal completo.
              </li>
            </ul>
            <p className="text-white text-lg  text-center mt-4">
             desde
            </p>
            <p className="text-5xl font-extrabold text-center text-white">
              <span className="relative top-[-15px] text-2xl">$/</span>
              10,000
            </p>
            <p className="text-white text-lg  text-center mt-4">
            Por equipo de 20 personas
            </p>
          
            <div className="flex justify-center">
              <button
                className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 
            group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300 group-hover:animate-buzz-scale"
                style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
              >
                Adquirir Paquete
              </button>
            </div>
          </div>
        </div>

        {/* Texto final */}
        <p className="text-center my-5">
          <span className="text-xl text-white inline-block mr-2">
            CCD ofrece{" "}
            <span className="text-colors-cyan-ccd text-xl ">descuentos</span>{" "}
            para empresas que capaciten a{" "}
            <span className="text-colors-cyan-ccd text-xl ">
              más de 100 empleados
            </span>
            , asegurando así un costo más eficiente por colaborador.
          </span>
          {/* <span
            className="text-5xl font-extrabold text-colors-violet-ccd2 inline-block neon-white-cyan"
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#00eadf",
            }}
          >
            a nuestros cursos!
          </span> */}
        </p>

        {/* Temporizador */}
        {/* <div className="flex justify-center gap-4">
          <CountdownTimer targetDate="12/31/2024 23:59:59" />
        </div> */}
      </div>
      </div>
      {/* Modal */}
      <Modal open={isModalOpen} onClose={toggleModal}>
        <div className="bg-[#0A1128] rounded-2xl shadow-lg p-6 w-[85%] h-[650px] my-10 mx-auto">
          {/* Contenido del modal */}
          <button
            onClick={toggleModal}
            className="text-gray-500 hover:text-gray-800 absolute top-4 right-4"
          >
            ✕
          </button>
          <ShoppingProcess />
          <ShoppingCartCourseSelector precioplan={0} idplan={0}/>
        </div>
      </Modal>
    </div>
  );
};

export default PacksSection;
