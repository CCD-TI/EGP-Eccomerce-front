"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, InputOtp, Form } from "@heroui/react";
import { IoKey } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion"; // Importa Framer Motion
import OTPInput from "@/components/ui/bruno/OtpStructure";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { environment } from "@/environments/environment";

export default function App() {
  // const [formPage, setFormPage] = React.useState(true);
  // const [otp, setOtp] = useState<string>("");
  const [isLoadingVerify, setIsLoadingVerify] = useState(false); // Para el loading de verificación
  const [isLoadingResend, setIsLoadingResend] = useState(false); // Para el loading de reenvío
  const [isLoadingPass, setIsLoadingPass] = useState(false); // Para el loading de reenvío
  // const [timer, setTimer] = useState(0);
  const [error, setError] = useState<string>("");
  // const [emailReferencia, setEmailReferencia] = useState("");
  const [newPassword, setNewPassword] = useState(""); // Estado para la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar la contraseña
  const [passwordError, setPasswordError] = useState(""); // Estado para el mensaje de error
  const [redirectToHome, setRedirectToHome] = useState(false);

  const [emailReferencia, setEmailReferencia] = useLocalStorageState("emailReferencia", "");
const [timer, setTimer] = useLocalStorageState("timer", 0);
const [formPage, setFormPage] = useLocalStorageState("formPage", true);
const [isVerified, setIsVerified] = useLocalStorageState("isVerified", true);
const [otp, setOtp] = useLocalStorageState("otp", "");


// Hook personalizado para localStorage
function useLocalStorageState(key: string, initialValue: any) {
  // Inicializar estado desde localStorage o usar valor inicial
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null) return initialValue;
      
      // Manejar diferentes tipos de datos
      if (key === 'timer') return parseInt(storedValue, 10);
      if (key === 'formPage') return storedValue === 'true';
      if (key === 'isVerified') return storedValue === 'true';
      return storedValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Actualizar localStorage cuando el estado cambie
  useEffect(() => {
    try {
      localStorage.setItem(key, state.toString());
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, state]);

  return [state, setState];
}


useEffect(() => {
  // Solo crear el intervalo si el timer es mayor que 0
  if (timer > 0) {
    const interval = setInterval(() => {
      setTimer((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }
}, [timer > 0]); // Solo se ejecuta cuando timer cambia de 0 a >0 o viceversa


  const handleNewPasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewPassword(e.target.value); // Actualizar la nueva contraseña
    setPasswordError(""); // Limpiar el mensaje de error al cambiar el valor
  };

  const handleConfirmPasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setConfirmPassword(e.target.value); // Actualizar la confirmación de contraseña
    setPasswordError(""); // Limpiar el mensaje de error al cambiar el valor
  };

  const handleSubmitPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden."); // Mostrar mensaje de error
      return; // Detener la ejecución si las contraseñas no coinciden
    }

    // Si las contraseñas coinciden, continuar con la lógica de envío
    console.log("Contraseña actualizada:", newPassword);
    setPasswordError(""); // Limpiar el mensaje de error
  };

  const EnviarCorreo = (e: any) => {
    e.preventDefault();
    setFormPage(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60); // Obtener los minutos
    const remainingSeconds = seconds % 60; // Obtener los segundos restantes
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`; // Formato MM:SS
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
   
    // Asegúrate de que emailReferencia tiene un valor y no es solo espacios en blanco
    if (!emailReferencia || emailReferencia.trim() === "") {
      Swal.fire({
        title: "Por favor, ingresa el correo de referencia.",
        icon: "warning",
        draggable: true,
      });
      return;
    }
    setIsLoadingResend(true); // Activar loading
    setTimer(350);
    const interval = setInterval(() => {
      setTimer((prev: number) => {
        if (prev === 0) {
          clearInterval(interval); // Detener el intervalo cuando llegue a 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // Validar el formato del correo electrónico
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailReferencia);
    if (!isValidEmail) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
        draggable: true,
      });
      return;
    }

    try {
      const response = await fetch(
        `${environment.baseUrl}/inicio/actualizarClaveTemporal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
          },
          body: JSON.stringify({ correo: emailReferencia.trim() }), // Envía el correo en el cuerpo de la solicitud
        }
      );

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Para depuración

      if (response.ok) {
        // Mensaje de éxito
        EnviarCorreo(e);
        Swal.fire({
          title: "Éxito",
          text: data.msg || "Clave temporal actualizada correctamente.",
          icon: "success",
          draggable: true,
        });
      } else {
        // Manejo de errores
        Swal.fire({
          title: "Error",
          text: data.error || "Ocurrió un error inesperado.",
          icon: "error",
          draggable: true,
        });
      }
    } catch (error) {
      console.error("error:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
        draggable: true,
      });
    } finally {
      setIsLoadingResend(false); // Desactivar loading
      setIsVerified(true)
    }
  };

  const handleSubmitCode = async (e: { preventDefault: () => void }) => {
    setOtp("");
    e.preventDefault();
    // Activar loading
    console.log("OTP a verificar:", otp); // Para depuración

    // Asegúrate de que el OTP tiene un valor y no es solo espacios en blanco
    if (!otp || otp.trim() === "") {
      Swal.fire({
        title: "Por favor, ingresa el código OTP.",
        icon: "warning",
        draggable: true,
      });
      return;
    }

    try {
      // Enviar el OTP y el correo al backend para su verificación
      setIsLoadingVerify(true);
      const response = await fetch(
        `${environment.baseUrl}/inicio/verificarCode`, // Endpoint para verificar el OTP y el tiempo
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
          },
          body: JSON.stringify({
            correo: emailReferencia.trim(), // Envía el correo
            codigo: otp.trim(), // Envía el OTP
          }),
        }
      );

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Para depuración

      if (response.ok) {
        setIsVerified(false); 
        // Mensaje de éxito
        Swal.fire({
          title: "Éxito",
          text: data.msg || "El código OTP es válido.",
          icon: "success",
          draggable: true,
        });
      } else {
        // Manejo de errores
        Swal.fire({
          title: "Error",
          text: data.msg || "El código OTP no es válido o ha expirado.",
          icon: "error",
          draggable: true,
        });
      }
    } catch (error) {
      setIsVerified(false); 
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
        draggable: true,
      });
    } finally {
      setIsLoadingVerify(false);
      // Desactivar loading
    }
  };

  const updatePassword = async (e: { preventDefault: () => void }) => {
    setIsLoadingPass(true); // Activar loading

    e.preventDefault();
    // Activar loading
    console.log("clave:", newPassword); // Para depuración
    handleSubmitPassword(e);
    // Asegúrate de que el OTP tiene un valor y no es solo espacios en blanco
    if (!newPassword || newPassword.trim() === "") {
      Swal.fire({
        title: "Por favor, complete los campos.",
        icon: "warning",
        draggable: true,
      });
      return;
    }

    try {
      // Enviar el OTP y el correo al backend para su verificación
      setIsLoadingVerify(true);
      const response = await fetch(
        `${environment.baseUrl}/inicio/updatePassword`, // Endpoint para verificar el OTP y el tiempo
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
          },
          body: JSON.stringify({
            correo: emailReferencia.trim(), // Envía el correo
            clave: newPassword.trim(), // Envía el OTP
          }),
        }
      );

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Para depuración

      if (response.ok) {
        // Mensaje de éxito
        Swal.fire({
          title: "Éxito",
          text: data.msg || "La contraseña fue cambiada correctamente.",
          icon: "success",
          draggable: true,
        }).then(() => {
          // Activar redirección
          setRedirectToHome(true);
          localStorage.clear();
        });
      } else {
        // Manejo de errores
        Swal.fire({
          title: "Error",
          text: data.msg || "El código OTP no es válido o ha expirado.",
          icon: "error",
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
        draggable: true,
      });
    } finally {
      setIsLoadingPass(false); // Activar loading
      // setIsVerified(true); // Desactivar loading
      localStorage.clear();
    }
  };
  // Redirigir al inicio si redirectToHome es true
  if (redirectToHome) {
    window.location.href = "/";
    return null; // Evitar renderizado adicional
  }
  //     alert("A new verification code has been sent! (For demo, use 123456)");

  return (
    <div className="w-full h-screen flex justify-center items-center bg-double-esferas2  ">
      <div className="max-w-7xl w-full flex flex-col items-center p-8">
        {formPage ? (
          <motion.div
            key="recoveryForm"
            initial={{ opacity: 0, x: -50 }} // Animación inicial
            animate={{ opacity: 1, x: 0 }} // Animación al montar
            exit={{ opacity: 0, x: 50 }} // Animación al desmontar
            transition={{ duration: 0.6 }} // Duración de la animación
          >
            <div className="w-[35rem] max-sm:w-full bg-white/30 p-8 flex flex-col gap-4 justify-center items-center rounded-xl">
              <div className="p-6 bg-colors-sky-ccd/30 rounded-full ">
                <IoKey className="text-4xl text-colors-sky-ccd" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                ¿Recuperar contraseña?
              </h1>
              <h2 className="text-base text-black/40 text-center">
                Por favor ingresa tu correo para poder realizar el cambio de
                contraseña{" "}
              </h2>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="" className="text-white">
                    Email
                  </label>
                  <input
                    value={emailReferencia}
                    type="email"
                    onChange={(e) => setEmailReferencia(e.target.value)}
                    placeholder="ezio@ejemplo.com"
                    className="border-2 p-4 w-full rounded-xl"
                  />
                  <button
                          // onClick={handleResend}
                          disabled={isLoadingResend || timer > 0}
                          className="w-full py-2.5 px-4  text-white rounded-xl bg-blue-700 hover:text-blue-200 hover:bg-blue-500  disabled:cursor-not-allowed"
                        >
                          {isLoadingResend ? (
                            <div className="flex items-center justify-center gap-2">
                              <span>Reenviando...</span>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : timer > 0 ? (
                            `Solicitar codigo en ${formatTime(timer)}`
                          ) : (
                            "Solicitar codigo"
                          )}
                        </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="SuccessForm"
            initial={{ opacity: 0, x: -50 }} // Animación inicial
            animate={{ opacity: 1, x: 0 }} // Animación al montar
            exit={{ opacity: 0, x: 50 }} // Animación al desmontar
            transition={{ duration: 0.6 }} // Duración de la animación
          >
            <div className="w-[35rem] max-sm:w-full bg-white/30 p-8 flex flex-col gap-4 justify-center items-center rounded-xl relative">
              <div className="flex flex-col items-center justify-center p-6 space-y-6 ">
                <button
                  className={` absolute top-5 left-5 ${
                    isVerified ? "block" : "hidden"
                  } `}
                  onClick={() => setFormPage(true)}
                >
                  <IoIosArrowDropleftCircle className="text-5xl text-colors-sky-ccd" />
                </button>
                <h2 className="text-2xl font-bold text-center text-white">
                  {isVerified ? "Verificar Codigo" : "Cambiar Contraseña"}
                </h2>

                {isVerified === true ? (
                  <>
                    <p className="text-center text-black/50">
                      Se le a enviado un correo a{" "}
                      <span className="text-base font-bold">
                        {emailReferencia}
                      </span>{" "}
                      con el codigo de verificacion
                    </p>

                    <OTPInput
                      length={6} // Longitud del OTP
                      onComplete={(otpValue) => setOtp(otpValue)} // Actualiza el estado cuando el OTP está completo
                      autoFocus={true} // Enfocar automáticamente el primer campo
                      disabled={false}
                      value={otp} // Pasa el valor del OTP
                      // Habilitar/deshabilitar los campos de entrada
                    />

                    {error && <p className="text-red-400 text-base">{error}</p>}

                    <div className="flex flex-col w-full gap-3">
                      <button
                        onClick={handleSubmitCode}
                        disabled={isLoadingVerify}
                        className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                      >
                        {isLoadingVerify ? (
                          <div className="flex items-center justify-center gap-2">
                            <span>Verificando...</span>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          "Verificar Código"
                        )}
                      </button>

                      <form onSubmit={handleSubmit}>
                        <button
                          // onClick={handleResend}
                          disabled={isLoadingResend || timer > 0}
                          className="w-full py-2.5 px-4 bg-transparent text-white rounded-xl hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:text-blue-300 disabled:cursor-not-allowed"
                        >
                          {isLoadingResend ? (
                            <div className="flex items-center justify-center gap-2">
                              <span>Reenviando...</span>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : timer > 0 ? (
                            `Reenviar en ${formatTime(timer)}`
                          ) : (
                            "Reenviar Código"
                          )}
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4 w-full">
                    <div className="w-full flex flex-col gap-4">
                      <h1 className="text-white text-lg">
                        Ingrese una nueva contraseña por favor
                      </h1>
                      <form onSubmit={updatePassword} className="w-full">
                        <div className="flex flex-col gap-2 w-full">
                          {/* Campo para la nueva contraseña */}
                          <label htmlFor="newPassword" className="text-white">
                            Nueva Contraseña
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="p-4 rounded-xl"
                          />

                          {/* Campo para confirmar la contraseña */}
                          <label
                            htmlFor="confirmPassword"
                            className="text-white mt-4"
                          >
                            Confirmar Contraseña
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="p-4 rounded-xl"
                          />

                          {/* Mostrar mensaje de error si las contraseñas no coinciden */}
                          {passwordError && (
                            <p className="text-red-400 text-sm mt-2">
                              {passwordError}
                            </p>
                          )}
                        </div>
                        <button
                          disabled={!!passwordError}
                          onClick={() => {
                            if (newPassword !== confirmPassword) {
                              setPasswordError("Las contraseñas no coinciden."); // Mostrar mensaje de error
                              return; // Detener la ejecución si las contraseñas no coinciden
                            }
                            // setOtp("");
                            // setIsVerified(false);
                          }}
                          className={`py-2.5 px-4 rounded-xl bg-blue-600 text-white text-lg 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center
                        mt-9 items-center w-full ${
                          !!passwordError ? "cursor-not-allowed" : ""
                        } `}
                        >
                          {isLoadingPass ? (
                            <div className="flex items-center justify-center gap-2">
                              <span>Actualizando...</span>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : timer > 0 ? (
                            `Actualizar contraseña`
                          ) : (
                            "Reenviar Código"
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Botón para continuar */}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
