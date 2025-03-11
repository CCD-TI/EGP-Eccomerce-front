'use client'
import { Select, SelectItem, Image, Divider, Pagination as Pagination1, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { environment } from '@/environments/environment';
import { useGlobalContext } from '../layout';
import { FaCheck } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import CourseCardTienda from "@/components/ui/paul/coursecardtienda";
import { Download, Phone } from 'lucide-react'
import { IoMdSearch } from "react-icons/io";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AOS from 'aos'; // Importa AOS
import KRGlue from '@lyracom/embedded-form-glue'
import { BiSolidVideoRecording } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";
import { useCartProductoStore } from '@/context/cartProducto'
import PacksSectionTienda from '@/components/ui/paul/packsectiontienda';
import CompraRapida from "@/components/ui/paul/compraRapida/payment-flow";
import { MdKeyboardBackspace } from "react-icons/md";
import type { Selection } from "@heroui/react";
import { useSearchParams } from 'next/navigation';
import ModalSearch from '@/components/ui/bruno/ModalSearch';
interface Props {
  params: {
    pcurso: string;

  };
}
export default function Page({ params }: Props) {
  const searchParams = useSearchParams();

  const pcurso = searchParams.get('pcurso');

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";

  const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
  const buttons = [
    { id: 1, label: 'Tarjetas Digitales', img: "/Multimedia/Imagen/card.svg", },
    //{ id: 2, label: 'QR', img: "/Multimedia/Imagen/qr.svg", },
    // { id: 3, label: 'YAPE', img: "/Multimedia/Imagen/yapelogo.svg", },
    // { id: 4, label: 'Interbank', img: "/Multimedia/Imagen/interbankc.svg", },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 56, seconds: 8 })
  const [activeTab, setActiveTab] = useState('Photos')
  const [cursosCompletos, setcursosCompletos] = React.useState([{ count: 0, Curso: '' }]);
  const [filteredCursos, setFilteredCursos] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('')
  const [number, setNumber] = useState(true)
  const [isopen, setisopen] = useState(false)
  const [krInstance, setKrInstance] = useState<any>(null);
  const [preciototal, setpreciototal] = useState(0);
  const [activeButton, setActiveButton] = useState<number>(buttons[0].id);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [enVivoActivo, setEnVivoActivo] = useState<boolean>(false);
  const [asincronicoActivo, setAsincronicoActivo] = useState<boolean>(false);
  const [idproducto, setidproducto] = useState('');
  const [modalidad, setmodalidad] = React.useState("");
  const [tipocurso, settipocurso] = useState("");
  const [curso, setcurso] = useState("");
  const [imagen, setimagen] = useState("");
  const [brochure, setbrochure] = useState("");
  const [listarescuela, setlistarescuela] = useState<any[]>([]);
  const [listarespecializacion, setlistarespecializacion] = useState<any[]>([]);
  const [selectescuela, setselectescuela] = React.useState<Selection>(new Set([]));
  const [selectespecializacion, setselectespecializacion] = React.useState<Selection>(new Set([]));

  const { nombreGlobal, setNombreGlobal } = useGlobalContext();
  setNombreGlobal('tienda')
  const addProductToCart = useCartProductoStore((state) => state.addProductTocart);
  const removeProductFromCart = useCartProductoStore((state) => state.removeProduct);
  const cart = useCartProductoStore((state) => state.cart);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(current => {
        if (current.seconds > 0) {
          return { ...current, seconds: current.seconds - 1 }
        } else if (current.minutes > 0) {
          return { ...current, minutes: current.minutes - 1, seconds: 59 }
        } else if (current.hours > 0) {
          return { hours: current.hours - 1, minutes: 59, seconds: 59 }
        }
        return current
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post("/inicio/vercursosplataformatiendaxtopv2", {

        });
        setSearchText(pcurso || "")
        setcursosCompletos(response.data.data[0]);
        setFilteredCursos(response.data.data[0]);
        console.log(response.data.data[0])
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post("/inicio/listarescuelav2", {

        });
        setlistarescuela(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Restablecer la especialización cuando se cambie la escuela
    setselectespecializacion(new Set([]));

    // Cargar las especializaciones correspondientes a la escuela seleccionada
    if (selectescuela) {
      const fetchData = async () => {
        try {
          const response = await api.post("/inicio/listarespecializacionxescuelav2", {
            fescuela_id: Array.from(selectescuela)[0] // Aquí puedes tomar el primer valor de la escuela seleccionada
          });
          setlistarespecializacion(response.data.data[0]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [selectescuela]);
  useEffect(() => {
    const filtered = cursosCompletos.filter((curso) => {
      if (!curso || !curso.Curso) return false; // Verifica que curso y curso.Curso existan
      return curso.Curso.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredCursos(filtered);
  }, [searchText, cursosCompletos]);
  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = 'https://api.micuentaweb.pe';
      const publicKey = environment.izipago;
      let formToken = '';

      try {
        if (preciototal > 0) {

          const res = await fetch(environment.baseUrl + '/pago/CreatePayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: preciototal * 100, currency: 'PEN' })
          });
          formToken = await res.text();
          const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

          await KR.setFormConfig({
            formToken,
            'kr-language': 'es-ES'
          });



          await KR.removeForms();
          await KR.renderElements('#myPaymentForm');

          setKrInstance(KR);

          await KR.onSubmit(async (paymentData: KRPaymentResponse) => {
            try {
              const response = await fetch(environment.baseUrl + '/pago/validatePayment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData),
              });
              if (response.status === 200) {



                const MySwal = withReactContent(Swal);
                MySwal.fire({
                  title: "Su compra fue realizada con éxito",
                  text: "Completar el siguiente formulario para poder brindarle sus accesos a la plataforma",
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Empezar a completar el formulario",
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    setisopen(true)
                    //router.push(`/`)
                  }
                });
                setMessage('Payment successful!');

              } else {
                setMessage('Payment failed!');
              }
            } catch (error) {
              console.error('Error processing payment:', error);
              setMessage('Payment failed due to an error!');
            }

            return false; // Debemos devolver un booleano explícitamente

          });

        }
      } catch (error) {
        setMessage(error + ' (ver consola para más detalles)');
        console.error('Error en la configuración del formulario:', error);
      }
    }

    setupPaymentForm();

    return () => {
      if (krInstance) {
        krInstance.removeForms(); // Remueve el formulario cuando el componente se desmonte
      }
    };
  }, [number, preciototal]);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: false, // Permite que las animaciones se repitan
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
    });

  }, []);
  useEffect(() => {
    if (selectedCourse && selectedCourse.Productos) {
      // Ordenar los productos
      settipocurso((selectedCourse as any).TipoCurso);
      setcurso((selectedCourse as any).Curso);

      const productosOrdenados = selectedCourse.Productos.slice().sort((a: any, b: any) => {
        if (a.TipoModalidad === 'En Vivo' && b.TipoModalidad === 'Asincrónico') return -1;
        if (a.TipoModalidad === 'Asincrónico' && b.TipoModalidad === 'En Vivo') return 1;
        return 0;
      });

      // Buscar el primer producto (En Vivo o Asincrónico)
      const productoInicial =
        productosOrdenados.find((p: any) => p.TipoModalidad === 'En Vivo') ||
        productosOrdenados.find((p: any) => p.TipoModalidad === 'Asincrónico');
      if (productoInicial) {
        setmodalidad(productoInicial.TipoModalidad);
        setpreciototal(productoInicial.Precio);
        setidproducto(productoInicial.IdProducto)
        const rutas = (cursosCompletos as any)[0].RutaImagen; // Tu array de rutas
        const rutaPortadaFinal = rutas.find((ruta: string) =>
          ruta.includes("PortadaFinal")
        );
        const BrochureCursos = rutas.find((ruta: string) =>
          ruta.includes("BrochureCursos")
        );
        setbrochure(BrochureCursos);
        setimagen(rutaPortadaFinal);
        // Activar el estado correspondiente
        if (productoInicial.TipoModalidad === 'En Vivo') {
          setEnVivoActivo(true);
          setAsincronicoActivo(false);
        } else if (productoInicial.TipoModalidad === 'Asincrónico') {
          setEnVivoActivo(false);
          setAsincronicoActivo(true);
        }
      }
    }
  }, [selectedCourse]);

  const openSideSheet = (curso: any) => {
    setSelectedCourse(curso);
    setIsOpen(true);
  };
  const totalPages = Math.ceil(filteredCursos.length / 12);
  const paginatedCursos = filteredCursos.slice(
    (currentPage - 1) * 12,
    currentPage * 12
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al buscar
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleButtonClick = (id: number) => {
    setNumber(!number);
    setActiveButton(id);
    setAnimationKey(prevKey => prevKey + 1); // Actualiza la clave de animación
  };
  const renderContent = () => {
    switch (activeButton) {
      case 1:

        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-4 p-4 !bg-transparent !rounded-none' data-aos="fade-up">
            <div className='flex flex-col gap-4 p-6 justify-center   !bg-transparent !rounded-none'>

              <div className="container">
                <div id="myPaymentForm">
                  <div className="kr-smart-form" kr-card-form-expanded="true" />
                </div>

                <div data-test="payment-message">{message}</div>
              </div>

            </div>
          </div>
        );
      case 2:
        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-2 p-4 rounded-xl' data-aos="fade-right">
            <div className='flex flex-col gap-4 p-6 justify-center rounded-xl  shadow-md'>
              <div className='flex flex-col gap-4 items-center justify-between'>
                <div className='flex gap-2'>
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/bbva.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/scotiabank.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/plin.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/interbankc.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/yapelogo.svg" about='' width={300} height={0} />
                </div>
                <div className='flex flex-col text-xs'>

                  <span> Escanea el Código QR para pagar</span>
                </div>
              </div>
              <hr className="border-t border-dashed border-black" />
              <div className='flex flex-col p-2 bg-blue-700/35 justify-center items-center'>
                <h1 className="">Monto total:</h1>
                <h1 className="font-bold text-2xl">S/8000</h1>
              </div>

              <h1 className='text-center'>Escanee el código para proceder con el pago</h1>
            </div>
          </div>
        );
      case 3:
        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl' data-aos="fade-up-left">
            <div className='flex flex-col gap-4 p-6 justify-center border-2 rounded-xl bg-white shadow-md'>
              <div className='flex flex-col gap-4 items-center justify-between'>
                <Image alt='' src="/Multimedia/Imagen/logo.png" about='' accessKey='' width={300} height={0} className='h-20 w-20' />
                <div className='flex flex-col text-xs'>
                  <h1>Pagar con YAPE</h1>
                  <span>Yapea fácilmente</span>
                </div>
              </div>
              <hr className="border-t border-dashed border-black" />
              <button className="bg-blue-500 text-white p-2 rounded-lg">Pagar con YAPE</button>
              <h1 className='text-center'>Utiliza YAPE para realizar tus pagos</h1>
            </div>
          </div>
        );
      case 4:
        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl' data-aos="fade-left">
            <div className='flex flex-col gap-4 p-6 justify-center border-2 rounded-xl bg-white shadow-md'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col text-xs'>
                  <h1>Banco Interbank</h1>
                  <span>Realiza tus operaciones bancarias</span>
                </div>
              </div>
              <hr className="border-t border-dashed border-black" />
              <button className="bg-blue-500 text-white p-2 rounded-lg">Usar Interbank</button>
              <h1 className='text-center'>Accede a tus cuentas de Interbank</h1>
            </div>
          </div>
        );
      default:
        return <div className="text-center p-4">Selecciona una opción</div>;
    }
  };
  const handleSeleccion = (item: any) => {
    setpreciototal(item.Precio);

    // Actualizar estados de En Vivo y Asincrónico
    if (item.TipoModalidad === 'En Vivo') {
      setmodalidad('En Vivo')

      setEnVivoActivo(true);
      setAsincronicoActivo(false);
    } else if (item.TipoModalidad === 'Asincrónico') {
      setmodalidad('Asincrónico')

      setEnVivoActivo(false);
      setAsincronicoActivo(true);
    }
  };
  const handleCartToggle = (array: any) => {
    const TipoModalidad = enVivoActivo ? '1' : (asincronicoActivo ? '2' : '')
    const isInCart = cart.some((item) => item.IdProducto === idproducto); // Calcular dentro de la función
    const imagen1 =imagen; // Calcular dentro de la función

    const nuevoarray = { ...array, Precio: preciototal.toFixed(2), TipoModalidad: TipoModalidad, IdProducto: idproducto,RutaImagen:imagen1 };

    if (isInCart) {
      removeProductFromCart(nuevoarray);
    } else {
      addProductToCart(nuevoarray);
    }
  };
  async function filtrarcurso() {
    const filterEscuela = Array.from(selectescuela)[0]; // Obteniendo la escuela seleccionada
    const filterEspecializacion = Array.from(selectespecializacion)[0]; // Obteniendo la especialización seleccionada

    setCurrentPage(1)
    // Aquí aplicarás los filtros y actualizarás el estado de `filteredCursos`
    const filtered = cursosCompletos.filter((curso: any) => {
      const matchesEscuela = filterEscuela ? curso.IdEscuela === +filterEscuela : true;
      const matchesEspecializacion = filterEspecializacion ? curso.IdEspecializacion === +filterEspecializacion : true;

      return matchesEscuela && matchesEspecializacion;
    });

    setFilteredCursos(filtered);
  }


  return (
    <div className="my-6  flex flex-col gap-8">
      {/* 
      <div className="">
        <div className="relative">
          <div className=" w-full flex  max-lg:flex-col gap-6">
            <div className="w-[70%] max-lg:w-full bg-zinc-900/50 backdrop-blur-sm rounded-2xl ">
              <div className="flex gap-6 h-full rounded-xl overflow-hidden ">
                <video className='size-full object-cover' controls src="/Multimedia/Video/Cursos/TRAILER - DIPLOMA EXCEL.mp4"></video>
              </div>
            </div>
            <div className="w-[30%] max-lg:w-auto h-[60%] max-lg:h-96 max-sm:h-[60%] bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden
             flex flex-col max-lg:flex-row justify-between max-lg:justify-center max-sm:flex-col gap-3">
              <div className=''>
                <img
                  src="/Multimedia/Imagen/Cursos/Portada/106PRINCIPAL EP CCD.png"
                  alt={artworks[1].title}
                  className="w-full h-full  rounded-2xl"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl font-bold text-white">
                    {artworks[0].title}
                  </h2>
                  <div className="flex justify-between max-xl:flex-col max-xl:gap-3">
                    <div>
                      <div className="text-sm text-zinc-400">Precio</div>
                      <div className="text-xl font-bold text-blue-500">
                        {artworks[0].currentBid.eth} PEN
                      </div>
                      <div className="text-sm text-zinc-400">
                        ${artworks[0].currentBid.usd.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-400">
                        La oferta se acaba
                      </div>
                      <div className="text-xl font-mono text-white">
                        {String(timeLeft.hours).padStart(2, '0')} :{' '}
                        {String(timeLeft.minutes).padStart(2, '0')} :{' '}
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl border border-zinc-700 text-white hover:bg-zinc-800 transition-colors">
                      <h1 className="flex items-center justify-center gap-2">
                        <span className="text-sm max-xl:hidden">Agregar al carrito</span>
                        <FaCartShopping className="text-xl hidden  max-xl:block max-xl:mx-auto" />
                      </h1>
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      <h1 className="flex items-center justify-center gap-2">
                        <span className="text-sm max-xl:hidden">Comprar</span>
                        <FaMoneyCheckAlt className="text-xl hidden max-xl:block max-xl:mx-auto" />
                      </h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}

      <PacksSectionTienda />
      <div className='px-10 '>

        <h1 className={`text-3xl font-bold text-white `}>Curso Y diplomas</h1>
        <div className='flex max-xl:flex-col justify-between max-xl:justify-center  max-xl:items-center  max-xl:gap-4 items-end mt-3'>

          <div className='!text-white flex max-lg:flex-col gap-3 items-end max-lg:items-start'>
           

            <Select
              selectedKeys={selectescuela}
              onSelectionChange={setselectescuela}
              labelPlacement={"outside"}
              className="w-[14rem] z-10" label="Seleccionar una escuela"
              classNames={{ "trigger": "bg-blue-600/20 data-[hover=true]:bg-blue-600/20 border-blue-500/50 border-1", "label": "!text-white", "selectorIcon": "text-white", "value": "!text-white" }}>
              {listarescuela.map((item: any, index: number) => (
                <SelectItem key={item.IdEscuela} >{item.Escuela}</SelectItem>
              ))}

            </Select>
            <Select
              selectedKeys={selectespecializacion}
              onSelectionChange={setselectespecializacion}
              labelPlacement={"outside"} className="w-[18rem] z-10" label="Seleccionar una especialización" classNames={{ "trigger": "bg-blue-600/20 data-[hover=true]:bg-blue-600/20 border-blue-500/50 border-1", "label": "!text-white", "selectorIcon": "text-white", "value": "!text-white" }}>
              {listarespecializacion.map((item: any, index: number) => (
                <SelectItem key={item.IdEspecializacion} >{item.Especializacion}</SelectItem>
              ))}
            </Select>
            <Button className='bg-[#007FEE] text-white' onPress={() => { filtrarcurso() }}>
              Filtrar
            </Button>
           
          </div>
          <Input
            type="text"
            className="w-[30%] max-lg:w-[80%] max-sm3:w-full mx-auto"
            placeholder="Búsqueda"
            startContent={<IoMdSearch />}
            value={searchText}
            onChange={handleSearchChange}
          />
          
        </div>
        <div className='mt-10 size-full  flex flex-wrap justify-center mx-auto gap-10'>
          {paginatedCursos.map((item: any, index: number) => {
            return (
              <div key={item.IdProducto} className=" ">
                <CourseCardTienda array={item} openSideSheet={openSideSheet} />
              </div>
            );
          })}
        </div>
      </div>
      <Pagination1 showControls initialPage={1} total={totalPages} className='mt-[4.5rem]'
        classNames={{ "wrapper": 'm-auto', "cursor": "bg-[#007FEE] text-white" }} page={currentPage} onChange={handlePageChange} />
      {isOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-auto" style={{ pointerEvents: 'none' }}>
          <div
            className=" w-[25%] max-xl:w-[24rem]  bg-[#131939] shadow-xl  absolute right-0 top-0 px-4 py-2"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="h-full ">
              <div className="mx-auto max-w-7xl bg-[#131939]">
                <div className="rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl">
                  <div className="flex flex-col gap-2 ">
                    {/* Left Column - Image and Badges */}
                    <Button className='bg-[#006FEE] w-[7rem] my-3 flex justify-start' onPress={() => { setIsOpen(false) }}>
                      <MdKeyboardBackspace className='text-white  text-xl ' />
                      <h1 className='text-white text-base  '>Volver</h1>
                    </Button>

                    <div className="">
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                        <Image
                          src={
                            storageUrl +
                            (Array.isArray(selectedCourse.RutaImagen)
                              ? selectedCourse.RutaImagen.find((ruta: any) => ruta.includes("PortadaFinal")) || selectedCourse.RutaImagen[0]
                              : selectedCourse.RutaImagen)
                          }
                          alt="Environmental Impact Study"
                          className="object-cover"

                        />

                      </div>

                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors cursor-pointer">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          <span className="text-sm font-medium">Certificación Profesional</span>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-500/20 transition-colors cursor-pointer">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                          <span className="text-sm font-medium">Acceso Inmediato</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                          {selectedCourse.Curso}
                        </h2>
                        <p className="text-slate-300 mt-1">
                          {selectedCourse.Descripcion}
                        </p>
                      </div>

                      <div className='mt-[0.7rem] flex flex-col gap-1'>
                        <span className='text-[#93939F] font-bold'>Acreditado por:</span>

                        {selectedCourse.MarcasRespaldo.includes('1') && (<div className='flex gap-3 items-center'>
                          <Image
                            src={storageUrl + '/Multimedia/Imagen/Ccd/Logos/CIP.png'}
                            alt="Certification Badge"
                            width={40}
                            height={40}
                            className="rounded-full" />
                          <h1 className='text-white w-22'>
                            Colegio de Ingenieros del Perú
                          </h1>
                        </div>)}
                      </div>
                      <div className='flex flex-col gap-5'>
                        <div className="">
                          <div className="flex flex-col gap-4 mt-3">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <button
                                className="flex-1 rounded-xl group inline-flex items-center justify-center gap-2 bg-gradient-to-r
                                from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 
                                font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
                                onClick={() => {
                                  const brochureUrl = Array.isArray(selectedCourse.RutaImagen)
                                    ? selectedCourse.RutaImagen.find((ruta: any) => ruta.includes("Brochure")) || selectedCourse.RutaImagen[0]
                                    : selectedCourse.RutaImagen;

                                  if (brochureUrl) {
                                    window.open(`${storageUrl}${brochureUrl}`, "_blank");
                                  } else {
                                    console.error("No se encontró un Brochure válido.");
                                  }
                                }}
                              >
                                <Download className="w-5 h-5 group-hover:animate-bounce" />
                                Descargar Brochure
                              </button>
                              <button
                                className="flex-1 rounded-xl group inline-flex items-center justify-center gap-2 bg-gradient-to-r
                               from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3
                                 font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/25"
                                onClick={() =>
                                  window.open(`${selectedCourse.NumeroWhatsapp}}`, "_blank")
                                }
                              >
                                <Phone className="w-5 h-5 group-hover:animate-bounce" />
                                Más Información
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative px-1">
                          <input
                            type="text"
                            placeholder="Ingresa tu cupón de descuento"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button className="absolute rounded-xl right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5  text-sm font-medium transition-colors">
                            Aplicar
                          </button>
                        </div>
                      </div>

                      <Divider className='bg-white  w-full my-4' />
                      <div className='flex gap-5 items-center'>
                        <span className='text-white'>Escoger:</span>
                        <div className='flex gap-3'>
                          {selectedCourse.Productos
                            .slice() // Crea una copia para evitar mutar el arreglo original
                            .sort((a: any, b: any) => {
                              // Ordena 'En Vivo' primero y luego 'Asincrónico'
                              if (a.TipoModalidad === 'En Vivo' && b.TipoModalidad === 'Asincrónico') return -1;
                              if (a.TipoModalidad === 'Asincrónico' && b.TipoModalidad === 'En Vivo') return 1;
                              return 0; // Si son iguales, no cambia el orden
                            })
                            .map((item: any, index: number) => {
                              return (
                                <div key={index}> {/* Asegúrate de usar una clave única */}
                                  {item.TipoModalidad === 'En Vivo' && (
                                    <Button className={`text-white bg-red-500 ${enVivoActivo ? '' : 'opacity-30'}`} onClick={() => {
                                      handleSeleccion(item)
                                    }}>
                                      <CiStreamOn className="text-2xl text-white" /> En Vivo
                                    </Button>
                                  )}
                                  {item.TipoModalidad === 'Asincrónico' && (
                                    <Button className={`text-white bg-green-500 ${asincronicoActivo ? '' : 'opacity-30'}`} onClick={() => {
                                      handleSeleccion(item)
                                    }}>
                                      <BiSolidVideoRecording className="text-2xl text-white" /> Asincrónico
                                    </Button>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>


                      <div className=" pt-6 px-5">
                        <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-[40px]">
                          <div className="text-center sm:text-left">
                            <div className="flex flex-col items-baseline gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-400 line-through">S/{(preciototal * 1.3).toFixed(2)}</span>
                                <span className="text-sm font-medium text-emerald-500">30% OFF</span>
                              </div>
                              <Button className="text-4xl font-bold bg-[#007FEE] bg-clip-text text-white" onPress={() => {
                                onOpen1();
                                setimagen((Array.isArray(selectedCourse.RutaImagen)
                                  ? selectedCourse.RutaImagen.find((ruta: any) => ruta.includes("PortadaFinal")) || selectedCourse.RutaImagen[0]
                                  : selectedCourse.RutaImagen))
                              }} >
                                <span className="text-3xl font-bold">S/</span>
                                <span className="text-5xl font-bold tracking-tight">{preciototal.toFixed(2)}</span>
                              </Button>

                            </div>
                          </div>
                          <button
                            className="flex-1 rounded-xl group inline-flex items-center justify-center gap-2 bg-gradient-to-r
                               from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3
                                 font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/25 max-w-20"
                            onClick={() => { handleCartToggle(selectedCourse) }}
                          >
                            {cart.some((item) => item.IdProducto === idproducto) ? ( // Calcular isInCart directamente aquí
                              <FaCheck className="text-2xl" />
                            ) : (
                              <FaShoppingCart className="text-2xl" />
                            )}
                          </button>


                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20  ",
          closeButton: "bg-white",
        }}
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        className="h-full mt-10 overflow-y-auto"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent
          className="!bg-colors-night-blue-ccd2 bg-double-esferas2"
          style={{
            width: "90%",
            height: "90%",
            maxWidth: "90%",
            maxHeight: "90%",
          }}
        >
          {(onClose) => (
            <>
              {/* <ModalHeader>
                        {" "}
                        <button
                          onClick={onclose}
                          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                        >
                          <ChevronLeft className="w-6 h-6" />
                          Regresar
                        </button>
                      </ModalHeader> */}
              <ModalBody>
                <CompraRapida
                  precio={preciototal}
                  modalidad={modalidad}
                  imagen={imagen}
                  tipocurso={tipocurso}
                  curso={curso}
                  idproducto={idproducto}
                />
              </ModalBody>
              {/* <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Action
                        </Button>
                      </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}