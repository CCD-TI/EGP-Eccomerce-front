import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowLeftLong, FaArrowRightLong, FaClipboardList } from "react-icons/fa6";
import { LuTimer } from "react-icons/lu";
import ProgressEva from "./ProgressEva";
import { PiExamBold, PiTimerBold } from "react-icons/pi";
import PieChart from "@/components/ui/bruno/PieChart";
import Image from "next/image";
import { openDB } from 'idb'; // Importar la librería idb
import React from "react";
import useLocalStorageObserver from '@/components/localStorage/Hook';
import { useSession } from "next-auth/react";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useCourseStore } from "@/context/cursodetalle";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { AiOutlineBars } from "react-icons/ai";

// Interfaces
interface content {
    cont: ReactNode;
}

interface Result {
    question: string;
    selectedAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
}

interface Attempt {
    id?: number; // ID opcional para la base de datos
    date: string;
    selectedAnswers: number[];
    results: Result[];
}

// Configuración de IndexedDB
const dbName = 'quizDB';
const storeName = 'attempts';

async function initDB() {
    return await openDB(dbName, 1, {
        upgrade(db) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        },
    });
}

async function saveAttemptToDB(attempt: Attempt) {
    const db = await initDB();
    await db.add(storeName, attempt);
}

async function getAttemptsFromDB() {
    const db = await initDB();
    return await db.getAll(storeName);
}

async function clearAttemptsFromDB() {
    const db = await initDB();
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).clear();
    await tx.done;


}

export default function App({ cont }: content) {

    const [dataevaluaciones, setdataevaluaciones] = useState([]);
    const [datapreguntas, setdatapreguntas] = useState<any[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isModal2Open, onOpen: onModal2Open, onOpenChange: onModal2OpenChange } = useDisclosure();
    const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onOpenChange: onConfirmationOpenChange } = useDisclosure();
    const { isOpen: isConfirmationOpen2, onOpen: onConfirmationOpen2, onOpenChange: onConfirmationOpenChange2 } = useDisclosure();
    const { isOpen: isConfirmationOpen3, onOpen: onConfirmationOpen3, onOpenChange: onConfirmationOpenChange3 } = useDisclosure();
    const { isOpen: isOpenAttemptModal, onOpen: onOpenAttemptModal, onOpenChange: onOpenChangeAttemptModal } = useDisclosure();
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [highestScore, setHighestScore] = useState<number | null>(null);
    const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null);
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const attemptLimit = 3;
    const [modalOpen, setModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(100);
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const { data: session } = useSession();
    useEffect(() => {
        if (datapreguntas.length > 0 && selectedAnswers.length === 0) {
            setSelectedAnswers(Array(datapreguntas.length).fill(null));  // Inicializa con `null` para cada pregunta
        }
    }, [datapreguntas]);
    useEffect(() => {
        if (session?.user) {
            const loadData = async () => {
                try {
                    const responseTipoDocumento = await api.post("/inicio/listarpreguntasxusuario", {
                        fproducto_id: cart.IdProducto
                    });
                    setdatapreguntas(responseTipoDocumento.data.data[0])
                    console.log("pordi" + JSON.stringify(responseTipoDocumento.data.data[0]))
                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }
    }, [session?.user.Usuario])

    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(datapreguntas.length).fill(null));



    useEffect(() => {
        const loadAttempts = async () => {
            const allAttempts = await getAttemptsFromDB();
            setAttempts(allAttempts);
            calculateHighestScore(allAttempts);
        };
        loadAttempts();
    }, []);
    const calculateHighestScore = (attempts: Attempt[]) => {
        if (attempts.length === 0) return;
        const scores = attempts.map(attempt => attempt.results.filter(result => result.isCorrect).length);
        const maxScore = Math.max(...scores);
        setHighestScore(maxScore);
    };
    useEffect(() => {
        const loadAttempts = async () => {
            const allAttempts = await getAttemptsFromDB();
            console.log("Intentos guardados:", allAttempts); // Verifica que se carguen los intentos
            setAttempts(allAttempts);
        };
        loadAttempts();
    }, []);
    useEffect(() => {
        const savedModalOpen = localStorage.getItem('modalOpen');
        const savedAnswers = localStorage.getItem('selectedAnswers');
        const savedTime = localStorage.getItem('timeLeft');
        const savedCurrentQuestion = localStorage.getItem('currentQuestion');
        const savedProgress = localStorage.getItem('progress');



        if (savedModalOpen) {
            setModalOpen(JSON.parse(savedModalOpen));
            if (JSON.parse(savedModalOpen)) {
                onOpen(); // Abre el modal si el estado guardado es `true`
            }
        }

        if (savedAnswers) {
            console.log("JEX")
            setSelectedAnswers(JSON.parse(savedAnswers));
            console.log("Rea1" + selectedAnswers)

        } else {
            console.log("Yeremy")
            setSelectedAnswers(Array(datapreguntas.length).fill(null));
            console.log("Rea" + selectedAnswers)
            console.log("Rea" + JSON.stringify(selectedAnswers))

        }

        if (savedTime) {
            setTimeLeft(JSON.parse(savedTime));
        }

        if (savedCurrentQuestion) {
            setCurrentQuestion(JSON.parse(savedCurrentQuestion));
        }
        if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
        }
    }, []);

    const handleOpen = () => {
        setModalOpen(true);
        onOpen();
        // Guarda el estado del modal en `localStorage`
        localStorage.setItem('modalOpen', JSON.stringify(true));
    };
    const handleClose = () => {
        setModalOpen(false);
        onOpenChange();
        // Guarda el estado del modal en `localStorage`
        localStorage.setItem('modalOpen', JSON.stringify(false));
    };
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');

        return `${dia}/${mes}/${anio} ${horas}:${minutos}`; // Formato: DD/MM/AAAA HH:mm
    };
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    const handleTimeChange = (newTime: number) => {
        setTimeLeft(newTime);
        // Guardar el tiempo restante en localStorage inmediatamente después de cambiarlo
        localStorage.setItem('timeLeft', JSON.stringify(newTime));
    };
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isOpen) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        onConfirmationOpen3(); // Acción cuando el tiempo se agota
                        return 0;
                    }
                    const newTime = prev - 1;
                    handleTimeChange(newTime); // Usa la función centralizada para actualizar y guardar
                    return newTime;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isOpen]);
    const handleNext = () => {
        if (currentQuestion < datapreguntas.length - 1) {
            const nextQuestion = currentQuestion + 1;
            setCurrentQuestion(nextQuestion);
            // Guarda la pregunta actual en `localStorage`
            localStorage.setItem('currentQuestion', JSON.stringify(nextQuestion));
        }
    };
    const handlePrev = () => {
        if (currentQuestion > 0) {
            const prevQuestion = currentQuestion - 1;
            setCurrentQuestion(prevQuestion);
            // Guarda la pregunta actual en `localStorage`
            localStorage.setItem('currentQuestion', JSON.stringify(prevQuestion));
        }
    };
    const handleAnswerSelect = (answerIndex: number) => {

        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newAnswers);
        console.log('MONOD' + JSON.stringify(newAnswers))


        // Guardar las respuestas seleccionadas en localStorage inmediatamente después de cambiarlas
        localStorage.setItem('selectedAnswers', JSON.stringify(newAnswers));

        // Verificar si la respuesta actual no había sido seleccionada previamente
        if (selectedAnswers[currentQuestion] === null) {
            setProgress((prev) => {
                const nextProgress = prev + (100 / datapreguntas.length);
                const finalProgress = Math.min(nextProgress, 100);

                // Guardar el progreso en localStorage
                localStorage.setItem('progress', JSON.stringify(finalProgress));

                return finalProgress;
            });
        }
    };
    const handleQuestionSelect = (questionIndex: number) => {
        setCurrentQuestion(questionIndex);
    };
    const evaluateAnswers = (): Result[] => {
        return datapreguntas.map((item: any, index) => {
            return {
                question: item.Pregunta,
                selectedAnswer: selectedAnswers[index],
                correctAnswer: item.RespuestaCorrecta,
                isCorrect: selectedAnswers[index] === item.RespuestaCorrecta,
            };
        });
    };
    const areAllQuestionsAnswered = selectedAnswers.every(answer => answer !== null);
    const saveAttempt = async (selectedAnswers: number[]) => {
        if (attempts.length >= attemptLimit) {
            alert("Has alcanzado el límite de intentos");
            return;
        }

        const newAttempt: Attempt = {
            date: obtenerFechaActual(),
            selectedAnswers: selectedAnswers,
            results: evaluateAnswers(),
        };

        await saveAttemptToDB(newAttempt);
        const updatedAttempts = [...attempts, newAttempt];
        setAttempts(updatedAttempts);
        calculateHighestScore(updatedAttempts);
    };
    useEffect(() => {
        if (isOpen) {
            setStartTime(new Date()); // Establece la hora de inicio cuando se abre el modal
        }
    }, [isOpen]);
    const resetExam = () => {
        setSelectedAnswers(Array(datapreguntas.length).fill(null)); // Reinicia las respuestas seleccionadas
        setCurrentQuestion(0); // Vuelve a la primera pregunta
        setProgress(0); // Restablece el progreso
        setTimeLeft(0); // Restablece el tiempo (ajusta según tu lógica)
    };
    const handleSubmit = async () => {

        setEndTime(new Date()); // Establece la hora de finalización cuando se envía el examen
        const results = evaluateAnswers(); // Evalúa las respuestas seleccionadas
        const totalScore = results.filter(result => result.isCorrect).length; // Calcula la puntuación total
        setScore(totalScore); // Actualiza el estado de la puntuación
        saveAttempt(selectedAnswers); // Guarda el intento

        const respuestas = selectedAnswers.map((marcado, index) => ({
            pregunta_id: datapreguntas[index].IdPregunta,  // ID de la pregunta en ese índice
            marcado, // Respuesta seleccionada
            intento: 1, // Ajusta según sea necesario
            evaluacion_id:1 // Ajusta según el ID de la evaluación actual
        })).filter(respuesta => respuesta.marcado !== null);
        console.log(JSON.stringify(respuestas))
        
        const datasa = await api.post("/inicio/GuardarDatosExamen", {
            frespuestas : respuestas,
          
        });

        

    };
    const handleAttemptClick = (attempt: Attempt) => {
        setSelectedAttempt(attempt);
        onOpenAttemptModal();
    };
    const cerrarmodal = () => {
        onOpenChange();

        onConfirmationOpenChange3();
        onModal2Open();
        handleSubmit();
    };
    const proceedToExamModal = () => {
        onConfirmationOpenChange();
        handleOpen();
    };
    const openConfirmationModal2 = () => {
        onConfirmationOpen2();

    };
    const proceedToExamModal2 = () => {
        onConfirmationOpenChange2();

        handleSubmit();
        handleClose();
        onModal2Open();

    };
    const resetAttempts = async () => {
        await clearAttemptsFromDB(); // Limpiar la base de datos
        setAttempts([]); // Actualiza el estado de attempts
    };
    const getNoteColor = () => {
        if (highestScore === null) return "bg-gray-100 text-black";

        const percentage = (highestScore / datapreguntas.length) * 100;

        if (percentage >= 80) {
            return "bg-green-100 text-green-600"; // Excelente
        } else if (percentage >= 50) {
            return "bg-yellow-100 text-yellow-600"; // Intermedio
        } else {
            return "bg-red-100 text-red-600"; // Bajo
        }
    };
    const getNoteColortext = () => {
        if (highestScore === null) return " text-gray-100";

        const percentage = (highestScore / datapreguntas.length) * 100;

        if (percentage >= 80) {
            return " text-green-600"; // Excelente
        } else if (percentage >= 50) {
            return " text-yellow-600"; // Intermedio
        } else {
            return " text-red-600"; // Bajo
        }
    };
    const getFeedbackMessage = () => {
        if (score === null) return "Realiza el examen para ver tu resultado.";

        const percentage = (score / datapreguntas.length) * 100;

        if (percentage >= 80) {
            return "¡Excelente trabajo! Has demostrado un gran dominio del tema.";
        } else if (percentage >= 50) {
            return "¡Buen esfuerzo! Puedes mejorar con un poco más de práctica.";
        } else {
            return "No te desanimes, sigue practicando y mejorarás.";
        }
    };
    const getResultImage = () => {
        if (score === null) return "/Multimedia/Imagen/images/default.png"; // Imagen por defecto si no hay puntuación

        const percentage = (score / datapreguntas.length) * 100; // Calcula el porcentaje basado en la puntuación actual

        if (percentage >= 80) {
            return "/Multimedia/Imagen/images/ccdbuenanota.png"; // Imagen para buen resultado
        } else if (percentage >= 50) {
            return "/Multimedia/Imagen/images/ccdquestion.png"; // Imagen para resultado intermedio
        } else {
            return "/Multimedia/Imagen/images/ccdmalanota.png"; // Imagen para resultado bajo
        }
    };
    const [cursoBloqueado, setCursoBloqueado] = useState(true);
    const [isSideSheetOpen, setSideSheetOpen] = useState(false);
    const getTimeElapsed = () => {
        if (startTime && endTime) {
            const diffInSeconds = Math.max(0, Math.floor((endTime.getTime() - startTime.getTime()) / 1000));
            const hours = Math.floor(diffInSeconds / 3600);
            const minutes = Math.floor((diffInSeconds % 3600) / 60);
            const seconds = diffInSeconds % 60;

            if (hours > 0) {
                return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} h`;
            } else if (minutes > 0) {
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min`;
            } else {
                return `${seconds} s`; // Muestra solo segundos si es menor a un minuto
            }
        }
        return "Tiempo no disponible";
    };
    const cart = useCourseStore();
    const correctas = selectedAnswers.filter((answer, index) => answer !== null && datapreguntas[index].RespuestaCorrecta === answer).length;
    const incorrectas = datapreguntas.length - correctas;
    interface datapreguntas {
        IdPregunta: number,
        Pregunta: string
    }
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const [datamodal1, setdatamodal1] = useState([{}]);
    useEffect(() => {
        if (session?.user) {
            const loadData = async () => {
                try {
                    const responseTipoDocumento = await api.post("/inicio/listarevaluacionesxusuario", {
                        fusuario_id: session?.user.uid,
                        fproducto_id: cart.IdProducto

                    });
                    setdataevaluaciones(responseTipoDocumento.data.data[0])

                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            };
            loadData();
        }

    }, [session?.user.Usuario])



    return (
        <>
            {/* BOTÓN DE INICIO DE EXAMEN CON LÍMITE DE 3 INTENTOS */}
            <div className="flex flex-col-reverse gap-10">
                <div className=' flex flex-col gap-12 mx-auto w-full '>
                    <div className=' w-full mx-auto  grid grid-cols-3   max-lg:grid-cols-1 gap-10  '>
                        {dataevaluaciones.map((item: any, index) => (
                            <button key={index}
                                onClick={() => {
                                    setSideSheetOpen(true);
                                    setdatamodal1([{ 'duracion': item.Duracion,"ideva":item.IdEvaluacion }])
                                }}
                                className="w-full" // Cambia a w-full para mantener la consistencia dentro del grid
                            >
                                <div className='w-[90%] h-[30rem] mx-auto flex flex-col gap-4 items-center border-1 shadow-md rounded-2xl p-4 relative'>
                                    <Image
                                        src="/Multimedia/Imagen/Cursos/ejem3.png"
                                        alt='Cursos'
                                        width={300}
                                        height={300}
                                        className='h-[15rem] w-full object-cover rounded-lg'
                                    />
                                    <h1 className='text-2xl max-xl:text-xl font-extrabold text-blue-700'>{item.Evaluacion}</h1>
                                    {/* <h1 className="text-blue-1 text-lg max-xl:text-base">{item.preguntas}</h1> */}
                                    <div className={`w-[7rem] p-2 shadow-lg text-center rounded-se-lg rounded-es-lg text-xl absolute top-4 right-4 ${getNoteColor()}`}>
                                        <p className="text-base">
                                            {highestScore !== null ? `${highestScore} / ${datapreguntas.length}` : "/ 20"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full px-4">
                                        <div className="flex gap-2 items-center"><FaRegCalendarAlt className="text-blue-1 text-3xl" />
                                            <h1 className="flex flex-col items-start"><h1 className="text-blue-1 text-base">Fecha de limite:</h1> {new Date(item.FechaLimite).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })}</h1></div>
                                        <div className="flex gap-2 items-center"><IoMdTime className="text-blue-1 text-3xl" /><h1 className="flex gap-1"><h1 className="text-blue-1 text-base">Tiempo estimado:</h1> {item.Duracion} Minutos</h1></div>
                                        <div className="flex gap-2 items-center"><AiOutlineBars className="text-blue-1 text-3xl" /><h1 className="flex gap-1"><h1 className="text-blue-1 text-base">Intentos del examen:</h1> {!item.Intento ? 0 : item.Intento}/3</h1></div>
                                    </div>
                                </div>
                            </button>
                        ))}

                        
                    </div>
                </div>




            </div>
            {/* Modal de Confirmación */}
            <Modal

                isOpen={isConfirmationOpen}
                onOpenChange={onConfirmationOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                placement="center"
                size="lg"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-3xl font-bold text-center gap-1">Confirmación</ModalHeader>
                            <ModalBody >
                                <div className="!flex  gap-6 items-center justify-center">

                                    <div className="flex flex-col gap-3">

                                        <p className="font-bold text-xl text-[#006CEC]">¿Estás seguro de comenzar el examen?</p>
                                        <p className="text-lg">recuerda que al iniciar tendras una hora para acabar el examen</p>
                                    </div>
                                    <Image
                                        src="/Multimedia/Imagen/images/ccdquestion.png"
                                        alt="imgquestion"
                                        width={150}
                                        height={80}

                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-around">
                                <Button className="bg-red-500 text-white" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button className="bg-[#006CEC] text-white" onPress={proceedToExamModal}>
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal

                isOpen={isConfirmationOpen3}
                onOpenChange={onConfirmationOpenChange3}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                placement="center"
                size="lg"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-3xl font-bold text-center gap-1">Confirmación</ModalHeader>
                            <ModalBody >
                                <div className="!flex  gap-6 items-center justify-center">

                                    <div className="flex flex-col gap-3">

                                        <p className="font-bold text-xl text-[#006CEC]">El Examen acabo por el limite de tiempo</p>
                                        <p className="text-lg">recuerda tener presente el tiempo del examen </p>
                                    </div>
                                    <Image
                                        src="/Multimedia/Imagen/images/ccdquestion.png"
                                        alt="imgquestion"
                                        width={150}
                                        height={80}

                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-around">
                                <Button className="bg-red-500 text-white" onPress={cerrarmodal}>
                                    Cancelar
                                </Button>
                                {/* <Button className="bg-[#006CEC] text-white" onPress={onOpenChange}>
                                    Confirmar
                                </Button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Modal del Examen */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                size="full"
                classNames={{
                    body: "",
                    closeButton: "hidden",
                }}
            >

                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
                            <ModalBody className="!p-0">
                                <section className='flex size-full flex-col justify-center mt-10 max-sm:mt-2 gap-8 text-black px-10  max-sm:px-2 max-sm:py-6 overflow-auto max-h-screen'>
                                    <div className="w-[80%] max-sm:h-screen max-xl:w-full mx-auto flex  max-sm:grid-cols-1 justify-center gap-6 max-sm:my-2">

                                        <div className="w-[80%] max-xl:w-full flex max-sm:flex-col gap-8">
                                            <div className="w-full">
                                                <div className=" w-full h-[40rem] mx-auto p-6 bg-white border-2 shadow-lg rounded-xl flex flex-col gap-6">
                                                    <ProgressEva value={progress} /> {/* Asegúrate de que el valor de progreso se pase aquí */}
                                                    <div className="h-full flex gap-4 items-center justify-between">
                                                        <button
                                                            onClick={handlePrev}
                                                            disabled={currentQuestion === 0}
                                                            className="bg-[#007FED] text-white hover:bg-[#007eedc0] font-semibold p-2 rounded-lg flex gap-3 items-center"
                                                        >
                                                            <FaArrowLeftLong />
                                                            <h1 className="text-xl  max-sm:text-xs max-lg:text-base">Regresar</h1>
                                                        </button>
                                                        <h2 className="text-xl max-sm:text-xs  max-lg:text-base font-bold">
                                                            Pregunta {currentQuestion + 1}
                                                        </h2>
                                                        <button
                                                            onClick={handleNext}
                                                            disabled={currentQuestion === datapreguntas.length - 1}
                                                            className="bg-[#007FED] text-white hover:bg-[#007eedab] font-semibold p-2 rounded-lg flex flex-row-reverse gap-3 items-center"
                                                        >
                                                            <FaArrowRightLong />
                                                            <h1 className="text-xl max-sm:text-xs max-lg:text-base">Avanzar</h1>
                                                        </button>
                                                    </div>
                                                    {datapreguntas && (<>

                                                        <div>
                                                            <p>{datapreguntas[currentQuestion].Pregunta}</p>
                                                        </div>

                                                        <ul className="mb-4">
                                                            {datapreguntas[currentQuestion].respuestas.map((item: any, index: number) => (
                                                                <li key={index} className="my-2">

                                                                    <button
                                                                        onClick={() => handleAnswerSelect(index + 1)}
                                                                        className={`p-2 rounded-lg w-full text-left ${selectedAnswers[currentQuestion] === index + 1 ? 'bg-[#007FED] text-white' : 'bg-gray-200'}`}
                                                                    >
                                                                        {String.fromCharCode(65 + index)}. {item.Respuesta}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>)}

                                                    <div className='w-full flex justify-end'></div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-6 max-sm:gap-4 max-sm:w-full w-[40%] max-sm:py-6">
                                                <div className="">
                                                    <h1 className='text-2xl text-blue-500 font-semibold'>Examen:</h1>
                                                    <h1 className='text-2xl'>Estabilidad de taludes</h1>
                                                </div>


                                                <div className="">
                                                    <div className='flex bg-[#132B4D] justify-between gap-4 p-4 max-sm:p-2 border-2 shadow-lg rounded-xl'>
                                                        <h1 className='text-2xl text-[#00EDE0] font-semibold'>Tiempo:</h1>
                                                        <div className='flex gap-2 text-white'>
                                                            <LuTimer className='text-3xl' />
                                                            <h1 className='text-2xl text-white'>{formatTime(timeLeft)}</h1>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="">
                                                    <div className="grid grid-cols-5 gap-3">
                                                        {datapreguntas.map((_, questionIndex) => (
                                                            <button
                                                                key={questionIndex}
                                                                onClick={() => handleQuestionSelect(questionIndex)}
                                                                className={`p-1 border-2 rounded-lg ${questionIndex === currentQuestion ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                                            >
                                                                {questionIndex + 1}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className=" h-[15%]">
                                                    <button onClick={openConfirmationModal2} disabled={!areAllQuestionsAnswered} className={`p-1 px-4 h-full rounded-lg w-full text-white ${areAllQuestionsAnswered ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}>
                                                        <h1 className="text-2xl">Enviar Respuestas</h1>
                                                    </button>
                                                    {/* modal de confirmación */}
                                                    <Modal
                                                        isOpen={isConfirmationOpen2}
                                                        onOpenChange={onConfirmationOpenChange2}
                                                        isDismissable={false}
                                                        placement="center"
                                                        isKeyboardDismissDisabled={true}
                                                        size="lg"
                                                    >
                                                        <ModalContent>
                                                            {(onClose) => (
                                                                <>
                                                                    <ModalHeader className="flex flex-col text-5xl font-bold text-center gap-1">Confirmación</ModalHeader>
                                                                    <ModalBody>
                                                                        <div className="!flex flex-col gap-6 items-center justify-center">
                                                                            <div className="flex flex-col gap-3">
                                                                                <p className="font-bold text-4xl text-center text-[#006CEC]">¿Estás seguro de enviar tus respuestas?</p>
                                                                            </div>
                                                                            <Image
                                                                                src="/Multimedia/Imagen/images/ccdquestion.png"
                                                                                alt="imgquestion"
                                                                                width={150}
                                                                                height={150}
                                                                            />
                                                                        </div>
                                                                    </ModalBody>
                                                                    <ModalFooter className="flex justify-around">
                                                                        <Button className="bg-red-500 text-white" onPress={onClose}>
                                                                            Cancelar
                                                                        </Button>
                                                                        <Button className="bg-[#006CEC] text-white" onPress={proceedToExamModal2}>
                                                                            Confirmar
                                                                        </Button>
                                                                    </ModalFooter>
                                                                </>
                                                            )}
                                                        </ModalContent>
                                                    </Modal>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>
                            </ModalBody>
                            {/* <ModalFooter>
                                <Button color="warning" variant="light" onPress={handleClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* modal de calificacion */}
            <Modal
                size="5xl"
                placement="center"
                backdrop="opaque"
                isOpen={isModal2Open}
                onOpenChange={onModal2OpenChange}
                isKeyboardDismissDisabled={true}
                classNames={{
                    body: "py-6",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hidden",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center justify-center  text-4xl  max-sm:text-xl gap-1">
                                <h1 className="text-center">Estos son tus resultados</h1>
                            </ModalHeader>
                            <ModalBody>
                                <div className="w-full flex justify-start">
                                    <Button className="bg-transparent" variant="solid" onPress={onClose}>
                                        <FaArrowLeft className="w-14 h-14 text-blue-1" />
                                    </Button>
                                </div>
                                <div className="flex justify-center">
                                    <div className="flex gap-14">
                                        <div className="flex flex-col items-center gap-8">
                                            <h1 className={`font-extrabold text-3xl max-sm:text-xl text-center ${getNoteColortext()}`}>{getFeedbackMessage()}</h1>
                                            <h1 className={`text-5xl font-extrabold max-sm:text-3xl p-4 rounded ${getNoteColortext()}`}>
                                                {score} / {datapreguntas.length}
                                            </h1>
                                            <div className="flex flex-row-reverse gap-4 px-6 items-center justify-center">
                                                <div className="flex flex-col gap-3">
                                                    <div>
                                                        <h1> Respondiste el {((score / datapreguntas.length) * 100).toFixed(2)}% <br /> correctamente </h1>
                                                    </div>
                                                    <div>
                                                        <h1> Respondiste el {(100 - ((score / datapreguntas.length) * 100)).toFixed(2)}% <br /> incorrectamente </h1>
                                                    </div>
                                                </div>
                                                <div>
                                                    <PieChart
                                                        correct={score}
                                                        incorrect={datapreguntas.length - score}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-5">
                                                <Image
                                                    src="/Multimedia/Imagen/images/iconeva.png"
                                                    alt="icon"
                                                    width={100}
                                                    height={80}

                                                />
                                                <div className="flex flex-col gap-3">
                                                    <h1> Cantidad de respuestas correctas: {score}</h1>
                                                    <h1> Cantidad de respuestas incorrectas: {datapreguntas.length - score}</h1>
                                                    <h1> Tiempo Transcurrido del examen: {getTimeElapsed()}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block max-sm:hidden">
                                            <Image
                                                src={getResultImage()}
                                                alt="Resultado de la evaluación"
                                                width={400}
                                                height={350}
                                                className="size-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
