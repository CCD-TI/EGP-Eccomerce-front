import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";

import Image from "next/image";
import UnderlineInput from "./InputUnderline";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Bolsa de trabajo</Button>
      <Modal
        size="5xl"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="!p-0"
      >
        <ModalContent className="!p-0">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody className="!p-0">
                <div className="flex size-full bg-colors-cyan-ccd">
                  <div className="w-[40%] p-7">
                    <div className="flex gap-4 items-center">
                      <Image
                        alt=""
                        src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Logos/ccd-logo-white.svg"
                        width={60}
                        height={60}
                      />
                      <h1 className="text-white text-base leading-[1] ">
                        Centro de capacitacion <br /> y desarrollo
                      </h1>
                    </div>

                    <p className="text-4xl font-bold mt-12 text-white">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsum, illo vero amet laborum veritatis{" "}
                    </p>
                    <Image
                      width={800}
                      height={800}
                      src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/landing/imagen_azul_ccd.png"
                      alt="Persona"
                      className=" mt-10 max-lg:!mx-auto"
                      priority
                    />
                  </div>
                  <form
                    action=""
                    className="w-[60%] bg-white rounded-2xl px-10"
                  >
                    <div className="p-6 pt-20">
                      <h1 className="font-bold text-2xl mb-5">Ingrese sus datos</h1>
                      <div className="flex flex-col gap-4">
                        <UnderlineInput
                          label="Nombres"
                          type="text"
                          color="#00eadf" // Color personalizado
                        />
                        <UnderlineInput
                          label="Documento de Identidad"
                          type="email"
                          color="#00eadf" 
                        />
                        <UnderlineInput
                          label="Profesión"
                          type="email"
                          color="#00eadf" 
                        />
                        <UnderlineInput
                          label="Cargo"
                          type="email"
                          color="#00eadf" 
                        />
                        <UnderlineInput
                          label="Empresa Actual"
                          type="email"
                          color="#00eadf" 
                        />
                        <UnderlineInput
                          label="Rubro"
                          type="email"
                          color="#00eadf" 
                        />
                        <Button className="bg-colors-cyan-ccd text-white font-bold text-2xl !py-7 mt-5">
                          Enviar
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
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
