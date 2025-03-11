"use client"
import React, { useState } from 'react'
import { Link as Link2 } from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward, IoIosListBox } from 'react-icons/io'
// import SideSheet from '../sheet'; // Importa tu componente SideSheet aquí

const SidebarPlat = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [isSheetOpen, setSheetOpen] = useState(false); // Estado para controlar el Sheet

    const toggleMenu = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setIsVisible(true), 550);
        } else {
            setIsVisible(false);
            setTimeout(() => setIsOpen(false), 300);
        }
    };

    const siderbarLinks = [
        { label: 'Inicio', route: '/', imgUrl: '/Multimedia/Imagen/icons/home.svg' },
        { label: 'Mis Diplomas Y Cursos', route: '/mis-cursos', imgUrl: '/Multimedia/Imagen/icons/curs.svg' },
        { label: 'Mis Certificados', route: '/mis-certificados', imgUrl: '/Multimedia/Imagen/icons/certificate.svg' },
        { label: 'Mis Calificaciones', route: '/calificaciones', imgUrl: '/Multimedia/Imagen/icons/school.svg' },
    ];

    // Contenido del Sidebar (reutilizable en el Sheet y Sidebar)
    const SidebarContent = () => (
        <div className="flex flex-1 flex-col gap-6">
            <div className={`flex ${isOpen ? 'justify-end' : 'justify-center'} items-center w-full`}>
                <button onClick={toggleMenu}>
                    {isOpen ? <IoIosArrowBack className="text-5xl font-extrabold" /> : <IoIosArrowForward className="text-5xl font-extrabold" />}
                </button>
            </div>
            <div className="flex flex-col items-center gap-6">
                <Image alt="User" src="/Multimedia/Imagen/images/avatar-3.png" width={80} height={80} className="rounded-full object-cover" />
                <div className={`flex flex-col transition-opacity duration-300 ${isOpen ? (isVisible ? 'block opacity-100' : 'block opacity-0') : 'hidden opacity-100'}`}>
                    <h1 className="font-semibold text-lg">Carranza Huamantica</h1>
                    <p>Bruno Enrique</p>
                    <Link2 href="#" underline="always">Editar</Link2>
                </div>
            </div>
            {siderbarLinks.map((link) => {
                const isActive = pathname === link.route || pathname.startsWith(link.route);
                return (
                    <Link
                        href={link.route}
                        key={link.label}
                        className='flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-blue-1'
                    >
                        <Image alt={link.label} src={link.imgUrl} width={26} height={26} />
                        <p className={`text-lg font-semibold ${isOpen ? 'block' : 'hidden'}`}>
                            {link.label}
                        </p>
                    </Link>
                );
            })}
        </div>
    );

    return (
        <>
            {/* Sidebar en pantallas grandes */}
            <section
                className={`sticky top-[79.19px] flex ${isOpen ? 'w-[300px]' : 'w-[100px]'} h-[calc(100vh-79.19px)]
                 max-xl:h-screen flex-col justify-between bg-dark-1 p-6 text-white max-sm:hidden transition-all duration-400 ease-in-out rounded-r-xl`}
            >
                <SidebarContent />
            </section>

            {/* Botón para abrir el Sheet en pantallas pequeñas */}
            <button onClick={() => setSheetOpen(true)} className="fixed z-40 p-2 m-4 my-2 bg-blue-500 text-white rounded-full max-sm:block hidden">
                <h1><IoIosListBox className='text-3xl' /></h1>
            </button>

            {/* Sheet para pantallas pequeñas */}
            {/* <SideSheet
                isOpen={isSheetOpen}
                onClose={() => setSheetOpen(false)}
                colorbg='bg-dark-1'
                colorbtn='text-white'
            >
                <div className="flex flex-1 flex-col gap-6  text-white p-4 rounded-lg">
                    <div className="flex flex-col items-center gap-6 text-white">
                        <Image
                            alt="User"
                            src="/Multimedia/Imagen/images/avatar-3.png"
                            width={150}
                            height={150}
                            className="rounded-full object-cover"
                        />
                        <div className="flex flex-col opacity-100 transition-opacity duration-300">
                            <h1 className="font-semibold text-lg">Carranza Huamantica</h1>
                            <p>Bruno Enrique</p>
                            <Link2 href="#" underline="always">Editar</Link2>
                        </div>
                    </div>
                    {siderbarLinks.map((link) => {
                        // const isActive = pathname === link.route || pathname.startsWith(link.route);
                        return (
                            <a
                                href={link.route}
                                key={link.label}
                                className='flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-blue-1'



                            >
                                <Image
                                    alt={link.label}
                                    src={link.imgUrl}
                                    width={24}
                                    height={24}
                                />
                                <p className="text-lg font-semibold">{link.label}</p>
                            </a>
                        );
                    })}
                </div>
            </SideSheet> */}
        </>
    );
}

export default SidebarPlat;
