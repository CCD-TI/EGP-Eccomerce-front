"use client";

import React, { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Fondo del modal */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
        {/* Botón cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes className="w-6 h-6" />
        </button>
        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;