"use client";
import React, { useState, useEffect, ReactNode, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { IoIosArrowForward, IoMdCloseCircle } from "react-icons/io";
import CountdownTimerTopBar from "./countdowntimertopbar";
import { FaRegStar } from "react-icons/fa6";
// import { Modal } from "@mui/material";
import PacksSectionModalCasiV2 from "./packsectionmodal-CASI-V2";
import {
  MdArrowBackIosNew,
  MdEngineering,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import DropdownComponent from "../dropdown/dropdown";
import NewModalLogeoComponent from "./modal/newmodallogeo";

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@nextui-org/react";
import CarritoE from "@/components/ui/bruno/carritodeEpopover";
import ModalPromo from "./ModalPromo";
import axios from "axios";
import { environment } from "@/environments/environment";
import ModalFormJobCCD from "./ModalFormJobCCD";
import ModalRuleta from "./ModalRuleta";

interface Especializacion {
  Especializacion: string;
  IdEspecializacion: number;
  nombre: string;
}

const Navbar = () => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const contador: string = environment.contador;
  const images = {
    logo: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/ccd-logo-white.svg`,
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-gestion-normal.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-ingenieria-normal.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-mineria-normal.svg`,
    rutas: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/icon-rutas-white.svg`,
  };
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const [showTopBar, setShowTopBar] = useState(true); // Controla la visibilidad del Top Bar
  const [lastScrollY, setLastScrollY] = useState(0); // Almacena la posición del último scroll
  const [isModalOpen, setModalOpen] = useState(false); // Controla la apertura del modal
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false); // Controla el primer submenú
  const [secondMenuOpen, setSecondMenuOpen] = useState(false); // Controla el segundo submenú desde el menú principal
  const [innerSubMenuOpen, setInnerSubMenuOpen] = useState(false); // Controla el primer submenú dentro del primer submenú
  const [secondSubMenuOpen, setSecondSubMenuOpen] = useState(false); // Controla el segundo submenú dentro del primer submenú
  const [treeSubMenuOpen, setTreeSubMenuOpen] = useState(false); // Controla el segundo submenú dentro del primer submenú

  useState(false); // Controla otro submenú dentro de Additional Menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubMenuOpen(false); // Cerrar submenús al cerrar el menú principal
    setSecondMenuOpen(false);
    setInnerSubMenuOpen(false);
    setSecondSubMenuOpen(false);
    setTreeSubMenuOpen(false);

    // Evitar scroll en el fondo cuando el menú está abierto
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
    setInnerSubMenuOpen(false); // Cerrar los submenús internos
    setSecondSubMenuOpen(false);
    setTreeSubMenuOpen(false);
  };

  const toggleTreeSubMenu = () => {
    setTreeSubMenuOpen(!treeSubMenuOpen);
    setInnerSubMenuOpen(false);
    setSecondSubMenuOpen(false);
  };

  const toggleInnerSubMenu = () => {
    setInnerSubMenuOpen(!innerSubMenuOpen);
    setSecondSubMenuOpen(false);
    setTreeSubMenuOpen(false);
  };

  const toggleSecondSubMenu = () => {
    setSecondSubMenuOpen(!secondSubMenuOpen);
    setInnerSubMenuOpen(false);
    setTreeSubMenuOpen(false);
  };
  // const toggleTreeSubMenu = () => {
  //   setTreeSubMenuOpen(!treeSubMenuOpen); // Alternar el segundo submenú interno
  // };

  const { data: session } = useSession();

  const [text, setText] = useState(""); // Valor inicial

  const colorMap = {
    Gestión: "red",
    Ingeniería: "blue",
    Minería: "orange",
  };

  const [especializaciones, setEspecializaciones] = useState<{
    [key: number]: Especializacion[];
  }>({});
  const [selectedSchool, setSelectedSchool] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hoveredSchoolRef = useRef<Set<number>>(new Set());
  const hasFetched = useRef(false);

  const fetchEspecializaciones = async (schoolId: number) => {
    if (!schoolId) return;

    // Verificamos si ya se ha hecho la consulta para esta escuela
    if (hoveredSchoolRef.current.has(schoolId)) {
      console.log("Ya se ha cargado esta escuela, no repetimos la consulta.");
      return; // No hacemos la consulta si ya ha sido realizada
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${environment.baseUrl}/inicio/obtenerEspe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ school: schoolId }), // Enviar la escuela seleccionada
        }
      );

      const data = await response.json();

      if (data.ok) {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          // Actualizamos las especializaciones para esta escuela
          setEspecializaciones((prevEspecializaciones) => ({
            ...prevEspecializaciones,
            [schoolId]: data.data[0], // Aquí añadimos las especializaciones para esta escuela
          }));
          // Marcamos esta escuela como cargada en el ref
          hoveredSchoolRef.current.add(schoolId);
        } else {
          setError("No se encontraron especializaciones.");
        }
      } else {
        setError(data.msg || "Error desconocido");
      }
    } catch (err) {
      setError(
        "Hubo un error al obtener la información: " +
          ((err as any)?.message || err)
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Este efecto solo se ejecuta una vez cuando el componente se monta

  const outlineColor = colorMap[text as keyof typeof colorMap] || "gray";

  // const toggleMenu = () => {
  //   setMenuOpen((menuOpen) => {
  //     const newState = !menuOpen;

  //     // Bloquear/desbloquear scroll
  //     if (newState) {
  //       document.body.style.overflow = "hidden"; // Bloquea el scroll
  //     } else {
  //       document.body.style.overflow = ""; // Restaura el scroll
  //     }

  //     return newState;
  //   });
  // };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // // Manejo del scroll para el comportamiento del Top Bar
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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     setShowTopBar(currentScrollY === 0);
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Función para manejar el hover en las categorías principales

  const handleMouseEnter = (category: React.SetStateAction<string | null>) =>
    setActiveCategory(category);
  const handleMouseLeave = () => setActiveCategory(null);

  // Función para manejar el hover en las subcategorías y seleccionar la escuela
  const handleSubMouseEnter = (category: string, schoolId: number) => {
    setSelectedSchool(schoolId); // Actualiza la escuela seleccionada
    setActiveSubCategory(category); // Establece la subcategoría activa
  };

  // Función para manejar el hover al salir de la subcategoría
  const handleSubMouseLeave = () => setActiveSubCategory(null);

  useEffect(() => {
    if (selectedSchool && !hasFetched.current) {
      fetchEspecializaciones(selectedSchool);
    }
  }, [selectedSchool]);
  // Login User options Logout
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      {showTopBar && (
        <div
          className={
            "group w-full bg-gradient-to-r from-colors-cyan-ccd to-colors-dark-blue-ccd md:bg-custom-gradient text-white flex items-center justify-center px-6 py-2 z-20 transition-all fixed top-0 shadow-md duration-1000"
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
            <div className="flex justify-between items-center mb-3 md:mb-0 text-center md:text-left">
              <div>
                <p>APROVECHA NUESTROS CURSOS AL 80% DSCTO.</p>
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
                <CountdownTimerTopBar targetDate={contador} />
              </div>

              {/* Botón de suscribirse */}
              <div className="flex justify-center">
                <ModalPromo css="px-2 border-2 hover:text-colors-dark-blue-ccd bg-transparent border-colors-cyan-ccd text-colors-cyan-ccd text-sm lg:text-base font-bold py-1 rounded-2xl shadow-lg hover:bg-[#00d3c5] hover:shadow-[0_0_25px_5px_rgba(0,234,223,0.7)] transition-all duration-300" />
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

      <nav
        className={`${
          showTopBar ? "mt-20 md:mt-[3rem] z-20" : ""
        } w-full   text-white`}
      >
        <div
          className={`mx-auto grid grid-cols-7 grid-rows-1 gap-4 px-6 lg:px-14 py-6 fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? " bg-colors-dark-blue-ccd " : "-mt-[10px]"
          }`}
        >
          {/* Logo */}
          <div className="col-span-2 flex gap-4 items-center">
            <div className="lg:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
              >
                {menuOpen ? (
                  <AiOutlineClose className="w-6 h-6 transition-transform duration-500 hidden" />
                ) : (
                  <AiOutlineMenu className="w-8 h-8 transition-transform duration-500" />
                )}
              </button>
            </div>
            <Link href="/">
              <Image
                src={images.logo}
                alt="CCD Logo"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Links de navegación */}
          <ul className="col-span-3 col-start-3 hidden lg:flex justify-center items-center space-x-8 text-white ">
            <li>
              <Link
                href="/"
                className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
              >
                INICIO
                <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
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
                    <ul className="flex flex-col gap-2 ">
                      <li
                        className="relative group"
                        onMouseEnter={() => handleSubMouseEnter("gestion", 2)} // Cambia "2" por el ID real de la escuela
                        onMouseLeave={handleSubMouseLeave}
                      >
                        <div className="px-4">
                          <Link
                            href="/gestion"
                            className="p-4 w-44 hover:border-colors-sky-ccd border-transparent border-[1px] rounded-xl flex items-center gap-3"
                          >
                            <div className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-red-500">
                              <img
                                src={images.gestion}
                                alt="Icono Gestión"
                                className="text-white text-[2px] p-[5px] -translate-y-[2.5px]"
                              />
                            </div>
                            Gestión
                          </Link>
                        </div>
                        {activeSubCategory === "gestion" && (
                          <ul className="flex flex-col gap-3 absolute w-80 top-0 left-full bg-colors-night-blue-ccd2 bg-opacity-60 p-4 rounded-2xl shadow-lg backdrop-blur-md">
                            {especializaciones[2]?.map(
                              (
                                especializacion,
                                idx // Aquí usamos el schoolId 2 como ejemplo
                              ) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                                  <Link
                                    href={{
                                      pathname: "/gestion", // La ruta donde quieres que se apliquen los filtros
                                      query: {
                                        especializacion:
                                          especializacion.IdEspecializacion,
                                      }, // Pasar el nombre de la especialización como parámetro en la URL
                                    }}
                                    passHref
                                  >
                                    {especializacion.Especializacion}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>

                      <li
                        className="relative group"
                        onMouseEnter={() =>
                          handleSubMouseEnter("ingenieria", 1)
                        }
                        onMouseLeave={handleSubMouseLeave}
                      >
                        <div className="px-4">
                          <Link
                            href="/ingenieria"
                            className="p-4 w-44 hover:border-colors-sky-ccd border-transparent border-[1px] rounded-xl flex items-center gap-3"
                          >
                            <div className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-blue-500">
                              <img
                                src={images.ingenieria}
                                alt="Icono Ingeniería"
                                className="text-white text-[2px] p-[5px]"
                              />
                            </div>
                            Ingeniería
                          </Link>
                        </div>
                        {activeSubCategory === "ingenieria" && (
                          <ul className="flex flex-col gap-3 absolute w-80 top-0 left-full bg-colors-night-blue-ccd2 bg-opacity-60 p-4 rounded-2xl shadow-lg backdrop-blur-md">
                            {especializaciones[1]?.map(
                              (
                                especializacion,
                                idx // Aquí usamos el schoolId 2 como ejemplo
                              ) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                                  <Link
                                    href={{
                                      pathname: "/ingenieria", // La ruta donde quieres que se apliquen los filtros
                                      query: {
                                        especializacion:
                                          especializacion.IdEspecializacion,
                                      }, // Pasar el nombre de la especialización como parámetro en la URL
                                    }}
                                    passHref
                                  >
                                    {especializacion.Especializacion}
                                  </Link>
                                </li> // Mostrar cada especialización en una lista
                              )
                            )}
                          </ul>
                        )}
                      </li>

                      <li
                        className="relative group"
                        onMouseEnter={() => handleSubMouseEnter("mineria", 3)}
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
                            {especializaciones[3]?.map(
                              (
                                especializacion,
                                idx // Aquí usamos el schoolId 2 como ejemplo
                              ) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                                  <Link
                                    href={{
                                      pathname: "/mineria", // La ruta donde quieres que se apliquen los filtros
                                      query: {
                                        especializacion:
                                          especializacion.IdEspecializacion,
                                      }, // Pasar el nombre de la especialización como parámetro en la URL
                                    }}
                                    passHref
                                  >
                                    {especializacion.Especializacion}
                                  </Link>
                                </li> // Mostrar cada especialización en una lista
                              )
                            )}
                          </ul>
                        )}
                      </li>
                      {/* Linea Separadora */}
                      <hr className="border-t-2 border-blue-500 w-full p-0 m-0" />
                      {/* Rutas */}
                      <li
                        className="relative group"
                        // onMouseEnter={() => handleSubMouseEnter("rutas")}
                        onMouseLeave={handleSubMouseLeave}
                      >
                        <div className="px-4">
                          <Link
                            href="/"
                            className="p-4 w-44 hover:border-colors-sky-ccd border-transparent border-1  rounded-xl bor flex items-center gap-3"
                          >
                            <div className="bg-gradient-to-t from-[rgba(40,58,137,1)] to-[rgba(0,0,0,1)] flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-blue-500">
                              <img
                                src={images.rutas}
                                className="text-white text-[2px] p-[5px]"
                              />{" "}
                              {/* Tamaño del ícono ajustado */}
                            </div>
                            Rutas
                            {/* <MdKeyboardArrowRight /> */}
                          </Link>
                        </div>
                        {/* {activeSubCategory === "rutas" && (
                        <ul className="flex flex-col gap-2 absolute w-80 top-0 left-full bg-colors-night-blue-ccd2 bg-opacity-60 p-4 rounded-2xl shadow-lg backdrop-blur-md">
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/"
                              className="block hover:text-cyan-400"
                            >
                              Contrataciones y Compras Públicas
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/"
                              className="block hover:text-cyan-400"
                            >
                              Planeamiento Estratégico y Gestión de Desarrollo
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/"
                              className="block hover:text-cyan-400"
                            >
                              Gestión Financiera y Administrativa
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/"
                              className="block hover:text-cyan-400"
                            >
                              Administración Documentaría y Atención al
                              Ciudadano
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/"
                              className="block hover:text-cyan-400"
                            >
                              Gestión de Recursos Humanos en el Sector Público
                            </Link>
                          </li>
                          <li className="flex items-start gap-2">
                            <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                            <Link
                              href="/"
                              className="block hover:text-cyan-400"
                            >
                              Tecnología en el Sector Público
                            </Link>
                          </li>
                        </ul>
                      )} */}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link
                href="/nosotros"
                className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
              >
                NOSOTROS
                <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/corporativo"
                className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
              >
                CORPORATIVO
                <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/promociones"
                className="relative group md:text-xs xl:text-base text-cyan-400 font-bold hover:text-colors-cyan-ccd transition-all duration-300 flex items-center"
              >
                PROMOCIONES
                <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                <FaRegStar className="text-colors-cyan-ccd text-xl -mt-1 ml-1" />
              </Link>
            </li>
            <li>
              <Link
                // href="https://campus.ccdcapacitacion.edu.pe/mod/customcert/verify_certificate.php"
                href="/validar"
                className="relative group md:text-xs xl:text-base text-white transition-all duration-300"
              >
                VALIDAR
                <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            {/* <li>
              <ModalFormJobCCD/>
            </li> */}
            <li>
              <ModalRuleta />
            </li>
          </ul>

          {/* Acciones */}
          <div className="col-span-2 col-start-6 flex justify-end items-center space-x-4 text-white">
            <Link
              href="https://campus.ccdcapacitacion.edu.pe/login/index.php"
              target="_blank"
              className="relative group md:text-xs xl:text-base md:px-2 xl:px-4 py-2 max-lg:hidden bg-white text-blue-800 font-bold hover:bg-blue-800 hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 rounded-full"
            >
              AULA VIRTUAL
            </Link>

            {/* <Dropdown className="!min-w-28">
              <Button
                href="https://campus.ccdcapacitacion.edu.pe/login/index.php"
                variant="bordered"
              >
                Aula Virtual
              </Button>

              <DropdownTrigger className="relative group md:text-xs xl:text-base md:px-2 xl:px-4 py-2 bg-white text-colors-dark-blue-ccd font-bold hover:bg-colors-dark-blue-ccd hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 rounded-full">
                <Button variant="bordered">Aula Virtual</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="">
                <DropdownItem
                  key="nueva-plataforma"
                  href="http://localhost:9000/plataforma"
                  className="bg-colors-sky-ccd !text-white mb-1 hover:!bg-colors-cyan-ccd hover:!text-colors-dark-blue-ccd rounded-xl"
                >
                  Nueva Plataforma
                </DropdownItem>
                <DropdownItem
                  href="https://campus.ccdcapacitacion.edu.pe/login/index.php"
                  key="plataforma-anterior"
                >
                  Plataforma Anterior
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}

            {/* Cart Icon */}
            <CarritoE />

            {/* User Icon with Modal or Dropdown */}
            {session ? (
              <DropdownComponent /> // Si hay sesión, muestra el menú desplegable
            ) : (
              <NewModalLogeoComponent array={[]} /> // Si no hay sesión, muestra el modal
            )}
          </div>
        </div>

        {/* Menú desplegable para móvil */}
        <div className="inset-0 flex-1 relative ">
          {/* Capa de desenfoque detrás del contenido */}
          <div
            className={`fixed inset-0 bg-black/50 z-[99999999999]  ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <div className="absolute inset-0 bg-transparent filter blur-lg"></div>
          </div>

          {/* Botón de cierre fuera del menú, visible solo cuando el menú está abierto */}
          <button
            onClick={toggleMenu}
            className={`fixed top-4 left-[77%] text-black text-3xl focus:outline-none z-[99999999999] transition-transform duration-500 ease-in-out ${
              menuOpen ? "block" : "hidden"
            }
            `}
          >
            <AiOutlineClose className="bg-white rounded-full p-2 w-10 h-10" />
          </button>

          {/* Menú desplegable */}
          <div
            className={`w-[75%] fixed z-[99999999999]   inset-0 bg-colors-night-blue-ccd2 text-white flex flex-col justify-start p-8 items-start  h-screen transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-500 ease-in-out`}
          >
            {/* Menú principal */}
            {!subMenuOpen && !secondMenuOpen ? (
              <ul className="flex flex-col space-y-6 text-xl w-full">
                <li className="w-full">
                  <Link
                    onClick={toggleMenu}
                    href="/"
                    className="relative group md:text-xs xl:text-base text-white transition-all duration-300 flex justify-between"
                  >
                    INICIO <IoIosArrowForward />
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent  via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>

                <li>
                  <div
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter("escuelas")}
                    onMouseLeave={handleMouseLeave}
                    onClick={toggleSubMenu}
                  >
                    <button className="    md:text-xs xl:text-base flex items-center gap-2 hover:text-cyan-400 justify-between w-full">
                      ESCUELAS
                      <IoIosArrowForward />
                    </button>
                  </div>
                </li>
                <li>
                  <Link
                    onClick={toggleMenu}
                    href="/nosotros"
                    className="relative group md:text-xs xl:text-base text-white transition-all duration-300 flex justify-between"
                  >
                    NOSOTROS <IoIosArrowForward />
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleMenu}
                    href="/corporativo"
                    className="relative group md:text-xs xl:text-base text-white transition-all duration-300 flex justify-between"
                  >
                    CORPORATIVO
                    <IoIosArrowForward />
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleMenu}
                    href="/promociones"
                    className="relative group md:text-xs xl:text-base text-cyan-400 font-bold hover:text-colors-cyan-ccd transition-all duration-300 flex justify-between items-center"
                  >
                    PROMOCIONES
                    <IoIosArrowForward />
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-600 transition-all duration-300 group-hover:w-full "></span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleMenu}
                    href="https://campus.ccdcapacitacion.edu.pe/login/index.php"
                    target="_blank"
                    className="relative group md:text-xs xl:text-base md:px-2 xl:px-4 py-2 bg-white text-blue-800 font-bold hover:bg-blue-800 hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 rounded-xl px-4"
                  >
                    AULA VIRTUAL
                  </Link>
                </li>
                <li>
                  <ModalRuleta />
                </li>
                {/* <li>
                  <a
                    href="/about"
                    className="hover:text-gray-400"
                    onClick={toggleMenu}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="hover:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <button
                    onClick={toggleSubMenu}
                    className="hover:text-gray-400"
                  >
                    Diplomas
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleSecondMenu}
                    className="hover:text-gray-400"
                  >
                    Cursos
                  </button>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Contact
                  </a>
                </li> */}
              </ul>
            ) : subMenuOpen &&
              !innerSubMenuOpen &&
              !secondSubMenuOpen &&
              !treeSubMenuOpen ? (
              // Primer submenú
              <div className="flex flex-col space-y-6 text-xl">
                <button
                  onClick={toggleSubMenu}
                  className="hover:text-gray-400 flex gap-4 items-center"
                >
                  <MdArrowBackIosNew className="text-3xl p" /> ATRAS
                </button>
                <ul className="flex flex-col space-y-6 pl-5">
                  <li>
                    <button
                      onClick={toggleInnerSubMenu}
                      className="hover:text-gray-400 flex items-center gap-4 text-xl"
                    >
                      <div className=" flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-blue-500">
                        <img
                          src={images.ingenieria}
                          alt="Icono Gestión"
                          className="text-white text-[2px] p-[5px] -translate-y-[2.5px]"
                        />
                      </div>
                      Ingenieria
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={toggleSecondSubMenu}
                      className="hover:text-gray-400 flex items-center gap-4 text-xl"
                    >
                      <div className=" flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-red-500">
                        <img
                          src={images.gestion}
                          alt="Icono Gestión"
                          className="text-white text-[2px] p-[5px] -translate-y-[2.5px]"
                        />
                      </div>
                      Gestion publica
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={toggleTreeSubMenu}
                      className="hover:text-gray-400 flex items-center gap-4 text-xl"
                    >
                      <div className=" flex items-center justify-center w-10 h-10 rounded-full outline outline-[1.5px] outline-orange-500">
                        <img
                          src={images.mineria}
                          alt="Icono Gestión"
                          className="text-white text-[2px] p-[5px] -translate-y-[2.5px]"
                        />
                      </div>
                      Mineria
                    </button>
                  </li>
                </ul>
              </div>
            ) : innerSubMenuOpen ? (
              // Segundo submenú (primer nivel interno)
              <div className="flex flex-col space-y-6 text-xl">
                <button
                  onClick={toggleInnerSubMenu}
                  className="hover:text-gray-400 flex gap-4 items-center"
                >
                  <MdArrowBackIosNew className="text-3xl p" /> ESCUELAS
                </button>
                <ul className="flex flex-col space-y-6">
                  <li className="flex items-center gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link
                      href="/ingenieria"
                      className="block hover:text-cyan-400"
                    >
                      Civil
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link
                      href="/ingenieria"
                      className="block hover:text-cyan-400"
                    >
                      Software y Ciberseguridad
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link
                      href="/ingenieria"
                      className="block hover:text-cyan-400"
                    >
                      Industrial y Procesos
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link
                      href="/ingenieria"
                      className="block hover:text-cyan-400"
                    >
                      Ambiental y Energias Renovables
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link
                      href="/ingenieria"
                      className="block hover:text-cyan-400"
                    >
                      Ingeniería Estructura y Geotécnica
                    </Link>
                  </li>
                </ul>
              </div>
            ) : secondSubMenuOpen ? (
              // Submenú para Minería
              <div className="flex flex-col space-y-6 text-xl">
                <button
                  onClick={toggleSecondSubMenu}
                  className="hover:text-gray-400 flex gap-4 items-center"
                >
                  <MdArrowBackIosNew className="text-3xl p" /> ESCUELAS
                </button>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-start gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link href="/gestion" className="block hover:text-cyan-400">
                      Contrataciones y Compras Públicas
                    </Link>
                  </li>
                  <li className="flex items-start gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link href="/gestion" className="block hover:text-cyan-400">
                      Planeamiento Estratégico y Gestión de Desarrollo
                    </Link>
                  </li>
                  <li className="flex items-start gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link href="/gestion" className="block hover:text-cyan-400">
                      Gestión Financiera y Administrativa
                    </Link>
                  </li>
                  <li className="flex items-start gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link href="/gestion" className="block hover:text-cyan-400">
                      Administración Documentaría y Atención al Ciudadano
                    </Link>
                  </li>
                  <li className="flex items-start gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link href="/gestion" className="block hover:text-cyan-400">
                      Gestión de Recursos Humanos en el Sector Público
                    </Link>
                  </li>
                  <li className="flex items-start gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link href="/gestion" className="block hover:text-cyan-400">
                      Tecnología en el Sector Público
                    </Link>
                  </li>
                </ul>
              </div>
            ) : treeSubMenuOpen ? (
              // Submenú de Minería
              <div className="flex flex-col space-y-6 text-xl">
                <button
                  onClick={toggleTreeSubMenu}
                  className="hover:text-gray-400 flex gap-4 items-center"
                >
                  <MdArrowBackIosNew className="text-3xl p" /> ESCUELAS
                </button>
                <ul className="flex flex-col space-y-6">
                  <li className="flex items-start gap-2">
                    <BiSolidRightArrow className="text-colors-cyan-ccd w-5 h-5 flex-shrink-0" />
                    <Link href="/mineria" className="block hover:text-cyan-400">
                      Control de operaciones mineras
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
      {/* Modal usando Material-UI */}
      {/* <Modal open={isModalOpen} onClose={toggleModal}>
        <div className="flex justify-center items-center h-screen">
          <PacksSectionModalCasiV2 onClose={toggleModal} />
        </div>
      </Modal> */}
    </>
  );
};
export default Navbar;
