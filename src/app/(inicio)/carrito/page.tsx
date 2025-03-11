"use client";
import { BreadcrumbComponent } from "@/components/ui/breadcrumb";
import CardUpdateC from "@/components/ui/bruno/cardUpdateC";
import Modal2 from "@/components/ui/bruno/modal2";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaBook, FaChalkboardUser } from "react-icons/fa6";
import { IoIosPricetag } from "react-icons/io";
import { MdAccessTime, MdShoppingCart } from "react-icons/md";
import { MdChecklistRtl } from "react-icons/md";
import YapeIcon from 'path-to-your-svg/yapeicono.svg';
import { useCartProductoStore } from "@/context/cartProducto";
import { useSession } from "next-auth/react";
import CarritoC from "@/components/ui/bruno/carritodeCpopover"
import PagarSesionComponent from "@/components/ui/bruno/pagarsesion";
import axios from "axios";
import { environment } from "@/environments/environment";



function CarritoCompras() {

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const { data: session } = useSession();

  const [descuento, setDescuento] = useState({ CodigoCupon: '' })

  const [cursos, setCursos] = useState([
    {
      id: 1,
      imagen: "/img/cursos/ejem1.png",
      titulo: "Python Practicando. Desde 0 hasta Desarrollador en Python",
      autor: "Ezio auditore",
      horas: "300HR",
      modalidad: " mixta",
      caracteristicas: ["Varias modalidades", "Diploma"],
      precio: "s/200",
      fecha: "16 de agosto",
    },
    {
      id: 2,
      imagen: "/img/cursos/ejem2.png",
      titulo: "Python Practicando. Desde 0 hasta Desarrollador en Python",
      autor: "Desmond Miles",
      horas: "300HR",
      modalidad: " mixta",
      caracteristicas: ["Python Practicando", "Python Practicando", "Python Practicando"],
      precio: "s/200",
      fecha: "16 de agosto",
    },
    {
      id: 3,
      imagen: "/img/cursos/ejem1.png",
      titulo: "Python Practicando. Desde 0 hasta Desarrollador en Python",
      autor: "Miles Upshur",
      horas: "300HR",
      modalidad: "mixta",
      caracteristicas: ["Python Practicando", "Python Practicando", "Python Practicando"],
      precio: "s/200",
      fecha: "16 de agosto",
    },
    {
      id: 4,
      imagen: "/img/cursos/ejem1.png",
      titulo: "Python Practicando. Desde 0 hasta Desarrollador en Python",
      autor: "Miles Upshur",
      horas: "300HR",
      modalidad: "mixta",
      caracteristicas: ["Python Practicando", "Python Practicando", "Python Practicando"],
      precio: "s/200",
      fecha: "16 de agosto",
    },
    {
      id: 5,
      imagen: "/img/cursos/ejem1.png",
      titulo: "Python Practicando. Desde 0 hasta Desarrollador en Python",
      autor: "Miles Upshur",
      horas: "300HR",
      modalidad: "mixta",
      caracteristicas: ["Python Practicando", "Python Practicando", "Python Practicando"],
      precio: "s/200",
      fecha: "16 de agosto",
    },
  ]);

  // Función para manejar la eliminación de un curso
  const handleRemoveCourse = (id: number) => {
    const updatedCursos = cursos.filter((curso) => curso.id !== id);
    setCursos(updatedCursos);
  };

  // Función para manejar la actualización de la fecha y la modalidad
  const handleUpdateCourse = (id: number, nuevaModalidad: string, nuevaFecha: string) => {
    const updatedCursos = cursos.map((curso) => {
      if (curso.id === id) {
        return { ...curso, modalidad: nuevaModalidad, fecha: nuevaFecha };
      }
      return curso;
    });
    setCursos(updatedCursos);
  };

  const removeProduct = useCartProductoStore(state => state.removeProduct);
  const removeCupon = useCartProductoStore(state => state.removeCupon);

  const cart = useCartProductoStore((state) => state.cart);

  const parsePrice = (price: any) => {
    // Elimina los caracteres no numéricos, incluidos los ceros a la izquierda y el símbolo "S/"
    const cleanPrice = price.replace(/[^0-9.]/g, '');
    // Convierte el precio limpio a un número flotante
    return parseFloat(cleanPrice) || 0;
  };

  // Calcular el total sumando los precios de todos los cursos
  const total = cart.reduce((acc, curso) => acc + parsePrice(curso.Precio), 0);

  const totald = cart.reduce((acc, curso) => {
    const precio = parsePrice(curso.Precio);
    const descuento = curso.descuento || 0; // Asegúrate de que el descuento esté disponible o sea 0 si no lo está
    const precioFinal = precio - descuento; // Si el descuento es un porcentaje (e.g., 0.10 = 10%)


    return acc + precioFinal;
  }, 0);

  const desc = cart.reduce((acc, curso) => acc + curso.descuento, 0);

  const handleApplyCoupon = () => {
    const couponInput = document.getElementById('couponInput') as HTMLInputElement | null;
    if (couponInput) {
      const couponCode = couponInput.value;
      applyCoupon(couponCode);
      couponInput.value = '';

    } else {
      console.error('El input de cupón no fue encontrado');
    }
  };


  const addCupon = useCartProductoStore((state) => state.addCupon);


  const applyCoupon = async (couponCode: string) => {
    try {
      const response = await api.post('/inicio/buscarCupon', {
        fcupon: couponCode,
      });

      // Verifica que la respuesta tenga datos válidos
      if (response.data && response.data.data && response.data.data[0] && response.data.data[0][0]) {
        const cuponData = response.data.data[0][0];

        setDescuento(cuponData);
        addCupon(cuponData.CodigoCupon, cuponData.Descuento, cuponData.TipoDescuento);
      } else {
        // Si no hay datos válidos, mostrar un mensaje de error o manejar el caso
        alert('El cupón ingresado no es válido');
      }
    } catch (error) {
      console.error('Error al aplicar el cupón:', error);
    }
  };



  return (
    <>
      <div className="h-[100%] w-full  items-center flex flex-col gap-5 py-10  justify-center  ">
        <div className="w-[90%] h-full flex flex-col gap-5">
          <BreadcrumbComponent />
          <div className="flex max-2xl:flex-col w-full h-full justify-center  gap-[8rem] max-2xl:gap-[2rem] ">
            <div className="flex h-full flex-col gap-8  w-[70%] max-2xl:w-full">
              <div className="flex gap-3 w-full">
                <h1>
                  <span className="text-4xl text-white font-extrabold">Carrito</span>
                  <span className='text-4xl text-white'> de comp</span>
                  <span className='text-4xl underline text-white  decoration-[white] decoration-4 underline-offset-4'>ras</span>
                </h1>
              </div>
              <div className="w-full flex flex-col gap-6 text-white">
                <span className="text-white"><span className="font-bold">{cart.length}</span> programas en el carrito</span>
                {cart.map((curso) => (
                  <div
                    key={curso.IdProducto}
                    className="backdrop-blur-sm shadow-md flex flex-row   justify-between p-6 rounded-xl bg-white"
                  >
                    <div className="flex gap-6 max-sm:flex-col">
                      <img
                        alt={""}
                        src={environment.baseUrlStorage + curso.RutaImagen}
                       
                        className="h-full w-full !rounded-none"
                      />
                      <div className="flex flex-col gap-[4px]">
                        <span className="text-[17px] text-[#162D53] font-bold">{curso.Curso}</span>

                        <div className="w-[10rem] p-[4px] flex flex-row-reverse justify-end gap-2 items-center">
                          <h1 className="text-xs text-[#162E54]">Modalidad: 
                            {curso.TipoCurso == '1' ? (<span className="text-[#FF0000]"> Online</span>) : ''}
                            {curso.TipoCurso == '2' ? (<span className="text-[#818181]"> Mixto</span>) : ''}
                            {curso.TipoCurso == '3' ? (<span className="text-[#00BD12]"> Asincrónico</span>) : ''}
                          </h1>
                          <FaBook className="text-[#3185F7]"/>
                        </div>
                        <span className="text-[10px] text-[#162D53]"> {curso.fecha}</span>
                        <span className="text-[10px] text-[#162D53]"> por varios profesores</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between px-2">
                      <button
                        className="flex justify-end"
                        onClick={() => removeProduct(curso)}
                      >
                        <XMarkIcon className="w-[1.5rem] text-black" />
                      </button>
                      <div className="flex gap-[8px]">
                        <IoIosPricetag className="h-6 text-blue-600" />
                        {curso.descuento > 0 ?
                          (<><span className="line-through text-[#122544]">S/{curso.Precio}</span>
                            <span className="text-[#122544]">S/{curso.Precio - curso.descuento}</span></>)
                          : (<><span className="text-[#122544]" >S/{curso.Precio}</span>
                          </>)
                        }

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            <div className="flex  flex-col-reverse 2xl:flex-row gap-8 w-[30%]  max-2xl:w-full ">

              <div className="flex flex-col  gap-6   w-full ">
                <div className="bg-white/20 shadow-md py-[3rem] rounded-xl w-full text-center px-[4rem]">
                  <div>
                    <span className="text-white">Total:</span>
                  </div>
                  <div>
                    <div className="flex flex-col gap-1 text-white">
                      {desc > 0 ?
                        (<><span className="text-4xl font-bold">S/{totald.toFixed(2)}</span><span className="text-4xl line-through font-bold">S/{total}</span></>
                        )
                        :
                        (<span className="text-4xl font-bold">S/{total}</span>
                        )}
                    </div>
                    <hr className="border-t-3 border-gray-300 my-4" />
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between flex-col gap-3 text-white">
                        Descuento
                      </div>

                      <div className="flex flex-col gap-2 ">
                        <div className="flex justify-between items-center gap-[4px] p-[4px] border-dashed border-2 border-white">
                          <div className="flex flex-col">
                            {descuento.CodigoCupon !== "" ?
                              (<>
                                <span className="text-white">{descuento.CodigoCupon}</span>
                              </>)
                              :
                              (<>
                                <span className="text-white">Introduce tu codigo de descuento</span>
                              </>)}

                          </div>
                          <div onClick={() => {
                            setDescuento({ CodigoCupon: "" });
                            removeCupon(descuento.CodigoCupon);
                          }} className="flex items-center">
                            <XMarkIcon className="w-[2rem] text-white" />
                          </div>
                        </div>

                        <div className="flex border-2 border-white  rounded-xl p-2">
                          <input
                            id="couponInput"
                            type="search"
                            className=" w-full  p-2 focus:border-green-500 focus:outline-none bg-transparent"
                            placeholder="Ejemplo: PYCMCH2523"
                          />
                          <button onClick={handleApplyCoupon} className="bg-[#00EADE] text-[#162D53] border-solid p-2 rounded-xl font-bold px-5">
                            Aplicar
                          </button>
                        </div>
                      </div>
                      {session?.user ? (<Link href="/carrito/compra">
                        <button className="rounded-xl text-[#162D53] w-full px-8 py-4 bg-white  transition-colors">
                          Comprar ahora
                        </button>
                      </Link>) : (<PagarSesionComponent array={{}} />)}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default CarritoCompras;
