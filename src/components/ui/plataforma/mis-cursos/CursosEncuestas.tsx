"use client";

import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import { environment } from "@/environments/environment";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confetti from "canvas-confetti";



export default function CursosEncuestas({pid}:any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });

    const [preguntasxencuesta, setPreguntasxEncuesta] = useState<any[]>([]);
    const [encuestasobligatorias, setEncuestasObligatorias] = useState<any[]>([]);
    const [respuestas, setRespuestas] = useState<{ [key: string]: any }>({});
    const [tituloEncuesta, setTituloEncuesta] = useState("");
    const [idEncuesta, setidEncuesta] = useState(0);

    async function rendirEncuesta(encuestaId: any) {
        onOpen();
        const listarTemario = await api.post("/inicio/listarpreguntasxencuestav2", {
            fencuesta_id: encuestaId,

        });
        setPreguntasxEncuesta(listarTemario.data.data[0]);
    }

    function handleRespuestaChange(preguntaId: string, valor: any) {
        setRespuestas((prev) => ({
            ...prev,
            [preguntaId]: valor,
        }));
    }


    var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    const shoot = () => {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    };


    async function enviarEncuesta() {
        console.log("Respuestas enviadas:", respuestas);
        const MySwal = withReactContent(Swal);
        
        const result = await MySwal.fire({
            title: "Finalizo su encuesta?",
            text: "Esta seguro del envio?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Enviar",
            cancelButtonText: "Aun no",
            allowOutsideClick: false,
        });
    
        if (result.isConfirmed) {
            await Swal.fire({
                title: "Muchas Gracias",
                text: "Gracias por tu colaboración, trabajamos para darte un mejor servicio constantemente",
                icon: "success",
            });
    
            // Dispara el evento `shoot` en los intervalos establecidos
            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
    
            // Envía las respuestas al backend
            try {
                await api.post("/inicio/responderencuestav2", {
                    fusuario_id: session?.user.uid,
                    fencuesta_id: idEncuesta,
                    frespuestas: respuestas,
                    fproducto_id: pid,
                });
    
                const response1 = await api.post("/inicio/listarencuestasalumnoobligatoriov2", {
                    fusuario_id: session?.user.uid,
                    fproducto_id: pid,
                });
    
                setEncuestasObligatorias(response1.data.data[0]);
                onOpenChange();
            } catch (error) {
                console.error("Error al enviar las respuestas:", error);
                Swal.fire("Error", "Hubo un problema al enviar tus respuestas. Por favor, intenta de nuevo.", "error");
            }
    
            // Repite el evento `shoot` en los intervalos establecidos
            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
        }
    }
    
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user.uid) {
            const loadData = async () => {
                try {
                    const response = await api.post("/inicio/listarencuestasalumnoobligatoriov2", {
                        fusuario_id: session?.user.uid,
                        fproducto_id:pid
                    });
                    setEncuestasObligatorias(response.data.data[0]);
                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }
    }, [session]);

    function capitalizarPrimeraLetraConCaracterEspecial(texto: any) {
        texto = texto.trim();
        let indexPrimeraLetra = [...texto].findIndex((char) =>
            /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/.test(char)
        );
        if (indexPrimeraLetra === -1) return texto;

        const antes = texto.slice(0, indexPrimeraLetra);
        const primeraLetra = texto[indexPrimeraLetra].toUpperCase();
        const resto = texto.slice(indexPrimeraLetra + 1).toLowerCase();

        return antes + primeraLetra + resto;
    }


    ///



    return (
        <>
            <div className="flex gap-4">
                {encuestasobligatorias.map((item: any,index:number) => (
                    <div key={index} className={`w-full max-w-md bg-[#131939] border ${item.Respondida > 0 ? 'border-green-400' : 'border-blue-400'} rounded-xl shadow-md hover:shadow-lg transition-all`}   >
                        <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${item.Respondida > 0 ? 'text-green-400' : 'text-blue-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded">{item.Respondida > 0 ? (<><span className="text-green-400">Encuesta Respondida</span></>) : (<><span className="text-blue-400">Encuesta Pendiente</span></>)}</span>
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">{item.Encuesta}</h2>
                            <p className="text-gray-400 text-sm mb-4">{item.Descripcion}</p>
                            <div className="space-y-2 text-sm text-gray-300 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className={`h-1.5 w-1.5 rounded-full ${item.Respondida > 0 ? 'bg-green-400' : 'bg-blue-400'}`}></span>
                                    <span>{item.Preguntas} preguntas para responder</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`h-1.5 w-1.5 rounded-full ${item.Respondida > 0 ? 'bg-green-400' : 'bg-blue-400'}`}></span>
                                    <span>Tiempo estimado: {item.TiempoEstimado} minutos</span>
                                </div>
                            </div>
                            {item.Respondida > 0 ? (<><button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 group" >
                                Realizado
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button></>) : (<><button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 group" onClick={() => {
                                setTituloEncuesta(item.Encuesta);
                                setidEncuesta(item.IdEncuesta);
                                rendirEncuesta(item.IdEncuesta);
                            }}>
                                Comenzar Encuesta
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button></>)}

                        </div>
                    </div>


                ))}
            </div>

            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="2xl"
            >
                <ModalContent className="h-[80%] bg-[#131939]">
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h1 className="text-white !m-0 font-bold">{tituloEncuesta}</h1>
                            </ModalHeader>
                            <ModalBody className="overflow-auto flex flex-col gap-8">
                                {preguntasxencuesta.map((item: any, id: number) => (
                                    <div key={item.IdEncuestaPregunta} className="">
                                        <h1 className="text-base text-white  mb-4 !mt-0">
                                            {(id + 1) + ')' + capitalizarPrimeraLetraConCaracterEspecial(item.Pregunta)}
                                        </h1>
                                        {item.TipoEncuestaPregunta === "si/no" && (
                                            <div className="flex space-x-4">
                                                <button
                                                    className={`px-4 py-2 rounded-[0.55rem] border ${respuestas[item.IdEncuestaPregunta] === true
                                                        ? "bg-[#006FEE] text-white"
                                                        : "bg-gray-100 text-gray-800"
                                                        } hover:bg-blue-500 hover:text-white transition-colors`}
                                                    onClick={() =>
                                                        handleRespuestaChange(item.IdEncuestaPregunta, true)
                                                    }
                                                >
                                                    Sí
                                                </button>
                                                <button
                                                    className={`px-4 py-2 rounded-[0.55rem] border ${respuestas[item.IdEncuestaPregunta] === false
                                                        ? "bg-[#006FEE] text-white"
                                                        : "bg-gray-100 text-gray-800"
                                                        } hover:bg-blue-500 hover:text-white transition-colors`}
                                                    onClick={() =>
                                                        handleRespuestaChange(item.IdEncuestaPregunta, false)
                                                    }
                                                >
                                                    No
                                                </button>
                                            </div>
                                        )}
                                        {item.TipoEncuestaPregunta === "1 al 10" && (
                                            <div className="flex justify-between">
                                                {[...Array(10)].map((_, i) => (
                                                    <button
                                                        key={i + 1}
                                                        className={`w-10 h-10 rounded-[0.55rem] border ${respuestas[item.IdEncuestaPregunta] === i + 1
                                                            ? "bg-[#006FEE] text-white"
                                                            : "bg-gray-100 text-gray-800"
                                                            } hover:bg-blue-500 hover:text-white transition-colors`}
                                                        onClick={() =>
                                                            handleRespuestaChange(
                                                                item.IdEncuestaPregunta,
                                                                i + 1
                                                            )
                                                        }
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {item.TipoEncuestaPregunta === "1 al 5" && (
                                            <div className="flex space-x-4">
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <button
                                                        key={value}
                                                        className={`w-16 h-16 rounded-[0.55rem] border text-2xl ${respuestas[item.IdEncuestaPregunta] === value
                                                            ? "bg-[#006FEE] text-white"
                                                            : "bg-gray-100 text-gray-800"
                                                            } hover:bg-blue-500 hover:text-white transition-colors`}
                                                        onClick={() =>
                                                            handleRespuestaChange(item.IdEncuestaPregunta, value)
                                                        }
                                                    >
                                                        {value === 1 && "😞"}
                                                        {value === 2 && "🙁"}
                                                        {value === 3 && "😐"}
                                                        {value === 4 && "🙂"}
                                                        {value === 5 && "😊"}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {item.TipoEncuestaPregunta === "texto" && (
                                            <textarea
                                                className="w-full h-32 p-2 border rounded-[0.55rem] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Escribe tu respuesta aquí..."
                                                value={respuestas[item.IdEncuestaPregunta] || ""}
                                                onChange={(e) =>
                                                    handleRespuestaChange(
                                                        item.IdEncuestaPregunta,
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={enviarEncuesta}
                                    className="bg-[#006FEE] text-white px-4 py-2 rounded m-auto w-[10rem] mb-3"
                                >
                                    Enviar
                                </button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
