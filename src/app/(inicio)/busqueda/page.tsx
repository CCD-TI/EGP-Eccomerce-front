"use client"
import { Accordion, AccordionItem, Button, Checkbox, CheckboxGroup, Divider, Image, Pagination, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Skeleton, Tab, Tabs } from '@nextui-org/react';
import React, { Suspense, useEffect, useState } from 'react';
import { FaFilter, FaRegCalendar } from 'react-icons/fa6';
import { GoClock } from 'react-icons/go';
import { LuBookMarked } from 'react-icons/lu';
import { Card, CardBody } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { FaInfoCircle, FaPhotoVideo, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { FiBookOpen } from 'react-icons/fi';
import { useCartStore } from '../../../context/cartStore';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { environment } from '@/environments/environment';
import { IoIosHeart } from 'react-icons/io';
import ProductoComponent from '@/components/ui/pricing/producto';
import { AiOutlineClose } from 'react-icons/ai';

const FiltroComponent = () => {

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });




  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const result = searchParams.get('result') || 'default';
  const [totalproductos, setTotalProductos] = useState([{ count: 0 }]);
  const [productos, setProductos] = useState([]);
  const [fclasificacion, setClasificacion] = useState([]);
  const [fcategoria, setCategoria] = useState([]);
  const [fsubcategoria, setSubCategoria] = useState([]);
  const [checkboxclasificacion, setCheckboxClasificacion] = useState<any>();
  const [checkboxcategoria, setCheckboxCategoria] = useState<any>();
  const [checkboxsubcategoria, setCheckboxSubCategoria] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    const fetchProductosTotal = async () => {
      try {
        const response = await api.post('/inicio/listarProductoBusquedaDetallesTotal', {
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


  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };


  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden'; // Desactivar scroll
    } else {
      document.body.style.overflow = 'auto'; // Activar scroll cuando el filtro se cierra
    }
  }, [isFilterOpen]);

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



  return (
    <>
      <div className='w-full h-full  relative'>
        <div className='flex max-xl:flex-col max-xl:justify-center max-xl:items-center h-full m-auto w-[90%] max-2xl:w-[95%] gap-10 py-8 max-sm:block'>
          {/* Filtro modal en pantallas pequeñas */}

            <div className="inset-0 flex-1 relative">
                {/* Capa de desenfoque detrás del contenido */}
                <div className={`fixed inset-0 bg-black/80 z-[50] ${isFilterOpen ? "block" : "hidden"}`}>
                  {/* <div className="absolute inset-0 bg-transparent filter blur-lg"></div> */}
                </div>

              
              <button
                  onClick={closeFilter}
                  className={`fixed top-4 left-[85%] text-black text-3xl focus:outline-none z-50 transition-transform duration-500 ease-in-out ${isFilterOpen ? "block" : "hidden"}`}
                    
                >
                  <AiOutlineClose className="bg-white rounded-full p-2 w-10 h-10" />
              </button>

            <div
              className={`w-[80%] fixed inset-0 bg-white z-50 overflow-y-auto px-12 pt-20 transform transition-transform duration-500 ease-in-out ${isFilterOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-500 ease-in-out`}
            >
          
            
              <Card>
                <CardBody className='flex flex-col gap-4'>
                  <h1 className='font-semibold text-2xl w-[50%] py-6 flex gap-2 items-center text-[#0077F5]'>Filtro <FaFilter className='w-5 h-5' /></h1>
                  <Accordion variant="splitted" className='!border-2 border-transparent rounded-2xl !px-0 hover:border-[#0077F5] transition-colors duration-300 ' >
                    <AccordionItem key="1" aria-label="Accordion 1" title="Producto" className=''>
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
                  <Accordion variant="splitted" className='!border-2 border-transparent rounded-2xl !px-0 hover:border-[#0077F5] transition-colors duration-300'>
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
                  <Accordion variant="splitted" className='!border-2 border-transparent rounded-2xl !px-0 hover:border-[#0077F5] transition-colors duration-300'>
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
                  <div className='flex justify-center items-center'>

                  <Button onClick={filtrar} className="mt-5 text-sm  bg-[#002B54] p-6 hover:bg-[#00D4C9]" color="primary" radius="sm" size="sm">
                    <FaFilter /> Aplicar Filtro
                  </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
            </div>

          {/* Filtro lateral en pantallas grandes */}
          <div className={`max-xl:hidden block w-[20%] h-full z-1 bg-transparent `}>
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
          <div className='w-full lg:w-[80%] h-full flex flex-col gap-2 '>
            <div className='flex max-sm:flex-col max-md:flex-col justify-between items-center gap-4 py-2'>
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
              <div className='flex gap-6 items-center justify-end w-[50%] max-sm:w-[70%]'>
                <button
                  onClick={toggleFilter}
                  className="p-2 bg-blue-600 text-white rounded-full max-xl:block hidden"
                >
                  <FaFilter className='w-6 h-6' />
                </button>

                {/* Select de Ordenar solo visible en pantallas grandes */}
                <Select className="max-w-xs" label="Ordenar por:">
                  <SelectItem key={1}>Mayor a menor</SelectItem>
                  <SelectItem key={2}>Menor a mayor</SelectItem>
                </Select>
              </div>
            </div>


            {/* Listado de productos */}
            <div className='h-full w-full  grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-y-10 gap-14 px-10'>
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
    </>
  );
};

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FiltroComponent />
      </Suspense>
    </>
  );
}
