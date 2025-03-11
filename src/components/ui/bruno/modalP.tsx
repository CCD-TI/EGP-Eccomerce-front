import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the prop types
interface TermsModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onOpenChange }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Términos de Servicio</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-2 tex-xs">
                                <p><strong>Términos y Condiciones de Compra</strong></p>

                                <p>Al realizar una compra en CCD, aceptas estos términos. Por favor, léelos antes de continuar.</p>

                                <p>Los precios pueden cambiar sin previo aviso. El pago debe realizarse al momento de la compra.</p>

                                <p>Ofrecemos una garantía de devolución de 30 días para todos nuestros productos digitales.</p>

                                <p>El contenido adquirido es solo para uso personal. No está permitido compartir o revender sin autorización.</p>

                                <p>Nos reservamos el derecho de modificar estos términos y la disponibilidad de nuestros productos.</p>

                                <p>CCD no se responsabiliza por daños derivados del uso de nuestros productos.</p>

                                <p>Estos términos se rigen por las leyes locales. Las disputas se resolverán en tribunales competentes.</p>

                                <p>Para más información, contacta a soporte en [tu correo electrónico de contacto].</p>


                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default TermsModal;