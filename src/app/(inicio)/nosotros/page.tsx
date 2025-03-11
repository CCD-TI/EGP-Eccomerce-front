"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import "aos/dist/aos.css"; // Importa los estilos de AOS
import AOS from "aos"; // Importa AOS
import { useEffect } from "react";

import AwardBanner from "@/components/ui/paul/awardbanner";

export default function Home() {
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
    <AwardBanner/>
  </>
  );

}
