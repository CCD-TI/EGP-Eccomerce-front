"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const steps = [
  {
    title: "Selecciona tus cursos o diplomas",
    description: "Elige los cursos que deseas tomar",
  },
  {
    title: "Información de pago",
    description: "Ingresa los detalles de tu pago",
  },
  {
    title: "Confirmación",
    description: "Revisa y confirma tu orden",
  },
];

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6  rounded-lg shadow-lg">
      <div className="relative">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div
                key={step.title}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-20 h-20 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300
                    ${
                      isActive
                        ? "bg-cyan-400 text-slate-900"
                        : isCompleted
                        ? "bg-cyan-600 text-cyan-600 "
                        : "bg-slate-700 text-slate-300"
                    }`}
                >
                {isActive ? <FaCheck className="size-7 z-30" /> : stepNumber}

                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium transition-all duration-300
                      ${
                        isActive || isCompleted
                          ? "text-cyan-400"
                          : "text-slate-400"
                      }`}
                  >
                    {step.title}
                  </p>
                  <p className="hidden sm:block text-xs text-slate-500 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress line */}
        <div className="absolute top-10 left-0 w-full h-[6px] rounded-full dashed-background -z-10">
          <div
            className="h-full bg-cyan-400 transition-all duration-300 rounded-full"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
          className="px-4 py-2 text-sm font-medium text-cyan-400 bg-transparent border border-cyan-400 rounded-md transition-all duration-300 hover:bg-cyan-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={goToNextStep}
          disabled={currentStep === steps.length}
          className="px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-400 rounded-md transition-all duration-300 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === steps.length ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
