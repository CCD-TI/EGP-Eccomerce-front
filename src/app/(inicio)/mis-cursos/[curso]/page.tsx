"use client";
import Anun from '@/components/ui/viewPlataform/Anun';

import Contents from '@/components/ui/viewPlataform/Contents';
import Evaluac from '@/components/ui/viewPlataform/Evaluac';
import { Accordion, AccordionItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';


interface Props {
  params: {
    curso: string;
  };
}

const Page = ({ params }: Props) => {
  // Definir el tipo de claves que tendrá `views`
  type ViewKey = 'cont' | 'eva' | 'anun';

  // Estado para controlar qué vista mostrar
  const [view, setView] = useState<ViewKey>('cont'); // Vista por defecto es 'contenido'

  // useEffect para cargar el estado del modal desde localStorage
  useEffect(() => {
    const savedView = localStorage.getItem('setView') as ViewKey | null;
    if (savedView) {
      setView(savedView); // Establecer la vista desde localStorage
    }
  }, []); // Solo se ejecuta al montar el componente

  // Función para cambiar la vista y guardar en localStorage
  const changeView = (newView: ViewKey) => {
    setView(newView);
    localStorage.setItem('setView', newView); // Guardar el estado
  };

  // Configuración de vistas y etiquetas
  const views: Record<ViewKey, { label: string; component: JSX.Element }> = {
    cont: { label: 'Contenido del curso', component: <Contents /> },
    eva: { label: 'Evaluaciones', component: <Evaluac /> },
    // cal: { label: 'Calificaciones', component: <Calfi /> },
    anun: { label: 'Anuncios', component: <Anun /> },
  };


  const clearLocalStorage = () => {
    localStorage.clear();
    // setView('cont'); // Reiniciar la vista por defecto o puedes dejarla vacía
  };

  return (
    <div className="flex flex-col gap-12 mx-auto w-full h-auto py-2 max-lg:pt-16 bg-white">
      {/* Encabezado */}
      <div className='flex flex-col  mx-auto w-full  '>
        <div className='flex flex-col gap-6 w-full '>
          <div className='py-4 px-10 bg-white border-b-2 shadow-sm'>
            <h1 className="text-4xl max-sm:text-xl max-sm:text-center font-semibold text-[#3085F7]">{decodeURIComponent(params.curso)}</h1>
          </div>

          {/* Botones para cambiar entre vistas */}

        </div>

        {/* Mostrar la vista seleccionada */}
        <div className="grid grid-cols-1 gap-10">
          <div className="flex space-x-6 p-5 px-8 max-md:p-4 pb-0 max-md:justify-center ">
            {Object.keys(views).map((key) => (
              <div key={key} className={`${view === key ? 'border-b-4 border-[#3085F7] pb-2 px-2' : ''}`}>
                <button
                  onClick={() => changeView(key as ViewKey)}
                  className="text-xl max-sm:text-base text-black hover:border-b-2 hover:border-black hover:pb-1"
                >
                  {views[key as ViewKey].label}
                </button>
              </div>
            ))}
          </div>
          {views[view].component}
        </div>
      </div>
    </div>
  );
};

export default Page;
