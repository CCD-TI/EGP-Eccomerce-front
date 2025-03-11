import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReactNode } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";

interface Content {
  css: string;
  titleHeader: string;
  btnicon: ReactNode;
  btntitle: string;
  btn: string;
  contents: ReactNode;
  RutaArchivo: string;
}

export default function App({
  css,
  btnicon,
  btntitle,
  btn,
  contents,
  RutaArchivo,
}: Content) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className={css} onPress={onOpen}>
        {btntitle}
        {btnicon}
      </Button>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[80vw] h-[80vh] max-w-[90vw] max-h-[90vh] max-sm:w-[100vh] max-sm:h-[100vh] max-sm:max-w-[100vh] max-sm:max-h-[100vh]"
        
      >
        <ModalContent >
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody className="">
                <iframe
                  src={RutaArchivo}
                  title="PDF Viewer"
                  className="w-full h-full"
                  style={{ border: "none" }}
                ></iframe>
              </ModalBody>
              <ModalFooter className="flex justify-end items-end w-full">
                <Button color="danger" variant="solid" onPress={onClose}>
                  Cerrar
                </Button>

                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
