import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import PacksSectionModalCasiV2 from "./packsectionmodal-CASI-V2";
import CountdownTimerModal from "./countdowntimermodal";
import { FaCircleCheck } from "react-icons/fa6";
import PackSection from "./packsectionModals";
import { useEffect, useState } from "react";

interface tailwind{
    css : string;
}

export default function App({css}: tailwind) {
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
  return (
    <>
      <button
        onClick={onOpen}
        className={css}
      >
        ¡SUSCRIBIRME AHORA!
      </button>
      <Modal

size={sizeRes}
        backdrop="opaque"
        shouldBlockScroll={true}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ",
          body: "!p-0 !h-full",
          closeButton: "text-black bg-white m-3",
        }}
        className="  bg-sectors-PromoForm2 "
        isOpen={isOpen}
        onOpenChange={onOpenChange}


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
              {/* <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader> */}
              <ModalBody className="overflow-y-auto h-full scrollbar-hide ">
                <PackSection bg=""/>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
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
