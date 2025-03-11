import React, { useEffect, useState } from 'react'
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
    DateInput,
    Image,
    Textarea,
    DateValue,
    PopoverTrigger,
    Popover,
    PopoverContent
} from "@nextui-org/react";
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { CalendarDate, parseDate } from "@internationalized/date";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { environment } from '@/environments/environment';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as XLSX from 'xlsx';
import { FaPlus } from 'react-icons/fa6';

export default function ModalCrearUsuario() {
    //Axios
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    //Sesion
    const { data: session, status } = useSession();
    //Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (key: any) => {
        setSelectedTab(key);
    };
    //Estados
    const [selects, setSelects] = useState({
        tipoDocumento: '',
        paises: '',
        departamento: '',
        provincia: '',
        distrito: '',
        genero: '',
        area: '',
        puesto: ''
    });
    const [files, setFiles] = useState({
        DAdelante: null,
        DAtras: null,
        Brochure: null,
        ImagenCursoPortada: null,
        VideoCursoPresentacion: null,
    });
    const [dataSelectTipoDocumento, setdataSelectTipoDocumento] = React.useState([]);
    const [dataSelectPais, setdataSelectPais] = React.useState([]);
    const [dataSelectDepartamento, setdataSelectDepartamento] = React.useState([]);
    const [dataSelectProvincia, setdataSelectProvincia] = React.useState([]);
    const [dataSelectDistrito, setdataSelectDistrito] = React.useState([]);
    const [dataSelectArea, setdataSelectArea] = React.useState([]);
    const [dataSelectPuesto, setdataSelectPuesto] = React.useState([]);
    const [dataMisDatos, setdataMisDatos] = useState<any>([]);
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [nrodocumento, setNroDocumento] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [fechanac, setFechaNac] =  React.useState<DateValue | null>(null);
    const [correoemp, setCorreoEmp] = useState("");
    const [telefonoemp, setTelefonoEmp] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [crearmodalidad, setcrearmodalidad] = useState("");

    //Valor Estático
    const datagenero = [
        { Genero: "Masculino" },
        { Genero: "Femenino" },
        { Genero: "Prefiero no decirlo" },
    ]
    //Funcion Select
    const handleSelectChange = (key: any, value: any) => {
        setSelects((prevSelects) => ({
            ...prevSelects,
            [key]: value
        }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFiles((prevFiles) => ({
            ...prevFiles,
            [type]: file
        }));
    };
    //Ganchos
    useEffect(() => {
        const loadData = async () => {
            try {
                const responseTipoDocumento = await api.post("/inicio/listarSelectTipoDocumento", {
                    ptipodocumento: 'Identidad',
                });
                setdataSelectTipoDocumento(responseTipoDocumento.data.data[0])
                const responsePais = await api.post("/inicio/listarPais", {
                });
                setdataSelectPais(responsePais.data.data[0])
                if (session?.user.Usuario) {
                    const response = await api.post("/inicio/listarMisDatos", {
                        fusuario: session?.user.Usuario
                    });
                    setdataMisDatos(response.data.data[0][0])
                }
            } catch (error) {
                console.error("Error cargando los datos:", error);
            }
        };
        loadData();
    }, [session?.user.Usuario])
    useEffect(() => {
        if (dataMisDatos) {
            setSelects((prevSelects) => ({
                ...prevSelects,
                tipoDocumento: dataMisDatos.TipoDocumento_id
            }));

        }
    }, [dataMisDatos])
    useEffect(() => {
        if (selects.paises) {
            const funct1 = async () => {
                const response = await api.post("/inicio/listarDepartamento", {
                    fpais: selects.paises,
                });
                setdataSelectDepartamento(response.data.data[0])
            }
            funct1()
        }
    }, [selects.paises])
    useEffect(() => {
        if (selects.paises && selects.departamento) {
            const funct1 = async () => {
                const response = await api.post("/inicio/listarProvincia", {
                    fdepartamento: selects.departamento,
                });
                setdataSelectProvincia(response.data.data[0])
            }

            funct1()
        }
    }, [selects.paises, selects.departamento])
    useEffect(() => {
        if (selects.paises && selects.departamento && selects.provincia) {
            const funct1 = async () => {
                const response = await api.post("/inicio/listarDistrito", {
                    fprovincia: selects.provincia,
                });
                setdataSelectDistrito(response.data.data[0])
            }

            funct1()
        }
    }, [selects.paises, selects.departamento, selects.provincia])
    useEffect(() => {
        const funct1 = async () => {
            const response = await api.post("/inicio/listarArea", {
            });
            setdataSelectArea(response.data.data[0])

        }

        funct1()
    }, [])
    useEffect(() => {
        if (selects.area) {
            const funct1 = async () => {
                const response = await api.post("/inicio/listarPuesto", {
                    fArea_id: selects.area,
                });
                setdataSelectPuesto(response.data.data[0])
            }
            funct1()
        }
    }, [selects.area])

    //Funcion
    async function CrearUsuario() {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Crear nuevo usuario",
            text: `Desea crear nuevo usuario: `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, crear"
        }).then(async (result) => { // Añadimos async aquí
            if (result.isConfirmed) {
                try {

                    const formData = new FormData();
                    formData.append('fUsuario', usuario);
                    formData.append('fClave', clave);
                    formData.append('fNombres', nombres);
                    formData.append('fApellidos', apellidos);
                    formData.append('fTipoDocumento', selects.tipoDocumento);
                    formData.append('fNroDocumento', nrodocumento);
                    formData.append('fCorreo', correo);
                    formData.append('fTelefono', telefono);
                    formData.append('fPais', selects.paises);
                    formData.append('fDepartamento', selects.departamento);
                    formData.append('fProvincia', selects.provincia);
                    formData.append('fDistrito', selects.distrito);
                    formData.append('fFechaNac', fechanac ? fechanac.toString() : '');
                    formData.append('fGenero', selects.genero);
                    formData.append('fCorreoEmp', correoemp);
                    formData.append('fTelefonoEmp', telefonoemp);
                    formData.append('fArea', selects.area);
                    formData.append('fPuesto', selects.puesto);
                    formData.append('fDescripcion', descripcion);
                    formData.append('fDireccion', direccion);
                    formData.append('fModo', crearmodalidad);

                    const filePaths = {
                        UCuerpo: { tipo1: 'Multimedia', tipo2: 'Imagen', tipo3: 'Usuarios', tipo4: 'Cuerpo' },
                        UPerfil: { tipo1: 'Multimedia', tipo2: 'Imagen', tipo3: 'Usuarios', tipo4: 'Perfil' },

                    };
                    const fileMetadata = Object.entries(files)
                        .filter(([key, file]) => file !== null) // Filtrar los archivos nulos
                        .map(([key, file]) => {
                            const { tipo1, tipo2, tipo3, tipo4 } = filePaths[key as keyof typeof filePaths]; // Obtener tipos por abreviatura
                            return {
                                abbreviation: key,   // Abreviatura (como 'DAdelante', 'DAtras', etc.)
                                name: (file as any).name, // Nombre del archivo
                                filePath: `${tipo1}/${tipo2}/${tipo3}/${tipo4}/${(file as any).name}`, // Ruta personalizada
                                tipo1,
                                tipo2,
                                tipo3,
                                tipo4
                            };
                        });
                    fileMetadata.forEach(({ abbreviation, name }) => {
                        formData.append(abbreviation, name); // Agregar la abreviatura como clave y el nombre del archivo como valor
                    });
                    try {
                        await api.post("/inicio/crearUsuarioAdmin",
                            formData
                            , {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });
                    } catch (error) {
                        console.error('Error uploading files:', error);
                    }

                    const response1 = await api.post("/inicio/generate-presigned-urls", {
                        files: fileMetadata
                    });

                    const urls: any = response1.data.urls;

                    for (const [abbreviation, url] of Object.entries(urls)) {
                        try {
                            const file = files[abbreviation as keyof typeof files];
                            const past = await axios.put(url as string, file, {
                                headers: {
                                    'Content-Type': '*'
                                }
                            });
                        } catch (error) {
                            console.error(`Error al subir el archivo`);
                        }
                    }

                    // Si la respuesta es exitosa, muestra la alerta de éxito
                    MySwal.fire({
                        title: "Creación Exitosa!",
                        text: "Se creó la clasificación de forma exitosa.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {

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



    
    interface DataRow {
        [key: string]: string | number; // Ajusta según los tipos de datos esperados
    }
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows: DataRow[] = XLSX.utils.sheet_to_json(sheet);
            console.log(rows); // Verifica los datos leídos
            uploadData(rows);
        };

        reader.readAsArrayBuffer(file);
    };

    const uploadData = async (rows: DataRow[]) => {
        try {
            console.log('YARA' + rows)
            const response = await api.post('/inicio/insertarusuariomasivov2', {
                data: rows,
            });

            console.log('Resultado:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error al subir los datos:', error.response?.data || error.message);
            } else {
                console.error('Error desconocido:', error);
            }
        }
    };


    const [nuevaArea, setnuevaArea] = useState("");
    const [nuevoPuesto, setnuevoPuesto] = useState("");



    async function fnuevaArea() {
        const MySwal = withReactContent(Swal);

        try {
            const result = await MySwal.fire({
                title: "Crear nueva área",
                text: `Desea crear nueva área: ${nuevaArea}`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, crear"
            });

            if (result.isConfirmed) {
                // Llamada a la API para crear el área
                const response = await api.post("/inicio/crearAreav2", { farea: nuevaArea });

                // Mostrar mensaje de éxito
                await MySwal.fire({
                    title: "Creación Exitosa!",
                    text: "Se creó la área de forma exitosa.",
                    icon: "success"
                });

                // Llamada a la API para listar áreas y actualizar el estado
                const listResponse = await api.post("/inicio/listarArea");
                setdataSelectArea(listResponse.data.data[0]);
            }
        } catch (error) {
            // Manejo de errores
            await MySwal.fire({
                title: "Error!",
                text: "Hubo un problema al crear la área.",
                icon: "error"
            });
        }
    }
    async function fnuevoPuesto() {
        const MySwal = withReactContent(Swal);

        try {
            const result = await MySwal.fire({
                title: "Crear nueva puesto",
                text: `Desea crear nuevo puesto: ${nuevaArea}`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, crear"
            });

            if (result.isConfirmed) {
                // Llamada a la API para crear el área
                const response = await api.post("/inicio/crearPuestov2", { farea_id: selects.area,fpuesto:nuevoPuesto });

                // Mostrar mensaje de éxito
                await MySwal.fire({
                    title: "Creación Exitosa!",
                    text: "Se creó el puesto de forma exitosa.",
                    icon: "success"
                });

                // Llamada a la API para listar áreas y actualizar el estado
                const response1 = await api.post("/inicio/listarPuesto", {
                    fArea_id: selects.area,
                });
                setdataSelectPuesto(response1.data.data[0])
            }
        } catch (error) {
            // Manejo de errores
            await MySwal.fire({
                title: "Error!",
                text: "Hubo un problema al crear el puesto.",
                icon: "error"
            });
        }
    }
    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-[#007FEE] text-white p-4"
                endContent={<UserPlusIcon className="h-5" />}
                size="sm"
            >
                Añadir Nuevo Usuario
            </Button>
            <Modal className="h-[85%]" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size='4xl'>
                <ModalContent >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <strong className="text-[var(--color-peru)]">
                                    Crear usuario
                                </strong>
                            </ModalHeader>
                            <ModalBody className="overflow-auto">
                                <Tabs
                                    disabledKeys={["music"]}
                                    selectedKey={selectedTab}
                                    onSelectionChange={handleTabChange}
                                >
                                    <Tab key="1" title="Crear usuario">
                                        <Card>
                                            <CardBody className="flex flex-col gap-5">
                                                <div className='flex gap-10'>
                                                    <button onClick={() => {
                                                        setcrearmodalidad("Cliente");
                                                    }} className={`bg-red-500 text-white py-2 px-4 rounded-xl
                                        ${crearmodalidad !== 'Cliente' && crearmodalidad !== '' ? 'opacity-25' : ''}`}>
                                                        <div className="flex gap-2 items-center">
                                                            <h1>Cliente</h1>
                                                        </div>
                                                    </button>
                                                    <button onClick={() => {
                                                        setcrearmodalidad("Empleado");
                                                    }} className={`bg-green-500 text-white py-2 px-4 rounded-xl
                                        ${crearmodalidad !== 'Empleado' && crearmodalidad !== '' ? 'opacity-25' : ''}`}>
                                                        <div className="flex gap-2 items-center">
                                                            <h1>Empleado</h1>
                                                        </div>
                                                    </button>
                                                </div>
                                                {crearmodalidad == 'Cliente' || crearmodalidad == 'Empleado' ? (<><div className="flex gap-10">
                                                    <Input
                                                        type="text"
                                                        label="Usuario"
                                                        variant="bordered"
                                                        className="w-full "
                                                        placeholder="Escribir el usuario"
                                                        value={usuario}
                                                        onValueChange={setUsuario}
                                                    />
                                                    <Input
                                                        type="text"
                                                        label="Clave"
                                                        variant="bordered"
                                                        className="w-full "
                                                        classNames={{ "label": "!", "input": " " }}
                                                        placeholder="Escribir el correo"
                                                        value={clave}
                                                        onValueChange={setClave}

                                                    />
                                                </div>
                                                    <div className='flex justify-between gap-20'>
                                                        <div className="flex flex-col gap-3 items-center shadow-xl w-full">
                                                            <h1>Imagen </h1>
                                                            <div className="w-40 h-40 relative cursor-pointer">
                                                                <Image
                                                                    src={'https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg'}
                                                                    removeWrapper
                                                                    className="absolute w-full h-full z-[9] cursor-pointer"
                                                                />
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileChange(e, 'ImagenCursoPortada')}
                                                                    className="absolute w-full h-full z-[10] opacity-0 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-3 items-center shadow-xl w-full">
                                                            <h1>Imagen Perfil</h1>
                                                            <div className="w-40 h-40 relative cursor-pointer">
                                                                <Image
                                                                    src={'https://static.vecteezy.com/system/resources/thumbnails/007/126/739/small/question-mark-icon-free-vector.jpg'}
                                                                    removeWrapper
                                                                    className="absolute w-full h-full z-[9] cursor-pointer"
                                                                />
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileChange(e, 'ImagenCursoPortada')}
                                                                    className="absolute w-full h-full z-[10] opacity-0 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Divider className='bg-[#062E56]' />
                                                    <div className="flex gap-10">
                                                        <Input
                                                            type="text"
                                                            label="Nombres"
                                                            variant="bordered"
                                                            className="w-full "
                                                            placeholder="Escribir sus nombres"
                                                            value={nombres}
                                                            onValueChange={setNombres}

                                                        />
                                                        <Input
                                                            type="text"
                                                            label="Apellidos"
                                                            variant="bordered"
                                                            className="w-full "
                                                            classNames={{ "label": "!", "input": " " }}
                                                            placeholder="Escribir sus nombres"
                                                            value={apellidos}
                                                            onValueChange={setApellidos}

                                                        />
                                                    </div>
                                                    <div className="flex gap-10">
                                                        <Autocomplete
                                                            label="TipoDocumento"
                                                            variant="bordered"
                                                            defaultItems={dataSelectTipoDocumento}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.tipoDocumento}
                                                            onSelectionChange={(value) => handleSelectChange("tipoDocumento", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdTipoDocumento} value={item.IdTipoDocumento}>
                                                                    {`${item.TipoDocumento}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                        <Input
                                                            type="text"
                                                            label="N° de Documento"
                                                            variant="bordered"
                                                            className="w-full "
                                                            classNames={{ "label": "!", "input": " " }}
                                                            placeholder="Escribir sus nombres"
                                                            value={nrodocumento}
                                                            onValueChange={setNroDocumento}
                                                        />
                                                    </div>
                                                    <div className="flex gap-10">
                                                        <Input
                                                            type="email"
                                                            label="Correo"
                                                            variant="bordered"
                                                            className="w-full "
                                                            classNames={{ "label": "!", "input": " " }}
                                                            placeholder="Escribir sus nombres"
                                                            value={correo}
                                                            onValueChange={setCorreo}
                                                        />
                                                        <Input
                                                            type="text"
                                                            label="Telefono"
                                                            variant="bordered"
                                                            className="w-full "
                                                            classNames={{ "label": "!", "input": " " }}
                                                            placeholder="Escribir sus nombres"
                                                            value={telefono}
                                                            onValueChange={setTelefono}
                                                        />
                                                    </div>
                                                    <div className="flex gap-5">
                                                        <Autocomplete
                                                            label="País"
                                                            variant="bordered"
                                                            defaultItems={dataSelectPais}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.paises}
                                                            onSelectionChange={(value) => handleSelectChange("paises", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdPais} value={item.IdPais}>
                                                                    {`${item.Pais}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                        <Autocomplete
                                                            label="Departamento"
                                                            variant="bordered"
                                                            defaultItems={dataSelectDepartamento}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.departamento}
                                                            onSelectionChange={(value) => handleSelectChange("departamento", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdDepartamento} value={item.IdDepartamento}>
                                                                    {`${item.Departamento}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                        <Autocomplete
                                                            label="Provincia"
                                                            variant="bordered"
                                                            defaultItems={dataSelectProvincia}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.provincia}
                                                            onSelectionChange={(value) => handleSelectChange("provincia", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdProvincia} value={item.IdProvincia}>
                                                                    {`${item.Provincia}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                        <Autocomplete

                                                            label="Distrito"
                                                            variant="bordered"
                                                            defaultItems={dataSelectDistrito}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.distrito}
                                                            onSelectionChange={(value) => handleSelectChange("distrito", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdDistrito} value={item.IdDistrito}>
                                                                    {`${item.Distrito}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                    </div>
                                                    <div className="flex gap-10">
                                                        <Input
                                                            type="text"
                                                            label="Dirección"
                                                            variant="bordered"
                                                            className="w-full "
                                                            classNames={{ "label": "!", "input": " " }}
                                                            placeholder="Escribir sus nombres"
                                                            value={direccion}
                                                            onValueChange={setDireccion}
                                                        />
                                                    </div>
                                                    <div className="flex gap-10">
                                                        <DateInput label={"Fecha de nacimiento"}
                                                            variant="bordered"
                                                            placeholderValue={new CalendarDate(1995, 11, 6)} className="max-w-sm" 
                                                            value={fechanac} onChange={setFechaNac} />
                                                        <Autocomplete
                                                            label="Genero"
                                                            variant="bordered"
                                                            defaultItems={datagenero}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.genero}
                                                            onSelectionChange={(value) => handleSelectChange("genero", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.Genero} value={item.Genero}>
                                                                    {`${item.Genero}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                    </div></>) : (<></>)}
                                                {crearmodalidad == 'Empleado' ? (<><Divider className='bg-[#062E56]' />
                                                    <div className="flex gap-10">
                                                        <Input
                                                            type="email"
                                                            label="Correo empresarial"
                                                            variant="bordered"
                                                            className="w-full "
                                                            placeholder="Escribir el correo"
                                                            value={correoemp}
                                                            onValueChange={setCorreoEmp}
                                                        />
                                                        <Input
                                                            type="text"
                                                            label="Telefono empresarial"
                                                            variant="bordered"
                                                            className="w-full "
                                                            classNames={{ "label": "!", "input": " " }}
                                                            placeholder="Escribir el telefono"
                                                            value={telefonoemp}
                                                            onValueChange={setTelefonoEmp}
                                                        />
                                                    </div>
                                                    <div className="flex gap-10">

                                                        <div className="flex items-center justify-center gap-5">
                                                            <Autocomplete
                                                                label="Área"
                                                                variant="bordered"
                                                                defaultItems={dataSelectArea}
                                                                placeholder="Seleccionar la opción"
                                                                selectedKey={selects.area}
                                                                onSelectionChange={(value) => handleSelectChange("area", value)}
                                                            >
                                                                {(item: any) => (
                                                                    <AutocompleteItem key={item.IdArea} value={item.IdArea}>
                                                                        {`${item.Area}`}
                                                                    </AutocompleteItem>
                                                                )}
                                                            </Autocomplete>
                                                            <Popover placement="right">
                                                                <PopoverTrigger>
                                                                    <Button className="px-5 min-w-10">
                                                                        <FaPlus />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <div className="px-1 py-2">
                                                                        <Input
                                                                            label="Nueva Area"
                                                                            placeholder=""
                                                                            value={nuevaArea}
                                                                            onValueChange={setnuevaArea}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    fnuevaArea()
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-center gap-5">
                                                        <Autocomplete
                                                            label="Puesto"
                                                            variant="bordered"
                                                            color="primary"
                                                            defaultItems={dataSelectPuesto}
                                                            placeholder="Seleccionar la opción"
                                                            selectedKey={selects.puesto}
                                                            onSelectionChange={(value) => handleSelectChange("puesto", value)}
                                                        >
                                                            {(item: any) => (
                                                                <AutocompleteItem key={item.IdPuesto} value={item.IdPuesto}>
                                                                    {`${item.Puesto}`}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                            {selects.area ? (<><Popover placement="right">
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
                                                                            value={nuevoPuesto}
                                                                            onValueChange={setnuevoPuesto}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    fnuevoPuesto()
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover></>) : (<></>)}
                                                        </div>
                                                    </div>
                                                    <Textarea
                                                        color="primary"
                                                        label="Descripción"
                                                        labelPlacement="inside"
                                                        placeholder="Ingrese su mensaje"
                                                        className="rounded-lg  w-full h-full text-black "
                                                        variant='bordered'
                                                        size='sm'
                                                        value={descripcion}
                                                        onValueChange={setDescripcion}

                                                    /></>) : (<></>)}

                                                <Button onClick={CrearUsuario} color="primary" variant="bordered" className="max-w-52 m-auto">
                                                    Guardar
                                                </Button>

                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="2" title="Carga Excel usuario">
                                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

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
