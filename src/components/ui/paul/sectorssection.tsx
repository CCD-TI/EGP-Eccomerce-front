import Image from "next/image";
import React from "react";
import { MdPlayArrow, MdRocketLaunch } from "react-icons/md";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const img = {
  icons: {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-gestion.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-ingenieria.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-mineria.svg`,
  },
};

interface SectorCardProps {
  title: string;
  icon: string;
  gradient: string;
  points: { icon: React.ReactNode; text: string }[];
}

const SectorCard: React.FC<SectorCardProps> = ({
  title,
  icon,
  gradient,
  points,
}) => {
  return (
    
    <div
      className={`relative w-[350px] h-[350px] rounded-2xl shadow-lg overflow-hidden hover:scale-105group transition duration-500    ${gradient}`}
    >
     


      <div className="relative flex flex-col justify-start pt-6 px-6 transition-all items-start gap-4 duration-500">
        {/* Icono del sector */}
        <div className="flex items-center w-full mb-4">
          <img src={icon} alt={title} className="w-[60px] pr-2 h-[60px]" />
        {/* Título */}
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        </div>


        {/* Lista de puntos */}
        <ul className="text-left text-sm text-white space-y-4">
          {points.map((point, index) => (
            <li key={index} className="flex items-center gap-3">
              {point.icon}
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SectorsSection = () => {
  const sectors = [
    {
      title: "Gestión",
      icon: img.icons.gestion, // Ruta del ícono para Gestión
      gradient:
        "bg-gradient-to-br from-[rgba(255,0,0,0.2)] hover:from-[rgba(255,0,0,0.7)] via-[rgba(22,46,84,0.2)] hover:via-[rgba(22,46,84,0.7)] to-[rgba(255,0,0,0.2)] hover:to-[rgba(255,0,0,0.7)] border-2 border-[rgba(22,46,84,0.7)]",
      points: [
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Políticas Públicas y Administración",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Gobierno Local y Regional",
        },
        {
          icon: <MdPlayArrow   size={24} className="text-colors-cyan-ccd" />,
          text: "Administración Pública Digital",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Descentralización y Desarrollo Social",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Gestión de Recursos Humanos en el Sector Público",
        },
      ],
    },
    {
      title: "Ingeniería",
      icon: img.icons.ingenieria, // Ruta del ícono para Ingeniería
      gradient:
        "bg-gradient-to-br from-[rgba(0,96,254,0.2)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.2)] hover:via-[rgba(22,46,84,0.7)] to-[rgba(0,96,254,0.2)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)]",
      points: [
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Ingeniería Civil",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Ingeniería Industrial y Procesos",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Ingeniería Ambiental y Energías Renovables",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Ingeniería Mecánica y Eléctrica",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Ingeniería de Software y Ciberseguridad",
        },
      ],
    },
    {
      title: "Minería",
      icon: img.icons.mineria, // Ruta del ícono para Minería
      gradient:
        "bg-gradient-to-br from-[rgba(249,115,22,0.2)] hover:from-[rgba(249,115,22,0.9)] via-[rgba(22,46,84,0.2)] hover:via-[rgba(22,46,84,0.7)] to-[rgba(255,115,22,0.2)] hover:to-[rgba(255,115,22,0.7)] border-2 border-[rgba(22,46,84,0.7)]",
      points: [
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Exploración",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Evaluación del Proyecto o Estudios de Factibilidad",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Desarrollo y Construcción",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Explotación (Operación)",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Rehabilitación y Cierre de la Mina",
        },
        {
          icon: <MdPlayArrow  size={24} className="text-colors-cyan-ccd" />,
          text: "Post-Cierre y Monitoreo",
        },
      ],
    },
  ];

  return (
    <section className="  bg-sectors-Corp py-16 px-6 text-center">
      {/* Título */}
      <div className="mb-12">
        <h2 className="text-colors-cyan-ccd  text-[2.5rem] max-sm:text-4xl font-bold mb-2">
          Dirigido a los
        </h2>
        <h3 className="text-white  text-[2.5rem] max-sm:text-4xl font-extrabold neon-white">
          SECTORES
        </h3>
      </div>
      {/* Tarjetas */}
      <div className="flex flex-wrap justify-center gap-8  ">
        {sectors.map((sector, index) => (
          <SectorCard
            key={index}
            title={sector.title}
            icon={sector.icon}
            gradient={sector.gradient}
            points={sector.points}
          />
        ))}
      </div>
    </section>
  );
};

export default SectorsSection;
