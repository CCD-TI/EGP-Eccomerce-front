'use client'

import { useGlobalContext } from "../layout";
import { ChevronDownIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import axios from "axios";
import { environment } from "@/environments/environment";
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';


export default function Component() {
    const { nombreGlobal, setNombreGlobal } = useGlobalContext();
    setNombreGlobal("mis-calificaciones")

    const [isOpen, setIsOpen] = useState(false)

    const searchParams = useSearchParams();
    const pid = searchParams.get('pid') || 'default';


    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const [notasproductos, setnotasproductos] = useState<any[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user.uid) {
            const loadData = async () => {
                try {
                    const response = await api.post("/inicio/listarnotasproductosv2", {
                        fusuario_id: session?.user.uid,
                    });
                    setnotasproductos(response.data.data[0]);
                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }
    }, [session]);

    function convertirFechaPeru(fechaISO:any) {
        // Crear un objeto Date a partir de la cadena ISO
        const fecha = new Date(fechaISO);
        
        // Opciones de formato para mostrar la fecha en un formato "normal"
        const opciones:any = {
            timeZone: "America/Lima", // Zona horaria de Perú
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
    
        // Formatear la fecha usando Intl.DateTimeFormat
        const fechaPeru = new Intl.DateTimeFormat("es-PE", opciones).format(fecha);
        
        return fechaPeru;
    }
    return (
        <div className="mt-4 flex flex-col gap-5 px-10">
            <div>
                <h1 className='text-[#D9DADB] text-lg'>Resultado </h1>
                <h1 className='text-white text-2xl font-bold'>Mis Calificaciones</h1>
            </div>
            {notasproductos.map((item: any,index:number) => (
                <div key={index} className="w-full  bg-[#131939] text-white rounded-xl shadow-lg overflow-hidden border border-[#006FEE]">
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                        <h2 className="text-xl font-semibold">
                            {item.Curso}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Calificación final</span>
                            <span className="bg-[#006FEE] px-3 py-1 rounded-xl">{item.PromedioFinal} / 20</span>
                        </div>
                    </div>
                    <div className="px-6 pb-6">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-between p-4 border border-[#006FEE]/70 hover:bg-[#0B1530] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <DocumentTextIcon className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-medium">Ver calificaciones</span>
                            </div>
                            <ChevronDownIcon
                                className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {isOpen && (
                            <div className="mt-4 space-y-4 ">
                                {item.questions.map((item1:any,index:number) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-[#0B1530] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#006FEE]/70"
                                    >
                                        <div className="space-y-1">
                                            <h3 className="font-medium">{item1.Evaluacion}</h3>
                                            <p className="text-sm text-gray-400">
                                                {convertirFechaPeru(item1.FechaInicio)} | {convertirFechaPeru(item1.FechaFin)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-400">Nota:</span>
                                            <span className="bg-[#006FEE] px-3 py-1 rounded-xl">
                                                {item1.Nota}/{20}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}





        </div>
    )
}

