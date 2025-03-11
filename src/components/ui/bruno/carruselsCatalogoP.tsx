import { environment } from '@/environments/environment';
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import Slider from 'react-slick';
import Carousel2 from '@/components/ui/bruno/carruselstackCat'
import Carousel4 from '@/components/ui/bruno/carrusel4'
// Importa solo los estilos básicos de Slick Carousel
import 'slick-carousel/slick/slick.css';
import { FaArrowLeft, FaRegFileVideo, FaUserTie } from 'react-icons/fa6';
import { BsChatText } from 'react-icons/bs';
import { useSearchParams } from 'next/navigation';

// Datos para los slides del carrusel


const CarouselComponent = ({ dato }: any) => {
  const searchParams = useSearchParams();
  const [datoprofesores, setdatoprofesores] = useState([]);
  const [datalistarCatalogoP1, setdatalistarCatalogoP1] = useState([]);
  const [existevideoprofe, setexistevideoprofe] = useState(false);
  const [existeprofe, setexisteprofe] = useState(false);

  const result = searchParams.get('iu') || 'default';

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: false, // Desactivar carrusel infinito
    speed: 500,
    slidesToShow: Math.min(datoprofesores.length, 3), // Muestra máximo 3 o el número total de datos
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: Math.min(datoprofesores.length, 2), // Muestra máximo 2 o el número total de datos
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(datoprofesores.length, 1), // Muestra máximo 1 o el número total de datos
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center mt-4 space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-600 focus:outline-none border-2 border-transparent active:border-blue-500" />
    ),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };



  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const [dataimagentema, setdataimagentema] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const listarCatalogoP1 = await api.post("/inicio/listarCatalogoP1", {
          fproductoid: result
        });
        setdatalistarCatalogoP1(listarCatalogoP1.data.data[0])

        const listarCursoAdjuntosCatalogo = await api.post("/inicio/listarCursoAdjuntosCatalogo", {
          fproductoid: result
        });
        setdataimagentema(listarCursoAdjuntosCatalogo.data.data[0])

        const imagenProfesor = listarCursoAdjuntosCatalogo.data.data[0].find(
          (item:any) => item.RutaImagen === "/Multimedia/Video/Cursos/Profesor/"
        );
  
        // Mensaje si la ruta está vacía
        if (!imagenProfesor) {
          setexistevideoprofe(true)

        } else {
          setexistevideoprofe(false)
        }
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    loadData();
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        const listarmoduloprofesores = await api.post("/inicio/listarmoduloprofesores", {
          fproductoid: dato
        });
        console.log('23232')
        console.log(dato)
        console.log(JSON.stringify(listarmoduloprofesores.data.data[0]))

        setdatoprofesores(listarmoduloprofesores.data.data[0])

      
        // Mensaje si la ruta está vacía
        if (listarmoduloprofesores.data.data[0].length) {
          setexistevideoprofe(true)
        } else {
          setexistevideoprofe(false)
        }
        
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    loadData();
  }, [])
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();


  return (
    <div className="w-full h-full flex flex-col gap-[4rem] justify-center m-auto items-center">
      {existevideoprofe==false && existeprofe==false ? (<></>) : <div className=' w-full h-[16rem] flex gap-[5rem] m-auto'>
        {existevideoprofe==true  ? <Button onPress={onOpen} className='w-full h-full bg-white border-2 shadow-2xl border-b-8 border-b-blue-600 rounded-2xl p-2  flex flex-col gap-2 cursor-pointer'>
          <img
            alt=""
            src="/Multimedia/Imagen/portadas/video-docentes.jpg"
            className='w-full  h-[18rem] rounded-lg '
          />
          <div className='flex justify-center items-center gap-2 p-2'>
            <img src='/Multimedia/Imagen/iconoscat/icono-play.png' className='h-10 w-10 text-blue-500' />
            <h1 className='text-3xl'>Video docente </h1>
          </div>
        </Button> : (<></>)}
       
        {existeprofe==true  ?<Button onPress={onOpen1} className='w-full h-full bg-white border-2 shadow-2xl border-b-8 border-b-blue-600 rounded-2xl p-2  flex flex-col gap-2 cursor-pointer'>
          <img
            alt=""
            src="/Multimedia/Imagen/portadas/Docentes.jpg"
            className='w-full  h-[18rem] rounded-lg '
          />
          <div className='flex justify-center items-center gap-2 p-2'>
          <img src='/Multimedia/Imagen/iconoscat/DOCENTES.png   ' className='h-10 w-10 text-blue-500' />
            <h1 className='text-3xl'>Docentes</h1>
          </div>
        </Button>: (<></>)}
      </div> }
      <div className='flex w-full m-auto'>
        <Button onPress={onOpen2} className='w-full h-full bg-white border-2 shadow-2xl border-b-8 border-b-blue-600 rounded-2xl p-2  flex flex-col gap-2 cursor-pointer'>
          <img
            alt=""
            src="/Multimedia/Imagen/portadas/Testimonios.jpg"
            className='w-full  h-[18rem] rounded-lg '
          />
          <div className='flex justify-center items-center gap-2 p-2'>
          <img src='/Multimedia/Imagen/iconoscat/testimonios.png' className='h-10 w-10 text-blue-500' />
            <h1 className='text-3xl'>Testimonios</h1>
          </div>
        </Button>
      </div>
      <Modal size='full' className='flex justify-center' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-[url('/Multimedia/Imagen/relleno/theme.jpg')] bg-cover ">
          {(onClose) => (
            <>
              <ModalHeader >
                <Button color="primary" variant="solid" onPress={onClose}>
                  <FaArrowLeft className='w-8 h-8' />
                </Button>
              </ModalHeader>
              <ModalBody className='flex flex-col justify-center gap-10 '>
                <div className='w-full flex justify-center gap-3 '>
                  {/* <h1 className='text-right'>
                    <span className='text-4xl font-extrabold t-[var(--ccdcolordark)]ck'>Testimon</span>
                    <span className='text-4xl  font-extrabold underline t-[var(--ccdcolordark)] decoration-[var(--ccdcolordark)] decoration-4 underline-offset-4'>ios</span>
                  </h1> */}
                </div>
                {dataimagentema.map((item: any, index: number) => {
                  if (!item.RutaImagen || !(item.RutaImagen).includes("Multimedia/Video/Cursos/Profesor")) return null;
                  return (
                    <video key={index} src={environment.baseUrlStorage + item.RutaImagen} preload='auto' controls autoPlay loop className='w-full h-[38rem] object-fill rounded-lg relative'></video>
                  )
                })}
                {/* <video
                  src="/Multimedia/video/Cursos/TRAILER - DIPLOMA EXCEL.mp4"
                  autoPlay
                  loop
                  muted
                  controls
                  className="rounded-2xl w-full max-w-4xl mx-auto"
                /> */}
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size='full' className='flex justify-center' isOpen={isOpen1} onOpenChange={onOpenChange1}>
        <ModalContent className="bg-[url('/Multimedia/Imagen/relleno/theme.jpg')] bg-cover ">
          {(onClose) => (
            <>
              <ModalHeader >
                <Button color="primary" variant="solid" onPress={onClose}>
                  <FaArrowLeft className='w-8 h-8' />
                </Button>
              </ModalHeader>
              <ModalBody className='w-full h-full m-auto'>
                <div className='w-full flex justify-center gap-3 py-8'>
                  <h1 className='text-right'>
                    <span className='text-5xl font-extrabold t-[var(--ccdcolordark)]ck'>Profeso</span>
                    <span className='text-5xl  font-extrabold underline t-[var(--ccdcolordark)] decoration-[var(--ccdcolordark)] decoration-4 underline-offset-4'>res</span>
                  </h1>
                </div>
                <Slider {...settings} className='m-auto w-[70%] h-[80%] flex flex-col '>

                  {datoprofesores.map((item: any, index: number) => {
                    console.log(JSON.stringify(datoprofesores))
                    return (
                      <>

                        <div key={index} className="w-full h-full px-6">
                          <div className="w-full h-full flex flex-col  items-center border-2 rounded-lg">
                            <div className="w-full h-full flex justify-center items-center bg-[image:var(--fondoprofemultideg)] bg-cover relative">
                              <img
                                alt='colegio de ingenieros del callao'
                                src={environment.baseUrlStorage + '/' + item.RutaImagenPerfil}
                                className="rounded-t-lg w-full h-full"

                              />
                            </div>
                            <div className="w-full h-full flex flex-col justify-center items-center bg-[#DAE5F5] p-4">
                              <p className="mt-2 text-center text-lg lg:text-xl font-bold">{item.Nombres + ' ' + item.Apellidos}</p>
                              <p className="mt-2 px-4  text-left text-base">{item.Descripcion}</p>
                              <div className="w-full text-xs lg:text-md  border-t-2 border-gray-300 my-4"></div>
                              <p className="mt-2 text-xs lg:text-md text-center p-2 bg-blue-600 text-white rounded-md">
                                {item.Puesto}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>

                    )
                  })}
                </Slider>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
      <Modal size='full' isOpen={isOpen2} onOpenChange={onOpenChange2} className='flex justify-center'>
        <ModalContent className="bg-[url('/Multimedia/Imagen/relleno/theme.jpg')] bg-cover ">
          {(onClose) => (
            <>
              <ModalHeader >
                <Button color="primary" variant="solid" onPress={onClose}>
                  <FaArrowLeft className='w-8 h-8' />
                </Button>
              </ModalHeader>
              <ModalBody className='flex justify-center'>
                <div className='w-full flex justify-center gap-3 '>
                  <h1 className='text-right'>
                    <span className='text-4xl font-extrabold t-[var(--ccdcolordark)]ck'>Testimon</span>
                    <span className='text-4xl  font-extrabold underline t-[var(--ccdcolordark)] decoration-[var(--ccdcolordark)] decoration-4 underline-offset-4'>ios</span>
                  </h1>
                </div>
                <div className=" overflow-hidden  w-[70%] mx-auto flex justify-center items-center " >
                  <div className=' h-full w-full  flex flex-col justify-center  items-center gap-10 mx-auto  '>
                    <div className=' w-full flex flex-col justify-center items-center   gap-4 m-auto'>
                      <Carousel2 />
                    </div>
                  </div>
                </div>

              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
      {/* 
      */}
    </div>
  );
};

// Componentes de flecha personalizados
const CustomNextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500/70 hover:bg-blue-700 text-white p-2 rounded-full z-10 focus:outline-none"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const CustomPrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
  <button
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-500/70 hover:bg-blue-700 text-white p-2 rounded-full z-10 focus:outline-none"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

export default CarouselComponent;
