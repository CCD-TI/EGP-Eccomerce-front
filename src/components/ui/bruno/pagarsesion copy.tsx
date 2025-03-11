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
import { TicketIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { KeyIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook, FaUser, FaXTwitter } from "react-icons/fa6";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions/auth";
import clsx from "clsx";
import axios from "axios";
import { environment } from "@/environments/environment";
import { CalendarDate, parseDate } from "@internationalized/date";

interface Props {
    array: any;
}

export default function PagarSesionComponent({ array }: Props) {

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });


    const {
        IdSolicitud,
        TipoSolicitud,
        TipoMotivo,
        IdTipoSolicitud,
        IdTipoMotivo,
        Usuario,
    } = array;

    const { data: session } = useSession();
    const {
        isOpen: isOpen1,
        onOpen: onOpen1,
        onOpenChange: onOpenChange1,
    } = useDisclosure();
    const [equipoaccesorio, setEquipoAccesorio] = useState<any>([]);
    const [selectedTab, setSelectedTab] = useState(0);

    const [datatipodocumento, setdataTipoDocumento] = useState<any>([]);
    const [tipodocumento, setTipoDocumento] = useState<any>([]);


    const [solicitudxid, setSolicitudXId] = useState<any>([
        {
            TipoSolicitud: "",
            TipoMotivo: "",
            Usuario: "",
            IdTipoSolicitud: "",
            IdTipoMotivo: "",
        },
    ]);



    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === "Success") {
            const currentUrl = window.location.href;
            window.location.replace(currentUrl);
        } else {
        }
    }, [state]);

    const handleGoogleSignIn = async () => {
        signIn("google");
    };
    const handleFacebookSignIn = async () => {
        signIn("facebook");
    };



    const handleTabChange = async (key: any) => {
        setSelectedTab(key);
        let response;

        switch (Number(key)) {
            case 1:
                break;
            case 2:
                if (datatipodocumento.length === 0) {
                    response = await api.post("/inicio/listarSelectTipoDocumento", {
                        ptipodocumento: 'Identidad',
                    });
                    setdataTipoDocumento(response.data.data[0]);
             
                } else {
                }
                break;

        }
    };


    return (
        <>
            <button onClick={onOpen1} className="w-full  bg-white text-xl   py-3 rounded-2xl font-semibold hover:bg-white/60 transition-colors text-colors-sky-ccd ">
                Comprar ahora
            </button>
            <Modal
                isOpen={isOpen1}
                onOpenChange={onOpenChange1}
                aria-label="Modal para atender ticket"
                aria-labelledby="modal-title"
                size="2xl"
                isDismissable={false}
                backdrop="blur"
            >
                <ModalContent className="bg-[var(--coloranti)] border-1 border-[var(--color-contraneutral)]">
                    {(onClose) => (
                        <>

                            <ModalBody className="h-[84%] overflow-auto py-7 ">
                                <div className="h-full w-full flex items-center justify-center gap-4">
                                    <Image src={"/Multimedia/Imagen/logos/LogoCCD.png"} alt=""  className="cursor-pointer h-[3rem] w-[3rem] " />
                                    <Divider orientation="vertical" className=" bg-[var(--color-contraneutral)] h-[50%]" />
                                    <h1 className="text-[var(--color-contraneutral)] font-bold text-2xl">CCD</h1>
                                </div>

                                <Tabs aria-label="Options" className="flex justify-center items-center" selectedKey={selectedTab}
                                    onSelectionChange={handleTabChange}>
                                    <Tab
                                        key="1"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[var(--color-contraneutral)]">Iniciar Sesión</span>
                                            </div>
                                        }
                                        className="h-full"
                                    >
                                        <Card classNames={{ "body": "h-[70vh]" }}>
                                            <CardBody className="h-full">
                                                <form action={dispatch}
                                                    className=" h-full flex flex-col gap-4">
                                                    <Input name="email"
                                                        isRequired label="Correo Electronico" placeholder="Ingresa tu Correo Electronico" type="text" className=" rounded-xl" />
                                                    <Input
                                                        name="Contrasena"
                                                        isRequired
                                                        label="Clave"
                                                        placeholder="Ingresa tu Correo Clave"
                                                        type="password"
                                                        className="rounded-xl"
                                                    />

                                                    <div className="flex gap-2 w-[50%] m-auto justify-center">
                                                        <LoginButton></LoginButton>


                                                    </div>
                                                    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                                                        <Divider />

                                                        <h1>Inicia sesion con redes sociales</h1>
                                                        <Divider />
                                                        <div className="flex  gap-4 justify-center  m-auto">
                                                            <button onClick={handleGoogleSignIn} className="bg-black/10 flex items-center justify-between p-2 rounded-3xl gap-5">
                                                                <FcGoogle className="text-3xl" />
                                                                <span className="mr-8">Google</span>
                                                            </button>
                                                            <Divider orientation="vertical" />
                                                            <h1 className="m-auto">O</h1>
                                                            <Divider orientation="vertical" />

                                                            <button onClick={handleFacebookSignIn} className="bg-[#1463CA] flex items-center justify-between p-2 rounded-3xl gap-5">
                                                                <FaFacebook className="text-3xl text-white" />
                                                                <span className="mr-8 text-white">Facebook</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </form>
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab
                                        key="2"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[var(--color-contraneutral)]">Registrarse</span>
                                            </div>
                                        }
                                    >
                                        <Card>
                                            <CardBody>
                                                <div className="flex flex-col gap-4">

                                                    <div className="flex gap-4">
                                                        <Input name="email1"
                                                            isRequired label="Nombres" placeholder="Ingresa tus nombres" type="text" className=" rounded-xl" />
                                                        <Input name="email2"
                                                            isRequired label="Apellidos" placeholder="Ingresa tus apellidos" type="text" className=" rounded-xl" />
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <Input name="email3"
                                                            isRequired label="Correo Electronico" placeholder="Ingrese su dirección" type="text" className=" rounded-xl" />
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <Input name="email3"
                                                            isRequired label="Contraseña" placeholder="Ingrese su Contraseña" type="text" className=" rounded-xl" />
                                                        <Input name="email4"
                                                            isRequired label="Repetir Contraseña" placeholder="Repetir la Contraseña" type="text" className=" rounded-xl" />
                                                    </div>
                                                    <Button
                                                        type="submit"
                                                        className={
                                                            `custom-btn  p-3 px-5 border-white border-1 border-opacity-40  rounded-2xl w-full`
                                                        }

                                                    >
                                                        Registrarse
                                                    </Button>
                                                </div>


                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className={
                clsx({
                    "btn-primary": !pending,
                    "btn-disabled": pending,
                }) +
                `custom-btn  p-3 px-5 border-white border-1 border-opacity-40  rounded-2xl w-full`
            }
            disabled={pending}
        >
            Iniciar Sesion
        </Button>
    );
}