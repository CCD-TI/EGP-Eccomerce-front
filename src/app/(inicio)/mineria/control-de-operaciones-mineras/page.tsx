"use client";
import React from "react";
import PacksSection from "@/components/ui/paul/packsection";
import CourseDetailCard from "@/components/ui/paul/cursos/coursedetailcard";
import CourseBenefits from "@/components/ui/paul/cursos/coursebenefits";
import CourseReviews from "@/components/ui/paul/cursos/coursereviews";
import CourseDetailCardOld from "@/components/ui/paul/cursos/coursedetailcardold";
// import CoursesCarousel from "@/components/ui/paul/cursos/coursescarousel";

export default function Home() {
  return (
    <>
      <CourseDetailCardOld
        college="mineria"
        school="Minería"
        courseName="Control de Operaciones Mineras"
        modalityLive="Curso en Vivo"
        modalityAsync="Curso Asincrónico"
        startDate="26 de Nov"
        startTime="07:30 pm"
        participants="0000"
        rating="99% (7K)"
        price="S/1796.00"
        oldPrice="S/2334.80"
        imageUrl="/Multimedia/Imagen/Ccd/Pruebas/curso2-hd.png"
      />
      <CourseBenefits/>
      <CourseReviews/>
      {/* <CoursesCarousel/> */}
      <PacksSection bg="" />
    </>
  );
}
