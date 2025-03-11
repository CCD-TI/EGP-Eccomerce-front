import React from "react";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const img = {
  main: `${storageUrl}/Multimedia/Imagen/Ccd/Fondos/corporativo-main.png`,
};

const WorkWithUs: React.FC = () => {
  return (
    <div className="h-[700px]   relative  px-6 lg:px-22 py-6 place-items-center ">
      {/* Imagen posicionada a la derecha */}
      <img
        src="/Multimedia/Imagen/ccdcorp/ccd-con-la-cara-extraña 2.png"
        alt="Trabaja con nosotros"
        className="absolute right-0 top-0 h-full object-cover opacity-80"
      />
      <img
        src="/Multimedia/Imagen/ccdcorp/Ellipseizquierda.png"
        alt="Trabaja con nosotros"
        className="absolute left-0 top-0 h-full object-cover opacity-80"
      />
      
      {/* Contenido principal */}
      <div className=" max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 h-full place-items-center pl-10">
     
        {/* Primera columna */}
        <div className="w-full mx-auto  text-center">
        <nav aria-label="breadcrumb" className="mb-10 pt-10">
          <ol className="flex space-x-4 text-white">
            <Link href="/">
              <h1 className="flex items-center gap-1"><IoIosArrowBack className="text-3xl font-bold" />Volver al Inicio</h1>
           </Link>
    
          </ol>
        </nav>
          {/* Títulos */}
          <h2 className="text-white text-6xl max-lg:text-5xl font-semibold text-left  pb-2  neon-white max-sm:text-center">
            ¡Potencia tu Equipo y
          </h2>
          <h3 className="text-colors-cyan-ccd  text-6xl  max-lg:text-4xl text-left font-semibold neon-cyan max-sm:text-center  ">
            Domina el Mercado!
          </h3>
          <p className="text-white text-left text-2xl md:text-sm mt-4 max-w-lg max-lg:text-xl mr-auto max-sm:text-center">
            El momento es ahora, invierte en la capacitación de tus
            colaboradores y observa cómo su rendimiento se traduce en resultados
            concretos para la empresa. En CCD, transformamos el conocimiento en
            acción.
          </p>
          <div className="mx-auto py-10 flex gap-2">
            {/* Columna 1 */}
            <div className="flex  items-center max-sm:mx-auto justify-center gap-6">
              <div>
                <button
                  className="flex items-center gap-3 px-6 py-3 bg-white text-colors-midnight-blue-ccd2 font-bold text-lg rounded-2xl shadow-lg 
                hover:bg-colors-midnight-blue-ccd2 hover:text-white border-1 hover:border-white hover:border-1 hover:animate-buzz transition duration-500"
                >
                  <MdEmail size={24} />
                  <span>Contáctanos</span>
                </button>
              </div>
              <div>
                <button
                  className="flex items-center gap-3 px-6 py-3 bg-colors-cyan-ccd text-colors-night-blue-ccd2 font-bold text-lg rounded-2xl shadow-lg 
                hover:bg-colors-midnight-blue-ccd2 hover:text-white border-1 border-transparent hover:border-white hover:border-1 hover:animate-buzz transition duration-500"
                >
                  <FaWhatsapp size={24} />
                  <span>WhastApp</span>
                </button>
              </div>
            </div>
          </div>
        
        </div>
        
        <div></div>
      </div>
    </div>
  );
};

export default WorkWithUs;
