import { useEffect, useState } from 'react';
import { MdSlowMotionVideo } from 'react-icons/md';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { MdPhoneIphone } from 'react-icons/md';
import { Listbox, ListboxItem } from '@nextui-org/react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { FcPlanner } from 'react-icons/fc';

export default function App({ cursoId, currentModalidad, currentFecha, onUpdate }: any) {
  const buttons = [
    { id: 1, label: 'MIXTO', icon: MdSlowMotionVideo },
    { id: 2, label: 'ONLINE', icon: HiOutlineStatusOnline },
    { id: 3, label: 'ASINCRONO', icon: MdPhoneIphone },
  ];

  const [activeButton, setActiveButton] = useState<number>(
    buttons.find(button => button.label === currentModalidad)?.id || 1
  );
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([currentFecha]));
   const selectedValue = Array.from(selectedKeys).join(", ");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, [activeButton, selectedValue]);

  const handleButtonClick = (id: React.SetStateAction<number>) => {
    setActiveButton(id);
  };

  const handleUpdateClick = () => {
    const selectedModalidad = buttons.find(button => button.id === activeButton)?.label;
    onUpdate(cursoId, selectedModalidad, selectedValue);
  };

  const renderContent = () => {
    switch (activeButton) {
      case 1:
        return (
          <div key={activeButton} className='flex flex-col justify-center items-center gap-4  rounded-xl' data-aos="fade-up">
            <div className='flex flex-col gap-4 p-6 justify-center border-2 rounded-xl bg-white shadow-md'>
              <h1 className='text-3xl font-bold text-center'>Modalidad Mixta</h1>
              <p className='text-center'>Combinación de clases en vivo y grabadas para una experiencia completa.</p>
              <Listbox
                aria-label="Fechas disponibles"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(keys as Set<React.Key>)}
              >
                <ListboxItem key="19 de agosto"><div className='flex gap-2 justify-center'><FcPlanner className='w-4 h-4' /><h1><b>19 de Agosto</b></h1></div></ListboxItem>
                <ListboxItem key="23 de agosto"><div className='flex gap-2 justify-center'><FcPlanner className='w-4 h-4' /><h1><b>23 de Agosto</b></h1></div></ListboxItem>
                <ListboxItem key="25 de agosto"><div className='flex gap-2 justify-center'><FcPlanner className='w-4 h-4' /><h1><b>25 de Agosto</b></h1></div></ListboxItem>
              </Listbox>
              <button className="bg-blue-500 text-white p-2 rounded-lg mt-4" onClick={handleUpdateClick}>
                Actualizar datos
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div key={activeButton} className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl' data-aos="fade-right">
            <div className='flex flex-col gap-4 p-6 justify-center border-2 rounded-xl bg-white shadow-md'>
              <h1 className='text-3xl font-bold text-center'>Modalidad Online</h1>
              <p className='text-center'>Clases completamente en línea con interacción en vivo.</p>
              <Listbox
                aria-label="Fechas disponibles"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(keys as Set<React.Key>)}
              >
                <ListboxItem key="19 de agosto"><div className='flex gap-2 justify-center'><FcPlanner className='w-4 h-4' /><h1><b>19 de Agosto</b></h1></div></ListboxItem>
                <ListboxItem key="20 de agosto"><div className='flex gap-2 justify-center'><FcPlanner className='w-4 h-4' /><h1><b>20 de Agosto</b></h1></div></ListboxItem>
              </Listbox>
              <button className="bg-blue-500 text-white p-2 rounded-lg mt-4" onClick={handleUpdateClick}>
                Actualizar datos
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div key={activeButton} className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl' data-aos="fade-up-left">
            <div className='flex flex-col gap-4 p-6 justify-center border-2 rounded-xl bg-white shadow-md'>
              <h1 className='text-3xl font-bold text-center'>Modalidad Asíncrona</h1>
              <p className='text-center'>Accede a clases grabadas y estúdialas a tu propio ritmo.</p>
              <Listbox
                aria-label="Fechas disponibles"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(keys as Set<React.Key>)}
              >
                <ListboxItem key="25 de agosto"><div className='flex gap-2 justify-center'><FcPlanner className='w-4 h-4' /><h1><b>25 de Agosto</b></h1></div></ListboxItem>
                <ListboxItem key="27 de agosto"><div className='flex gap-2 justify-center'><FcPlanner className='w-4 h-4' /><h1><b>27 de Agosto</b></h1></div></ListboxItem>
              </Listbox>
              <button className="bg-blue-500 text-white p-2 rounded-lg mt-4" onClick={handleUpdateClick}>
                Actualizar datos
              </button>
            </div>
          </div>
        );
      default:
        return <div className="text-center p-4">Selecciona una opción</div>;
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-8 justify-center">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`relative flex p-[1.2rem] gap-2 items-center rounded-lg shadow-md border-2 ${activeButton === button.id ? 'border-[#00A09D]' : 'border-gray-300'
              }`}
            onClick={() => handleButtonClick(button.id)}
          >
            {activeButton === button.id && (
              <FaCheck
                className="absolute top-1 right-1 rounded-full text-white bg-[#00A09D] p-[4px] h-4 w-4"
              />
            )}
            <button.icon className="h-10 w-10 rounded-full bg-blue-500 p-2 text-white" />
            <h1>{button.label}</h1>
          </button>
        ))}
      </div>
      <h1 className='text-center text-2xl'>Horarios disponibles</h1>
      <div className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl'>
        {renderContent()}
      </div>
    </div>
  );
}
