"use client";

import React, { useRef, useState, useEffect } from "react";
import QRCode from "qrcode";
import { environment } from "@/environments/environment";
import { Download, Award, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Image as Image1,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AOS from "aos"; // Importa AOS
import KRGlue from "@lyracom/embedded-form-glue";
import { HiCurrencyDollar } from "react-icons/hi2";
import confetti from "canvas-confetti";
import { IoClose } from "react-icons/io5";

export default function CursosCertificados({ acreditaciones }: any) {
  const [textData, setTextData] = useState(""); // Datos para el QR
  const [textOverlay, setTextOverlay] = useState(""); // Texto adicional encima de la imagen (líneas separadas por \n)
  const [loading, setLoading] = useState(true); // Estado de carga
  const canvasRef = useRef<HTMLCanvasElement>(null); // Referencia al canvas
  const canvasRef2 = useRef<HTMLCanvasElement>(null); // Referencia al canvas
  const searchParams = useSearchParams();
  const pid = searchParams.get("pid");
  const psala = searchParams.get("psala");
  const pmodalidad = searchParams.get("pmodalidad");
  const { data: session } = useSession();
  const [datacertificadogener, setdatacertificadogener] = useState({}); // Estado para la fuente del video
  const [precioacreditacion, setprecioacreditacion] = useState(0); // Estado para la fuente del video
  const [codigosecreto, setcodigosecreto] = useState(""); // Estado para la fuente del video
  const [acreditacioindex, setacreditacioindex] = useState(""); // Estado para la fuente del video

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  function numeroACadena(num: any) {
    const unidades = [
      "",
      "Uno",
      "Dos",
      "Tres",
      "Cuatro",
      "Cinco",
      "Seis",
      "Siete",
      "Ocho",
      "Nueve",
    ];
    const decenas = [
      "",
      "Diez",
      "Veinte",
      "Treinta",
      "Cuarenta",
      "Cincuenta",
      "Sesenta",
      "Setenta",
      "Ochenta",
      "Noventa",
    ];
    const especiales = [
      "Diez",
      "Once",
      "Doce",
      "Trece",
      "Catorce",
      "Quince",
      "Dieciséis",
      "Diecisiete",
      "Dieciocho",
      "Diecinueve",
    ];
    const centenas = [
      "",
      "Ciento",
      "Doscientos",
      "Trescientos",
      "Cuatrocientos",
      "Quinientos",
      "Seiscientos",
      "Setecientos",
      "Ochocientos",
      "Novecientos",
    ];

    let palabra = "";

    if (num === 100) {
      return "Cien";
    }

    if (num >= 1000 && num < 10000) {
      let miles = Math.floor(num / 1000);
      palabra += miles === 1 ? "Mil " : unidades[miles] + " mil ";
      num = num % 1000;
    }

    if (num >= 100) {
      let centena = Math.floor(num / 100);
      palabra += centenas[centena] + " ";
      num = num % 100;
    }

    if (num >= 20) {
      let decena = Math.floor(num / 10);
      palabra += decenas[decena] + " ";
      num = num % 10;
    }

    if (num >= 10) {
      palabra += especiales[num - 10] + " ";
      return palabra.trim();
    }

    if (num > 0) {
      palabra += unidades[num] + " ";
    }

    return palabra.trim();
  }

  const [sizeRes, setSizeRes] = useState<
    "md" | "full" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  >("md"); // Tipo explícito

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setSizeRes("full"); // Cambiar a "full" en pantallas pequeñas
      } else {
        setSizeRes("5xl"); // Usar "md" en pantallas grandes
      }
    };

    // Ejecutar la función al montar el componente y al redimensionar
    handleResize();
    window.addEventListener("resize", handleResize);

    // Limpieza del evento al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (session && pmodalidad == "En-Vivo") {
      const loadData = async () => {
        try {
          const listarTemario = await api.post(
            "/inicio/listardatoscertificadogenerarvivov2",
            {
              fproducto_id: pid,
              fusuario_id: session?.user.uid,
              psala_id: psala,
            }
          );
          setdatacertificadogener(listarTemario.data.data[0]);
        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }
    if (session && pmodalidad == "Asincrónico") {
      const loadData = async () => {
        try {
          const listarTemario = await api.post(
            "/inicio/listardatoscertificadogenerarv2",
            {
              fproducto_id: pid,
              fusuario_id: session?.user.uid,
            }
          );
          setdatacertificadogener(listarTemario.data.data[0]);
        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }
  }, [session?.user.uid]);

  function convertToRomanNumerals(input: string): string {
    const toRoman = (num: number): string => {
      const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1],
      ] as [string, number][];

      let result = "";
      for (const [roman, value] of romanNumerals) {
        while (num >= value) {
          result += roman;
          num -= value;
        }
      }
      return result;
    };

    // Detectar números y convertirlos a romanos, respetando conectores como "y" o ","
    return input.replace(/\d+/g, (match) => toRoman(parseInt(match, 10)));
  }
  // Función para generar las imágenes
  const funcionimagenes = async () => {
    startConfetti();
    if (!canvasRef.current) return;
    if (!canvasRef2.current) return;

    const canvas = canvasRef.current;
    const canvas1 = canvasRef2.current;

    const ctx = canvas.getContext("2d");
    const ctx1 = canvas1.getContext("2d");
    if (!ctx) return;
    if (!ctx1) return;

    // Configuración del canvas
    const canvasWidth = 1124;
    const canvasHeight = 794;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    canvas1.width = canvasWidth * dpr;
    canvas1.height = canvasHeight * dpr;
    canvas1.style.width = `${canvasWidth}px`;
    canvas1.style.height = `${canvasHeight}px`;

    ctx.scale(dpr, dpr);
    ctx1.scale(dpr, dpr);

    // Cargar la imagen de fondo
    const backgroundImage = new Image();
    const backgroundImage1 = new Image();
    backgroundImage.src = "/Multimedia/certificado/PlantillaCertificadoGES.png"; // Ruta a la plantilla
    backgroundImage.onload = async () => {
      // Dibujar la imagen de fondo

      ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

      // Añadir múltiples líneas de texto
      const lines = textOverlay.split("\n"); // Dividir texto en líneas
      ctx.fillStyle = "#3579BD";
      let fontSize = 34.5; // Tamaño inicial del texto

      lines.forEach((line, index) => {
        ctx.font = `600 ${fontSize}px Tahoma`;
        let textWidth = ctx.measureText(line).width;

        // Reducir tamaño de fuente si el texto es demasiado ancho
        while (textWidth > canvasWidth - 40 && fontSize > 10) {
          fontSize--;
          ctx.font = `600 ${fontSize}px Tahoma`;
          textWidth = ctx.measureText(line).width;
        }

        // Calcular posición para centrar cada línea
        const textX = (canvasWidth - textWidth) / 2;
        const textY = 250 + index * (fontSize + 10); // Separación entre líneas

        ctx.fillText(line, textX, textY);
      });

      const y0ini = 202;
      const maxWidth0 = canvas.width - 40;
      const maxWidth10 = canvas.width - 300;
      const maxWidth20 = canvas.width - 250;

      ctx.font = "bold 58px Tahoma";
      ctx.fillStyle = "#123157";
      const text0 =
        (datacertificadogener as any).TipoCurso === "Curso"
          ? "CERTIFICADO"
          : (datacertificadogener as any).TipoCurso === "Diploma"
          ? "DIPLOMA"
          : "";
      const w0 = ctx.measureText(text0).width;
      const x0ini = (canvasWidth - w0) / 2;
      const inicioa = wrapText1(ctx, text0, x0ini, y0ini, maxWidth0, 25);

      ctx.font = "14px Tahoma";
      ctx.fillStyle = "#123256";
      const text1 = "Otorgado a:";
      const w1 = ctx.measureText(text1).width;
      const x1ini = (canvasWidth - w1) / 2;
      const iniciob = wrapText1(ctx, text1, x1ini, inicioa + 8, maxWidth0, 25);

      ctx.font = "bold 34px Tahoma";
      ctx.fillStyle = "#004D8C";
      const text2 = `${session?.user.Nombres.toUpperCase() || ""} ${
        session?.user.Apellidos.toUpperCase() || ""
      }`;
      const w2 = ctx.measureText(text2).width;
      const x21ini = (canvasWidth - w2) / 2;
      const inicioc = wrapText1(
        ctx,
        text2,
        x21ini,
        iniciob + 20,
        maxWidth0,
        25
      );

      ctx.font = "bold 15px Tahoma";
      ctx.fillStyle = "#123256";
      const text4 = `Por haber concluido con éxito el ${(
        datacertificadogener as any
      ).TipoCurso.toLowerCase()} de alta especialización de:`;
      const w4 = ctx.measureText(text4).width;
      const x41ini = (canvasWidth - w4) / 2;
      const iniciod = wrapText1(
        ctx,
        text4,
        x41ini,
        inicioc + 10,
        maxWidth0,
        25
      );

      ctx.font = "bold 30px Tahoma";
      ctx.fillStyle = "#123256";
      const text5 = `${(datacertificadogener as any).Curso.toUpperCase()}`;
      const w5 = ctx.measureText(text5).width;
      const x51ini = (canvasWidth - w5) / 2;
      const inicioe = wrapText1(
        ctx,
        text5,
        x51ini,
        iniciod + 15,
        maxWidth0,
        10
      );

      ctx.font = "19px Tahoma";
      ctx.fillStyle = "#123256";
      const text6 = `Emitido por el Centro de capacitación y desarrollo - CCD, con una duración de ${
        (datacertificadogener as any).HorasAcademicas
      } (${numeroACadena(
        (datacertificadogener as any).HorasAcademicas
      )}) horas académicas, realizado desde el 14 de Enero hasta el 18 de Marzo del 2024.`;
      const w6 = ctx.measureText(text6).width;
      const x61ini = (canvasWidth - w6) / 2;
      const iniciof = wrapText3(
        ctx,
        text6,
        x61ini + 260,
        inicioe + 25,
        maxWidth20,
        25
      );

      ctx.font = "19px Tahoma";
      ctx.fillStyle = "#123256";
      const text7 =
        "Por cuanto: Para que conste y sea reconocido, se otorga el presente certificado en calidad de APROBADO.";
      const w7 = ctx.measureText(text7).width;
      const x71ini = (canvasWidth - w7) / 2;
      const iniciog = wrapText1(
        ctx,
        text7,
        x71ini,
        iniciof + 15,
        maxWidth10,
        25
      );

      ctx.font = "19px Tahoma";
      ctx.fillStyle = "#123256";
      const text8 = "Firmado, el 18 de Marzo del 2024.";
      const w8 = ctx.measureText(text8).width;
      const x81ini = (canvasWidth - w8) / 2;
      const inicioh = wrapText1(
        ctx,
        text8,
        x81ini,
        iniciog + 15,
        maxWidth0,
        25
      );

      //TEMARIO 2DA PAGINA

      function wrapText3(
        ctx: any,
        text: any,
        x: any,
        y: any,
        maxWidth: any,
        lineHeight: any
      ) {
        const words = text.split(" ");
        let line = "";
        const lines = [];

        // Dividir el texto en líneas
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            lines.push(line); // Línea completa
            line = words[n] + " "; // Nueva línea
          } else {
            line = testLine; // Continuar línea actual
          }
        }
        lines.push(line.trim()); // Agregar la última línea

        // Dibujar cada línea centrada
        lines.forEach((line) => {
          const lineWidth = ctx.measureText(line).width;
          const centeredX = (canvasWidth - lineWidth) / 2; // Calcular posición centrada
          ctx.fillText(line, centeredX, y);
          y += lineHeight; // Avanzar en Y
        });

        return y; // Retornar la posición final
      }

      function wrapText1(
        ctx: any,
        text: any,
        x: any,
        y: any,
        maxWidth: any,
        lineHeight: any
      ) {
        const words = text.split(" ");
        let line = "";
        let lines = [];

        words.forEach((word: any) => {
          const testLine = line + word + " ";
          const testWidth = ctx.measureText(testLine).width;

          if (testWidth > maxWidth && line !== "") {
            lines.push(line);
            line = word + " ";
          } else {
            line = testLine;
          }
        });

        lines.push(line); // Agregar la última línea

        // Dibujar las líneas y ajustar la posición 'y' después de cada línea
        lines.forEach((lineText, index) => {
          ctx.fillText(lineText, x, y + index * lineHeight);
        });

        // Retornar la nueva posición 'y' después de dibujar todo el texto
        return y + lines.length * lineHeight;
      }
    };
    backgroundImage1.src =
      "/Multimedia/certificado/PlantillaCertificadoAtrasGES.png"; // Ruta a la plantilla
    backgroundImage1.onload = async () => {
      ctx1.drawImage(backgroundImage1, 0, 0, canvasWidth, canvasHeight);
      function wrapText1(
        ctx: any,
        text: any,
        x: any,
        y: any,
        maxWidth: any,
        lineHeight: any
      ) {
        const words = text.split(" ");
        let line = "";
        let lines = [];

        words.forEach((word: any) => {
          const testLine = line + word + " ";
          const testWidth = ctx.measureText(testLine).width;

          if (testWidth > maxWidth && line !== "") {
            lines.push(line);
            line = word + " ";
          } else {
            line = testLine;
          }
        });

        lines.push(line); // Agregar la última línea

        // Dibujar las líneas y ajustar la posición 'y' después de cada línea
        lines.forEach((lineText, index) => {
          ctx.fillText(lineText, x, y + index * lineHeight);
        });

        // Retornar la nueva posición 'y' después de dibujar todo el texto
        return y + lines.length * lineHeight;
      }
      function generateUUID() {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let uuid = "";
        for (let i = 0; i < 10; i++) {
          uuid += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return uuid;
      }
      const codigo =
        (datacertificadogener as any).CodigoCertificado === null
          ? generateUUID()
          : (datacertificadogener as any).CodigoCertificado;
      const y3ini = 64;
      const x3ini = 211;
      const maxWidth3 = canvas1.width - 100;
      ctx1.font = "bold 16.5px Tahoma ";
      ctx1.fillStyle = "#123256";
      const finala = wrapText1(
        ctx1,
        `${(
          datacertificadogener as any
        ).TipoCurso.toUpperCase()} DE ESPECIALIZACIÓN`,
        x3ini,
        y3ini,
        maxWidth3,
        25
      );

      ctx1.font = "12px Tahoma ";
      ctx1.fillStyle = "#123256";
      const finalb = wrapText1(
        ctx1,
        `${(datacertificadogener as any).Curso.toUpperCase()}`,
        x3ini + 105,
        y3ini + 14,
        maxWidth3,
        25
      );

      ctx1.font = "12px Tahoma ";
      ctx1.fillStyle = "#123256";
      const finalc = wrapText1(
        ctx1,
        `${(
          datacertificadogener as any
        ).HorasAcademicas.toUpperCase()} horas académicas.`,
        x3ini + 60,
        y3ini + 30,
        maxWidth3,
        25
      );

      ctx1.font = "12px Tahoma ";
      ctx1.fillStyle = "#123256";
      const finald = wrapText1(
        ctx1,
        `${convertToRomanNumerals(
          (datacertificadogener as any).temarioarray.length.toString()
        )} módulos de alta especialización.`,
        x3ini + 58,
        y3ini + 45,
        maxWidth3,
        25
      );

      ctx1.font = "bold 14.5px Tahoma ";
      ctx1.fillStyle = "#123256";
      const finale = wrapText1(
        ctx1,
        `${codigo}`,
        x3ini + 3,
        y3ini + 80,
        maxWidth3,
        25
      );

      const y2ini = 210;
      const x2ini = 40;
      ctx1.font = "bold 20px Tahoma ";
      ctx1.fillStyle = "#3579BE";
      const maxWidth = canvas1.width - 200;
      const finalY = wrapText1(
        ctx1,
        `${(
          datacertificadogener as any
        ).TipoCurso.toUpperCase()} DE ESPECIALIZACIÓN EN ${(
          datacertificadogener as any
        ).Curso.toUpperCase()}`,
        x2ini,
        y2ini,
        maxWidth,
        25
      );
      const canvasWidth1 = canvas1.width;
      const columnWidth = canvasWidth1 / 2 - 90;
      const columnGap = 15;
      const lineHeight = 19;

      const modules = (datacertificadogener as any).temarioarray;
      const numModules = modules.length;

      const half = Math.ceil(
        (datacertificadogener as any).temarioarray.length / 2
      );
      const column1 = (datacertificadogener as any).temarioarray.slice(0, half);
      const column2 = (datacertificadogener as any).temarioarray.slice(half);
      ctx1.font = " 15px Tahoma ";
      ctx1.fillStyle = "#123157";
      const maxWidth1 = canvas1.width - 200; // El ancho máximo de la caja (con margen de 40px a la izquierda y derecha)
      const finalY1 = wrapText1(
        ctx1,
        "El Diploma fue desarrollado por un docente de amplia experiencia diseñado con una metodología con enfoque aplicativo al ámbito laboral.",
        x2ini,
        finalY,
        maxWidth1,
        25
      );

      ctx1.font = "bold 20px Tahoma ";
      ctx1.fillStyle = "#3579BE";
      const finalY2 = wrapText1(
        ctx1,
        "Temario:",
        x2ini,
        finalY + 28,
        maxWidth1,
        25
      );

      // Renderizar la primera columna
      if (numModules > 14) {
        const half = Math.ceil(numModules / 2);
        const column1 = modules.slice(0, half);
        const column2 = modules.slice(half);

        // Renderizar la primera columna
        column1.forEach((item: any, index: any) => {
          const x = 55; // Posición inicial del texto
          const y = finalY2 + index * lineHeight - 5; // Posición en Y
          const circleRadius = 2.2; // Radio del círculo
          const circleX = x - 10; // Posición X del círculo
          const circleY = y - 5; // Posición Y del círculo (centrado verticalmente con el texto)

          // Dibujar el círculo
          ctx1.beginPath();
          ctx1.arc(circleX, circleY, circleRadius, 0, Math.PI * 2); // Dibujar el círculo
          ctx1.fillStyle = "#007BFF"; // Color azul del círculo
          ctx1.fill();

          // Dibujar el texto
          ctx1.font = "11px Tahoma";
          ctx1.fillStyle = "#123157";
          ctx1.fillText(
            `Módulo ${convertToRomanNumerals(item.numeracion)}: ${item.nombre}`,
            x,
            y
          );
        });

        // Renderizar la segunda columna
        column2.forEach((item: any, index: any) => {
          const x = columnWidth + columnGap - 100;
          const y = finalY2 + index * lineHeight - 5;
          const circleRadius = 2.2; // Radio del círculo
          const circleX = x - 10; // Posición X del círculo
          const circleY = y - 5; // Posición Y del círculo (centrado verticalmente con el texto)

          // Dibujar el círculo
          ctx1.beginPath();
          ctx1.arc(circleX, circleY, circleRadius, 0, Math.PI * 2); // Dibujar el círculo
          ctx1.fillStyle = "#007BFF"; // Color azul del círculo
          ctx1.fill();

          ctx1.font = "11px Tahoma";
          ctx1.fillStyle = "#123157";
          ctx1.fillText(
            `Módulo ${convertToRomanNumerals(item.numeracion)}: ${item.nombre}`,
            x,
            y
          );
        });
      } else {
        // Si hay 14 o menos módulos, renderiza en una sola columna
        modules.forEach((item: any, index: any) => {
          const x = 55; // Posición inicial del texto
          const y = finalY2 + index * lineHeight - 5; // Posición en Y
          const circleRadius = 2.2; // Radio del círculo
          const circleX = x - 10; // Posición X del círculo
          const circleY = y - 5; // Posición Y del círculo (centrado verticalmente con el texto)

          // Dibujar el círculo
          ctx1.beginPath();
          ctx1.arc(circleX, circleY, circleRadius, 0, Math.PI * 2); // Dibujar el círculo
          ctx1.fillStyle = "#007BFF"; // Color azul del círculo
          ctx1.fill();

          // Dibujar el texto
          ctx1.font = "14px Tahoma";
          ctx1.fillStyle = "#123157";
          ctx1.fillText(
            `Módulo ${convertToRomanNumerals(item.numeracion)}: ${item.nombre}`,
            x,
            y
          );
        });
      }

      const gradient = ctx1.createLinearGradient(50, 50, canvas1.width, 50);
      gradient.addColorStop(0, "#4B8ED9"); // Azul claro4B8ED9
      gradient.addColorStop(1, "#08325D"); // Azul oscuro08325D
      ctx1.fillStyle = gradient;
      ctx1.fillRect(40, 630, 270, 60);
      ctx1.font = "bold 24px Arial";
      ctx1.fillStyle = "white";
      ctx1.textAlign = "center";
      ctx1.textBaseline = "middle";
      ctx1.fillText(
        `Calificación Final: ${Math.round(
          (datacertificadogener as any).notafinal
        )}`,
        175,
        660
      );

      // Generar el código QR
      const qrCodeImage = await QRCode.toDataURL(
        `http://localhost:9000/validar/?pcodigo=${codigo}`,
        { width: 250 }
      );

      const qrImage = new Image();
      qrImage.setAttribute("crossorigin", "anonymous");
      qrImage.crossOrigin = "anonymous";
      qrImage.src = qrCodeImage;
      qrImage.onload = () => {
        const qrSize = 100;
        ctx1.drawImage(qrImage, 104, 48, qrSize, qrSize);
      };

      setcodigosecreto(codigo);

      if ((datacertificadogener as any).CodigoCertificado === null) {
        const listarTemario = await api.post("/inicio/guardarcertificadov2", {
          fcodigocertificado: codigo,
          fusuario_id: session?.user.uid,
          fcurso_id: (datacertificadogener as any).IdCurso,
          ftipo: acreditacioindex,
        });
        const listarTemario1 = await api.post(
          "/inicio/listardatoscertificadogenerarv2",
          {
            fproducto_id: pid,
            fusuario_id: session?.user.uid,
          }
        );
        setdatacertificadogener(listarTemario1.data.data[0]);
      }
    };
  };

  const generateImages = async (acreditacion: any, precio: any) => {
    setprecioacreditacion(precio);
    if (acreditacion == "0") {
      onOpen1();
      setacreditacioindex("0");
    }
    if (acreditacion == "1") {
      onOpen();
      setacreditacioindex("1");
    }
    if (acreditacion == "2") {
      onOpen();
      setacreditacioindex("2");
    }
    if (acreditacion == "3") {
      onOpen();
      setacreditacioindex("3");
    }
    if (acreditacion == "4") {
      onOpen();
      setacreditacioindex("4");
    }
  };
  const [dataacreditacioncerti, setdataacreditacioncerti] = useState({}); // Estado para la fuente del video

  useEffect(() => {
    if (session && pmodalidad == "En-Vivo") {
      const loadData = async () => {
        try {
          const listarTemario = await api.post(
            "/inicio/listarcertificadoacreditacionesvivo",
            {
              fproducto_id: pid,
              fusuario_id: session?.user.uid,
              psala_id: psala,
            }
          );
          setdataacreditacioncerti(listarTemario.data.data[0][0]);
        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }
    if (session && pmodalidad == "Asincrónico") {
      const loadData = async () => {
        try {
          const listarTemario = await api.post(
            "/inicio/listarcertificadoacreditaciones",
            {
              fproducto_id: pid,
              fusuario_id: session?.user.uid,
            }
          );
          setdataacreditacioncerti(listarTemario.data.data[0][0]);
        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }
  }, [session?.user.uid]);

  const acreditacion = (dataacreditacioncerti as any).MarcasRespaldo || ""; // Obtener la acreditación desde el estado
  const acreditacionArray = acreditacion
    .split(",")
    .filter((id: any) => id !== "0") // Excluir "0"
    .map((id: any) => ({
      id,
      label:
        id === "1"
          ? "CIP"
          : id === "2"
          ? "CEL"
          : id === "3"
          ? "AUT"
          : id === "4"
          ? "PMI"
          : "Desconocido", // Etiquetas según el valor
      precio:
        id === "1"
          ? 130
          : id === "2"
          ? 500
          : id === "3"
          ? 300
          : id === "4"
          ? 300
          : "Desconocido",
      foto:
        id === "1"
          ? "/Multimedia/acreditacion/acreditacion-cdidp-white.svg"
          : id === "2"
          ? 500
          : id === "3"
          ? "/Multimedia/acreditacion/acreditacion-autodesk-white.svg"
          : id === "4"
          ? "/Multimedia/acreditacion/acreditacion-pmi-white.svg"
          : "Desconocido",
    }));

  // Combinar siempre el genérico CCD solo si no hay "0"
  const certificados =
    acreditacionArray.length > 0
      ? [
          {
            id: "0",
            label: "CCD",
            foto: "/Multimedia/acreditacion/acreditacion-cdd-white5.svg",
          },
          ...acreditacionArray,
        ]
      : [];

  const [message, setMessage] = useState("");
  const [verprimercerti, setverprimercerti] = useState(0);

  const [animationKey, setAnimationKey] = useState<number>(0);
  const [krInstance, setKrInstance] = useState<any>(null); // Estado para almacenar la instancia de KR

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = "https://api.micuentaweb.pe";
      const publicKey = environment.izipago;
      let formToken = "";

      try {
        if (precioacreditacion > 0) {
          const res = await fetch(environment.baseUrl + "/pago/CreatePayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: precioacreditacion * 100,
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
                  }
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
    if (isOpen) {
      setupPaymentForm();
    }
    return () => {
      if (krInstance) {
        krInstance.removeForms(); // Remueve el formulario cuando el componente se desmonte
      }
    };
  }, [precioacreditacion, isOpen]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: false, // Permite que las animaciones se repitan
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
    });
  }, []);
  useEffect(() => {
    if (isOpen1) {
      funcionimagenes();
    }
  }, [isOpen1]);

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: any, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  const startConfetti = () => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png"); // Convierte el contenido a una URL de imagen PNG
    link.click(); // Simula el clic para descargar
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadCanvas(canvasRef.current, codigosecreto + "_adelante.png");
    }
    if (canvasRef2.current) {
      downloadCanvas(canvasRef2.current, codigosecreto + "_atras.png");
    }
  };

  return (
    <div className="flex flex-col  ">
      <div className="flex flex-wrap gap-4">
        {certificados.map((cert: any) => (
          <div
            key={cert.id}
            className="w-full max-w-md bg-[#131939] border-1 border-blue-500/50 text-white hover:border-[#3B82F6] transition-colors rounded-xl"
          >
            <div className="flex flex-col items-center p-4 border-b border-[#1F2937] justify-start">
              <div className="flex items-center justify-start w-full gap-2 mb-1">
                <Image1
                  removeWrapper
                  isBlurred
                  alt="HeroUI Album Cover"
                  className=""
                  src={cert.foto}
                  width={50}
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-6 w-6 text-[#3B82F6]" />
                    <h2 className="text-lg font-semibold">
                      Generar Certificado ({cert.label})
                    </h2>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                {cert.id == "0" &&
                  "Genera tu certificado emitido por el Centro de Capacitación y Desarrollo ."}
                {cert.id == "1" &&
                  "Genera tu certificado emitido por el Colegio de Ingenieros del Perú."}
                {cert.id == "2" &&
                  "Genera tu certificado emitido por el Colegio de Economistas de Lima."}
                {cert.id == "3" &&
                  "Genera tu certificado emitido por Autodesk Perú."}
                {cert.id == "4" &&
                  "Genera tu certificado emitido por PMI Perú."}
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-[#1F2937] p-4  rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Progreso del curso
                    </p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        ((dataacreditacioncerti as any).Progreso /
                          (dataacreditacioncerti as any).ProgresoTotal) *
                          100
                      )}
                      %
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                    <ChevronRight className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-[#1F2937]">
              <Button
                isDisabled={
                  (dataacreditacioncerti as any).Progreso ==
                  (dataacreditacioncerti as any).ProgresoTotal
                    ? false
                    : true
                }
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-4  flex items-center justify-center rounded-xl"
                onClick={() => generateImages(cert.id, cert.precio)} // Pasar el id al generar el certificado
              >
                {cert.id == "0" ? (
                  <Download className="mr-2 h-4 w-4" />
                ) : (
                  <HiCurrencyDollar />
                )}

                {cert.id == "0" ? "Descargar certificado" : "Iniciar Tramite"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        size={sizeRes}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        size={sizeRes}
        classNames={{
          closeButton: "hidden",
        }}
      >
        <ModalContent className="overflow-auto h-[80%] w-full bg-[#131939]">
          {(onClose) => (
            <>
              <ModalBody className="relative justify-center text-center w-full">
                <button
                  color="danger"
                  onClick={onClose}
                  className="bg-white absolute top-4 right-4 w-auto rounded-full p-2 "
                >
                  <IoClose className="text-2xl" />
                </button>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#00FFFF] via-[#a1c8f1] to-[#00FFFF] bg-clip-text text-transparent">
                  ¡Felicitaciones!
                </h1>
                <div className="flex flex-col mx-auto  gap-10 m-5 ">
                  <div className=" relative ">
                   <canvas
                      ref={canvasRef}
                      className="block  !size-[85%] mx-auto  "
                      
                    ></canvas>
                  </div>
                  <div className=" relative ">
                    <canvas
                      ref={canvasRef2}
                   
                     className="block  !size-[85%] mx-auto "
                    ></canvas>
                  </div>
                </div>
                <div className="mx-auto flex flex-row gap-2">
                  <Button
                    onClick={handleDownload}
                    className="¿ text-white bg-[#006FEE] mx-auto w-40"
                  >
                    Descargar
                  </Button>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="bg-white mx-auto w-40 "
                  >
                    Cerrar
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
