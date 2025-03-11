"use client"

import PacksectionRutas from '@/components/ui/paul/packsectionRutas'
import SchoolssectionRutas from '@/components/ui/paul/schoolssectionRutas'
import React, { useEffect } from 'react'
import AOS from "aos"; // Importa AOS
import Cardrutas from '@/components/ui/paul/cardrutas';



function Page() {

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
    <div>
        <PacksectionRutas/>
        <Cardrutas/>
    </div>
  )
}

export default Page
