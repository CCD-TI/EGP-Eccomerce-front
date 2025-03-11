"use client"
import { FaFilter, FaPlus, FaRegCalendar } from 'react-icons/fa6'
import { GoClock } from 'react-icons/go'
import { LuBookMarked } from 'react-icons/lu'
import { Accordion, AccordionItem, Button, Card, CardBody, Image, Select, SelectItem, Pagination } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { BreadcrumbComponent } from '@/components/ui/breadcrumb'
import { FreeMode, Autoplay, Navigation, Keyboard, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import axios from 'axios';
import { environment } from '@/environments/environment';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductoComponent from '@/components/ui/pricing/producto';


const Bus = ({ children }: any) => {

    const [path, setPath] = useState('');
    const [Part2, setPart2] = useState('');
    const [Part3, setPart3] = useState('');
    const [Part4, setPart4] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname; // Acceso seguro al objeto `window`
            const parts = currentPath.split('/');
            setPath(currentPath);
            setPart2(parts[2] || '');
            setPart3(parts[3] || '');
            setPart4(parts[4] || '');
            setCheckboxClasificacion(parts[2] ? [parts[2]] : []);
            setCheckboxCategoria(parts[3] ? [parts[3]] : []);
            setCheckboxSubCategoria(parts[4] ? [parts[4]] : []);

        }
    }, [Part2, Part3, Part4]);

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });





    const [isLoaded, setIsLoaded] = useState(false);
    const searchParams = useSearchParams();
    const result = searchParams.get('result') || 'default';
    const [totalproductos, setTotalProductos] = useState([{ count: 0 }]);
    const [productos, setProductos] = useState([]);
    const [fclasificacion, setClasificacion] = useState([]);
    const [fcategoria, setCategoria] = useState([]);
    const [fsubcategoria, setSubCategoria] = useState([]);
    const [checkboxclasificacion, setCheckboxClasificacion] = useState<any>(Part2 ? [Part2] : []);
    const [checkboxcategoria, setCheckboxCategoria] = useState<any>(Part3 ? [Part3] : []);
    const [checkboxsubcategoria, setCheckboxSubCategoria] = useState<any>(Part4 ? [Part4] : []);
    const [currentPage, setCurrentPage] = useState(1);


    const pa = Math.ceil(totalproductos[0].count / 12);


    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };



    return (
        <>

            <div className=" w-full bg-[var(--newgrad2)] flex justify-center items-center border-b-1 border-[var(--color-contraneutral)] border-dashed">
                <div className="h-full w-[90%] flex flex-col  justify-center  py-[2rem] gap-10 ">
                    <BreadcrumbComponent />
                    <div className='w-full flex flex-col gap-5'>
                        <h1>
                            <span className=" text-4xl text-white font-extrabold">Cursos</span>
                            <span className='text-4xl text-white '> más vendi</span>
                            <span className='text-4xl underline text-white   decoration-[white] decoration-4 underline-offset-4 '>dos</span>
                        </h1>

                        <Swiper

                            slidesPerView={5}
                            spaceBetween={30}
                            slidesPerGroupAuto={true}
                            pagination={{
                                type: "fraction",
                            }}
                            navigation={true}
                            loop={true}
                            modules={[Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                    slidesPerGroup: 1, // Se agrupa de 1 en 1 en pantallas pequeñas
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                    slidesPerGroup: 1, // Se agrupa de 1 en 1 en pantallas pequeñas
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                    slidesPerGroup: 1, // Se agrupa de 1 en 1 en pantallas medianas
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                    slidesPerGroup: 4, // Se agrupa de 4 en 4 en pantallas grandes
                                },
                                1280: {
                                    slidesPerView: 5,
                                    spaceBetween: 30,
                                    slidesPerGroup: 5, // Se agrupa de 5 en 5 en pantallas muy grandes
                                },
                            }}
                        >
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-01.png'}
                                        />

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-02.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-03.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-04.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-05.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-06.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-07.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-08.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-09.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                        <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_CURSO-10.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className='w-full flex flex-col gap-5'>
                        <h1>
                            <span className=" text-4xl text-white font-extrabold">Diplomas</span>
                            <span className='text-4xl text-white'> más vendi</span>
                            <span className='text-4xl underline text-white  decoration-[white] decoration-4 underline-offset-4 '>dos</span>
                        </h1>
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            slidesPerGroupAuto={true}
                            pagination={{
                                type: "fraction",
                            }}
                            navigation={true}
                            loop={true}
                            modules={[Navigation]}
                            className="mySwiper "
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                    slidesPerGroup: 1, // Se agrupa de 1 en 1 en pantallas pequeñas
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                    slidesPerGroup: 1, // Se agrupa de 1 en 1 en pantallas pequeñas
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                    slidesPerGroup: 1, // Se agrupa de 1 en 1 en pantallas medianas
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                    slidesPerGroup: 4, // Se agrupa de 4 en 4 en pantallas grandes
                                },
                                1280: {
                                    slidesPerView: 5,
                                    spaceBetween: 30,
                                    slidesPerGroup: 5, // Se agrupa de 5 en 5 en pantallas muy grandes
                                },
                            }}
                        >
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-01.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-02.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-03.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-04.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-05.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-06.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-07.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-08.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-09.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='!bg-transparent'>
                                <div className='relative flex justify-end overflow-hidden !bg-transparent '>
                                    <div className='relative !bg-transparent'>
                                    <Image
                                            className=''
                                            removeWrapper
                                            alt="Card example background"
                                            height={180}
                                            src={environment.baseUrlStorage + '/Multimedia/Imagen/Ccd/Banners/TOP 10 (4)_DIPLOMA-10.png'}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className='mb-[2rem] max-sm:mb-0 w-full  max-sm:h-full rounded-xl overflow-hidden'>
                        <Image radius='none' classNames={{ "wrapper": "!w-full !max-w-[none] ", "img": "!w-full !max-w-[none]", "blurredImg": "!w-full !max-w-[none]", "zoomedWrapper": "!w-full !max-w-[none]" }} src='/Multimedia/Imagen/Banners/Banner2.jpg' className='w-full h-full' />
                    </div>
                    {children}

                </div>
            </div>
        </>
    )
}

export default function Page({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Bus>{children}</Bus>
            </Suspense>
        </>
    );
}