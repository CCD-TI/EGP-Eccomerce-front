import React, { useRef } from "react";

import { motion } from "framer-motion";

const TeachersSection = () => {
  // Usamos useRef para acceder al video
  const videoRef = useRef<HTMLVideoElement>(null);

  // Función para alternar play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="bg-landing-video">

    <div className=" max-w-[100rem]  mx-auto max-lg:bg-none  max-lg:py-10 ">
      <div className="w-full  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
        {/* Columna Izquierda */}
        <div className="w-full p-4 text-left">
          <h2 className="text-colors-egp-gold text-center text-3xl md:text-6xl font-extrabold">
            Docentes de
            <br />
            <span className="text-7xl max-sm:text-4xl text-center text-colors-dark-blue-ccd font-extrabold tracking-wide neon-white">
              EXCELENCIA
            </span>
          </h2>
          <p className="text-white max-sm:text-center text-xl  max-xl:text-2xl max-sm:text-base mt-6">
            En CCD, contamos con docentes de amplia experiencia y conocimientos,
            que impartirán las sesiones con base práctica con enfoque aplicativo
            al ámbito laboral y así garantizar tu aprendizaje.
          </p>
        </div>

       
        <section
          className="group relative z-10 flex justify-center items-center overflow-hidden "
          style={{ perspective: "800px" }}
        >
          {/* <span className="rounded-xl h-[6px] w-20 group-hover:w-28 bg-colors-sky-ccd group-hover:bg-colors-cyan-ccd transition duration-500"></span> Linea superior */}
          <motion.div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <video
              
                className="video-vertical   "
                src="/Multimedia/Video/web-docentes-azul-oscuro.mp4" // Asegúrate de colocar aquí la ruta correcta de tu video
                controls={false} // Desactivamos los controles
                style={{ position: "static", cursor: "pointer" }} // Añadimos cursor pointer
                muted
                autoPlay // Autoplay
                loop
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default TeachersSection;
