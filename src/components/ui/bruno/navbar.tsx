"use client"
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Evitar scroll en el fondo cuando el menú está abierto
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="grid grid-cols-7 grid-rows-1 gap-4">
        {/* Logo */}
        <div className="col-span-2 flex items-center">
          <a href="/" className="text-white text-xl font-bold">
            <img src="/path-to-your-logo.png" alt="Logo" className="w-24" />
          </a>
        </div>

        {/* Links de navegación */}
        <ul className="col-span-3 col-start-3 hidden lg:flex justify-center items-center space-x-8 text-white">
          <li><a href="/home" className="hover:text-gray-400">Home</a></li>
          <li><a href="/about" className="hover:text-gray-400">About</a></li>
          <li><a href="/services" className="hover:text-gray-400">Services</a></li>
          <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
        </ul>

        {/* Acciones */}
        <div className="col-span-2 col-start-6 flex justify-end items-center space-x-4 text-white">
          <a href="/login" className="hover:text-gray-400">Login</a>
          <a href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</a>

          {/* Menú móvil */}
          <div className="lg:hidden">
            <button className="text-white focus:outline-none" onClick={toggleMenu}>
              {menuOpen ? <AiOutlineClose className="w-6 h-6 transition-transform duration-500" /> : <AiOutlineMenu className="w-6 h-6 transition-transform duration-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      <div
        className={`fixed inset-0 bg-gray-900 text-white flex flex-col justify-start p-8 items-start z-50 h-screen transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500 ease-in-out`}
      >
        {/* Botón de cierre fijo en la esquina superior derecha */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
        >
          <AiOutlineClose />
        </button>

        <ul className="flex flex-col space-y-6 text-xl">
          <li><a href="/home" className="hover:text-gray-400" onClick={toggleMenu}>Home</a></li>
          <li><a href="/about" className="hover:text-gray-400" onClick={toggleMenu}>About</a></li>
          <li><a href="/services" className="hover:text-gray-400" onClick={toggleMenu}>Services</a></li>
          <li><a href="/contact" className="hover:text-gray-400" onClick={toggleMenu}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};
