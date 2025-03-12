import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const CertificateModel = () => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const images = {
    c1: `${storageUrl}/Multimedia/Imagen/Ccd/Certificados/certificado-01.png`,
    c2: `${storageUrl}/Multimedia/Imagen/Ccd/Certificados/certificado-02.png`,
  };
  return (
    <div className="relative bg-[#151517] w-full pt-12 pb-32 px-6 lg:px-24 h-[650px] max-lg:h-auto">
      {/* Contenedor Principal */}
      <div className="max-w-7xl h-full mx-auto flex flex-col justify-center lg:flex-row items-center sm:gap-32 lg:gap-56">
        {/* Imágenes del Certificado */}
        <div className="-ml-36 lg:ml-0 relative flex justify-center items-center">
          {/* Certificado trasero */}
          <div className="absolute w-[300px] hover:z-10 md:w-[400px] lg:w-[450px] max-sm:w-[220px] rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:brightness-105">
            <img src={images.c2} alt="Certificado trasero" className="w-full" />
          </div>
          {/* Certificado delantero */}
          <div className="relative top-20 left-32 w-[300px] md:w-[400px] lg:w-[450px] max-sm:w-[220px] rounded-2xl shadow-xl overflow-hidden hover:brightness-105">
            <img
              src={images.c1}
              alt="Certificado delantero"
              className="w-full"
            />
          </div>
        </div>

        {/* Información del Certificado */}
        <div className="mt-32 xl:mt-14  max-sm:p-6 p-8 
        rounded-3xl  shadow-lg flex flex-col gap-6  ">
          <h2 className="text-colors-egp-gold text-center text-3xl md:text-5xl font-bold">
            Modelo de
            <br/>
            <span
              className="text-7xl max-sm:text-5xl text-center text-colors-dark-blue-ccd font-bold tracking-wide neon-white"  
            >
              CERTIFICADO
            </span>
          </h2>
          <p className="text-white text-center text-sm md:text-base mx-auto">
            Tu certificado contará con los{" "}
            <span className="font-bold text-sm md:text-base">4 puntos clave</span> para ser válido.
          </p>

          {/* Lista de Puntos */}
          <ul className="text-white text-sm md:text-base space-y-2 pl-6">
            <li className="flex items-center gap-2">
              <FaCircleCheck className="mr-2 text-colors-egp-gold" />
              Certificado con código único.
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="mr-2 text-colors-egp-gold" />
              Nota mínima aprobatoria de 14.
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="mr-2 text-colors-egp-gold" />
              Contenido del curso.
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="mr-2 text-colors-egp-gold" />
              Firmas de los representantes con grados académicos.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CertificateModel;
