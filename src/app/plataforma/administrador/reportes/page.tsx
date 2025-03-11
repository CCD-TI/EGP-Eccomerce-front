"use client";

import { environment } from '@/environments/environment';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, Download, ChevronRight } from "lucide-react"

export default function Page() {
    const api = axios.create({
        baseURL: environment.baseUrl,
    });
    const [reporte, setreporte] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const responseTipoDocumento = await api.post("/inicio/listarreportesv2", {
                });

                const data = responseTipoDocumento.data.data[0];
                setreporte(data);

            } catch (error) {
                console.error("Error cargando los datos:", error);
            }
        };
        loadData();
    }, []);

    const descargarExcel = async (sql: any) => {
        try {
            const response = await api.post(
                "/inicio/exportarReportesAExcel",
                { fsql: sql },
                { responseType: "blob" } // Importante: recibir como 'blob'
            );
    
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
    
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reporte.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
        }
    };


    const [hoveredReport, setHoveredReport] = useState<number | null>(null)




    return (
        <div className="min-h-screen bg-[#0B0F1A] p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        Lista de Reportes
                    </h1>
                    <p className="text-gray-400">
                        Descarga los reportes en formato Excel para análisis detallado
                    </p>
                </div>

                <div className="grid gap-4">
                    {reporte.map((report: any, number: any) => (
                        <div
                            key={number}
                            className="relative group"
                            onMouseEnter={() => setHoveredReport(report.id)}
                            onMouseLeave={() => setHoveredReport(null)}
                        >
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:bg-gray-800/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-blue-500/10 rounded-lg">
                                            <FileSpreadsheet className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {report.Reporte}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                Actualizado:
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        onClick={() => descargarExcel(report.Consulta)}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Descargar</span>
                                    </button>
                                </div>

                                <div
                                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-xl transition-opacity duration-700 pointer-events-none ${hoveredReport === report.id ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            </div>

                            <div
                                className={`absolute right-0 top-1/2 -translate-y-1/2 transform transition-all duration-300 ${hoveredReport === report.id ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-2'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
