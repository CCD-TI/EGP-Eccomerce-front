"use client";
import React, { useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Divider, Badge, Image } from "@nextui-org/react";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { useCartProductoStore } from '../../../context/cartProducto';
import { IoIosPricetag } from "react-icons/io";
import { environment } from "@/environments/environment";
import { FaTrashAlt } from "react-icons/fa";

export default function App() {
    const removeProduct = useCartProductoStore(state => state.removeProduct);
    const productsInCart = useCartProductoStore(state => state.cart);

    const parsePrice = (price: any) => {
        const cleanPrice = String(price).replace(/[^0-9.]/g, ''); // Asegúrate de que sea una cadena
        return parseFloat(cleanPrice) || 0; // Convierte a número flotante
    };
    

    const total = productsInCart.reduce((acc, curso) => acc + parsePrice(curso.Precio), 0);

    const cart = useCartProductoStore((state) => state.cart);

    const desc = cart.reduce((acc, curso) => acc + curso.descuento, 0);
    const totald = cart.reduce((acc, curso) => {
        const precio = parsePrice(curso.Precio);
        const descuento = curso.descuento || 0;
        const precioFinal = precio - descuento;
        return acc + precioFinal;
    }, 0);
    return (
        <Popover placement="bottom" showArrow offset={10} classNames={{ "content": "bg-[#FFFFFF]  !rounded-none" }}>
            <PopoverTrigger>
                <button className="text-white  p-1 rounded-full flex justify-center items-center">
                    <Badge content={productsInCart.length} shape="circle" className='bg-[#006FEE] text-white border-0'>
                        <FaCartShopping className="w-6 h-6 text-white text-3xl" />
                    </Badge>

                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[28rem] mt-[1rem]  max-sm:w-[24rem]   max-sm:mr-[1rem]"  >
                {(titleProps) => (
                    <div className="flex flex-col gap-4 px-1 py-2 w-full !bg-transparent">
                        <p className="text-small font-bold text-[#162E54]" {...titleProps}>
                            Tienes {productsInCart.length} programas en tu carrito
                        </p>
                        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto text-[#162E54]">
                            {productsInCart.length < 1 ? 'Aún no hay ningun elemento añadido' : ''}
                            {productsInCart.map((curso) => (
                                <div key={curso.IdProducto} className="mt-2 flex flex-row-reverse justify-center p-2 gap-2 w-full  shadow-sm ">

                                    <FaTrashAlt className="h-4 w-4 cursor-pointer"
                                        onClick={() => removeProduct(curso)} />

                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex gap-2">
                                            <div className="w-[20%] ">
                                                <Image
                                                    removeWrapper
                                                    alt=""
                                                    src={environment.baseUrlStorage + curso.RutaImagen}
                                                    height={60}
                                                    width={70}
                                                    className="rounded-none"
                                                />
                                            </div>
                                            <div className="w-[80%] flex flex-col justify-between ">
                                                <div className="flex gap-3">
                                                    <div className="text-sm">
                                                        {curso.TipoModalidad == '1' ? 'En vivo' : ''}
                                                        {curso.TipoModalidad == '2' ? 'Asincrónico' : ''}
                                                    </div>                                                  
                                                    <Divider orientation="vertical"  className="bg-[#162E54]"/>
                                                    <div className="text-sm text-[#162E54]">
                                                        {curso.TipoCurso}
                                                    </div>
                                                </div>
                                                <div className="text-sm">
                                                        {curso.fecha}
                                                     
                                                    </div> 
                                                <h1 className="font-bold text-sm">{curso.Curso}</h1>
                                                <p className="text-sm text-[#162E54]">Dictado por varios profesores</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-[8px] justify-end">
                                            {curso.descuento > 0 ?
                                                (<><span className="line-through text-[#162E54]">S/.{curso.Precio}</span>
                                                    <span className="text-sm text-[#162E54]">S/.{curso.Precio - curso.descuento}</span></>)
                                                : (<><span className="text-sm text-[#162E54]">S/.{curso.Precio}</span>
                                                </>)
                                            }

                                        </div>
                                        <Divider className="bg-[#162E54]" />

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col mx-auto gap-4">
                            <div className="flex justify-center items-center gap-2">
                                <h1 className="font-bold text-xl text-[#162E54]">TOTAL: </h1>

                                {desc > 0 ?
                                    (<><span className="text-xl text-[#162E54]">S/.{totald.toFixed(2)}</span><span className="text-xl line-through">S/.{total}</span></>
                                    )
                                    :
                                    (<span className="text-xl text-[#162E54]">S/.{total}</span>
                                    )}

                            </div>
                            {productsInCart.length == 0 ? (<Link href="/"><Button className="w-[20rem] bg-[var(--ccdcolordark)] text-[var(--coloranti)]">
                                Comprar Cursos
                            </Button></Link>) : (<Link href="/pago"><Button className="w-[20rem] bg-[#162E54] text-[#00E8D4]">
                                Ir al carrito
                            </Button></Link>)}



                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
