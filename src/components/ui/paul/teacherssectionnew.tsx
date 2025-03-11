import React, { useRef } from "react";

import { motion } from "framer-motion";

const TeachersSectionNew = () => {
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
    <div className="">
      <div>
        <section className="group z-50 flex justify-center items-center">
          {/* <span className="rounded-xl h-[6px] w-20 group-hover:w-28 bg-colors-sky-ccd group-hover:bg-colors-cyan-ccd transition duration-500"></span> Linea superior */}
          <motion.div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <video
                ref={videoRef} // Referencia al video
                className="video-vertical z-50"
                width={1080}
                src="Multimedia/Imagen/Ccd/Pruebas/web-docentes-corto.mp4" // Asegúrate de colocar aquí la ruta correcta de tu video
                controls={false} // Desactivamos los controles
                style={{
                  borderRadius: "10px",
                  position: "static",
                  cursor: "pointer",
                }} // Añadimos cursor pointer
                onClick={handleVideoClick} // Asignamos la función al clic
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default TeachersSectionNew;
