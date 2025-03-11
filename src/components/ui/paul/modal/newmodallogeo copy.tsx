"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaUser } from "react-icons/fa6";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Link from "next/link";
import axios from "axios";
import { environment } from "@/environments/environment";

interface Props {
  array: any;
}

export default function ModalLogeoComponent({ array }: Props) {
  const [selectedTab, setSelectedTab] = useState(1);
  const [rememberMe, setRememberMe] = useState(false);

  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const handleTabChange = (tab: number) => setSelectedTab(tab);

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
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Usuario registrado correctamente.",
        });
        signIn("credentials", { email: pcorreo, Contrasena: pclave });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo registrar el usuario.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("Contrasena") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result?.error || "No se pudo iniciar sesión.",
      });
    }
  };

  return (
    <>
      <FaUser
        className="text-white hover:text-cyan-500 text-xl cursor-pointer"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent className="bg-gradient-to-r from-[#335e9f] via-colors-night-blue-ccd2 to-[#335e9f] text-white rounded-xl">
          <ModalBody>
            <div className="text-center">
              <Link href="/">
                <img
                  src={`${environment.baseUrlStorage}/Multimedia/Imagen/Ccd/Logos/acreditacion-cdd-white5.svg`}
                  alt="Logo CCD"
                  className="w-20 mx-auto mb-6"
                />
              </Link>
            </div>
            <div>
              {selectedTab === 1 ? (
                <form
                  onSubmit={handleLogin}
                  className="space-y-4 flex flex-col gap-3"
                >
                  <h2 className="text-4xl text-center">Iniciar Sesión</h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col w-4/5 mx-auto gap-1">
                      <label className="text-left">Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Correo Electrónico"
                        className="w-full border p-3 rounded-xl bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col w-4/5 mx-auto gap-1">
                      <label className="text-left">Contraseña</label>
                      <input
                        type="password"
                        name="Contrasena"
                        placeholder="Contraseña"
                        className="w-full border p-3 rounded-xl bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between w-4/5 mx-auto">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-5 w-5 cursor-pointer"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 cursor-pointer text-sm text-white"
                      >
                        Recordarme
                      </label>
                    </div>
                    <button className="text-sm">¿Olvidaste tu contraseña?</button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-white text-lg text-colors-dark-blue-ccd w-3/5 py-3 rounded-2xl"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                  <Divider className="my-4" />
                  <div className="text-center">
                    <p className="text-sm mb-4">
                      o Inicia Sesión con:
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="bg-gray-100 flex items-center p-2 rounded-full"
                      >
                        <FcGoogle className="text-2xl" />
                        <span className="ml-2 text-gray-700">Google</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => signIn("facebook")}
                        className="bg-blue-600 flex items-center p-2 rounded-full text-white"
                      >
                        <FaFacebook className="text-2xl" />
                        <span className="ml-2">Facebook</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={enviarformulario} className="space-y-4">
                  <h2 className="text-4xl text-center">Registrarse</h2>
                  <div className="flex flex-col w-4/5 mx-auto gap-3">
                    <div>
                      <label>Nombres</label>
                      <input
                        type="text"
                        name="email1"
                        placeholder="Nombres"
                        className="w-full border p-3 rounded-xl bg-transparent"
                      />
                    </div>
                    <div>
                      <label>Apellidos</label>
                      <input
                        type="text"
                        name="email2"
                        placeholder="Apellidos"
                        className="w-full border p-3 rounded-xl bg-transparent"
                      />
                    </div>
                    <div>
                      <label>Correo Electrónico</label>
                      <input
                        type="email"
                        name="email3"
                        placeholder="Correo Electrónico"
                        className="w-full border p-3 rounded-xl bg-transparent"
                      />
                    </div>
                    <div>
                      <label>Contraseña</label>
                      <input
                        type="password"
                        name="email4"
                        placeholder="Contraseña"
                        className="w-full border p-3 rounded-xl bg-transparent"
                      />
                    </div>
                    <div>
                      <label>Repetir Contraseña</label>
                      <input
                        type="password"
                        name="email5"
                        placeholder="Repetir Contraseña"
                        className="w-full border p-3 rounded-xl bg-transparent"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-white text-lg text-colors-dark-blue-ccd w-3/5 py-3 rounded-2xl"
                      >
                        Registrarse
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
