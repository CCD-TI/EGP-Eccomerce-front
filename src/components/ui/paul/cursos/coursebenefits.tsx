"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
  href: string;
  videoUrl: string;
}

export default function CourseBenefits() {
  const videoRef = useRef<HTMLVideoElement>(null);
    const [activeStep, setActiveStep] = useState(1);
    // Usamos useRef para acceder al video
   
    const [isInView, setIsInView] = useState(false);
  
    useEffect(() => {
      const videoElement = videoRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            // El video entra en la zona visible, reproducirlo y quitar mute
            videoElement?.play().catch((error) => {
              console.log('Error al reproducir el video:', error);
            });
            if (videoElement) {
              videoElement.muted = false;
              setIsInView(true);
            }
          } else {
            // El video sale de la zona visible, pausarlo y ponerlo en mute
            if (videoElement) {
              videoElement.pause();
              videoElement.muted = true;
              setIsInView(false);
            }
          }
        },
        { threshold: 0.5 } // Se activa cuando el 50% del video es visible
      );
  
      if (videoElement) {
        observer.observe(videoElement);
      }
  
      return () => {
        if (videoElement) {
          observer.unobserve(videoElement);
        }
      };
    }, []);
  
    const handleMouseEnter = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.muted = false;  // Desactivar mute al hacer hover
        videoElement.play().catch((error) => {
          console.log('Error al reproducir al hacer hover:', error);
        });
      }
    };
  
    const handleMouseLeave = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.pause();  // Pausar el video
        videoElement.muted = true;  // Activar mute nuevamente
      }
    };
  

  const navItems: NavItem[] = [
    { id: "conocenos", label: "Conócenos", href: "/conocenos", videoUrl: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Video/Ccd/Home/VIDEO%20INSTITUCIONAL%202024_FINAL_2.mp4" },
    { id: "beneficios", label: "Beneficios", href: "/beneficios", videoUrl: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Video/Ccd/Home/video%20beneficios.mp4" },
    { id: "testimonios", label: "Testimonios", href: "/testimonios", videoUrl: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Video/Ccd/Home/final%20testimonio%20con%20transiciones.mp4" },
    { id: "validacion", label: "Validación de certificado", href: "/validacion", videoUrl: "https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Video/Ccd/Home/Certificados%20Validos%201920%20x1080.mp4" },
  ];

  const [activeItem, setActiveItem] = useState("conocenos");
  const [videoUrl, setVideoUrl] = useState(navItems[0].videoUrl);

  const handleNavClick = (id: string, url: string) => {
    setActiveItem(id);
    setVideoUrl(url); // Cambia la URL del video
    if (videoRef.current) {
      videoRef.current.load(); // Recarga el video para cambiarlo
    }
  };

  return (
    <section className="flex flex-col justify-center gap-20 items-center px-6 py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden bg-CursoDetalle">
      <h2 className="flex flex-col text-center">
        <span className="text-5xl font-bold neon-white">BENEFICIOS</span>
        <span className="text-cyan-400 text-4xl font-bold">Del Curso</span>
      </h2>

      <div className="flex items-center gap-8 justify-center w-full max-lg:flex-col" onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave}>
         
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="flex justify-center items-center">
            <video
              ref={videoRef}
              className="cursor-pointer rounded-xl shadow-lg"
              width={800}
              src={videoUrl}
              controls={false}
              autoPlay
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                }
              }}
            />
          </div>
        </motion.div>

        <nav className="w-full max-w-xs max-lg:max-w-[80%] rounded-xl p-2 grid grid-cols-1 max-lg:grid-cols-2  max-sm:grid-cols-1 max max-lg:gap-10 ">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <input
                type="checkbox"
                id={item.id}
                checked={activeItem === item.id}
                onChange={() => handleNavClick(item.id, item.videoUrl)}
                className="peer sr-only"
              />
              <label
                htmlFor={item.id}
                className={`relative my-4 flex items-center w-full p-8 text-base font-medium rounded-2xl cursor-pointer transition-colors ${
                  activeItem === item.id
                    ? "text-white !bg-[#23548B]"
                    : "text-gray-400 hover:text-white hover:bg-[#23548B]/50"
                }`}
              >
                <span className="ml-4 font-semibold text-center w-full text-2xl">{item.label}</span>
              </label>
              {activeItem === item.id && (
                <>
                  <span className="absolute left-0 top-[45%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-colors-cyan-ccd" />
                  <span className="absolute left-0 top-[45%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 !bg-colors-cyan-ccd" />
                  <hr className="w-full border-colors-cyan-ccd border-[1px] " />
                </>
              )}
            
            
              <span className="absolute left-0 top-[45%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"  />
              
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
