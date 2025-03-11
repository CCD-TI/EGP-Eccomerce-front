import { useState } from 'react';

export default function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false); // Cierra el dropdown al hacer clic en un enlace
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón que despliega el Dropdown */}
      <button
        onClick={toggleDropdown}
        className="inline-flex  justify-center w-full rounded-xl  shadow-sm px-4 py-2 bg-white/30 text-base font-bold text-gray-700 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Acreditaciones
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-1 w-auto min-w-[240px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href="https://cdcallao.cip.org.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              Colegio de Ingenieros - Consejo Departamental del Callao
            </a>
            <a
              href="https://www.cel.org.pe/convenios"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              Colegio de Economistas de Lima
            </a>
            <a
              href="https://ccdcapacitacion.edu.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              Centro de Capacitación y Desarrollo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
