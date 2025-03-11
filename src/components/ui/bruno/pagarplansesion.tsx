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

export default function PagarPlanSesionComponent({ array }: Props) {
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
  const [rememberMe, setRememberMe] = useState(false);

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
            ptipodocumento: "Identidad",
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
      const ptelefonoText = formData.get("email6");

      // Convertir ptelefono a número
      const ptelefono = Number(ptelefonoText);

      if (isNaN(ptelefono)) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "El campo 'teléfono' debe ser un número válido",
        });
        return;
      }

      const response = await api.post("/inicio/crearUsuario", {
        pnombres,
        papellidos,
        pcorreo,
        pclave,
        ptelefono,
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
        <title>Registro</title>
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
                <h2>Bienvenid@!, <br><span class="customer-name">${
                  pnombres + " " + papellidos
                }</span></h2>
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
    
    </html>`;
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

  function iniciarsesion() {
    if (state == "Error") {
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Las credenciales son incorrectas",
      });
    }
  }

  return (
    <>
      <button
      onClick={onOpen1}
        className="border-colors-dark-blue-ccd border-2 border-[rgba(22,30,110,0.3)] text-white text-xl font-bold px-4 py-2 mt-6 rounded-2xl group-hover:scale-110 group-hover:border-[rgba(22,30,110,0)] group-hover:bg-colors-dark-blue-ccd transition duration-300"
        style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.6)" }}
      >
        Adquirir plan
      </button>

      {/* <button onClick={onOpen1} className="w-full  bg-white text-xl   py-3 rounded-2xl font-semibold hover:bg-white/60 transition-colors text-colors-sky-ccd ">
                Comprar ahora
            </button> */}
      <Modal
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        aria-label="Modal para atender ticket"
        aria-labelledby="modal-title"
        size="sm"
        isDismissable={false}
        backdrop="blur"
      >
        <ModalContent className="bg-gradient-to-r from-[#335e9f] via-colors-night-blue-ccd2 to-[#335e9f] text-white rounded-xl">
          {(onClose) => (
            <>
              <ModalBody className="h-[84%] overflow-auto py-7 ">
                <div className="flex items-center justify-center gap-4 text-colors-dark-blue-ccd">
                  <Link href="/">
                    <img
                      src={`${environment.baseUrlStorage}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdd-white5.svg`}
                      alt="Logo CCD"
                      className="w-20 mx-auto mb-6"
                    />
                  </Link>
                </div>

                <Tabs
                  aria-label="Options"
                  className="flex justify-center items-center"
                  selectedKey={selectedTab}
                  classNames={{
                    tabList: "bg-white  border-2 border-[#152C51]",
                    cursor: "bg-[#00EADE] text-[#152C51]",
                  }}
                  onSelectionChange={handleTabChange}
                >
                  {/* Form Login */}
                  <Tab
                    key="1"
                    title={
                      <div className="flex items-center space-x-2">
                        <span className="text-[var(--color-contraneutral)]">
                          Iniciar Sesión
                        </span>
                      </div>
                    }
                    className="h-full"
                  >
                    <Card
                      classNames={{ body: "h-[70vh] bg-opacity-0" }}
                      className="bg-opacity-0 shadow-none"
                    >
                      <CardBody className="h-full bg-transparent bg-opacity-0">
                        <form
                          action={dispatch}
                          className=" h-full flex flex-col gap-4"
                        >
                          <Input
                            name="email"
                            isRequired
                            label="Email"
                            placeholder="Ingresa tu Correo Electrónico"
                            type="text"
                            labelPlacement="outside"
                            className="rounded-[16px] border-2 border-white placeholder-white"
                            classNames={{
                              input: "placeholder-white", // Clase de Tailwind para estilizar el placeholder
                            }}
                          />

                          <Input
                            name="Contrasena"
                            isRequired
                            label="Clave"
                            placeholder="Ingresa tu Correo Clave"
                            type="password"
                            labelPlacement="outside"
                            className="rounded-[16px] border-2 border-white placeholder-white"
                            classNames={{
                              input: "placeholder-white",
                              inputWrapper: "bg-opacity-0",
                            }}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) =>
                                  setRememberMe(e.target.checked)
                                }
                                className="h-5 w-5 cursor-pointer"
                              />
                              <label
                                htmlFor="rememberMe"
                                className="ml-2 cursor-pointer text-sm text-white"
                              >
                                Recordarme
                              </label>
                            </div>
                            <button className="text-sm">
                              ¿Olvidaste tu contraseña?
                            </button>
                          </div>

                          <div className="flex gap-2 w-[50%] m-auto justify-center">
                            <LoginButton funcion={iniciarsesion}></LoginButton>
                          </div>
                          <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                            <h1 className="text-white">
                              Inicia sesion con redes sociales
                            </h1>
                            <div className="flex flex-col  gap-4 justify-center  m-auto">
                              <button
                                onClick={handleGoogleSignIn}
                                className="bg-white flex items-center justify-between p-2 rounded-3xl gap-5"
                              >
                                <FcGoogle className="text-3xl" />
                                <span className="mr-10 text-[var(--color)]">
                                  Google
                                </span>
                              </button>

                              <button
                                onClick={handleFacebookSignIn}
                                className="bg-white flex items-center justify-between p-2 rounded-3xl gap-5"
                              >
                                <FaFacebook className="text-3xl text-blue-1" />
                                <span className="mr-8 text-[var(--color)]">
                                  Facebook
                                </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </CardBody>
                    </Card>
                  </Tab>
                  {/* Form Register */}
                  <Tab
                    key="2"
                    title={
                      <div className="flex items-center space-x-2">
                        <span className="text-[var(--color-contraneutral)]">
                          Registrarse
                        </span>
                      </div>
                    }
                  >
                    <Card
                      classNames={{ body: "bg-opacity-0" }}
                      className="bg-opacity-0 shadow-none"
                    >
                      <CardBody className="h-full bg-transparent bg-opacity-0">
                        <form
                          onSubmit={enviarformulario}
                          className="h-full flex flex-col gap-4"
                        >
                          <Input
                            name="email1"
                            isRequired
                            label="Nombres"
                            placeholder="Ingresa tus nombres"
                            type="text"
                            labelPlacement="outside"
                            className="rounded-[16px] border-2 border-white 
                              text-white placeholder-white"
                            classNames={{
                              input: "placeholder-white text-white", // Clase de Tailwind para estilizar el placeholder
                              inputWrapper: "bg-opacity-0",
                              label: "text-white",
                            }}
                          />
                          <Input
                            name="email2"
                            isRequired
                            label="Apellidos"
                            placeholder="Ingresa tus apellidos"
                            type="text"
                            labelPlacement="outside"
                            className=" rounded-xl"
                          />
                          <Input
                            name="email6"
                            isRequired
                            label="Teléfono"
                            placeholder="Ingresa tu Teléfono"
                            type="text"
                            labelPlacement="outside"
                            className=" rounded-xl"
                          />
                          <Input
                            name="email3"
                            isRequired
                            label="Correo Electronico"
                            placeholder="Ingrese su dirección"
                            type="text"
                            labelPlacement="outside"
                            className=" rounded-xl"
                          />
                          <Input
                            name="email4"
                            isRequired
                            label="Contraseña"
                            placeholder="Ingrese su Contraseña"
                            type="password"
                            labelPlacement="outside"
                            className=" rounded-xl"
                          />
                          <Input
                            name="email5"
                            isRequired
                            label="Repetir Contraseña"
                            placeholder="Repetir la Contraseña"
                            type="password"
                            labelPlacement="outside"
                            className=" rounded-xl"
                          />

                          <Button
                            type="submit"
                            className={`p-3 px-5 text-white border-1 border-opacity-40  rounded-2xl bg-[var(--ccdcolordark)]`}
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
function LoginButton({ funcion }: any) {
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
