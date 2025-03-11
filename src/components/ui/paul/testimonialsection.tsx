import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LogsIcon } from "lucide-react";

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
    test: `${storageUrl}/Multimedia/Imagen/Ccd/Banners/Secuencia-anidada-030.png`,
    test2: `${storageUrl}/Multimedia/Imagen/Ccd/Banners/Secuencia-anidada-031.png`,
    test3: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/Secuencia-anidada-032-(1).png`,
  },
  fondos: {
    testimonios: `${storageUrl}/Multimedia/Imagen/Ccd/Pruebas/testimonios.png`,
  },
};

const videos = {
  testimonios: {
    test1: `${storageUrl}/Multimedia/Video/Ccd/Home/ANUAR - TESTIMONIO - PREMIERE FINAL.mp4`,
    test2: `${storageUrl}/Multimedia/Video/Ccd/Home/INGENIERA - TESTIMONIO - LÍNEA CCD- CHRIS - PREMIERE FINAL (1).mp4`,
    test3: `${storageUrl}/Multimedia/Video/Ccd/Home/Jordy Rosas CCD (1).mp4`,
  },
};

const TestimonialsSection = () => {
  // Usamos useRef para acceder al video
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
    if (videoRef1.current) {
      videoRef1.current.play(); // Inicia el video cuando el cursor entra
    }
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
    if (videoRef1.current) {
      videoRef1.current.pause(); // Pausa el video cuando el cursor sale
      videoRef1.current.currentTime = 0; // Reinicia el video a su primer frame
    }
  };
  // Video 2
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
    if (videoRef2.current) {
      videoRef2.current.play();
    }
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
    if (videoRef2.current) {
      videoRef2.current.pause();
      videoRef2.current.currentTime = 0;
    }
  };

  // Video 3
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleMouseEnter3 = () => {
    setIsHovered3(true);
    if (videoRef3.current) {
      videoRef3.current.play();
    }
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
    if (videoRef3.current) {
      videoRef3.current.pause();
      videoRef3.current.currentTime = 0;
    }
  };
 

  return (
    <section
      className="relative bg-center-bottom py-16 px-6 lg:px-24 max-sm:py-9"
      style={{
        backgroundImage: `url(${img.fondos.testimonios})`,
      }}
    >
      <div className="max-w-7xl mx-auto text-center max-sm:">
        {/* Títulos */}
        <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-extrabold neon-white">
          TESTIMONIOS
        </h2>
        <h3 className="text-colors-cyan-ccd text-center text-3xl md:text-5xl font-bold mt-4">
          de nuestros estudiantes
        </h3>
        <p className="text-white text-base md:text-lg my-4 pb-14 max-w-3xl mx-auto">
          Nuestros alumnos son la mejor evidencia de nuestra excelencia,
          profesionales comprometidos que llevan su aprendizaje a nuevos niveles
          y destacan en sus campos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10   ">
          <section
            className="group relative z-10 flex flex-col items-center overflow-hidden cursor-pointer"
            style={{ perspective: "800px" }}
          >
            <span className="rounded-xl h-[6px] w-20 group-hover:w-32 bg-colors-sky-ccd group-hover:bg-colors-cyan-ccd transition-all duration-400 ease-in-out delay-200"></span>{" "}
            {/* Linea superior */}
            <div
              className="relative  overflow-hidden rounded-2xl"
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
            >
              {/* Imagen de portada */}
              {!isHovered1 && (
                <img src={img.logos.test} alt="Imagen 1" className="" />
              )}
              {/* Video */}
              <video
                ref={videoRef1}
                className={` w-full h-full object-cover rounded-lg ${
                  isHovered1 ? "" : "hidden"
                }`}
                src={videos.testimonios.test3}
               
              />
            </div>
          </section>
          <section
            className="group relative z-10 flex flex-col items-start md:items-center overflow-hidden cursor-pointer"
            style={{ perspective: "800px" }}
          >
            <span className="rounded-xl h-[6px] w-20 group-hover:w-32 bg-colors-sky-ccd group-hover:bg-colors-cyan-ccd transition-all duration-400 ease-in-out delay-200"></span>{" "}
            {/* Linea superior */}
            <motion.div
              className="relative  overflow-hidden  rounded-2xl"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              {/* Imagen de portada */}
              {!isHovered2 && (
                <img src={img.logos.test2} className="rounded-lg" />
              )}
              {/* Video */}
              <video
                ref={videoRef2}
                className={` w-full h-full object-cover rounded-lg ${
                  isHovered2 ? "" : "hidden"
                }`}
                src={videos.testimonios.test2}
               
              />
            </motion.div>
          </section>
          <section
            className="group relative z-10 max-lg:w-[50%]  cursor-pointer flex flex-col items-start md:items-center overflow-hidden mx-auto max-lg:col-span-2 max-sm:col-span-1 max-sm:w-full"
            style={{ perspective: "800px" }}
          >
            <span className="rounded-xl h-[6px] w-20 group-hover:w-32 bg-colors-sky-ccd group-hover:bg-colors-cyan-ccd transition-all duration-400 ease-in-out delay-200"></span>{" "}
            <motion.div
              className="relative overflow-hidden  rounded-2xl"
              onMouseEnter={handleMouseEnter3}
              onMouseLeave={handleMouseLeave3}
            >
              {/* Imagen de portada */}
              {!isHovered3 && (
                <img
                  src={img.logos.test3 }
                  alt="Imagen 3"
                  
                  className="rounded-lg"
                />
              )}
              {/* Video */}
              <video
                ref={videoRef3}
                className={` w-full h-full object-cover rounded-lg ${
                  isHovered3 ? "" : "hidden"
                }`}
                src={videos.testimonios.test1}
               
              />
            </motion.div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
