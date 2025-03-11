"use client";
import React, { useEffect, useState } from "react";
import CompraRapida from "@/components/ui/paul/compraRapida/payment-flow";
import { useSession } from "next-auth/react";
import PagarAhoraSesionComponent from "@/components/ui/bruno/pagarahorasesion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Image,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
  User,
} from "@nextui-org/react";
import PaymentFlowRuta from "../compraRapida/payment-flow-ruta";

export default function ComprarRuta({
  precioTotal,
  rutaProductos,
  imagen,
  curso,
  idproducto,
}: {
  precioTotal: number;
  imagen: string;
  curso: string;
  idproducto: number;
  rutaProductos: { Curso: string; Modalidad: string }[]; 
}) {
  const { data: session } = useSession();
  //   const [isOpen, setIsOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [preciosolo, setpreciosolo] = useState(precioTotal);
  const [sizeRes, setSizeRes] = useState<
    "md" | "full" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  >("md"); // Tipo explícito
  console.log("Ruta Productos: ", rutaProductos);

  return (
    <div className="flex flex-col items-start">
      {session?.user ? (
        <>
          <Button
            onPress={() => {
              onOpen();
              setpreciosolo(precioTotal);
            }}
            className="bg-transparent !p-0 text-white"
          >
            <h4>Comprar Ahora</h4>
          </Button>

          <div className="flex gap-2 items-center">
            {rutaProductos.length > 0 ? (
              <>
                <Button
                  onPress={() => {
                    onOpen();
                    setpreciosolo(precioTotal);
                  }}
                  className="text-xl bg-colors-cyan-ccd rounded-xl p-6 font-bold text-colors-dark-blue-ccd"
                >
                  S/. {precioTotal.toFixed(2)}
                </Button>
                <div className="text-lg line-through text-white decoration-colors-cyan-ccd">
                  S/. {Math.round(precioTotal * 1.3)}
                </div>
              </>
            ) : (
              <p>En proceso</p>
            )}
          </div>
        </>
      ) : (
        <PagarAhoraSesionComponent
          array={{}}
          precio={precioTotal}
          productocurso={rutaProductos}
        />
      )}
      <Modal
        size={sizeRes}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20  ",
          closeButton: "bg-white",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-full mt-10 overflow-y-auto"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent
          className="!bg-colors-night-blue-ccd2 bg-double-esferas2"
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
              {/* <ModalHeader>
                        {" "}
                        <button
                          onClick={onclose}
                          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                        >
                          <ChevronLeft className="w-6 h-6" />
                          Regresar
                        </button>
                      </ModalHeader> */}
              <ModalBody>
                <PaymentFlowRuta
                  precio={preciosolo}
                  imagen={imagen}
                  curso={curso}
                  idproducto={idproducto}
                  rutaProductos={rutaProductos}
                />
              </ModalBody>
              {/* <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
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
    </div>
  );
}
