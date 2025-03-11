'use client'
import { useEffect, useState } from "react"
import { Button, Select, SelectItem,Image } from "@nextui-org/react"
import { ChevronDown, Download, Eye, LayoutGrid, LayoutList } from "lucide-react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { environment } from "@/environments/environment";
import { useSession } from "next-auth/react";


export default function Component() {
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const { data: session } = useSession();

  const certificates = [
    { id: 1, name: 'Nombre del Certificado', code: 'Código del certificado' },
    { id: 2, name: 'Nombre del Certificado', code: 'Código del certificado' },
    { id: 3, name: 'Nombre del Certificado', code: 'Código del certificado' },
    { id: 4, name: 'Nombre del Certificado', code: 'Código del certificado' },
    { id: 5, name: 'Nombre del Certificado', code: 'Código del certificado' },
  ]

  const months = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    // Add more months...
  ]

  const years = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    // Add more years...
  ]

  const [datadiplomas, setdatadiplomas] = useState([]);
  const [imagenesSeparadas, setImagenesSeparadas] =  useState<{ ruta: string }[]>([]);

  useEffect(() => {
    if (session?.user) {
      const loadData = async () => {
        try {
          const responseTipoDocumento = await api.post("/inicio/listarcertificadosxusuario", {
            fusuario_id: session?.user.uid
          });
          setdatadiplomas(responseTipoDocumento.data.data[0])

          if (responseTipoDocumento.data.data[0][0].RutaImagen) {
            const imagenesArray = responseTipoDocumento.data.data[0][0].RutaImagen.split(',').map((img:any) => ({ ruta: img }));
            setImagenesSeparadas(imagenesArray);
          }

        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }

  }, [session?.user.Usuario])


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);


  const openModal = (index: number) => {
    console.log(JSON.stringify(imagenesSeparadas))
      setCurrentSlide(index + 1);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden'; // Desactivar el scroll en el fondo
  };

  const closeModal = () => {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto'; // Reactivar el scroll en el fondo
  };

  const plusSlides = (n: number) => {
      setCurrentSlide((prevIndex) => {
          const newIndex = prevIndex + n;
          if (newIndex > datadiplomas.length) return 1;
          if (newIndex < 1) return datadiplomas.length;
          return newIndex;
      });
  };
  return (
    <div className="w-[90%] max-sm:w-full mx-auto p-6 max-sm:p-2 max-lg:pt-10">
      <div className="">
        <h1 className="text-2xl font-bold text-blue-500">Mis Certificados</h1>
       
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10' : 'space-y-4'}`}>
        {datadiplomas.map((cert:any,index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-xl p-4 ${viewMode === 'list' ? 'flex justify-between items-center max-md:flex-col' : ''
              }`}
          >
            <div>
              <h3 className="text-blue-500 font-medium">Nombre del Certificado: {cert.Modelo}</h3>
              <p className="text-gray-500 text-sm">Fecha de Generación: {cert.FechaGenerado}</p>
              <p className="text-gray-500 text-sm">Código del certificado: {cert.CodigoCertificado}</p>
            </div>

            {/* Imagen del certificado renderizada en el div */}
            <Image
              alt="certificado"
              src={environment.baseUrlStorage+"/Multimedia/Imagen/Usuarios/Certificados/"+cert.RutaImagen.split(',')[0]}
              width={500}
              height={300}
              className={`shadow-xl w-full max-lg:h-[15rem] h-[20rem] object-fill ${viewMode === 'grid' ? 'block' : 'hidden'}`}
            />

            {/* Botones de acción */}
            <div className="flex justify-center gap-2 mt-2">
              <Button variant="ghost" size="sm" className="text-blue-1" onClick={() => openModal(0)}>
                <Eye className="h-4 w-4 mr-1 text-black" />
                Ver Certificado
              </Button>
              <a href="/Multimedia/Imagen/CERTIFICADO PFE CCD_page-0001.jpg" download="Certificado.jpg">
                <Button variant="ghost" size="sm" className="text-blue-1">
                  <Download className="h-4 w-4 mr-1 text-black" />
                  Descargar Certificado
                </Button>
              </a>
            </div>

        
          </div>
        ))}
        {isModalOpen && (
                <div
                    id="modal"
                    className="fixed w-full h-full inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[1000]"
                >
                    <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
                        {/* Close Button */}
                        <div className="relative flex justify-center items-center w-full h-full p-4">
                            <img
                                src={environment.baseUrlStorage+"/Multimedia/Imagen/Usuarios/Certificados/"+imagenesSeparadas[currentSlide - 1].ruta}
                                className="w-full h-full object-contain"
                                alt={`Slide ${currentSlide}`}
                            />
                            <button
                                className="absolute top-4 right-4 text-white text-4xl cursor-pointer p-2"
                                onClick={closeModal}
                            >
                                X
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 cursor-pointer"
                            onClick={() => plusSlides(-1)}
                        >
                            &#10094;
                        </button>
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-60 p-2 cursor-pointer"
                            onClick={() => plusSlides(1)}
                        >
                            &#10095;
                        </button>

                        {/* Slide Counter */}
                        <div className="absolute bottom-12 w-full flex justify-center p-2 bg-black bg-opacity-60">
                            <p className="text-white">
                                {currentSlide} / {datadiplomas.length}
                            </p>
                        </div>

                        {/* Thumbnail Navigation */}
                        <div className="absolute bottom-2 w-full flex justify-center gap-2 p-2 bg-black bg-opacity-60 overflow-auto">
                            {imagenesSeparadas.map((img:any, index) => (
                                <img
                                    key={index}
                                    src={environment.baseUrlStorage+"/Multimedia/Imagen/Usuarios/Certificados/"+img.ruta}
                                    className={`w-16 h-16 object-cover cursor-pointer border-2 border-transparent ${currentSlide === index + 1 ? 'border-white opacity-100' : 'opacity-60'}`}
                                    onClick={() => setCurrentSlide(index + 1)}
                                    alt={`Thumbnail ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
      </div>
    </div>
  )
}