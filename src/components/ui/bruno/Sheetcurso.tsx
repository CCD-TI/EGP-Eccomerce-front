"use client"
import { useState } from 'react';

const Cursos = () => {
  // Array de cursos con datos dinámicos
  const cursos = [
    {
      id: 1,
      nombre: 'Gestion',
      descripcion: 'gestion adasdad',
      precio: 199,
    },
    {
      id: 2,
      nombre: 'Ingenieria',
      descripcion: 'ingenieria nuclear',
      precio: 149,
    },
    {
      id: 3,
      nombre: 'Mineria',
      descripcion: 'sdada',
      precio: 129,
    },
  ];

  // Estado para manejar la visibilidad del SideSheet y el curso seleccionado
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Función para abrir el SideSheet y seleccionar un curso
  const openSideSheet = (curso:any) => {
    setSelectedCourse(curso);
    setIsOpen(true);
  };

  // Función para cerrar el SideSheet
  const closeSideSheet = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Contenido principal de los cursos */}
      <div className="max-w-6xl mx-auto mt-8 p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cursos.map((curso) => (
          <div key={curso.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">{curso.nombre}</h3>
            <p className="text-lg text-gray-700 mb-4">{curso.descripcion}</p>
            <p className="text-xl text-gray-800 font-semibold mb-6">
              Precio: ${curso.precio}
            </p>
            <button
              onClick={() => openSideSheet(curso)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>

      {/* SideSheet */}
      {isOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ pointerEvents: 'none' }}>
          {/* Contenido del SideSheet */}
          <div
            className=" w-[22%] max-xl:w-[24rem] h-full bg-white shadow-xl p-6 absolute right-0 top-0 rounded-l-lg"
            style={{ pointerEvents: 'auto' }}
          >
            <h3 className="text-2xl font-bold mb-4">Detalles del Curso</h3>
               {/*
            <h4 className="text-xl font-semibold mb-4">{selectedCourse.nombre}</h4>
            <p className="text-lg mb-4">{selectedCourse.descripcion}</p>
            <p className="text-lg font-semibold mb-6">
              Precio: ${selectedCourse.precio}
            </p> */}
            <button
              onClick={closeSideSheet}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
            >
              Cerrar
            </button>
          </div>

          {/* Fondo */}
          <div
            className="absolute "
            onClick={closeSideSheet}
          />
        </div>
      )}
    </div>
  );
};

export default Cursos;