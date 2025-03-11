"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Table } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import TableProductoComponent from "@/components/ui/table/tableproducto";
import axios from "axios";
import { environment } from "@/environments/environment";


export default function TabGestionEquipo() {
    const { data: session } = useSession();
    const [selectedTab, setSelectedTab] = useState(1); // Estado para el índice de la pestaña seleccionada
    const [dataproducto, setProducto] = useState([]);
    const [datatipoproducto, setTipoProducto] = useState([]);
    const [dataclasificacion, setClasificacion] = useState([]);

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post("/inicio/listaradministrarcursosv2");
                setProducto(response.data.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);




    const handleTabChange = async (key: any) => {
        setSelectedTab(key);
        let response;

        switch (Number(key)) {
            case 1:
                break;
            case 2:
                if (datatipoproducto.length === 0) {
                    response = await api.post("/inicio/listarTableTipoProducto", {
                    });
                    setTipoProducto(response.data.data[0]);
                } else {
                }
                break;
            case 3:
                if (dataclasificacion.length === 0) {
                    response = await api.post("/inicio/listarTableClasificacion", {

                    });
                    setClasificacion(response.data.data[0]);


                } else {
                }
                break;
            case 4:
                if (dataproducto.length === 0) {
                    response = await api.post("/inicio/listarAdministrarCursos", {

                    });
                    setProducto(response.data.data[0]);


                } else {
                }
                break;
            case 5:
                if (dataproducto.length === 0) {
                    response = await api.post("/inicio/listarAdministrarCursos", {

                    });
                    setProducto(response.data.data[0]);


                } else {
                }
                break;
        }
    };

    return (
        <div className="flex w-full flex-col py-6">
            <div className="w-[90%] m-auto ">
                <Tabs
                    disabledKeys={["music"]}
                    selectedKey={selectedTab}
                    onSelectionChange={handleTabChange}
                >
                    <Tab key="1" title="Equipo">
                        <Card>
                            <CardBody>
                                <TableProductoComponent array={dataproducto} />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
