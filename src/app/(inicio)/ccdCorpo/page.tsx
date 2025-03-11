"use client";
import Modal2 from '@/components/ui/bruno/modal2';
import Map from '@/components/ui/bruno/map'
import { Accordion, AccordionItem, Button, Card, CardBody, Divider, Input, Select, SelectItem, Selection, Tab, Tabs, Textarea, useDisclosure } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { ReactNode, useState } from "react";
import { FaHandsHelping, FaHouseUser, FaPhoneAlt, FaUser, FaUserCog, FaUserGraduate, FaUsers, FaUserTie } from 'react-icons/fa';
import { GiCheckMark, GiEyeShield } from "react-icons/gi";
import { GrDocumentPdf } from 'react-icons/gr';
import { IoDocumentText, IoDocumentTextSharp, IoMail } from "react-icons/io5";
import 'aos/dist/aos.css'; // Importa los estilos de AOS
import AOS from 'aos'; // Importa AOS
import { useEffect } from 'react';
import { MdEngineering, MdOutlineMenuBook, MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { CiMail, CiShop } from 'react-icons/ci';
import { FcAbout } from 'react-icons/fc';
import ModalForm from '@/components/ui/bruno/modalForm';
import { motion } from 'framer-motion';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import CarruselNosotros from '@/components/ui/bruno/carruselcorpo';
import Carruselcorp from '@/components/ui/bruno/clientescorpCarrusel'
import CarruselGaleria from '@/components/ui/bruno/clientescorpGaleria'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { environment } from '@/environments/environment';
import { TbDeviceLandlinePhone, TbWorld } from 'react-icons/tb';
import { BsTelephoneFill } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import axios from 'axios';
import Swal from "sweetalert2";


const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

export default function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Duración de las animaciones
            once: true, // Si la animación se ejecuta solo una vez
            mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
            // delay: 500,
            // startEvent: 'load'  
        });
    }, []);
    interface CustomPopoverProps {
        children: ReactNode;
        title: string;
        description: string;
        delay: string;
    }
    const [activeContent, setActiveContent] = useState('default');
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState("photos"); // Define el estado para la pestaña seleccionada
    const Carrusel = dynamic(() => import('@/components/ui/bruno/carrusel'), {
        ssr: false,
    });

    const CustomPopover = ({ children, title, description, delay }: CustomPopoverProps) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div data-aos="fade-up" data-aos-delay={delay}> {/* Aplica AOS al contenedor principal */}
                <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger>
                        <div
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                            className="flex  justify-center items-center gap-2 p-2 bg-white rounded-xl cursor-pointer"
                        >
                            {children}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-4 py-2 max-w-sm w-auto flex flex-col items-center ">
                            <div className="text-lg  font-bold text-center">{title}</div>
                            <div className="text-base text-center">{description}</div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    // Define el tipo Key si está disponible
    type Key = string | number;

    // Función manejadora del cambio de selección
    const handleSelectionChange = (key: Key) => {
        setSelected(key.toString());
    };


    const { isOpen, onOpen, onOpenChange } = useDisclosure(); const animals = [
        { key: 'Capacitaciones Corporativas', label: 'Capacitaciones Corporativas' },
        { key: 'Consultorias', label: 'Consultorias' },
        // { key: 'bird', label: 'Bird' },
        // { key: 'fish', label: 'Fish' },
    ];

    // const numberOfElements = 8; // Número de elementos (círculos)
    // const radius = 220; // Distancia del círculo al eje central (radio de la órbita)

    // const circles = [
    //     { color: 'bg-blue-500', size: 'w-[8rem] h-[8rem]' },
    //     { color: 'bg-red-500', size: 'w-[8rem] h-[8rem]' },
    //     { color: 'bg-green-500', size: 'w-[8rem] h-[8rem]' },
    //     { color: 'bg-yellow-500', size: 'w-[8rem] h-[8rem]' },
    //     { color: 'bg-purple-500', size: 'w-[8rem] h-[8rem]' },
    //     { color: 'bg-pink-500', size: 'w-[8rem] h-[8rem]' },
    //     { color: 'bg-indigo-500', size: 'w-[8rem] h-[8rem]' },
    //     { color: 'bg-teal-500', size: 'w-[8rem] h-[8rem]' },
    // ];

    // const angleStep = (2 * Math.PI) / numberOfElements;

    // const elements = circles.map((circle, index) => {
    //     const angle = index * angleStep;
    //     const x = radius * Math.cos(angle); // Posición en el eje X
    //     const y = radius * Math.sin(angle); // Posición en el eje Y

    //     return (
    //         <motion.div
    //             key={index}
    //             className={`absolute ${circle.size} ${circle.color} rounded-full flex items-center justify-center`}
    //             style={{
    //                 transform: `translate(${x}px, ${y}px)`, // Posicionar el círculo en la órbita
    //             }}
    //         >
    //             {index + 1} {/* Texto opcional dentro de los círculos */}
    //         </motion.div>
    //     );
    // });}

    //Datos
    const [correo, setcorreo] = React.useState("");
    const [nombre, setnombre] = React.useState("");
    const [telefono, settelefono] = React.useState("");
    const [servicio, setservicio] = React.useState<Selection>(new Set([]));
    const [mensaje, setmensaje] = React.useState("");
    const servicioArray = Array.from(servicio);  // Convertir el Set a array pes
    const servicioString = servicioArray.join(", ");


    function enviarcorreo() {
        const mensaje1 = `<!DOCTYPE html>
        <html lang="es">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
           
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f7f7f7;
                }
    
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border: 1px solid #ddd;
                }
    
                .header {
                    background-color: #042C54;
                    color: white;
                    text-align: center;
                    padding: 20px;
                    position: relative;
                    height: 100%;
                }
    
                .header img {
                    height: auto;
                    width: 275px;
                }
    
    
                .content {
                    padding: 20px;
                    text-align: center;
                }
    
                .customer-name {
                    font-weight: bold;
                    color: #021B96;
                }
    
                .chart {
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                    margin: 20px 0;
                }
    
                .bar-container {
                    text-align: center;
                }
    
                .bar {
                    width: 30px;
                    background-color: #ddd;
                    margin-bottom: 5px;
                }
    
                .bar-container.current .bar {
                    background-color: #ff6600;
                }
    
                .payment-info {
                    display: flex;
                    justify-content: space-around;
                    margin: 20px 0;
                }
    
                .info-box {
                    padding: 10px;
                    width: 50%;
                    margin:auto;
                }
    
                .payment-code {
                    background-color: #f0f0f0;
                    padding: 10px;
                    margin: 20px 0;
                    text-align: center;
                }
    
                .payment-options {
                    text-align: center;
                    margin: 20px 0;
                }
    
                .payment-options button {
                    background-color: #ff6600;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
    
                .banks img {
                    width: 50px;
                    margin: 0 5px;
                }
    
                .footer {
                    background-color: #042C54;
                    color: white;
                    text-align: center;
                    padding: 20px;
    
                }
            </style>
        </head>
    
        <body>
            <div class="container">
                <header class="header">
                    <img src="https://ccdcapacitacion.edu.pe/wp-content/uploads/2022/10/PLANTILLA-WEB-CCD.png" alt="" class="logo">
                </header>
    
                <section class="content">
                    <h2>Mensaje Corporativo <br><span class="customer-name"></span></h2>
    
    
                    <div class="payment-info">
                        <div class="info-box">
                            <div style="display: flex;gap: 4px;  align-items: center;">
                                <h3>Correo:</h3>
                                <p>${correo}</p>
                            </div>
                            <div style="display: flex;gap: 4px; align-items: center;">
                                <h3>Nombre:</h3>
                                <p>${nombre}</p>
                            </div>
                            <div style="display: flex;gap: 4px; align-items: center;">
                                <h3>Telefono:</h3>
                                <p>${telefono}</p>
                            </div>
                            <div style="display: flex;gap: 4px; align-items: center;">
                                <h3>Servicio:</h3>
                                <p>${servicioString}</p>
                            </div>
                              <div style="display: flex;gap: 4px; align-items: center;">
                                <h3>Mensaje:</h3>
                                <p>${mensaje}</p>
                            </div>
                        </div>
    
                    </div>
    
                </section>
    
                <footer class="footer">
                    <p>Responder porfavor lo mas pronto posible</p>
                </footer>
            </div>
        </body>
    
        </html>`
        // infenix.reborn@gmail.com
        api.post("/inicio/EnviarCorreoPago", {
            pdestinatario: 'ezio1622@gmail.com',
            pmensaje: mensaje1
          })
          .then((response) => {
            // Si la solicitud fue exitosa
            console.log('Correo enviado con éxito:', response.data);
            
            Swal.fire({
              title: `Formulario Enviado ${servicioString}`,
              text: response.data.message,
              icon: 'success'
            });
          })
          .catch((error) => {
            // Si ocurrió un error
            console.error('Error al enviar el correo:', error.response?.data || error.message);
            Swal.fire({
              title: 'Error al enviar el correo',
              text: error.response?.data?.error || 'Hubo un problema al enviar el correo, intenta nuevamente.',
              icon: 'error'
            });
          });

        // Swal.fire({
        //     title: `Formulario Enviado ${servicioString} `,
        //     text: "Gracias por completar el formulario, en unos instantes le llegara un correo con sus credenciales para la plataforma de estudio",
        //     icon: "success"
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //     }
        // });
    }


    return (
        <main className="flex flex-col items-center">
            <section className="relative flex flex-col  lg:flex-row w-full h-[90vh] max-xl:h-full">

                <div className=" absolute  w-full lg:w-[55%] h-full overflow-hidden max-xl:hidden">
                    <img
                        src="/Multimedia/Imagen/relleno/fondocorp.svg"
                        alt=""
                        className="w-full h-full object-cover"
                    // style={{ clipPath: 'polygon(65% 0, 100% 30%, 100% 100%, 0 100%, 0 0)' }}
                    />
                </div>

                {/* <div
                    className="absolute top-0 left-0 w-full lg:w-[45%] h-full z-10 max-xl:hidden "
                    style={{
                        clipPath: '',


                        background: 'var(--newgrad3)',
                    }} >

                    <img
                        src={environment.baseUrlStorage + "/Multimedia/Imagen/Ccd/Logos/CCDLOGOWHITE3.png"}
                        alt="CCD Logo"
                        className="w-[8rem] lg:w-[17rem] h-[8rem] lg:h-[17rem] absolute bottom-4 left-4"
                    />
                </div> */}


                <div className="relative w-full max-xl:w-full flex flex-col justify-center mx-auto pl-16 max-xl:pl-0  gap-10 p-4 z-20">
                    <div className='flex flex-col justify-center  gap-8  mx-auto pl-[20rem] max-xl:pl-0 '>
                        <h1 className="text-4xl max-sm:text-3xl text-white font-semibold flex gap-2 items-center max-lg:px-4" data-aos="fade-up-right" data-aos-delay="100">SERVICIOS CORPORATIVOS</h1>
                        <h1 className="text-3xl text-white font-semibold flex gap-2 items-end max-lg:px-4 " data-aos="fade-up-right" data-aos-delay="200">
                            ¿Que brindamos  ?
                        </h1>
                        <div className='px-10 flex flex-col gap-6'>
                            <div>
                                <h1 className='text-2xl text-white'> Asesoría y Consultoría</h1>
                                <ul className="list-disc list-inside marker:text-[#00E9DD] text-white">
                                    <li><span className="font-bold">Asesoría</span> en el modelo de licenciamiento para universidades.</li>
                                    <li>Actualización e interpretación de las <span className="font-bold">normas ISO 9001: 2015, ISO 21001:2018</span>.</li>
                                    <li><span className="font-bold">Actualización e interpretación</span> de estándares de modelos de acreditación para universidades educativas.</li>
                                    <li><span className="font-bold">Auditorías</span> a sistemas de gestión con enfoque transversal a los modelos de acreditación.</li>
                                </ul>
                            </div>

                            <div>
                                <div className='flex max-sm:flex-col  max-sm:gap-10 gap-20 text-white py-4'>

                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-2xl'> Cursos Coporativos IN-HOUSE</h1>
                                        <ul className="list-disc list-inside marker:text-[#00E9DD] text-white">
                                            <li> Capacitaciones<span className="font-bold"> a medida.</span>.</li>
                                            <li> <b>Adaptamos</b> nuestros temarios a los requerimientos de su institución.</li>


                                        </ul>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className=' text-base py-1  px-6 border-2 rounded-xl flex gap-2 justify-center items-center'>
                                            <img src="/Multimedia/Imagen/iconoscat/ICONOS WEB_GESTIÓN.png" alt="" className='w-8 h-8' />
                                            <h1> Gestión Pública.</h1>
                                        </div>
                                        <div className='py-1 px-6 text-base border-2 rounded-xl flex gap-2  justify-center items-center'>
                                            <img src="/Multimedia/Imagen/iconoscat/ICONOS WEB_INGENIERÍA.png" alt="" className='w-8 h-8 ' />
                                            <h1>Ingeniería</h1>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>


            <section className="w-full h-full flex flex-col gap-6 justify-center items-center py-6  ">

                <h1 data-aos="fade-right" className='text-6xl max-sm:text-xl font-bold text-center flex justify-center gap-2 items-center text-white '>
                    <div className='flex flex-col justify-center items-center py-6'>
                        <h1>
                            <span className=" text-4xl text-white font-extrabold">Benefi</span>
                            {/* <span className='text-5xl text-white'> </span> */}
                            <span className='text-4xl underline text-white  decoration-[white] decoration-4 underline-offset-4 '>cios</span>
                        </h1>
                    </div>
                </h1>

                <div className="w-[60%] max-lg:w-full max-sm:w-[80%]  flex flex-col gap-6  mx-auto   ">


                    <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:hidden justify-center items-start py-10 max-xl:px-20 gap-10">
                        <CustomPopover delay='100' title="Cohesión" description="Los empleados que participan en la capacitación in house pueden trabajar juntos en resolver problemas específicos de la empresa, fomentando el trabajo en equipo y la colaboración.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_COHESIÓN.png"
                                    alt="Cohesión"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base max-xl:text-base font-bold text-[#142D52]">COHESIÓN</h1>
                        </CustomPopover>

                        <CustomPopover delay='200' title="Membresías" description="Promociones especiales a su medida.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_MEMBRESÍAS.png"
                                    alt="Membresías"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base max-xl:text-base font-bold text-[#142D52]">MEMBRESIAS</h1>
                        </CustomPopover>

                        <CustomPopover delay='300' title="Flexibilidad" description="La institución puede programar las sesiones de capacitación en los horarios que mejor se adapten a su operativa, minimizando la interrupción de las actividades diarias.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_FLEXIBILIDAD.png"
                                    alt="Flexibilidad"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base max-xl:text-base font-bold text-[#142D52]">FLEXIBILIDAD</h1>
                        </CustomPopover>

                        <CustomPopover delay='400' title="Personalización" description="Los programas de capacitación se diseñan específicamente para atender las necesidades y objetivos particulares de la institución.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_PERSONALIZACIÓN.png"
                                    alt="Personalización"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base max-xl:text-base font-bold text-[#142D52]">PERSONALIZACIÓN</h1>
                        </CustomPopover>

                        <CustomPopover delay='500' title="Docentes de Excelencia" description="Plana docentes con amplia experiencia laboral y trayectoria profesional nacionales e internacionales.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_DOCENTES-DE EXCELENCIA.png"
                                    alt="Docentes de Excelencia"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base font-bold max-xl:text-base text-[#142D52]">DOCENTES <br />DE EXCELENCIA</h1>
                        </CustomPopover>

                        <CustomPopover delay='600' title="Control de Calidad" description="La institución tiene un mayor control sobre la calidad y consistencia del contenido de la capacitación.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_CONTROL DE CALIDAD.png"
                                    alt="Control de Calidad"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base font-bold text-[#142D52] max-xl:text-base" >CONTROL <br /> DE CALIDAD</h1>
                        </CustomPopover>

                        <CustomPopover delay='700' title="Descuentos Exclusivos" description="En diferentes servicios y tiendas comerciales.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_DESCUENTOS EXCLUSIVOS.png"
                                    alt="Descuentos Exclusivos"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base font-bold text-[#142D52] max-xl:text-base">DESCUENTOS <br /> EXCLUSIVOS</h1>
                        </CustomPopover>

                        <CustomPopover delay='800' title="Confidencialidad" description="Realizar la capacitación internamente puede ser beneficioso para tratar temas sensibles o estratégicos que no se desea compartir con personas externas.">
                            <div className="rounded-full ">
                                <img
                                    src="/Multimedia/Imagen/iconoscat/ICONOS WEB_CONFIDENCIALIDAD.png"
                                    alt="Confidencialidad"
                                    className="w-[4rem] h-[4rem]"
                                />
                            </div>
                            <h1 className="text-base font-bold text-[#142D52] max-xl:text-base">CONFIDENCIALIDAD</h1>
                        </CustomPopover>
                    </div>

                    {/* Estructura para dispositivos móviles con Accordion */}
                    <div>

                        <Accordion variant="splitted" className="hidden max-sm:block !border-0 !shadow-none !p-0">
                            <AccordionItem key="1" aria-label="Cohesión" title="Cohesión" className='my-4'>
                                Los empleados que participan en la capacitación in house pueden trabajar juntos en resolver problemas específicos de la empresa, fomentando el trabajo en equipo y la colaboración.
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Membresías" title="Membresías" className='my-4'>
                                Promociones especiales a su medida.
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Flexibilidad" title="Flexibilidad" className='my-4'>
                                La institución puede programar las sesiones de capacitación en los horarios que mejor se adapten a su operativa, minimizando la interrupción de las actividades diarias.
                            </AccordionItem>
                            <AccordionItem key="4" aria-label="Personalización" title="Personalización" className='my-4'>
                                Los programas de capacitación se diseñan específicamente para atender las necesidades y objetivos particulares de la institución.
                            </AccordionItem>
                            <AccordionItem key="5" aria-label="Docentes de Excelencia" title="Docentes de Excelencia" className='my-4'>
                                Plana docentes con amplia experiencia laboral y trayectoria profesional nacionales e internacionales.
                            </AccordionItem>
                            <AccordionItem key="6" aria-label="Control de Calidad" title="Control de Calidad" className='my-4'>
                                La institución tiene un mayor control sobre la calidad y consistencia del contenido de la capacitación.
                            </AccordionItem>
                            <AccordionItem key="7" aria-label="Descuentos Exclusivos" title="Descuentos Exclusivos" className='my-4'>
                                En diferentes servicios y tiendas comerciales.
                            </AccordionItem>
                            <AccordionItem key="8" aria-label="Confidencialidad" title="Confidencialidad" className='my-4'>
                                Realizar la capacitación internamente puede ser beneficioso para tratar temas sensibles o estratégicos que no se desea compartir con personas externas.
                            </AccordionItem>
                        </Accordion>
                    </div>

                </div>
            </section>

            <section className="grid grid-cols-1 justify-center items-center max-sm:w-full  ">
                <div className="w-full  mx-auto  text-white flex flex-col gap-6 justify-center items-center p-10 ">
                    <div data-aos="zoom-out-right" className='flex gap-2 justify-center  items-center text-white'>
                        <div className='flex flex-col justify-center items-center py-6'>
                            <h1>
                                <span className=" text-4xl text-white font-extrabold">Nuestros </span>
                                <span className='text-4xl text-white'>Clientes Corporat</span>
                                <span className='text-4xl underline text-white  decoration-[white] decoration-4 underline-offset-4 '>ivos</span>
                            </h1>
                        </div>
                    </div>
                    <Carruselcorp />
                </div>
            </section>

            <section className="w-full h-full max-md:h-full py-8  flex flex-col justify-center items-center gap-8 "  >
                <div className="w-full h-full  mx-auto flex flex-col gap-2  justify-center items-center px-[1rem]" data-aos="flip-left" >
                    <div data-aos="fade-right" className='flex gap-2 justify-center  items-center text-white'>

                        <div className='flex flex-col justify-center items-center py-6'>
                            <h1>
                                <span className=" text-4xl text-white font-extrabold">Galería</span>
                                <span className='text-4xl text-white'>de exitos Corporat</span>
                                <span className='text-4xl underline text-white  decoration-[white] decoration-4 underline-offset-4 '>ivos</span>
                            </h1>
                        </div>
                    </div>


                </div>

                <CarruselGaleria />

                {/* <CarruselNosotros /> */}
            </section>

            <section className="w-full h-full  flex  flex-col justify-center items-center"  >
                <div className='flex flex-col justify-center items-center py-6'>
                    <h1 className='text-center'>
                        <span className=" text-3xl text-white font-extrabold max-sm:px-4"> ¿Deseas mayor información acerca de <br /></span>
                        <span className='text-3xl text-white pl-4'> nuestros servicios corporat</span>
                        <span className='text-3xl underline text-white  decoration-[white] decoration-4 underline-offset-4  '>ivos</span>
                    </h1>
                </div>
                <div className="w-full h-full grid grid-cols-1" data-aos="flip-left" >

                    <div className=' h-full flex justify-center items-center gap-8  '>

                        <div className=' w-[90%]  flex max-sm:flex-col  justify-center items-center   max-2xl:w-[90%] max-[1920px]:w-[80%]   max-[2560px]:w-[60%]   max-sm:w-full max-lg:gap-6  mx-auto px-[2rem] py-[4rem] max-xl:p-4 h-full  '>
                            <div className='w-[70%] h-full flex max-lg:w-[50%]  max-lg:flex-col  justify-center max-sm:items-center '>
                                <div className='w-full max-lg:w-full h-full flex justify-center items-center '>
                                    <img
                                        src="/Multimedia/Imagen/logos/CCDLOGOWHITE.png"
                                        className='h-64 w-64 max-xl:h-40  max-xl:w-40'
                                        alt=""
                                    />
                                </div>
                                <div className=" w-full h-full   max-sm:w-full flex flex-col justify-center max-sm:items-center   gap-8  p-4 rounded-lg text-white">


                                    <div>
                                        <h1 className='text-4xl font-extrabold'>CONTÁCTANOS</h1>
                                    </div>
                                    <div className='flex flex-col gap-4 justify-start '>
                                        <h1 className='text-lg max-xl:text-base flex gap-2 items-center font-bold'>Área Corporativa</h1>
                                        <h1 className='text-lg max-xl:text-base flex gap-2 items-center '><IoMail className='h-6 w-6' />corporativo@ccdcapacitacion.com</h1>
                                        <h1 className='text-lg max-xl:text-base flex gap-2 items-center '><IoMail className='h-6 w-6' />corporativo2@ccdcapacitacion.com</h1>
                                        <h1 className='text-lg max-xl:text-base flex gap-2 items-center '><FaPhoneAlt className='h-4 w-4' />995 377 509</h1>
                                        <div className='flex flex-col gap-2 justify-start mt-4 '>
                                            <h1 className='text-lg flex gap-2 items-center font-bold'>Pagina Web</h1>
                                            <h1 className='text-lg flex gap-2 items-center'><TbWorld className='h-6 w-6' />https://ccdcapacitacion.edu.pe/</h1>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className='h-full w-[30%]  max-lg:w-full  flex flex-col justify-center items-center gap-6 px-12 py-8  rounded-lg bg-white text-white '>
                                <div className="text-left  text-[#041e42a1]"><h1 className='text-xl font-semibold'> Ingresa tus datos <br /> y cuéntanos el servicio de <br /> tu interes para poder ayudarte.</h1></div>
                                <Input
                                    autoFocus
                                    endContent={
                                        <IoMail className="text-2xl text-white pointer-events-none flex-shrink-0" />
                                    }
                                    label={<h1 className='text-white text-base'>Correo</h1>}
                                    placeholder="Ingrese su Correo"
                                    variant="bordered"
                                    // color="default"
                                    type="email"
                                    className='rounded-2xl bg-[#142D52] !border-[#142D52] '
                                    value={correo}
                                    onValueChange={setcorreo}
                                />
                                <Input
                                    endContent={
                                        <FaUser className="text-2xl text-white  pointer-events-none flex-shrink-0" />
                                    }
                                    label={<h1 className='text-white text-base'>Nombres</h1>}
                                    placeholder="Ingrese su Nombre"
                                    type="Text"
                                    variant="bordered"
                                    className='rounded-2xl bg-[#142D52] !border-[#142D52] '
                                    value={nombre}
                                    onValueChange={setnombre}
                                />
                                <Input
                                    endContent={
                                        <FaPhoneAlt className="text-2xl  text-white pointer-events-none flex-shrink-0" />
                                    }
                                    label={<h1 className='text-white text-base'>Numero</h1>}
                                    placeholder="Ingrese su Numero"
                                    type="text"
                                    variant="bordered"
                                    className='rounded-2xl bg-[#142D52] !border-[#142D52] '
                                    value={telefono}
                                    onValueChange={settelefono}
                                />
                                <Select
                                    label={<h1 className='text-[#041e42a1] text-base'>Servicio</h1>}
                                    placeholder="seleccione su interes"
                                    className=""
                                    variant="faded"
                                    color="primary"
                                    selectedKeys={servicio}
                                    onSelectionChange={setservicio}
                                >
                                    {animals.map((animal) => (
                                        <SelectItem
                                            variant="faded"
                                            color="primary"
                                            key={animal.key}>
                                            {animal.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <div className='w-full h-[4.5rem]'>

                                    <Textarea

                                        color="primary"
                                        label="Mensaje"
                                        labelPlacement="inside"
                                        placeholder="Ingrese su mensaje"
                                        className=" rounded-lg  w-full h-full text-black "
                                        variant='bordered'
                                        size='sm'
                                        value={mensaje}
                                        onValueChange={setmensaje}
                                    />
                                </div>
                                <Button onClick={enviarcorreo} color="primary" variant="bordered" >
                                    Enviar
                                </Button>


                            </div>
                        </div>

                    </div>

                </div>

            </section>



        </main>

    );
}
