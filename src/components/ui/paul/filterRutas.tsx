"use client";

interface Parameter {
  truncate: boolean;
  gestion: boolean;
  ingenieria: boolean;
  mineria: boolean;
  // Asegúrate de agregar las funciones onClick aquí
  onClickGestion?: () => void;
  onClickIngenieria?: () => void;
  onClickMineria?: () => void;
}

import type React from "react";
import { Home, Settings, Bell } from "lucide-react";

// El componente CustomButton sigue igual
const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
const CustomButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: React.ReactNode }
> = ({ icon, ...props }) => (
  <button
    {...props}
    className="w-20 h-20 rounded-2xl bg-black/50 dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
  >
    {icon}
  </button>
);

export default function FloatingButtons({
  truncate,
  gestion,
  ingenieria,
  mineria,
  onClickGestion,
  onClickIngenieria,
  onClickMineria,
}: Parameter) {
  return (
    <div
      className={`fixed left-4 bottom-4 z-50 flex flex-col gap-3 ${
        truncate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      } transition-all duration-500 ease-in-out`}
    >
      {/* Usa la propiedad gestion para condicionar si el botón de Inicio se renderiza */}
      {gestion && (
        <CustomButton
        
          onClick={onClickGestion} // Pasa la función onClick correspondiente
          icon={
            <img
              src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`}
              alt="Ingeniería Icon"
              className="w-[50px] h-[55px] mx-auto "
            />
          }
          aria-label="Inicio"
        />
      )}

      {/* Usa la propiedad ingenieria para condicionar si el botón de Configuración se renderiza */}
      {ingenieria && (
        <CustomButton
          onClick={onClickIngenieria} // Pasa la función onClick correspondiente
          icon={
            <img
              src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`}
              alt="Ingeniería Icon"
              className="w-[50px] h-[55px] mx-auto "
            />
          }
          aria-label="Configuración"
        />
      )}

      {/* Usa la propiedad mineria para condicionar si el botón de Notificaciones se renderiza */}
      {mineria && (
        <CustomButton
          onClick={onClickMineria} // Pasa la función onClick correspondiente
          icon={
            <img
              src={`${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`}
              alt="Ingeniería Icon"
              className="w-[50px] h-[55px] mx-auto "
            />
          }
          aria-label="Notificaciones"
        />
      )}
    </div>
  );
}
