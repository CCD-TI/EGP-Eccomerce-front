"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { environment } from "@/environments/environment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AOS from "aos"; // Importa AOS
import KRGlue from "@lyracom/embedded-form-glue";
import { CiStreamOn } from "react-icons/ci";
type PaymentStep = "method" | "form" | "confirmation";
import { RiBroadcastFill } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PaymentFlow({
  precio,
  modalidad,
  imagen,
  tipocurso,
  curso,
  idproducto,
}: any) {
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const router = useRouter(); // Inicializas el hook useRouter

  // Fecha de hoy
  const obtenerFechaActual = (): string => {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, "0");
    const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
    const año = hoy.getFullYear().toString();

    return `${dia}/${mes}/${año}`;
  };

  const fechaHoy = obtenerFechaActual();

  const [currentStep, setCurrentStep] = useState<PaymentStep>("method");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "qr">("card");
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const { data: session } = useSession();

  const handlePaymentMethodSelect = (method: "card" | "qr") => {
    setSelectedMethod(method);
    setCurrentStep("form");
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("confirmation");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "form":
        setCurrentStep("method");
        break;
      case "confirmation":
        setCurrentStep("form");
        break;
      default:
        // If we're already at the first step, we could potentially navigate away from the payment flow
        // For now, we'll just keep the user on the first step
        break;
    }
  };
  const [message, setMessage] = useState("");
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [krInstance, setKrInstance] = useState<any>(null); // Estado para almacenar la instancia de KR

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = "https://api.micuentaweb.pe";
      const publicKey = environment.izipago;
      let formToken = "";
      try {
        const pnombres = session?.user.Nombres;
        const papellidos = session?.user.Apellidos;
        const pcorreo = session?.user.Usuario;
        const pcorreoccd = "info@ccdcapacitacion.edu.pe";
        const dominioImg = "pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev";

        if (precio > 0) {
          const res = await fetch(environment.baseUrl + "/pago/CreatePayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: Math.round(precio * 100),
              currency: "PEN",
            }),
          });
          formToken = await res.text();
          const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

          await KR.setFormConfig({
            formToken,
            "kr-language": "es-ES",
          });

          await KR.removeForms();
          await KR.renderElements("#myPaymentForm");

          setKrInstance(KR);

          await KR.onSubmit(async (paymentData: KRPaymentResponse) => {
            try {
              const response = await fetch(
                environment.baseUrl + "/pago/validatePayment",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(paymentData),
                }
              );
              if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                  title: "Su compra fue realizada con éxito",
                  text: "Completar el siguiente formulario para poder brindarle sus accesos a la plataforma",
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Empezar a completar el formulario",
                  allowOutsideClick: false,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const listarTemario = await api.post(
                      "/inicio/asignarcursoadminv2",
                      {
                        fproducto_id: idproducto,
                        fusuario_id: session?.user.uid,
                        fprecio: precio,
                      }
                    );
                    router.push(`/`);
                  }

                  const mensaje = `<!DOCTYPE html>
                    <html lang="es">
                      <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Compra Confirmada</title>
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
                            background: linear-gradient(to right, #3d7bdf, #131939);
                            color: white;
                            text-align: center;
                            padding: 20px;
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
                            color: #021b96;
                          }
                          .product-info {
                            background-color: #f0f0f0;
                            padding: 15px;
                            border-radius: 5px;
                            margin: 20px 0;
                            text-align: center;
                          }
                          .button {
                            display: inline-block;
                            background-color: #ff6600;
                            color: white;
                            padding: 10px 20px;
                            text-decoration: none;
                            font-size: 16px;
                            border-radius: 5px;
                            margin-top: 20px;
                          }
                          .footer {
                            background: linear-gradient(to right, #3d7bdf, #131939);
                            color: white;
                            text-align: center;
                            padding: 20px;
                            font-size: 14px;
                          }
                          .logo {
                            width: 100px !important;
                            height: auto !important;
                          }
                          .mail {
                          color: white !important;
                          font-weight: bold !important;
                          text-decoration: none; 
                          pointer-events: none;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <header class="header">
                            <img src="https://${dominioImg}/Multimedia/Imagen/Ccd/Logos/CCDLOGOWHITE.png" alt="logo" class="logo" />
                            <h1>¡Gracias por tu compra!</h1>        
                          </header>
                          <div class="content">
                            <p>Hola <span class="customer-name">${
                              pnombres + " " + papellidos
                            }</span>,</p>
                            <p>Tu compra ha sido confirmada. A continuación, los detalles:</p>
                            <div class="product-info">
                              <p><strong>Producto:</strong> ${curso}</p>
                              <p><strong>Monto pagado:</strong> ${precio}</p>
                              <p><strong>Fecha de compra:</strong> ${fechaHoy}</p>
                            </div>      
                          </div>
                          <footer class="footer">
                            <p>Si tienes alguna duda, contáctanos en: <span class="mail">${pcorreoccd}</span></p>
                            <p>¡Gracias por confiar en nosotros!</p>
                          </footer>
                        </div>
                      </body>
                    </html>
                    `;
                  const mensaje2 = `<!DOCTYPE html>
                    <html lang="es">
                      <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Notificación de Compra</title>
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
                            background: linear-gradient(to right, #3d7bdf, #131939);
                            color: white;
                            text-align: center;
                            padding: 20px;
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
                            color: #021b96;
                          }
                          .product-info {
                            background-color: #f0f0f0;
                            padding: 15px;
                            border-radius: 5px;
                            margin: 20px 0;
                            text-align: center;
                          }
                          .button {
                            display: inline-block;
                            background-color: #ff6600;
                            color: white;
                            padding: 10px 20px;
                            text-decoration: none;
                            font-size: 16px;
                            border-radius: 5px;
                            margin-top: 20px;
                          }
                          .footer {
                            background: linear-gradient(to right, #3d7bdf, #131939);
                            color: white;
                            text-align: center;
                            padding: 20px;
                            font-size: 14px;
                          }
                          .logo {
                            width: 100px !important;
                            height: auto !important;
                          }
                          .mail {
                            color: white !important;
                            font-weight: bold !important;
                            text-decoration: none; 
                            pointer-events: none;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <header class="header">
                            <img src="https://${dominioImg}/Multimedia/Imagen/Ccd/Logos/CCDLOGOWHITE.png" alt="logo" class="logo" />
                            <h1>Notificación de Compra</h1>        
                          </header>
                          <div class="content">
                            <p>Se ha registrado una nueva compra en la plataforma. A continuación, los detalles:</p>
                            <div class="product-info">
                              <p><strong>Usuario:</strong> ${
                                pnombres + " " + papellidos
                              }</p>
                              <p><strong>Correo del usuario:</strong> ${pcorreo}</p>
                              <p><strong>Curso adquirido:</strong> ${curso}</p>
                              <p><strong>Monto pagado:</strong> S/ ${precio}</p>
                              <p><strong>Fecha de compra:</strong> ${fechaHoy}</p>
                            </div>      
                          </div>
                          <footer class="footer">
                            <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
                            <p>¡Gracias por tu atención!</p>
                          </footer>
                        </div>
                      </body>
                    </html>`;
                  const response1 = await api.post("/inicio/EnviarCorreoPago", {
                    pdestinatario: pcorreo,
                    pmensaje: mensaje,
                  });
                  const response2 = await api.post("/inicio/EnviarCorreoPago", {
                    pdestinatario: pcorreoccd,
                    pmensaje: mensaje2,
                  });
                });
                setMessage("Payment successful!");
              } else {
                setMessage("Payment failed!");
              }
            } catch (error) {
              console.error("Error processing payment:", error);
              setMessage("Payment failed due to an error!");
            }

            return false; // Debemos devolver un booleano explícitamente
          });
        }
      } catch (error) {
        setMessage(error + " (ver consola para más detalles)");
        console.error("Error en la configuración del formulario:", error);
      }
    }
    setupPaymentForm();
    return () => {
      if (krInstance) {
        krInstance.removeForms(); // Remueve el formulario cuando el componente se desmonte
      }
    };
  }, [precio, currentStep]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: false, // Permite que las animaciones se repitan
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
    });
  }, []);

  return (
    <div className="h-full flex items-center  text-white p-4 md:p-6  overflow-x-auto scrollbar-hide ">
      <div className="max-w-7xl mx-auto max-sm:w-[95%] ">
        {/* Back Button */}

        {/* Progress Steps with dashed-background */}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full mx-auto">
          {/* Left Column - Payment Flow */}
          <div className="flex-1">
            {currentStep === "method" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    ¿Cómo quieres pagar?
                  </h2>
                  <div className="flex items-center gap-2 text-white/80">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Pago 100% Seguro
                  </div>
                </div>

                <div
                  className=" bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-3xl p-8 py-16 backdrop-blur-sm space-y-4"
                >
                  <p className="text-lg text-white/80 mb-4">
                    Selecciona tu forma de pago
                  </p>

                  <button
                    onClick={() => handlePaymentMethodSelect("card")}
                    className="w-full flex   max-sm:flex-col items-center justify-between p-4 rounded-xl border-2 border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-cyan-400" />
                      </div>
                      <span className="text-lg">
                        Tarjeta de crédito / débito
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <img
                        src="/Multimedia/Imagen/iconospago/visa.png"
                        alt="Visa"
                        className="h-6  w-14 object-contain"
                      />
                      <img
                        src="/Multimedia/Imagen/iconospago/mastercard.png"
                        alt="Visa"
                        width={40}
                        height={25}
                        className="h-6 w-auto object-contain"
                      />
                      <img
                        src="/Multimedia/Imagen/iconospago/dinners club.png"
                        alt="Visa"
                        width={40}
                        height={25}
                        className="h-6 w-auto object-contain"
                      />
                      <img
                        src="/Multimedia/Imagen/iconospago/american express.png"
                        alt="Visa"
                        width={40}
                        height={25}
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  </button>

                  {/* <button
                    onClick={() => handlePaymentMethodSelect("qr")}
                    className="w-full  max-sm:flex-col flex items-center justify-between p-4 rounded-xl border-2 border-gray-700 hover:border-gray-600 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center" />
                      <span className="text-lg">Paga con QR</span>
                    </div>
                    <div className="flex gap-2">
                      <img
                        src="/Multimedia/Imagen/iconospago/yape.png"
                        alt="Visa"
                        className="h-10 w-10 object-contain"
                      />
                      <img
                        src="/Multimedia/Imagen/iconospago/plin.png"
                        alt="Visa"
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                  </button> */}
                </div>
              </div>
            )}

            {currentStep === "form" && (
              <div className="flex flex-col items-center ">
                <div className="w-full flex">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
                  >
                    <ChevronLeft className="w-6 h-6" />
                    Regresar
                  </button>
                </div>
                <div className="flex justify-between items-center mb-6 ">
                  <h2 className="text-2xl md:text-3xl font-bold text-center">
                    Información de pago
                  </h2>
                </div>

                <div
                  className="flex  justify-center bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl"
                >
                  <div
                    key={animationKey}
                    className="flex flex-col justify-center items-center gap-4 p-4 !bg-transparent !rounded-none  !h-full"
                    data-aos="fade-up"
                  >
                    <div className="flex flex-col gap-4 p-6 justify-center   !bg-transparent !rounded-none !h-full">
                      <div className="container">
                        <div
                          id="myPaymentForm"
                          className="flex justify-center overflow-auto"
                        >
                          <div
                            className="kr-smart-form"
                            kr-card-form-expanded="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === "confirmation" && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                  <h1 className="text-2xl font-bold">Compra Exitosa</h1>
                </div>
                <p className="text-white/80 mb-8">
                  Hemos enviado un correo de confirmación a{" "}
                  <span className="text-cyan-400">{formData.email}</span>
                </p>
                <h2 className="text-2xl font-bold mb-8">
                  ¡Ya puedes disfrutar del contenido de tu ruta!
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/mis-cursos"
                    className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
                  >
                    Ir a Mis Cursos
                  </Link>
                  <Link
                    href="/rutas"
                    className="inline-flex justify-center items-center px-8 py-3 rounded-full border-2 border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-colors"
                  >
                    Conocer mas rutas
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* Right Column - Course Summary */}
          <div className="lg:w-[550px]">
            <div className="w-fit  relative flex  gap-10 justify-self-center items-center mb-12  ">
              {/* Dashed background */}
              <div className="flex gap-24">
                <div className="absolute top-10 left-2 w-full  h-[6px] -translate-y-1/2 px-10 ">
                  <div className=" dashed-background w-full h-full   rounded-full"></div>
                </div>
                <div className="absolute top-10 left-2 w-full h-[6px] -translate-y-1/2  px-10">
                  <div className="w-full h-full  rounded-full">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-300 rounded-full"
                      style={{
                        width:
                          currentStep === "method"
                            ? "0%"
                            : currentStep === "form"
                            ? "50%"
                            : "100%",
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full [mask-image:linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0),linear-gradient(to_right,white_33%,transparent_0);] [mask-size:9px_2px] [mask-repeat:repeat]"></div>
                </div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold
              ${
                currentStep !== "confirmation"
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-slate-400 text-white/50"
              }`}
                  >
                    1
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`font-medium ${
                        currentStep !== "confirmation"
                          ? "text-cyan-400"
                          : "text-white/50"
                      }`}
                    >
                      Información de pago
                    </p>
                    <p
                      className={`font-medium ${
                        currentStep !== "confirmation"
                          ? "text-cyan-400"
                          : "text-white/50"
                      }`}
                    ></p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
              ${
                currentStep === "confirmation"
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-white text-slate-600"
              }`}
                  >
                    2
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`font-medium ${
                        currentStep === "confirmation"
                          ? "text-cyan-400"
                          : "text-white/50"
                      }`}
                    >
                      Confirmación
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" rounded-3xl p-6 backdrop-blur-sm">
              <div
                className="flex  max-sm:flex-col items-center gap-4 mb-6  bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] px-4 py-8 rounded-3xl "
              >
                <div className=" relative w-36 max-sm:w-full h-full  max-sm:pt-2 pt-10 overflow-hidden flex-shrink-0 ">
                  <img
                    src={environment.baseUrlStorage + imagen}
                    alt="Course thumbnail"
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="">
                  <h1 className="flex gap-4 items-center">
                    <span className="text-xl"> {tipocurso}</span>
                    <span className="text-colors-cyan-ccd text-2xl">|</span>
                    {modalidad == "En Vivo" ? (
                      <>
                        <span className="text-sm font-medium text-[#00EADE]">
                          Curso En Vivo
                        </span>{" "}
                        <RiBroadcastFill size={20} className="text-[#00EADE]" />
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-[#00EADE]">
                          Curso Asincrónico
                        </span>{" "}
                        <BsCameraVideoFill
                          size={20}
                          className="text-[#00EADE]"
                        />
                      </>
                    )}
                  </h1>
                  <h3 className="text-xl  text-cyan-400 mb-2">{curso}</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Dictado por varios docentes
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-colors-cyan-ccd">
                <span className="text-lg">
                  {currentStep === "confirmation" ? "Total cobrado:" : "Total:"}
                </span>
                <span className="text-2xl font-bold">S/ {precio}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
