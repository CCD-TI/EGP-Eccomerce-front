"use client";
import React from "react";
import BannerCarouselCollege from "@/components/ui/paul/bannercarouselcollege";
import CollegeSections from "@/components/ui/paul/collegessections";
import CollegeCourseSection from "@/components/ui/paul/collegecoursesection";
import PacksSection from "@/components/ui/paul/packsection";


export default function Home() {
  return (
    <>
    <div className="bg-[#0B1026]">

    <BannerCarouselCollege escuela="Ingeniería" tipomodalidad="En Vivo"/>
    <CollegeSections/>
    <CollegeCourseSection t1="Multimedia" t2="Imagen" t4="PortadaFinal" escuela="Ingeniería" />;
    <PacksSection bg="bg-sectors-PromoForm2"/>
    </div>
    </>
  );

}
