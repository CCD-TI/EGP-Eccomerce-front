import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { CgLoadbarDoc } from "react-icons/cg";
import { BsQrCode } from "react-icons/bs";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const validCode = "12345"; // Código específico para mostrar el icono

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
    setShowIcon(false); // Ocultar icono cuando el usuario cambia el valor del input
  };

  const handleVerify = () => {
    if (inputValue === validCode) {
      setShowIcon(true);
    } else {
      setShowIcon(false);
    }
  };

  return (
    <>
      <Button className="bg-violet-600" onPress={onOpen}>
        <div className="flex gap-2 items-center">
          <CgLoadbarDoc className="w-6 h-6" />
          Valida tu Certificado
        </div>
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center items-center gap-10">
                  <h1 className="text-2xl text-red-800 text-center">Por favor ingresa la información requerida</h1>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2 items-center">
                      <h1 className="font-bold">Código de verificación</h1>
                      <Input 
                        type="text" 
                        label="Código" 
                        value={inputValue} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    {showIcon && <div className="flex flex-col gap-2 items-center"><h1 className="text-xs text-center">Escane el codigo QR para ver su certificado digital</h1><BsQrCode className="h-40 w-40" /></div>}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between">
              <Button color="primary" onPress={handleVerify}>
                      Verificar
                    </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
