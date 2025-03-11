"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FcBusinessman, FcFile, FcOvertime } from 'react-icons/fc';
import ModalCatalogo from '@/components/ui/bruno/modalCatalago';
import { Button } from '@nextui-org/react';
import ModalCat from '@/components/ui/bruno/carruselsCatalogo';
import ModalCatP from '@/components/ui/bruno/carruselsCatalogoP';
import ListCatalogo from '@/components/ui/bruno/listCatalogo';
import { environment } from '@/environments/environment';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';
import { LuCalendarDays } from 'react-icons/lu';
import { IoMdTime } from 'react-icons/io';
import { BreadcrumbCatComponent } from '@/components/ui/breadcrumblacatc';
import { IoDocumentOutline } from 'react-icons/io5';
import { CiBoxes } from 'react-icons/ci';

interface Props {
  params: {
    clasificacion: string;
    curso: string;
  };
}

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export default function Page({ params }: Props) {
  const searchParams = useSearchParams();
  const result = searchParams.get('iu') || 'default';
  const [datalistarCatalogoP1, setdatalistarCatalogoP1] = useState([]);
  const [dataimagentema, setdataimagentema] = useState([]);

  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false); // Estado para el modal de materiales
  const [isModulosModalOpen, setIsModulosModalOpen] = useState(false); // Estado para el modal de módulos


  const [existevideoprincipal, setexistevideoprincipal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const listarCatalogoP1 = await api.post("/inicio/listarCatalogoP1", {
          fproductoid: result
        });
        setdatalistarCatalogoP1(listarCatalogoP1.data.data[0]);

        const listarCursoAdjuntosCatalogo = await api.post("/inicio/listarCursoAdjuntosCatalogo", {
          fproductoid: result
        });
        setdataimagentema(listarCursoAdjuntosCatalogo.data.data[0]);
        console.log(JSON.stringify(listarCursoAdjuntosCatalogo.data.data[0]))
        const imagenProfesor = listarCursoAdjuntosCatalogo.data.data[0].find(
          (item: any) => item.RutaImagen === "/Multimedia/Video/Cursos/Presentacion/"
        );

        // Mensaje si la ruta está vacía
        if (!imagenProfesor) {
          setexistevideoprincipal(true)

        } else {
          setexistevideoprincipal(false)
        }

        console.log(JSON.stringify(listarCursoAdjuntosCatalogo.data.data[0]));


      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    loadData();
  }, []);

  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const convertirFrecuenciaADias = (frecuencia: string | null) => {
    if (!frecuencia) {
      return "No hay días seleccionados";
    }
    if (frecuencia == 'Inmediato') {
      return "Inmediato";
    }

    const diasNumeros = frecuencia.split(',').map(Number);
    const diasSeleccionados = diasNumeros.map(num => diasSemana[num]);

    return diasSeleccionados.join(', ');
  };

  // Efecto para pausar el video si cualquier modal está abierto
  useEffect(() => {
    if (videoRef.current) {
      if (isMaterialModalOpen || isModulosModalOpen) {
        videoRef.current.pause(); // Pausar el video si alguno de los modales está abierto
      } else {
        videoRef.current.play(); // Reproducir el video si ambos modales están cerrados
      }
    }
  }, [isMaterialModalOpen, isModulosModalOpen]);

  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");
  const lastPath = paths[paths.length - 1];

  return (
    <div className="w-full h-full pb-[1rem] bg-[url('/Multimedia/Imagen/relleno/theme.jpg')] bg-cover "  >
      <div className='w-full h-full'>
        <div className='w-[50%] max-xl:w-[90%] h-full mx-auto px-1 flex flex-col justify-center gap-10 max-sm:gap-40'>
          <div className='flex flex-col justify-center gap-2 py-4'>
            <div className='py-4'>
              <BreadcrumbCatComponent />
            </div>
            <h1 className='text-4xl text-center font-bold'>{decodeURI(lastPath)}</h1>
          </div>

          {existevideoprincipal == true ? <div className="w-[60%] mx-auto flex justify-center items-center relative animate-shadow">
            {dataimagentema.map((item: any, index: number) => {
              if (!item.RutaImagen || !(item.RutaImagen).includes("Multimedia/Video/Cursos/Presentacion")) return null;
              return (
                <video ref={videoRef} key={index} src={environment.baseUrlStorage + item.RutaImagen} preload='auto' controls autoPlay loop className='w-full h-[38rem] object-fill rounded-lg relative'></video>
              );
            })}
          </div> : (<></>)}


          {datalistarCatalogoP1.map((item: any, index: number) => (
            <div key={index} className='w-full h-[12rem] flex justify-between max-sm:flex-col gap-10'>
              <div className='bg-white w-[50%] shadow-2xl shadow-blue-600 border-2 rounded-lg p-10 flex flex-col gap-2 justify-center items-center text-center'>
                <img src='/Multimedia/Imagen/iconoscat/CALENDARIO-02.png' className='h-10 w-10 text-blue-500' />
                <h1 className='font-bold text-2xl text-blue-600'>Frecuencia</h1>
                <p className='text-xl'>{convertirFrecuenciaADias(item.Frecuencia)}</p>
              </div>

              <div className='bg-white w-[50%] shadow-2xl shadow-blue-600 border-2 rounded-lg p-6 flex justify-center items-center flex-col gap-2 text-center'>
                <IoMdTime className='h-10 w-10 text-[#0080EE]' />
                <h1 className='font-bold text-2xl text-center text-blue-600'>Horas <br /> académicas</h1>
                <p className='text-lg'>{item.HorasAcademicas} Horas</p>
              </div>
            </div>
          ))}

          <div className='grid grid-cols-2 gap-10 max-lg:gap-10 justify-center'>
            <div className='flex justify-end'>
              <ModalCatalogo
                buttonProps={{
                  cssClass: "className=' w-full h-full bg-white border-2 shadow-2xl border-b-8 border-b-blue-600 rounded-2xl flex flex-col gap-2 cursor-pointer",
                  btnContent: (
                    <>
                      <img
                        alt=""
                        src="/Multimedia/Imagen/portadas/MATERIALES - FONDO.png"
                        className='w-full h-[10rem] rounded-lg'
                      />
                      <div className='flex justify-center items-center gap-2 p-2'>
                        <img src='/Multimedia/Imagen/iconoscat/MATERIALES.png' className='h-10 w-10 text-blue-500' />
                        <h1 className='text-2xl'>Materiales</h1>
                      </div>
                    </>
                  ),
                }}
                modalBodyProps={{
                  title: "",
                  description: "",
                  docContent: (
                    <div className="w-full h-full">
                      <div className='w-full flex justify-center gap-3 py-10'>
                        <h1 className='text-right'>
                          <span className='text-5xl font-extrabold t-[var(--ccdcolordark)]ck'>Materia</span>
                          <span className='text-5xl font-extrabold underline t-[var(--ccdcolordark)] decoration-[var(--ccdcolordark)] decoration-4 underline-offset-4'>les</span>
                        </h1>
                      </div>
                      <ModalCatP dato={result} />
                    </div>
                  ),
                }}
                downloadButton={<Button color="primary">Descargar</Button>}
                isOpen={isMaterialModalOpen}
                setIsOpen={setIsMaterialModalOpen} // Controla el estado del modal de materiales
              />
            </div>

            <div className='flex justify-start'>
              <ModalCatalogo
                buttonProps={{
                  cssClass: "className=' w-full h-full bg-white border-2 shadow-2xl border-b-8 border-b-blue-600 rounded-2xl flex flex-col gap-2 cursor-pointer",
                  btnContent: (
                    <>
                      <img
                        src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Fondos/PORTADAS_MODULOS.jpg'}
                        alt=""
                        className='w-full h-[10rem] rounded-lg'
                      />
                      <div className='flex justify-center items-center gap-2 p-2'>
                        <img src='/Multimedia/Imagen/iconoscat/MODULOS 1.png' className='h-10 w-10 text-blue-500' />
                        <h1 className='text-2xl'>Módulos</h1>
                      </div>
                    </>
                  ),
                }}
                modalBodyProps={{
                  title: "",
                  description: "",
                  docContent: (
                    <div className="w-full h-full flex flex-col justify-center items-center gap-8 px-16">
                      {dataimagentema.map((item: any, index: number) => {
                        if (!item.RutaImagen || !(item.RutaImagen).includes("Multimedia/Imagen/Cursos/Portada")) return null;
                        return (
                          <><div className='w-full flex justify-center gap-3'>
                            {/* <h1 className='text-right'>
                              <span className='text-5xl font-extrabold t-[var(--ccdcolordark)]ck'>Módu</span>
                              <span className='text-5xl font-extrabold underline t-[var(--ccdcolordark)] decoration-[var(--ccdcolordark)] decoration-4 underline-offset-4'>los</span>
                            </h1> */}
                          </div><img key={index}
                            src={environment.baseUrlStorage + item.RutaImagen}
                            alt=""
                            className='w-full h-[24rem] max-md:w-full max-md:h-full rounded-3xl max-sm:hidden' /></>
                        );
                      })}
                      <ListCatalogo dato={result} />
                    </div>
                  ),
                }}
                downloadButton={<Button color="primary">Descargar</Button>}
                isOpen={isModulosModalOpen}
                setIsOpen={setIsModulosModalOpen} // Controla el estado del modal de módulos
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
