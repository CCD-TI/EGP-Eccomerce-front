import { Accordion, AccordionItem, Button, Card, CardBody, Checkbox, CheckboxGroup, Pagination, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa6';
import ProductoComponent from './producto';
import { environment } from '@/environments/environment';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface Props {
    url1: string,
    url2: string,
    url3: string,
}

export default function ProductoFilter({ url1, url2, url3 }: Props) {
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });
    const [productos, setProductos] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [totalproductos, setTotalProductos] = useState([{ count: 0 }]);
    const [fclasificacion, setClasificacion] = useState([]);
    const [fcategoria, setCategoria] = useState([]);
    const [fsubcategoria, setSubCategoria] = useState([]);
    const [checkboxclasificacion, setCheckboxClasificacion] = useState<any>([url1]);
    const [checkboxcategoria, setCheckboxCategoria] = useState<any>([url2]);
    const [checkboxsubcategoria, setCheckboxSubCategoria] = useState<any>([url3]);
    const [currentPage, setCurrentPage] = useState(1);

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const searchParams = useSearchParams();
    const result = searchParams.get('result') || 'default';
    useEffect(() => {

        const fetchProductosTotal = async () => {
            try {
                const response = await api.post('/inicio/listarProductoBusquedaDetallesTotal', {
                    fclasificacion: checkboxclasificacion,
                    fcategoria: checkboxcategoria,
                    fsubcategoria: checkboxsubcategoria,
                    pmodelo: result.toUpperCase(),
                    ppagina: currentPage
                });

                if (response.data.ok) {
                    setTotalProductos(response.data.data[0]);

                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await api.post('/inicio/listarProductoBusquedaDetalles', {
                    fclasificacion: checkboxclasificacion,
                    fcategoria: checkboxcategoria,
                    fsubcategoria: checkboxsubcategoria,
                    pmodelo: result.toUpperCase(),
                    ppagina: currentPage
                });

                if (response.data.ok) {
                    setProductos(response.data.data[0]);
                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchFiltroClasificacion = async () => {
            try {
                const response = await api.post('/inicio/listarFiltroClasificacion', {
                    pmodelo: result.toUpperCase()
                });

                if (response.data.ok) {
                    setClasificacion(response.data.data[0]);
                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProductosTotal();
        fetchProductos();
        fetchFiltroClasificacion();
    }, [result, currentPage]);

    useEffect(() => {
        const fetchFiltroCategoria = async () => {
            try {
                const response = await api.post('/inicio/listarFiltroCategoria', {
                    pmodelo: result.toUpperCase(),
                    fclasificacion: checkboxclasificacion
                });

                if (response.data.ok) {
                    setCategoria(response.data.data[0]);
                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchFiltroCategoria();
    }, [checkboxclasificacion, result]);

    useEffect(() => {
        const fetchFiltroSubCategoria = async () => {
            try {
                const response = await api.post('/inicio/listarFiltroSubCategoria', {
                    pmodelo: result.toUpperCase(),
                    fclasificacion: checkboxclasificacion,
                    fcategoria: checkboxcategoria
                });

                if (response.data.ok) {
                    setSubCategoria(response.data.data[0]);
                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchFiltroSubCategoria();
    }, [checkboxclasificacion, checkboxcategoria, result]);

    const filtrar = () => {
        const fetchProductos = async () => {
            try {
                const response = await api.post('/inicio/listarProductoBusquedaDetalles', {
                    pmodelo: result.toUpperCase(),
                    fsubcategoria: checkboxsubcategoria,
                    fcategoria: checkboxcategoria,
                    fclasificacion: checkboxclasificacion,
                });

                if (response.data.ok) {
                    setProductos(response.data.data[0]);
                } else {
                    console.error('Error:', response.data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProductos();
    };

    const pa = Math.ceil(totalproductos[0].count / 12);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Desplazarse al inicio de la página suavemente
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const [selectedKeys1, setSelectedKeys1] = useState<any>((["1"]));
    const [selectedKeys2, setSelectedKeys2] = useState<any>((["2"]));
    const [selectedKeys3, setSelectedKeys3] = useState<any>((["3"]));



    useEffect(() => {
        console.log(selectedKeys1.size)
    }, [selectedKeys1]);


    return (
        <div className='w-full h-full bg-[var(--newgrad2)] relative'>
            <div className='flex h-full m-auto w-[100%] gap-10 '>
                {/* Filtro modal en pantallas pequeñas */}
                <div className={`w-[80%] fixed inset-0  bg-[image:var(--newgrad2)]  z-50 overflow-y-auto px-12 py-4 ${isFilterOpen ? 'block' : 'hidden'} lg:hidden`} >
                    <div className="flex justify-end relative left-9">
                        <button onClick={closeFilter} className="text-black text-4xl p-2">
                            X
                        </button>
                    </div>
                    <Card className='bg-white'>
                        <CardBody className='flex flex-col gap-4'>
                            <h1 className='font-semibold text-xl w-[50%] py-6 flex gap-2 items-center'>Filtro <FaFilter /></h1>
                            <Accordion variant="shadow" className='!bg-white/20 !border-1 !border-solid !border-white'>
                                <AccordionItem key="1" aria-label="Accordion 1" title="Producto">
                                    <CheckboxGroup
                                        value={checkboxclasificacion}
                                        onValueChange={setCheckboxClasificacion}
                                    >
                                        {fclasificacion.map((clasificacion: any) => (
                                            <div key={clasificacion.Clasificacion} className='flex justify-between items-center gap-4'>
                                                <Checkbox value={clasificacion.Clasificacion} className='w-full'>
                                                    {clasificacion.Clasificacion}
                                                </Checkbox>
                                                <div className='bg-black/10 py-1 px-1.5'>{clasificacion.Cantidad}</div>
                                            </div>
                                        ))}
                                    </CheckboxGroup>
                                </AccordionItem>
                            </Accordion>
                            <Accordion variant="shadow" className='!bg-white/20 !border-1 !border-solid !border-white'>
                                <AccordionItem key="2" aria-label="Accordion 2" title="Categoría">
                                    <CheckboxGroup
                                        value={checkboxcategoria}
                                        onValueChange={setCheckboxCategoria}
                                    >
                                        {fcategoria.map((categoria: any) => (
                                            <div key={categoria.Categoria} className='flex justify-between items-center gap-4'>
                                                <Checkbox value={categoria.Categoria} className='w-full'>
                                                    {categoria.Categoria}
                                                </Checkbox>
                                                <div className='bg-black/10 py-1 px-[0.7rem] rounded-full flex items-center'>{categoria.Cantidad}</div>
                                            </div>
                                        ))}
                                    </CheckboxGroup>
                                </AccordionItem>
                            </Accordion>
                            <Accordion variant="shadow" className='!bg-white/20 !border-1 !border-solid !border-white' >
                                <AccordionItem key="3" aria-label="Accordion 3" title="SubCategoría">
                                    <CheckboxGroup
                                        value={checkboxsubcategoria}
                                        onValueChange={setCheckboxSubCategoria}
                                    >
                                        {fsubcategoria.map((subcategoria: any) => (
                                            <div key={subcategoria.SubCategoria} className='flex justify-between items-center gap-4'>
                                                <Checkbox value={subcategoria.SubCategoria}>
                                                    {subcategoria.SubCategoria}
                                                </Checkbox>
                                                <div className='bg-black/10 py-1 px-1.5'>{subcategoria.Cantidad}</div>
                                            </div>
                                        ))}
                                    </CheckboxGroup>
                                </AccordionItem>
                            </Accordion>
                            <Button onClick={filtrar} className="w-[100%] min-w-[2.3rem] mt-5 text-sm bg-[#002B54]" color="primary" radius="sm" size="sm">
                                <FaFilter /> Aplicar Filtro
                            </Button>
                        </CardBody>
                    </Card>
                </div>
                {/* Filtro lateral en pantallas grandes */}
                <div className={`hidden lg:block w-[20%] max-2xl:w-[30%] h-full z-1 bg-transparent `}>
                    <Card className='bg-white'>
                        <CardBody className="px-8">
                            <h1 className='font-bold text-xl w-[50%] py-6 flex gap-2 items-center text-[#3185F7]'>Filtro <FaFilter /></h1>
                            <div className='flex flex-col gap-3 '>
                                <Accordion selectedKeys={selectedKeys1} onSelectionChange={setSelectedKeys1} variant="shadow"
                                    className={`!bg-white/20 !border-1 !border-solid !border-white`}
                                    >
                                    <AccordionItem key="1" aria-label="Accordion 1" title="Producto" classNames={{ "title": "text-[#162E54]" }} >
                                        <CheckboxGroup
                                            value={checkboxclasificacion}
                                            onValueChange={setCheckboxClasificacion}

                                        >
                                            {fclasificacion.map((clasificacion: any) => (
                                                <div key={clasificacion.Clasificacion} className='flex justify-between items-center gap-4 '>
                                                    <Checkbox value={clasificacion.Clasificacion} className='w-full '>
                                                        <span className='text-[#3185F7]'>{clasificacion.Clasificacion}</span>
                                                    </Checkbox>
                                                    <div className='text-[#3185F7]'>{clasificacion.Cantidad}</div>
                                                </div>
                                            ))}
                                        </CheckboxGroup>
                                    </AccordionItem>
                                </Accordion>
                                <Accordion selectedKeys={selectedKeys2} onSelectionChange={setSelectedKeys2} variant="shadow"
                                    className='!bg-white/20 !border-1 !border-solid !border-white'>
                                    <AccordionItem key="2" aria-label="Accordion 2" title="Categoría" classNames={{ "title": "text-[#162E54]" }} >
                                        <CheckboxGroup
                                            value={checkboxcategoria}
                                            onValueChange={setCheckboxCategoria}
                                        >
                                            {fcategoria.map((categoria: any) => (
                                                <div key={categoria.Categoria} className='flex justify-between items-center gap-4'>
                                                    <Checkbox value={categoria.Categoria} className='w-full'>
                                                        <span className='text-[#3185F7]'>{categoria.Categoria}</span>

                                                    </Checkbox>
                                                    <div className=' text-[#3185F7]'>{categoria.Cantidad}</div>
                                                </div>
                                            ))}
                                        </CheckboxGroup>
                                    </AccordionItem>
                                </Accordion>
                                <Accordion selectedKeys={selectedKeys3} onSelectionChange={setSelectedKeys3} variant="shadow"
                                    className='!bg-white/20 !border-1 !border-solid !border-white'>
                                    <AccordionItem key="3" aria-label="Accordion 3" title="SubCategoría" classNames={{ "title": "text-[#162E54]" }} >
                                        <CheckboxGroup
                                            value={checkboxsubcategoria}
                                            onValueChange={setCheckboxSubCategoria}
                                        >
                                            {fsubcategoria.map((subcategoria: any) => (
                                                <div key={subcategoria.SubCategoria} className='flex justify-between items-center gap-4'>
                                                    <Checkbox value={subcategoria.SubCategoria}>
                                                        <span className='text-[#3185F7]'>{subcategoria.SubCategoria}</span>
                                                    </Checkbox>
                                                    <div className=' text-[#3185F7]'>{subcategoria.Cantidad}</div>
                                                </div>
                                            ))}
                                        </CheckboxGroup>
                                    </AccordionItem>
                                </Accordion>



                            </div>

                            <Button onClick={filtrar} className="w-[100%] min-w-[2.3rem] mt-5 text-sm bg-[var(--ccdcolordark)]" color="primary" radius="sm" size="sm">
                                <FaFilter /> Aplicar Filtro
                            </Button>
                        </CardBody>
                    </Card>
                </div>

                {/* Contenido principal */}
                <div className='w-full lg:w-[80%] h-full flex flex-col gap-2'>
                    <div className='flex max-sm:flex-col max-md:flex-col justify-between items-center py-2'>
                        <div className='flex gap-2 items-end'>
                            <span className='text-3xl text-white font-bold tracking-[-0.2rem]'>1 - {Math.ceil(totalproductos[0].count / 12)}</span>
                            <span className='text-2xl text-white font-bold '>más de</span>
                            <span className='text-3xl text-white font-bold tracking-[-0.2rem]'>{totalproductos[0].count}</span>
                            <h1>
                                <span className='text-2xl text-white'> resulta</span>
                                <span className='text-2xl underline text-white  decoration-[white] decoration-4 underline-offset-4'>dos</span>
                            </h1>

                        </div>
                        {/* Ordenar por y botón de filtro en responsive */}
                        <div className='flex gap-6 items-center justify-end w-[50%]'>
                            <button
                                onClick={toggleFilter}
                                className="p-2 bg-blue-600 text-white rounded-full lg:hidden"
                            >
                                <FaFilter />
                            </button>

                            {/* Select de Ordenar solo visible en pantallas grandes */}
                            <Select className="max-w-xs" label="Ordenar por:">
                                <SelectItem key={1}>Mayor a menor</SelectItem>
                                <SelectItem key={2}>Menor a mayor</SelectItem>
                            </Select>
                        </div>
                    </div>

                    {/* Listado de productos */}
                    <div className='h-full w-full max-2xl:w-[70%] mx-auto grid grid-cols-3 max-md:grid-cols-1 max-2xl:grid-cols-2 gap-y-12 gap-12'>
                        {productos.map((producto: any, index: number) => {
                            const id = `${producto.Clasificacion}-${producto.Modelo}`;

                            // Añadir el ID al objeto producto
                            const productoConId = { ...producto, id };
                            return (
                                <ProductoComponent key={index} array={productoConId} />
                            );
                        })}
                    </div>

                    {/* Paginación */}
                    <Pagination showControls initialPage={1} total={pa} className='mt-10' classNames={{ "wrapper": 'm-auto' }} page={currentPage} onChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}
