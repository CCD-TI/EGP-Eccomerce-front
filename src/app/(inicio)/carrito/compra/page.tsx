"use client"
import { BreadcrumbComponent } from '@/components/ui/breadcrumb'
import Modal2 from '@/components/ui/bruno/modal2'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { Button, Checkbox, Divider, Image, Input, useDisclosure } from '@nextui-org/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { CiCreditCard1 } from 'react-icons/ci'
import { FaBasketShopping, FaChalkboardUser } from 'react-icons/fa6'
import { IoIosPricetag } from 'react-icons/io'
import { MdAccessTime } from "react-icons/md"
import { MdChecklistRtl } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import ButtonB from '@/components/ui/bruno/buttonsBorder'
import ModalP from "@/components/ui/bruno/modalP"
import { useCartStore } from '@/context/cartStore'
import { environment } from '@/environments/environment'


export default function CarritoCompras() {



    const [selecterms, setSelectTerms] = React.useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const parsePrice = (price: any) => {
        // Elimina los caracteres no numéricos, incluidos los ceros a la izquierda y el símbolo "S/"
        const cleanPrice = price.replace(/[^0-9.]/g, '');
        // Convierte el precio limpio a un número flotante
        return parseFloat(cleanPrice) || 0;
    };

    const { cart } = useCartStore((state) => state);
    const total = cart.reduce((acc, curso) => acc + parsePrice(curso.Precio), 0);
    const productsInCart = useCartStore(state => state.cart);
    const totald = cart.reduce((acc, curso) => {
        const precio = parsePrice(curso.Precio);
        const descuento = curso.descuento || 0; // Asegúrate de que el descuento esté disponible o sea 0 si no lo está
        const precioFinal = precio - descuento; // Si el descuento es un porcentaje (e.g., 0.10 = 10%)
        return acc + precioFinal;
    }, 0);



    return (
        <>

            <div className='h-full w-[100%] mx-auto py-8 flex justify-center '>
                <div className='h-full w-[60%] flex flex-col  justify-center gap-7 '>
                    <BreadcrumbComponent />

                    <div className='flex max-sm:flex-col-reverse justify-center flex-row gap-14'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col justify-center items-center gap-4  rounded-xl'>
                                <div className='flex flex-col gap-4 p-6 justify-center   rounded-xl bg-white/20 shadow-md'>
                                    <div className='flex items-center justify-between'>

                                        <FaBasketShopping className='h-8 w-8 text-white' />

                                        <div className='flex flex-col text-xs   '>
                                            <h1 className='text-white'>Numero de pedido</h1>
                                            <span className='text-white'>8545213</span>
                                        </div>
                                    </div>
                                    <hr className="border-t-2  border-white " />


                                    <ButtonB total1={totald.toFixed(2)} selecterms={selecterms} array={productsInCart} />



                                    <div className='flex  justify-center '>


                                    </div>
                                </div>


                            </div>

                        </div>

                        <div className='flex h-full flex-col gap-6  text-white bg-white/20 p-6 rounded-xl'>

                            <div className='py-4 '>
                                <span className='text-3xl font-bold'>Resumen:</span>
                            </div>
                            <div className=' h-full'>

                                <div className='flex flex-col gap-8 justify-center'>


                                    <div className='flex flex-col gap-2'>
                                        <div className='flex justify-between'>
                                            <span>Precio</span>
                                            <span>S/.{total}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Descuento</span>
                                            <span>S/.{(total - totald).toFixed(2)}</span>
                                        </div>
                                        <hr className="border-t border-gray-300 " />
                                        <div className='flex justify-between font-bold'>
                                            <span className=' text-2xl'>Total</span>
                                            <span className=' text-2xl'>S/.{totald.toFixed(2)}</span>
                                        </div>
                                        <div className='flex flex-col gap-[4px] py-3'>
                                            <span className='text-xs'>
                                                Al completar su compra, usted acepta estos
                                                <a className="text-xs underline" href="#" onClick={onOpen}>
                                                    <br />Términos de servicio.
                                                </a>
                                                <ModalP isOpen={isOpen} onOpenChange={onOpenChange} />

                                            </span>
                                        </div>
                                        <div>
                                            <span className=' text-xl font-semibold'>Detalles del pedido</span>
                                            <Divider />
                                            {productsInCart.map((curso) => (
                                                <div key={curso.id} className="mt-2 flex flex-row-reverse justify-center p-2 gap-2 w-full rounded-xl shadow-sm ">

                                                    <div className="flex flex-col gap-2 w-full">
                                                        <div className="flex gap-2 justify-between">

                                                            <Image
                                                                alt=""
                                                                src={environment.baseUrlStorage + curso.RutaImagen}
                                                                height={60}
                                                                width={70}
                                                                className='rounded-none'
                                                            />

                                                            <div className="w-[80%] flex flex-col justify-between ">
                                                                <div className="flex gap-3">
                                                                    <div className="text-tiny">
                                                                        {curso.tipoProducto == '1' ? 'En vivo' : ''}
                                                                        {curso.tipoProducto == '2' ? 'Asincrónico' : ''}
                                                                        {curso.tipoProducto == '3' ? 'Mixto' : ''}
                                                                    </div>
                                                                    <Divider orientation="vertical" className='bg-white' />
                                                                    <div className="text-tiny">
                                                                        {curso.Clasificacion}
                                                                    </div>
                                                                </div>
                                                                <div className="text-tiny">
                                                                    {curso.fecha}

                                                                </div>
                                                                <h1 className="font-bold text-sm">{curso.Modelo}</h1>
                                                                <p className="text-tiny">Dictado por varios profesores</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-[8px] justify-end">
                                                            <IoIosPricetag className="h-6 text-blue-600" />
                                                            {curso.descuento > 0 ?
                                                                (<><span className="line-through">S/{curso.Precio}</span>
                                                                    <span>S/{curso.Precio - curso.descuento}</span></>)
                                                                : (<><span>S/{curso.Precio}</span>
                                                                </>)
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    <div>

                                    </div>

                                </div>
                            </div>



                        </div>
                    </div>






                </div>
            </div>
        </>
    )
}

