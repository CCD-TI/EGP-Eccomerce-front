import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sizeRes, setSizeRes] = useState<
    "md" | "full" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  >("md"); // Tipo explícito
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setSizeRes("full"); // Cambiar a "full" en pantallas pequeñas
      } else {
        setSizeRes("md"); // Usar "md" en pantallas grandes
      }
    };

    // Ejecutar la función al montar el componente y al redimensionar
    handleResize();
    window.addEventListener("resize", handleResize);

    // Limpieza del evento al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ejecutar la función al montar el componente y al redimensionar

  return (
    <>
      <Button
        color="secondary"
        onPress={onOpen}
        className="text-white font-bold text-lg"
      >
        Ruleta CCD
      </Button>
      <Modal
        size={sizeRes}
       
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ",
          body: "!p-0 !h-full",
          closeButton: "text-black bg-white m-4 mr-6 z-50",
        }}
      >
        <ModalContent
          style={
            sizeRes === "full"
              ? {}
              : {
                  width: "90%", // Ajusta el ancho del modal
                  maxWidth: "100%", // Tamaño máximo opcional
                  height: "80vh", // Ajusta la altura del modal
                  maxHeight: "90vh", // Tamaño máximo opcional
                }
          }
        >
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody className="overflow-y-auto h-full scrollbar-hide ">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src="https://ruleta-bonanza.lovable.app/"
                    width="100%"
                    height="100%"
                    style={{ clipPath: "inset(0 0 0 0)" }}
                  />
                </div>
              </ModalBody>
              {/* <ModalFooter>
                        <Button
                          color="danger"
                          variant="solid"
                          onPress={onClose}
                        >
                          Cerrar
                        </Button>
                        <Button color="primary" onPress={onClose}>
                  Action
                </Button>
                      </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
