import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface ButtonsProps {
  content: React.ReactNode;
  btnName: React.ReactNode;
  btndow: React.ReactNode;
  tHeader: string;
  css: string;
  Pcenter: React.ReactNode;
  doc: React.ReactNode;
}

export default function App({ content,css,btndow, tHeader, Pcenter, btnName,doc }: ButtonsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className={`${css} h-full`} color="default" variant="solid" onPress={onOpen}> {btnName}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}  size="3xl">
        <ModalContent className="max-w-2xl mx-auto flex flex-col ">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center ">{tHeader}</ModalHeader>
              <ModalBody className="">
                <div className="w-full flex flex-col justify-center items-center mx-auto gap-1">
                  <div className="flex flex-col gap-4">
                    <p className="text-center text-sm md:text-base">
                      {Pcenter}
                    </p>
                  </div>
                  <div className="flex gap-6 w-full">
                 {doc}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                {btndow}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
