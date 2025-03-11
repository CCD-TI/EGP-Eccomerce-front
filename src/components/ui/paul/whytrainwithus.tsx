import Image from "next/image";
import React from "react";
import { MdRocketLaunch } from "react-icons/md";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const img = {
  icons: {
    personalizacion: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group PERZONALIZACION.svg",
    flexibilidad: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group FLEXIBILIDAD.svg",
    cohesion: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group COHESION.svg",
    controlCalidad: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group CONTROL DE CALIDAD.svg",
    confidencialidad: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group CONFIDENCIALIDAD.svg",
    docentes: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group DOCENTES DE EXELENCIA.svg",
    membresias: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group MEMBRESIAS.svg",
    descuentos: "/Multimedia/Imagen/ccdcorp/newccdCorp/2. Por que capacitarte con nosotros/ICONOS/Group DESCUENTOS EXCLUSIVOS.svg",
  },
};

const features = [
  { icon: img.icons.personalizacion, title: "Personalización" },
  { icon: img.icons.flexibilidad, title: "Flexibilidad" },
  { icon: img.icons.cohesion, title: "Cohesión" },
  { icon: img.icons.controlCalidad, title: "Control de calidad" },
  { icon: img.icons.confidencialidad, title: "Confidencialidad" },
  { icon: img.icons.docentes, title: "Docentes de excelencia" },
  { icon: img.icons.membresias, title: "Membresías" },
  { icon: img.icons.descuentos, title: "Descuentos exclusivos" },
];

const WhyTrainWithUs: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full bg-sectors-Corp-two">
      {/* bg-colors-night-blue-ccd2 */}
      <div className="max-w-[110rem] w-full mx-auto py-16 px-6 text-white">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-colors-cyan-ccd  text-[2.5rem] max-sm:text-4xl font-bold mb-1">
            ¿Por qué capacitarte
          </h2>
          <h3 className=" text-[2.5rem] max-sm:text-3xl font-extrabold neon-white">
            CON NOSOTROS?
          </h3>
        </div>

        {/* Beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 py-10 rounded-2xl shadow-md hover:scale-105 transform transition duration-300
              bg-gradient-to-br from-[rgba(0,97,254,0.23)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.02)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,97,254,0.26)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)]"
            >
              {" "}
              {/* Ícono */}
              <div className="flex items-center gap-3">
                {/* <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-12 h-12 mb-4"
                /> */}
                {/* Título */}
               <Image src={feature.icon} alt="" width={35} height={35}/>
                <span className=" text-xl">{feature.title}</span>
              </div>
            </div>
          ))}
        </div>  
        {/* Descripción */}
        <p className="text-center text-sm md:text-base max-w-5xl mx-auto text-gray-300">
          Optar por el servicio corporativo y los cursos in house del Centro de
          Capacitación y Desarrollo (CCD) es clave para fortalecer las
          competencias de tu equipo con capacitaciones personalizadas y
          ajustadas a las necesidades específicas de tu empresa.
        </p>
      </div>
    </div>
  );
};

export default WhyTrainWithUs;
