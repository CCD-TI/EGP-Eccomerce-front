"use client"
import React, { useState } from 'react'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';
import { environment } from '@/environments/environment';


export default function Page() {
   
    const list = [
        {
            title: "Cursos y Diplomas",
            img: '/Multimedia/Imagen/portadas/CURSOS Y DIPLOMAS - FONDO.png',
        }
    ]
    

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isSlideChanged, setIsSlideChanged] = useState(false);
  
    const handleSlideChange = () => {
      // Mutear el video solo si el slide cambió manualmente
      if (isSlideChanged && videoRef.current) {
        videoRef.current.muted = true;
      } else {
        setIsSlideChanged(true); // Activar cambio de slide manual para futuras acciones
      }
    };
    return (
        <>
            <div className="h-full bg-transparent">
                <div className="w-full !h-[45rem] ">
                    <Swiper
                        onSlideChange={handleSlideChange}
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper !p-0   "
                    >
                        <SwiperSlide>
                            <video
                                ref={videoRef}
                                className="w-full h-full rounded-none object-fill"
                                autoPlay
                                loop
                                controls
                            >
                                <source src='/Multimedia/Video/Correcciones institucional final.mp4' type="video/mp4" />

                            </video>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                removeWrapper
                                className="w-full rounded-none"
                                src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/SLIDERS MOVIL-01.jpg'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                removeWrapper
                                className="w-full rounded-none"
                                src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/SLIDERS MOVIL-02.jpg'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                removeWrapper
                                className="w-full   rounded-none"
                                src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/SLIDERS MOVIL-03.jpg'}
                            /></SwiperSlide>
                        <SwiperSlide>
                            <Image
                                removeWrapper
                                className="w-full   rounded-none"
                                src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/SLIDERS MOVIL-04.jpg'}
                            />
                        </SwiperSlide>

                    </Swiper>
                </div>

                <div className="w-[80%] h-[45rem] mx-auto py-6 flex flex-col justify-center gap-10">
                    <h1 className='text-center'>
                        <span className=" text-5xl text-[var(--ccdcolordark)] font-extrabold">Nuestro</span>
                        <span className='text-5xl text-[var(--ccdcolordark)]'> Catál</span>
                        <span className='text-5xl underline text-[var(--ccdcolordark)]  decoration-[var(--ccdcolordark)] decoration-4 underline-offset-4 '>ogo</span>
                    </h1>
                    <div className=" grid grid-cols-1 gap-10  ">
                        {list.map((item, index) => (
                            <Card shadow="lg" key={index} isPressable className='w-[60%] m-auto border-2'>
                                <Link href={{ pathname: `/catalogo/${item.title}` }} className='w-full h-full'>
                                    <CardBody className="overflow-visible p-0">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={item.title}
                                            className="w-full object-cover h-[140px]"
                                            src={item.img}
                                        />
                                    </CardBody>
                                    <CardFooter className="justify-center  py-5">
                                        <b className="text-xl">{item.title}</b>
                                    </CardFooter>
                                </Link>
                            </Card>
                        ))}
                    </div>



                </div>
            </div>
        </>
    )
}
