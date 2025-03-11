"use client"
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../layout';
import axios from 'axios';
import { environment } from '@/environments/environment';
import { Button, Image, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { Download, Eye, LayoutGrid, LayoutList } from 'lucide-react';

export default function Page() {
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
    const { data: session } = useSession();

    const certificates = [
        { id: 1, name: 'Nombre del Certificado', code: 'Código del certificado' },
        { id: 2, name: 'Nombre del Certificado', code: 'Código del certificado' },
        { id: 3, name: 'Nombre del Certificado', code: 'Código del certificado' },
        { id: 4, name: 'Nombre del Certificado', code: 'Código del certificado' },
        { id: 5, name: 'Nombre del Certificado', code: 'Código del certificado' },
    ]

    const months = [
        { value: '1', label: 'Enero' },
        { value: '2', label: 'Febrero' },
        // Add more months...
    ]

    const years = [
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' },
        // Add more years...
    ]

    const [datadiplomas, setdatadiplomas] = useState([]);
    const [imagenesSeparadas, setImagenesSeparadas] = useState<{ ruta: string }[]>([]);

    useEffect(() => {
        if (session?.user) {
            const loadData = async () => {
                try {
                    const responseTipoDocumento = await api.post("/inicio/listarcertificadosxusuario", {
                        fusuario_id: session?.user.uid
                    });
                    setdatadiplomas(responseTipoDocumento.data.data[0])

                    if (responseTipoDocumento.data.data[0][0].RutaImagen) {
                        const imagenesArray = responseTipoDocumento.data.data[0][0].RutaImagen.split(',').map((img: any) => ({ ruta: img }));
                        setImagenesSeparadas(imagenesArray);
                    }

                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }

    }, [session?.user.Usuario])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(1);


    const openModal = (index: number) => {
        console.log(JSON.stringify(imagenesSeparadas))
        setCurrentSlide(index + 1);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Desactivar el scroll en el fondo
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; // Reactivar el scroll en el fondo
    };

    const plusSlides = (n: number) => {
        setCurrentSlide((prevIndex) => {
            const newIndex = prevIndex + n;
            if (newIndex > imagenesSeparadas.length) return 1;
            if (newIndex < 1) return imagenesSeparadas.length;
            return newIndex;
        });
    };

    const { nombreGlobal, setNombreGlobal } = useGlobalContext();
    setNombreGlobal("mis-diplomas")


    const capitalizeFirstWord = (text: any) => {
        const [firstWord, ...rest] = text.split(' ');
        return `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()} ${rest.join(' ').toLowerCase()}`;
    };
    return (
        <>
            <div className='px-10'>

                <div className='mt-3 flex max-md:flex-col max-md:gap-4  justify-between items-center mb-6 '>
                    <div>
                        <h1 className='text-[#D9DADB] text-lg'>Demostración</h1>
                        <h1 className='text-white text-2xl font-bold'>Mis Certificados</h1>
                    </div>
                    <div className="flex max-sm:flex-col max-sm:gap-4  items-center gap-4">
                        <div className="flex gap-2">
                            <Select
                                placeholder="Mes"
                                className="w-32"
                                size="sm"
                            >
                                {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>
                                        {month.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                placeholder="Año"
                                className="w-32"
                                size="sm"
                            >
                                {years.map((year) => (
                                    <SelectItem key={year.value} value={year.value}>
                                        {year.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                            className='text-black bg-white'
                        >
                            {viewMode === 'grid' ? (
                                <LayoutList className="h-4 w-4 mr-2 text-blue-1" />
                            ) : (
                                <LayoutGrid className="h-4 w-4 mr-2 text-blue-1" />
                            )}
                            Cambiar aspecto
                        </Button>
                    </div>
                </div>

                <div className={`${viewMode === 'grid' ? 'grid grid-cols-4 max-[1600px]:grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-2 max-sm:grid-cols-1  gap-14' : 'space-y-4'}`}>
                    {datadiplomas.map((cert: any, index) => (
                        <div
                            key={index}
                            className={`bg-white/15 rounded-lg shadow-xl p-4 ${viewMode === 'list' ? 'flex  justify-between items-center max-md:flex-col' : 'flex flex-col gap-3'
                                }`}
                        >
                            <div className='flex flex-col gap-1.5'>
                                <h3 className="text-[#007FEE] font-medium text-lg">{capitalizeFirstWord(cert.Modelo)}</h3>
                                <p className="text-white text-sm">Fecha de generación: {cert.FechaGenerado}</p>
                                <p className="text-white text-sm">Código del certificado: {cert.CodigoCertificado}</p>
                            </div>

                            {/* Imagen del certificado renderizada en el div */}
                            <img
                                alt="certificado"
                                src={environment.baseUrlStorage + "/Multimedia/Imagen/Usuarios/Certificados/" + cert.RutaImagen.split(',')[0]}

                                className={`shadow-xl size-full object-fill ${viewMode === 'grid' ? 'block' : 'hidden'}`}
                            />

                            {/* Botones de acción */}
                            <div className="flex justify-center gap-2 mt-2 max-sm:flex-col">
                                <Button variant="ghost" size="sm" className="text-white" onClick={() => openModal(0)}>
                                    <Eye className="h-4 w-4 mr-1 text-white" />
                                    Ver Certificado
                                </Button>
                                <a href="/Multimedia/Imagen/CERTIFICADO PFE CCD_page-0001.jpg" download="Certificado.jpg">
                                    <Button variant="ghost" size="sm" className="text-white">
                                        <Download className="h-4 w-4 mr-1 text-white" />
                                        Descargar Certificado
                                    </Button>
                                </a>
                            </div>


                        </div>
                    ))}
                    {isModalOpen && (
                        <div
                            id="modal"
                            className="fixed w-full h-full inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[1000]"
                        >
                            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
                                {/* Close Button */}
                                <div className="relative flex justify-center items-center w-full h-full p-4">
                                    <img
                                        src={environment.baseUrlStorage + "/Multimedia/Imagen/Usuarios/Certificados/" + imagenesSeparadas[currentSlide - 1].ruta}
                                        className="w-full h-full object-contain"
                                        alt={`Slide ${currentSlide}`}
                                    />
                                    <button
                                        className="absolute top-4 right-4 text-white text-4xl cursor-pointer p-2"
                                        onClick={closeModal}
                                    >
                                        X
                                    </button>
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 cursor-pointer"
                                    onClick={() => plusSlides(-1)}
                                >
                                    &#10094;
                                </button>
                                <button
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 cursor-pointer"
                                    onClick={() => plusSlides(1)}
                                >
                                    &#10095;
                                </button>

                                {/* Slide Counter */}
                                <div className="absolute bottom-12 w-full flex justify-center p-2 bg-black bg-opacity-60">
                                    <p className="text-white">
                                        {currentSlide} / {datadiplomas.length}
                                    </p>
                                </div>

                                {/* Thumbnail Navigation */}
                                <div className="absolute bottom-2 w-full flex justify-center gap-2 p-2 bg-black bg-opacity-60 overflow-auto">
                                    {imagenesSeparadas.map((img: any, index) => (
                                        <img
                                            key={index}
                                            src={environment.baseUrlStorage + "/Multimedia/Imagen/Usuarios/Certificados/" + img.ruta}
                                            className={`w-16 h-16 object-cover cursor-pointer border-2 border-transparent ${currentSlide === index + 1 ? 'border-white opacity-100' : 'opacity-60'}`}
                                            onClick={() => setCurrentSlide(index + 1)}
                                            alt={`Thumbnail ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
