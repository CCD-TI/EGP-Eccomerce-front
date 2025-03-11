import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { environment } from "@/environments/environment";
import Swal from "sweetalert2";
import { Spinner } from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";


const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const img = {
  copa: `${storageUrl}/Multimedia/Imagen/Ccd/Banners/copa-mejor-institucion-latam.png`,
  icons: {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-gestion.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-ingenieria.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-mineria.svg`,
  },
  logos: {
    autodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-autodesk-institute-white.svg`,
    pmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-pmi-white.svg`,
    cdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdidp-white.svg`,
    compactccd: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdd-white5.svg`,
    compactpmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-pmi-white.svg`,
    compactcdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdidp-white.svg`,
    compactautodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-autodesk-white.svg`,
  },
  fondos: {
    colabs: `${storageUrl}/Multimedia/Imagen/Ccd/Fondos/FONDO%20NOSOTROS%20ACTUALIZADO.png`,
    trabajacn: `${storageUrl}/Multimedia/Imagen/Ccd/Fondos/trabaja-con-nosotros.png`,
  },
};
const AwardBanner: React.FC = () => {
  const [emailReferencia, setEmailReferencia] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [activeStep, setActiveStep] = useState(1);
  // Usamos useRef para acceder al video
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading
  const [message, setMessage] = useState("");

  useEffect(() => {
    const videoElement = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // El video entra en la zona visible, reproducirlo y quitar mute
          videoElement?.play().catch((error) => {
            console.log("Error al reproducir el video:", error);
          });
          if (videoElement) {
            videoElement.muted = false;
            setIsInView(true);
          }
        } else {
          // El video sale de la zona visible, pausarlo y ponerlo en mute
          if (videoElement) {
            videoElement.pause();
            videoElement.muted = true;
            setIsInView(false);
          }
        }
      },
      { threshold: 0.5 } // Se activa cuando el 50% del video es visible
    );

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!emailReferencia || !file) {
      Swal.fire({
        title:
          "Por favor, ingresa el correo de referencia y selecciona un archivo.",
        icon: "warning",
        draggable: true,
      });
      return;
    }

    setIsLoading(true); // Iniciar el loading

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pcorreoReferencia", emailReferencia);

    try {
      const response = await fetch(
        `${environment.baseUrl}/inicio/EnviarCorreoPagoConArchivo`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Mensaje de éxito
        if (data.message) {
          Swal.fire({
            title: "Éxito",
            text: data.message,
            icon: "success",
            draggable: true,
          });
        }
      } else {
        // Manejo de errores
        if (data.error) {
          Swal.fire({
            title: "Error",
            text: data.error,
            icon: "error",
            draggable: true,
          });
        } else if (data.message) {
          Swal.fire({
            title: "Advertencia",
            text: data.message,
            icon: "warning",
            draggable: true,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar el correo.");
    } finally {
      setIsLoading(false); // Finalizar el loading
    }
  };
  const handleMouseEnter = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = false; // Desactivar mute al hacer hover
      videoElement.play().catch((error) => {
        console.log("Error al reproducir al hacer hover:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause(); // Pausar el video
      videoElement.muted = true; // Activar mute nuevamente
    }
  };

  const content = [
    {
      // Primer cambio
      column2: (
        <div className="flex justify-center items-center h-full">
          <div className="space-y-2 mb-4">
            <div className="text-center flex flex-col justify-center items-center gap-2">
              <h2 className="text-white text-5xl text-center font-semibold mb-2 mr-2 leading-[0] ">
                <span className="text-center max-[1606px]:text-4xl text-5xl max mr-2 max-[1230px]:text-3xl  max-sm:text-xl">
                  Somos la
                </span>
                <span className="text-colors-cyan-ccd max-[1606px]:text-4xl text-5xl font-semibold  max-[1230px]:text-3xl  max-sm:text-xl ">
                  institución de la capacitación
                </span>
              </h2>
              <h1 className=" text-[3.7rem] max-[1230px]:text-[2.7rem] text-center text-colors-dark-blue-ccd font-bold tracking-wide neon-white  max-sm:text-3xl">
                MÁS IMPORTANTE
              </h1>
              <h3 className="max-[1606px]:text-4xl  text-6xl font-semibold  max-sm:text-2xl">
                De Latinoamérica
              </h3>
            </div>

            <div className="flex max-sm:flex-col  gap-6 pt-6 justify-center max-sm:justify-items-center items-center">
              <div className="flex gap-6  justify-center ">
                <Link href="/gestion">
                <div
                  className="gap-[10px] size-fit p-10 max-[1606px]:p-7 group bg-gradient-to-br from-[rgba(255,0,0,0.61)] hover:from-[rgba(255,0,0,0.7)] via-[rgba(22,46,84,0.5)]  hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(255,0,0,0.5)] hover:to-[rgba(255,0,0,0.7)] border-2 border-[rgba(22,46,84,0.7)]  text-white flex justify-center items-center rounded-xl"
                >
                  <img
                    src={img.icons.gestion}
                    alt="Gestión"
                    className="w-14 h-14 max-lg:size-10 group-hover:scale-110 duration-300"
                  />
                  <span className=" text-2xl max-sm:text-xl group-hover:scale-110 duration-300">
                    Gestión
                  </span>
                </div>
                </Link>
                <Link href="/ingenieria">
                <div
                  className="gap-[10px]  size-fit p-10 max-[1606px]:p-7  group bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)]  text-white flex justify-center items-center rounded-xl"
                >
                  <img
                    src={img.icons.ingenieria}
                    alt="Gestión"
                    className="w-14 h-14 max-lg:size-10 group-hover:scale-110 duration-300"
                  />
                  <span className=" text-2xl max-sm:text-xl group-hover:scale-110 duration-300">
                    Ingeniería
                  </span>
                </div>
                </Link>
              </div>
              <Link href="/mineria">
              <div
                className="gap-[10px]  size-fit p-10 max-[1606px]:p-7 group bg-gradient-to-br from-[rgba(249,115,22,0.6)] hover:from-[rgba(249,115,22,0.9)] via-[rgba(22,46,84,0.5)]  hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(255,115,22,0.5)]  hover:to-[rgba(255,115,22,0.7)] 
            border-2 border-[rgba(22,46,84,0.7)]  text-white flex justify-center items-center rounded-xl"
              >
                <img
                  src={img.icons.mineria}
                  alt="Gestión"
                  className="w-14 h-14 max-lg:size-10 group-hover:scale-110 duration-300"
                />
                <span className=" text-2xl max-sm:text-xl group-hover:scale-110 duration-300">
                  Minería
                </span>
              </div>
              </Link>
            </div>
          </div>
        </div>
      ),
      column3: (
        <div className="flex justify-center items-center  h-screen">
          <img
            src={img.copa}
            alt="Imagen representativa"
            className="size-[75%] object-contain  "
          />
        </div>
      ),
    },
    {
      // Segundo cambio
      column2: (
        
        <div className="flex max-lg:pl-0 pl-80 justify-center items-center ">
          <div className="space-y-2 mb-4">
            <div className="text-center justify-center items-center">
              <h2 className="text-white text-5xl text-center font-semibold mb-4 mr-2 pb-6 ">
                <span className="text-center text-5xl mr-2 max-[1606px]:text-4xl  max-[1230px]:text-3xl  max-sm:text-xl">
                  Conoce
                </span>
                <span className="text-colors-cyan-ccd text-5xl font-semibold max-[1606px]:text-4xl  max-[1230px]:text-3xl  max-sm:text-xl ">
                  nuestras acreditaciones
                </span>
              </h2>
              <h1 className="text-8xl text-center text-colors-dark-blue-ccd font-bold tracking-wide neon-white max-lg:text-[4rem] max-sm:text-3xl">
                INTERNACIONALES
              </h1>
            </div>
            <div className="grid max-sm:grid-cols-1 grid-cols-1 gap-[3rem]  items-center w-full justify-items-center">
              {/* <img
                src={img.logos.autodesk}
                alt="Logo 1"
                className="max-h-[30rem] w-[30rem] max-lg:w-[15rem] max-lg:max-h-[15rem] justify-self-end"
              /> */}
              <img
                src={img.logos.pmi}
                alt="Logo 2"
                // className="max-h-[30rem] w-[30rem] max-lg:w-[15rem] max-lg:max-h-[15rem] justify-self-start"
                className="w-[40rem] "
              />
            </div>
          </div>
        </div>
      ),
      column3: null, // Vacío
    },
    {
      // Tercer cambio
      column2: (
        <div className="flex max-lg:pl-0 pl-80 justify-center items-center h-full">
          <div className="space-y-2 mb-4">
            <div className="text-center justify-center items-center">
              <h2 className="text-white text-5xl text-center font-semibold mb-4 mr-2 pb-6">
                <span className="text-center text-5xl mr-2 max-[1606px]:text-4xl  max-[1230px]:text-3xl  max-sm:text-xl">
                  Conoce
                </span>
                <span className="text-colors-cyan-ccd text-5xl font-semibold max-[1606px]:text-4xl  max-[1230px]:text-3xl  max-sm:text-xl ">
                  nuestras acreditaciones
                </span>
              </h2>
              <h1 className="px-8 text-8xl text-center text-colors-dark-blue-ccd font-bold tracking-wide neon-white  max-lg:text-[4rem]  max-sm:text-3xl ">
                NACIONALES
              </h1>
            </div>
            <div className="flex justify-center  space-x-5">
              <img
                src={img.logos.cdidp}
                alt="Logo 2"
                className="max-h-[40rem] w-[40rem]  max-lg:max-h-[20rem]  max-lg:w-[20rem]"
              />
            </div>
          </div>
        </div>
      ),
      column3: null, // Vacío
    },
  ];
  
  const handleRemoveFile = () => {
    setFile(null); // Elimina el archivo seleccionado
    const fileInput = document.getElementById("archivoAdjunto") as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = ""; // Restablece el input de archivo
    }
  };
  return (
    <>
      <div className="flex bg-landignpage  h-screen max-sm:h-fit justify-center items-center  bg-gradient-to-b from-[rgba(19,25,57,1)] to-[rgba(11,16,60,1)] text-white">
        <div className="max-w-[110rem] w-full mx-auto h-full flex items-center max-sm:flex-col">
          {/* Primera columna: Línea con puntos */}
          <div className="w-[15%] h-[500px] max-sm:h-fit max-sm:mt-14 flex flex-col max-sm:flex-row max-sm:justify-around max-sm:w-full items-center justify-center relative">
            {/* Línea vertical */}
            <div className="absolute h-[80%] w-[3.5px] max-sm:h-[3.5px] max-sm:w-[80%] bg-gray-300"></div>

            {/* Puntos interactivos */}
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={`relative w-5 h-5 my-8 hover:w-6 hover:h-6 rounded-full z-10 border-2 border-transparent 
              ${activeStep === index + 1 ? "bg-colors-cyan-ccd" : "bg-white"} 
              transition-all duration-500 ${
                index === 0 ? "bg-colors-cyan-ccd" : ""
              }`}
                onClick={() => setActiveStep(index + 1)}
              ></button>
            ))}
          </div>

          {/* Segunda columna */}
          <div
            className={`w-[50%] max-lg:w-[85%] text-white p-6 pt-12 max-sm:pt-6 ${
              !content[activeStep - 1].column3
                ? "flex justify-center items-center"
                : ""
            }`}
          >
            {content[activeStep - 1].column2}
          </div>

          {/* Tercera columna */}
          <div className="w-[35%] text-white flex items-center max-lg:hidden">
            {content[activeStep - 1].column3 || <div className="h-full"></div>}
          </div>
        </div>
      </div>

      {/* MISION Y VISON DE NUESTRO EQUIPO */}
      <div className=" relative h-[950px]  text-center bg-gradient-to-b from-[#23284e65] to-[rgba(11,16,60,1)]">
        {/* Imagen de fondo con gradiente y contenido superpuesto */}
        <div className="relative">
          <img
            src={img.fondos.colabs}
            alt="Fondo Colaboradores"
            className="w-full h-full max-xl:h-[70rem] object-cover"
          />
          {/* Gradiente superpuesto */}

          {/* <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,16,60,1)] via-[rgba(11,16,60,0.6)] to-[rgba(11,16,60,0.6)] opacity-90"></div> */}

          {/* Contenido dentro del fondo */}
          <div className=" absolute inset-0 flex flex-col justify-start  2xl:gap-8 gap-14 py-28 pt-48 items-center text-white px-8">
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8 justify-items-center max-w-[110rem]">
              {/* Columna Misión */}
              <div className="flex flex-col gap-10 w-[60%] max-lg:w-full  ">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2  space-x-2">
                  <span className="text-cyan-400 text-4xl">
                    <Image
                      src="/Multimedia/Imagen/ccdcorp/newccdCorp/nosotros/Group 611.svg"
                      alt=""
                      width={50}
                      height={50}
                    />
                  </span>
                  <span className="text-6xl font-extrabold neon-white">
                    MISIÓN
                  </span>
                </h2>
                <p className="text-gray-300 text-lg max-md:text-base max-sm:text-lg">
                  Ofrecemos cursos y diplomas de alta calidad que fortalecen el
                  liderazgo, la innovación y la toma de decisiones en contextos
                  complejos. Con un enfoque práctico, promovemos el aprendizaje
                  continuo, la ética y la excelencia, formando profesionales con
                  visión integral y capacidad de generar un impacto sostenible
                  en la sociedad y sus organizaciones.
                </p>
              </div>
              {/* Columna Visión */}
              <div className="flex flex-col gap-10 w-[60%] max-lg:w-full ">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2 space-x-2">
                  <span className="text-green-400 text-4xl">
                    <Image
                      src="/Multimedia/Imagen/ccdcorp/newccdCorp/nosotros/Vector.svg"
                      alt=""
                      width={50}
                      height={50}
                    />
                  </span>
                  <span className="text-6xl font-extrabold neon-white">
                    VISIÓN
                  </span>
                </h2>
                <p className="text-gray-300 text-lg max-md:text-base max-sm:text-lg">
                  Ser reconocida como una institución líder en la formación de
                  profesionales altamente capacitados, innovadores y
                  responsables, capaces de generar un impacto significativo en
                  sus campos de trabajo y en la sociedad. Contribuyendo a la
                  creación de soluciones sostenibles para los desafíos
                  laborales.
                </p>
              </div>
            </div>
            <h2 className="text-8xl max-sm:text-6xl 2xl:text-7xl font-extrabold neon-white mb-12">
              NUESTRO EQUIPO
            </h2>
          </div>
        </div>
      </div>

      {/* Acreditaciones */}
      <div className="relative  px-6 lg:px-16 bg-sectors-Nos pt-10 ">
        {/* Contenedor principal */}
        <div className="max-w-7xl mx-auto text-center">
          {/* Títulos */}
          <h3 className="text-colors-cyan-ccd text-5xl font-bold max-sm:text-2xl">
            Nuestras
          </h3>
          <h2 className="text-white text-5xl max-sm:text-3xl font-extrabold neon-white">
            ACREDITACIONES
          </h2>
          <p className="text-white text-sm md:text-lg mt-4 max-w-2xl mx-auto">
            El Centro de Capacitación y Desarrollo (CCD) ofrece certificaciones
            avaladas por el Colegio de Ingenieros y el Colegio de Economistas,
            garantizando validez a nivel nacional e internacional.
          </p>

          {/* Contenedor de logos */}
          <div className="w-full grid grid-cols-3 max-sm:grid-cols-2 justify-center items-center gap-12 max-sm:gap-10 mt-12 max-sm:p-4">
            {/* Acreditación 1 */}
            <div className="flex flex-col items-center group">
              <img
                src={img.logos.compactccd}
                alt="Centro de Capacitación y Desarrollo"
                className="w-[17rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-4 group-hover:w-full transition-all duration-300"></div>
              <p className="text-colors-cyan-ccd text-sm md:text-base font-medium">
                Centro de Capacitación <br /> y Desarrollo
              </p>
            </div>

            {/* Acreditación 2 */}
            <div className="flex flex-col items-center group">
              <img
                src={img.logos.compactpmi}
                alt="Project Management Institute"
                className="w-[12rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-4 group-hover:w-full transition-all duration-300"></div>
              <p className="text-colors-cyan-ccd text-sm md:text-base font-medium">
                Project Management <br /> Institute
              </p>
            </div>

            {/* Acreditación 3 */}
            <div className="flex flex-col items-center group">
              <img
                src={img.logos.compactcdidp}
                alt="Colegio de Ingenieros del Perú"
                className="w-[13rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-4 group-hover:w-full transition-all duration-300"></div>
              <p className="text-colors-cyan-ccd text-sm md:text-base font-medium">
                Colegio de Ingenieros <br /> del Perú
              </p>
            </div>

            {/* Acreditación 4 */}
            {/* <div className="flex flex-col items-center group">
              <img
                src={img.logos.compactautodesk}
                alt="Autodesk Institute"
                className="w-[12rem] transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="md:block w-16 h-[4px] rounded-full bg-colors-sky-ccd my-4 group-hover:w-full transition-all duration-300"></div>
              <p className="text-colors-cyan-ccd text-sm md:text-base font-medium">
                Autodesk <br /> Institute
              </p>
            </div> */}
          </div>

          <section
            className="group relative z-10 flex justify-center items-center overflow-hidden py-20 pb-24"
            onMouseEnter={handleMouseEnter} // Activar sonido y reproducción con hover
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">
                <video
                  ref={videoRef}
                  className="video-vertical rounded-xl"
                  width={800}
                  src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Video/Ccd/Home/6e2e8d89-9def-068d-4651-afb6421a2364_custom.mp4"
                  controls={false}
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Trabaja con nosotros */}
      <div className="h-full relative flex items-center justify-start bg-sectors-Ccd  ">
        {/* Background overlay image */}

        <div className="w-[80%] max-w-[100rem] mx-auto max-sm:w-full max-sm:flex justify-center py-10">
          <div className="relative max-w-xl w-full  p-8 rounded-2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-center">
                  <span className="text-colors-cyan-ccd  text-5xl max-sm:text-3xl">
                    Se parte del
                  </span>
                  <br />
                  <span className="text-white text-6xl max-sm:text-4xl neon-white">
                    EQUIPO CCD
                  </span>
                </h1>
              </div>

              <p
                className="text-gray-300 text-lg bg-gradient-to-br from-[rgba(0,97,254,0.17)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,97,254,0.24)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] p-10 rounded-2xl"
              >
                Ser parte de CCD es impulsar el cambio profesional. Si tienes
                habilidades comunicativas, responsabilidad y ganas de trabajar,
                ¡Únete a nuestro equipo! Fortalece tus conocimientos en un
                ambiente colaborativo y desafiante.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Correo de referencia"
                    value={emailReferencia}
                    onChange={(e) => setEmailReferencia(e.target.value)}
                    className="px-3 py-2 bg-gray-200  border-colors-dark-blue-ccd/80 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-colors-sky-ccd"
                    required
                  />

                  <div className="flex gap-2 items-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="archivoAdjunto"
                    />
                    <label
                      htmlFor="archivoAdjunto"
                      className="px-4 w-[30%] py-2 bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
          to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] text-white rounded-2xl cursor-pointer"
                    >
                      Adjuntar CV
                    </label>
                    <span className="ml-2 w-[70%] text-white">
                      {file
                        ? file.name
                        : "El archivo debe pesar como máximo 5MB"}
                    </span>
                    {file && (
                      <button
                        onClick={handleRemoveFile}
                        className=" p-1 bg-red-500 hover:bg-red-700 text-white rounded-2xl"
                      >
                       <RxCross2  className="text-xl "/>
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex gap-2 items-center justify-center bg-colors-cyan-ccd text-colors-night-blue-ccd2 text-xl font-bold hover:bg-colors-cyan-ccd/60 p-4 rounded-2xl"
                  disabled={isLoading} // Deshabilitar el botón mientras carga
                >
                  {isLoading ? "Enviando..." : "¡POSTULAR AHORA! "}
                  {isLoading && (
                    <div className="flex justify-center">
                      <Spinner color="white" />
                    </div>
                  )}
                </button>

                {/* Mostrar el Spinner de carga usando el componente de heroui */}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Contáctanos */}
      <div className="relative h-[50rem] max-lg:h-fit py-16 px-12 lg:px-24  bg-sectors-Contac max-lg:px-6">
        <div className=" max-w-[80rem] mx-auto h-full grid grid-cols-2 max-md:grid-cols-1 justify-center  gap-12 max-lg:gap-6 items-center max-sm:w-full ">
          {/* Primera Columna: Mapa */}
          <div className="relative">
            <div className="rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.2532481967637!2d-77.02685439999999!3d-12.0948076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c865c35d0905%3A0x89d91859d476646c!2sAv.%20Rivera%20Navarrete%20762%2C%20San%20Isidro%2015046!5e0!3m2!1ses!2spe!4v1733861425996!5m2!1ses!2spe"
                allowFullScreen={false}
                loading="lazy"
                className="top-0 left-0 w-full h-[380px]  rounded-3xl"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Segunda Columna: Información de Contacto */}
          <div className="relative w-fit max-md:w-full p-8 bg-white/5 py-12 max-lg:p-7 rounded-2xl border border-colors-cyan-ccd">
            <div className="flex flex-col mx-[15px] items-center max-w-7xl w-full gap-6">
              <h2 className="text-cyan-400 text-4xl md:text-5xl font-bold mb-6 text-center">
                Contáctanos
              </h2>
              <div className="space-y-8 ">
                <div>
                  <p className="font-semibold text-cyan-400 text-2xl max-lg:text-xl">
                    Inscripciones - Matrícula
                  </p>
                  <p className="text-white text-lg md:text-xl">
                    (+51) 900 841 254
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400 max-lg:text-xl text-2xl">
                    Dirección Académica
                  </p>
                  <p className="text-white text-xl  max-lg:text-base">
                    (+51) 900 888 876
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400 text-xl max-lg:text-xl">
                    Correo Electrónico
                  </p>
                  <p className="text-white text-xl  max-lg:text-base">
                    informes@ccdcapacitaciones.edu.pe
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400 max-lg:text-xl text-2xl">
                    Ubicación
                  </p>
                  <p className="text-white text-xl max-lg:text-base">
                    Av. Rivera Navarrete 765, San Isidro, Lima <br />
                    Oficina 1001 Referencia: Torre Andina
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AwardBanner;
