import React from "react";

const AccreditationsSection = () => {
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
    const img = {
      ccd: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdd-white5.svg`,
      pmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-pmi-white.svg`,
      cdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdidp-white.svg`,
      autodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-autodesk-white.svg`,
    }
    const  logos = {
      autodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-autodesk-institute-white.svg`,
      pmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-pmi-white.svg`,
      cdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdidp-white.svg`,
      compactccd: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdd-white5.svg`,
      compactpmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-pmi-white.svg`,
      compactcdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdidp-white.svg`,
      compactautodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-autodesk-white.svg`,
    }
  return (
    <div className="relative  bg-landing-acre py-16 px-6 lg:px-24">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto text-center">
        {/* Títulos */}
        <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-extrabold neon-white">
          ACREDITACIONES
        </h2>
        <h3 className="text-colors-cyan-ccd text-xl md:text-5xl font-bold mt-4">
          Internacionales
        </h3>

        {/* Contenedor de logos */}
        <div className="w-full grid grid-cols-3 max-sm:grid-cols-2 justify-center items-center gap-12 max-sm:gap-10 mt-12 max-sm:p-4">
            {/* Acreditación 1 */}
            <div className="flex flex-col items-center group">
              <img
                src={logos.compactccd}
                alt="Centro de Capacitación y Desarrollo"
                className="w-[17rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-8 group-hover:w-[80%] transition-all duration-300"></div>
              <p className="text-colors-cyan-ccd text-sm md:text-xl font-medium">
                Centro de Capacitación <br /> y Desarrollo
              </p>
            </div>

            {/* Acreditación 2 */}
            <div className="flex flex-col items-center group">
              <img
                src={logos.compactpmi}
                alt="Project Management Institute"
                className="w-[12rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-8 group-hover:w-[80%] transition-all duration-300"></div>
              <p className="text-colors-cyan-ccd text-sm md:text-xl font-medium">
                Project Management <br /> Institute
              </p>
            </div>

            {/* Acreditación 3 */}
            <div className="flex flex-col items-center group">
              <img
                src={logos.compactcdidp}
                alt="Colegio de Ingenieros del Perú"
                className="w-[13rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-8 group-hover:w-[80%] transition-all duration-300"></div>
              <p className="text-colors-cyan-ccd text-sm md:text-xl font-medium">
                Colegio de Ingenieros <br /> del Perú
              </p>
            </div>

            {/* Acreditación 4 */}
            {/* <div className="flex flex-col items-center group">
              <img
                src={logos.compactautodesk}
                alt="Autodesk Institute"
                className="w-[12rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-4 group-hover:w-full transition-all duration-300"></div>
              <p className=" text-sm md:text-base font-medium text-colors-cyan-ccd">
                Autodesk <br /> Institute
              </p>
            </div> */}
          </div>
      </div>
    </div>
  );
};

export default AccreditationsSection;
