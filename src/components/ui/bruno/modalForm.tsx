import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea, Select, SelectItem } from "@nextui-org/react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); const animals = [
        { key: 'Capacitaciones Corporativas', label: 'Capacitaciones Corporativas' },
        { key: 'Consultorias', label: 'Consultorias' },
        // { key: 'bird', label: 'Bird' },
        // { key: 'fish', label: 'Fish' },
    ];

    return (
        <>
            <Button onPress={onOpen} color="primary" className="p-6">Contactar</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-red-700 items-center text-center gap-1">¿Deseas mayor información acerca de nuestros Servicios Corporativos?</ModalHeader>
                            <ModalBody>
                                <div className="text-center text-xs">Ingresa tus datos, selecciona el servicio de tu interés y envíanos un mensaje para ayudarte.</div>
                                <Input
                                    autoFocus
                                    endContent={
                                        <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Correo"
                                    placeholder="Ingrese su Correo"
                                    variant="bordered"
                                    type="email"
                                />
                                <Input
                                    endContent={
                                        <FaUser  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Nombres"
                                    placeholder="Ingrese su Nombre"
                                    type="Text"
                                    variant="bordered"
                                />
                                <Input
                                    endContent={
                                        <TbDeviceLandlinePhone  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Numero"
                                    placeholder="Ingrese su Numero"
                                    type="text"
                                    variant="bordered"
                                />
                                <Select
                                    label="Servicio"
                                    placeholder="seleccione su interes"
                                    className=" "
                                >
                                    {animals.map((animal) => (
                                        <SelectItem key={animal.key}>
                                            {animal.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Textarea
                                    isRequired
                                    label="Mensaje"
                                    labelPlacement="outside"
                                    placeholder="Ingrese su mensaje"
                                    className="border-2 rounded-lg p-2"
                                />

                            </ModalBody>
                            <ModalFooter className="flex justify-between">

                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose}>
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
