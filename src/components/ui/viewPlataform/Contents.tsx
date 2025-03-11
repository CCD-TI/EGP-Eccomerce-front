import React, { useEffect, useState } from 'react';
import { Button, Link, Textarea } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { IoDocumentAttach, IoDocumentAttachOutline, IoSend } from 'react-icons/io5';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { CiBoxList } from 'react-icons/ci';
import axios from 'axios';
import { environment } from '@/environments/environment';
import { useCourseStore } from '@/context/cursodetalle';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';

const Contents = () => {
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });


  const [commentsData, setCommentsData] = useState([
    {
      id: 1,
      name: "Jesus Vega",
      time: "Hace 3 días",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      responses: [
        { id: 101, name: "Luna Segarra", time: "Hace 2 días", text: "¡Muy buen comentario, Jesus!" },
        { id: 102, name: "Carlos Pérez", time: "Hace 1 día", text: "Estoy de acuerdo contigo." }
      ],
    },
    {
      id: 2,
      name: "Maria Lopez",
      time: "Hace 1 día",
      text: "Ut enim ad minim veniam, quis nostrud exercitation.",
      responses: [
        { id: 201, name: "Ana Rodríguez", time: "Hace 5 horas", text: "Buena observación, Maria." },
        { id: 202, name: "Luis Gómez", time: "Hace 3 horas", text: "Tengo una duda sobre esto." }
      ],
    },
    {
      id: 3,
      name: "Pedro Sánchez",
      time: "Hace 4 días",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      responses: [
        { id: 301, name: "Carla Torres", time: "Hace 3 días", text: "Esto me ha sido muy útil, gracias Pedro." },
        { id: 302, name: "Esteban López", time: "Hace 2 días", text: "Excelente explicación." }
      ],
    },
  ]);
  // const [expandedComments, setExpandedComments] = useState<number[]>([]);
  // const [likedComments, setLikedComments] = useState<number[]>([]);
  // const [visibleComments, setVisibleComments] = useState(2);
  const [currentVideo, setCurrentVideo] = useState("/Multimedia/Video/ccdvideo.mp4");
  // const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [expandedAdditionalContent, setExpandedAdditionalContent] = useState<{ [key: number]: boolean }>({});
  const [isSideSheetOpen, setSideSheetOpen] = useState(false);
  const [datomodulo, setdatomodulo] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [visibleComments, setVisibleComments] = useState(2); // Número de comentarios visibles
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [newComment, setNewComment] = useState<string>("");

  const toggleLike = (commentId: number) => {
    setLikedComments((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    );
  };


  const toggleAdditionalContent = (itemId: number) => {
    setExpandedAdditionalContent((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };


  const toggleResponses = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    );
  };


  const handleReplyChange = (commentId: number, text: string) => {
    setReplyText((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleReplySubmit = (commentId: number) => {
    if (!replyText[commentId]?.trim()) return;

    setCommentsData((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            responses: [
              ...comment.responses,
              {
                id: Date.now(),
                name: "Usuario Actual",
                time: "Hace unos momentos",
                text: replyText[commentId],
              },
            ],
          };
        }
        return comment;
      })
    );



    setReplyText((prev) => ({ ...prev, [commentId]: '' }));
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const cerravideo = () => {
    setSideSheetOpen(false)

  }

  const handleNewCommentSubmit = () => {
    if (!newComment.trim()) return; // Evita agregar comentarios vacíos o solo espacios

    const newCommentData = {
      id: Date.now(), // Usa un ID único basado en la marca de tiempo
      name: "Usuario Actual", // Reemplaza con el nombre del usuario actual si tienes autenticación
      time: "Hace unos momentos",
      text: newComment,
      responses: [], // Un nuevo comentario no tiene respuestas inicialmente
    };

    setCommentsData((prevComments) => [newCommentData, ...prevComments]); // Agrega el nuevo comentario al inicio
    setNewComment(""); // Limpia el campo del `Textarea`
  };

  const items = [
    {
      id: 1,
      title: "Presentación del curso",
      videoSrc: "/Multimedia/Video/Cursos/TRAILER - DIPLOMA EXCEL.mp4",
      topics: ["Introducción y objetivos del curso.", "Introducción y objetivos del curso.", "Introducción y objetivos del curso."],
      additionalContent: [
        { id: "pdf1", label: "Diapositivas del módulo", fileType: "PDF", fileUrl: "/path/to/diapositivas_modulo1.pdf" },
        { id: "excel1", label: "Excel complementario", fileType: "Excel", fileUrl: "/path/to/excel_complementario.xlsx" },
        { id: "word1", label: "Word adjunto", fileType: "Word", fileUrl: "/path/to/word_adjunto.docx" },
        { id: "pdf2", label: "PDF de referencia", fileType: "PDF", fileUrl: "/path/to/pdf_referencia.pdf" },
      ],
    },
    {
      id: 2,
      title: "Normativa legal en SST D.S. 011-2019-TR",
      videoSrc: "/Multimedia/Video/CDDGroup.mp4",
      topics: ["Normas de seguridad en obras de construcción."],
      additionalContent: [
        { id: "pdf1", label: "Diapositivas del módulo", fileType: "PDF", fileUrl: "/path/to/diapositivas_modulo2.pdf" },
        { id: "excel2", label: "Excel complementario", fileType: "Excel", fileUrl: "/path/to/excel_complementario2.xlsx" },
      ],
    },

  ];

  // const commentsData = [
  //   {
  //     id: 1,
  //     name: "Jesus Vega",
  //     time: "Hace 3 días",
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     responses: [
  //       { id: 101, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  //       { id: 102, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: "Jesus Vega",
  //     time: "Hace 3 días",
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     responses: [
  //       { id: 101, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  //       { id: 102, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: "Jesus Vega",
  //     time: "Hace 3 días",
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     responses: [
  //       { id: 101, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  //       { id: 102, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: "Jesus Vega",
  //     time: "Hace 3 días",
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     responses: [
  //       { id: 101, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  //       { id: 102, name: "Luna Segarra", time: "Hace 4 días", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
  //     ]
  //   },
  // ];
  const [idprod, setidprod] = useState("");


  useEffect(() => {
    if (idprod) {
      const loadData = async () => {
        try {
          const listarTemario = await api.post("/inicio/listarTemario", {
            fproductoid: idprod
          });
          setdatomodulo(listarTemario.data.data[0]);
          console.log('13' + JSON.stringify(listarTemario.data.data[0]));
        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }
  }, [idprod]);

  const cart = useCourseStore();

  useEffect(() => {
    // Verifica si Clasificacion y IdModelo están definidos antes de hacer la petición
    if (cart.Clasificacion && cart.IdModelo) {
      const fetchData = async () => {
        try {
          const datasa = await api.post("/inicio/listarProductoId", {
            ftipoproducto: 2,
            fclasificacion: cart.Clasificacion,
            fmodelo: cart.IdModelo
          });
          if (datasa.data.data.length > 0) {
            setidprod(datasa.data.data[0][0].IdProducto);
          } else {
            console.error("No se encontró ningún producto.");
          }


        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [cart.Clasificacion, cart.IdModelo]);

  return (
    <section className="w-full h-full flex">
      <div className="w-full h-full flex max-lg:flex-col-reverse">
        <div className="w-[70%] max-lg:w-full flex flex-col items-center px-8">
          {/* <Link href="/videoConferencia" className=''>
            <Button variant='solid' className={`bg-red-600 text-white ${isVisible ? 'hidden' : ''}`} >
              <MdOutlineSlowMotionVideo className='text-3xl' />Sala de Videoconferencia
            </Button>
          </Link> */}
          <video src={currentVideo} className={`rounded-lg w-[95%] h-full mb-4 ${isVisible ? '' : 'hidden'}`} controls autoPlay loop muted></video>
          <section className="p-6 w-full text-[#333]">
            <Textarea
              label={<div className="text-lg">¿Tienes alguna duda sobre este módulo?</div>}
              placeholder="Escribe tu comentario..."
              variant="bordered"
              value={newComment} // Aquí se conecta al estado del nuevo comentario
              onChange={(e) => setNewComment(e.target.value)} // Actualiza el estado al escribir
              labelPlacement="outside"
              className="w-full mb-4"
              endContent={
                <button
                  className="text-blue-500 cursor-pointer"
                  onClick={handleNewCommentSubmit} // Enviar comentario
                >
                  <IoSend style={{ fontSize: "1.5rem", marginTop: "30px" }} />
                </button>
              }
            />
            <div>
              {commentsData.slice(0, visibleComments).map((comment, index) => (
                <div
                  key={comment.id}
                  className={`mb-6 border-b pb-4 transform transition-all duration-500 ${index >= visibleComments - 2 ? 'opacity-0 translate-y-4 animate-fadeIn' : ''}`}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold mr-3">👤</div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{comment.name}</p>
                      <p className="text-gray-500 text-sm">{comment.time}</p>
                    </div>
                    <div onClick={() => toggleLike(comment.id)} className="cursor-pointer">
                      {likedComments.includes(comment.id) ? (
                        <AiFillHeart className="text-blue-500" size={24} />
                      ) : (
                        <AiOutlineHeart className="text-gray-400" size={24} />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.text}</p>

                  {comment.responses && comment.responses.length > 0 && (
                    <p
                      onClick={() => toggleResponses(comment.id)}
                      className="text-blue-500 font-semibold cursor-pointer mb-2"
                    >
                      {expandedComments.includes(comment.id)
                        ? `${comment.responses.length} Respuestas ⬆`
                        : `${comment.responses.length} Respuestas ⬇`}
                    </p>
                  )}

                  {expandedComments.includes(comment.id) && (
                    <div className="ml-10 space-y-3 transition-all duration-500 animate-fadeIn">
                      {comment.responses.map((response) => (
                        <div key={response.id} className="flex items-center mb-3">
                          <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-3">👤</div>
                          <div>
                            <p className="font-semibold">
                              {response.name} - <span className="text-gray-500 text-sm">{response.time}</span>
                            </p>
                            <p className="text-gray-700">{response.text}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Escribe tu respuesta..."
                          value={replyText[comment.id] || ''}
                          onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                          className="border rounded px-2 py-1 flex-1"
                        />
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          className="text-blue-500 font-semibold cursor-pointer"
                        >
                          Responder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {visibleComments < commentsData.length && (
                <div className='flex items-center justify-center'>

                  <button
                    onClick={() => setVisibleComments(visibleComments + 2)}
                    className="text-blue-500 font-semibold cursor-pointer  transition duration-300 hover:text-blue-600"
                  >
                    Ver más comentarios ⬇
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="w-[30%] max-lg:w-full h-full  ">

          {/* Botón para abrir el SideSheet en pantallas pequeñas */}
          <button onClick={() => setSideSheetOpen(true)} className="w-[80%] mx-auto hidden max-lg:block mb-4 p-2 bg-blue-500 text-white rounded">
            <h1 className='flex items-center justify-center gap-3 text-2xl'><CiBoxList className='text-4xl' /> Abrir Contenidos</h1>
          </button>

          {/* SideSheet para pantallas pequeñas */}
        

          {/* Acordeón para pantallas grandes (sin SideSheet) */}
          <div className="block max-lg:hidden bg-white border-l-2 shadow-[0px_20px_30px_rgba(0,0,0,0.25)] relative right-0 -top-[6.4rem] rounded-b-lg  ">
            <div className="p-6 pt-28 space-y-4 overflow-y-auto scrollbar-hide" style={{ height: "calc(100vh - 1rem)" }}>
              <div className="h-full max-h-full overflow-y-auto scrollbar-hide p-2">
                {/* 
              <Accordion variant="splitted" className="!p-2">
                {items.map((item) => (
                  <AccordionItem key={item.id} aria-label={`Accordion ${item.id}`} title={item.title}>
                    <button
                      onClick={() => setCurrentVideo(item.videoSrc)}
                      className="text-blue-500 mt-2"
                    >
                      Ver Video de {item.title}
                    </button>

                      <div className="mt-4 text-sm text-gray-700">
                        <h4 className="font-semibold">Se desarrollarán los siguientes temas:</h4>
                        <ul className="list-disc list-inside p-3">
                          {item.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AccordionItem>
                ))}
              </Accordion> */}
                <Accordion isCompact variant="shadow" className='mb-2'>
                  <AccordionItem key="1111" aria-label="Accordion 1" title={<strong>0. GENERAL</strong>}>
                    Presentación del curso
                  </AccordionItem>
                </Accordion>
                <Accordion isCompact variant="shadow">

                  {datomodulo.map((modulo: any, index: number) => (
                    <AccordionItem key={index} title={<strong>{(index + 1) + '. ' + modulo.nombre}</strong>}>
                      {/* Muestra los temas del módulo */}
                      <ul>
                        {modulo.temas.map((tema: any, temaIndex: number) => (
                          <li key={temaIndex} className="mb-2 text">
                            <h1 className='px-4'>{tema.nombre}</h1>


                          </li>
                        ))}
                        <Accordion isCompact >
                          <AccordionItem key="1111" aria-label="Accordion 1" variant='splitted' title={<strong className='flex gap-4 items-center'>
                            <IoDocumentAttach />
                            Archivos</strong>}>
                            <a
                              href={'/path/to/diapositivas_modulo1.pdf'}
                              download
                              className="flex items-center space-x-1"
                            >
                              <span>📎</span> <span>Diapositiva.pdf</span>
                            </a>
                          </AccordionItem>
                        </Accordion>
                      </ul>
                    </AccordionItem>
                  ))}

                </Accordion>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contents;
