import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaCirclePlay, FaClipboardList } from 'react-icons/fa6'
import { TbPlaystationCircle } from 'react-icons/tb'
import ModalEva from '../bruno/ModalEva'


import { PiTimerBold } from 'react-icons/pi'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import useLocalStorageObserver from '@/components/localStorage/Hook';


const Evaluac = () => {

  const quizData = [
    {
      label: "Pregunta 1:",
      question: "¿Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda culpa pariatur enim, numquam sunt modi quos facilis repellat distinctio. Obcaecati adipisci in accusantium alias dolorum, rem sit eum voluptatem cupiditate.?",
      answers: ["Marte", "Venus", "Mercurio", "Tierra", "Júpiter"],
    },
    {
      label: "Pregunta 2:",
      question: "¿Quién pintó la Mona Lisa?",
      answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet", "Rembrandt"],
    },
    // {
    //     label: "Pregunta 12:",
    //     question: "¿Quién pintó la Mona Lisa?",
    //     answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet", "Rembrandt"],
    // },
    // {
    //     label: "Pregunta 13:",
    //     question: "¿Cuál es la capital de Japón?",
    //     answers: ["Pekín", "Seúl", "Tokio", "Bangkok", "Shanghai"],
    // },
    // {
    //     label: "Pregunta 14:",
    //     question: "¿En qué año llegó el hombre a la Luna?",
    //     answers: ["1969", "1975", "1957", "1981", "1972"],
    // },
    // {
    //     label: "Pregunta 15:",
    //     question: "¿Cuál es el animal terrestre más grande?",
    //     answers: ["Elefante africano", "Jirafa", "Rinoceronte", "León", "Hipopótamo"],
    // },
    // {
    //     label: "Pregunta 16:",
    //     question: "¿Qué gas es necesario para la respiración humana?",
    //     answers: ["Dióxido de carbono", "Nitrógeno", "Oxígeno", "Hidrógeno", "Metano"],
    // },
    {
      label: "Pregunta 17:",
      question: "¿Qué instrumento musical tiene teclas blancas y negras?",
      answers: ["Violín", "Piano", "Flauta", "Guitarra", "Batería"],
    },
    {
      label: "Pregunta 18:",
      question: "¿Cuál es el país más grande del mundo por área?",
      answers: ["China", "Estados Unidos", "Rusia", "Canadá", "India"],
    },
    {
      label: "Pregunta 19:",
      question: "¿Qué elemento químico tiene el símbolo O?",
      answers: ["Oro", "Oxígeno", "Osmio", "Óxido", "Plata"],
    },
    {
      label: "Pregunta 20:",
      question: "¿Cuántos lados tiene un triángulo?",
      answers: ["Cuatro", "Cinco", "Dos", "Tres", "Seis"],
    }
  ];


  const Curs = [

    {
      examen: "examen de VALORIZACIÓN",
      preguntas: "Curso"
    },
    {
      examen: "examen de maestro de obra",
      preguntas: "10 preguntas"
    },
    {
      examen: "examen de maestro de obra",
      preguntas: "10 preguntas"
    },
    {
      examen: "examen de maestro de obra",
      preguntas: "10 preguntas"
    },
    {
      examen: "examen de maestro de obra",
      preguntas: "10 preguntas"
    },


  ]



  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
  };

  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { isOpen: isopen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  // const { isOpen: isopen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null));
  const [cursoBloqueado, setCursoBloqueado] = useState(true);
  const [isSideSheetOpen, setSideSheetOpen] = useState(false);
 
  const handleAnswerSelect = (questionIndex: any, answerIndex: any) => {
    // Aquí manejas el estado de las respuestas seleccionadas
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex; // Almacena la respuesta seleccionada para la pregunta correspondiente
      return newAnswers;
    });
  };







  const [results] = useLocalStorageObserver('quizResults'); // Eliminamos setResults ya que no lo usamos aquí

    const totalQuestions = results.length;
    const correctAnswers = results.filter((result: { isCorrect: any }) => result.isCorrect).length;

  
  return (

    <div className=' flex flex-col gap-12 mx-auto w-[90%] py-10'>
      {/* <div>
      <h1 className='text-3xl font-semibold'>Hola <span className='text-4xl font-semibold text-[#3085F7] '>Bruno</span></h1>
      <h1></h1>
    </div> */}
      {/* <div>
        <h1 className='text-4xl font-semibold text-[#3085F7]'>Mis Examenes</h1>
        <h1></h1>
      </div>


      <div className='  grid grid-cols-4 gap-10  '>
        {Curs.map((item, index) => (

          <button key={index}
            onClick={() => setSideSheetOpen(true)}
            className="size-full"
          >

            <div className='w-full flex flex-col gap-4 items-center border-1 shadow-md rounded-2xl p-4'>
              <Image

                src="/Multimedia/Imagen/Cursos/ejem3.png"
                alt='Cursos'
                width={300}
                height={150}
                className='h-full w-full'
              />
              <h1 className='text-'>{item.examen}</h1>
              <h1>{item.preguntas}</h1>
              <div className=' flex justify-between  gap-4 items-center'>


              </div>
            </div>
          </button>

        ))}
        <SideSheet isOpen={isSideSheetOpen} onClose={() => setSideSheetOpen(false)}>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col px-2'>
              <h1 className='text-2xl font-bold text-[#006CEC]'>Examen de medio curso</h1>
            </div>
            <div className='flex flex-col gap-8 px-6'>

              <h1 className='text-lg font-semibold'>Detalles de la evaluación</h1>
              <div className='flex gap-4 items-center'>
                <PiTimerBold className='w-10 h-10 text-[#006CEC] ' />
                <div className='flex flex-col'>

                  <h1 className='font-bold'>Limite de tiempo</h1>
                  <h1>50 Minutos</h1>
                </div>
              </div>
              <div className='flex  gap-4 items-center'>
                <FaClipboardList className='w-10 h-10 text-[#006CEC] ' />
                <div className='flex flex-col'>
                  <h1 className='font-bold'>Metodo de calificacion</h1>
                  <h1>Calificacion mas alta</h1>
                </div>

              </div>

            </div>

           
            <div className=' w-full'> */}

              <ModalEva cont="Iniciar Examen" />
            {/* </div>
          </div>
        </SideSheet>
      </div> */}

    </div>



  )
}

export default Evaluac
