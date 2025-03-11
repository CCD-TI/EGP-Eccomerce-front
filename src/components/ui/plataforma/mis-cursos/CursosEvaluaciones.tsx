'use client'
import React from 'react'

import { ChevronDownIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import axios from "axios";
import { environment } from "@/environments/environment";
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function CursosEvaluaciones({ pid }: any) {

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const [notasproductos, setnotasproductos] = useState<any[]>([]);
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const pmodalidad = searchParams.get('pmodalidad');
    const psala = searchParams.get('psala');
    useEffect(() => {
        if (session?.user && pmodalidad == 'Asincrónico') {
            const loadData = async () => {
                try {
                    const responseTipoDocumento = await api.post("/inicio/listarnotasproductosxproidv2", {
                        fusuario_id: session.user.uid,
                        fproducto_id:pid
                    });
                    setnotasproductos(responseTipoDocumento.data.data[0])

                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }
        if (session?.user && pmodalidad == 'En-Vivo') {
            const loadData = async () => {
                try {
                    const responseTipoDocumento = await api.post("/inicio/listarnotasvivoproductosxproidv2", {
                        fusuario_id: session.user.uid,
                        fproducto_id:pid,
                        fsala_id: psala
                    });
                    setnotasproductos(responseTipoDocumento.data.data[0])

                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }

      
    }, [session?.user.uid]);
    function convertirFechaPeru(fechaISO: any) {
        // Crear un objeto Date a partir de la cadena ISO
        const fecha = new Date(fechaISO);

        // Opciones de formato para mostrar la fecha en un formato "normal"
        const opciones: any = {
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
        <>
            <div className='flex flex-col gap-4'>
                {notasproductos.map((item: any, id: number) => (
                    <>
                        <div className="flex flex-col gap-4">

                            {(() => {
                                const totalNotas = notasproductos.reduce(
                                    (sum: number, item: any) =>
                                        sum + item.questions.reduce((subSum: number, item1: any) => subSum + item1.Nota, 0),
                                    0
                                );
                                const totalEvaluaciones = notasproductos.reduce(
                                    (count: number, item: any) => count + item.questions.length,
                                    0
                                );
                                const promedio = totalEvaluaciones > 0 ? (totalNotas / totalEvaluaciones).toFixed(2) : "0.00";
                                return (
                                    <div className='flex justify-between max-sm4:flex-col'>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">({notasproductos.length}) Evaluaciones</h3>
                                        </div>
                                        <div className="px-4 bg-[#123456] border-blue-500/50 border rounded-xl text-center text-white w-[16rem] flex items-center">
                                            <h3 className="font-bold text-base">Promedio General: {promedio}/20</h3>
                                        </div>
                                    </div>
                                );
                            })()}
                            {item.questions.map((item1: any, index: number) => (
                                <div
                                    key={index}
                                    className="p-4 bg-[#0B1530] border-blue-500/50 border-1 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="space-y-1">
                                        <h3 className="font-medium text-white !m-0 text-lg">{item1.Evaluacion}</h3>
                                        <p className="flex max-sm4:flex-col  gap-2 text-sm text-gray-400">
                                            <p>{convertirFechaPeru(item1.FechaInicio)}</p><p className='max-sm4:hidden'>|</p><p>{convertirFechaPeru(item1.FechaFin)}</p> 
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-400">Nota:</span>
                                        <span className={`${0 < item1.Nota || item1.Nota < 14 && 'bg-[#FFA07A]'} ${14 <= item1.Nota || item1.Nota < 17 && 'bg-[#FFD700]'} ${17 <= item1.Nota || item1.Nota <= 20 && 'bg-[#98FB98]'} px-3 py-1 rounded-2xl text-[#000000]`}>
                                            {item1.Nota}/{20}
                                        </span>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </>

                ))}
            </div>
        </>
    )
}
