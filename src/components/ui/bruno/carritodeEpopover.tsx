"use client";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Divider,
  Badge,
  Image,
} from "@nextui-org/react";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { useCartProductoStore } from "../../../context/cartProducto";
import { IoIosPricetag } from "react-icons/io";
import { environment } from "@/environments/environment";
import { FaTrashAlt } from "react-icons/fa";
import { useCartRutaStore } from "@/context/cartRuta";
import { number } from "zod";
export default function App() {
  const removeProduct = useCartProductoStore((state) => state.removeProduct);
  const removeRuta = useCartRutaStore((state) => state.removeRutaFromCart);  // Función para eliminar rutas del carrito



  // Asegúrate de declarar esta función antes de usarla
const parsePrice = (price: any) => {
  // Si el precio ya es un número, lo retornamos directamente
  if (typeof price === "number") return price;

  // Si es una cadena, limpiamos y convertimos
  const cleanPrice = String(price).replace(/[^0-9.]/g, "");
  return parseFloat(cleanPrice) || 0; // Retornamos 0 si no se puede convertir
};


  const productsInCart = useCartProductoStore((state) => state.cart);
  const rutasInCart = useCartRutaStore((state) => state.cart);  // Obtén las rutas del carrito

    // Combina productos y rutas en un solo array para mostrar en el carrito
    const totalItemsInCart = productsInCart.length + rutasInCart.length;

    // Calcular el total de productos
    const totalProductos = productsInCart.reduce((acc, curso) => acc + parsePrice(curso.Precio), 0);

  
    // Calcular el total de rutas
    const totalRutas = rutasInCart.reduce((acc, ruta) => acc + parsePrice(ruta.PrecioTotal - ruta.descuento), 0);
  
    // Total final del carrito
    const totalFinal = totalProductos + totalRutas;



  const total = productsInCart.reduce(
    (acc, curso) => acc + parsePrice(curso.Precio),
    0
  );

  const cart = useCartProductoStore((state) => state.cart);

  const desc = cart.reduce((acc, curso) => acc + curso.descuento, 0);
  const totald = cart.reduce((acc, curso) => {
    const precio = parsePrice(curso.Precio);
    const descuento = curso.descuento || 0;
    const precioFinal = precio - descuento;
    return acc + precioFinal;
  }, 0);

  // console.log("Rutas Carrito: ", rutasInCart)
  return (
    <Popover placement="bottom" showArrow offset={10} classNames={{ content: "bg-[#FFFFFF]" }}>
      <PopoverTrigger>
        <button className="text-white p-1 rounded-full flex justify-center items-center">
          <Badge content={totalItemsInCart} shape="circle" className="bg-colors-egp-gold text-white border-0">
            <FaCartShopping className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-all" />
          </Badge>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[28rem] mt-[1rem] max-sm:w-[24rem] max-sm:mr-[1rem]">
        {(titleProps) => (
          <div className="flex flex-col gap-4 px-1 py-2 w-full !bg-transparent">
            <p className="text-small font-bold text-[#162E54]" {...titleProps}>
              Tienes {totalItemsInCart} programas en tu carrito
            </p>

            {/* Mostrar productos en el carrito */}
            {productsInCart.length > 0 && (
              <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto text-[#162E54]">
                
                {productsInCart.map((curso: any) => (
                  <div key={curso.IdProducto} className="mt-2 flex flex-row-reverse justify-center p-2 gap-2 w-full shadow-sm">
                    <FaTrashAlt className="h-4 w-4 cursor-pointer" onClick={() => removeProduct(curso)} />

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex gap-2">
                        <div className="w-[20%]">
                          <Image
                            removeWrapper
                            alt=""
                            src={environment.baseUrlStorage + curso.RutaImagen}
                            height={60}
                            width={70}
                            className="rounded-none"
                          />
                        </div>

                        <div className="w-[80%] flex flex-col justify-between">
                          <div className="flex gap-3">
                            <div className="text-sm">
                              {curso.TipoModalidad === "1" && "En vivo"}
                              {curso.TipoModalidad === "2" && "Asincrónico"}
                            </div>
                            <Divider orientation="vertical" className="bg-[#162E54]" />
                            <div className="text-sm text-[#162E54]">{curso.TipoCurso}</div>
                          </div>

                          <div className="text-sm">{curso.fecha}</div>
                          <h1 className="font-bold text-sm">{curso.Curso}</h1>
                          <p className="text-sm text-[#162E54]">Dictado por varios profesores</p>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        {curso.descuento > 0 ? (
                          <>
                            <span className="line-through text-[#162E54]">S/.{curso.Precio}</span>
                            <span className="text-sm text-[#162E54]">S/.{(curso.Precio - curso.descuento).toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-sm text-[#162E54]">S/.{curso.Precio}</span>
                        )}
                      </div>
                      <Divider className="bg-[#162E54]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mostrar rutas en el carrito */}
            {rutasInCart.length > 0 && (
              <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto text-[#162E54]">
                {rutasInCart.map((ruta: any) => (
                  <div key={ruta.IdRuta} className="mt-2 flex flex-row-reverse justify-center p-2 gap-2 w-full shadow-sm">
                    <FaTrashAlt className="h-4 w-4 cursor-pointer" onClick={() => removeRuta(ruta)} />

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex gap-2">
                        <div className="w-[20%]">
                          <Image
                            removeWrapper
                            alt=""
                            src={environment.baseUrlStorage + ruta.ImagenPortada}
                            height={60}
                            width={70}
                            className="rounded-none"
                          />
                        </div>

                        <div className="w-[80%] flex flex-col justify-between">
                          <h1 className="font-bold text-sm">{ruta.Ruta}</h1>
                          <p className="text-sm text-[#162E54]">{ruta.Cursos.length} cursos incluidos</p>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        {ruta.descuento > 0 ? (
                          <>
                            <span className="line-through text-[#162E54]">S/.{ruta.PrecioTotal}</span>
                            <span className="text-sm text-[#162E54]">
                              S/.{(ruta.PrecioTotal - ruta.descuento).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-[#162E54]">S/.{ruta.PrecioTotal.toFixed(2)}</span>
                        )}
                      </div>
                      <Divider className="bg-[#162E54]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total del carrito */}
            <div className="flex justify-center items-center gap-2">
              <h1 className="font-bold text-xl text-[#162E54]">TOTAL:</h1>
              <span className="text-xl text-[#162E54]">S/. {isNaN(totalFinal) ? "0.00" : totalFinal.toFixed(2)}</span>
            </div>

            {/* Botón de acción */}
            {totalItemsInCart > 0 ? (
              <Button onClick={() => (window.location.href = "/pago")} className="w-full bg-[#162E54] text-[#00E8D4]">
                Ir al carrito
              </Button>
            ) : (
              <Link href="/">
                <Button className="w-[20rem] bg-[var(--ccdcolordark)] text-[var(--coloranti)]">Comprar Cursos y Rutas</Button>
              </Link>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
