import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { IoDocumentAttach, IoMegaphoneOutline } from 'react-icons/io5';
import Image from 'next/image';
import { FaCheck, FaCheckDouble } from 'react-icons/fa6';

interface Archivo {
  nombreArchivo: string;
  url: string;
}

interface Contenido {
  id: number;
  tipo: 'texto' | 'documentos' | 'textoConImagen';
  nombre: string;
  descripcion?: string;
  archivos?: Archivo[];
  urlImagen?: string;
}

const Anun = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contenidoActual, setContenidoActual] = useState<Contenido | null>(null);
  const [openedItems, setOpenedItems] = useState<number[]>([]);

  // Array con datos de contenido dinámico
  const contenidoDinamico: Contenido[] = [
    {
      id: 1,
      tipo: 'texto',
      nombre: 'Actividad Complementaria',
      descripcion: 'Aplicar los conocimientos del D.S. 011-2019-TR y la norma G 050 para evaluar y mejorar la seguridad en un entorno de construcción. Identifica riesgos potenciales, describe las medidas de seguridad actuales y propone mejoras concretas.',
    },
    {
      id: 2,
      tipo: 'documentos',
      nombre: 'Se deja la siguiente guía de Estudio',
      archivos: [
        { nombreArchivo: 'Guia1.pdf', url: 'https://ejemplo.com/documentos/guia1.pdf' },
        { nombreArchivo: 'Guia2.docx', url: 'https://ejemplo.com/documentos/guia2.docx' }
      ]
    },
    {
      id: 3,
      tipo: 'textoConImagen',
      nombre: 'Plan de Clase',
      descripcion: 'Hoy tenemos este material del curso muchachos!.',
      urlImagen: '/Multimedia/Imagen/Cursos/ejem3.png'
    }
  ];

  const handleOpenModal = (contenido: Contenido) => {
    setContenidoActual(contenido);
    onOpen();
    if (!openedItems.includes(contenido.id)) {
      setOpenedItems((prev) => [...prev, contenido.id]);
    }
  };

  return (
    <div className='w-[90%] mx-auto '>
      {contenidoDinamico.map((contenido) => (
        <div key={contenido.id} className="mb-4">
          <Button onPress={() => handleOpenModal(contenido)} variant='solid' className="w-full h-full justify-start p-4 flex gap-2 items-center shadow-lg bg-white border-2">
            <div className=' w-full h-full flex max-md:flex-col items-center gap-6 p-1'>
              <IoMegaphoneOutline className='text-blue-1 w-14 h-14 ' />
              <Divider orientation="vertical" className='h-[4rem] w-1 bg-blue-1 hidden md:block' />

              <Divider orientation="horizontal" className='h-1 w-full bg-blue-1 block md:hidden' />
              <div className='w-full flex justify-between items-center max-md:flex-col max-sm:justify-end max-sm:gap-4'>
                <h1 className='flex text-2xl max-sm:text-base max-md:text-xl w-full h-full '>{contenido.nombre}</h1>
                <h1 className='text-xl flex items-center max-sm:justify-end max-sm:w-full gap-2'>
                  {openedItems.includes(contenido.id) ? (
                    <>
                      <FaCheckDouble className='text-blue-1 text-2xl' /> Abierto
                    </>
                  ) : (
                    <>
                      <FaCheckDouble className='text-gray-400 text-2xl' /> Nuevo
                    </>
                  )}
                  </h1>
              </div>
            </div>
          </Button>
        </div>
      ))}

      {contenidoActual && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col justify-center items-center text-2xl gap-1">{contenidoActual.nombre}</ModalHeader>
                <ModalBody>
                  {contenidoActual.tipo === 'texto' && (
                    <p className='text-lg'>{contenidoActual.descripcion}</p>
                  )}
                  {contenidoActual.tipo === 'documentos' && contenidoActual.archivos && contenidoActual.archivos.length > 0 && (
                    <ul>
                      {contenidoActual.archivos.map((archivo, index) => (
                        <li key={index}>
                          <a href={archivo.url} download={archivo.nombreArchivo} className='text-blue-600 hover:underline flex gap-2 items-center'>
                            <IoDocumentAttach className='text-xl' /> {archivo.nombreArchivo}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {contenidoActual.tipo === 'textoConImagen' && contenidoActual.urlImagen && (
                    <div className='flex flex-col justify-center items-center text-center'>
                      <p className='text-lg mb-4'>{contenidoActual.descripcion}</p>
                      <Image
                        src={contenidoActual.urlImagen}
                        alt={contenidoActual.nombre}
                        width={600}
                        height={600}
                        className='w-96 h-96'
                      />
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button className='text-blue-1' variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Anun;
