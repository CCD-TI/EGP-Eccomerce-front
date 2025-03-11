"use client"
import { Badge, Button, Divider, Input, Modal, ModalBody, ModalContent, Navbar, useDisclosure } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { FaBook, FaCartShopping, FaFacebook, FaLinkedinIn, FaPhoneVolume, FaTiktok, FaUsers, FaUserTie, FaWhatsapp } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { environment } from "@/environments/environment";
import ModalLogeoComponent from "@/components/ui/modal/modallogeo";
import { useTheme as useNextTheme } from "next-themes";
import { MdCorporateFare, MdEngineering, MdKeyboardArrowDown, MdKeyboardArrowRight, MdPlayArrow } from "react-icons/md";
import DropdownComponent from "@/components/ui/dropdown/dropdown";
import { SearchBar } from "@/components/ui/searchbar/searchbar";
import { SearchResultsList } from "@/components/ui/searchbar/searchresultlist";
import { AiFillInstagram, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import CarritoC from "@/components/ui/bruno/carritodeCpopover"
import { MdClose } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineMenu } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { PiCertificate, PiCertificateFill, PiStudentFill } from "react-icons/pi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { GiPublicSpeaker } from "react-icons/gi";
import { TbPointFilled } from "react-icons/tb";
import { IoIosArrowForward, IoIosPeople } from "react-icons/io";
import SidebarPlat from "@/components/ui/plataforma/SidebarPlat";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import BtnWhatssap from "@/components/ui/bruno/btnWhatssap";
import Newnavbar from "@/components/ui/paul/newnavbar";
import Footer from "@/components/ui/paul/footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false); // Controla el primer submenú
  const [secondMenuOpen, setSecondMenuOpen] = useState(false); // Controla el segundo submenú desde el menú principal
  const [innerSubMenuOpen, setInnerSubMenuOpen] = useState(false); // Controla el primer submenú dentro del primer submenú
  const [secondSubMenuOpen, setSecondSubMenuOpen] = useState(false); // Controla el segundo submenú dentro del primer submenú
  const [innerSubSecondMenuOpen, setInnerSubSecondMenuOpen] = useState(false); // Controla el submenú dentro del segundo menú principal
  const [additionalSubSecondMenuOpen, setAdditionalSubSecondMenuOpen] = useState(false); // Controla otro submenú dentro de Additional Menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubMenuOpen(false); // Cerrar submenús al cerrar el menú principal
    setSecondMenuOpen(false);
    setInnerSubMenuOpen(false);
    setSecondSubMenuOpen(false);
    setInnerSubSecondMenuOpen(false);
    setAdditionalSubSecondMenuOpen(false);
    // Evitar scroll en el fondo cuando el menú está abierto
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
    setInnerSubMenuOpen(false); // Cerrar los submenús internos
    setSecondSubMenuOpen(false);
  };

  const toggleSecondMenu = () => {
    setSecondMenuOpen(!secondMenuOpen); // Abrir el segundo submenú del menú principal
    setInnerSubSecondMenuOpen(false); // Cerrar submenú interno del segundo menú
    setAdditionalSubSecondMenuOpen(false); // Cerrar el otro submenú interno
  };

  const toggleInnerSubMenu = () => {
    setInnerSubMenuOpen(!innerSubMenuOpen); // Alternar el primer submenú interno
  };

  const toggleSecondSubMenu = () => {
    setSecondSubMenuOpen(!secondSubMenuOpen); // Alternar el segundo submenú interno
  };

  const toggleInnerSubSecondMenu = () => {
    setInnerSubSecondMenuOpen(!innerSubSecondMenuOpen); // Alternar el submenú dentro del segundo menú
  };

  const toggleAdditionalSubSecondMenu = () => {
    setAdditionalSubSecondMenuOpen(!additionalSubSecondMenuOpen); // Alternar otro submenú dentro del Additional Menu
  };



  const menuItems = [
    { label: "Cursos", href: "/cursos" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "CCD Corporativo", href: "/ccdC  orpo" },
    // { label: "Analytics", href: "/analytics" },
    // { label: "System", href: "/system" },
    // { label: "Deployments", href: "/deployments" },
    // { label: "My Settings", href: "/my-settings" },
    // { label: "Team Settings", href: "/team-settings" },
    // { label: "Help & Feedback", href: "/help-feedback" },
    // { label: "Log Out", href: "/logout" },
  ];
  const [activeShop, setActiveShop] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [activeSubSubCategory, setActiveSubSubCategory] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [caja1, setCaja1] = useState<any[]>([]);
  const [caja2, setCaja2] = useState<any[]>([]);
  const [caja3, setCaja3] = useState<any[]>([]);
  const [caja4, setCaja4] = useState<any[]>([]);
  const [caja5, setCaja5] = useState<any[]>([]);
  const [caja6, setCaja6] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const { setTheme, resolvedTheme } = useNextTheme();
  const [themeResolved, setThemeResolved] = useState<boolean>(false);

  useEffect(() => {
    if (resolvedTheme) {
      setThemeResolved(true);
    }
  }, [resolvedTheme]);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeSubSubCategory) return;

      setLoading(true);
      setError(null);

      try {
        let response;
        switch (Number(activeSubSubCategory)) {
          case 1:
            if (caja1.length === 0) {
              response = await api.post("/inicio/listarSubCategoriaxCategoria", {
                pcategoria: activeSubSubCategory,
              });
              setCaja1(response.data.data);
            }
            break;
          case 2:
            if (caja2.length === 0) {
              response = await api.post("/inicio/listarSubCategoriaxCategoria", {
                pcategoria: activeSubSubCategory,
              });
              setCaja2(response.data.data);
            }
            break;
          case 3:
            if (caja3.length === 0) {
              response = await api.post("/inicio/listarSubCategoriaxCategoria", {
                pcategoria: activeSubSubCategory,
              });
              setCaja3(response.data.data);
            }
            break;
          case 4:
            if (caja4.length === 0) {
              response = await api.post("/inicio/listarSubCategoriaxCategoria", {
                pcategoria: activeSubSubCategory,
              });
              setCaja4(response.data.data);
            }
            break;
          case 5:
            if (caja5.length === 0) {
              response = await api.post("/inicio/listarSubCategoriaxCategoria", {
                pcategoria: activeSubSubCategory,
              });
              setCaja5(response.data.data);
            }
            break;
          case 6:
            if (caja6.length === 0) {
              response = await api.post("/inicio/listarSubCategoriaxCategoria", {
                pcategoria: activeSubSubCategory,
              });
              setCaja6(response.data.data);
            }
            break;
          default:
            break;
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSubSubCategory]);


  const [results, setResults] = useState([]);
  const data = 'Hello, World!';


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data: session, status } = useSession();



  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpieza del event listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar el tamaño de la pantalla y actualizar el estado
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1250); // Pantallas móviles: <= 640px (sm)
    };

    // Ejecutar la función al cargar la página
    handleResize();

    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener('resize', handleResize);

    // Limpiar el evento al desmontar el componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Función para mostrar la otra vista
  const handleOtherView = () => {
    setIsOtherViewVisible(true);
  };

  // Función para cerrar la otra vista
  // const handleCloseView = () => {
  //   setIsOtherViewVisible(false);
  // };

  const cursos = [
    { id: 1, nombre: 'Curso ', descripcion: 'Aprende JavaScript desde cero.', link: '/curso/javascript' },
    { id: 2, nombre: 'Diploma ', descripcion: 'Domina React y crea aplicaciones increíbles.', link: '/curso/react' },

  ];

  const [isOtherViewVisible, setIsOtherViewVisible] = useState(false);
  const [isSecondViewVisible, setIsSecondViewVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const footerRef = useRef(null);

  const handleOpenView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsOtherViewVisible(true);
      setIsTransitioning(false);
    }, 10);
  };

  const handleCloseView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsOtherViewVisible(false);
      setIsTransitioning(false);
    }, 500);
  };

  const handleOpenSecondView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSecondViewVisible(true);
      setIsTransitioning(false);
    }, 10);
  };

  const handleCloseSecondView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSecondViewVisible(false);
      setIsTransitioning(false);
    }, 500);

  };
  const [showSubCategoriesSecond, setShowSubCategoriesSecond] = useState([false, false, false]); // Para subcategorías en la segunda vista
  const [showSubCategories, setShowSubCategories] = useState([false, false, false]);
  const handleToggleSubCategories = (index: number) => {
    const updatedState = [...showSubCategories];
    updatedState[index] = !updatedState[index];
    setShowSubCategories(updatedState);
  };

  const handleToggleSubCategoriesSecond = (index: number) => {
    const updatedState = [...showSubCategoriesSecond];
    updatedState[index] = !updatedState[index];
    setShowSubCategoriesSecond(updatedState);
  };



  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();


  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
      });
    };
  }, []);

  if (status === "loading") {
    return null; // Puedes mostrar un spinner o esqueleto aquí si prefieres
  }

  return (
    <>
      <div className={`h-full w-full flex flex-col items-center justify-center  `}
      >
        <Newnavbar/>
        <div className="h-full w-full text-[var(--color-contraneutral)] flex flex-col relative z-10 items-center 
           before:absolute before:h-[100svh] before:w-[100%]
           before:z-[-2] before:top-0 before:bottom-0 before:right-0 before:left-0">
          {/*Barra Superior*/}
          {/* {session?.user ? (<>
            
          </>) : (<>
           
          </>)} */}
          {/* navbarold => src/components/ui/paul/navbarold.txt*/}
          

          {isSearchModalOpen && (
            <>
              <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black bg-opacity-75">
                <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
                  <button
                    onClick={() => setIsSearchModalOpen(false)}
                    className="absolute top-[0.5rem] right-[0.3rem]"
                  >
                    <MdClose className="text-2xl text-black" />
                  </button>
                  <SearchBar setResults={setResults} />
                  {results.length > 0 && (
                    <SearchResultsList
                      results={results}
                      setResults={setResults}
                      handleClose={() => setIsSearchModalOpen(false)} // Cerramos el modal al seleccionar un resultado
                    />
                  )}
                </div>
              </div>

              {/* Estilos para evitar desplazamiento del fondo */}

            </>
          )}
          <div className="w-full min-h-screen flex flex-col">
            {environment.modo !== 'desarrollo' ? null : <SidebarPlat />}
            <div className="flex-grow">{children}</div>
          </div>
          {/*Efecto de bolas*/}
          {/* {!session?.user && (
          )} */}
          {/* Fondo inactivo */}
          {/* {environment.modo !== 'desarrollo' && (<div className="fixed z-[-1]">
            <div className="gradient-bg">
              <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                  </filter>
                </defs>
              </svg>
              <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
                <div className="interactive"></div>
              </div>
            </div>
          </div>)} */}

        </div>
      </div >
      <div>
      </div>
              <BtnWhatssap/> 
      {/* Footer */}
      <Footer environment={environment} />



    </>
  );



}
function setIsOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

