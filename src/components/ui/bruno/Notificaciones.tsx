import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from '@/environments/environment';
import { useSearchParams } from 'next/navigation';

// Interfaces
interface BackdropProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

interface Anuncio {
  IdAnuncio: number;
  Usuario_id: number;
  Producto_id: number;
  Sala_id: number;
  Fecha: string;
  Asunto: string;
  Mensaje: string;
  NombreFormateado:string;
  Estado_id: string;
  UltimaFechMod: string;
  UltimoUserMod: string;
}

// Componentes básicos
const Backdrop: React.FC<BackdropProps> = ({ onClick, className }) => (
  <div onClick={onClick} className={`fixed inset-0 bg-black/50 z-40 ${className || ''}`} />
);

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 z-50 w-[90%] max-w-[425px] ${className || ''}`}
      >
        {children}
      </div>
    </>
  );
};

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'avatar', className }) => (
  <img src={src} alt={alt} className={`w-12 h-12 rounded-full object-cover ${className || ''}`} />
);

const Anuncios: React.FC = () => {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  const psala = searchParams.get('psala');
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnuncio, setSelectedAnuncio] = useState<Anuncio | null>(null);

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  // Cargar los anuncios usando la consulta adaptada
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.post("/inicio/listaranunciosxcursov2", {
          fproducto_id: pid,
          fsala_id: psala,
        });
        // Se asume que el endpoint devuelve { data: { data: Anuncio[] } }
        setAnuncios(response.data.data[0]);
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    loadData();
  }, [pid, psala]);

  // Manejar el click en un anuncio para abrir el modal
  const handleClick = (anuncio: Anuncio) => {
    setSelectedAnuncio(anuncio);
    setIsOpen(true);
  };

  return (
    <>
      {/* Listado de anuncios */}
      <div className="flex flex-col gap-4">
        {anuncios.map((anuncio) => (
          <div
            key={anuncio.IdAnuncio}
            onClick={() => handleClick(anuncio)}
            className="bg-[#131939] p-4 rounded-2xl relative flex gap-5 items-center cursor-pointer hover:bg-[#131939]/70 transition-all duration-200 border-blue-400 border"
          >
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <div className="flex flex-col gap-2">
              <p className="flex gap-1 items-center m-0">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="text-white">Asunto: {anuncio.Asunto}</span>
              </p>
              <p className="flex gap-1 items-center m-0">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
                <span className="text-white">Fecha de publicación: {anuncio.Fecha}</span>
              </p>
            </div>
            <div
              className={`
                text-xs absolute top-[-1rem] right-[-1rem] text-white 
                rounded-full h-10 w-10 flex items-center justify-center
                transition-colors duration-300 bg-red-500
              `}
            >
              Nuevo
            </div>
          </div>
        ))}
      </div>

      {/* Modal para ver el detalle del anuncio seleccionado */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="!bg-transparent !p-0" >
        {selectedAnuncio && (
          <div className="relative bg-[#131939] p-4 rounded-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold !mb-7 text-white">{selectedAnuncio.Asunto}</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <div className="flex flex-col gap-1">
                  {/* Aquí podrías mostrar más información del usuario si lo tienes */}
                  <h3 className="font-semibold text-white m-0 text-lg">{selectedAnuncio.NombreFormateado}</h3>
                </div>
              </div>

              <div className="bg-[#0B1026] text-white p-4 border-blue-500/40 border rounded-xl">
                {selectedAnuncio.Mensaje}
              </div>

              <div className="text-sm text-white mt-4 flex gap-2 items-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Enviado el {selectedAnuncio.Fecha}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Anuncios;
