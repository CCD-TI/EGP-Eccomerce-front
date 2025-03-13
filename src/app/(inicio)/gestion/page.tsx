"use client";
import React, { useEffect } from "react";
import BannerCarouselCollege from "@/components/ui/paul/bannercarouselcollege";
import CollegeSections from "@/components/ui/paul/collegessections";
import CollegeCourseSection from "@/components/ui/paul/collegecoursesection";
import PacksSection from "@/components/ui/paul/packsection";
import AOS from "aos"; // Importa AOS
import PopoverStruc from "@/components/ui/paul/PopoverStruc";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: true, // Si la animación se ejecuta solo una vez
      mirror: true, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
      // delay: 500,
      // startEvent: 'load'
    });
  }, []);
  return (
    <>
      <div className="bg-[#151517] ">
        <BannerCarouselCollege escuela="Gestión" tipomodalidad="En Vivo" />
        {/* <CollegeSections /> */}
        <CollegeCourseSection
          t1="Multimedia"
          t2="Imagen"
          t4="PortadaFinal"
          escuela="Gestión"
        />
        ;
        <PacksSection bg="bg-sectors-PromoForm2" />
        <PopoverStruc img="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/PopoverPromo/POTENCIA%20TU%20CV%20-%20GP.jpg" />
      </div>
    </>
  );
}
