"use client";

import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "aos/dist/aos.css"; // Importa los estilos de AOS
import AOS from "aos"; // Importa AOS

// import required modules
import { environment } from "@/environments/environment";
import PageInicio from "@/components/ui/viewPlataform/PageInicio";
import CarouselLogos from "@/components/ui/paul/carousellogos";

// Portada Front Page  
import FrontPage from "@/components/ui/paul/frontpage";
// Cursos
import CourseCard from "@/components/ui/paul/coursecard";
// Packs icon
import CertificateModel from "@/components/ui/paul/cetificatemodel";
import AccreditationsSection from "@/components/ui/paul/acreditationsection";
import TeachersSection from "@/components/ui/paul/teacherssection";
import TestimonialsSection from "@/components/ui/paul/testimonialsection";
import SectionCTA from "@/components/ui/paul/sectioncta";
import PacksSection from "@/components/ui/paul/packsection";
import SchoolsSection from "@/components/ui/paul/schoolssection";
import axios from "axios";
import TeachersSectionNew from "@/components/ui/paul/teacherssectionnew";
import CourseCardFront from "@/components/ui/paul/coursecardfront";
import CollegeCourseSectionFront from "@/components/ui/paul/collegecoursesectionfront";

export default function Home() {
  //  Lista de Cursos
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;


  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const [cursosCompletos, setcursosCompletos] = React.useState([{ count: 0 }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post("/inicio/vercursosplataformatiendaxtop1v2", {

        });
        setcursosCompletos(response.data.data[0]);
        console.log(response.data.data[0])

        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: true, // Si la animación se ejecuta solo una vez
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
      // delay: 500,
      // startEvent: 'load'
    });
  }, []);

  return (
    <>
      {environment.modo == "desarrollo" ? (
        <>
          <PageInicio />
        </>
      ) : (
        <>
          <div className="w-full m-auto ">
          
            {/* Front Page */}
            <FrontPage/>

            {/* Carrusel Logos */}
            <div className="w-full">
              <CarouselLogos />
            </div>

            {/* Sección Descubre */}
            <SchoolsSection/>
            
            {/* Cursos */}
            <CollegeCourseSectionFront t1="Multimedia" t2="Imagen" t4="PortadaFinal"/>

            {/* Packs */}
            <PacksSection bg="bg-sectors-PromoForm2"/>

            {/* Certificado */}
            <CertificateModel/>

            {/* Acreditaciones */}
            <AccreditationsSection/>

            {/* Docentes de Excelencia */}
            <TeachersSection/>

            {/* Testimonios */}
            <TestimonialsSection/>

            {/* Sección CTA */}
            <SectionCTA/>  

         
          </div>
        </>
      )}
    </>
  );
}

