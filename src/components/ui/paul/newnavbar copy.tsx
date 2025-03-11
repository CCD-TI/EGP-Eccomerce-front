"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import CountdownTimerTopBar from "./countdowntimertopbar";
import { FaRegStar } from "react-icons/fa6";
import { Modal } from "@mui/material";
import PacksSectionModalCasiV2 from "./packsectionmodal-CASI-V2";
import {
  MdEngineering,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Navbar = () => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const images = {
    logo: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/ccd-logo-white.svg`,
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
    rutas: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-rutas-white.svg`,
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true); // Controla la visibilidad del Top Bar
  const [lastScrollY, setLastScrollY] = useState(0); // Almacena la posición del último scroll
  const [isModalOpen, setModalOpen] = useState(false); // Controla la apertura del modal
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );

  const toggleMenu = () => {
    setMenuOpen((menuOpen) => {
      const newState = !menuOpen;

      // Bloquear/desbloquear scroll
      if (newState) {
        document.body.style.overflow = "hidden"; // Bloquea el scroll
      } else {
        document.body.style.overflow = ""; // Restaura el scroll
      }

      return newState;
    });
  };

  const toggleModal = () => setModalOpen(!isModalOpen); // Abre/cierra el modal

  // Manejo del scroll para el comportamiento del Top Bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar el Top Bar solo cuando el usuario hace scroll hacia la parte superior
      if (currentScrollY === 0) {
        setShowTopBar(true); // Mostrar el Top Bar
      }

      // Actualizar la posición del scroll
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleMouseEnter = (category: string) => setActiveCategory(category);
  const handleMouseLeave = () => setActiveCategory(null);

  const handleSubMouseEnter = (subCategory: string) =>
    setActiveSubCategory(subCategory);
  const handleSubMouseLeave = () => setActiveSubCategory(null);

  // Login User options Logout
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      {showTopBar && (
        <div
          className={
            "group w-full bg-gradient-to-r from-colors-cyan-ccd to-colors-dark-blue-ccd md:bg-custom-gradient text-white flex items-center justify-center px-6 py-2 z-50 transition-all fixed top-0 shadow-md duration-1000"
          }
        >
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-center 
          md:space-x-4 text-sm md:text-base font-bold"
          >
            {/* Boton de cerrar <768 */}
            {/* <div className="hidden group-hover:flex md:group-hover:hidden my-1 md:ml-auto justify-center md:justify-end transition duration-1000">
              <button
                className="text-white hover:text-cyan-400 transition-all"
                onClick={() => setShowTopBar(false)}>
                <IoMdCloseCircle className="text-xl"/>
              </button>
            </div> */}
            {/* Texto */}
            <div className="flex justify-between items-center mb-2 md:mb-0 text-center md:text-left">
              <div>
                <p>APROVECHA NUESTROS CURSOS AL 50% DSCTO.</p>
              </div>
              <div className="md:ml-auto md:hidden justify-center">
                <button
                  className="text-white text-lg hover:text-cyan-400 transition-all"
                  onClick={() => setShowTopBar(false)}
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            </div>
            {/* Contenedor del contador y botón de suscribirse */}
            <div className="flex flex-row items-center justify-between space-x-4">
              {/* Contador */}
              <div className="mb-0 mr-2">
                <CountdownTimerTopBar targetDate="12/31/2024 23:59:59" />
              </div>

              {/* Botón de suscribirse */}
              <div className="flex justify-center">
                <button
                  onClick={toggleModal}
                  className="px-2 border-2 hover:text-colors-dark-blue-ccd bg-transparent border-colors-cyan-ccd text-colors-cyan-ccd text-sm lg:text-base font-bold py-1 rounded-2xl shadow-lg hover:bg-[#00d3c5] hover:shadow-[0_0_25px_5px_rgba(0,234,223,0.7)] transition-all duration-300"
                >
                  ¡SUSCRIBIRME AHORA!
                </button>
              </div>
            </div>

            {/* Botón de cerrar */}
            <div className="hidden mt-0 md:ml-auto md:flex justify-center md:justify-end">
              <button
                className="text-white text-lg hover:text-cyan-400 transition-all"
                onClick={() => setShowTopBar(false)}
              >
                <IoMdCloseCircle />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header
        className={`${
          showTopBar ? "mt-20 md:mt-[57px]" : ""
        } w-full mt-2  text-white z-40`}
      >
        <div className="mx-auto flex items-center justify-between px-6 lg:px-14 py-6 -mt-[10px]">
          {/* Logo */}
          <Link href="/">
            <Image
              src={images.logo}
              alt="CCD Logo"
              width={60}
              height={60}
              className="cursor-pointer"
            />
          </Link>
          {/* Links de Navegación */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
            >
              INICIO
              <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Menú de Escuelas */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("escuelas")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="py-2 -mb-[1px] md:text-xs xl:text-base flex items-center gap-2 hover:text-cyan-400">
                ESCUELAS
                <MdKeyboardArrowDown className="text-2xl transition-transform duration-300 ease-in-out group-hover:rotate-180" />
              </button>
              {activeCategory === "escuelas" && (
                <div className="absolute top-full left-0 bg-colors-night-blue-ccd2 bg-opacity-60 rounded-2xl py-4 shadow-lg backdrop-blur-md">
                  {/* Subcategorías */}
                  <ul className="flex flex-col gap-2">
                    <li
                      className="relative group"
                      onMouseEnter={() => handleSubMouseEnter("gestion")}
                      onMouseLeave={handleSubMouseLeave}
                    >
                      <div className="px-4">
                        <button className="p-4 w-44 hover:border-colors-sky-ccd border-transparent border-1  rounded-xl bor flex items-center gap-3">
                          <div className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-red-500">
                            <img
                              src={images.gestion}
                              className="text-white text-[2px] p-[5px] -translate-y-[2.5px]"
                            />{" "}
                            {/* Tamaño del ícono ajustado */}
                          </div>
                          Gestión
                          {/* <MdKeyboardArrowRight /> */}
                        </button>
                      </div>
                      {activeSubCategory === "gestion" && (
                        <div className="absolute top-0 left-full bg-colors-night-blue-ccd2 w-80 bg-opacity-60 rounded-2xl p-4 shadow-lg backdrop-blur-md">
                          {/* </div> <div className="absolute bg-colors-night-blue-ccd2 p-4 rounded-2xl shadow-lg bg-opacity-60 w-80 top-0 left-full" */}
                          {/* style={{ */}
                          {/* //   backdropFilter: "blur(12px)", // Corresponde a backdrop-blur-md
                        //   zIndex: 10,                          
                        // }}> */}
                          <ul className="flex flex-col gap-2">
                            <li className="flex items-start gap-2">
                              <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                              <Link
                                href="/escuelas/gestion/curso1"
                                className="block hover:text-cyan-400"
                              >
                                Contrataciones y Compras Públicas
                              </Link>
                            </li>
                            <li className="flex items-start gap-2">
                              <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                              <Link
                                href="/escuelas/gestion/curso1"
                                className="block hover:text-cyan-400"
                              >
                                Planeamiento Estratégico y Gestión de Desarrollo
                              </Link>
                            </li>
                            <li className="flex items-start gap-2">
                              <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                              <Link
                                href="/escuelas/gestion/curso1"
                                className="block hover:text-cyan-400"
                              >
                                Gestión Financiera y Administrativa
                              </Link>
                            </li>
                            <li className="flex items-start gap-2">
                              <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                              <Link
                                href="/escuelas/gestion/curso1"
                                className="block hover:text-cyan-400"
                              >
                                Administración Documentaría y Atención al
                                Ciudadano
                              </Link>
                            </li>
                            <li className="flex items-start gap-2">
                              <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                              <Link
                                href="/escuelas/gestion/curso1"
                                className="block hover:text-cyan-400"
                              >
                                Gestión de Recursos Humanos en el Sector Público
                              </Link>
                            </li>
                            <li className="flex items-start gap-2">
                              <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                              <Link
                                href="/escuelas/gestion/curso1"
                                className="block hover:text-cyan-400"
                              >
                                Tecnología en el Sector Público
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>

                    <li
                      className="relative group"
                      onMouseEnter={() => handleSubMouseEnter("ingenieria")}
                      onMouseLeave={handleSubMouseLeave}
                    >
                      <div className="px-4">
                        <button className="p-4 w-44 hover:border-colors-sky-ccd border-transparent border-1  rounded-xl bor flex items-center gap-3">
                          <div className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-blue-500">
                            <img
                              src={images.ingenieria}
                              className="text-white text-[2px] p-[5px]"
                            />{" "}
                            {/* Tamaño del ícono ajustado */}
                          </div>
                          Ingeniería
                          {/* <MdKeyboardArrowRight /> */}
                        </button>
                      </div>
                      {activeSubCategory === "ingenieria" && (
                        <ul className="flex flex-col gap-2 absolute w-80 top-0 left-full bg-colors-night-blue-ccd2 bg-opacity-60 p-4 rounded-2xl shadow-lg backdrop-blur-md">
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Civil
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Software y Ciberseguridad
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Industrial y Procesos
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Ambiental y Energias Renovables
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Ingeniería Estructura y Geotécnica
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>

                    <li
                      className="relative group"
                      onMouseEnter={() => handleSubMouseEnter("mineria")}
                      onMouseLeave={handleSubMouseLeave}
                    >
                      <div className="px-4">
                        <Link
                          href="/mineria"
                          className="p-4 w-44 hover:border-colors-sky-ccd border-transparent border-[1px] rounded-xl flex items-center gap-3"
                        >
                          <div className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-orange-500">
                            <img
                              src={images.mineria}
                              alt="Icono Minería"
                              className="text-white text-[2px] p-[5px]"
                            />
                          </div>
                          Minería
                        </Link>
                      </div>
                      {activeSubCategory === "mineria" && (
                        <ul className="flex flex-col gap-2 absolute w-80 top-0 left-full bg-colors-night-blue-ccd2 bg-opacity-60 p-4 rounded-2xl shadow-lg backdrop-blur-md">
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/mineria/control-de-operaciones-mineras"
                              className="block hover:text-cyan-400"
                            >
                              Control de operaciones mineras
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* Linea Separadora */}
                    <hr className="border-t-2 border-blue-500 w-full p-0 m-0" />
                    {/* Rutas */}
                    <li
                      className="relative group"
                      onMouseEnter={() => handleSubMouseEnter("rutas")}
                      onMouseLeave={handleSubMouseLeave}
                    >
                      <div className="px-4">
                        <button className="p-4 w-44 hover:border-colors-sky-ccd border-transparent border-1  rounded-xl bor flex items-center gap-3">
                          <div className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-blue-500">
                            <img
                              src={images.rutas}
                              className="text-white text-[2px] p-[5px]"
                            />{" "}
                            {/* Tamaño del ícono ajustado */}
                          </div>
                          Rutas
                          {/* <MdKeyboardArrowRight /> */}
                        </button>
                      </div>
                      {activeSubCategory === "rutas" && (
                        <ul className="flex flex-col gap-2 absolute w-80 top-0 left-full bg-colors-night-blue-ccd2 bg-opacity-60 p-4 rounded-2xl shadow-lg backdrop-blur-md">
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Contrataciones y Compras Públicas
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Planeamiento Estratégico y Gestión de Desarrollo
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Gestión Financiera y Administrativa
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Administración Documentaría y Atención al
                              Ciudadano
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Gestión de Recursos Humanos en el Sector Público
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/escuelas/gestion/curso1"
                              className="block hover:text-cyan-400"
                            >
                              Tecnología en el Sector Público
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/nosotros"
              className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
            >
              NOSOTROS
              <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/corporativo"
              className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
            >
              CORPORATIVO
              <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/planes"
              className="relative group md:text-xs xl:text-base text-cyan-400 font-bold hover:text-colors-cyan-ccd transition-all duration-300 flex items-center"
            >
              PROMOCIONES
              <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              <FaRegStar className="text-colors-cyan-ccd -mt-1 ml-1" />
            </Link>
            <Link
              href="https://campus.ccdcapacitacion.edu.pe/mod/customcert/verify_certificate.php"
              target="_blank"
              className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
            >
              VALIDAR
              <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Iconos de acciones */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* <Link
              href="https://campus.ccdcapacitacion.edu.pe/login/index.php"
              target="_blank"
              className="relative group md:text-xs xl:text-base md:px-2 xl:px-4 py-2 bg-white text-blue-800 font-bold hover:bg-blue-800 hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 rounded-full"
            >
              AULA VIRTUAL
            </Link> */}

            <Dropdown>
              <DropdownTrigger className="relative group md:text-xs xl:text-base md:px-2 xl:px-4 py-2 bg-white text-blue-800 font-bold hover:bg-blue-800 hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 rounded-full">
                <Button variant="bordered">Aula Virtual</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Plataforma Anterior</DropdownItem>
                <DropdownItem key="copy">Nueva Plataforma</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Ícono Carrito */}
            <div className="relative cursor-pointer hover:text-cyan-400 transition-all duration-300">
              <FaCartShopping className="w-6 h-6" />
            </div>

            {/* Ícono Usuario */}
            <div
              className="relative"
              onMouseEnter={() => setIsProfileMenuOpen(true)} // Abre el menú al pasar el mouse
              onMouseLeave={() => setIsProfileMenuOpen(false)} // Cierra el menú al salir del área
            >
              <div className="flex items-center justify-center w-8 h-8  text-white hover:text-cyan-400 transition-all duration-300 ">
                <FaUser className="w-6 h-6" />
              </div>

              {/* Menú desplegable */}
              {isProfileMenuOpen && (
                <div className="absolute top-12 right-0 w-80 bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-2xl shadow-lg p-4 z-50 ">
                  {/* Encabezado */}
                  <div className="flex items-center gap-4 border-b border-blue-600 pb-4 mb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-t from-cyan-500 to-transparent rounded-full border-2 border-cyan-400 shadow-md">
                      <FaUser className="text-4xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Nombre de usuario</h3>
                      <p className="text-cyan-300 text-sm">Cargo del usuario</p>
                    </div>
                  </div>

                  {/* Opciones */}
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-3 cursor-pointer hover:text-cyan-300 transition">
                      <FaUserEdit className="text-cyan-300" />
                      <span>Editar datos personales</span>
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:text-cyan-300 transition">
                      <GiBookmarklet className="text-cyan-300" />
                      <span>Mis cursos</span>
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                      <TbLogout className="text-red-400" />
                      <span>Cerrar Sesión</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Menú móvil */}
          <div className="right-4 flex items-end lg:hidden z-[45]">
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <AiOutlineClose className="text-white w-8 h-8 scroll" />
              ) : (
                <AiOutlineMenu className="text-white w-8 h-8" />
              )}
            </button>
          </div>
        </div>
        {/* Menú desplegable móvil */}
        {menuOpen && (
          <div
            className={`${
              showTopBar ? "mt-16 md:mt-12" : ""
            } lg:hidden fixed top-0 left-0 w-full h-screen bg-[#165425] text-white z-[40]`}
          >
            <nav className="flex flex-col items-center space-y-4 py-6">
              <Link
                href="/"
                className="hover:text-cyan-400 transition-all duration-300"
                onClick={toggleMenu}
              >
                INICIO
              </Link>
              <Link
                href="/nosotros"
                className="hover:text-cyan-400 transition-all duration-300"
                onClick={toggleMenu}
              >
                NOSOTROS
              </Link>
              <Link
                href="/corporativo"
                className="hover:text-cyan-400 transition-all duration-300"
                onClick={toggleMenu}
              >
                CORPORATIVO
              </Link>
              <Link
                href="/seminarios"
                className="hover:text-cyan-400 transition-all duration-300"
                onClick={toggleMenu}
              >
                SEMINARIOS GRATUITOS
              </Link>
              <Link
                href="/planes"
                className="text-cyan-400 font-bold hover:text-cyan-500 transition-all duration-300"
                onClick={toggleMenu}
              >
                PLANES
              </Link>
              <Link
                href="https://campus.ccdcapacitacion.edu.pe/mod/customcert/verify_certificate.php"
                target="_blank"
                className="hover:text-cyan-400 transition-all duration-300"
              >
                VALIDAR CERTIFICADO
              </Link>
              {/* <Link
                href="https://campus.ccdcapacitacion.edu.pe/login/index.php"
                target="_blank"
                className="px-4 py-2 bg-cyan-400 text-[#162E54] rounded-full font-bold hover:bg-cyan-500 transition-all duration-300"
              >
                AULA VIRTUAL
              </Link> */}
              <Dropdown>
              <DropdownTrigger className="relative group md:text-xs xl:text-base md:px-2 xl:px-4 py-2 bg-white text-blue-800 font-bold hover:bg-blue-800 hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 rounded-full">
                <Button variant="bordered">Aula Virtual</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Plataforma Anterior</DropdownItem>
                <DropdownItem key="copy">Nueva Plataforma</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
              <div className="flex gap-5">
                <Link href="/">
                  <FaCartShopping className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-all duration-300" />
                </Link>
                <Link href="/">
                  <FaUser className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-all duration-300" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Modal usando Material-UI */}
      <Modal open={isModalOpen} onClose={toggleModal}>
        <div className="flex justify-center items-center h-screen">
          <PacksSectionModalCasiV2 onClose={toggleModal} />
        </div>
      </Modal>
    </>
  );
};
export default Navbar;
