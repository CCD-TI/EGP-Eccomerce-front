"use client";
import Image from "next/image";
import React, {useState} from "react";
import CountdownTimer from "./countdowntimer";
import { environment } from "@/environments/environment";
import { FaWhatsapp } from "react-icons/fa6";

function PromoSection() {
    const contador: string = environment.contador;
  
   const phoneNumber = "51908841254";
    const defaultMessage =
      "Hola deseo más información, vengo de la página del CCD 📲😁📣";
    const [message, setMessage] = useState(defaultMessage);
    //   const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    //     message
    //   )}`;
    const isMobile = /iPhone|Android|iPad|iPod/.test(navigator.userAgent);
    const handleSend = () => {
      // Genera la URL de WhatsApp
      const whatsappURL = isMobile
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
  
  
      // Abre WhatsApp en una nueva pestaña
      window.open(whatsappURL, "_blank");
  
      // Reinicia el mensaje después de enviarlo
      setTimeout(() => {
        setMessage(defaultMessage);
      }, 500);
    };


    const Contenido = [
      {
        bg_color: "bg-gradient-to-t from-colors-sky-ccd to-colors-dark-blue-ccd",
        bg_arrow: "bg-blue-700",
        colorText: "text-blue-700",
        bordershadow: "hover:shadow-blue-700/80 ",
        title: "Potencia tu CV",
        discount: "80",
        type: 2,
        description: " Cursos y Diplomas en Vivo",
      },
      {
        bg_color: "bg-gradient-to-t from-red-700",
        bg_arrow: "bg-red-700",
        bordershadow: "hover:shadow-red-700/80 ",
        colorText: "text-red-700",
        title: "Gestión Pública",
        discount: "29",
        type: 1,
        description: "Cursos y Diplomas Asincrónicos",
      },
      {
        bg_color: "bg-gradient-to-t from-orange-700 to-colors-dark-blue-ccd",
        bg_arrow: "bg-orange-700",
        bordershadow: "hover:shadow-orange-700/80 ",
        colorText: "text-orange-700",
        title: " Certificate",
        discount: "55",
        type: 2,
  
        description: "Cursos y Diplomas de Minería e Ingeniería en Asincrónico",
      },
    ];
  return (
    <>
      
      <div className="text-center py-16 bg-sectors-PromoForm2 ">
        <div className="flex flex-col max-w-[100rem] mx-auto text-center ">

                {/* <h1 className="md:text-4xl font-extrabold text-white">
                  <span className="text-2xl mr-2">VERANO</span>
                  <span className="text-3xl md:text-2xl font-extrabold text-colors-cyan-ccd">
                    FEST
                  </span>
                  <span className="text-3xl md:text-2xl font-extrabold text-white">
                    2025
                  </span>
                </h1> */}
                <div className="flex flex-wrap justify-center items-center py-2 ">
                  {/* Línea izquierda */}
                  <div>
                    <span className="block bg-white w-0 md:w-24 lg:w-56 h-[6px] neon-white-cyan"></span>
                  </div>

                  {/* Texto central */}
                  <div>
                    <h1
                      className="text-5xl sm:text-5xl md:text-4xl lg:text-8xl pt-5 text-colors-dark-blue-ccd font-extrabold tracking-wide neon-white-cyan text-center"
                      style={{
                        WebkitTextStrokeWidth: "1px", // Ancho del trazo
                        WebkitTextStrokeColor: "#00eadf", // Color neon
                      }}
                    >
                      PROMOCIÓN
                    </h1>
                  </div>

                  {/* Línea derecha */}
                  <div>
                    <span className="block bg-white w-0 md:w-24 lg:w-56 h-[6px] neon-white-cyan"></span>
                  </div>
                </div>

                <p className="w-fit mx-auto text-2xl text-white mt-4 mb-4 border-2 border-colors-cyan-ccd rounded-2xl px-6 inline-block shadow-[0_0_15px_7px_rgba(0,234,223,0.2)]">
                  Cursos y Diplomas
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-12">
                {Contenido.map((item, index) => (
                  <button
                    key={index}
                    onClick={handleSend}
                    className={`flex flex-col gap-1 w-[22rem] h-[28rem] rounded-xl ${item.bg_color} text-white p-5 border-2 hover:scale-105 hover:shadow-lg ${item.bordershadow} transition-transform duration-300 ease-in-out`}
                  >
                    <h1 className="text-3xl text-center font-semibold">
                      <h1 className="text-3xl font-semibold neon-white">
                        Promoción{" "}
                      </h1>
                      <span
                        className={`text-4xl font-extrabold ${item.colorText}`}
                      >
                        {item.title}{" "}
                        <div
                          className={`${item.bg_arrow} w-[70px] h-[5px] mx-auto mt-2`}
                        ></div>
                      </span>
                    </h1>
                    {item.type === 1 ? (
                      <p className="text-9xl flex gap-2 justify-center items-center neon-white font-bold text-center">
                        <div className="flex flex'row  gap-2 justify-center  items-start flex-col">
                        <span className="text-xl">Desde: </span>
                          <span className="text-7xl">S/</span>
                        </div>
                        {item.discount}
                        <span className="text-3xl">.99</span>
                      </p>
                    ) : (
                      <p className="text-9xl flex gap-2 justify-center items-center neon-white font-bold text-center">
                        {item.discount}
                        <div className="flex gap-2 justify-center pt-3 items-start flex-col">
                          <span className="text-6xl">%</span>
                          <span className="text-2xl">DSCT</span>
                        </div>
                      </p>
                    )}
                    <div className="text-xl flex flex-col gap-2 justify-end h-full items-center">
                      <p className="text-3xl text-center font-semibold">
                        {" "}
                        En todos nuestros{" "}
                      </p>
                      <p className="text-xl text-center"> {item.description}</p>
                    </div>
                    <button
                      onClick={handleSend}
                      className="w-[80%] mx-auto flex justify-center gap-3 items-center text-xl p-1 border-2 border-colors-dark-blue-ccd rounded-3xl mt-6 hover:bg-colors-dark-blue-ccd hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-transform duration-300 ease-in-out"
                    >
                      ¡Contáctanos!
                      <FaWhatsapp className="text-3xl" />
                    </button>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-around flex-wrap gap-4">
                <div className="flex-1 max-sm:hidden">
                  <Image
                    src="/Multimedia/Imagen/ccdcorp/newccdCorp/promociones/VERANO FEST/FLECHAS/Group 449.png"
                    alt=""
                    layout="responsive"
                    width={800} // Puedes ajustar este valor según lo que necesites
                    height={300} // Ajusta la altura también si es necesario
                    className="object-contain"
                  />
                </div>

                <div className="flex justify-center items-center flex-1">
                  <CountdownTimer targetDate={contador} />
                </div>

                <div className="flex-1 max-sm:hidden">
                  <Image
                    src="/Multimedia/Imagen/ccdcorp/newccdCorp/promociones/VERANO FEST/FLECHAS/Group 450.png"
                    alt=""
                    layout="responsive"
                    width={800} // Lo mismo aquí, ajusta el tamaño
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>

        {/* <div className="w-full hidden lg:flex max-sm:w-fit justify-end max-sm:justify-center">
          <div className="relative pt- max-w-3xl max-xl2:max-w-[40rem] max-xl:max-w-[30rem] w-full  rounded-2xl flex justify-end ">
            <div className="relative w-full mx-auto overflow-hidden rounded-l-xl border-3 border-white  
                      bg-transparent p-14 max-xl2:p-7 max-md:p-8 shadow-[0_0_15px_rgba(0,255,213,0.15)]">
              <div className="flex flex-col justify-center items-center">
                <div className="space-y-1">
                  <p className="text-white text-center text-4xl max-xl2:text-3xl max-xl:text-2xl">
                    Aprovecha el
                  </p>
                  <div className="flex justify-center gap-1">
                    <p className="text-[#00ffd5] text-6xl font-bold tracking-tight">
                      <Image
                        alt=""
                        src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Promociones/80porciento.png"
                        width={250}
                        height={560}
                        priority
                        className="mx-auto max-xl:hidden"
                      />
                       <Image
                        alt=""
                        src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Promociones/80porciento.png"
                        width={150}
                        height={560}
                        priority
                        className="mx-auto max-xl:block hidden"
                      />
                    </p>
                  
                  </div>
                  <p className="text-white text-4xl text-center max-xl2:text-3xl max-xl:text-2xl  ">
                    En todos nuestros
                  </p>
                  <p className="text-white max-xl2:text-4xl text-5xl font-bold tracking-wide flex flex-col gap-2 pb-7 max-md:text-3xl  max-xl:text-2xl ">
                    CURSOS Y DIPLOMAS
                   
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSend}
              className="absolute left-[12.5rem] shadow-2xl py-6 right-[12.5rem] max-xl2:right-[10.5rem] max-xl2:left-[10.5rem]  max-xl:left-[8.5rem] max-xl:right-[8.5rem] -bottom-7 w-[50%] max-sm:w-[40%] max-sm:left-[6.5rem]  
          max-sm:right-[6.5rem] mt-2 text-4xl  max-xl2:text-2xl  max-sm:text-xl  max-sm:p-1 rounded-xl border-3 bg-white border-[#b64c6b] bg- px-6  
          text-[#b64c6b] font-medium transition-colors hover:bg-[#b64c6b] hover:border-[#fff] hover:text-white max-xl2:!py-3 max-xl:text-xl   "
            >
              ¡OBTENER AHORA!
            </button>
          </div>
        </div> */}
        </div>
      




      {/* <div className="w-full lg:hidden flex justify-center mx-auto bg-[#b64c6b]  py-10 relative overflow-hidden">
     
      <Image
        src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Promociones/Vertical-sin-texto%20(1).jpg"
        alt="Fondo promoción San Valentín"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        priority
        className="z-10" // Asegúrate de que esté detrás del contenido
      />

     
      <div className="z-20 max-w-3xl gap-10 w-full rounded-2xl flex flex-col justify-center items-center relative">
        <div className="-bottom-7 w-fit py-4 overflow-hidden bg-transparent">
          <div className="flex flex-col justify-center items-center">
            <p className="text-white text-center font-extrabold text-7xl max-sm:text-[50px] outline-text">
              PROMOCIÓN
            </p>
            <p className="text-white text-center font-extrabold text-7xl max-sm:text-5xl mb-6">
              SAN VALENTÍN
            </p>
            <p className="text-2xl max-sm:text-lg text-white mb-12">
              El <span className="text-white text-center font-extrabol text-2xl max-sm:text-lg">AMOR</span> Y EL{' '}
              <span className="text-white text-center max-sm:text-lg font-extrabol text-2xl">CONOCIMIENTO</span>
              <br /> ES ALGO QUE SE{' '}
              <span className="text-white text-center font-extrabol text-2xl max-sm:text-lg">COMPARTEN</span>
            </p>

            <div className="space-y-1">
              <p className="text-white text-center text-5xl max-sm:text-3xl">
                Aprovecha el
              </p>
              <div className="flex justify-center gap-1">
                <p className="text-[#00ffd5] text-6xl font-bold tracking-tight">
                  <Image
                    alt="80% de descuento"
                    src="https://pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev/Multimedia/Imagen/Ccd/Promociones/80porciento.png"
                    width={200}
                    height={560}
                    priority
                  />
                </p>
              </div>
              <p className="text-white text-4xl text-center">
                En todos nuestros
              </p>
              <p className="text-white text-5xl max-sm:text-3xl text-center font-bold tracking-wide flex flex-col gap-2">
                CURSOS Y DIPLOMAS
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleSend}
          className="-mt-[30px] font-bold flex justify-center items-center shadow-2xl py-6 -bottom-7 w-fit text-4xl max-md:text-2xl rounded-2xl border-3 bg-white border-[#b64c6b] px-6 text-[#b64c6b] transition-colors hover:bg-[#b64c6b] hover:border-[#fff] hover:text-white"
        >
          ¡OBTENER AHORA!
        </button>
      </div>
    </div> */}
    </>
  );
}
export default PromoSection;
