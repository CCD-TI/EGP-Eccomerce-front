import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import InputFile from "./inputFile";
import { IoDocumentText } from "react-icons/io5";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    


    return (
        <>
            <Button onPress={onOpen} color="default"> <div className="flex gap-2 items-center"><IoDocumentText className="h-6 w-6" /><h1>Mas informacion</h1></div> </Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#042D56] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-white",
                    footer: "border-t-[1px] border-white",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center gap-1">Complete los campos por favor</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col w-full  gap-4">
                                    
                                    <Input type="text" label="Nombres" placeholder="jhosep jeremy" />
                                    <Input type="text" label="Apellidos" placeholder="mamani quispe" />
                                    <Input type="email" label="Email" placeholder="serranoski@sinchiroca.pe" />
                                    <Input type="text" label="Telefono" placeholder="987678098" />
                                   <InputFile/>
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="bg-[#4e82f2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                                   Enviar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}