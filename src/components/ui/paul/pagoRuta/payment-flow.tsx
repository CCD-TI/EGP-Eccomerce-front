"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { FaTrash, FaCheckCircle, FaCartPlus, FaTag } from "react-icons/fa";
import { useCartProductoStore } from "@/context/cartProducto";
import { environment } from "@/environments/environment";
import { Divider, Image } from "@nextui-org/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AOS from "aos"; // Importa AOS
import KRGlue from "@lyracom/embedded-form-glue";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { HiShoppingCart } from "react-icons/hi";
import axios from "axios";
import { useSession } from "next-auth/react";
import PagarSesionComponent from "../../bruno/pagarsesion";
import { useCartRutaStore } from "@/context/cartRuta";
import { FaCaretRight } from "react-icons/fa";

export default function PaymentFlow() {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [showCart, setShowCart] = useState(true); // Estado para alternar entre vistas
  const { data: session } = useSession();

  // const total = cart.reduce((acc, curso) => acc + parsePrice(curso.Precio), 0);

  const handlePaymentClick = () => {
    setShowCart(false); // Oculta el carrito y muestra el pago
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleBackClick = () => {
    setShowCart(true); // Regresa al carrito
  };

  const cart = useCartProductoStore((state) => state.cart);
  const cartRutas = useCartRutaStore((state) => state.cart);

  // const removeProduct = useCartProductoStore((state) => state.removeProduct);
  const removeCurso = useCartProductoStore((state) => state.removeProduct);
  const removeRuta = useCartRutaStore((state) => state.removeRutaFromCart);

  const clearCartCursos = useCartProductoStore((state) => state.clearCart);
  const clearCartRutas = useCartRutaStore((state) => state.clearCart);

  const parsePrice = (price: any) => {
    if (typeof price === "number") return price; // Si es número, devuelve directamente
    if (!price) return 0; // Si es undefined, null, o vacío, devuelve 0

    const cleanPrice = String(price).replace(/[^0-9.]/g, "");
    return parseFloat(cleanPrice) || 0;
  };

  // Calcular el total para cursos y rutas
  const totalCursos = cart.reduce(
    (acc, curso) => acc + parsePrice(curso.Precio),
    0
  );
  const totalRutas = cartRutas.reduce(
    (acc, ruta) =>
      acc + parsePrice(ruta.PrecioTotal) - parsePrice(ruta.descuento),
    0
  );

  // Aseguramos que totalFinal sea un número
  const totalFinal = totalCursos + totalRutas;

  useEffect(() => {
    console.log("Valor de totalFinal:", totalFinal, typeof totalFinal);
  }, [totalFinal]);

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

  const clearCart = useCartProductoStore((state) => state.clearCart);

  const [message, setMessage] = useState("");
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [krInstance, setKrInstance] = useState<any>(null); // Estado para almacenar la instancia de KR
  const handleBack = () => {
    // Si hay historial, retrocede a la página anterior
    if (window.history.length > 2) {
      router.back();

      // Esperar un poco para que la página se cargue y luego hacer scroll al medio
      setTimeout(() => {
        // Calcular la posición para el centro de la pantalla
        const middlePosition = window.innerHeight * 1.5;
        window.scrollTo(0, middlePosition); // Hacer scroll al medio
      }, 50); // Espera un tiempo corto (50ms) para asegurar que la página recargue
    } else {
      // Si no hay historial, redirige a la página principal o la que prefieras
      router.push("/");
      window.scrollTo(0, 0); // Asegurarse de que cuando rediriges, el scroll sea al inicio
    }
  };

  // Función para limpiar ambos carritos después de pago exitoso
  const clearAllCarts = () => {
    clearCartCursos();
    clearCartRutas();
  };

  useEffect(() => {
    async function setupPaymentForm() {
      if (totalFinal > 0 && !isNaN(totalFinal)) {
        const endpoint = "https://api.micuentaweb.pe";
        const publicKey = environment.izipago;

        try {

        const pnombres = session?.user.Nombres;
        const papellidos = session?.user.Apellidos;
        const pcorreo = session?.user.Usuario;
        const pcorreoccd = "info@ccdcapacitacion.edu.pe"
        const dominioImg = "pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev"

          // Crear el pago con el monto total
          const res = await fetch(environment.baseUrl + "/pago/CreatePayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Math.round(totalFinal * 100), currency: "PEN" }),
          });

          const formToken = await res.text();

          const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

          await KR.setFormConfig({
            formToken,
            "kr-language": "es-ES",
          });

          await KR.removeForms();
          // Verifica si el elemento existe antes de renderizar
        if (document.getElementById("myPaymentForm")) {
          await KR.renderElements("#myPaymentForm");
          setKrInstance(KR);
        } else {
          console.error("Elemento myPaymentForm no encontrado en el DOM");
        }

          // Manejar la respuesta del pago
          KR.onSubmit(async (paymentData: any) => {
            try {
              const response = await api.post(
                "/pago/validatePayment",
                paymentData
              );
              if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                  title: "¡Compra realizada con éxito!",
                  text: "Estamos procesando tu pedido. Recibirás un correo con los detalles.",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ir al inicio",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    // Aquí asignamos los cursos y rutas compradas
                    console.log("el carrito:",cart)
                    await api.post("/inicio/asignarxpago", {
                      fproducto_id: cart,
                      fruta_id: cartRutas.length > 0 ? cartRutas : null,
                      fprecio: totalFinal,
                      fusuario_id: session?.user.uid,
                    });

                    // Limpiar el carrito después del pago exitoso
                    clearCartCursos();
                    clearCartRutas();

                    // Redirigir al inicio
                    router.push("/");
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
              .lista-sin-vinetas {
  list-style-type: none;
  padding-left: 0;
}

.lista-sin-vinetas li {
  margin-left: 0;
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
                ${
                cart.length > 0
                  ? `<p><strong>Cursos adquiridos:</strong></p>
                   <ul class="lista-sin-vinetas">
                     ${cart
                     .map(
                       (cart) =>
                       `<li>${cart.Curso} - ${cart.TipoModalidad == "1" ? "En vivo" : "Asincrónico"}</li>`
                     )
                     .join("")}
                   </ul>`
                  : ""
                }
                ${
                cartRutas.length > 0
                  ? `<p><strong>Rutas adquiridas:</strong></p>
                   <ul class="lista-sin-vinetas">
                     ${cartRutas
                     .map(
                       (cartRutas) =>
                       `<li>Ruta: ${cartRutas.Ruta} - Cursos incluidos: ${cartRutas.Cursos.map(
                         (Cursos) => `${Cursos.Curso} (${Cursos.Modalidad})`
                       ).join(", ")}</li>`
                     )
                     .join("")}
                   </ul>`
                  : ""
                }
                <p><strong>Monto pagado:</strong> S/ ${totalFinal}</p>
                <p><strong>Fecha de compra:</strong> ${fechaHoy}</p>
              </div>      
              </div>
              <footer class="footer">
              <p>Si tienes alguna duda, contáctanos en: <span class="mail">${pcorreoccd}</span></p>
              <p>¡Gracias por confiar en nosotros!</p>
              </footer>
            </div>
            </body>
          </html>`;

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
        .lista-sin-vinetas {
  list-style-type: none;
  padding-left: 0;
}

.lista-sin-vinetas li {
  margin-left: 0;
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
          <p><strong>Usuario:</strong> ${pnombres + " " + papellidos}</p>
          <p><strong>Correo del usuario:</strong> ${pcorreo}</p>
          <p><strong>Productos adquiridos:</strong></p>
              ${
                cart.length > 0
                  ? `<p><strong>Cursos adquiridos:</strong></p>
                   <ul class="lista-sin-vinetas">
                     ${cart
                     .map(
                       (cart) =>
                       `<li>${cart.Curso} - ${cart.TipoModalidad == "1" ? "En vivo" : "Asincrónico"}</li>`
                     )
                     .join("")}
                   </ul>`
                  : ""
                }
                ${
                cartRutas.length > 0
                  ? `<p><strong>Rutas adquiridas:</strong></p>
                   <ul class="lista-sin-vinetas">
                     ${cartRutas
                     .map(
                       (cartRutas) =>
                       `<li>Ruta: ${cartRutas.Ruta} - Cursos incluidos: ${cartRutas.Cursos.map(
                         (Cursos) => `${Cursos.Curso} (${Cursos.Modalidad})`
                       ).join(", ")}</li>`
                     )
                     .join("")}
                   </ul>`
                  : ""
                }
          <p><strong>Monto pagado:</strong> S/ ${totalFinal}</p>
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
              } else {
                Swal.fire("Error", "El pago no se pudo completar.", "error");
              }
            } catch (error) {
              console.error("Error al validar el pago:", error);
              Swal.fire(
                "Error",
                "Hubo un problema al procesar tu pago.",
                "error"
              );
            }
            return false;
          });
        } catch (error) {
          console.error("Error en la configuración del pago:", error);
        }
      }
    }
    console.log("se inicia el useeffect pasarella izipay");
    setupPaymentForm();

    return () => {
      if (krInstance) {
        krInstance.removeForms(); // Limpia el formulario al desmontar el componente
      }
    };
  }, [totalFinal, showCart]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: false, // Permite que las animaciones se repitan
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
    });
  }, []);

  // console.log("RUUTAAS PAY: ", cartRutas);

  return (
    <div className="min-h-screen bg-[#060917] text-white p-4 md:p-8  bg-double-esferas2 ">
      {showCart ? (
        <>
          <div className="max-w-7xl mx-auto pt-14">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className={`btn-back z-50  p-3 rounded-2xl mb-2 flex items-center`}
            >
              <IoIosArrowBack className="text-2xl" />
              Regresar
            </button>
            <div className="flex flex-col lg:flex-row gap-14">
              {/* Carrito */}
              <div
                className="lg:w-3/5 bg-gradient-to-br from-[rgba(0,96,254,0.4)]  via-[rgba(22,46,84,0.5)]  
            to-[rgba(0,96,254,0.4)]  border-2 border-[rgba(22,46,84,0.7)] rounded-2xl p-6  shadow-lg  w-[80%] max-lg:w-full "
              >
                <div className="justify-between w-full flex">
                  <h2 className="text-3xl font-bold mb-4">Carrito</h2>
                  <HiShoppingCart className="text-3xl" />
                </div>
                <hr className="border-colors-sky-ccd border-[2.5px] rounded-2xl my-4 " />

                {cart.map((item) => (
                  <>
                    <div
                      key={item.IdProducto}
                      className="my-2 flex flex-row-reverse justify-center p-2 gap-2 w-full shadow-sm"
                    >
                      <FaTrash
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => removeCurso(item)}
                      />
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-5">
                          <div className="relative w-48 h-26 rounded-xl overflow-hidden">
                            <img
                              src={environment.baseUrlStorage + item.RutaImagen}
                              alt={item.Curso}
                              className="size-full"
                            />
                          </div>
                          <div className="w-[80%] flex flex-col justify-between">
                            <div className="text-base text-white">
                              {item.TipoCurso}
                              <span className="text-colors-cyan-ccd text-base">
                                {" "}
                                |{" "}
                              </span>
                              {item.TipoModalidad == "1" ? "En vivo" : ""}
                              {item.TipoModalidad == "2" ? "Asincrónico" : ""}
                            </div>
                            <h3 className="font-semibold text-xl text-colors-cyan-ccd">
                              {item.Curso}
                            </h3>
                            {item.TipoModalidad == "2" ? (
                              <></>
                            ) : (
                              <div className="text-sm text-gray-300">
                                Inicio:
                                <span className="font-bold">
                                  {" "}
                                  {/* 26 de Nov - 07:30 pm */}
                                  {item.FechaInicio}
                                </span>
                              </div>
                            )}
                            <div className="flex gap-4 w-full justify-end items-center">
                              {item.Precio > 0 && (
                                <p className="text-sm text-gray-400 line-through  o">
                                  S/ {item.PrecioAnterior}
                                </p>
                              )}
                              <p className="text-lg  text-white bg-white/10 font-light p-2 rounded-2xl flex gap-2 items-center">
                                <FaTag className="text-xl text-colors-cyan-ccd" />
                                S/ {item.Precio}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider className=" border-[0.1px] bg-white/30  mb-4" />
                  </>
                ))}
                {/* Mostrar rutas en el carrito */}
                {cartRutas.length > 0 &&
                  cartRutas.map(
                    (
                      ruta: any // Correcto
                    ) => (
                      <>
                        <div
                          key={ruta.IdRuta}
                          className="my-2 flex flex-row-reverse justify-center p-2 gap-2 w-full shadow-sm"
                        >
                          <FaTrash
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => removeRuta(ruta)}
                          />
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex gap-5">
                              <div className="relative w-48 h-26 rounded-xl overflow-hidden">
                                <img
                                  src={
                                    environment.baseUrlStorage +
                                    ruta.ImagenPortada
                                  }
                                  alt={ruta.Ruta}
                                  className="size-full"
                                />
                              </div>

                              <div className="w-[80%] flex flex-col justify-between">
                                <h3>Ruta</h3>
                                <h3 className="font-semibold text-xl text-colors-cyan-ccd">
                                  {ruta.Ruta}
                                </h3>
                                {/* <p className="text-sm text-gray-400">
                                {ruta.Cursos.length} cursos incluidos
                              </p> */}
                                <div className="mt-2 space-y-1">
                                  {ruta.Cursos.map(
                                    (curso: any, index: number) => (
                                      <div
                                        key={index}
                                        className="text-sm text-white flex"
                                      >
                                        <span className="text-colors-cyan-ccd">
                                          <FaCaretRight />
                                        </span>
                                        <span>{curso.Curso}</span>
                                        <span className="text-gray-400 pl-2">
                                          {curso.Modalidad === "En Vivo"
                                            ? "En Vivo"
                                            : "Asincrónico"}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              {ruta.descuento > 0 ? (
                                <>
                                  <span className="line-through text-gray-400">
                                    S/. {ruta.PrecioTotal}
                                  </span>
                                  <span className="text-lg  text-white bg-white/10 font-light p-2 rounded-2xl flex gap-2 items-center">
                                    S/.{" "}
                                    {(
                                      ruta.PrecioTotal - ruta.descuento
                                    ).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                // <span className="text-lg  text-white bg-white/10 font-light p-2 rounded-2xl flex gap-2 items-center">
                                //   S/. {parsePrice(ruta.PrecioTotal).toFixed(2)}
                                // </span>
                                <div className="flex gap-4 w-full justify-end items-center">
                                  {ruta.PrecioTotal > 0 && (
                                    <p className="text-sm text-gray-400 line-through  o">
                                      S/ {ruta.PrecioTotal * 1.3}
                                    </p>
                                  )}
                                  <p className="text-lg  text-white bg-white/10 font-light p-2 rounded-2xl flex gap-2 items-center">
                                    <FaTag className="text-xl text-colors-cyan-ccd" />
                                    S/ {ruta.PrecioTotal}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Divider className=" border-[0.1px] bg-white/30  mb-4" />
                      </>
                    )
                  )}
              </div>

              {/* Resumen de pago */}
              <div
                className="lg:w-2/5 bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] h-fit p-6 rounded-3xl shadow-lg"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">Total:</span>
                      <span className="text-2xl font-bold">
                        S/. {isNaN(totalFinal) ? "0.00" : totalFinal.toFixed(2)}
                      </span>
                    </div>
                    <hr className="border-colors-sky-ccd border-[2.5px] rounded-2xl my-4 " />
                  </div>

                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Ejemplo: VFEMCCD2025"
                      className="w-full border border-white/30 rounded-xl bg-[white]/20 px-10 max-lg:px-4 py-[0.6rem] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    />
                    <button className="rounded-xl absolute right-1 top-1/2 -translate-y-1/2 bg-[#00ccbb] px-6 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-[#00e6c1]">
                      Aplicar
                    </button>
                  </div>

                  {session?.user ? (
                    <button
                      className="w-full  bg-white text-xl   py-3 rounded-2xl font-semibold hover:bg-white/60 transition-colors text-colors-sky-ccd"
                      onClick={handlePaymentClick}
                    >
                      Pagar Ahora
                    </button>
                  ) : (
                    <PagarSesionComponent array={{}} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-7xl mx-auto pt-14">
            <button
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
              onClick={handleBackClick}
            >
              <ChevronLeft className="w-6 h-6" />
              Regresar
            </button>
          </div>
          <div className="max-w-7xl mx-auto mt-8 flex max-sm:flex-col gap-10 justify-around">
            <div
              className=" w-full bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)] rounded-2xl h-fit p-6  "
            >
              <h2 className="text-xl  flex items-center justify-between pb-8">
                Carrito
                <span className="text-white/80 ">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </span>
              </h2>

              {/* Promotion Item 
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="flex gap-4">
                <div className="relative w-24 h-24">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bGQduhO8rTjhQLbeieBczZZsBMsUC6.png"
                    alt="Course preview"
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-blue-400">Promoción Verano Fest</div>
                  <h3 className="font-semibold mb-1">Plan BÁSICO</h3>
                  <ul className="text-sm text-gray-300">
                    <li>1 Curso en vivo</li>
                    <li>1 Curso asincrónico</li>
                    <li>2 Certificados de CCD</li>
                  </ul>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="line-through text-gray-400">S/1399.99</span>
                    <span className="text-lg font-bold">S/699.99</span>
                  </div>
                </div>
              </div>
            </div>*/}

              {/* Course Items */}
              {cart.map((curso) => (
                <div
                  key={curso.IdProducto}
                  className="space-y-6 border-t border-white/10 py-3"
                >
                  <div className="flex gap-4 justify-center items-center">
                    <div className="relative w-20 h-20">
                      <img
                        src={environment.baseUrlStorage + curso.RutaImagen}
                        alt="Mining course"
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </div>
                    <div className="flex-1  ">
                      <div className="text-sm text-blue-400">
                        {curso.TipoCurso} |{" "}
                        {curso.TipoModalidad == "1" ? "En vivo" : ""}
                        {curso.TipoModalidad == "2" ? "Asincrónico" : ""}
                      </div>
                      <h3 className="font-semibold">{curso.Curso}</h3>
                      {curso.TipoModalidad == "2" ? (
                        <></>
                      ) : (
                        <div className="text-sm text-gray-300">
                          {/* Inicio: 26 de Nov - 07:30 pm */}
                          {curso.FechaInicio}
                        </div>
                      )}

                      <div className="mt-1">
                        <span className="line-through text-gray-400">
                          S/{curso.PrecioAnterior}
                        </span>
                        <span className="ml-2 font-bold">S/{curso.Precio}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {cartRutas.map((curso) => (
                <div
                  key={curso.IdRuta}
                  className="space-y-6 border-t border-white/10 py-3"
                >
                  <div className="flex gap-4 justify-center items-center">
                    <div className="relative w-20 h-20  ">
                      <img
                        src={environment.baseUrlStorage + curso.ImagenPortada}
                        alt="Mining course"
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </div>
                    <div className="flex-1  ">
                      <div className="text-sm text-blue-400">Ruta</div>
                      <h3 className="font-semibold">{curso.Ruta}</h3>
                      <div className="mt-2 space-y-1">
                        {curso.Cursos.map((curso: any, index: number) => (
                          <div key={index} className="text-xs text-white flex">
                            <span className="text-colors-cyan-ccd">
                              <FaCaretRight />
                            </span>
                            <span className="text-xs">{curso.Curso}</span>
                            <span className="text-gray-400 pl-2">
                              {curso.Modalidad === "En Vivo"
                                ? "En Vivo"
                                : "Asincrónico"}
                            </span>
                          </div>
                        ))}
                      </div>
                        {/* Hacer los precios dinamicos */}
                      <div className="mt-1">
                        <span className="line-through text-gray-400">
                          S/{curso.PrecioTotal * 1.3}
                        </span>
                        <span className="ml-2 font-bold">
                          S/{curso.PrecioTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mb-2 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    S/. {isNaN(totalFinal) ? "0.00" : totalFinal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div
              className="bg-gradient-to-br from-[rgba(0,96,254,0.4)] hover:from-[rgba(0,96,254,0.7)] via-[rgba(22,46,84,0.5)] hover:via-[rgba(22,46,84,0.7)] 
            to-[rgba(0,96,254,0.4)] hover:to-[rgba(0,96,254,0.7)] border-2 border-[rgba(22,46,84,0.7)]  p-6 rounded-2xl"
            >
              <h1 className="text-center text-xl font-bold">
                Completar sus datos
              </h1>
              <form className="space-y-6">
                {/* 
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Ejemplo123@gmail.com"
                  className="w-full px-3 py-2 bg-[#1a365d] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-3 py-2 bg-[#1a365d] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Fecha de expiración</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select className="px-3 py-2 bg-[#1a365d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Mes</option>
                      {Array.from({length: 12}, (_, i) => (
                        <option key={i + 1} value={String(i + 1)}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <select className="px-3 py-2 bg-[#1a365d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Año</option>
                      {Array.from({length: 10}, (_, i) => (
                        <option key={i} value={String(new Date().getFullYear() + i)}>
                          {new Date().getFullYear() + i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">CVV</label>
                  <input
                    type="text"
                    maxLength={4}
                    className="w-full px-3 py-2 bg-[#1a365d] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>*/}
                <div className="flex  justify-center  rounded-2xl">
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
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
