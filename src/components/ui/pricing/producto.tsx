"use client"
import { useCartStore } from '@/context/cartStore'
import { useCourseStore } from '@/context/cursodetalle';
import { environment } from '@/environments/environment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { IoIosHeart } from 'react-icons/io'
import { LuBookMarked } from 'react-icons/lu'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image, useDisclosure, Skeleton, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from 'axios';

export default function ProductoComponent({ array }: any) {

    const [modalidad, setmodalidad] = useState<any>("");
    const [idprod, setidprod] = useState<any>("");

    const router = useRouter();
    const addProductToCart = useCartStore((state) => state.addProductTocart);
    const removeProductFromCart = useCartStore((state) => state.removeProduct);
    const cart = useCartStore((state) => state.cart);
    const isInCart = cart.some((item) => item.id === array.id);

    const Comprar = () => {
        const nuevoarray = { ...array, tipoProducto: modalidad,idprod:idprod };

        addProductToCart(nuevoarray)
        router.push('/carrito');
    };

    const handleCartToggle = () => {
        const nuevoarray = { ...array, tipoProducto: modalidad,idprod:idprod };

        if (isInCart) {
            removeProductFromCart(nuevoarray); 
        } else {
            addProductToCart(nuevoarray)
        }
    };

    const setCourseData = useCourseStore((state) => state.setCourseData); // Obtener la función para actualizar el estado

    const handleCourseDetailNavigation = () => {
        // Almacenar los datos en el estado de Zustand
        setCourseData(array.Clasificacion, array.IdModelo,0,0);
        // Luego, navegar a la página de detalles
        router.push(`/cursodetalle/${array.Modelo}`);
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const [selects, setSelects] = useState({
        tipoProducto: 1,
        fecha: null

    });

    const handleSelectChange = (key: any, value: any) => {
        setSelects((prevSelects) => ({
            ...prevSelects,
            [key]: value
        }));
    };

    const [dataSelectTipoDocumento, setdataSelectTipoDocumento] = React.useState([]);
    const [dataSelectFecha, setdataSelectFecha] = React.useState([]);


    console.log(JSON.stringify(array))

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });


    useEffect(() => {

        const fetchProductosTotal = async () => {
            try {
                const response = await api.post('/inicio/rellenarcarritodatos', {
                    fmodelo: array.Modelo,
                    fclasificacion: array.Clasificacion,
                    fprecio:array.Precio
                });
                

                if (response.data.ok) {
                    setdataSelectTipoDocumento(response.data.data[0]);
                    
                    setmodalidad(response.data.data[0][0].IdTipoProducto)
                    setidprod(response.data.data[0][0].IdProducto)
                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProductosTotal()
    }, [])

    useEffect(() => {

        const fetchProductosTotal = async () => {
            try {
                console.log('eee' + selects.tipoProducto)
                const response = await api.post('/inicio/obtenerFechasCurso', {
                    fmodelo: array.Modelo,
                    fclasificacion: array.Clasificacion,
                    ftipoproducto: selects.tipoProducto
                });


                if (response.data.ok) {
                    setdataSelectFecha(response.data.data[0]);
                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProductosTotal()
    }, [selects.tipoProducto])

   
    return (
        <>
            <div className='h-full w-full rounded-2xl'>
                <div className="mx-auto   flex flex-col items-center  rounded-xl overflow-hidden">
                    <div className="bg-muted h-[14rem] flex w-full flex-col items-center relative cursor-pointer">
                        <div className='w-full h-[100%]' onClick={handleCourseDetailNavigation}>
                            <Image
                                removeWrapper
                                alt="Card example background"
                                className="z-0 w-full h-[100%] !rounded-none "
                                src={environment.baseUrlStorage + array.RutaImagen}
                            />
                        </div>
                        <Button className="text-tiny absolute right-2 top-2 bg-[#00EADE] rounded-xl text-[#162E54] font-semibold" color="primary" radius="none" size="sm">
                            {array.Clasificacion}
                        </Button>
                    </div>
                    <div className="w-[100%] h-[13rem] p-4 flex flex-col justify-between gap-4 bg-white/20 shadow-lg relative  ">
                        <div className='h-full flex flex-col gap-4 '>
                            <div className=''><h1 className=' flex items-center h-full font-bold text-white rounded-md '>{array.Modelo}</h1></div>
                            <div className=' flex gap-1'>
                                <span className='flex gap-1 text-sm font-bold text-white justify-center items-center'><LuBookMarked />{array.Cont1} Módulos</span>
                                {/*<span className='flex gap-1 text-sm font-bold text-white justify-center items-center'><GoClock />{array.Cont3} Horas</span>*/}
                            </div>
                        </div>
                        <div className='flex w-full justify-between'>
                            <div className='flex relative  justify-between'>
                                <Button onClick={Comprar} className="text-tiny flex gap-3 px-5 bg-[#00EADE] text-[#162E54] w-full min-w-[9rem]" color="primary" radius="sm" size="sm">
                                    <p className='text-sm font-bold text-[#162E54]'>S/.{array.Precio}</p>
                                </Button>
                                <h1 className="text-tiny  w-full flex gap-3 absolute top-[-20px] right-0"  >
                                    <p className='text-sm line-through w-full font-bold text-white'>Antes: S/.{(Number(array.Precio) + Number(array.Precio * 0.30)).toFixed(2)}</p>
                                </h1>
                            </div>
                            <div className='flex  gap-1 justify-end'>
                                <Button className="bg-[#00EADE] text-[#162E54] text-tiny w-[20%] min-w-[2.3rem]" color="primary" radius="sm" size="sm">
                                    <IoIosHeart className='text-2xl' />
                                </Button>
                                <Button
                                    onClick={handleCartToggle} // Alternar el estado
                                    className="bg-[#00EADE] text-[#162E54] text-tiny w-[20%] min-w-[2.3rem]"
                                    color="primary"
                                    radius="sm"
                                    size="sm"
                                >
                                    {isInCart ? <FaCheck className='text-2xl' /> : <FaShoppingCart className='text-2xl' />}
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comprar Curso</ModalHeader>
                            <ModalBody>
                                <form action="" className='flex flex-col gap-7'>
                                    <Autocomplete
                                        label="Modalidad"
                                        variant="bordered"
                                        defaultItems={dataSelectTipoDocumento}
                                        placeholder="Seleccionar la opción"
                                        selectedKey={selects.tipoProducto}
                                        onSelectionChange={(value) => handleSelectChange("tipoProducto", value)}
                                    >
                                        {(item: any) => (
                                            <AutocompleteItem key={item.IdTipoProducto} value={item.IdTipoProducto}>
                                                {`${item.Nombre}`}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                    {selects.tipoProducto == 2 ? (<> <Autocomplete
                                        label="Fechas"
                                        variant="bordered"
                                        placeholder="Seleccionar la opción"
                                        selectedKey={selects.fecha}
                                        onSelectionChange={(value) => handleSelectChange("fecha", value)}
                                    >
                                        <AutocompleteItem key={"Inmmediato"} value={"Inmmediato"}>
                                            {`${"Inmmediato"}`}
                                        </AutocompleteItem>

                                    </Autocomplete></>) : (<Autocomplete
                                        label="Fechas"
                                        variant="bordered"
                                        defaultItems={dataSelectFecha}
                                        placeholder="Seleccionar la opción"
                                        selectedKey={selects.fecha}
                                        onSelectionChange={(value) => handleSelectChange("fecha", value)}
                                    >
                                        {(item: any) => (
                                            <AutocompleteItem key={item.Fecha} value={(item.Fecha)}>
                                                {`${item.Fecha}`}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>)}


                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" >
                                    Comprar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}
