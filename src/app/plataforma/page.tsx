"use client"
import {
    Select, SelectItem, Image, Divider, Pagination as Pagination1, Input, useDisclosure, Modal,
    ModalContent, ModalBody
} from '@nextui-org/react';

import ProductPlatComponent from '@/components/ui/pricing/productoplat';
import { environment } from '@/environments/environment';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './layout';
import CardCurso from '@/components/ui/plataforma/CardCurso';
import CourseCardv2 from '@/components/ui/paul/coursecardv2';
import { useSession } from "next-auth/react";
import CourseCardTienda from "@/components/ui/paul/coursecardtienda";
import { MdKeyboardBackspace } from "react-icons/md";
import { BiSolidVideoRecording } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";
import { FaCheck } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartProductoStore } from '@/context/cartProducto'
import CompraRapida from "@/components/ui/paul/compraRapida/payment-flow";
import { Download, Phone } from 'lucide-react'





export default function Page() {
    const { data: session, status } = useSession();
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();

    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const [enVivoActivo, setEnVivoActivo] = useState<boolean>(false);
    const [asincronicoActivo, setAsincronicoActivo] = useState<boolean>(false);
    const [cursosCompletos, setcursosCompletos] = useState<any[]>([]);
    const [preciototal, setpreciototal] = useState(0);
    const [idproducto, setidproducto] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post("/inicio/vercursosplataformatiendaxtop1v2", {

                });
                setcursosCompletos(response.data.data[0]);
                console.log(response.data.data[0])
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const { nombreGlobal, setNombreGlobal } = useGlobalContext();
    setNombreGlobal("principal")
    function capitalizeWords(str: string): string {
        
        return str
            .toLowerCase()
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    const openSideSheet = (curso: any) => {
        setSelectedCourse(curso);
        setIsOpen(true);
    };


    const addProductToCart = useCartProductoStore((state) => state.addProductTocart);
    const removeProductFromCart = useCartProductoStore((state) => state.removeProduct);
    const cart = useCartProductoStore((state) => state.cart);

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

    const [modalidad, setmodalidad] = React.useState("");
    const [tipocurso, settipocurso] = useState("");
    const [curso, setcurso] = useState("");
    const [imagen, setimagen] = useState("");
    const [brochure, setbrochure] = useState("");

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
                const rutas = (cursosCompletos as any)[0].RutaImagen; // Obtenemos el string de la BD
                const rutasArray = JSON.parse(rutas);
                const rutaPortadaFinal = rutasArray.find((ruta: string) => ruta.includes("PortadaFinal"));
                const rutaBrochureCursos = rutasArray.find((ruta: string) => ruta.includes("BrochureCursos"));

                setbrochure(rutaBrochureCursos);
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
    return (
        <>
            <div className='py-5 px-10 max-sm3:px-3'>
                <h1 className="text-white text-2xl">
                    Hola, {capitalizeWords(`${session?.user.Nombres} ${session?.user.Apellidos}`)}
                    <span className="text-[#8F9094] text-2xl"> Bienvenido de vuelta!</span>
                </h1>
            </div>
            <div className='px-6 bg-[image:var(--newgrad4)]  h-40 max-md:size-[90%] rounded-xl py-5 flex flex-col gap-2 w-[65%] mx-10 max-sm3:mx-2'>
                <h1 className='text-[#D9DADB] text-lg bg-white/30 w-[4rem] rounded-2xl text-center'>CCD</h1>
                <h1 className='text-white text-2xl font-bold'>Centro de Capacitación y Desarrollo</h1>
                <div className='flex gap-4 max-sm:justify-between'>
                    <Button color="primary" variant="solid" className='bg-[#0B1026] max-sm:border-1 text-white'>
                        Iniciar
                    </Button>
                    <Button className="px-6 py-3 bg-[#173897] text-white rounded-xl hover:bg-blue-700 transition-colors">
                        Conocer más
                    </Button>
                </div>
            </div>
            <div className='mt-3 px-10 max-sm3:px-3'>
                <h1 className='text-[#D9DADB] text-lg'>Explorar</h1>
                <h1 className='text-white text-2xl font-bold'>Cursos y Diplomas</h1>
            </div>

            <div className="flex flex-wrap justify-center mx-auto  px-10 py-10 max-sm3:!p-3 gap-10">
                {cursosCompletos.map((item, index) => (
                    <CourseCardTienda key={index} array={item} openSideSheet={openSideSheet} />
                ))}
            </div>
            {isOpen && selectedCourse && (
                <div className="fixed inset-0 z-50 flex justify-end" style={{ pointerEvents: 'none' }}>
                    <div
                        className=" w-[25%] max-xl:w-[24rem] h-full bg-[#131939] shadow-xl  absolute right-0 top-0 px-4 py-2"
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div className="min-h-screen bg-[#131939] ">
                            <div className="mx-auto max-w-7xl">
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
                                                            : Array.isArray(JSON.parse(selectedCourse.RutaImagen))
                                                                ? JSON.parse(selectedCourse.RutaImagen).find((ruta: any) => ruta.includes("PortadaFinal")) || JSON.parse(selectedCourse.RutaImagen)[0]
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
                                                        src={storageUrl + '/Multimedia/Imagen/Ccd/Logos/CEL.png'}
                                                        alt="Certification Badge"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full" />
                                                    <h1 className='text-white w-22'>
                                                        Colegio de Abogados de lima
                                                    </h1>
                                                </div>)}
                                                {selectedCourse.MarcasRespaldo.includes('2') && (<div className='flex gap-3 items-center'>
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
                                                                    const brochureUrl =
                                                                        (Array.isArray(selectedCourse.RutaImagen)
                                                                            ? selectedCourse.RutaImagen.find((ruta: any) => ruta.includes("BrochureCursos")) || selectedCourse.RutaImagen[0]
                                                                            : Array.isArray(JSON.parse(selectedCourse.RutaImagen))
                                                                                ? JSON.parse(selectedCourse.RutaImagen).find((ruta: any) => ruta.includes("BrochureCursos")) || JSON.parse(selectedCourse.RutaImagen)[0]
                                                                                : selectedCourse.RutaImagen)

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


                                            <div className=" pt-6">
                                                <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
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
                                                                    : Array.isArray(JSON.parse(selectedCourse.RutaImagen))
                                                                        ? JSON.parse(selectedCourse.RutaImagen).find((ruta: any) => ruta.includes("PortadaFinal")) || JSON.parse(selectedCourse.RutaImagen)[0]
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

        </>
    )
}
