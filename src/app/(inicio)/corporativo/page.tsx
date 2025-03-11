import React from "react";
import WhyTrainWithUs from "@/components/ui/paul/whytrainwithus";
import WorkWithUs from "@/components/ui/paul/workwithus";
import SectorsSection from "@/components/ui/paul/sectorssection";
import CarruselCorp from "@/components/ui/paul/CarruselCorp";
import FormCorp from "@/components/ui/paul/FormCorp";
import PromocionesPrice from "@/components/ui/paul/PromocionesPrice";

export default function Home() {
  return (
    <>
    <WorkWithUs/>
    <WhyTrainWithUs/>
    <SectorsSection/>
    <FormCorp/>
    <PromocionesPrice/>
    <CarruselCorp/>
  </>
  );

}
