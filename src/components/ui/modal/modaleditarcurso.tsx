"use client";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3"
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
    Image,
    CheckboxGroup,
    Checkbox,
    Select,
    SelectItem,
    Textarea, DatePicker, Progress, Popover, PopoverTrigger, PopoverContent,
} from "@nextui-org/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import axios from "axios";
import { environment } from "@/environments/environment";
import { MdModeEdit } from "react-icons/md";
import CheckboxGroupComponent from "../checkboxgroup/checkboxgroup";
import { Accordion, AccordionItem } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";

interface props {
    array: any
}

export default function ModalEditarCursoComponent({ array }: props) {
    const { data: session } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTab, setSelectedTab] = useState(0);

    const [value, setValue] = useState("");

    const [selects, setSelects] = useState({
        cliente: null,
        naturaleza: null,
        tipoProducto: null,
        clasificacion: null,
        categoria: null,
        subCategoria: null,
    });
    const [data, setData] = useState({
        datosadjunto: [],
        datosadjunto1: [],
        datosadjunto2: [],
        tipoProductos: [],
        clasificaciones: [],
        categorias: [],
        subCategorias: [],
        docentes: [],
        temario: [],
        precios: []
    });

    // New state for files
    const [files, setFiles] = useState({
        DAdelante: null,
        DAtras: null,
        Brochure: null,
        ImagenCursoPortada: null,
        VideoCursoPresentacion: null,
    });

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });

    const [TituloValue, setTituloValue] = useState("");
    const [DescripcionValue, setDescripcionValue] = useState("");
    const [CalificacionValue, setCalificacionValue] = useState("");
    const [SeguidoresValue, setSeguidoresValue] = useState("");
    const [NivelValue, setNivelValue] = useState("");
    const [selectMarcasRespaldoValue, setSelectMarcasRespaldoValue] = useState<any>();
    const [selectProfesoresValue, setSelectProfesoresValue] = useState<any>();

    const [ExamenParcialValue, setExamenParcialValue] = useState("");
    const [ExamenFinalValue, setExamenFinalValue] = useState("");

    const [ATitulo1Value, setATitulo1Value] = useState("");
    const [ATitulo2Value, setATitulo2Value] = useState("");
    const [ATitulo3Value, setATitulo3Value] = useState("");
    const [ATitulo4Value, setATitulo4Value] = useState("");
    const [ADescripcion1Value, setADescripcion1Value] = useState("");
    const [ADescripcion2Value, setADescripcion2Value] = useState("");
    const [ADescripcion3Value, setADescripcion3Value] = useState("");
    const [ADescripcion4Value, setADescripcion4Value] = useState("");


    const [PrecioOnlineValue, setPrecioOnlineValue] = useState("");
    const [PrecioMixtoValue, setPrecioMixtoValue] = useState("");
    const [PrecioAsincronicoValue, setPrecioAsincronicoValue] = useState("");

    const [EstadoOnline, setEstadoOnline] = useState("");
    const [EstadoMixto, setEstadoMixto] = useState("");
    const [EstadoAsincronico, setEstadoAsincronico] = useState("");

    const [IdOnline, setIdOnline] = useState("");
    const [IdMixto, setIdMixto] = useState("");
    const [IdAsincronico, setIdAsincronico] = useState("");

    const [idprod, setidprod] = useState("");
    // Fetch data for dropdowns
    useEffect(() => {
        if (isOpen == true) {
            const fetchData = async () => {
                try {
                    const datasa = await api.post("/inicio/listarProductoId", {
                        ftipoproducto: 2,
                        fclasificacion: array.Clasificacion,
                        fmodelo: array.IdModelo
                    })
                    setidprod(datasa.data.data[0][0].IdProducto)

                    const [datosadjuntoRes, adjuntoRes, beneficios, precios, docentes, temario] = await Promise.all([
                        api.post("/inicio/listarEditarCursoGeneral", {
                            pclasificacion: array.Clasificacion,
                            pmodelo: array.IdModelo
                        }),
                        api.post("/inicio/listarCursoAdjuntos", {
                            pclasificacion: array.Clasificacion,
                            pmodelo: array.IdModelo
                        }),
                        api.post("/inicio/listarProductoBeneficio", {
                            pclasificacion: array.Clasificacion,
                            pmodelo: array.IdModelo
                        }),
                        api.post("/inicio/ObtenerIdsProducto", {
                            pclasificacion: array.Clasificacion,
                            pmodelo: array.IdModelo
                        }),
                        api.post("/inicio/listarDocentes", {

                        }),
                        api.post("/inicio/listarTemario", {
                            fproductoid: datasa.data.data[0][0].IdProducto
                        })
                    ]);

                    console.log('pala' + JSON.stringify(precios))

                    console.log('pala' + precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 1).Estado_id)
                    console.log('pala' + precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 2).Estado_id)
                    console.log('pala' + precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 3).Estado_id)
                    setData({
                        ...data,
                        datosadjunto: datosadjuntoRes.data.data[0],
                        datosadjunto1: adjuntoRes.data.data[0],
                        datosadjunto2: beneficios.data.data[0],
                        docentes: docentes.data.data[0],
                        temario: temario.data.data[0],
                        precios: precios.data.data[0]
                    });


                    setModulos(temario.data.data[0])
                    setTituloValue(datosadjuntoRes.data.data[0][0]?.Modelo);
                    setDescripcionValue(datosadjuntoRes.data.data[0][0]?.Especificacion);
                    setCalificacionValue(datosadjuntoRes.data.data[0][0]?.Calificacion);
                    setSeguidoresValue(datosadjuntoRes.data.data[0][0]?.Seguidores);
                    setNivelValue(datosadjuntoRes.data.data[0][0]?.Nivel);
                    setSelectMarcasRespaldoValue(datosadjuntoRes.data.data[0][0]?.MarcasRespaldo?.split(',') || []);
                    setSelectProfesoresValue(datosadjuntoRes.data.data[0][0]?.Profesores?.split(',') || []);
                    setExamenParcialValue(datosadjuntoRes.data.data[0][0]?.ExamenParcial);
                    setExamenFinalValue(datosadjuntoRes.data.data[0][0]?.ExamenFinal);
                    setATitulo1Value(beneficios.data.data[0][0]?.Titulo);
                    setADescripcion1Value(beneficios.data.data[0][0]?.Descripcion);
                    setATitulo2Value(beneficios.data.data[0][1]?.Titulo);
                    setADescripcion2Value(beneficios.data.data[0][1]?.Descripcion);
                    setATitulo3Value(beneficios.data.data[0][2]?.Titulo);
                    setADescripcion3Value(beneficios.data.data[0][2]?.Descripcion);
                    setATitulo4Value(beneficios.data.data[0][3]?.Titulo);
                    setADescripcion4Value(beneficios.data.data[0][3]?.Descripcion);


                    setEstadoOnline(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 1).Estado_id);
                    setEstadoAsincronico(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 2).Estado_id);
                    setEstadoMixto(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 3).Estado_id);

                    setIdOnline(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 1).IdProducto);
                    setIdAsincronico(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 2).IdProducto);
                    setIdMixto(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 3).IdProducto);

                    setPrecioOnlineValue(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 1).Precio);
                    setPrecioAsincronicoValue(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 2).Precio);
                    setPrecioMixtoValue(precios.data.data[0].find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 3).Precio);

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [isOpen]);
    useEffect(() => {
        if (selects.naturaleza) {
            const fetchTipoProductos = async () => {
                try {
                    const response = await api.post("/inicio/listarSelectTipoProducto", {
                        pnaturaleza: selects.naturaleza
                    });
                    setData((prevData) => ({
                        ...prevData,
                        tipoProductos: response.data.data[0],
                    }));
                } catch (error) {
                    console.error("Error fetching TipoProductos:", error);
                }
            };
            fetchTipoProductos();
        }
    }, [selects.naturaleza]);
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
    const handleTabChange = (key: any) => {
        setSelectedTab(key);
    };
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
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('pproductoid', idprod);
        formData.append('ptitulo', TituloValue);
        formData.append('pdescripcion', DescripcionValue);
        formData.append('pcalificacion', CalificacionValue);
        formData.append('pseguidores', SeguidoresValue);
        formData.append('pnivel', NivelValue);
        formData.append('pmarcasrespaldo', selectMarcasRespaldoValue);
        formData.append('pexamenparcial', ExamenParcialValue);
        formData.append('pexamenfinal', ExamenFinalValue);
        formData.append('patitulo1', ATitulo1Value);
        formData.append('patitulo2', ATitulo2Value);
        formData.append('patitulo3', ATitulo3Value);
        formData.append('patitulo4', ATitulo4Value);
        formData.append('padescripcion1', ADescripcion1Value);
        formData.append('padescripcion2', ADescripcion2Value);
        formData.append('padescripcion3', ADescripcion3Value);
        formData.append('padescripcion4', ADescripcion4Value);
        formData.append('pclasificacion', array.Clasificacion || '');
        formData.append('pmodelo', array.IdModelo || '');
        formData.append('pprofesores', JSON.stringify(Array.from(selectProfesoresValue)) || '');
        formData.append('ptemario', JSON.stringify(modulos) || '');

        const filePaths = {
            DAdelante: { tipo1: 'Multimedia', tipo2: 'Imagen', tipo3: 'Cursos', tipo4: 'CertificadoAdelante' },
            DAtras: { tipo1: 'Multimedia', tipo2: 'Imagen', tipo3: 'Cursos', tipo4: 'CertificadoAtras' },
            Brochure: { tipo1: 'Documentos', tipo2: 'Pdf', tipo3: 'Cursos', tipo4: 'Brochure' },
            ImagenCursoPortada: { tipo1: 'Multimedia', tipo2: 'Imagen', tipo3: 'Cursos', tipo4: 'Portada' },
            VideoCursoPresentacion: { tipo1: 'Multimedia', tipo2: 'Video', tipo3: 'Cursos', tipo4: 'Presentacion' }
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
            await api.post("/inicio/ruta-de-upload",
                formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        } catch (error) {
            console.error('Error uploading files:', error);
        }


        const response = await api.post("/inicio/generate-presigned-urls", {
            files: fileMetadata
        });

        const urls: any = response.data.urls;

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
    };
    const handleSubmit1 = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await api.post("/inicio/ObtenerIdsProducto", {
            pclasificacion: array.Clasificacion,
            pmodelo: array.IdModelo
        });
        const data = response.data.data[0];
        const producto = data.find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 1);
        const idProducto = producto ? producto.IdProducto : null;

        const formData = new FormData();
        formData.append('pprecio', PrecioOnlineValue);
        formData.append('pidproducto', idProducto);

        try {
            await api.post("/inicio/ActualizarCursoOnline",
                formData);
        } catch (error) {
            console.error('Error uploading files:', error);
        }

    };
    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await api.post("/inicio/ObtenerIdsProducto", {
            pclasificacion: array.Clasificacion,
            pmodelo: array.IdModelo
        });
        const data = response.data.data[0];
        const producto = data.find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 3);
        const idProducto = producto ? producto.IdProducto : null;

        const formData = new FormData();
        formData.append('pprecio', PrecioMixtoValue);
        formData.append('pidproducto', idProducto);

        try {
            await api.post("/inicio/ActualizarCursoMixto",
                formData);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };
    const handleSubmit3 = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await api.post("/inicio/ObtenerIdsProducto", {
            pclasificacion: array.Clasificacion,
            pmodelo: array.IdModelo
        });
        const data = response.data.data[0];
        const producto = data.find((item: { IdTipoProducto: number }) => item.IdTipoProducto === 2);
        const idProducto = producto ? producto.IdProducto : null;

        const formData = new FormData();
        formData.append('pprecio', PrecioAsincronicoValue);
        formData.append('pidproducto', idProducto);

        try {
            await api.post("/inicio/ActualizarCursoAsincronico",
                formData);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };
    const [modulos, setModulos] = useState<any[]>([]);
    const [nuevoModulo, setNuevoModulo] = useState<string>('');
    const [nuevoTema, setNuevoTema] = useState<string>('');
    const [selectedModulo, setSelectedModulo] = useState<number | null>(null);
    const [nuevoTiempo, setNuevoTiempo] = useState<string>('');
    const handleCrearModulo = () => {
        if (nuevoModulo.trim() !== '') {
            const nuevoId = modulos.length + 1; // Simulación de ID incremental
            setModulos([...modulos, { id: nuevoId, nombre: nuevoModulo, temas: [] }]);
            setNuevoModulo(''); // Limpiar el input después de añadir el módulo
        }
    };
    const handleEliminarModulo = (id: number) => {
        setModulos(modulos.filter((modulo) => modulo.id !== id));
    };
    const handleAgregarTema = (moduloId: number) => {
        if (nuevoTema.trim() !== '' && nuevoTiempo.trim() !== '') {
            setModulos(
                modulos.map((modulo) =>
                    modulo.id === moduloId
                        ? { ...modulo, temas: [...modulo.temas, { nombre: nuevoTema, tiempo: nuevoTiempo }] }
                        : modulo
                )
            );
            setNuevoTema(''); // Limpiar el input después de añadir el tema
            setNuevoTiempo(''); // Limpiar el input de tiempo después de añadir el tema
        }
    };
    const handleEliminarTema = (moduloId: number, temaNombre: string, temaTiempo: string) => {
        setModulos(
            modulos.map((modulo) =>
                modulo.id === moduloId
                    ? {
                        ...modulo,
                        temas: modulo.temas.filter((tema: any) => tema.nombre !== temaNombre || tema.tiempo !== temaTiempo)
                    }
                    : modulo
            )
        );
    };
    const getFileType = (ruta: any) => {
        if (ruta.includes('Multimedia/Imagen/Cursos/Portada')) return 'imagen';
        if (ruta.includes('Multimedia/Video/Cursos/Presentacion')) return 'video';
        if (ruta.includes('Multimedia/Imagen/Cursos/CertificadoAdelante')) return 'certificadoAdelante';
        if (ruta.includes('Multimedia/Imagen/Cursos/CertificadoAtras')) return 'certificadoAtras';
        if (ruta.includes('Documentos/Pdf/Cursos/Brochure')) return 'brochure';
        return 'unknown';
    };
    const vermodulos = () => {
        console.log(modulos)
    };
    function alternarestadomodalidad(modo: string) {
        if (modo == 'Online') {
            if (EstadoOnline == '1') {
                setEstadoOnline('0')
                api.post("/inicio/alternarestadomodalidad", {
                    pmodo: '0',
                    pidproducto: IdOnline
                })
            } else {
                setEstadoOnline('1')
                api.post("/inicio/alternarestadomodalidad", {
                    pmodo: '1',
                    pidproducto: IdOnline
                })
            }
        }
        if (modo == 'Mixto') {
            if (EstadoMixto == '1') {
                setEstadoMixto('0')
                api.post("/inicio/alternarestadomodalidad", {
                    pmodo: '0',
                    pidproducto: IdMixto
                })
            } else {
                setEstadoMixto('1')
                api.post("/inicio/alternarestadomodalidad", {
                    pmodo: '1',
                    pidproducto: IdMixto
                })
            }
        }
        if (modo == 'Asincronico') {
            if (EstadoAsincronico == '1') {
                setEstadoAsincronico('0')
                api.post("/inicio/alternarestadomodalidad", {
                    pmodo: '0',
                    pidproducto: IdAsincronico
                })
            } else {
                setEstadoAsincronico('1')
                api.post("/inicio/alternarestadomodalidad", {
                    pmodo: '1',
                    pidproducto: IdAsincronico
                })
            }
        }
    }

    ///////////////////
    const [idsproductos, setidsproductos] = useState([]);

    useEffect(() => {
        if (isOpen == true) {
            const loadData = async () => {
                const response = await api.post("/inicio/obteneridproductoxcursov2", {
                    fcurso_id: array.IdCurso
                });
                setidsproductos(response.data.data[0])
            }
            loadData();
        }
    }, [isOpen])


    const [salas, setsalas] = useState([]);
    const [salasusuarios, setsalasusuarios] = useState([]);

    const [vercrearsala, setvercrearsala] = useState(false);

    useEffect(() => {
        if (isOpen == true) {
            const loadData = async () => {
                const response = await api.post("/inicio/obtenersalasv2", {
                    fcurso_id: array.IdCurso
                });
                setsalas(response.data.data[0])
            }
            loadData();
        }
    }, [isOpen])


    const [selectedKeys, setSelectedKeys] = React.useState<any[]>([]); // Usar array en lugar de Set

    const handleSelectionChange = async (IdSala: any, keys: Set<any>) => {
        // Actualiza el estado con todos los valores seleccionados
        setSelectedKeys(Array.from(keys)); // Aquí estamos convirtiendo el Set a un array

        if (keys.size > 0) {
            // Enviar todos los valores seleccionados al backend
            const selectedKeysArray = Array.from(keys);

            // Obtener las salas de los usuarios (puedes modificar esto si necesitas usar todos los selectedKeys)
            const response = await api.post("/inicio/obtenersalasusuariosv2", {
                fsala_id: IdSala,
                frecuencias: selectedKeysArray, // Aquí pasas todos los valores seleccionados
            });

            setsalasusuarios(response.data.data[0]);
        }
    };

    async function crearsala() {
        // Verifica si las fechas son nulas
        if (!fechainicio || !fechafin) {
            console.error("Fechas no válidas:", fechainicio, fechafin);
            return;
        }

        // Verificar si 'frecuencia' es un objeto y tiene la propiedad 'currentKey'
        let frecuenciaValue: any = null;
        if (frecuencia && typeof frecuencia === 'object' && 'currentKey' in frecuencia) {
            frecuenciaValue = frecuencia.currentKey;
        } else {
            console.error("Frecuencia no tiene currentKey o es un valor inválido");
            return;
        }

        // Convierte las fechas a formato YYYY-MM-DD (como cadenas)
        const fechaInicio: any = `${fechainicio.year}-${String(fechainicio.month).padStart(2, '0')}-${String(fechainicio.day).padStart(2, '0')}`;
        const fechaFin: any = `${fechafin.year}-${String(fechafin.month).padStart(2, '0')}-${String(fechafin.day).padStart(2, '0')}`;

        // Buscamos el producto con IdTipoModalidad igual a 1
        const producto: any = idsproductos.find((item: any) => item.IdTipoModalidad === 1);

        if (!producto) {
            console.error("Producto no encontrado");
            return;
        }


        try {
            const response = await api.post("/inicio/crearsalav2", {
                fsala: sala,
                fproducto_id: producto.IdProducto,
                ffechainicio: fechaInicio, // En formato YYYY-MM-DD
                ffechafin: fechaFin,       // En formato YYYY-MM-DD
                fhorario: horario,
                fmaximoalumnos: maximoalumnos,
                ffrecuencia: Array.from(frecuencia).map(Number).join(','), // Solo el valor de currentKey
            });
            setvercrearsala(false)
            console.log("Respuesta de la API:", response.data);
        } catch (error: any) {
            console.error("Error al realizar la solicitud:", error);
        }
    }





    const days = [
        { key: "1", label: "Lunes" },
        { key: "2", label: "Martes" },
        { key: "3", label: "Miercoles" },
        { key: "4", label: "Jueves" },
        { key: "5", label: "Viernes" },
        { key: "6", label: "Sábado" },
        { key: "7", label: "Domingo" }
    ];


    const [sala, setsala] = useState("");
    const [fechainicio, setfechainicio] = React.useState<DateValue | null>(parseDate("2024-04-04"));
    const [fechafin, setfechafin] = React.useState<DateValue | null>(parseDate("2024-04-04"));
    const [horario, sethorario] = useState("");
    const [maximoalumnos, setmaximoalumnos] = useState("");
    const [frecuencia, setfrecuencia] = React.useState<Selection>(new Set([]));

    ///////////////////
    ///////////////////
    ///////////////////
    ///////////////////

    const [vermodalidades, setvermodalidades] = useState([]);

    useEffect(() => {
        if (isOpen == true) {
            const loadData = async () => {
                const response = await api.post("/inicio/vermodalidadescursov2", {
                    fcurso_id: array.IdCurso
                });
                setvermodalidades(response.data.data[0])
            }
            loadData();
        }
    }, [isOpen])

    const handlePriceChange = (index: number, newPrice: string) => {
        const updatedModalidades = [...vermodalidades];
        (updatedModalidades as any)[index].Precio = newPrice;
        setvermodalidades(updatedModalidades);
    };
    const handleToggleEstado = (index: number) => {
        const updatedModalidades = [...vermodalidades];
        (updatedModalidades as any)[index].Estado_id =
            (updatedModalidades as any)[index].Estado_id === "1" ? "0" : "1";
        setvermodalidades(updatedModalidades);
    };
    const handleGuardar = async () => {
        // Aquí puedes enviar los datos actualizados al backend
        console.log("Datos guardados:", vermodalidades);
        const response = await api.post("/inicio/administradoractualizarmodalidadesv2", {
            fdata: vermodalidades
        });
    };

    const [evaluacionesTipo1, setEvaluacionesTipo1] = useState([]);
    const [evaluacionesTipo2, setEvaluacionesTipo2] = useState([]);
    useEffect(() => {
        if (isOpen) {
            const loadData = async () => {
                const response = await api.post("/inicio/verevaluacionescursov2", {
                    fcurso_id: array.IdCurso,
                });

                const data = response.data.data[0];

                // Filtrar las evaluaciones por TipoEvaluacion
                const tipo1 = data.filter((item: any) => item.TipoEvaluacion === "1");
                const tipo2 = data.filter((item: any) => item.TipoEvaluacion === "2");

                // Asignar a los estados correspondientes
                setEvaluacionesTipo1(tipo1);
                setEvaluacionesTipo2(tipo2);
            };
            loadData();
        }
    }, [isOpen]);

    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();

    const [preguntasxtipo, setpreguntasxtipo] = useState<any[]>([]);

    const abrirmodalpreguntas = async (tipo: any) => {
        onOpen1()
        const response = await api.post("/inicio/verpreguntasxtipoxcursov2", {
            fcurso_id: array.IdCurso,
            ftipoevaluacion: tipo
        });
        setpreguntasxtipo(response.data.data[0])

    }

    //
    const handleAddPregunta = () => {
        const nuevasPreguntas = [...preguntasxtipo];
        const nuevaPregunta = {
            Pregunta: "Nueva pregunta",
            TipoPregunta: "1", // Tipo por defecto
            RespuestaCorrecta: "",
            respuestas: [
                { Orden: 1, Respuesta: "" },
                { Orden: 2, Respuesta: "" },
            ],
        };
        nuevasPreguntas.push(nuevaPregunta);
        setpreguntasxtipo(nuevasPreguntas);
    };

    // Añadir una nueva respuesta a una pregunta existente
    const handleAddRespuesta = (preguntaIndex: number) => {
        const nuevasPreguntas = [...preguntasxtipo];
        const nuevaRespuesta = {
            Orden: (nuevasPreguntas as any)[preguntaIndex].respuestas.length + 1,
            Respuesta: "",
        };
        (nuevasPreguntas as any)[preguntaIndex].respuestas.push(nuevaRespuesta);
        setpreguntasxtipo(nuevasPreguntas);
    };

    // Actualizar un campo de la pregunta
    const handleUpdatePregunta = (preguntaIndex: number, field: string, value: any) => {
        const nuevasPreguntas = [...preguntasxtipo];
        (nuevasPreguntas as any)[preguntaIndex][field] = value;
        setpreguntasxtipo(nuevasPreguntas);
    };

    // Actualizar una respuesta específica
    const handleUpdateRespuesta = (preguntaIndex: number, respuestaIndex: number, value: string) => {
        const nuevasPreguntas = [...preguntasxtipo];
        (nuevasPreguntas as any)[preguntaIndex].respuestas[respuestaIndex].Respuesta = value;
        setpreguntasxtipo(nuevasPreguntas);
    };

    // Función para guardar preguntas y respuestas en la base de datos
    const handleSavePreguntas = async () => {

        const response = await api.post("/inicio/guardarpreguntasadmin", {
            preguntas: preguntasxtipo
        });
        console.log(preguntasxtipo)

    };
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const { isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();
    const { isOpen: isOpen5, onOpen: onOpen5, onOpenChange: onOpenChange5 } = useDisclosure();

    const [productotemariodatos, setproductotemariodatos] = useState([]);
    const [listardocentes, setlistardocentes] = useState([]);
    const [listardocentessala, setlistardocentessala] = useState([]);

    const [idsalaactual, setidsalaactual] = useState("");

    const [docenteactual, setdocenteactual] = useState("");

    async function abrirgrabaciones(idsala: any) {
        setidsalaactual(idsala)
        onOpen2()
        const response = await api.post("/inicio/listarProductoTemariov2", {
            fcurso_id: array.IdCurso
        });
        setproductotemariodatos(response.data.data[0])
    }

    async function subirvideoenvivo(event: React.ChangeEvent<HTMLInputElement>, valor: string) {
        event.preventDefault();

        if (!event.target.files || event.target.files.length === 0) {
            console.error("No se seleccionó ningún archivo.");
            return;
        }

        const selectedFile = event.target.files[0]; // Obtener el archivo seleccionado
        console.log("Archivo seleccionado:", selectedFile);

        const formData = new FormData();
        formData.append('pidproductotemario', valor);
        formData.append('pidsala', idsalaactual);
        formData.append('Dvideovivo', selectedFile);
        const filePaths = {
            Dvideovivo: { tipo1: 'Multimedia', tipo2: 'Video', tipo3: 'Cursos', tipo4: 'Modulos' }
        };

        const fileMetadata = [{
            abbreviation: "Dvideovivo",
            name: selectedFile.name,
            filePath: `${filePaths.Dvideovivo.tipo1}/${filePaths.Dvideovivo.tipo2}/${filePaths.Dvideovivo.tipo3}/${filePaths.Dvideovivo.tipo4}/${selectedFile.name}`,
            tipo1: filePaths.Dvideovivo.tipo1,
            tipo2: filePaths.Dvideovivo.tipo2,
            tipo3: filePaths.Dvideovivo.tipo3,
            tipo4: filePaths.Dvideovivo.tipo4
        }];



        try {
            await api.post("/inicio/subirvideossala",
                formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        } catch (error) {
            console.error('Error uploading files:', error);
        }

        console.log("Metadata del archivo:", fileMetadata);

        // 🔹 Hacer la petición para obtener los pre-signed URLs
        const response = await api.post("/inicio/generate-presigned-urls", { files: fileMetadata });
        const urls = response.data.urls;

        console.log("URLs generadas:", urls);

        if (!urls.Dvideovivo) {
            console.error("No se recibió URL para el archivo.");
            return;
        }

        // 🔹 Subir el archivo a Cloudflare R2
        try {
            const uploadResponse = await axios.put(urls.Dvideovivo, selectedFile, {
                headers: { 'Content-Type': selectedFile.type }
            });
            console.log("Subida exitosa:", uploadResponse.status);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
        }
    }

    //
    async function abrirprofesor(idsala: any) {
        setidsalaactual(idsala)
        onOpen3()
        const response = await api.post("/inicio/listardocentesv2", {
        });
        setlistardocentes(response.data.data[0])

        const response1 = await api.post("/inicio/listardocentesalav2", {
            fsala_id: idsala
        });
        setlistardocentessala(response1.data.data[0])
    }
    async function añadirprofesor() {
        const response = await api.post("/inicio/agregardocentesalav2", {
            fusuario_id: docenteactual,
            fsala_id: idsalaactual
        });
    }
    //
    const [vercrearevaluacion, setvercrearevaluacion] = useState(false);
    const [descripcion, setdescripcion] = useState("");
    const [evaluacion, setevaluacion] = useState("");
    const [tipoevaluacion, settipoevaluacion] = useState("");
    const [duracion, setduracion] = useState("");
    const [intentos, setintentos] = useState("");
    const [listarsalasporproducto, setlistarsalasporproducto] = useState([]);
    const [evaluacionactual, setevaluacionactual] = useState("");

    const tipoevalucionarray = [{ key: 1, name: "Parcial" }, { key: 2, name: "Final" }]

    const abrirmodalevaluacionenvivo = async (IdEvaluacion: any) => {
        setevaluacionactual(IdEvaluacion)
        onOpen4()
        const response = await api.post("/inicio/listarsalasevaluacionv2", {
            fevaluacion_id: IdEvaluacion

        });
        setlistarsalasporproducto(response.data.data[0])
    }
    const [evsala, setevsala] = useState("");
    const [evfechainicio, setevfechainicio] = React.useState<DateValue | null>(parseDate("2024-04-04"));
    const [evfechafin, setevfechafin] = React.useState<DateValue | null>(parseDate("2024-04-04"));

    async function agregarsalaevaluacion() {
        if (!evfechainicio || !evfechafin) {
            return;
        }
        const fechaInicio: any = `${evfechainicio.year}-${String(evfechainicio.month).padStart(2, '0')}-${String(evfechainicio.day).padStart(2, '0')}`;
        const fechafin: any = `${evfechafin.year}-${String(evfechafin.month).padStart(2, '0')}-${String(evfechafin.day).padStart(2, '0')}`;

        const response = await api.post("/inicio/agregarsalaevaluacionv2", {
            fsala_id: evsala,
            ffechainicio: fechaInicio,
            ffechafin: fechafin,
            fevaluacion_id: evaluacionactual
        });
    }
    //
    const [listareditarvalores, setlistareditarvalores] = useState([]);
    const [numeroreunion, setnumeroreunion] = useState("");
    const [clavereunion, setclavereunion] = useState("");

    const abrireditarvalores = async (idsala: any) => {
        setidsalaactual(idsala)
        onOpen5()
        const response = await api.post("/inicio/listarsalaxidv2", {
            fsala_id: idsala

        });
        setlistareditarvalores(response.data.data[0])
        setnumeroreunion(response.data.data[0][0].NumeroReunion)
        setclavereunion(response.data.data[0][0].ClaveReunion)

    }
    async function guardarabrireditarvalores() {
      
        const response = await api.post("/inicio/guardarabrireditarvaloresv2", {
            fsala_id: idsalaactual,
            fnumero_reunion: numeroreunion,
            fclave_reunion: clavereunion
        });
    }
    return (
        <>
            <MdModeEdit onClick={onOpen} className="cursor-pointer text-2xl" />
            <Modal className="h-[80%]" size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <strong className="text-[var(--color-peru)]">
                                    Editar Curso {array.IdCurso}
                                </strong>
                            </ModalHeader>
                            <ModalBody className=" overflow-auto">
                                <Tabs
                                    disabledKeys={["music"]}
                                    selectedKey={selectedTab}
                                    onSelectionChange={handleTabChange}
                                >
                                    <Tab key="1" title="General">
                                        <Card classNames={{}}>
                                            <CardBody>
                                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                                    {data.datosadjunto.map((item: any, index) => {
                                                        return (
                                                            <>
                                                                <div className="flex flex-col gap-3">
                                                                    <div className="flex items-center">
                                                                        <div className="w-2 h-6  bg-blue-400 mr-2"></div>
                                                                        <h1 className="text-xl font-bold">Inicio</h1>
                                                                    </div>
                                                                    <Input
                                                                        label="Nombre del Curso(Titulo)"
                                                                        placeholder=""
                                                                        value={TituloValue}
                                                                        onValueChange={setTituloValue}
                                                                    />
                                                                    <Textarea
                                                                        label="Description"
                                                                        placeholder="Enter your description"
                                                                        value={DescripcionValue}
                                                                        onValueChange={setDescripcionValue}
                                                                        className="max-w-xs"
                                                                    />


                                                                    <Autocomplete
                                                                        label="Calificación"
                                                                        variant="bordered"
                                                                        placeholder="Seleccionar la opción"
                                                                        selectedKey={CalificacionValue}
                                                                        onSelectionChange={(key) => {
                                                                            if (key !== null) {
                                                                                setCalificacionValue(key.toString());
                                                                            }
                                                                        }}

                                                                    >
                                                                        <AutocompleteItem key={1} value={"1"}>
                                                                            1
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={1.5} value={"1.5"}>
                                                                            1.5
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={2} value={"2"}>
                                                                            2
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={2.5} value={"2.5"}>
                                                                            2.5
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={3} value={"3"}>
                                                                            3
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={3.5} value={"3.5"}>
                                                                            3.5
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={4} value={"4"}>
                                                                            4
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={4.5} value={"4.5"}>
                                                                            4.5
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={5} value={"5"}>
                                                                            5
                                                                        </AutocompleteItem>
                                                                    </Autocomplete>
                                                                    <Input
                                                                        label="Estudiantes"
                                                                        placeholder=""
                                                                        value={SeguidoresValue}
                                                                        onValueChange={setSeguidoresValue}
                                                                    />
                                                                    <Autocomplete
                                                                        label="Nivel"
                                                                        variant="bordered"
                                                                        placeholder="Seleccionar la opción"
                                                                        selectedKey={NivelValue}
                                                                        onSelectionChange={(key) => {
                                                                            if (key !== null) {
                                                                                setNivelValue(key.toString());
                                                                            }
                                                                        }}
                                                                    >
                                                                        <AutocompleteItem key={"Facil"} value={"Facil"}>
                                                                            Facil
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={"Normal"} value={"Normal"}>
                                                                            Normal
                                                                        </AutocompleteItem>
                                                                        <AutocompleteItem key={"Dificil"} value={"Dificil"}>
                                                                            Dificil
                                                                        </AutocompleteItem>
                                                                    </Autocomplete>

                                                                    <CheckboxGroupComponent
                                                                        value={selectMarcasRespaldoValue}
                                                                        onChange={setSelectMarcasRespaldoValue}
                                                                    />
                                                                    <div className="flex gap-3">
                                                                        <Input
                                                                            label="Examen Final"
                                                                            placeholder=""
                                                                            value={ExamenParcialValue}
                                                                            onValueChange={setExamenParcialValue}
                                                                        />
                                                                        <Input
                                                                            label="Examen Parcial"
                                                                            placeholder=""
                                                                            value={ExamenFinalValue}
                                                                            onValueChange={setExamenFinalValue}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-3">
                                                                        <div className="flex items-center">
                                                                            <div className="w-2 h-6  bg-blue-400 mr-2"></div>
                                                                            <h1 className="text-xl font-bold">Lo que aprenderas</h1>
                                                                        </div>
                                                                        <div className="flex gap-4 justify-center items-center">
                                                                            <Input
                                                                                label="Titulo"
                                                                                placeholder=""
                                                                                value={ATitulo1Value}
                                                                                onValueChange={setATitulo1Value}
                                                                            />
                                                                            <Textarea
                                                                                label="Description"
                                                                                placeholder="Enter your description"
                                                                                className="max-w-xs"
                                                                                value={ADescripcion1Value}
                                                                                onValueChange={setADescripcion1Value}
                                                                            />
                                                                        </div>
                                                                        <div className="flex gap-4 justify-center items-center">
                                                                            <Input
                                                                                label="Titulo"
                                                                                placeholder=""
                                                                                value={ATitulo2Value}
                                                                                onValueChange={setATitulo2Value}
                                                                            />
                                                                            <Textarea
                                                                                label="Description"
                                                                                placeholder="Enter your description"
                                                                                className="max-w-xs"
                                                                                value={ADescripcion2Value}
                                                                                onValueChange={setADescripcion2Value}
                                                                            />
                                                                        </div>
                                                                        <div className="flex gap-4 justify-center items-center">
                                                                            <Input
                                                                                label="Titulo"
                                                                                placeholder=""
                                                                                value={ATitulo3Value}
                                                                                onValueChange={setATitulo3Value}
                                                                            />
                                                                            <Textarea
                                                                                label="Description"
                                                                                placeholder="Enter your description"
                                                                                className="max-w-xs"
                                                                                value={ADescripcion3Value}
                                                                                onValueChange={setADescripcion3Value}
                                                                            />
                                                                        </div>
                                                                        <div className="flex gap-4 justify-center items-center">
                                                                            <Input
                                                                                label="Titulo"
                                                                                placeholder=""
                                                                                value={ATitulo4Value}
                                                                                onValueChange={setATitulo4Value}
                                                                            />
                                                                            <Textarea
                                                                                label="Description"
                                                                                placeholder="Enter your description"
                                                                                className="max-w-xs"
                                                                                value={ADescripcion4Value}
                                                                                onValueChange={setADescripcion4Value}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col gap-3">
                                                                        <div className="flex items-center">
                                                                            <div className="w-2 h-6  bg-blue-400 mr-2"></div>
                                                                            <h1 className="text-xl font-bold">Profesores</h1>
                                                                        </div>
                                                                        <Select
                                                                            selectionMode="multiple"
                                                                            label="Seleccione los profesores del curso"
                                                                            variant="bordered"
                                                                            selectedKeys={selectProfesoresValue}
                                                                            onSelectionChange={setSelectProfesoresValue}
                                                                        >
                                                                            {data.docentes.map((item: any, key) => (
                                                                                <SelectItem key={item.IdUsuario} value={item.IdUsuario}>
                                                                                    {item.IdUsuario + ' ' + item.Nombres + ' ' + item.Apellidos}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </Select>

                                                                    </div>
                                                                    <div className="p-6">
                                                                        <button onClick={vermodulos}>ver</button>
                                                                        <h1 className="text-2xl font-bold mb-6">Gestión de Módulos y Temas</h1>

                                                                        <div className="mb-6">
                                                                            <Input
                                                                                value={nuevoModulo}
                                                                                onChange={(e) => setNuevoModulo(e.target.value)}
                                                                                placeholder="Nombre del nuevo módulo"
                                                                                fullWidth
                                                                            />
                                                                            <Button onClick={handleCrearModulo} className="mt-4">
                                                                                Crear Módulo
                                                                            </Button>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            {modulos.map((modulo) => (
                                                                                <div key={modulo.id} className="border p-4 rounded-lg shadow">
                                                                                    <div className="flex justify-between items-center">
                                                                                        <h2 className="text-xl font-semibold">{modulo.nombre}</h2>
                                                                                        <Button size="sm" onClick={() => handleEliminarModulo(modulo.id)}>
                                                                                            Eliminar Módulo
                                                                                        </Button>
                                                                                    </div>

                                                                                    <ul className="mt-4">
                                                                                        {modulo.temas.map((tema: any) => (
                                                                                            <li key={tema.nombre + tema.tiempo} className="flex justify-between items-center">
                                                                                                <span>{tema.nombre} - {tema.tiempo}</span>
                                                                                                <Button onClick={() => handleEliminarTema(modulo.id, tema.nombre, tema.tiempo)}>
                                                                                                    Eliminar
                                                                                                </Button>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>

                                                                                    {selectedModulo === modulo.id && (
                                                                                        <div className="mt-4">
                                                                                            <Input
                                                                                                value={nuevoTema}
                                                                                                onChange={(e) => setNuevoTema(e.target.value)}
                                                                                                placeholder="Nuevo tema"
                                                                                                fullWidth
                                                                                            />
                                                                                            <Input
                                                                                                value={nuevoTiempo}
                                                                                                onChange={(e) => setNuevoTiempo(e.target.value)}
                                                                                                placeholder="Tiempo (ej. 00:00)"
                                                                                                fullWidth
                                                                                                className="mt-2"
                                                                                            />
                                                                                            <Button onClick={() => handleAgregarTema(modulo.id)} className="mt-2">
                                                                                                Agregar Tema
                                                                                            </Button>
                                                                                        </div>
                                                                                    )}

                                                                                    <Button
                                                                                        className="mt-4"
                                                                                        onClick={() => setSelectedModulo(modulo.id === selectedModulo ? null : modulo.id)}
                                                                                    >
                                                                                        {selectedModulo === modulo.id ? 'Cerrar' : 'Agregar Tema'}
                                                                                    </Button>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </>
                                                        )
                                                    })}
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center">
                                                            <div className="w-2 h-6  bg-blue-400 mr-2"></div>
                                                            <h1 className="text-xl font-bold">Adjuntos</h1>
                                                        </div>
                                                        <div className="w-full grid grid-cols-3 gap-4">
                                                            {data.datosadjunto1.map((item: any, index) => {
                                                                const tipo = getFileType(item.RutaImagen);
                                                                switch (tipo) {
                                                                    case 'imagen':
                                                                        return (
                                                                            <div key={index} className="flex flex-col gap-3 items-center">
                                                                                <h1>Imagen</h1>
                                                                                <div className="w-40 h-40 relative cursor-pointer">
                                                                                    <Image
                                                                                        src={environment.baseUrlStorage + item.RutaImagen}
                                                                                        alt={`Imagen ${index}`}
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
                                                                        );
                                                                    case 'video':
                                                                        return (
                                                                            <div key={index} className="flex flex-col gap-3 items-center">
                                                                                <h1>Video</h1>
                                                                                <div className="w-40 h-40 relative cursor-pointer">
                                                                                    <video
                                                                                        controls
                                                                                        width="600"
                                                                                        className="absolute w-full h-full z-[9] cursor-pointer"
                                                                                    >
                                                                                        <source src={environment.baseUrlStorage + item.RutaImagen} type="video/mp4" />
                                                                                    </video>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="video/*"
                                                                                        onChange={(e) => handleFileChange(e, 'VideoCursoPresentacion')}
                                                                                        className="absolute w-full h-full z-[10] opacity-0 cursor-pointer"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    case 'certificadoAdelante':
                                                                        return (
                                                                            <div key={index} className="flex flex-col gap-3 items-center">
                                                                                <h1>Certificado Adelante</h1>
                                                                                <div className="w-40 h-40 relative cursor-pointer">
                                                                                    <Image
                                                                                        src={environment.baseUrlStorage + item.RutaImagen}
                                                                                        alt={`Certificado Adelante ${index}`}
                                                                                        removeWrapper
                                                                                        className="absolute w-full h-full z-[9] cursor-pointer"
                                                                                    />
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="image/*"
                                                                                        onChange={(e) => handleFileChange(e, 'DAdelante')}
                                                                                        className="absolute w-full h-full z-[10] opacity-0 cursor-pointer"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    case 'certificadoAtras':
                                                                        return (
                                                                            <div key={index} className="flex flex-col gap-3 items-center">
                                                                                <h1>Certificado Atras</h1>
                                                                                <div className="w-40 h-40 relative cursor-pointer">
                                                                                    <Image
                                                                                        src={environment.baseUrlStorage + item.RutaImagen}
                                                                                        alt={`Certificado Atras ${index}`}
                                                                                        removeWrapper
                                                                                        className="absolute w-full h-full z-[9] cursor-pointer"
                                                                                    />
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="image/*"
                                                                                        onChange={(e) => handleFileChange(e, 'DAtras')}
                                                                                        className="absolute w-full h-full z-[10] opacity-0 cursor-pointer"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    case 'brochure':
                                                                        return (
                                                                            <div key={index} className="flex flex-col gap-3 items-center">
                                                                                <h1>Brochure</h1>
                                                                                <div className="w-40 h-40 relative cursor-pointer">
                                                                                    <iframe
                                                                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(environment.baseUrlStorage + item.RutaImagen)}&embedded=true`}
                                                                                        width="100%"
                                                                                        height="600px"
                                                                                        className="absolute w-full h-full z-[9] cursor-pointer"
                                                                                        frameBorder="0"
                                                                                    ></iframe>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="application/pdf"
                                                                                        onChange={(e) => handleFileChange(e, 'Brochure')}
                                                                                        className="absolute w-full h-full z-[10] opacity-0 cursor-pointer"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    default:
                                                                        return null;
                                                                }
                                                            })}
                                                        </div>
                                                    </div>
                                                    <Button type="submit" className="bg-[var(--ccdcolordark)] text-tiny m-auto w-[50%] mt-5" color="primary" radius="sm" size="sm">
                                                        Guardar Configuraciones
                                                    </Button>
                                                </form>

                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="2" title="Modalidades">
                                        <Card>
                                            <CardBody className="flex flex-col gap-5 text-center justify-center">
                                                {vermodalidades.map((item: any, index: number) => (
                                                    <div key={index} className="flex gap-3 items-center">
                                                        <div className="flex flex-col gap-2">
                                                            <h1>{item.TipoModalidad}</h1>
                                                            <Input
                                                                label="Precio"
                                                                placeholder=""
                                                                value={item.Precio}
                                                                onValueChange={setPrecioMixtoValue}
                                                                onChange={(e) => handlePriceChange(index, e.target.value)}
                                                            />
                                                        </div>
                                                        <Button
                                                            className={`w-40 text-white p-2 ${item.Estado_id === "1" ? "bg-green-500" : "bg-red-500"
                                                                }`}
                                                            onClick={() => handleToggleEstado(index)}
                                                        >
                                                            {item.Estado_id === "1" ? "Activo" : "Inactivo"}
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button onClick={handleGuardar} className="bg-[#006FEE] text-tiny text-white m-auto w-[50%] mt-5" color="primary" radius="sm" size="sm">
                                                    Guardar Configuraciones
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="5" title="Evaluacion">
                                        <Card>
                                            <CardBody className="flex flex-col gap-5 text-center justify-center ">

                                                <Button onClick={() => { setvercrearevaluacion(true) }}>Crear Evaluacion</Button>
                                                {vercrearevaluacion && (
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex gap-5">
                                                            <Input label="Evaluacion" type="text" value={evaluacion} onValueChange={setevaluacion} />
                                                            <Input label="Descripcion" type="text" value={descripcion} onValueChange={setdescripcion} />

                                                        </div>
                                                        <div className="flex flex-col gap-3">
                                                            <Autocomplete
                                                                label="TipoEvaluacion"
                                                                variant="bordered"
                                                                defaultItems={tipoevalucionarray}
                                                                placeholder="Seleccionar la opción"
                                                                selectedKey={tipoevaluacion}
                                                                onSelectionChange={(value) => settipoevaluacion(String(value ?? ""))}
                                                            >
                                                                {(item: any) => (
                                                                    <AutocompleteItem key={item.key} value={String(item.key)}>
                                                                        {`${String(item.name)}`}
                                                                    </AutocompleteItem>
                                                                )}
                                                            </Autocomplete>
                                                            <Input label="Duracion" type="text" value={duracion} onValueChange={setduracion} />
                                                            <Input label="Intentos" type="text" value={intentos} onValueChange={setintentos} />
                                                            <div className="text-center">
                                                            </div>
                                                            <Button onClick={() => crearsala()}>Enviar</Button>
                                                        </div>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex gap-3 items-center p-3">

                                                        <h2>Evaluaciones Tipo 1</h2>
                                                        <Button
                                                            onPress={() => { abrirmodalpreguntas('1') }}
                                                            className="bg-[#006FEE] text-tiny text-white"
                                                            color="primary"
                                                            radius="sm"
                                                            size="sm"
                                                        >
                                                            <FaClipboardQuestion />
                                                        </Button>

                                                    </div>
                                                    {evaluacionesTipo1.map((item: any, index: number) => (
                                                        <div key={index} className="flex flex-col gap-3">
                                                            <Button
                                                                onPress={() => { abrirmodalevaluacionenvivo(item.IdEvaluacion) }}
                                                                className="bg-[#006FEE] text-tiny text-white"
                                                                color="primary"
                                                                radius="sm"
                                                                size="sm"
                                                            >
                                                                <MdMeetingRoom />

                                                            </Button>
                                                            <div className="w-full flex flex-col gap-3">
                                                                <p>{item.IdEvaluacion}</p>

                                                                <Input
                                                                    label="Evaluación"
                                                                    placeholder=""
                                                                    value={item.Evaluacion}
                                                                />
                                                                <Textarea
                                                                    label="Descripcion"
                                                                    placeholder=""
                                                                    value={item.Descripcion}
                                                                />
                                                            </div>

                                                        </div>
                                                    ))}
                                                    <div className="flex gap-3 items-center p-3">

                                                        <h2>Evaluaciones Tipo 2</h2>
                                                        <Button
                                                            onPress={() => { abrirmodalpreguntas('2') }}
                                                            className="bg-[#006FEE] text-tiny text-white"
                                                            color="primary"
                                                            radius="sm"
                                                            size="sm"
                                                        >
                                                            <FaClipboardQuestion />
                                                        </Button>

                                                    </div>
                                                    {evaluacionesTipo2.map((item: any, index: number) => (

                                                        <div key={index} className="flex flex-col gap-3">
                                                            <Button
                                                                onPress={() => { abrirmodalevaluacionenvivo(item.IdEvaluacion) }}
                                                                className="bg-[#006FEE] text-tiny text-white"
                                                                color="primary"
                                                                radius="sm"
                                                                size="sm"
                                                            >
                                                                <MdMeetingRoom />

                                                            </Button>
                                                            <div className="w-full flex flex-col gap-3">
                                                                <p>{item.IdEvaluacion}</p>
                                                                <Input
                                                                    label="Evaluación"
                                                                    placeholder=""
                                                                    value={item.Evaluacion}
                                                                />
                                                                <Textarea
                                                                    label="Descripcion"
                                                                    placeholder=""
                                                                    value={item.Descripcion}
                                                                />
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                                <Modal
                                                    isDismissable={false}
                                                    isKeyboardDismissDisabled={true}
                                                    isOpen={isOpen1}
                                                    onOpenChange={onOpenChange1}
                                                    size="3xl"
                                                >
                                                    <ModalContent className="h-[80%] overflow-auto">
                                                        {(onClose) => (
                                                            <>
                                                                <ModalHeader className="flex flex-col gap-1">{preguntasxtipo.length} Preguntas</ModalHeader>
                                                                <ModalBody>
                                                                    <div>
                                                                        <button
                                                                            onClick={handleAddPregunta}
                                                                            className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
                                                                        >
                                                                            Añadir Nueva Pregunta
                                                                        </button>
                                                                        {preguntasxtipo.map((pregunta: any, preguntaIndex: number) => (
                                                                            <div key={preguntaIndex} className="mb-6">
                                                                                <h3 className="font-bold text-lg">
                                                                                    {(preguntaIndex + 1) + ') ' + pregunta.Pregunta}
                                                                                </h3>
                                                                                <Select
                                                                                    className="max-w-xs"
                                                                                    label="Tipo pregunta"
                                                                                    placeholder="Seleccionar tipo"
                                                                                    variant="bordered"
                                                                                    defaultSelectedKeys={[pregunta.TipoPregunta]} // Aseguramos que el valor sea correcto
                                                                                    onChange={(event) => {
                                                                                        // Acceder al valor desde event.target.value
                                                                                        const selectedValue = (event.target as HTMLSelectElement).value;
                                                                                        console.log('dato' + selectedValue)
                                                                                        handleUpdatePregunta(preguntaIndex, "TipoPregunta", selectedValue as any);
                                                                                    }}
                                                                                >
                                                                                    <SelectItem key="1">Selección normal</SelectItem>
                                                                                    <SelectItem key="2">Selección múltiple</SelectItem>
                                                                                </Select>
                                                                                <div className="flex gap-3 items-center py-3">
                                                                                    <p className="text-gray-500">Respuesta Correcta:</p>
                                                                                    <Input
                                                                                        label="Respuesta Correcta"
                                                                                        placeholder="Ej: 1"
                                                                                        value={pregunta.RespuestaCorrecta}
                                                                                        onChange={(e) =>
                                                                                            handleUpdatePregunta(preguntaIndex, "RespuestaCorrecta", e.target.value)
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <ul className="list-disc pl-6 mt-2">
                                                                                    {(pregunta.respuestas as any).map((respuesta: any, respuestaIndex: number) => (
                                                                                        <li key={respuestaIndex} className="mb-1 flex gap-2 items-center">
                                                                                            <p>{respuesta.Orden + ')'}</p>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={respuesta.Respuesta}
                                                                                                className="border p-2 w-full"
                                                                                                onChange={(e) =>
                                                                                                    handleUpdateRespuesta(
                                                                                                        preguntaIndex,
                                                                                                        respuestaIndex,
                                                                                                        e.target.value
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                                <button
                                                                                    onClick={() => handleAddRespuesta(preguntaIndex)}
                                                                                    className="mt-2 text-blue-500"
                                                                                >
                                                                                    Añadir Respuesta
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                        <button
                                                                            onClick={handleSavePreguntas}
                                                                            className="bg-blue-500 text-white py-2 px-4 rounded"
                                                                        >
                                                                            Guardar Cambios
                                                                        </button>
                                                                    </div>
                                                                </ModalBody>

                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                                <Modal
                                                    isDismissable={false}
                                                    isKeyboardDismissDisabled={true}
                                                    isOpen={isOpen4}
                                                    onOpenChange={onOpenChange4}
                                                    size="3xl"
                                                >
                                                    <ModalContent className="h-[80%] overflow-auto">
                                                        {(onClose) => (
                                                            <>
                                                                <ModalHeader className="flex flex-col gap-1">Evaluacion por sala</ModalHeader>
                                                                <ModalBody>
                                                                    <div>
                                                                        <Autocomplete
                                                                            label="Área"
                                                                            variant="bordered"
                                                                            defaultItems={listarsalasporproducto}
                                                                            placeholder="Seleccionar la opción"
                                                                            selectedKey={evsala}
                                                                            onSelectionChange={(value) => setevsala(String(value ?? ""))}
                                                                        >
                                                                            {(item: any) => (
                                                                                <AutocompleteItem key={item.IdSala} value={String(item.IdSala)}>
                                                                                    {`${String(item.Sala)}`}
                                                                                </AutocompleteItem>
                                                                            )}
                                                                        </Autocomplete>
                                                                        <DatePicker className="max-w-[284px]" label="Fecha Inicio" value={evfechainicio}
                                                                            onChange={setevfechainicio} />
                                                                        <DatePicker className="max-w-[284px]" label="Fecha Fin" value={evfechafin}
                                                                            onChange={setevfechafin} />
                                                                        <Button onPress={() => { agregarsalaevaluacion() }}>
                                                                            Enviar
                                                                        </Button>
                                                                    </div>
                                                                </ModalBody>

                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="6" title="Salas">
                                        <Card>
                                            <CardBody className="flex flex-col gap-5 text-center justify-center">
                                                <Button onClick={() => { setvercrearsala(!vercrearsala) }}>{!vercrearsala ? 'Crear ' : 'Ocultar creación de '}sala</Button>
                                                {vercrearsala && (<div className="flex flex-col gap-3">
                                                    <Input label="Sala" type="email" value={sala} onValueChange={setsala} />
                                                    <div className="flex gap-5">
                                                        <DatePicker className="max-w-[284px]" label="Fecha Inicio" value={fechainicio}
                                                            onChange={setfechainicio} />
                                                        <DatePicker className="max-w-[284px]" label="Fecha Fin" value={fechafin}
                                                            onChange={setfechafin} />
                                                    </div>

                                                    <Autocomplete
                                                        label="Área"
                                                        variant="bordered"
                                                        defaultItems={listardocentes}
                                                        placeholder="Seleccionar la opción"
                                                        selectedKey={docenteactual}
                                                        onSelectionChange={(value) => setdocenteactual(String(value ?? ""))}
                                                    >
                                                        {(item: any) => (
                                                            <AutocompleteItem key={item.IdUsuario} value={String(item.Usuario)}>
                                                                {`${String(item.Usuario + ' | ' + item.Nombres + ' ' + item.Apellidos)}`}
                                                            </AutocompleteItem>
                                                        )}
                                                    </Autocomplete>

                                                    <Input label="Horario" type="email" value={horario} onValueChange={sethorario} />
                                                    <Input label="MaximoAlumnos" type="email" value={maximoalumnos} onValueChange={setmaximoalumnos} />
                                                    <Select
                                                        className="max-w-xs"
                                                        label="Frecuencia"
                                                        placeholder="Seleccionar Fechas"
                                                        selectionMode="multiple"
                                                        selectedKeys={frecuencia}
                                                        variant="bordered"
                                                        onSelectionChange={setfrecuencia}
                                                    >
                                                        {days.map((days) => (
                                                            <SelectItem key={days.key}>{days.label}</SelectItem>
                                                        ))}
                                                    </Select>                                            <div className="text-center">
                                                        <Button onClick={() => crearsala()}>Enviar</Button>
                                                    </div>
                                                </div>)}

                                                {salas.map((item: any, index: number) => (
                                                    <div key={index} className="overflow-hidden rounded-xl w-full bg-blue-500 p-6 text-white shadow-lg transition-transform hover:scale-[1.02] flex gap-2">
                                                        <div className="w-[80%]">
                                                            <div className="mb-4 flex items-baseline justify-between">
                                                                <h2 className="text-2xl font-bold">Sala {item.Sala}</h2>
                                                                <time className="text-sm text-blue-100"> {new Date(item.FechaInicio).toLocaleDateString('es-ES', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                })}
                                                                </time>
                                                            </div>

                                                            <div className="mb-6 space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium">{item.Horario}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium"> {item.Frecuencia.split(',').map((num: string) => {
                                                                        const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
                                                                        return dias[parseInt(num.trim())];
                                                                    }).join(', ')}</span>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span>Capacidad</span>
                                                                    <span>{item.CantidadActualAlumnos}/{item.MaximoAlumnos}</span>
                                                                </div>
                                                                <Progress classNames={{ "indicator": `bg-white` }} value={(item.CantidadActualAlumnos / item.MaximoAlumnos) * 100} aria-label={`Progreso del curso: ${50}%`} />
                                                            </div>
                                                        </div>
                                                        <div className="w-[20%] flex flex-col gap-3">
                                                            <Button onPress={() => abrirgrabaciones(item.IdSala)}>
                                                                Grabaciones
                                                            </Button>
                                                            <Button onPress={() => abrirprofesor(item.IdSala)}>
                                                                Añadir Profesor
                                                            </Button>
                                                            <Button onPress={() => abrireditarvalores(item.IdSala)}>
                                                                Editar valores
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Modal
                                                    isDismissable={false}
                                                    isKeyboardDismissDisabled={true}
                                                    isOpen={isOpen2}
                                                    onOpenChange={onOpenChange2}
                                                >
                                                    <ModalContent className="h-[80%] overflow-auto">
                                                        {(onClose) => (
                                                            <>
                                                                <ModalHeader className="flex flex-col gap-1">Grabaciones en vivo</ModalHeader>
                                                                <ModalBody>
                                                                    <div className="flex flex-col gap-2">
                                                                        {productotemariodatos.map((item: any, index: number) => (
                                                                            <div key={index} className="bg-blue-500 rounded-xl p-3">
                                                                                <h1 className="text-white">Módulo {item.Numeracion}</h1>
                                                                                <Popover placement="right">
                                                                                    <PopoverTrigger>
                                                                                        <button className="text-white bg-red-500 p-2 rounded-xl">Subir Grabación</button>
                                                                                    </PopoverTrigger>
                                                                                    <PopoverContent>
                                                                                        <div className="px-1 py-2">
                                                                                            <input type="file" accept="video/*"
                                                                                                onChange={(event) => subirvideoenvivo(event, item.IdProductoTemario)} />
                                                                                        </div>
                                                                                    </PopoverContent>
                                                                                </Popover>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                                        Close
                                                                    </Button>
                                                                    <Button color="primary" onPress={onClose}>
                                                                        Action
                                                                    </Button>
                                                                </ModalFooter>
                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                                <Modal
                                                    isDismissable={false}
                                                    isKeyboardDismissDisabled={true}
                                                    isOpen={isOpen3}
                                                    onOpenChange={onOpenChange3}
                                                >
                                                    <ModalContent className="h-[80%] overflow-auto">
                                                        {(onClose) => (
                                                            <>
                                                                <ModalHeader className="flex flex-col gap-1">Añadir Docentes</ModalHeader>
                                                                <ModalBody>
                                                                    {listardocentessala.map((item: any, index: number) => (
                                                                        <div key={index}>
                                                                            {item.Usuario + ' | ' + item.Nombres + ' ' + item.Apellidos}
                                                                        </div>
                                                                    ))}
                                                                    <Autocomplete
                                                                        label="Área"
                                                                        variant="bordered"
                                                                        defaultItems={listardocentes}
                                                                        placeholder="Seleccionar la opción"
                                                                        selectedKey={docenteactual}
                                                                        onSelectionChange={(value) => setdocenteactual(String(value ?? ""))}
                                                                    >
                                                                        {(item: any) => (
                                                                            <AutocompleteItem key={item.IdUsuario} value={String(item.Usuario)}>
                                                                                {`${String(item.Usuario + ' | ' + item.Nombres + ' ' + item.Apellidos)}`}
                                                                            </AutocompleteItem>
                                                                        )}
                                                                    </Autocomplete>
                                                                    <Button onPress={() => añadirprofesor()}>
                                                                        Enviar
                                                                    </Button>
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                                        Close
                                                                    </Button>
                                                                    <Button color="primary" onPress={onClose}>
                                                                        Action
                                                                    </Button>
                                                                </ModalFooter>
                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                                <Modal
                                                    isDismissable={false}
                                                    isKeyboardDismissDisabled={true}
                                                    isOpen={isOpen5}
                                                    onOpenChange={onOpenChange5}
                                                >
                                                    <ModalContent className="h-[80%] overflow-auto">
                                                        {(onClose) => (
                                                            <>
                                                                <ModalHeader className="flex flex-col gap-1">Editar valores</ModalHeader>
                                                                <ModalBody>
                                                                    <div className="flex flex-col gap-3">
                                                                        <Input label="Numero de reunión" type="text" value={numeroreunion} onValueChange={setnumeroreunion} />
                                                                        <Input label="Clave de reunión" type="text" value={clavereunion} onValueChange={setclavereunion} />
                                                                        <Button className="bg-[#006FEE] text-tiny text-white m-auto w-[50%] mt-5" onPress={()=>{guardarabrireditarvalores()}}>
                                                                            Guardar
                                                                        </Button>
                                                                    </div>

                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                                        Close
                                                                    </Button>
                                                                    <Button color="primary" onPress={onClose}>
                                                                        Action
                                                                    </Button>
                                                                </ModalFooter>
                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
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
            </Modal >
        </>
    );
}
