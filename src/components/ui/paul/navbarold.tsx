"use client"
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/solid";
import { Badge, Button, Divider, Input, Modal, ModalBody, ModalContent, Navbar, useDisclosure } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { FaCartShopping, FaFacebook, FaLinkedinIn, FaPhoneVolume, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { environment } from "@/environments/environment";
import { stringify } from "querystring";
import { RiArrowDownSFill } from "react-icons/ri";
import ModalLogeoComponent from "@/components/ui/modal/modallogeo";
import { DarkModeSwitch } from "@/components/ui/switch/DarkmodeSwitch";
import { useTheme as useNextTheme } from "next-themes";
import { MdEngineering, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import DropdownComponent from "@/components/ui/dropdown/dropdown";
import { SearchBar } from "@/components/ui/searchbar/searchbar";
import { SearchResultsList } from "@/components/ui/searchbar/searchresultlist";
import { AiFillInstagram } from "react-icons/ai";
import Modalcerti from "@/components/ui/bruno/modalCerti"
import CarritoC from "@/components/ui/bruno/carritodeCpopover"
import { MdClose } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaUser } from "react-icons/fa6";





import { NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link as NextUILink } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { PiCertificate, PiCertificateFill, PiStudentFill } from "react-icons/pi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { GoLaw } from "react-icons/go";
import { GiPublicSpeaker } from "react-icons/gi";



export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
  const { data: session } = useSession();



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
      setIsMobile(window.innerWidth <= 640); // Pantallas móviles: <= 640px (sm)
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
  const [isSecondViewVisible, setIsSecondViewVisible] = useState(false); // Nueva vista
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();


  return (
    <>
      <div className={`h-full w-full flex flex-col items-center justify-center bg-no-repeat bg-cover `}
      >
        <div className="h-full w-full text-[var(--color-contraneutral)] flex flex-col relative z-10 items-center 
           before:absolute before:h-[100svh] before:w-[100%]
           before:z-[-2] before:top-0 before:bottom-0 before:right-0 before:left-0">
          <Navbar className={`py-2  shadow-xl shadow-[var(--shadowccd)] ${isScrolled ? 'bg-[var(--ccdcolordefault)]' : 'bg-transparent'}`} position="sticky" maxWidth="full" onMenuOpenChange={setIsMenuOpen} classNames={{ brand: 'basis-[auto] flex-grow-0', wrapper: 'w-[90%] px-0' }}>
            <NavbarContent className="" justify="start">
              <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
              <NavbarBrand className=" ">
                {themeResolved && (
                  resolvedTheme === 'LightCCD' ? (
                    <Link href="/">
                      <Image src="/Multimedia/Imagen/logos/LogoCCD.png" alt="Logo CCD" width={55} height={55} className="cursor-pointer w-14 h-14" />
                    </Link>
                  ) : (
                    <Link href="/">
                      <Image src="/Multimedia/Imagen/logos/LogoCCDcontra.png" alt="Logo CCD Contra" width={55} height={55} className="cursor-pointer w-14 h-14" />
                    </Link>
                  )
                )}
              </NavbarBrand>
              <NavbarItem>
                <nav className="relative block  max-sm:hidden">
                  <button
                    className="text-[var(--color-contraneutral)] cursor-pointer py-[2.2rem] flex justify-center items-center group"
                    onMouseEnter={() => setActiveCategory('categorias')}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <span>Curso/Diplomas</span>
                    <MdKeyboardArrowDown className="text-2xl transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                  </button>

                  {activeCategory === 'categorias' && (
                    <div
                      className="absolute top-full left-0 h-[50vh] w-[12rem] border-b-[#041E42] border-b-[8px]   bg-[var(--ccdcolordefault)] mt-[-5px] border-[var(--color)]"
                      onMouseEnter={() => setActiveCategory('categorias')}
                      onMouseLeave={() => setActiveCategory(null)}

                    >
                      <ul className="px-3 py-3 "
                        onMouseLeave={() => setActiveSubCategory(null)}
                      >
                        <li
                          className="relative group"
                          onMouseEnter={() => setActiveSubCategory('Cursos')}

                        >
                          <Link href={{ pathname: '/tienda/Curso' }} className=" px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded flex justify-between items-center">
                            <div className="flex  justify-center items-center gap-2">
                              <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                <BiSolidBookBookmark className="text-xl text-white" />
                              </div>
                              <span className="text-[1rem] font-semibold">Cursos</span>
                            </div>
                            <MdKeyboardArrowRight />
                          </Link>
                          {activeSubCategory === 'Cursos' && (
                            <div className="absolute h-[50vh] left-full top-[0px] mt-[-11px] ml-[0.8rem] w-[14rem] bg-[var(--ccdcolordefault)] shadow-lg   border-b-[#041E42] border-b-[8px]  border-[var(--color)]"
                              onMouseEnter={() => setActiveSubSubCategory('1')}
                              onMouseLeave={() => setActiveSubSubCategory(null)}

                            >
                              <ul className="px-2 py-2">
                                <li onMouseEnter={() => setActiveSubSubCategory('1')}

                                >
                                  <Link href={{ pathname: '/tienda/Curso/Ingenieria' }} className="block px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded justify-between items-center">
                                    <div className="flex  justify-center items-center gap-2">
                                      <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                        <MdEngineering className="text-xl text-white" />
                                      </div>
                                      <span className="text-[1rem] font-semibold">Ingeniería</span>
                                    </div>
                                    <MdKeyboardArrowRight />

                                  </Link>
                                  {activeSubSubCategory === '1' && (
                                    <div className="absolute left-full  h-[50vh] top-0 mt-0 w-[25rem] bg-[var(--ccdcolordefault)] shadow-lg  rounded-br-2xl   border-b-[#041E42]  border-r-[#041E42]  border-b-[8px] border-r-[8px] border-[var(--color)] overflow-auto  "
                                    >
                                      <ul className="px-2  ">
                                        <li className="block px-4 py-2 text-[--color] rounded">
                                          <strong className="underline">Temas</strong>
                                        </li>
                                        {caja1.map((array) => (
                                          <li

                                            key={array.IdSubCategoria}

                                          >
                                            <Link href={{ pathname: `/tienda/Curso/Ingenieria/${array.SubCategoria}` }} className="block px-4 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded">{array.SubCategoria}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                                <li onMouseEnter={() => setActiveSubSubCategory('2')}
                                >
                                  <Link href={{ pathname: '/tienda/Curso/Derecho' }} className="block px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded justify-between items-center">
                                    <div className="flex  justify-center items-center gap-2">
                                      <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                        <GoLaw className="text-xl text-white" />
                                      </div>
                                      <span className="text-[1rem] font-semibold">Derecho</span>
                                    </div>
                                    <MdKeyboardArrowRight />

                                  </Link>
                                  {activeSubSubCategory === '2' && (
                                    <div className="absolute left-full  h-[50vh] top-0 mt-0 w-[25rem] bg-[var(--ccdcolordefault)] shadow-lg  rounded-br-2xl   border-b-[#041E42]  border-r-[#041E42]  border-b-[8px] border-r-[8px] border-[var(--color)] "
                                    >
                                      <ul className="px-2 ">
                                        <li className="block px-4 py-2 text-[--color] rounded">
                                          <strong className="underline">Temas</strong>
                                        </li>
                                        {caja2.map((array) => (
                                          <li
                                            key={array.IdSubCategoria}

                                          >
                                            <Link href={{ pathname: `/tienda/Curso/Derecho/${array.SubCategoria}` }} className="block px-4 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded">{array.SubCategoria}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                                <li onMouseEnter={() => setActiveSubSubCategory('3')}>
                                  <Link href={{ pathname: '/tienda/Curso/Gestión Pública' }} className="block px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded justify-between items-center">
                                    <div className="flex  justify-center items-center gap-2">
                                      <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                        <GiPublicSpeaker className="text-xl text-white" />
                                      </div>
                                      <span className="text-[1rem] font-semibold">Gestión Pública</span>
                                    </div>
                                    <MdKeyboardArrowRight />

                                  </Link>
                                  {activeSubSubCategory === '3' && (
                                    <div className="absolute left-full  h-[50vh] top-0 mt-0 w-[25rem] bg-[var(--ccdcolordefault)] shadow-lg   rounded-br-2xl   border-b-[#041E42]  border-r-[#041E42]  border-b-[8px] border-r-[8px] border-[var(--color)] "
                                    >
                                      <li className="block px-4 py-2 text-[--color] rounded">
                                        <strong className="underline">Temas</strong>
                                      </li>
                                      {caja3.map((array) => (
                                        <li
                                          key={array.IdSubCategoria}

                                        >
                                          <Link href={{ pathname: `/tienda/Curso/Gestión Pública/${array.SubCategoria}` }} className="block px-4 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded">{array.SubCategoria}</Link>
                                        </li>
                                      ))}
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                          )}
                        </li>
                        <li className="" onMouseEnter={() => setActiveSubCategory('Diplomas')}
                        >
                          <Link href={{ pathname: '/tienda/Diploma' }} className=" px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)]  flex justify-between items-center">
                            <div className="flex  justify-center items-center gap-2">
                              <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                <PiCertificateFill className="text-xl text-white" />
                              </div>
                              <span className="text-[1rem] font-semibold">Diplomas</span>
                            </div>

                            <MdKeyboardArrowRight />
                          </Link>
                          {activeSubCategory === 'Diplomas' && (
                            <div className="absolute h-[50vh] left-full top-1 mt-[-5px]  w-[14rem] bg-[var(--ccdcolordefault)] shadow-lg   border-b-[#041E42] border-b-[8px]  border-[var(--color)]  "
                              onMouseEnter={() => setActiveSubSubCategory('4')}
                              onMouseLeave={() => setActiveSubSubCategory(null)}

                            >
                              <ul className="px-2 py-2">
                                <li onMouseEnter={() => setActiveSubSubCategory('4')}
                                >
                                  <Link href={{ pathname: '/tienda/Diploma/Ingenieria' }} className=" px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded flex justify-between items-center">
                                    <div className="flex  justify-center items-center gap-2">
                                      <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                        <MdEngineering className="text-xl text-white" />
                                      </div>
                                      <span className="text-[1rem] font-semibold">Ingeniería</span>
                                    </div>
                                    <MdKeyboardArrowRight /></Link>
                                  {activeSubSubCategory === '4' && (
                                    <div className="absolute h-[50vh] left-full top-0 mt-0 w-[25rem] bg-[var(--ccdcolordefault)] shadow-lg  rounded-r-xl border-b-[#041E42] border-r-[#041E42] border-b-[8px] border-r-[8px]  border-[var(--color)] "
                                    >
                                      <ul className="px-2 ">
                                        <li className="block px-4 py-2 text-[--color] rounded">
                                          <strong className="underline">Temas</strong>
                                        </li>
                                        {caja4.map((array) => (
                                          <li
                                            key={array.IdSubCategoria}

                                          >
                                            <Link href={{ pathname: `/tienda/Diploma/Ingenieria/${array.SubCategoria}` }} className=" px-4 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded flex justify-between">{array.SubCategoria}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                                <li onMouseEnter={() => setActiveSubSubCategory('5')}>
                                  <Link href={{ pathname: '/tienda/Diploma/Derecho' }} className=" px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded flex justify-between items-center">
                                    <div className="flex  justify-center items-center gap-2">
                                      <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                        <GoLaw className="text-xl text-white" />
                                      </div>
                                      <span className="text-[1rem] font-semibold">Derecho</span>
                                    </div>
                                    <MdKeyboardArrowRight />
                                  </Link>
                                  {activeSubSubCategory === '5' && (
                                    <div className="absolute h-[50vh] left-full top-0 mt-0 w-[25rem] bg-[var(--ccdcolordefault)] shadow-lg  rounded-r-xl border-b-[#041E42] border-r-[#041E42] border-b-[8px] border-r-[8px]  border-[var(--color)] "
                                    >
                                      <ul className="px-2 ">
                                        <li className="block px-4 py-2 text-[--color] rounded">
                                          <strong className="underline">Temas</strong>
                                        </li>
                                        {caja5.map((array) => (
                                          <li
                                            key={array.IdSubCategoria}

                                          >
                                            <Link href={{ pathname: `/tienda/Diploma/Derecho/${array.SubCategoria}` }} className="block px-4 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded">{array.SubCategoria}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                                <li onMouseEnter={() => setActiveSubSubCategory('6')}>
                                  <Link href={{ pathname: '/tienda/Diploma/Gestión Pública' }} className="block px-2 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded justify-between items-center">
                                    <div className="flex  justify-center items-center gap-2">
                                      <div className="p-2 bg-[var(--ccdcolordark)] rounded-md">
                                        <GiPublicSpeaker className="text-xl text-white" />
                                      </div>
                                      <span className="text-[1rem] font-semibold">Gestión Pública</span>
                                    </div>
                                    <MdKeyboardArrowRight />
                                  </Link>
                                  {activeSubSubCategory === '6' && (
                                    <div className="absolute h-[50vh] left-full top-0 mt-0 w-[25rem] bg-[var(--ccdcolordefault)] shadow-lg rounded-r-xl border-b-[#041E42] border-r-[#041E42] border-b-[8px] border-r-[8px] border-[var(--color)] "
                                    >
                                      <ul className="px-2 ">
                                        <li className="block px-4 py-2 text-[--color] rounded">
                                          <strong className="underline">Temas</strong>
                                        </li>
                                        {caja6.map((array) => (
                                          <li
                                            key={array.IdSubCategoria}

                                          >
                                            <Link href={{ pathname: `/tienda/Diploma/Gestión Pública/${array.SubCategoria}` }} className="block px-4 py-2 text-[--color] hover:bg-[var(--shadowccd)] rounded">{array.SubCategoria}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                          )}
                        </li>

                      </ul>
                    </div>
                  )}
                </nav>

              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="center" className="flex sm:hidden"></NavbarContent>

            <NavbarContent className="hidden sm:flex justify-between" justify="center">
              <NavbarItem>
                <div className="flex items-center justify-center gap-4">
                  {/* Condicional: Renderizar solo si NO es móvil */}
                  {!isMobile && (
                    <div className="search-bar-container">
                      <SearchBar setResults={setResults} />
                      {results && results.length > 0 && <SearchResultsList results={results} setResults={setResults} />}
                    </div>
                  )}

                  <Link href="/nosotros">
                    <h1 className="text-[var(--color-contraneutral)] text-sm hover:text-[var(--ccdcolordark)] hover:underline hover:underline-offset-4 hover:decoration-[var(--ccdcolordark)] hover:decoration-2">
                      Nosotros
                    </h1>
                  </Link>
                  <Link href="/ccdCorpo">
                    <h1 className="text-[var(--color-contraneutral)] text-sm hover:text-[var(--ccdcolordark)] hover:underline hover:underline-offset-4 hover:decoration-[var(--ccdcolordark)] hover:decoration-2">
                      CCD Corporativo
                    </h1>
                  </Link>
                  <Link href="https://campus.ccdcapacitacion.edu.pe/mod/customcert/verify_certificate.php" target="_blank">
                    <Button className="bg-[var(--ccdcolordark)] text-white">
                      <PiCertificate className="text-2xl text-white" />
                      Verificar Certificado
                    </Button>
                  </Link>
                  <Link href="https://campus.ccdcapacitacion.edu.pe/login/index.php" target="_blank">
                    <Button className="bg-[var(--ccdcolordark)] text-white">
                      <PiStudentFill className="text-2xl text-white" />
                      Aula Virtual
                    </Button>
                  </Link>
                </div>
              </NavbarItem>
            </NavbarContent>


            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                <DarkModeSwitch />
              </NavbarItem>
              <NavbarItem className="hidden max-sm:flex">
                <>
                  <FiSearch className="text-[var(--color-contraneutral)] text-xl cursor-pointer" onClick={onOpen1} />

                  <Modal
                    placement='top'
                    isOpen={isOpen1}
                    onOpenChange={onOpenChange1}
                    aria-label="Modal para atender ticket"
                    aria-labelledby="modal-title"
                    size="2xl"
                    isDismissable={false}
                    backdrop="blur"
                    classNames={{
                       
                      base:"bg-transparent border-0 shadow-none",
                      closeButton:"hover:bg-white/5 active:bg-white/10"
                     
                    }}
                  >
                    <ModalContent 
                    >

                      {(onClose) => (
                        <>

                          <ModalBody >
                          
                              <div className="bg-transparent py-8 rounded-lg w-full max-w-md relative shadow-none">
                              
                                <SearchBar setResults={setResults} />
                                {results && results.length > 0 && (
                                  <SearchResultsList results={results} setResults={setResults} />
                                )}
                              </div>
                          

                          </ModalBody>

                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </>

              </NavbarItem>
              <NavbarItem>
                <CarritoC />
              </NavbarItem>
              {session ? (
                <NavbarItem>
                  <DropdownComponent />
                </NavbarItem>
              ) : (
                <NavbarItem>
                  <ModalLogeoComponent array={[]} />
                </NavbarItem>
              )}
            </NavbarContent>

            {/* Responsive Menu with additional views */}
            {!isOtherViewVisible && !isSecondViewVisible && (
              <NavbarMenu>

                <NavbarItem>
                  <button onClick={handleOpenView} className="bg-blue-500 text-white p-2">
                    Cursos
                  </button>
                </NavbarItem>

                <NavbarItem>
                  <button onClick={handleOpenSecondView} className="bg-green-500 text-white p-2">
                    Nueva Sección
                  </button>
                </NavbarItem>

                {menuItems.map((item, index) => (
                  <NavbarMenuItem key={`${item.label}-${index}`}>
                    <NextUILink
                      color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
                      className="w-full"
                      href={item.href}
                      size="lg"
                    >
                      {item.label}
                    </NextUILink>
                  </NavbarMenuItem>
                ))}


              </NavbarMenu>

            )}

            {/* Si la primera vista está visible */}
            {(isOtherViewVisible || isTransitioning) && (
              <div
                className={`fixed inset-0 bg-white z-[80] h-full w-full flex flex-col p-4 justify-start items-center transition-all duration-500 transform ${isOtherViewVisible && !isTransitioning ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                  }`}
              >
                <button onClick={handleCloseView} className="text-3xl text-black">
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineClose className="w-10 h-10" /> <span className="text-2xl">Volver</span>
                  </div>
                </button>

                <div className="pt-20">
                  <ul className="flex flex-col sm:flex-row justify-between items-start gap-4 p-4">
                    {/* Aquí van los cursos */}
                    <li className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full sm:w-1/3">
                      <h2 className="text-xl font-semibold text-gray-800">Curso de JavaScript</h2>
                      <p className="text-gray-600 mt-2">Aprende JavaScript desde cero.</p>
                    </li>
                    {/* Puedes agregar más cursos aquí */}
                  </ul>
                </div>
              </div>
            )}

          </Navbar>
          <>
            {/* Botón para abrir la vista */}
            {/* Si la segunda vista está visible */}
            {(isSecondViewVisible || isTransitioning) && (
              <div
                className={`fixed inset-0 bg-white z-[80] h-full w-full flex flex-col p-4 justify-start items-center transition-all duration-500 transform ${isSecondViewVisible && !isTransitioning ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                  }`}
              >
                <button onClick={handleCloseSecondView} className="text-3xl text-black">
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineClose className="w-10 h-10" /> <span className="text-2xl">Volver</span>
                  </div>
                </button>

                <div className="pt-20">
                  <ul className="flex bg-white  flex-col sm:flex-row justify-between items-start gap-4 p-4">
                    {/* Aquí va el contenido de la segunda vista */}
                    <li className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full sm:w-1/3">
                      <h2 className="text-xl font-semibold text-gray-800">Contenido de la nueva sección</h2>
                      <p className="text-gray-600 mt-2">Descripción de la nueva sección.</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Si la otra vista está visible o en transición */}
            {(isOtherViewVisible || isTransitioning) && (
              <div
                className={`fixed inset-0 bg-white z-[80] h-full w-full flex flex-col p-4 justify-start items-center transition-all duration-500 transform ${isOtherViewVisible && !isTransitioning ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                  }`}
              >
                <button onClick={handleCloseView} className="text-3xl text-black">
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineClose className="w-10 h-10" /> <span className="text-2xl">Volver</span>
                  </div>
                </button>

                <div className="pt-20">
                  <ul className="flex flex-col sm:flex-row justify-between items-start gap-4 p-4">
                    {/* Aquí van los cursos */}
                    <li className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full sm:w-1/3">
                      <h2 className="text-xl font-semibold text-gray-800">Curso de JavaScript</h2>
                      <p className="text-gray-600 mt-2">Aprende JavaScript desde cero.</p>


                    </li>
                    <li className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full sm:w-1/3">
                      <h2 className="text-xl font-semibold text-gray-800">Curso de JavaScript</h2>
                      <p className="text-gray-600 mt-2">Aprende JavaScript desde cero.</p>


                    </li>
                    <li className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full sm:w-1/3">
                      <h2 className="text-xl font-semibold text-gray-800">Curso de JavaScript</h2>
                      <p className="text-gray-600 mt-2">Aprende JavaScript desde cero.</p>


                    </li>
                    {/* Puedes agregar más cursos aquí */}
                  </ul>
                </div>
              </div>
            )}

            {/* Desactiva el scroll del body si la vista está visible */}
            <style jsx global>{`
        body {
          overflow: ${isOtherViewVisible || isTransitioning ? 'hidden' : 'auto'};
        }
      `}</style>
          </>



          {isSearchModalOpen && (
            <>
              <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black bg-opacity-75">
                <div className="bg-transparent p-8 rounded-lg w-full max-w-md relative">
                  <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-[0.5rem] right-[0.3rem] ">
                    <MdClose className="text-2xl text-white" />
                  </button>
                  <SearchBar setResults={setResults} />
                  {results && results.length > 0 && (
                    <SearchResultsList results={results} setResults={setResults} />
                  )}
                </div>
              </div>

              {/* Estilos para evitar el desplazamiento del fondo */}
              <style jsx global>{`
      body {
        overflow: hidden;
      }
    `}</style>
            </>
          )}
          {children}
          <div className="fixed bottom-0 right-0 z-10  hidden pointer-events-auto md:flex shadow-large">
            <div className=" bg-[var(--coloranti)] box-gen mx-auto flex flex-col items-center gap-2 rounded-tl-2xl  px-1.5 py-2 outline-0 ring-1 ring-zinc-200 dark:ring-[#1a1a1a]">
              <div className="flex flex-col gap-1.5">
                <button className="relative">
                  <a href="https://www.tiktok.com/@ccd.capacitacion" target="_blank">
                    <div className="z-30 flex items-center justify-center w-10 rounded-full box-gen aspect-square bg-[#09090A] dark:bg-neutral-900/70 ">
                      <FaTiktok className="text-white text-[1.3rem]" />
                    </div>
                  </a>
                </button>
                <button className="relative">
                  <a href="https://www.facebook.com/ccd.capacitacion?mibextid=LQQJ4d" target="_blank">
                    <div className="z-30 flex items-center justify-center w-10 rounded-full box-gen aspect-square bg-[#0775E8] dark:bg-neutral-900/70 ">
                      <FaFacebook className="text-white text-[1.3rem]" />
                    </div>
                  </a>
                </button>
                <button className="relative">
                  <a href="https://instagram.com/ccd.capacitacion?igshid=YmMyMTA2M2Y=" target="_blank">
                    <div className="z-30 flex items-center justify-center w-10 rounded-full box-gen aspect-square bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#515bd4] dark:bg-neutral-900/70 ">
                      <AiFillInstagram className="text-white text-[1.3rem]" />
                    </div>
                  </a>
                </button>
                <button className="relative">
                  <a href="https://www.linkedin.com/company/71737330/admin/" target="_blank">
                    <div className="z-30 flex items-center justify-center w-10 rounded-full box-gen aspect-square bg-[#0475B3] dark:bg-neutral-900/70  ">
                      <FaLinkedinIn className="text-white text-[1.3rem]" />
                    </div>
                  </a>
                </button>
              </div>
              <Divider className="text-[var(--color)] bg-[var(--color)]" />
              <div className="flex flex-col gap-1.5">
                <button className="relative">
                  <a href="tel:+34908846317" target="_blank">
                    <div className="z-30 flex items-center justify-center w-10 rounded-full box-gen aspect-square bg-[#09315A] dark:bg-neutral-900/70 ">
                      <FaPhoneVolume className="text-white text-[1.1rem]" />
                    </div>
                  </a>
                </button>
                <button className="relative ">
                  <a href="https://wa.me/34908846317" target="_blank">
                    <div className="z-30 flex items-center justify-center w-10 rounded-full box-gen aspect-square bg-[#3CDB58] dark:bg-neutral-900/70 ">
                      <FaWhatsapp className="text-white text-[1.3rem]" />
                    </div>
                  </a>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[var(--ccdcolordefault)] border-t-2">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className=" mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex justify-center gap-2 items-center">
                <img src="/Multimedia/Imagen/logos/LogoCCD.png" className="h-[8rem] w-[8rem] " alt="FlowBite Logo" />
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CCD</span> */}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                  </li>
                  <li>
                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">SunsentInnovation™ </a>. All Rights Reserved.</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                  <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                  <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>



    </>
  );



}