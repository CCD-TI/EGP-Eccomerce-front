"use client";
import DropdownComponent from "@/components/ui/dropdown/dropdown";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  Avatar,
  Button,
  Image,
  Input,
  Badge,
  Calendar,
  RangeCalendar,
  Tooltip,
  Divider,
  Accordion,
  AccordionItem,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, createContext, useContext } from "react";
import { AiFillNotification } from "react-icons/ai";
import {
  IoIosBookmarks,
  IoIosListBox,
  IoMdArrowRoundBack,
  IoMdArrowRoundForward,
  IoMdBookmarks,
  IoMdCloseCircle,
  IoMdLogIn,
  IoMdNotifications,
  IoMdSearch,
} from "react-icons/io";
import {
  IoCloseCircleOutline,
  IoDocumentAttach,
  IoHome,
  IoNotifications,
  IoNotificationsCircle,
  IoNotificationsCircleSharp,
  IoSearchCircleSharp,
  IoSettingsSharp,
  IoTicketSharp,
  IoTimerSharp,
} from "react-icons/io5";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as Tooltp,
  ResponsiveContainer,
} from "recharts";
import { parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { environment } from "@/environments/environment";
import axios from "axios";
import {
  FaArrowLeft,
  FaBars,
  FaClipboardList,
  FaRegCircle,
  FaShopify,
} from "react-icons/fa6";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaCalendarAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  PiListChecksLight,
  PiNumberOneBold,
  PiNumberThreeBold,
  PiNumberTwoBold,
} from "react-icons/pi";
import { GrCertificate, GrDocumentVerified } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import { Book, MoonIcon, SunIcon, TicketCheckIcon } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { MdLibraryBooks } from "react-icons/md";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import {
  BsClipboard2Data,
  BsFileEarmarkBarGraph,
  BsGraphDown,
} from "react-icons/bs";
import { CourseProvider } from "@/components/provider/providerCurs";
import CarritoC from "@/components/ui/bruno/carritodeCpopover";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TbHomeDollar, TbPointFilled } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa6";
import ModalSearch from "@/components/ui/bruno/ModalSearch";
import { TiInfoLarge } from "react-icons/ti";
import SheetResponsive from "@/components/ui/paul/sheetResponsive";

interface GlobalContextProps {
  nombreGlobal: string;
  setNombreGlobal: (value: string) => void;
}
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirige a la página de inicio
    }
  }, [status, router]);

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const [nombreGlobal, setNombreGlobal] = useState("MiNombreGlobal");

  // Esto asegura que el código se ejecute solo en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  // const [isOpen, setIsOpen] = useState(false)
  const [datomodulo, setdatomodulo] = useState([]);
  const [buscadordata, setbuscadordata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const listarTemario = await api.post("/inicio/listarinputlayoutv2", {});
        setbuscadordata(listarTemario.data.data[0]);
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    loadData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length < 3) {
      // Si el término tiene menos de 3 caracteres, limpiamos el filtro
      setFilteredData([]);
      return;
    }

    // Búsqueda insensible a mayúsculas, minúsculas y tildes.
    const normalizedTerm = term
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const filtered = buscadordata.filter((item: any) =>
      item.Curso.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedTerm)
    );
    setFilteredData(filtered);
  };

  const handleCourseClick = (curso: string) => {
    // Redirigir a la página con el nombre del curso como parámetro.
    router.push(`http://localhost:9000/plataforma/tienda?pcurso=${curso}`);
    setSearchTerm("");
  };

  const siderbarLinks = [
    {
      label: "Inicio",
      route: "/plataforma/",
      imgUrl: <IoHome className="text-white text-2xl" />,
    },
    {
      label: "Mis Diplomas Y Cursos",
      route: "/plataforma/mis-cursos",
      imgUrl: <IoIosBookmarks className="text-white text-2xl" />,
    },

    {
      label: "Mis Calificaciones",
      route: "/plataforma/mis-calificaciones",
      imgUrl: <GrDocumentVerified className="text-white text-2xl" />,
    },
    {
      label: "Administrador",
      route: "/plataforma/administrador",
      imgUrl: <RiAdminFill className="text-white text-2xl" />,
      allowedIds: ["1"], // IDs que pueden acceder a este enlace
    },
    {
      label: "Tienda",
      route: "/plataforma/tienda",
      imgUrl: <FaShopify className="text-white text-2xl" />,
    },
    {
      label: "Ranking",
      route: "/plataforma/ranking",
      imgUrl: <FaTrophy className="text-white text-2xl" />,
    },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSideSheetOpen2, setIsSideSheetOpen2] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024); // Cambia el valor según el breakpoint deseado
    };

    // Inicializar el estado según el tamaño de la pantalla
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);

  const data2 = [
    { name: "Curso F", nota: 20, pv: 4200, amt: 2400 },
    { name: "Curso E", nota: 18, pv: 3908, amt: 2400 },
    { name: "Curso D", nota: 14, pv: 9800, amt: 2400 },
    { name: "Curso C", nota: 14, pv: 1398, amt: 2400 },
    { name: "Curso B", nota: 16, pv: 4567, amt: 2400 },
    { name: "Curso A", nota: 19, pv: 2400, amt: 2400 },
  ];

  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 24,
    seconds: 3,
  });

  const cartItem = {
    title: "Detalle de compra",
    image: "/placeholder.svg?height=300&width=300",
    price: 249.99,
    originalPrice: 299.99,
    seller: "Colegio de Abogados",
    buyer: "Colegio de ingenieros",
    description:
      "Premium shopping cart with advanced features and modern design. Limited time offer available now.",
  };

  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const toggleAccordion = (key: string) => {
    setOpenItems((prev) => ({
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    // Configura el Popover para cerrarse automáticamente después de 12 segundos
    const timer = setTimeout(() => setIsPopoverOpen(false), 12000);
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  const announcement = {
    title: "Reprogramación de clases",
    date: "01/11/2024",
    avatarSrc: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    content:
      "Estimados estudiantes, les informo que la clase del día viernes será reprogramada...",
    author: {
      name: "Profesor Juan Pérez",
      department: "Departamento de Matemáticas",
    },
  };

  const filteredLinks = siderbarLinks.filter((link) => {
    if (link.allowedIds && session) {
      // Verificar si IdMenu tiene un valor válido
      const userIdMenus = session.user.IdMenu
        ? session.user.IdMenu.split(",")
        : []; // Si no hay IdMenu, usar un array vacío

      // Verificar si algún valor del usuario está permitido
      return (
        userIdMenus.length > 0 &&
        userIdMenus.some((id) => link.allowedIds.includes(id))
      );
    }
    return true; // Mostrar enlaces sin restricciones
  });
  ////

  const [topStudents, setTopStudents] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Se asume que la API retorna la data en response.data.data
        const response = await api.post("/inicio/listaralumnospuntaje10v2", {});
        // Se asume que la respuesta trae la data en response.data.data
        let data: any[] = response.data.data[0];

        // Ordena de mayor a menor puntaje
        data.sort((a, b) => b.Puntaje - a.Puntaje);

        // Asigna ranking, avatar y nombre a cada estudiante
        data = data.map((student, index) => ({
          ...student,
          rank: index + 1,
          // Si no tienes una imagen de perfil, se usa un placeholder personalizado
          avatar:
            student.RutaImagenPerfil ||
            `https://i.pravatar.cc/150?u=${student.IdUsuario}`,
          // Usamos el nombre completo o el usuario
          nombre: student.NombreCompleto || student.Usuario,
        }));

        // Tomamos solo los 10 primeros
        setTopStudents(data.slice(0, 10));
      } catch (error) {
        console.error("Error cargando los datos de Top Estudiantes:", error);
      }
    };

    loadData();
  }, []);

  // Función para asignar estilos diferentes a los botones según la posición
  const getButtonStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-black"; // Primer puesto (oro)
      case 2:
        return "bg-slate-400 text-black"; // Segundo puesto (plata)
      case 3:
        return "bg-amber-500 text-black"; // Tercer puesto (bronce)
      default:
        return "bg-[#022A53] text-white"; // Resto de los puestos
    }
  };

  if (!isClient) return null;
  return (
    <>
      <GlobalContext.Provider value={{ nombreGlobal, setNombreGlobal }}>
        <div className="w-full h-screen flex bg-black">
          <div className="w-[5%] h-full bg-[var(--platclaro)] flex flex-col justify-between max-lg:hidden ">
            <div>
              <div className="w-full text-center flex justify-center mt-0.5">
                <Image
                  className="text-center"
                  src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Logos/CCDLOGOWHITE3.png"
                  width={80}
                  height={80}
                  alt="Logo"
                />
              </div>
              <div className="h-full flex flex-col gap-3">
                {filteredLinks.map((link) => {
                  const isActive =
                    link.route === "/plataforma/" // Solo marcar activo Inicio si es exactamente la ruta base
                      ? pathname === link.route
                      : pathname.startsWith(link.route);

                  return (
                    <Link href={link.route} key={link.label} className="w-full">
                      <Tooltip
                        content={link.label}
                        className=""
                        placement={"right"}
                      >
                        <button
                          className={`flex gap-4 items-center p-3 m-auto rounded-xl justify-center hover:bg-blue-1 text-center ${
                            isActive ? "bg-[#007FEE]" : ""
                          }`}
                        >
                          {link.imgUrl}
                          <p
                            className={`text-lg font-semibold ${
                              isOpen ? "block" : "hidden"
                            }`}
                          >
                            {link.label}
                          </p>
                        </button>
                      </Tooltip>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="py-5">
              <Link
                href={""}
                key={1}
                className="flex gap-4 items-center p-4 rounded-lg justify-center hover:bg-blue-1 text-center"
              >
                <IoSettingsSharp className="text-white text-2xl" />
                <p
                  className={`text-lg font-semibold ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Ajustes
                </p>
              </Link>
              <Link
                href={""}
                key={2}
                className="flex gap-4 items-center p-4 rounded-lg justify-center hover:bg-blue-1 text-center"
              >
                <IoMdLogIn className="text-white text-2xl" />
                <p
                  className={`text-lg font-semibold ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Iniciar sesión
                </p>
              </Link>
            </div>
          </div>

          {/* Botón de Menú para Pantallas Pequeñas */}

          {/* Sheet para Pantallas Pequeñas */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="fixed z-40 p-2 m-2 mt-[1.2rem] bg-black border-2 text-white rounded-full scale-0 max-lg:scale-100">
                <FaBars className="text-3xl" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-colors-night-blue-ccd2 border-colors-dark-blue-ccd w-[80%] h-full overflow-y-auto">
              <SheetClose asChild>
                <FaArrowLeft className="text-5xl text-colors-sky-ccd" />
              </SheetClose>

              <div className="flex flex-1 flex-col gap-6 text-white p-4 rounded-lg">
                <div className="flex flex-col items-center gap-6 text-white">
                  <Image
                    alt="User"
                    src="/Multimedia/Imagen/images/avatar-3.png"
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                  />
                  {/* <div className="flex flex-col opacity-100 transition-opacity duration-300">
                    <h1 className="font-semibold text-lg">
                      Carranza Huamantica
                    </h1>
                    <p>Bruno Enrique</p>
                    <Link href="#" underline="always" color="foreground">
                      Editar
                    </Link>
                  </div> */}
                </div>
                {siderbarLinks.map((link) => {
                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        className="flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-blue-1"
                      >
                        {link.imgUrl}
                        <p className="text-lg text-white font-semibold">
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          <div
            className={`w-[70%] relative h-full bg-[var(--platoscuro)] max-lg:pl-[4.5rem] max-sm:pl-[4rem]  overflow-auto custom-scrollbar1 flex flex-col gap-3 max-lg:w-[100%]  
                                                               
                                                                 `}
          >
            <div className="py-4 px-8 flex justify-between max-lg:justify-end max-sm:justify-center  gap-10 max-sm:gap-4 items-center sticky top-[-1px] z-[11] bg-[#0B1026]">
              <div className="relative w-[30rem] max-lg:hidden ">
                <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 text-xl" />
                <input
                  className="w-full rounded-xl !bg-slate-900/50 border-[#006FEE] border pl-10 py-3 text-white placeholder:text-slate-400"
                  placeholder="Digite el producto a buscar"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#006FEE] hover:bg-blue-700 text-white">
                  Buscar
                </Button>

                {/* Desplegable */}
                {searchTerm && filteredData.length > 0 && (
                  <div className="absolute top-full mt-2 w-full max-h-60 bg-[#131939]  shadow-lg overflow-y-auto z-50">
                    {filteredData.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center p-3 hover:bg-[#006FEE]  cursor-pointer"
                        onClick={() => handleCourseClick(item.Curso)}
                      >
                        <Image
                          removeWrapper
                          src={environment.baseUrlStorage + item.RutaImagen}
                          alt={item.Curso}
                          className="w-12 h-12 rounded-xl mr-3"
                        />
                        <span className="text-sm text-white">{item.Curso}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ModalSearch
                content={(onClose) => (
                  <div className="relative w-[30rem] ">
                    <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 text-xl" />
                    <input
                      className="w-full rounded-xl !bg-slate-900/50 border-[#006FEE] border pl-10 py-3 text-white placeholder:text-slate-400"
                      placeholder="Digite el producto a buscar"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#006FEE] hover:bg-blue-700 text-white">
                      Buscar
                    </Button>

                    {/* Desplegable */}
                    {searchTerm && filteredData.length > 0 && (
                      <div className="absolute top-full mt-2 w-full max-h-60 bg-[#131939]  shadow-lg overflow-y-auto z-50">
                        {filteredData.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center p-3 hover:bg-[#006FEE]  cursor-pointer"
                            onClick={() => handleCourseClick(item.Curso)}
                          >
                            <Image
                              removeWrapper
                              src={environment.baseUrlStorage + item.RutaImagen}
                              alt={item.Curso}
                              className="w-12 h-12 rounded-xl mr-3"
                            />
                            <span className="text-sm text-white">
                              {item.Curso}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
              <div className="flex gap-5 items-center justify-center">
                <div className="flex gap-2 items-center justify-center">
                  <Link href="/" className="max-lg:hidden">
                    <Button className="bg-[#006FEE] text-white mr-2">
                      Volver al ecommerce
                    </Button>
                  </Link>
                  <Link href="/" className="scale-0 max-lg:scale-100">
                    <button className="p-2.5 rounded-full border-1 text-white mr-2">
                      <TbHomeDollar className="text-xl " />
                    </button>
                  </Link>
                  <Dropdown>
                    <DropdownTrigger>
                      <button>
                        <Badge
                          content={1}
                          shape="circle"
                          className="bg-[#006FEE] text-white border-0"
                        >
                          <IoMdNotifications className="text-white text-2xl" />
                        </Badge>
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dropdown menu with description"
                      variant="faded"
                    >
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        description="Permanently delete the file"
                        shortcut="⌘⇧D"
                      >
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <button>
                        <Badge
                          content={5}
                          shape="circle"
                          className="bg-[#006FEE] text-white border-0"
                        >
                          <AiFillNotification className="text-white text-2xl" />
                        </Badge>
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dropdown menu with description"
                      variant="faded"
                    >
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        description="Permanently delete the file"
                        shortcut="⌘⇧D"
                      >
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <CarritoC />
                </div>

                <DropdownComponent />
              </div>
            </div>
            {children}
          </div>
          <div
            className={` h-full w-[25%]  max-lg:w-0 overflow-auto bg-[var(--platclaro)] rounded-none  `}
          >
            {nombreGlobal == "principal" && (
              <>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between px-5 py-4">
                    <p className="text-white font-bold text-xl">Estadísticas</p>
                    <p className="text-[#007FED] font-bold text-lg">
                      Ver todos
                    </p>
                  </div>
                  <div className="px-5">
                    <div className="bg-[#0B1026] text-white py-3 px-4 flex justify-between">
                      <p>Cursos Comprados</p>
                      <p>10</p>
                    </div>
                    <div className="bg-transparent text-white py-3 px-4 flex justify-between">
                      <p>Cursos en Progreso</p>
                      <p>4</p>
                    </div>
                    <div className="bg-[#0B1026] text-white py-3 px-4 flex justify-between">
                      <p>Cursos Finalizados</p>
                      <p>6</p>
                    </div>
                  </div>
                  <div className="line-chart-wrapper w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart className="right-6" data={data2} syncId="test">
                        <Line
                          isAnimationActive={true}
                          type="monotone"
                          dataKey="nota"
                          stroke="#0080EE"
                        />
                        <Tooltp />
                        <XAxis dataKey="name" />
                        <YAxis />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  {/* Header */}
                  <div className="flex justify-between px-5 py-4">
                    <p className="text-white font-bold text-xl">
                      Top Estudiantes
                    </p>
                    <Link href={"ranking"}>
                      <p className="text-[#007FED] font-bold text-lg">
                        Ver todos
                      </p>
                    </Link>
                  </div>

                  {/* Lista de estudiantes */}
                  <div className="flex flex-col gap-3 px-5 mb-5">
                    {topStudents.map((student, index) => (
                      <div
                        key={student.IdUsuario}
                        className="flex gap-3 justify-between items-center"
                      >
                        <div className="flex flex-row gap-2 items-center ">
                          <Avatar
                            src={student.avatar}
                            size="lg"
                            className="!min-w-[3.5rem] !max-w-[3.5rem] w-[3.5rem]"
                          />
                          <h1 className="text-white">
                            {student.nombre
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (palabra: any) =>
                                  palabra.charAt(0).toUpperCase() +
                                  palabra.slice(1)
                              )
                              .join(" ")}
                          </h1>
                        </div>
                        <Button
                          color="primary"
                          variant="solid"
                          className={getButtonStyle(student.rank)}
                        >
                          #{student.rank}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <SheetResponsive
                  btn={
                    <button className="border-2 border-colors-sky-ccd bg-colors-sky-ccd text-white p-2 m-2 rounded-full absolute left-0 top-20">
                      <BsFileEarmarkBarGraph className="text-3xl text-colors-dark-blue-ccd" />
                    </button>
                  }
                  content={
                    <>
                      <div className="flex flex-col gap-6">
                        <div className="flex justify-between px-5 py-4">
                          <p className="text-white font-bold text-xl">
                            Estadísticas
                          </p>
                          <p className="text-[#007FED] font-bold text-lg">
                            Ver todos
                          </p>
                        </div>
                        <div className="px-5">
                          <div className="bg-[#0B1026] text-white py-3 px-4 flex justify-between">
                            <p>Cursos Comprados</p>
                            <p>10</p>
                          </div>
                          <div className="bg-transparent text-white py-3 px-4 flex justify-between">
                            <p>Cursos en Progreso</p>
                            <p>4</p>
                          </div>
                          <div className="bg-[#0B1026] text-white py-3 px-4 flex justify-between">
                            <p>Cursos Finalizados</p>
                            <p>6</p>
                          </div>
                        </div>
                        <div className="line-chart-wrapper w-full h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              className="right-6"
                              data={data2}
                              syncId="test"
                            >
                              <Line
                                isAnimationActive={true}
                                type="monotone"
                                dataKey="nota"
                                stroke="#0080EE"
                              />
                              <Tooltp />
                              <XAxis dataKey="name" />
                              <YAxis />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div>
                        {/* Header */}
                        <div className="flex justify-between px-5 py-4">
                          <p className="text-white font-bold text-xl">
                            Top Estudiantes
                          </p>
                          <Link href={"ranking"}>
                            <p className="text-[#007FED] font-bold text-lg">
                              Ver todos
                            </p>
                          </Link>
                        </div>

                        {/* Lista de estudiantes */}
                        <div className="flex flex-col gap-3 px-5 mb-5">
                          {topStudents.map((student, index) => (
                            <div
                              key={student.IdUsuario}
                              className="flex gap-3 justify-between items-center"
                            >
                              <div className="flex flex-row gap-2 items-center ">
                                <Avatar
                                  src={student.avatar}
                                  size="lg"
                                  className="!min-w-[3.5rem] !max-w-[3.5rem] w-[3.5rem]"
                                />
                                <h1 className="text-white">
                                  {student.nombre
                                    .toLowerCase()
                                    .split(" ")
                                    .map(
                                      (palabra: any) =>
                                        palabra.charAt(0).toUpperCase() +
                                        palabra.slice(1)
                                    )
                                    .join(" ")}
                                </h1>
                              </div>
                              <Button
                                color="primary"
                                variant="solid"
                                className={getButtonStyle(student.rank)}
                              >
                                #{student.rank}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  }
                />
              </>
            )}
            {nombreGlobal == "mis-cursos" && (
              <>
                <div className=" mt-5 flex gap-3 flex-col justify-center items-center">
                  <p className="text-white font-bold text-xl w-full px-5">
                    Calendario Institucional
                  </p>
                  <CalendarComponent />
                </div>
                <div className=" mt-5 flex gap-3 flex-col justify-center items-center px-5">
                  <p className="text-white font-bold text-xl w-full ">
                    Nuevos Anuncios
                  </p>

                  <Tooltip
                    content="Valorización y liquidación de obras públicas y privadas"
                    className="w-full"
                  >
                    <button className="w-full">
                      <div className="bg-[#0B1026] p-4 rounded-2xl relative flex gap-5 items-center w-full cursor-pointer hover:bg-[#131939]/70 transition-all duration-200 border-blue-400 border">
                        <Avatar src={announcement.avatarSrc} />
                        <div className="flex flex-col gap-2">
                          <p className="flex gap-1 items-center m-0">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <span className="text-white text-sm">
                              Asunto: {announcement.title}
                            </span>
                          </p>
                          <p className="flex gap-1 items-center m-0">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                            </svg>
                            <span className="text-white text-sm">
                              Fecha de publicación: {announcement.date}
                            </span>
                          </p>
                        </div>
                      </div>
                    </button>
                  </Tooltip>
                  <Tooltip
                    content="Valorización y liquidación de obras públicas y privadas"
                    className="w-full"
                  >
                    <button className="w-full">
                      <div className="bg-[#0B1026] p-4 rounded-2xl relative flex gap-5 items-center w-full cursor-pointer hover:bg-[#131939]/70 transition-all duration-200 border-blue-400 border">
                        <Avatar src={announcement.avatarSrc} />
                        <div className="flex flex-col gap-2">
                          <p className="flex gap-1 items-center m-0">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <span className="text-white text-sm">
                              Asunto: {announcement.title}
                            </span>
                          </p>
                          <p className="flex gap-1 items-center m-0">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                            </svg>
                            <span className="text-white text-sm">
                              Fecha de publicación: {announcement.date}
                            </span>
                          </p>
                        </div>
                      </div>
                    </button>
                  </Tooltip>
                  <Tooltip
                    content="Valorización y liquidación de obras públicas y privadas"
                    className="w-full"
                  >
                    <button className="w-full">
                      <div className="bg-[#0B1026] p-4 rounded-2xl relative flex gap-5 items-center w-full cursor-pointer hover:bg-[#131939]/70 transition-all duration-200 border-blue-400 border">
                        <Avatar src={announcement.avatarSrc} />
                        <div className="flex flex-col gap-2">
                          <p className="flex gap-1 items-center m-0">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <span className="text-white text-sm">
                              Asunto: {announcement.title}
                            </span>
                          </p>
                          <p className="flex gap-1 items-center m-0">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                            </svg>
                            <span className="text-white text-sm">
                              Fecha de publicación: {announcement.date}
                            </span>
                          </p>
                        </div>
                      </div>
                    </button>
                  </Tooltip>
                </div>

                <SheetResponsive
                  btn={
                    <button className="border-2 border-colors-sky-ccd bg-colors-sky-ccd  text-white p-2 m-2 rounded-full absolute left-0 top-20">
                      <FaRegCalendarAlt className="text-3xl text-colors-dark-blue-ccd" />
                    </button>
                  }
                  content={
                    <>
                      <div className=" mt-5 flex gap-3 flex-col justify-center items-center">
                        <p className="text-white font-bold text-xl w-full px-5">
                          Calendario Institucional
                        </p>
                        <CalendarComponent />
                      </div>
                      <div className=" mt-5 flex gap-3 flex-col justify-center items-center px-5">
                        <p className="text-white font-bold text-xl w-full ">
                          Nuevos Anuncios
                        </p>

                        <Tooltip
                          content="Valorización y liquidación de obras públicas y privadas"
                          className="w-full"
                        >
                          <button className="w-full">
                            <div className="bg-[#0B1026] p-4 rounded-2xl relative flex gap-5 items-center w-full cursor-pointer hover:bg-[#131939]/70 transition-all duration-200 border-blue-400 border">
                              <Avatar src={announcement.avatarSrc} />
                              <div className="flex flex-col gap-2">
                                <p className="flex gap-1 items-center m-0">
                                  <svg
                                    className="w-5 h-5 text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                  </svg>
                                  <span className="text-white text-sm">
                                    Asunto: {announcement.title}
                                  </span>
                                </p>
                                <p className="flex gap-1 items-center m-0">
                                  <svg
                                    className="w-5 h-5 text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                                  </svg>
                                  <span className="text-white text-sm">
                                    Fecha de publicación: {announcement.date}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Valorización y liquidación de obras públicas y privadas"
                          className="w-full"
                        >
                          <button className="w-full">
                            <div className="bg-[#0B1026] p-4 rounded-2xl relative flex gap-5 items-center w-full cursor-pointer hover:bg-[#131939]/70 transition-all duration-200 border-blue-400 border">
                              <Avatar src={announcement.avatarSrc} />
                              <div className="flex flex-col gap-2">
                                <p className="flex gap-1 items-center m-0">
                                  <svg
                                    className="w-5 h-5 text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                  </svg>
                                  <span className="text-white text-sm">
                                    Asunto: {announcement.title}
                                  </span>
                                </p>
                                <p className="flex gap-1 items-center m-0">
                                  <svg
                                    className="w-5 h-5 text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                                  </svg>
                                  <span className="text-white text-sm">
                                    Fecha de publicación: {announcement.date}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Valorización y liquidación de obras públicas y privadas"
                          className="w-full"
                        >
                          <button className="w-full">
                            <div className="bg-[#0B1026] p-4 rounded-2xl relative flex gap-5 items-center w-full cursor-pointer hover:bg-[#131939]/70 transition-all duration-200 border-blue-400 border">
                              <Avatar src={announcement.avatarSrc} />
                              <div className="flex flex-col gap-2">
                                <p className="flex gap-1 items-center m-0">
                                  <svg
                                    className="w-5 h-5 text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                  </svg>
                                  <span className="text-white text-sm">
                                    Asunto: {announcement.title}
                                  </span>
                                </p>
                                <p className="flex gap-1 items-center m-0">
                                  <svg
                                    className="w-5 h-5 text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                                  </svg>
                                  <span className="text-white text-sm">
                                    Fecha de publicación: {announcement.date}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </button>
                        </Tooltip>
                      </div>
                    </>
                  }
                />
              </>
            )}
            {nombreGlobal == "contenido-curso" && (
              <>
                <SheetResponsive
                  content={<></>}
                  btn={
                    <button className="border-2 text-white p-2 m-2 rounded-full absolute -left-20 top-20  z-40">
                      <MdLibraryBooks className="text-3xl" />
                    </button>
                  }
                />
              </>
            )}
            {nombreGlobal == "evaluaciones" && (
              <>
                <div className="bg-[#131939] bg-cover h-full w-full ">
                  <div className="mt-6 ">
                    <p className="text-white font-bold text-xl w-full px-5">
                      Indicaciones
                    </p>
                    <div className="px-5 flex flex-col gap-4 mt-3">
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberOneBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Intentos Máximos
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Se tienen 3 intentos como máximo, despues de estos
                          intentos no se podra volver a dar uno nuevamente.
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberTwoBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Método de calificación
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          El método de calificación es el más alto, quiere decir
                          si se tiene de nota 10,15,19, la nota final sera 19
                          siendo esta la mayor de los 3 intentos.
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberThreeBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Duración de la evaluación
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Al iniciar el examen, el tiempo se pone en marcha,
                          acabado el tiempo se guardan todas las respuestas y se
                          envia el examen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <SheetResponsive
                  content={
                    <>
                      <div className="bg-[#131939] bg-cover h-full w-full ">
                        <div className="mt-6 ">
                          <p className="text-white font-bold text-xl w-full px-5">
                            Indicaciones
                          </p>
                          <div className="px-5 flex flex-col gap-4 mt-3">
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberOneBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-300 m-0">
                                  Intentos Máximos
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Se tienen 3 intentos como máximo, despues de
                                estos intentos no se podra volver a dar uno
                                nuevamente.
                              </p>
                            </div>
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberTwoBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-300 m-0">
                                  Método de calificación
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                El método de calificación es el más alto, quiere
                                decir si se tiene de nota 10,15,19, la nota
                                final sera 19 siendo esta la mayor de los 3
                                intentos.
                              </p>
                            </div>
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberThreeBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-300 m-0">
                                  Duración de la evaluación
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Al iniciar el examen, el tiempo se pone en
                                marcha, acabado el tiempo se guardan todas las
                                respuestas y se envia el examen.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  btn={
                    <button className="border-2 text-white p-2 m-2 rounded-full bg-colors-sky-ccd  absolute left-0 top-20  ">
                      <TiInfoLarge className="text-3xl text-colors-dark-blue-ccd" />
                    </button>
                  }
                />
              </>
            )}
            {nombreGlobal == "curso-calificaciones" && (
              <>
                <div className="bg-[#131939] bg-cover h-full w-full ">
                  <div className="mt-6 ">
                    <p className="text-white font-bold text-xl w-full px-5">
                      Indicaciones
                    </p>
                    <div className="px-5 flex flex-col gap-4 mt-3">
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberOneBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Transparencia en Calificaciones
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Tu historial de calificaciones está disponible para
                          que puedas hacer un seguimiento detallado de tu
                          desempeño en cada evaluación. Esto te permite
                          identificar áreas de mejora y planificar estrategias
                          para alcanzar mejores resultados.{" "}
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberTwoBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Fechas y Horarios Registrados
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Cada evaluación incluye las fechas y horarios de
                          entrega, garantizando claridad y organización. Este
                          detalle te ayuda a verificar tus progresos y cumplir
                          con los plazos establecidos.{" "}
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberThreeBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Compromiso con el Aprendizaje
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Más allá de los números, nuestras evaluaciones buscan
                          impulsarte a aprender y superar tus metas académicas.
                          Cada resultado es una oportunidad para reflexionar
                          sobre tu crecimiento y mantenerte enfocado en el
                          éxito.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <SheetResponsive
                  content={
                    <>
                      <div className="bg-[#131939] bg-cover h-full w-full ">
                        <div className="mt-6 ">
                          <p className="text-white font-bold text-xl w-full px-5">
                            Indicaciones
                          </p>
                          <div className="px-5 flex flex-col gap-4 mt-3">
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberOneBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-300 m-0">
                                  Transparencia en Calificaciones
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Tu historial de calificaciones está disponible
                                para que puedas hacer un seguimiento detallado
                                de tu desempeño en cada evaluación. Esto te
                                permite identificar áreas de mejora y planificar
                                estrategias para alcanzar mejores resultados.{" "}
                              </p>
                            </div>
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberTwoBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-300 m-0">
                                  Fechas y Horarios Registrados
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Cada evaluación incluye las fechas y horarios de
                                entrega, garantizando claridad y organización.
                                Este detalle te ayuda a verificar tus progresos
                                y cumplir con los plazos establecidos.{" "}
                              </p>
                            </div>
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberThreeBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-300 m-0">
                                  Compromiso con el Aprendizaje
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Más allá de los números, nuestras evaluaciones
                                buscan impulsarte a aprender y superar tus metas
                                académicas. Cada resultado es una oportunidad
                                para reflexionar sobre tu crecimiento y
                                mantenerte enfocado en el éxito.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  btn={
                    <button className="border-2 text-white p-2 m-2 rounded-full bg-colors-sky-ccd  absolute left-0 top-20  ">
                      <TiInfoLarge className="text-3xl text-colors-dark-blue-ccd" />
                    </button>
                  }
                />
              </>
            )}
            {nombreGlobal == "curso-encuestas" && (
              <>
                <div className="bg-[#131939] bg-cover h-full w-full ">
                  <div className="mt-6 ">
                    <p className="text-white font-bold text-xl w-full px-5">
                      Indicaciones
                    </p>
                    <div className="px-5 flex flex-col gap-4 mt-3">
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberOneBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Privacidad de Respuestas
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Tu participación en la encuesta es completamente
                          confidencial. Las respuestas serán usadas únicamente
                          con el propósito de mejorar los cursos y garantizar
                          una mejor experiencia para todos los estudiantes.
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberTwoBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Un Compromiso con la Calidad
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Esta encuesta es una herramienta clave para
                          identificar oportunidades de mejora. Tu
                          retroalimentación será analizada cuidadosamente por
                          nuestro equipo para implementar cambios que beneficien
                          tanto a futuros participantes como a ti.{" "}
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberThreeBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Tiempo Valioso y Eficiente
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Valoramos tu tiempo y hemos diseñado la encuesta para
                          que sea rápida y directa. Con un tiempo estimado de
                          solo 3 minutos, puedes compartir tu opinión de manera
                          eficiente sin interrumpir tus actividades diarias.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <SheetResponsive
                  content={
                    <>
                      <div className="bg-[#131939] bg-cover h-full w-full ">
                        <div className="mt-6 ">
                          <p className="text-white font-bold text-xl w-full px-5">
                            Indicaciones
                          </p>
                          <div className="px-5 flex flex-col gap-4 mt-3">
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberOneBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-300 m-0">
                                  Privacidad de Respuestas
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Tu participación en la encuesta es completamente
                                confidencial. Las respuestas serán usadas
                                únicamente con el propósito de mejorar los
                                cursos y garantizar una mejor experiencia para
                                todos los estudiantes.
                              </p>
                            </div>
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberTwoBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-300 m-0">
                                  Un Compromiso con la Calidad
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Esta encuesta es una herramienta clave para
                                identificar oportunidades de mejora. Tu
                                retroalimentación será analizada cuidadosamente
                                por nuestro equipo para implementar cambios que
                                beneficien tanto a futuros participantes como a
                                ti.{" "}
                              </p>
                            </div>
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberThreeBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-300 m-0">
                                  Tiempo Valioso y Eficiente
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Valoramos tu tiempo y hemos diseñado la encuesta
                                para que sea rápida y directa. Con un tiempo
                                estimado de solo 3 minutos, puedes compartir tu
                                opinión de manera eficiente sin interrumpir tus
                                actividades diarias.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  btn={
                    <button className="border-2 text-white p-2 m-2 rounded-full bg-colors-sky-ccd  absolute left-0 top-20  ">
                      <TiInfoLarge className="text-3xl text-colors-dark-blue-ccd" />
                    </button>
                  }
                />
              </>
            )}
            {nombreGlobal == "curso-certificados" && (
              <>
                <div className="bg-[#131939] bg-cover h-full w-full ">
                  <div className="mt-6 ">
                    <p className="text-white font-bold text-2xl w-full px-5">
                      Indicaciones
                    </p>
                    <div className="px-5 flex flex-col gap-4 mt-3">
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberOneBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Requisitos
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0 flex gap-1 items-center ">
                          <TbPointFilled className="text-[#006FEE]" />
                          <span>Tener notas en todas las evaluaciones</span>
                        </p>
                        <p className="text-blue-100 m-0 flex gap-1 items-center ">
                          <TbPointFilled className="text-[#006FEE]" />
                          <span>Tener un promedio final de 14 o mayor</span>
                        </p>
                        <p className="text-blue-100 m-0 flex gap-1 items-center ">
                          <TbPointFilled className="text-[#006FEE]" />
                          <span>Responder todas las encuestas</span>
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberTwoBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Certificados Adicionales
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Para obtener un certificado con las acreditaciones
                          disponibles, se tiene que haber cumplido todo lo
                          anterior y luego realizar el pago de la acreditación.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <SheetResponsive
                  content={
                    <>
                      <div className="bg-[#131939] bg-cover h-full w-full ">
                        <div className="mt-6 ">
                          <p className="text-white font-bold text-2xl w-full px-5">
                            Indicaciones
                          </p>
                          <div className="px-5 flex flex-col gap-4 mt-3">
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberOneBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-300 m-0">
                                  Requisitos
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0 flex gap-1 items-center ">
                                <TbPointFilled className="text-[#006FEE]" />
                                <span>
                                  Tener notas en todas las evaluaciones
                                </span>
                              </p>
                              <p className="text-blue-100 m-0 flex gap-1 items-center ">
                                <TbPointFilled className="text-[#006FEE]" />
                                <span>
                                  Tener un promedio final de 14 o mayor
                                </span>
                              </p>
                              <p className="text-blue-100 m-0 flex gap-1 items-center ">
                                <TbPointFilled className="text-[#006FEE]" />
                                <span>Responder todas las encuestas</span>
                              </p>
                            </div>
                            <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <PiNumberTwoBold className="text-white text-xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-300 m-0">
                                  Certificados Adicionales
                                </h3>
                              </div>
                              <p className="text-blue-100 m-0">
                                Para obtener un certificado con las
                                acreditaciones disponibles, se tiene que haber
                                cumplido todo lo anterior y luego realizar el
                                pago de la acreditación.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  btn={
                    <button className="border-2 text-white p-2 m-2 rounded-full bg-colors-sky-ccd  absolute left-0 top-20  ">
                      <TiInfoLarge className="text-3xl text-colors-dark-blue-ccd" />
                    </button>
                  }
                />
              </>
            )}
            {nombreGlobal == "curso-anuncios" && (
              <>
                <div className="bg-[#131939] bg-cover h-full w-full ">
                  <div className="mt-6 ">
                    <p className="text-white font-bold text-xl w-full px-5">
                      Indicaciones
                    </p>
                    <div className="px-5 flex flex-col gap-4 mt-3">
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberOneBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Información Relevante del Curso
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Los anuncios sirven para brindar información clave
                          sobre el desarrollo del curso, como cambios en el
                          cronograma, recomendaciones generales o cualquier
                          detalle que los estudiantes deban tener en cuenta para
                          avanzar en sus actividades académicas.
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberTwoBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Recordatorio de Fechas Clave{" "}
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Los profesores pueden usar anuncios para recordar a
                          los alumnos sobre fechas importantes, como
                          evaluaciones, cierre de actividades, entregas de
                          proyectos o inscripción en actividades
                          extracurriculares relacionadas con el curso.
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberThreeBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Motivación y Reconocimiento
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Los anuncios también pueden cumplir un rol
                          motivacional, destacando el progreso de los alumnos,
                          reconociendo logros colectivos o individuales, y
                          animándolos a mantener su compromiso con el curso.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* {nombreGlobal == 'anuncios' && (<>
                        </>)}
                        {nombreGlobal == 'mis-diplomas' && (<>

                        </>)}
                        {nombreGlobal == 'mis-calificaciones' && (<>

                        </>)} */}
            {nombreGlobal == "tienda" && (
              <>
                <div className="bg-[#131939] bg-cover h-full w-full ">
                  <div className="mt-6 ">
                    <p className="text-white font-bold text-2xl w-full px-5">
                      Promociones
                    </p>
                    <div className="px-5 flex flex-col gap-8 mt-3 justify-center items-center">
                      <Image
                        isBlurred
                        alt="HeroUI Album Cover"
                        className="m-5 max-xl:m-0"
                        src="/Multimedia/promo/cuponinternacional.jpg"
                        width={240}
                      />
                      <Image
                        isBlurred
                        alt="HeroUI Album Cover"
                        className="m-5 max-xl:m-0"
                        src="/Multimedia/promo/refiereaunamigo.png"
                        width={240}
                      />
                      <Image
                        isBlurred
                        alt="HeroUI Album Cover"
                        className="m-5 max-xl:m-0"
                        src="/Multimedia/promo/CCD DAYS 2x1.png"
                        width={240}
                      />

                      <Image
                        isBlurred
                        alt="HeroUI Album Cover"
                        className="m-5 max-xl:m-0"
                        src="/Multimedia/promo/S_20 dto PLIN.jpeg"
                        width={240}
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden max-lg:block">
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="border-2 text-white border-colors-sky-ccd bg-colors-sky-ccd p-2 m-2 rounded-full absolute left-0 top-20">
                        <TicketCheckIcon className="text-4xl text-colors-dark-blue-ccd" />
                      </button>
                    </SheetTrigger>
                    <SheetContent className="bg-colors-night-blue-ccd2 border-colors-dark-blue-ccd w-[80%] h-full overflow-y-auto">
                      <SheetClose asChild>
                        <FaArrowLeft className="text-5xl text-colors-sky-ccd" />
                      </SheetClose>

                      <div className="bg-[#131939] bg-cover h-full w-full ">
                        <div className="mt-6 ">
                          <p className="text-white font-bold text-2xl w-full px-5">
                            Promociones
                          </p>
                          <div className="px-5 flex flex-col gap-8 mt-3 justify-center items-center">
                            <Image
                              isBlurred
                              alt="HeroUI Album Cover"
                              className="m-5 max-xl:m-0"
                              src="/Multimedia/promo/cuponinternacional.jpg"
                              width={240}
                            />
                            <Image
                              isBlurred
                              alt="HeroUI Album Cover"
                              className="m-5 max-xl:m-0"
                              src="/Multimedia/promo/refiereaunamigo.png"
                              width={240}
                            />
                            <Image
                              isBlurred
                              alt="HeroUI Album Cover"
                              className="m-5 max-xl:m-0"
                              src="/Multimedia/promo/CCD DAYS 2x1.png"
                              width={240}
                            />

                            <Image
                              isBlurred
                              alt="HeroUI Album Cover"
                              className="m-5 max-xl:m-0"
                              src="/Multimedia/promo/S_20 dto PLIN.jpeg"
                              width={240}
                            />
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            )}
            {nombreGlobal == "promos" && (
              <>
                <div className="h-full flex flex-col gap-3 p-4 text-white">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <img
                      src="/Multimedia/Imagen/Cursos/Portada/147PRINCIPAL ADA CCD.png"
                      alt={cartItem.title}
                      className="w-full h-full "
                    />
                  </div>

                  <h1 className="text-xl font-bold mb-4">{cartItem.title}</h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src="/Multimedia/Imagen/logos/LOGO CEP.png"
                        className="w-14 h-14 rounded-full "
                      />
                      <div>
                        <p className="text-xs text-zinc-400">Acreditacion:</p>
                        <p className="text-sm">{cartItem.seller}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/Multimedia/Imagen/colegiolima.png"
                        className="w-14 h-14 rounded-full "
                      />
                      <div>
                        <p className="text-xs text-zinc-400">Acreditacion:</p>
                        <p className="text-sm">{cartItem.buyer}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex max-[1600px]:flex-col max-[1600px]:gap-4 max-xl:flex-row justify-between items-center border-dashed border-2 p-4 rounded-xl relative">
                    <div className="flex items-center gap-2 mt-2  ">
                      <span className="text-2xl font-bold">
                        ${cartItem.price}
                      </span>
                      <span className="text-sm text-zinc-400 line-through absolute left-14 bottom-0 top-3">
                        ${cartItem.originalPrice}
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-sm">
                      <span className="text-zinc-400">
                        {" "}
                        La oferta acaba en:
                      </span>
                      <span className="text-blue-500">
                        {String(timeLeft.hours).padStart(2, "0")} :{" "}
                        {String(timeLeft.minutes).padStart(2, "0")} :{" "}
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 mb-6">
                    El curso de Administración Documentaria y de Archivo en el
                    Sector Público ofrece una especialización de calidad con
                    Diploma Internacional y docentes expertos. Optimiza la
                    gestión de documentos en entidades públicas con herramientas
                    prácticas y aprovecha la promoción especial de la Mejor
                    Institución de Capacitación.
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button className="px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors">
                      Agregar al carrito
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
                      Comprar ahora
                    </button>
                  </div>
                </div>
              </>
            )}
            {nombreGlobal == "ranking" && (
              <>
                <div className="bg-[#131939] bg-cover h-full w-full ">
                  <div className="mt-6 ">
                    <p className="text-white font-bold text-xl w-full px-5">
                      Indicaciones
                    </p>
                    <div className="px-5 flex flex-col gap-4 mt-3">
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberOneBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Figuración
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Tienes que comprar cursos para poder figurar
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberTwoBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Método de calificación
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          El método de calificación es el más alto, quiere decir
                          si se tiene de nota 10,15,19, la nota final sera 19
                          siendo esta la mayor de los 3 intentos.
                        </p>
                      </div>
                      <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PiNumberThreeBold className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-300 m-0">
                            Duración de la evaluación
                          </h3>
                        </div>
                        <p className="text-blue-100 m-0">
                          Al iniciar el examen, el tiempo se pone en marcha,
                          acabado el tiempo se guardan todas las respuestas y se
                          envia el examen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <SheetResponsive
                  btn={
                    <button className="border-2 text-white border-colors-sky-ccd bg-colors-sky-ccd p-2 m-2 rounded-full absolute left-0 top-20">
                      <TiInfoLarge className="text-4xl text-colors-dark-blue-ccd" />
                    </button>
                  }
                  content={
                    <div className="bg-[#131939] bg-cover h-full w-full ">
                      <div className="mt-6 ">
                        <p className="text-white font-bold text-xl w-full px-5">
                          Indicaciones
                        </p>
                        <div className="px-5 flex flex-col gap-4 mt-3">
                          <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <PiNumberOneBold className="text-white text-xl" />
                              </div>
                              <h3 className="text-xl font-semibold text-blue-300 m-0">
                                Figuración
                              </h3>
                            </div>
                            <p className="text-blue-100 m-0">
                              Tienes que comprar cursos para poder figurar
                            </p>
                          </div>
                          <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <PiNumberTwoBold className="text-white text-xl" />
                              </div>
                              <h3 className="text-xl font-semibold text-blue-300 m-0">
                                Método de calificación
                              </h3>
                            </div>
                            <p className="text-blue-100 m-0">
                              El método de calificación es el más alto, quiere
                              decir si se tiene de nota 10,15,19, la nota final
                              sera 19 siendo esta la mayor de los 3 intentos.
                            </p>
                          </div>
                          <div className=" bg-gradient-to-br from-blue-900/50 to-[#09283C] p-3 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-1 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <PiNumberThreeBold className="text-white text-xl" />
                              </div>
                              <h3 className="text-xl font-semibold text-blue-300 m-0">
                                Duración de la evaluación
                              </h3>
                            </div>
                            <p className="text-blue-100 m-0">
                              Al iniciar el examen, el tiempo se pone en marcha,
                              acabado el tiempo se guardan todas las respuestas
                              y se envia el examen.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </>
            )}
          </div>
        </div>
      </GlobalContext.Provider>
    </>
  );
}

interface ClassData {
  date: string; // formato 'YYYY-MM-DD'
  className: string;
  time: string;
}

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});
const CalendarComponent = () => {
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [hoveredDay, setHoveredDay] = useState<string | null>(null); // Guardará la fecha actualmente "hovered"
  const [daysInMonth, setDaysInMonth] = useState<
    { day: number; date: string; hasClass: boolean; isOutsideMonth: boolean }[]
  >([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const response = await api.post("/inicio/listarcalendariov2", {
            fusuario_id: session.user.uid,
          });
          setCalendarData(response.data.data[0]);
          console.log("Calendario:", response.data.data);
        } catch (error) {
          console.error("Error fetching calendario data:", error);
        }
      };
      fetchData();
    }
  }, [session]);

  // Función para obtener todas las fechas programadas según frecuencia
  const getScheduledDates = (): Set<string> => {
    const scheduledDatesSet = new Set<string>();

    calendarData.forEach(({ FechaInicio, FechaFin, Frecuencia }) => {
      const startDate = new Date(FechaInicio);
      const endDate = new Date(FechaFin);
      const frequencyDays = Frecuencia.split(",").map(Number);

      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay() + 1; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

        // Verificar si el día está en la frecuencia
        if (frequencyDays.includes(dayOfWeek)) {
          scheduledDatesSet.add(currentDate.toISOString().split("T")[0]); // Guardamos YYYY-MM-DD
        }

        currentDate.setDate(currentDate.getDate() + 1); // Avanzar un día
      }
    });

    return scheduledDatesSet;
  };

  // Generar los días del mes con clases programadas
  const generateDaysInMonth = (year: number, month: number) => {
    const daysArray: {
      day: number;
      date: string;
      hasClass: boolean;
      isOutsideMonth: boolean;
    }[] = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const scheduledDatesSet = getScheduledDates(); // Obtener fechas programadas

    // Días del mes anterior
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDayOfMonth; i++) {
      const date = new Date(
        year,
        month - 1,
        prevMonthDays - (firstDayOfMonth - 1) + i
      )
        .toISOString()
        .split("T")[0];
      daysArray.push({
        day: prevMonthDays - (firstDayOfMonth - 1) + i,
        date,
        hasClass: scheduledDatesSet.has(date),
        isOutsideMonth: true,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i).toISOString().split("T")[0];
      daysArray.push({
        day: i,
        date,
        hasClass: scheduledDatesSet.has(date),
        isOutsideMonth: false,
      });
    }

    // Días del mes siguiente
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const remainingDays = 6 - lastDayOfMonth;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i).toISOString().split("T")[0];
      daysArray.push({
        day: i,
        date,
        hasClass: scheduledDatesSet.has(date),
        isOutsideMonth: true,
      });
    }

    return daysArray;
  };

  useEffect(() => {
    setDaysInMonth(
      generateDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
    );
  }, [currentDate, calendarData]);

  const handleMouseEnter = (date: string) => {
    setHoveredDay(date); // Establecer el día actual en "hover"
  };

  const handleMouseLeave = () => {
    setHoveredDay(null); // Limpiar cuando el mouse sale
  };

  const handleMonthChange = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="relative flex flex-col items-center p-4 bg-[#0B1026] rounded-xl">
      <div className="w-full max-w-md">
        {/* Controles de mes */}
        <div className="flex justify-between mb-4 items-center gap-4">
          <button
            onClick={() => handleMonthChange(-1)}
            className="bg-blue-500 text-white p-2 rounded-xl"
          >
            <IoMdArrowRoundBack className="text-white" />
          </button>
          <span className="text-lg font-bold text-white">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => handleMonthChange(1)}
            className="bg-blue-500 text-white p-2 rounded-xl"
          >
            <IoMdArrowRoundForward className="text-white" />
          </button>
        </div>

        {/* Calendario */}
        <div className="grid grid-cols-7 gap-2 text-center relative">
          {["DO", "LU", "MA", "MI", "JU", "VI", "SA"].map((day, index) => (
            <div key={index} className="text-xs text-white">
              {day}
            </div>
          ))}

          {daysInMonth.map((dayObj, index) => (
            <div
              key={index}
              className={`p-1.5 text-center text-base text-white  cursor-pointer rounded-md 
                            ${dayObj.isOutsideMonth ? "text-[#6C6C6C]" : ""} 
                            ${
                              dayObj.hasClass
                                ? "bg-[#007FEE] hover:bg-blue-400 rounded-xl"
                                : "hover:bg-gray-200"
                            } 
                            ${dayObj.isOutsideMonth ? "opacity-60" : ""}`}
              onMouseEnter={() =>
                dayObj.hasClass && handleMouseEnter(dayObj.date)
              } // Solo el día actual
              onMouseLeave={handleMouseLeave}
            >
              {dayObj.day}

              {/* Mostrar solo el curso correspondiente al día hovered */}
              {hoveredDay === dayObj.date && !dayObj.isOutsideMonth && (
                <div className="absolute top-full left-[0]  bg-white p-2 mt-2 rounded-xl shadow-lg z-50 w-[18rem]">
                  <div className="text-black text-sm divide-y divide-blue-500">
                    {calendarData
                      .filter(
                        (cls) =>
                          cls.FechaInicio <= hoveredDay &&
                          cls.FechaFin >= hoveredDay
                      )
                      .map((cls, i) => (
                        <div key={i} className="py-1">
                          {cls.Curso} - {cls.Horario}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext debe usarse dentro de GlobalProvider");
  }
  return context;
};
