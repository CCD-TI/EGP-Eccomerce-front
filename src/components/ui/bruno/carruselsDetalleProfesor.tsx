import { Divider } from '@nextui-org/react';
import React from 'react';
import Slider from 'react-slick';

// Importa solo los estilos básicos de Slick Carousel
import 'slick-carousel/slick/slick.css';
import { Autoplay } from 'swiper/modules';


interface Props {
    datos: any[]
}

const CarouselComponent = ({ datos }: Props) => {

    const settings = {
        dots: true,
        infinite: true, // Desactivar carrusel infinito
        speed: 500,
        slidesToShow: 1, // Muestra máximo 3 o el número total de datos
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1440, // Pantallas menores o iguales a 1440px
                settings: {
                    slidesToShow: 1, // Mostrar 2 slides
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024, // Pantallas menores o iguales a 1024px
                settings: {
                    slidesToShow: 1, // Mostrar 1 slide
                    slidesToScroll: 1,
                },
            },
        ],

        appendDots: (dots: React.ReactNode) => (
            <div>
                <ul className="flex justify-center mt-4 space-x-2">{dots}</ul>
            </div>
        ),

        customPaging: (i: number) => (
            <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-600 focus:outline-none border-2 border-transparent active:border-blue-500" />
        ),

        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div className="carousel-container w-[70%]  max-xl:w-full ml-[0] max-xl:ml-0 flex flex-col  justify-center  py-8  px-[6rem] max-lg:px-0 max-sm:px-0 min-[500px]:px-0 lg:px-0 lg:max-w-7xl relative">
            <Slider {...settings}>
                {datos.map((item: any, index: number) => (
                    <div key={index} className=' w-full h-full px-6'>

                        <div className='flex max-md:flex-col gap-6 bg-white/30   rounded-lg p-6'>
                            <div className="w-full ">
                                <img src="/Multimedia/Imagen/BULEJE.png" className='w-full h-[20rem]' alt="" />

                            </div>
                            <div className='flex flex-col justify-center gap-2 text-white '>
                                <h1 className='font-bold text-xl max-xl:text-base'>{item.Nombres + ' ' + item.Apellidos}</h1>
                                <h1 className='font-semibold text-xl max-xl:text-base'>{item.Puesto}</h1>
                                <Divider className='bg-[#00E8DD] h-1' />
                                <p className='text-xs max-lg:text-base  max-sm:text-base max-xl:text-xs '>
                                    {item.Descripcion}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Componentes de flecha personalizados
const CustomNextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <button
        className="absolute top-1/2 right-2 max-lg:right-16 transform -translate-y-1/2 translate-x-[200%] bg-[#00EADE] text-[#162E54] p-2 rounded-full z-10 focus:outline-none"
        onClick={onClick}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </button>
);

const CustomPrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <button
        className="absolute top-[52%] left-2 max-lg:left-16 transform -translate-y-1/2 -translate-x-[200%] bg-[#00EADE] text-[#162E54] p-2 rounded-full z-10 focus:outline-none"
        onClick={onClick}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    </button>
);

export default CarouselComponent;
