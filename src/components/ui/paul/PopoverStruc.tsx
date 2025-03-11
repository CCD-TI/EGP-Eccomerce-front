import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";

interface PropPopUp {
        img: string
}




export default function App({img}:PropPopUp) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect ( ()=>{

    const timer = setTimeout(() => {
        onOpen()
    }, 5000);

    return () => clearTimeout(timer)

  },[onOpen])

  return (
    <>
      <Modal
        size="5xl"
        placement="center"
        classNames={{
          body: " !h-full !w-fit !p-0 ",
          closeButton: "!bg-white"
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="!w-fit">
          {(onClose) => (
            <>
              <ModalBody className="mx-auto !w-fit">
                <Image alt="popover" src={img} width={700} height={800}  priority />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
