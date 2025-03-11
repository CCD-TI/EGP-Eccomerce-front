"use client"
import { BreadcrumbCatComponent } from '@/components/ui/breadcrumblacat';
import { environment } from '@/environments/environment';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });

    const [caja1, setCaja1] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Realiza la solicitud POST con el valor correcto de pcategoria
                const response = await api.post("/inicio/listarproductoscatalogo", {
                });
                // Actualiza el estado con la respuesta de la API
                setCaja1(response.data.data[0]);
            } catch (error) {
                // Maneja errores aquí
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="w-[80%] m-auto py-6 flex flex-col gap-8">
            <BreadcrumbCatComponent />
            <h1>
                <span className=" text-4xl text-[var(--ccdcolordark)] font-extrabold">Nuestros</span>
                <span className='text-4xl text-[var(--ccdcolordark)]'> Curs</span>
                <span className='text-4xl underline text-[var(--ccdcolordark)]  decoration-[var(--ccdcolordark)] decoration-4 underline-offset-4 '>os</span>
            </h1>
            <div className=" grid grid-cols-3 gap-10  ">
                {caja1.map((item, index) => {

                    return (
                        <Card shadow="sm" key={index} isPressable >
                            <Link href={{
                                pathname: `/catalogo/Cursos y Diplomas/${item.Modelo}`, query: {
                                    iu: item.IdProducto
                                }
                            }}
                                className='w-full h-full'>
                                <CardBody className="overflow-visible p-0">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        className="w-full object-cover h-[140px]"
                                        src={environment.baseUrlStorage + item.RutaImagen}
                                    />
                                </CardBody>
                                <CardFooter className="justify-center  py-5">
                                    <b className="text-sm">{item.Modelo}</b>
                                </CardFooter>
                            </Link>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
