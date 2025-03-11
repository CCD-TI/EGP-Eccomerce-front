import React, { useState } from 'react';

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

interface AnnouncementCardProps {
  title: string;
  date: string;
  avatarSrc: string;
  content: string;
  author: {
    name: string;
    department: string;
  };
  className?: string;
}

// Componentes
const Backdrop: React.FC<BackdropProps> = ({ onClick, className }) => (
  <div 
    onClick={onClick}
    className={`fixed inset-0 bg-black/50 z-40 ${className || ''}`}
  />
);

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <Backdrop onClick={onClose} />
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 z-50 w-[90%] max-w-[425px] ${className || ''}`}>
        {children}
      </div>
    </>
  );
};

const Avatar: React.FC<AvatarProps> = ({ src, alt = "avatar", className }) => (
  <img 
    src={src} 
    alt={alt}
    className={`w-12 h-12 rounded-full object-cover ${className || ''}`}
  />
);

const Anuncios: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const announcement = {
    title: "Reprogramación de clases",
    date: "01/11/2024",
    avatarSrc: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    content: "Estimados estudiantes, les informo que la clase del día viernes será reprogramada...",
    author: {
      name: "Profesor Juan Pérez",
      department: "Departamento de Matemáticas"
    }
  };

  const handleClick = () => {
    setIsOpen(true);
    setIsNew(false);
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className="bg-white/15 p-4 rounded-2xl relative flex gap-5 items-center cursor-pointer hover:bg-white/20 transition-all duration-200"
      >
        <Avatar src={announcement.avatarSrc} />
        <div>
          <p className="flex gap-1 items-center">
            <svg 
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span className="text-white">Asunto: {announcement.title}</span>
          </p>
          <p className="flex gap-1 items-center">
            <svg 
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
            <span className="text-white">Fecha de creación: {announcement.date}</span>
          </p>
        </div>
        <div 
          className={`
            text-xs absolute top-[-1rem] right-[-1rem] text-white 
            rounded-full h-10 w-10 flex items-center justify-center
            transition-colors duration-300
            ${isNew ? 'bg-red-500' : 'bg-green-500'}
          `}
        >
          {isNew ? 'Nuevo' : 'Abierto'}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative">
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

          <h2 className="text-xl font-bold mb-4">{announcement.title}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar src={announcement.avatarSrc} />
              <div>
                <h3 className="font-semibold">{announcement.author.name}</h3>
                <p className="text-sm text-gray-500">{announcement.author.department}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              {announcement.content}
            </div>

            <div className="text-sm text-gray-500 mt-4">
              Enviado el {announcement.date}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Anuncios;