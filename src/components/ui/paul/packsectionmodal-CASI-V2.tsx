import React from "react";
import { FaCircleCheck } from "react-icons/fa6"; // Icono de check
import CountdownTimerModal from "./countdowntimermodal"; // Asegúrate de importar correctamente este componente
import { IoMdCloseCircle } from "react-icons/io"; // Icono para el botón de cerrar

interface PacksSectionModalCasiProps {
  onClose: () => void; // Función que se ejecuta al cerrar el modal
}

const PacksSectionModalCasiV2: React.FC<PacksSectionModalCasiProps> = ({
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-y-auto"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="relative bg-colors-night-blue-ccd2 bg rounded-2xl max-h-[90vh] w-[90%] lg:w-[60%] p-6 shadow-lg overflow-y-auto bg-sectors-PromoForm2 ">
        {/* Botón de cierre */}
        <button
          className="absolute top-4 right-4 text-white hover:text-colors-cyan-ccd transition"
          onClick={onClose}
        >
          <IoMdCloseCircle size={30} />
        </button>

        {/* Título */}
        <div className="text-center mb-2">
          <h1 className="font-extrabold text-white">
            <span className="text-xl sm:text-3xl md:text-4xl mr-2">VERANO</span>
            <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-colors-sky-ccd">
              FEST
            </span>{" "}
            <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
              2025
            </span>
          </h1>

          {/* Texto central */}
          <h1
            className="text-5xl lg:text-6xl text-colors-dark-blue-ccd 
          font-extrabold tracking-wide neon-white text-center"
          >
            PROMOCIÓN
          </h1>

          <p
            className="text-lg md:text-xl lg:text-2xl text-white mt-2 border-2 border-colors-cyan-ccd 
          rounded-2xl px-2 py-1 inline-block shadow-[0_0_15px_7px_rgba(0,234,223,0.2)]"
          >
            HASTA UN 50% DSCTO
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-8 px-12">
          {/* Tarjeta Básico */}
          <div
            className="group bg-gradient-to-t from-colors-sky-ccd 
        to-colors-dark-blue-ccd shadow-lg
        p-2 w-[250px] sm:w-auto mx-auto sm:mx-0 rounded-2xl border-2 
        border-white hover:shadow-[0_0_15px_7px_rgba(49,133,247,0.5)]
        transition duration-300 hover:scale-105"
          >
            {/* hover:shadow-[0_0_15px_7px_rgba(49,133,247,0.5)] */}
            <h3 className="text-lg text-center text-white">Plan</h3>
            <h2 className="text-xl font-extrabold text-center text-colors-sky-ccd">
              BÁSICO
            </h2>
            <div className="w-4 h-[2px] mx-auto bg-colors-sky-ccd mt-2"></div>
            <div>
            <div>
              <ul className="mt-2 space-y-1 text-white">
                <li className="flex items-center text-sm">
                  <FaCircleCheck className="mr-2 text-colors-sky-ccd text-sm" />
                  1 Curso en vivo
                </li>
                <li className="flex items-center text-sm">
                  <FaCircleCheck className="mr-2 text-colors-sky-ccd text-sm" />
                  1 Curso asincrónico
                </li>
                <li className="flex items-center text-sm">
                  <FaCircleCheck className="mr-2 text-colors-sky-ccd text-sm" />
                  2 Certificados de CCD
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white text-base line-through text-center mt-3">
                S/ 1,399.99
              </p>
              <p className="text-2xl font-extrabold text-center text-white">
                <span className="relative top-[-10px] text-lg">S/</span>
                699.99
              </p>
            </div>
            </div>
        

            <div className="flex justify-center">
              <button
                className="border-colors-dark-blue-ccd border-2 
            border-[rgba(22,30,110,0.3)] text-white text-base font-bold 
            px-2 py-1 mt-3 rounded-2xl 
            group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] 
            group-hover:bg-colors-dark-blue-ccd transition duration-300"
              >
                Adquirir plan
              </button>
            </div>
          </div>

          {/* Tarjeta Intermedio */}
          <div
            className="group bg-gradient-to-t from-colors-cyan-ccd 
        to-colors-dark-blue-ccd shadow-lg 
        p-2 w-[250px] sm:w-auto mx-auto sm:mx-0 rounded-2xl border-2 
        border-white hover:shadow-[0_0_15px_7px_rgba(0,234,223,0.5)] 
        transition duration-300 hover:scale-105"
          >
            <h3 className="text-lg text-center text-white">Plan</h3>
            <h2 className="text-xl font-extrabold text-center text-white">
              PREMIUM
            </h2>
            <div className="w-4 h-[2px] mx-auto bg-white mt-2"></div>
            <ul className="mt-2 space-y-1 text-white">
              <li className="flex items-center text-sm">
                <FaCircleCheck className="mr-2 text-white text-sm" />1 Año de
                acceso total
              </li>
              <li className="flex items-center text-sm">
                <FaCircleCheck className="mr-2 text-white text-sm" />
                Más de 40 cursos
              </li>
              <li className="flex items-center text-sm">
                <FaCircleCheck className="mr-2 text-white text-sm" />
                Certificados ilimitados
              </li>
            </ul>
            <p className="text-white text-base line-through text-center mt-3">
              S/ 2,999.99
            </p>
            <p className="text-2xl font-extrabold text-center text-white">
              <span className="relative top-[-10px] text-lg">S/</span>
              1,499.99
            </p>
            <div className="flex justify-center">
              <button className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-base font-bold px-2 py-1 mt-3 rounded-2xl group-hover:scale-105 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300">
                Adquirir plan
              </button>
            </div>
          </div>

          {/* Tarjeta Premium */}
          <div
            className="group bg-gradient-to-t from-colors-violet-ccd2 
      to-colors-dark-blue-ccd shadow-lg p-2 w-[250px] sm:w-auto mx-auto sm:mx-0 rounded-2xl border-2 
      border-white hover:shadow-[0_0_15px_7px_rgba(98,50,250,0.5)] 
      transition duration-300 hover:scale-105"
          >
            <h3 className="text-lg text-center text-white">Plan</h3>
            <h2 className="text-xl font-extrabold text-center text-colors-cyan-ccd">
              PROFESIONAL
            </h2>
            <div className="w-4 h-[2px] mx-auto bg-colors-cyan-ccd mt-2"></div>
            <ul className="mt-2 space-y-1 text-white">
              <li className="flex items-center text-sm">
                <FaCircleCheck className="mr-2 text-colors-cyan-ccd text-sm" />2
                Cursos en vivo
              </li>
              <li className="flex items-center text-sm">
                <FaCircleCheck className="mr-2 text-colors-cyan-ccd text-sm" />2
                Cursos asincrónicos
              </li>
              <li className="flex items-center text-sm">
                <FaCircleCheck className="mr-2 text-colors-cyan-ccd text-sm" />4
                Certificados PMI
              </li>
            </ul>
            <p className="text-white text-base line-through text-center mt-3">
              S/ 1,999.99
            </p>
            <p className="text-2xl font-extrabold text-center text-white">
              <span className="relative top-[-10px] text-lg">S/</span>
              999.99
            </p>
            <div className="flex justify-center">
              <button className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-base font-bold px-2 py-1 mt-3 rounded-2xl group-hover:scale-105 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300">
                Adquirir plan
              </button>
            </div>
          </div>
        </div>
        {/* Texto final */}
        <p className="text-center my-3">
          <span className="text-2xl font-bold text-colors-sky-ccd inline-block mr-2">
            ¡Obtén acceso total a nuestros cursos!
          </span>
        </p>

        {/* Temporizador */}
        <div className="flex justify-center gap-2">
          <CountdownTimerModal targetDate="12/31/2025 23:59:59" />
        </div>
      </div>
    </div>
  );
};

export default PacksSectionModalCasiV2;
