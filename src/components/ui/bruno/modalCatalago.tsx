import React, { useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";

// Interface para el componente que será el botón
interface ButtonProps {
  btnContent: React.ReactNode;
  cssClass: string;
}

// Interface para el contenido del ModalBody
interface ModalBodyProps {
  title: string;
  description: React.ReactNode;
  docContent: React.ReactNode;
}

// Interface para los props del componente principal
interface ButtonsProps {
  buttonProps: ButtonProps;
  modalBodyProps: ModalBodyProps;
  downloadButton: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function App({ buttonProps, modalBodyProps, isOpen, setIsOpen }: ButtonsProps) {
  const videoRef = useRef<HTMLVideoElement>(null); // Referencia al video

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Pausar el video cuando se abre el modal
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.pause(); // Pausar el video cuando el modal está abierto
    }
  }, [isOpen]);

  return (
    <>
      {/* Este div será el botón que abrirá el modal */}
      <div className={`${buttonProps.cssClass}`} onClick={handleOpen}>
        {buttonProps.btnContent} {/* Contenido dinámico del botón */}
      </div>


      <Modal
        backdrop="opaque"
        size="full"
        isOpen={isOpen}
        scrollBehavior="normal"
        placement="center"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 h-full",
          closeButton: " text-transparent hover:bg-white/5 active:bg-white/10",
        }}
        onOpenChange={handleClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="p-4 bg-[url('/Multimedia/Imagen/relleno/theme.jpg')] bg-cover ">
          {(onClose) => (
            <>
              <ModalHeader>
                <Button color="primary" variant="solid" onPress={handleClose}>
                  <FaArrowLeft className="w-10 h-8" />
                </Button>
              </ModalHeader>
              <ModalBody className="w-full flex flex-col">
                <div className="overflow-y-auto max-h-[80vh] w-full px-4 m-auto">
                  <div className="w-full flex flex-col justify-center items-center mx-auto gap-4">
                    <div className="flex flex-col gap-4 px-6">
                      <p className="text-center text-sm md:text-xl">
                        {modalBodyProps.description}
                      </p>
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                      {modalBodyProps.docContent}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-end py-10">
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
