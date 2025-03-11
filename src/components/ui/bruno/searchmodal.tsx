"use client";
import React, { useContext, useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Tooltip,
    Tabs,
    Tab,
    Card,
    CardBody,
    CheckboxGroup,
    Checkbox,
    Divider,
    Image,
    Autocomplete,
    AutocompleteItem,
    DateInput,
} from "@nextui-org/react";

import { FaApple, FaFacebook, FaUser, FaXTwitter } from "react-icons/fa6";


export default function ModalLogeoComponent() {
    

    
    const {
        isOpen: isOpen1,
        onOpen: onOpen1,
        onOpenChange: onOpenChange1,
    } = useDisclosure();


    

 


    return (
        <>
            <FaUser className="text-[var(--color-contraneutral)] text-xl cursor-pointer" onClick={onOpen1} />

            <Modal
             placement='center' 
                isOpen={isOpen1}
                onOpenChange={onOpenChange1}
                aria-label="Modal para atender ticket"
                aria-labelledby="modal-title"
                size="2xl"
                isDismissable={false}
                backdrop="blur"
            >
                <ModalContent className="bg-[var(--ccdcolordefault)] border-1 border-[var(--color-contraneutral)]">
                    {(onClose) => (
                        <>

                            <ModalBody>
                                
                                
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}