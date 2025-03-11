// ProgressEva.js
import React from "react";
import { Progress } from "@nextui-org/react";

interface ProgressEvaProps {
  value: number; // Definimos que 'value' es de tipo 'number'
}

const ProgressEva: React.FC<ProgressEvaProps> = ({ value }) => {
  return (
    <Progress
      aria-label="Progress"
      size="md"
      label="Progreso"
      value={value}
      showValueLabel={true}
      className="w-full   mb-4"
      classNames={{
        base: "w-full mb-4", // Clase para el contenedor general de la barra de progreso
        track: "bg-gray-200 rounded-full", // Clase para la pista de fondo de la barra
        indicator: "bg-blue-1 h-full rounded-full", // Clase para el indicador de progreso (barra con color personalizado)
    
       
      }}
    />
  );
};

export default ProgressEva;
