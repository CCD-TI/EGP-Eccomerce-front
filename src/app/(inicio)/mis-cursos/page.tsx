"use client"

import Progress from "@/components/ui/bruno/ProgressEva"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react';
import axios from 'axios';
import { environment } from '@/environments/environment';
import { useSession } from 'next-auth/react';
import { useCourseStore } from '@/context/cursodetalle';
import { useRouter } from 'next/navigation';

export default function Page() {
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const courses = [
        {
            title: "Estabilidad de taludes",
            progress: 30,
            image: "/Multimedia/Imagen/Cursos/Portada/1PRINCIPAL PFE CCD.png",
        },
        {
            title: "Valorización y liquidación de obras públicas y privadas",
            progress: 50,
            image: "/Multimedia/Imagen/Cursos/Portada/1PRINCIPAL PFE CCD.png",
        },
        {
            title: "Supervisor SSOMA aplicado al sector construcción, industrial y minero",
            progress: 70,
            image: "/Multimedia/Imagen/Cursos/Portada/1PRINCIPAL PFE CCD.png",
        },
        {
            title: "Supervisor SSOMA aplicado al sector construcción, industrial y minero",
            progress: 70,
            image: "/Multimedia/Imagen/Cursos/Portada/1PRINCIPAL PFE CCD.png",
        },
        {
            title: "Supervisor SSOMA aplicado al sector construcción, industrial y minero",
            progress: 70,
            image: "/Multimedia/Imagen/Cursos/Portada/1PRINCIPAL PFE CCD.png",
        },
        {
            title: "Supervisor SSOMA aplicado al sector construcción, industrial y minero",
            progress: 70,
            image: "/Multimedia/Imagen/Cursos/Portada/1PRINCIPAL PFE CCD.png",
        },
        {
            title: "Supervisor SSOMA aplicado al sector construcción, industrial y minero",
            progress: 70,
            image: "/Multimedia/Imagen/Cursos/Portada/1PRINCIPAL PFE CCD.png",
        },
    ]
    const [datacursos, setdatacursos] = useState([]);

    useEffect(() => {
        if (session?.user) {
            const loadData = async () => {
                try {
                    const responseTipoDocumento = await api.post("/inicio/listarcursosplataformaxusuario", {
                        fusuario_id: session?.user.uid
                    });
                    setdatacursos(responseTipoDocumento.data.data[0])

                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }

    }, [session?.user.Usuario])

    
  const setCourseData = useCourseStore((state) => state.setCourseData); // Obtener la función para actualizar el estado

  const handleCourseNavigation = (IdModelo:any,Modelo:any,Clasificacion:any,IdProducto:any,IdTipoProducto:any) => {
    // Almacenar los datos en el estado de Zustand
    setCourseData(Clasificacion, IdModelo,IdProducto,IdTipoProducto);
    // Luego, navegar a la página de detalles
    router.push(`${Modelo}`);
};

    return (



        <div className='w-[80%] m-auto flex flex-col justify-center '>
            <div className="container mx-auto  py-6 max-md:pt-20">
                <h1 className="text-3xl font-bold text-blue-500 mb-6">Mis Cursos y diplomas</h1>
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
                    {/* Dropdown Button */}
                    <div className="relative w-full sm:w-auto">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full sm:w-auto bg-[#1a2d5a] hover:bg-[#1a2d5a]/90 text-white py-2 px-4 rounded flex items-center justify-between"
                        >
                            Programas actuales
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-[200px] z-10">
                                <div className="p-2 cursor-pointer hover:bg-gray-100">Todos los programas</div>
                                <div className="p-2 cursor-pointer hover:bg-gray-100">Programas en curso</div>
                                <div className="p-2 cursor-pointer hover:bg-gray-100">Programas completados</div>
                            </div>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="search"
                            placeholder="Buscar por nombre"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 grid-cols-3">
                {datacursos.map((item: any, index) => (

                    <div key={index} onClick={() => handleCourseNavigation(item.IdModelo, item.Modelo, item.Clasificacion,item.IdProducto,item.IdTipoProducto)} className="border rounded-lg shadow-md overflow-hidden relative">
                        <img
                            src={environment.baseUrlStorage + item.RutaImagen}
                            alt={`Imagen del curso:`}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4 space-y-4">
                            <h3 className="font-medium line-clamp-2">{item.Modelo}</h3>
                            <Progress value={50} aria-label={`Progreso del curso: ${50}%`} />

                        </div>
                        <h1 className='p-2 px-4 bg-blue-1 text-white absolute top-3 rounded-lg right-3'>{item.Clasificacion}</h1>
                    </div>

                ))}

            </div>
        </div>
    )
}
