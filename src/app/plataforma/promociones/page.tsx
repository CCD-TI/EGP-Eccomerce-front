"use client";
import React, { useState } from 'react'
import { IoTicketOutline } from 'react-icons/io5';
import { useGlobalContext } from '../layout';

export default function page() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Mostrar el estado "copiado" por 2 segundos
        });
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { nombreGlobal, setNombreGlobal } = useGlobalContext();
    setNombreGlobal("promos")
    return (
        <>

            <div className='mt-3'>
                <h1 className='text-[#D9DADB] text-lg'>Aprovecha</h1>
                <h1 className='text-white text-2xl font-bold'>Mis Promociones Exclusivas</h1>
            </div>
            <div className='h-full w-[90%]  grid grid-cols-4 max-md:grid-cols-1 max-2xl:grid-cols-2 justify-center items-center mx-auto  gap-14 mt-5'>

                <div className="perspective-[1000px] w-[280px] h-[400px]">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:[transform:rotateY(180deg)]">
                        {/* Front of card */}
                        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-[#8b1c1c] text-white p-6">
                            <h2 className="text-xl mb-8 font-bold flex items-center gap-2"><IoTicketOutline className='text-2xl' />  Cupon de descuento </h2>

                            {/* City illustration placeholder */}
                            {/* <div className="h-48 relative">
                                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
                                    <div className="w-20 h-20 border-2 border-white/30 rounded-full"></div>
                                    <div className="w-16 h-28 mx-2 border-2 border-white/30"></div>
                                    <div className="w-12 h-24 border-2 border-white/30"></div>
                                    <div className="w-8 h-40 ml-2 border-2 border-white/30"></div>
                                </div>

                              
                                <div className="absolute bottom-16 right-12 bg-[#FF5722] rounded-full p-2 rotate-45">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            </div> */}

                            {/* Flight details */}
                            <div className='border-dashed border-y-2 border-white flex flex-col py-2 justify-center items-center'>
                                <img
                                    src="/Multimedia/Imagen/images/gestion.png"
                                    alt=""
                                    className='size-52'
                                />
                                <div className="flex justify-between w-full">
                                    <div>
                                        <p className="text-sm text-gray-400">Para:</p>
                                        <h3 className="text-xl font-bold">Gestion</h3>
                                        {/* <p className="text-sm text-gray-400">NAG</p> */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Descuento:</p>
                                        <h3 className="text-xl font-bold">40%</h3>
                                        {/* <p className="text-sm text-gray-400">ATZ</p> */}
                                    </div>
                                </div>

                                {/* <div className=" grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Traveller</p>
                                    <p className="font-medium">1 Adult</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Class</p>
                                    <p className="font-medium">Economy</p>
                                </div>
                            </div> */}
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-400">Ticket valido hasta:</p>
                                <p className="text-white">23 de diciembre de 2024</p>
                            </div>
                        </div>

                        {/* Back of card */}
                        <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-[#8b1c1c] text-white p-6">
                            <div className="flex justify-center mx-a items-center mb-8">
                                <img src="/Multimedia/Imagen/logos/CCDLOGOWHITE.png" alt="" className='size-40' />
                            </div>

                            {/* Passenger details */}
                            <div className="flex flex-col justify-center">
                                <div>
                                    <p className="text-sm text-gray-400">Cupon valido hasta: </p>
                                    <p className="text-xl text-white">23 de diciembre de 2024</p>
                                </div>



                                {/* Ticket Number with Copy Functionality */}
                                <div className="mt-6">
                                    <p className="text-sm text-gray-400">Numero de ticket</p>
                                    <div className="flex items-center gap-2">
                                        <p
                                            className="text-xl font-bold bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                                            onClick={() => handleCopy("12345-ABCDE")}
                                        >
                                            12345-ABCDE
                                        </p>
                                        <button
                                            className="bg-[#FF5722] text-white px-3 py-2 rounded-full text-sm shadow-md hover:bg-[#e14a20] transition"
                                            onClick={() => handleCopy("12345-ABCDE")}
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                    {copied && (
                                        <p className="text-green-400 mt-2 text-sm">Ticket Copiado!</p>
                                    )}
                                </div>

                                {/* Barcode */}

                            </div>
                        </div>
                    </div>

                    <style jsx>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>
                </div>
                <div className="perspective-[1000px] w-[280px] h-[400px]">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:[transform:rotateY(180deg)]">
                        {/* Front of card */}
                        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-[#cf6527] text-white p-6">
                            <h2 className="text-xl mb-8 font-bold flex items-center gap-2"><IoTicketOutline className='text-2xl' />  Cupon de descuento </h2>

                            {/* City illustration placeholder */}
                            {/* <div className="h-48 relative">
                                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
                                    <div className="w-20 h-20 border-2 border-white/30 rounded-full"></div>
                                    <div className="w-16 h-28 mx-2 border-2 border-white/30"></div>
                                    <div className="w-12 h-24 border-2 border-white/30"></div>
                                    <div className="w-8 h-40 ml-2 border-2 border-white/30"></div>
                                </div>

                              
                                <div className="absolute bottom-16 right-12 bg-[#FF5722] rounded-full p-2 rotate-45">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            </div> */}

                            {/* Flight details */}
                            <div className='border-dashed border-y-2 border-white flex flex-col py-2 justify-center items-center'>
                                <img
                                    src="/Multimedia/Imagen/images/Mineria.png"
                                    alt=""
                                    className='size-52'
                                />
                                <div className="flex justify-between w-full">
                                    <div>
                                        <p className="text-sm text-gray-400">Para:</p>
                                        <h3 className="text-xl font-bold">Mineria</h3>
                                        {/* <p className="text-sm text-gray-400">NAG</p> */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Descuento:</p>
                                        <h3 className="text-xl font-bold">60%</h3>
                                        {/* <p className="text-sm text-gray-400">ATZ</p> */}
                                    </div>
                                </div>

                                {/* <div className=" grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Traveller</p>
                                    <p className="font-medium">1 Adult</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Class</p>
                                    <p className="font-medium">Economy</p>
                                </div>
                            </div> */}
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-400">Ticket valido hasta:</p>
                                <p className="text-white">23 de diciembre de 2024</p>
                            </div>
                        </div>

                        {/* Back of card */}
                        <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-[#cf6527] text-white p-6">



                            {/* Passenger details */}
                            <div className="flex flex-col justify-between">

                                <h2 className="text-base w-full mb-8 font-bold flex items-center gap-2">Aprovecha el 60% Descuento!</h2>
                                <div className='border-white border-y-2 border-dashed py-3'>

                                    <div className="flex justify-center mx-auto items-center ">
                                        <img src="/Multimedia/Imagen/logos/CCDLOGOWHITE.png" alt="" className='size-40' />
                                    </div>

                                    {/* Ticket Number with Copy Functionality */}
                                    <div className="">
                                        <div className="flex items-center gap-2">
                                            <p
                                                className="text-xl font-bold bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                                                onClick={() => handleCopy("12345-ABCDE")}
                                            >
                                                12345-ABCDE
                                            </p>
                                            <button
                                                className="bg-[#FF5722] text-white px-3 py-2 rounded-full text-sm shadow-md hover:bg-[#e14a20] transition"
                                                onClick={() => handleCopy("12345-ABCDE")}
                                            >
                                                Copiar
                                            </button>
                                        </div>
                                        {copied && (
                                            <p className="text-green-400 mt-2 text-sm">Ticket Copiado!</p>
                                        )}
                                    </div>
                                </div>

                                <h2 className='text-xs mt-8'>Válido solo para el producto/servicio indicado y hasta la fecha de vencimiento. No reembolsable ni transferible. Al usarlo, aceptas estos términos.</h2>

                            </div>
                        </div>
                    </div>

                    <style jsx>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>
                </div>
                <div className="perspective-[1000px] w-[280px] h-[400px]">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:[transform:rotateY(180deg)]">
                        {/* Front of card */}
                        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-blue-1 text-white p-6">
                            <h2 className="text-xl mb-8 font-bold flex items-center gap-2"><IoTicketOutline className='text-2xl' />  Cupon de descuento </h2>

                            {/* City illustration placeholder */}
                            {/* <div className="h-48 relative">
                                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
                                    <div className="w-20 h-20 border-2 border-white/30 rounded-full"></div>
                                    <div className="w-16 h-28 mx-2 border-2 border-white/30"></div>
                                    <div className="w-12 h-24 border-2 border-white/30"></div>
                                    <div className="w-8 h-40 ml-2 border-2 border-white/30"></div>
                                </div>

                              
                                <div className="absolute bottom-16 right-12 bg-[#FF5722] rounded-full p-2 rotate-45">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            </div> */}

                            {/* Flight details */}
                            <div className='border-dashed border-y-2 border-white flex flex-col py-2 justify-center items-center'>
                                <img
                                    src="/Multimedia/Imagen/images/Ingenieria.png"
                                    alt=""
                                    className='size-52'
                                />
                                <div className="flex justify-between w-full">
                                    <div>
                                        <p className="text-sm text-gray-400">Para:</p>
                                        <h3 className="text-xl font-bold">Gestion</h3>
                                        {/* <p className="text-sm text-gray-400">NAG</p> */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Descuento:</p>
                                        <h3 className="text-xl font-bold">40%</h3>
                                        {/* <p className="text-sm text-gray-400">ATZ</p> */}
                                    </div>
                                </div>

                                {/* <div className=" grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Traveller</p>
                                    <p className="font-medium">1 Adult</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Class</p>
                                    <p className="font-medium">Economy</p>
                                </div>
                            </div> */}
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-400">Ticket valido hasta:</p>
                                <p className="text-white">23 de diciembre de 2024</p>
                            </div>
                        </div>

                        {/* Back of card */}
                        <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-blue-1 text-white p-6">
                            <div className="flex justify-center mx-a items-center mb-8">
                                <img src="/Multimedia/Imagen/logos/CCDLOGOWHITE.png" alt="" className='size-40' />
                            </div>

                            {/* Passenger details */}
                            <div className="flex flex-col justify-center">
                                <div>
                                    <p className="text-sm text-gray-400">Cupon valido hasta: </p>
                                    <p className="text-xl text-white">23 de diciembre de 2024</p>
                                </div>



                                {/* Ticket Number with Copy Functionality */}
                                <div className="mt-6">
                                    <p className="text-sm text-gray-400">Numero de ticket</p>
                                    <div className="flex items-center gap-2">
                                        <p
                                            className="text-xl font-bold bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                                            onClick={() => handleCopy("12345-ABCDE")}
                                        >
                                            12345-ABCDE
                                        </p>
                                        <button
                                            className="bg-[#FF5722] text-white px-3 py-2 rounded-full text-sm shadow-md hover:bg-[#e14a20] transition"
                                            onClick={() => handleCopy("12345-ABCDE")}
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                    {copied && (
                                        <p className="text-green-400 mt-2 text-sm">Ticket Copiado!</p>
                                    )}
                                </div>

                                {/* Barcode */}

                            </div>
                        </div>
                    </div>

                    <style jsx>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>
                </div>
                <div className="perspective-[1000px] w-[280px] h-[400px]">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:[transform:rotateY(180deg)]">
                        {/* Front of card */}
                        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-[#8b1c1c] text-white p-6">
                            <h2 className="text-xl mb-8 font-bold flex items-center gap-2"><IoTicketOutline className='text-2xl' />  Cupon de descuento </h2>

                            {/* City illustration placeholder */}
                            {/* <div className="h-48 relative">
                                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
                                    <div className="w-20 h-20 border-2 border-white/30 rounded-full"></div>
                                    <div className="w-16 h-28 mx-2 border-2 border-white/30"></div>
                                    <div className="w-12 h-24 border-2 border-white/30"></div>
                                    <div className="w-8 h-40 ml-2 border-2 border-white/30"></div>
                                </div>

                              
                                <div className="absolute bottom-16 right-12 bg-[#FF5722] rounded-full p-2 rotate-45">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            </div> */}

                            {/* Flight details */}
                            <div className='border-dashed border-y-2 border-white flex flex-col py-2 justify-center items-center'>
                                <img
                                    src="/Multimedia/Imagen/images/gestion.png"
                                    alt=""
                                    className='size-52'
                                />
                                <div className="flex justify-between w-full">
                                    <div>
                                        <p className="text-sm text-gray-400">Para:</p>
                                        <h3 className="text-xl font-bold">Gestion</h3>
                                        {/* <p className="text-sm text-gray-400">NAG</p> */}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Descuento:</p>
                                        <h3 className="text-xl font-bold">40%</h3>
                                        {/* <p className="text-sm text-gray-400">ATZ</p> */}
                                    </div>
                                </div>

                                {/* <div className=" grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Traveller</p>
                                    <p className="font-medium">1 Adult</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Class</p>
                                    <p className="font-medium">Economy</p>
                                </div>
                            </div> */}
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-400">Ticket valido hasta:</p>
                                <p className="text-white">23 de diciembre de 2024</p>
                            </div>
                        </div>

                        {/* Back of card */}
                        <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-[#8b1c1c] text-white p-6">
                            <div className="flex justify-center mx-a items-center mb-8">
                                <img src="/Multimedia/Imagen/logos/CCDLOGOWHITE.png" alt="" className='size-40' />
                            </div>

                            {/* Passenger details */}
                            <div className="flex flex-col justify-center">
                                <div>
                                    <p className="text-sm text-gray-400">Cupon valido hasta: </p>
                                    <p className="text-xl text-white">23 de diciembre de 2024</p>
                                </div>



                                {/* Ticket Number with Copy Functionality */}
                                <div className="mt-6">
                                    <p className="text-sm text-gray-400">Numero de ticket</p>
                                    <div className="flex items-center gap-2">
                                        <p
                                            className="text-xl font-bold bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                                            onClick={() => handleCopy("12345-ABCDE")}
                                        >
                                            12345-ABCDE
                                        </p>
                                        <button
                                            className="bg-[#FF5722] text-white px-3 py-2 rounded-full text-sm shadow-md hover:bg-[#e14a20] transition"
                                            onClick={() => handleCopy("12345-ABCDE")}
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                    {copied && (
                                        <p className="text-green-400 mt-2 text-sm">Ticket Copiado!</p>
                                    )}
                                </div>

                                {/* Barcode */}

                            </div>
                        </div>
                    </div>

                    <style jsx>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>
                </div>
            </div>
            <div className='mt-3'>
                <h1 className='text-[#D9DADB] text-lg'>Activa</h1>
                <h1 className='text-white text-2xl font-bold'>Promociones Exclusivas</h1>
            </div>
            <div className='h-full w-full grid grid-cols-4 max-md:grid-cols-1 max-2xl:grid-cols-2  gap-14 mt-5'>

                <div className="relative w-full max-w-sm h-fit">
                    {/* Left notch */}
                    <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-r-full" />

                    {/* Right notch */}
                    <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-l-full" />

                    {/* Main coupon card */}
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                        {/* McDonald's Logo */}
                        <div className="w-12 h-12 mr-4">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#FFC72C]">
                                <path
                                    fill="currentColor"
                                    d="M17.243 3.006c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414H6.752z"
                                />
                            </svg>
                        </div>

                        {/* Vertical dashed line */}
                        <div className="w-px h-12 border-l border-dashed border-gray-300 mx-4" />

                        {/* Content */}
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-sm font-medium tracking-wide">
                                MACDONALDS
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">$10</span>
                                <span className="text-sm text-gray-500 font-medium">COUPON</span>
                            </div>
                            <span className="text-xs text-gray-400 mt-1">
                                Valid until 31 March 2019
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative w-full max-w-sm h-fit">
                    {/* Left notch */}
                    <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-r-full" />

                    {/* Right notch */}
                    <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-l-full" />

                    {/* Main coupon card */}
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                        {/* McDonald's Logo */}
                        <div className="w-12 h-12 mr-4">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#FFC72C]">
                                <path
                                    fill="currentColor"
                                    d="M17.243 3.006c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414H6.752z"
                                />
                            </svg>
                        </div>

                        {/* Vertical dashed line */}
                        <div className="w-px h-12 border-l border-dashed border-gray-300 mx-4" />

                        {/* Content */}
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-sm font-medium tracking-wide">
                                MACDONALDS
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">$10</span>
                                <span className="text-sm text-gray-500 font-medium">COUPON</span>
                            </div>
                            <span className="text-xs text-gray-400 mt-1">
                                Valid until 31 March 2019
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative w-full max-w-sm h-fit">
                    {/* Left notch */}
                    <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-r-full" />

                    {/* Right notch */}
                    <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-l-full" />

                    {/* Main coupon card */}
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                        {/* McDonald's Logo */}
                        <div className="w-12 h-12 mr-4">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#FFC72C]">
                                <path
                                    fill="currentColor"
                                    d="M17.243 3.006c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414H6.752z"
                                />
                            </svg>
                        </div>

                        {/* Vertical dashed line */}
                        <div className="w-px h-12 border-l border-dashed border-gray-300 mx-4" />

                        {/* Content */}
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-sm font-medium tracking-wide">
                                MACDONALDS
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">$10</span>
                                <span className="text-sm text-gray-500 font-medium">COUPON</span>
                            </div>
                            <span className="text-xs text-gray-400 mt-1">
                                Valid until 31 March 2019
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative w-full max-w-sm h-fit">
                    {/* Left notch */}
                    <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-r-full" />

                    {/* Right notch */}
                    <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[10px] h-[20px] bg-[#0C0C0C] rounded-l-full" />

                    {/* Main coupon card */}
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                        {/* McDonald's Logo */}
                        <div className="w-12 h-12 mr-4">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-[#FFC72C]">
                                <path
                                    fill="currentColor"
                                    d="M17.243 3.006c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414h-3.439zm-5.246 0c2.066 0 3.742 6.016 3.742 13.437 0 .61-.011 1.212-.033 1.806h.041c1.129 0 2.044-.918 2.044-2.051V3.643c0-1.133-.915-2.051-2.044-2.051h-.015c-.06.799-.296 1.414-.296 1.414H6.752z"
                                />
                            </svg>
                        </div>

                        {/* Vertical dashed line */}
                        <div className="w-px h-12 border-l border-dashed border-gray-300 mx-4" />

                        {/* Content */}
                        <div className="flex flex-col">
                            <span className="text-gray-600 text-sm font-medium tracking-wide">
                                MACDONALDS
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">$10</span>
                                <span className="text-sm text-gray-500 font-medium">COUPON</span>
                            </div>
                            <span className="text-xs text-gray-400 mt-1">
                                Valid until 31 March 2019
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
