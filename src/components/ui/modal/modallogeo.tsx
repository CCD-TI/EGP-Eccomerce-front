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
import { useTheme as useNextTheme } from "next-themes";

interface Props {
    array: any;
}

export default function ModalLogeoComponent({ array }: Props) {
    const [themeResolved, setThemeResolved] = useState<boolean>(false);

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
        }
        if(state === "Error"){
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: 'Las credenciales son incorrectas',
            });

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

    const enviarformulario = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget as HTMLFormElement);
            const pnombres = formData.get("email1");
            const papellidos = formData.get("email2");
            const pcorreo = formData.get("email3");
            const pclave = formData.get("email4");

            const response = await api.post("/inicio/crearUsuario", {
                pnombres,
                papellidos,
                pcorreo,
                pclave,
            });

            if (response.status === 200) {
                // Si el registro es exitoso, iniciamos sesión automáticamente
                signIn("credentials", {
                    email: pcorreo,
                    Contrasena: pclave,
                    redirect: false,
                }).then((signInResponse: any) => {
                    if (signInResponse.ok) {

                        window.location.reload();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al iniciar sesión",
                            text: signInResponse.error,
                        });
                    }
                });
                const mensaje = `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
        }

        .header {
            background-color: #042C54;
            color: white;
            text-align: center;
            padding: 20px;
            position: relative;
            height: 100%;
        }

        .header img {
            height: auto;
            width: 275px;
        }


        .content {
            padding: 20px;
            text-align: center;
        }

        .customer-name {
            font-weight: bold;
            color: #021B96;
        }

        .chart {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            margin: 20px 0;
        }

        .bar-container {
            text-align: center;
        }

        .bar {
            width: 30px;
            background-color: #ddd;
            margin-bottom: 5px;
        }

        .bar-container.current .bar {
            background-color: #ff6600;
        }

        .payment-info {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
        }

        .info-box {
            padding: 10px;
            width: 50%;
            margin:auto;
        }

        .payment-code {
            background-color: #f0f0f0;
            padding: 10px;
            margin: 20px 0;
            text-align: center;
        }

        .payment-options {
            text-align: center;
            margin: 20px 0;
        }

        .payment-options button {
            background-color: #ff6600;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .banks img {
            width: 50px;
            margin: 0 5px;
        }

        .footer {
            background-color: #042C54;
            color: white;
            text-align: center;
            padding: 20px;

        }
    </style>
</head>

<body>
    <div class="container">
        <header class="header">
            <img src="https://ccdcapacitacion.edu.pe/wp-content/uploads/2022/10/PLANTILLA-WEB-CCD.png" alt="" class="logo">
        </header>

        <section class="content">
            <h2>Bienvenid@!, <br><span class="customer-name">${pnombres + ' ' + papellidos}</span></h2>
            <p>Te enviamos tus credenciales.</p>


            <div class="payment-info">
                <div class="info-box">
                    <div style="display: flex;gap: 4px;  align-items: center;">
                        <h3>Usuario:</h3>
                        <p>${pcorreo}</p>
                    </div>
                    <div style="display: flex;gap: 4px; align-items: center;">
                        <h3>Contraseña:</h3>
                        <p>${pclave}</p>
                    </div>
                </div>

            </div>

        </section>

        <footer class="footer">
            <p>¡GRACIAS POR TU PREFERENCIA!</p>
            <p>#1 EN CAPACITACIÓN SEGÚN EL CIP</p>
        </footer>
    </div>
</body>

</html>`
                const response1 = await api.post("/inicio/EnviarCorreoPago", {
                    pdestinatario: pcorreo,
                    pmensaje: mensaje,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo registrar el usuario",
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor",
            });
        }
    };
    const { setTheme, resolvedTheme } = useNextTheme();

    useEffect(() => {
        if (resolvedTheme) {
            setThemeResolved(true);
        }
    }, [resolvedTheme]);

    function iniciarsesion() {
        if(state=="Error"){
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: 'Las credenciales son incorrectas',
            });

        }
    }
    return (
        <>
            <FaUser className="w-6 h-6 cursor-pointer hover:text-cyan-400 transition-all duration-300" onClick={onOpen1}/>

            <Modal
                isOpen={isOpen1}
                onOpenChange={onOpenChange1}
                aria-label="Modal para atender ticket"
                aria-labelledby="modal-title"
                size="2xl"
                isDismissable={false}
                backdrop="blur"
            >
                <ModalContent className="bg-white ">
                    {(onClose) => (
                        <>
                            <ModalBody className="h-[84%] overflow-auto py-7 ">
                                <div className="flex items-center justify-center gap-4 text-white">
                                    <Link href="/">
                                        <Image
                                            src={environment.baseUrlStorage + "/Multimedia/Imagen/Ccd/Logos/Ccdtextologo.png"}
                                            alt="Logo CCD"
                                            className="cursor-pointer w-[12rem] h-[5rem]" // Tamaño específico para el logo
                                        />
                                    </Link>

                                </div>

                                <Tabs aria-label="Options" className="flex justify-center items-center" selectedKey={selectedTab}
                                    classNames={{ "tabList": "bg-white  border-2 border-[#152C51]", "cursor": "bg-[#00EADE] text-[#152C51]" }}
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
                                        <Card classNames={{ "body": "h-[70vh] bg-white/20" }}>
                                            <CardBody className="h-full">
                                                <form action={dispatch}
                                                    className=" h-full flex flex-col gap-4">
                                                    <Input name="email"
                                                        isRequired
                                                        label="Correo Electronico"
                                                        placeholder="Ingresa tu Correo Electronico"
                                                        type="text"
                                                        className="rounded-xl "
                                                        classNames={{ "inputWrapper": "bg-[var(--ccdcolordefault)]", "label": "text-[#152C51]" }}
                                                    />
                                                    <Input
                                                        name="Contrasena"
                                                        isRequired
                                                        label="Clave"
                                                        placeholder="Ingresa tu Correo Clave"
                                                        type="password"
                                                        className="rounded-xl "
                                                        classNames={{ "inputWrapper": "bg-[var(--ccdcolordefault)]" }}
                                                    />

                                                    <div className="flex gap-2 w-[50%] m-auto justify-center">
                                                        <LoginButton funcion={iniciarsesion}></LoginButton>


                                                    </div>
                                                    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                                                        <Divider className=" bg-white/20 opacity-30" />
                                                        <h1 className="text-[var(--color)]">Inicia sesion con redes sociales</h1>
                                                        <Divider className=" bg-white/20 opacity-30" />
                                                        <div className="flex  gap-4 justify-center  m-auto">
                                                            <button onClick={handleGoogleSignIn} className="bg-black/10 flex items-center justify-between p-2 rounded-3xl gap-5">
                                                                <FcGoogle className="text-3xl" />
                                                                <span className="mr-8 text-[var(--color)]">Google</span>
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
                                                <form onSubmit={enviarformulario} className="flex flex-col gap-4">

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
                                                        <Input name="email4"
                                                            isRequired label="Contraseña" placeholder="Ingrese su Contraseña" type="text" className=" rounded-xl" />
                                                        <Input name="email5"
                                                            isRequired label="Repetir Contraseña" placeholder="Repetir la Contraseña" type="text" className=" rounded-xl" />
                                                    </div>
                                                    <Button
                                                        type="submit"
                                                        className={
                                                            `p-3 px-5 text-white border-1 border-opacity-40  rounded-2xl bg-[var(--ccdcolordark)]`
                                                        }

                                                    >
                                                        Registrarse
                                                    </Button>

                                                </form>


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
function LoginButton({funcion}:any) {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            className={
                clsx({
                    "btn-primary": !pending,
                    "btn-disabled": pending,
                }) +
                `custom-btn  p-3 px-5 border-white text-white border-1 border-opacity-40  rounded-2xl w-full bg-[var(--ccdcolordark)]`
            }
            disabled={pending}
            onClick={() => funcion()}
        >
            Iniciar Sesion
        </Button>
    );
}