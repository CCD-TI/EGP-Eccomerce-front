"use client"
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import CountdownTimer from "@/components/ui/paul/countdowntimer"; // Asegúrate de tener el componente CountdownTimer
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
// import { Modal } from "@mui/material"; // Importamos el Modal de Material-UI
import ShoppingProcess from "./carrito/shoppingprocess";
import ShoppingCartCourseSelector from "./carrito/shoppingcartcourseselector";
import axios from "axios";
import { environment } from "@/environments/environment";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import PagarPlanSesionComponent from "../bruno/pagarplansesion";
import ShoppingCartPremiun from "./carrito/shoppingcartPremiun";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const img = {
  copa: `${storageUrl}/Multimedia/Imagen/Ccd/Banners/copa-mejor-institucion-latam.png`,
  icons: {
    gestion: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-gestion.svg`,
    ingenieria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-ingenieria.svg`,
    mineria: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/portada-icon-mineria.svg`,
  },
  logos: {
    autodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-autodesk-institute-white.svg`,
    pmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-pmi-white.svg`,
    cdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/carrusel-2-cdidp-white.svg`,
    compactccd: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdd-white5.svg`,
    compactpmi: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-pmi-white.svg`,
    compactcdidp: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdidp-white.svg`,
    compactautodesk: `${storageUrl}/Multimedia/Imagen/Ccd/Logos/acreditacion-autodesk-white.svg`,
  },
  fondos: {
    pack: `${storageUrl}/Multimedia/Imagen/Ccd/Fondos/Fondo_ruta.png`,
  },
};

// Definimos la interfaz para el tipo de datos esperado
interface Plan {
  IdPlan: number;
  Plan: string;
  Precio: string;
  Estado_id: string;
  UltimaFechMod: string;
  UltimoUserMod: string;
}

const PacksSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [listarplan, setListarplan] = useState<Plan[]>([]);
  const [precioplan, setPrecioplan] = useState(0);
  const [idplan, setIdplan] = useState(0);
  const { data: session } = useSession();

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

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
    const fetchPlans = async () => {
      try {
        const response = await api.post("/inicio/listarplanv2", {});
        //  console.log("RESPUESTA API:", response.data); // Verificamos la respuesta completa (opcional, para debugging)
        setListarplan(response.data.data[0]);  // Guardamos los planes en el estado
      } catch (error) {
        console.error("Error al obtener los planes:", error);
      }
    };
    fetchPlans();
  }, []);

  //  console.log("LISTAR PLAN:", listarplan);  // Ver si los datos llegan correctamente (opcional, para debugging)

  // Obtenemos el plan Premium (IdPlan === 2).  Usamos Number() para asegurar la comparación correcta.
  const planPremium = listarplan.find((plan) => Number(plan.IdPlan) === 2);
  // console.log("PLAN PREMIUM:", planPremium);  // Verificamos si el plan premium fue encontrado (opcional, para debugging)


  return (
    <>
      <div className="max-xl:h-[60vh] max-2xl:h-[75vh] h-[90vh] max-sm3:h-full bg-colors-night-blue-ccd2 py-16 flex items-center justify-center bg-Rutaslanding max-[1140px]:bg-double-esferas2">
        <div className="w-[90%] mx-auto max-lg:w-full flex flex-col justify-center items-end max-[1140px]:items-center max-[1140px]:pt-14 scale-95">
          {/* Título principal */}
          <div className="w-fit flex flex-col justify-center items-center">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-white max-[1140px]:text-6xl max-sm:text-4xl ">
                Obten <span className="text-3xl max-[1140px]:text-6xl max-sm:text-4xl text-colors-cyan-ccd"> acceso total </span>a <br /> todas nuestras rutas
              </h1>
            </div>

            <div className="flex flex-wrap justify-center gap-10 mt-5">
              {/* Tarjeta Plan Premium Dinámica */}
              {planPremium && (
                <div
                  className="group bg-gradient-to-t from-colors-cyan-ccd to-colors-dark-blue-ccd shadow-lg p-6 w-[300px] rounded-2xl border-2 border-white hover:shadow-[0_0_15px_7px_rgba(0,234,223,0.4)] transition duration-300 hover:scale-105"
                >
                  <h3 className="text-3xl text-center text-white">Plan</h3>
                  <h2 className="text-4xl font-extrabold text-center text-colors-cyan-ccd">
                    {planPremium.Plan.toUpperCase()}
                  </h2>
                  <div className="w-8 h-[4px] mx-auto bg-white mt-2"></div>

                  <ul className="mt-4 space-y-2 text-white">
                    <li className="flex items-center text-lg">
                      <FaCircleCheck className="mr-2 text-white" />1 Año de acceso total
                    </li>
                    <li className="flex items-center text-lg">
                      <FaCircleCheck className="mr-2 text-white" />Más de 40 cursos
                    </li>
                    <li className="flex items-center text-lg">
                      <FaCircleCheck className="mr-2 text-white" />Certificados ilimitados
                    </li>
                  </ul>

                  <p className="text-white text-lg line-through text-center mt-4">
                    S/ {(parseFloat(planPremium.Precio) * 2 + 0.01).toFixed(2)}
                  </p>
                  <p className="text-5xl font-extrabold text-center text-white">
                    <span className="relative top-[-15px] text-2xl">S/</span>
                    {parseFloat(planPremium.Precio).toFixed(2)}
                  </p>

                  <div className="flex justify-center">
                    {session?.user ? (
                      <button
                        className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
                        style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
                        onClick={() => {
                          setPrecioplan(parseFloat(planPremium.Precio));
                          setIdplan(Number(planPremium.IdPlan)); // Aseguramos que IdPlan sea un número
                          onOpen();  // Abre el modal
                        }}
                      >
                        Adquirir plan
                      </button>
                    ) : (
                      <PagarPlanSesionComponent array={{}} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Modal para la Compra del Plan Premium */}
        <Modal
            size={sizeRes}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            className="bg-[#0A1128] !scrollbar-hide "
            classNames={{
                body: "overflow-hidden py-0 px-0",
                base: "no-scrollbar",
                closeButton: "text-black bg-white m-3",
            }}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
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
            <ModalBody className="">
                  <ShoppingCartPremiun precioplan={precioplan} idplan={idplan} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PacksSection;