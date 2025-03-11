"use client";
import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Autocomplete,
    AutocompleteItem,
    Tabs,
    Tab,
    Card,
    CardBody,
    Divider,
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@nextui-org/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import axios from "axios";
import { environment } from "@/environments/environment";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ModalCrearCursoComponent() {
    const { data: session } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTab, setSelectedTab] = useState(0);

    const [value, setValue] = useState("");
    const [selects, setSelects] = useState({
        cliente: null,
        escuela: null,
        especializacion: null,
        curso: null,
        tipocurso: null,



        naturaleza: null,
        tipoProducto: null,
        clasificacion: null,
        categoria: null,
        subCategoria: null,
        modelo: null
    });
    const [data, setData] = useState({
        clientes: [],
        escuelas: [],
        especializaciones: [],
        cursos: [],
        tipocursos: [],

        modelo: [],
        naturalezas: [],
        tipoProductos: [],
        clasificaciones: [],
        categorias: [],
        subCategorias: [],
    });

    const [nuevaEscuela, setnuevaEscuela] = useState("");
    const [activacionEscuela, setactivacionEscuela] = useState(false);
    const [nuevaEspecializacion, setnuevaEspecializacion] = useState("");
    const [activacionEspecializacion, setactivacionEspecializacion] = useState(false);
    const [nuevoCurso, setnuevoCurso] = useState("");
    const [activacionCurso, setactivacionCurso] = useState(false);



    const [nuevaClasificacion, setnuevaClasificacion] = useState("");
    const [nuevaCategoria, setnuevaCategoria] = useState("");
    const [nuevaSubCategoria, setnuevaSubCategoria] = useState("");
    const [nuevoModelo, setnuevoModelo] = useState("");

    const [activacionClasificacion, setactivacionClasificacion] = useState(false);
    const [activacionCategoria, setactivacionCategoria] = useState(false);
    const [activacionSubCategoria, setactivacionSubCategoria] = useState(false);
    const [activacionModelo, setactivacionModelo] = useState(false);

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });

    // Fetch data for dropdowns
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesRes] = await Promise.all([
                    api.post("/inicio/listarclientev2"),
                ]);
                const [escuelasRes] = await Promise.all([
                    api.post("/inicio/listarescuelav2"),
                ]);
                const [tipocursosRes] = await Promise.all([
                    api.post("/inicio/listartipocursov2"),
                ]);
                setData({
                    ...data,
                    clientes: clientesRes.data.data[0],
                    escuelas: escuelasRes.data.data[0],
                    tipocursos: tipocursosRes.data.data[0],

                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // Fetch dependent data
    useEffect(() => {

        const fetchTipoProductos9 = async () => {
            try {
                const response = await api.post("/inicio/listarescuelav2", {
                });
                console.log(JSON.stringify(response.data.data[0]))
                setData((prevData) => ({
                    ...prevData,
                    escuelas: response.data.data[0],
                }));
            } catch (error) {
                console.error("Error fetching TipoProductos:", error);
            }
        };
        fetchTipoProductos9();

    }, [activacionCurso]);

    useEffect(() => {
        if (selects.escuela) {
            const fetchTipoProductos = async () => {
                try {
                    const response = await api.post("/inicio/listarespecializacionxescuelav2", {
                        fescuela_id: selects.escuela
                    });
                    setData((prevData) => ({
                        ...prevData,
                        especializaciones: response.data.data[0],
                    }));
                } catch (error) {
                    console.error("Error fetching TipoProductos:", error);
                }
            };
            fetchTipoProductos();
        }
    }, [selects.escuela, activacionEspecializacion]);

    useEffect(() => {
        if (selects.escuela && selects.especializacion && selects.tipocurso && selects.cliente) {
            const fetchClasificaciones = async () => {
                try {
                    const response = await api.post("/inicio/listarcursoxespecializacionv2", {
                        fespecializacion_id: selects.especializacion,
                        ftipocurso_id: selects.tipocurso,
                        fcliente_id: selects.cliente,
                    });
                    setData((prevData) => ({
                        ...prevData,
                        cursos: response.data.data[0],
                    }));
                } catch (error) {
                    console.error("Error fetching Clasificaciones:", error);
                }
            };
            fetchClasificaciones();
        }
    }, [selects.escuela, selects.especializacion, selects.tipocurso, selects.cliente, activacionCurso]);



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
    }, [selects.naturaleza, selects.tipoProducto, selects.clasificacion, activacionCategoria]);
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
    }, [selects.naturaleza, selects.tipoProducto, selects.clasificacion, selects.categoria, activacionSubCategoria]);
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
    }, [selects.naturaleza, selects.tipoProducto, selects.clasificacion, selects.categoria, selects.subCategoria, activacionModelo]);
    
    const handleTabChange = (key: any) => {
        setSelectedTab(key);
    };
    const handleSelectChange = (key: any, value: any) => {
        setSelects((prevSelects) => ({
            ...prevSelects,
            [key]: value
        }));
    };

    async function fnuevaEscuela() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nueva escuela",
            text: `Desea crear nueva escuela: ${nuevaEscuela}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearescuelav2", {
                        fescuela: nuevaEscuela,
                    });

                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó la escuela de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setactivacionEscuela(!activacionEscuela)
                        }
                    });
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear la escuela.",
                        icon: "error"
                    });
                }
            }
        });
    }
    async function fnuevaEspecializacion() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nueva especializacion",
            text: `Desea crear nueva especializacion: ${nuevaEspecializacion}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearespecializacionv2", {
                        fescuela_id: selects.escuela,
                        fespecializacion: nuevaEspecializacion,
                    });

                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó la especializacion de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setactivacionEspecializacion(!activacionEspecializacion)
                        }
                    });
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear la especializacion.",
                        icon: "error"
                    });
                }
            }
        });
    }
    async function fnuevoCurso() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nuevo curso",
            text: `Desea crear nuevo curso: ${nuevoCurso}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearcursov2", {
                        fcurso: nuevoCurso,
                        ftipocurso_id: selects.tipocurso,
                        fespecializacion_id: selects.especializacion,
                        fcliente_id: selects.cliente,
                    });

                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó el curso de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setactivacionCurso(!activacionCurso)
                        }
                    });
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear el curso.",
                        icon: "error"
                    });
                }
            }
        });
    }
    async function fcrearcurso() {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: "Crear nuevo producto?",
            text: `Desea crear un nuevo producto`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearproductov2", {
                        fcurso_id: selects.curso
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


    async function fnuevaClasificacion() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nueva clasificación",
            text: `Desea crear nueva clasificación: ${nuevaCategoria}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearClasificacion", {
                        ftipoproducto_id: selects.tipoProducto,
                        fclasificacion: nuevaClasificacion
                    });

                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó la clasificación de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setactivacionClasificacion(!activacionClasificacion)
                        }
                    });
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear la clasificación.",
                        icon: "error"
                    });
                }
            }
        });
    }

    async function fnuevaCategoria() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nueva categoría",
            text: `Desea crear nueva categoría: ${nuevaCategoria}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearCategoria", {
                        fclasificacion_id: selects.clasificacion,
                        fcategoria: nuevaCategoria
                    });

                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó la categoría de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setactivacionCategoria(!activacionCategoria)
                        }
                    });
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear la categoría.",
                        icon: "error"
                    });
                }
            }
        });
    }
    async function fnuevaSubCategoria() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nueva subcategoría",
            text: `Desea crear nueva subcategoría: ${nuevaSubCategoria}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearSubCategoria", {
                        fcategoria_id: selects.categoria,
                        fsubcategoria: nuevaSubCategoria
                    });

                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó la categoría de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setactivacionSubCategoria(!activacionSubCategoria)
                        }
                    });
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear la categoría.",
                        icon: "error"
                    });
                }
            }
        });
    }
    async function fnuevomodelo() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nuevo modelo",
            text: `Desea crear un nuevo modelo: ${nuevoModelo}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {
                    // Llamada a la API usando await
                    const response = await api.post("/inicio/crearModelo", {
                        fmarca_id: 1,
                        fmodelo: nuevoModelo
                    });
                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó el modelo de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setactivacionModelo(!activacionModelo)
                        }
                    });
                } catch (error) {
                    // Manejo de errores, en caso de que la llamada a la API falle
                    MySwal.fire({
                        title: "Error!",
                        text: "Hubo un problema al crear el modelo.",
                        icon: "error"
                    });
                }
            }
        });
    }

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-foreground text-background"
                endContent={<UserPlusIcon className="h-5" />}
                size="sm"
            >
                Crear nuevo curso
            </Button>
            <Modal className="h-[80%]" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <strong className="text-[var(--color-peru)]">
                                    Crear Curso
                                </strong>
                            </ModalHeader>
                            <ModalBody className="overflow-auto">
                                <Tabs
                                    disabledKeys={["music"]}
                                    selectedKey={selectedTab}
                                    onSelectionChange={handleTabChange}
                                >
                                    <Tab key="1" title="Curso">
                                        <Card>
                                            <CardBody>
                                                <div className="w-full flex flex-col gap-4">
                                                    <div className="flex items-center justify-center gap-5">
                                                        <Autocomplete
                                                            label="Escuela"
                                                            variant="bordered"
                                                            defaultItems={data.escuelas}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.escuela}
                                                            onSelectionChange={(value) => handleSelectChange("escuela", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdEscuela} value={item.IdEscuela}>
                                                                    {`${item.Escuela}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                        {!selects.tipoProducto ? (<><Popover placement="right">
                                                            <PopoverTrigger>
                                                                <Button className="px-5 min-w-10">
                                                                    <FaPlus />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <div className="px-1 py-2">
                                                                    <Input
                                                                        label="Nueva Escuela"
                                                                        placeholder=""
                                                                        value={nuevaEscuela}
                                                                        onValueChange={setnuevaEscuela}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === "Enter") {
                                                                                fnuevaEscuela()
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover></>) : (<></>)}
                                                    </div>
                                                    <Divider />
                                                    <div className="flex items-center justify-center gap-5">
                                                        <Autocomplete
                                                            label="Especialización"
                                                            variant="bordered"
                                                            defaultItems={data.especializaciones}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.especializacion}
                                                            onSelectionChange={(value) => handleSelectChange("especializacion", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdEspecializacion} value={item.IdEspecializacion}>
                                                                    {`${item.Especializacion}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                        {selects.escuela ? (<><Popover placement="right">
                                                            <PopoverTrigger>
                                                                <Button className="px-5 min-w-10">
                                                                    <FaPlus />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <div className="px-1 py-2">
                                                                    <Input
                                                                        label="Nueva Especialización"
                                                                        placeholder=""
                                                                        value={nuevaEspecializacion}
                                                                        onValueChange={setnuevaEspecializacion}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === "Enter") {
                                                                                fnuevaEspecializacion()
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover></>) : (<></>)}
                                                    </div>
                                                    <Divider />

                                                    <Autocomplete
                                                        label="Tipo de Curso"
                                                        variant="bordered"
                                                        defaultItems={data.tipocursos}
                                                        placeholder="Seleccionar la opción"
                                                        selectedKey={selects.tipocurso}
                                                        onSelectionChange={(value) => handleSelectChange("tipocurso", value)}
                                                    >
                                                        {(item: any) => (
                                                            <AutocompleteItem key={item.IdTipoCurso} value={item.IdTipoCurso}>
                                                                {`${item.TipoCurso}`}
                                                            </AutocompleteItem>
                                                        )}
                                                    </Autocomplete>
                                                    <Autocomplete
                                                        label="Cliente"
                                                        variant="bordered"
                                                        defaultItems={data.clientes}
                                                        placeholder="Seleccionar la opción"
                                                        selectedKey={selects.cliente}
                                                        onSelectionChange={(value) => handleSelectChange("cliente", value)}
                                                    >
                                                        {(item: any) => (
                                                            <AutocompleteItem key={item.IdCliente} value={item.IdCliente}>
                                                                {`${item.CodCliente} - ${item.Cliente}`}
                                                            </AutocompleteItem>
                                                        )}
                                                    </Autocomplete>
                                                    <div className="flex items-center justify-center gap-5">
                                                        <Autocomplete
                                                            label="Curso"
                                                            variant="bordered"
                                                            defaultItems={data.cursos}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.curso}
                                                            onSelectionChange={(value) => handleSelectChange("curso", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdCurso} value={item.IdCurso}>
                                                                    {`${item.Curso}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                        {selects.especializacion && selects.cliente && selects.tipocurso ? (<><Popover placement="right">
                                                            <PopoverTrigger>
                                                                <Button className="px-5 min-w-10">
                                                                    <FaPlus />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <div className="px-1 py-2">
                                                                    <Input
                                                                        label="Nuevo Curso"
                                                                        placeholder=""
                                                                        value={nuevoCurso}
                                                                        onValueChange={setnuevoCurso}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === "Enter") {
                                                                                fnuevoCurso()
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover></>) : (<></>)}
                                                    </div>
                                                    <Divider />



                                                </div>
                                                <Button onClick={fcrearcurso} color="primary" type="submit" className="mt-4 ">
                                                    Crear
                                                </Button>
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
    );
}