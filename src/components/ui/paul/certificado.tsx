"use client";

import React, { useState } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function GalleryWithCodeVerification() {
  const [code, setCode] = useState("");
  const [showGallery, setShowGallery] = useState(false);

  // Función para verificar el código
  const verifyCode = () => {
    // Aquí puedes realizar la verificación que necesites. Por ejemplo, comparar con un código predefinido
    if (code === "VFEMCCD2025") {
      setShowGallery(true); // Mostrar LightGallery si el código es válido
    } else {
      alert("Código inválido");
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-10">
      <div className="relative  flex flex-col gap-10">
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ejemplo: VFEMCCD2025"
            className="w-full border-[0.5px] border-white rounded-xl bg-[#1a1b26] px-10 max-lg:px-4 py-[0.6rem] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
          <button
            onClick={verifyCode}
            className="rounded-xl absolute right-1 top-1/2 -translate-y-1/2 bg-[#00ccbb] px-6 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-[#00e6c1]"
          >
            Verificar
          </button>
        </div>
      </div>

      {/* Solo mostrar LightGallery si el código es válido */}
      {showGallery && (
        <LightGallery 
        elementClassNames="flex w-full gap-8 justify-center"
        speed={500} 
        plugins={[lgThumbnail, lgZoom]}
        thumbnail={true}
        
        
        >
          {/* Aquí puedes poner las imágenes que deseas mostrar en el LightGallery */}
            
          <a href="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Pruebas/FONDO-CERTIFICADO-1_unificado.png">
            <img
              alt="img1"
              src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Pruebas/FONDO-CERTIFICADO-1_unificado.png"
              className="w-36 h-32 object-cover  cursor-pointer   rounded-xl "
            />
          </a>
          <a href="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Pruebas/FONDO-CERTIFICADO-1_unificado.png">
            <img
              alt="img2"
              src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Pruebas/FONDO-CERTIFICADO-1_unificado.png"
              className="w-36 h-32 object-cover  cursor-pointer rounded-xl "
            />
          </a>
        </LightGallery>
      )}
    </div>
  );
}

export default GalleryWithCodeVerification;
