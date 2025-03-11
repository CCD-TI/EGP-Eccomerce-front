"use client"
import DataTableUsuario from '@/components/ui/datatable/datatableusuario'
import { environment } from '@/environments/environment';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const [dataproducto, setProducto] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post("/inicio/listaradministrarusuariov2");
                setProducto(response.data.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className='py-3'>
                <DataTableUsuario array={dataproducto} />
            </div>
        </>
    )
}
