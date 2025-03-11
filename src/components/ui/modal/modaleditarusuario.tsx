import { environment } from '@/environments/environment';
import { Autocomplete, AutocompleteItem, Button, Input, Card, CardBody, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Tab, Tabs, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { MdModeEdit } from 'react-icons/md'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Key } from "@react-types/shared";
import { RiBroadcastFill } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";
export default function ModalEditarUsuario({ idusuario }: any) {


    
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (key: any) => {
        setSelectedTab(key);
    };

    const [selects, setSelects] = useState({
        cliente: null,
        naturaleza: null,
        tipoProducto: null,
        clasificacion: null,
        categoria: null,
        subCategoria: null,
        modelo: null
    });
    const [data, setData] = useState({
        modelo: [],
        clientes: [],
        naturalezas: [],
        tipoProductos: [],
        clasificaciones: [],
        categorias: [],
        subCategorias: [],
    });
    const [precio, setPrecio] = useState("");


    const handleSelectChange = (key: any, value: any) => {
        setSelects((prevSelects) => ({
            ...prevSelects,
            [key]: value
        }));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesRes] = await Promise.all([
                    api.post("/inicio/listarSelectCliente"),
                ]);

                setData({
                    ...data,
                    clientes: clientesRes.data.data[0],
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Fetch dependent data


    useEffect(() => {
        if (selects.naturaleza && selects.tipoProducto) {
            const fetchClasificaciones = async () => {
                try {
                    const response = await api.post("/inicio/listarSelectClasificacion", {
                        pnaturaleza: selects.naturaleza,
                        ptipoproducto: selects.tipoProducto
                    });
                    setData((prevData) => ({
                        ...prevData,
                        clasificaciones: response.data.data[0],
                    }));
                } catch (error) {
                    console.error("Error fetching Clasificaciones:", error);
                }
            };
            fetchClasificaciones();
        }
    }, [selects.naturaleza, selects.tipoProducto]);

    useEffect(() => {
        if (selects.naturaleza && selects.tipoProducto && selects.clasificacion) {
            const fetchCategorias = async () => {
                try {
                    const response = await api.post("/inicio/listarSelectCategoria", {
                        pnaturaleza: selects.naturaleza,
                        ptipoproducto: selects.tipoProducto,
                        pclasificacion: selects.clasificacion
                    });
                    setData((prevData) => ({
                        ...prevData,
                        categorias: response.data.data[0],
                    }));
                } catch (error) {
                    console.error("Error fetching Categorias:", error);
                }
            };
            fetchCategorias();
        }
    }, [selects.naturaleza, selects.tipoProducto, selects.clasificacion]);

    useEffect(() => {
        if (selects.naturaleza && selects.tipoProducto && selects.clasificacion && selects.categoria) {
            const fetchSubCategorias = async () => {
                try {
                    const response = await api.post("/inicio/listarSelectSubCategoria", {
                        pnaturaleza: selects.naturaleza,
                        ptipoproducto: selects.tipoProducto,
                        pclasificacion: selects.clasificacion,
                        pcategoria: selects.categoria
                    });
                    setData((prevData) => ({
                        ...prevData,
                        subCategorias: response.data.data[0],
                    }));
                } catch (error) {
                    console.error("Error fetching SubCategorias:", error);
                }
            };
            fetchSubCategorias();
        }
    }, [selects.naturaleza, selects.tipoProducto, selects.clasificacion, selects.categoria]);


    useEffect(() => {
        if (selects.naturaleza && selects.tipoProducto && selects.clasificacion && selects.categoria && selects.subCategoria) {
            const fetchModelo = async () => {
                try {
                    const response = await api.post("/inicio/listarSelectModelo", {

                    });
                    setData((prevData) => ({
                        ...prevData,
                        modelo: response.data.data[0],
                    }));
                } catch (error) {
                    console.error("Error fetching SubCategorias:", error);
                }
            };
            fetchModelo();
        }
    }, [selects.naturaleza, selects.tipoProducto, selects.clasificacion, selects.categoria, selects.subCategoria]);


    async function fañadircursosusuario() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Añadir curso a usuario?",
            text: `Desea añadir este curso al usuario?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, añadir"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/fanadircursosusuario", {
                        fprecio: precio,
                        fmodelo_id: selects.modelo,
                        fsubcategoria_id: selects.subCategoria,
                        fusuario_id: idusuario
                    });
                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó el producto de forma exitosa.",
                        icon: "success"
                    })
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear el producto.",
                        icon: "error"
                    });
                }
            }
        });
    }

    const [productosprecio, setproductosprecio] = useState([]);



    useEffect(() => {
        if (isOpen) {
            const load = async () => {
                try {
                    const response = await api.post("/inicio/listarproductospreciov2", {
                    });
                    setproductosprecio(response.data.data[0]);
                } catch (error) {
                    console.error("Error fetching TipoProductos:", error);
                }
            };
            load();
        }
    }, [isOpen]);


    const [key, setValue] = React.useState<Key | null>();
    const [precio1, setprecio1] = React.useState("");

    useEffect(() => {
        if (isOpen && key) {
            const rata: any = productosprecio.find((item: { IdProducto: any }) => item.IdProducto === Number(key));

            if (rata) {
                setprecio1(rata.Precio); // Establece el precio si se encuentra el producto
            } else {
                setprecio1(""); // Reinicia el precio si no se encuentra
            }
        }
    }, [key, isOpen]);


    async function asignarcurso() {


        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Añadir curso a usuario?",
            text: `Desea añadir este curso al usuario?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, añadir"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/asignarcursoadminv2", {
                        fproducto_id:key,
                        fusuario_id:idusuario,
                        fprecio:precio1
                    });
                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se añadio el curso de forma exitosa.",
                        icon: "success"
                    })
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al añadir el curso.",
                        icon: "error"
                    });
                }
            }
        });

       
    }

    return (
        <>
            <MdModeEdit onClick={onOpen} className="cursor-pointer text-2xl" />
            <Modal className="h-[80%]" size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <strong className="text-[var(--color-peru)]">
                                    Editar Usuario
                                </strong>
                            </ModalHeader>
                            <ModalBody className="overflow-auto">
                                <Tabs
                                    disabledKeys={["music"]}
                                    selectedKey={selectedTab}
                                    onSelectionChange={handleTabChange}
                                >
                                    <Tab key="1" title="Permisos">
                                        <Card classNames={{}}>
                                            <CardBody>
                                              
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="2" title="Cursos">
                                        <Card classNames={{}}>
                                            <CardBody className='flex flex-col gap-4'>
                                                <Autocomplete className="" label="Selecciona un curso" selectedKey={key} onSelectionChange={setValue}
                                                >
                                                    {productosprecio.map((item: any) => (
                                                        <AutocompleteItem key={item.IdProducto}>{`${item.TipoModalidad === "En Vivo" ? "En Vivo" : "Asincrónico"} | ${item.Curso}`}</AutocompleteItem>
                                                    ))}
                                                </Autocomplete>
                                                <p className="text-default-500 text-small">Selected: {key}</p>
                                                <Input label="Precio" placeholder="Precio es" value={precio1} onValueChange={setprecio1} />
                                                <Button className='bg-[#006FEE] text-white' onPress={() => { asignarcurso() }}>Asignar Curso</Button>
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </ModalBody>
                            <ModalFooter className="">
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
