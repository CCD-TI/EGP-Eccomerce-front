"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt, FaFacebook, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const icon = {
  mobilphone: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/footer-icon-mobilphone.svg`,
  iphone: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/footer-icon-phone.svg`,
  message: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/footer-icon-message.svg`,
  map: `${storageUrl}/Multimedia/Imagen/Ccd/Iconos/footer-icon-map.svg`,
};

const Footer = ({ environment }: { environment: any }) => {
  const footerRef = useRef<HTMLDivElement | null>(null);

  if (environment.modo === "desarrollo") return null;

  return (
    <>
      <div ref={footerRef}></div>
      <footer className="bg-[#0a0e27] text-white py-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-6 lg:px-14">
        {/* Columna 1: Logo e Información de contacto */}
        <div className="">
          <img
            src={`${storageUrl}/Multimedia/Imagen/Ccd/Logos/CCDLOGOWHITE.png`}
            alt="CCD Logo"
            className="w-32 mb-4"
          />
          <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3">
              <img src={icon.mobilphone} className="text-sm w-4"/>
              +51 01 3083619
            </li>
            <li className="flex items-center gap-3">
            <img src={icon.iphone} className="text-sm w-4"/>
              +51 01 3083619
            </li>
            <li className="flex items-center gap-3">
            <img src={icon.message} className="text-sm w-4"/>
              info@ccdcapacitacion.edu.pe
            </li>
            <li className="flex items-center gap-3">
            <img src={icon.map} className="text-sm w-4"/>
              Av. Rivera Navarrete 762, San Isidro, Lima, Perú
            </li>
          </ul>
        </div>

        {/* Columna 2: Programas */}
        <div>
          <h4 className="text-colors-cyan-ccd text-xl font-semibold mb-4">Programas</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Especializaciones en vivo
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Especializaciones asincronas
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Cursos asincronos
              </Link>
            </li>
          </ul>
          <h4 className="text-colors-cyan-ccd text-xl font-semibold my-4">Sobre CCD</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Cursos asincronos
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Corporativo */}
        <div>
          <h4 className="text-colors-cyan-ccd text-xl font-semibold mb-4">Corporativo</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-colors-cyan-ccd" />
              +51 995 377 509
            </li>
            <li>
              <Link href="mailto:corporativo@ccdcapacitacion.com" className="hover:underline">
                corporativo@ccdcapacitacion.com
              </Link>
            </li>
          </ul>
          <h4 className="text-colors-cyan-ccd text-xl font-semibold my-4">Síguenos</h4>
          <Link href="/https://www.facebook.com/ccd.capacitacion">Facebook</Link>
          <span className="mx-2">|</span>
          <Link href="/">Youtube</Link>
          <span className="mx-2">|</span>
          <Link href="/https://www.linkedin.com/company/centro-de-capacitaci%C3%B3n-y-desarrollo-ccd/">LinkedIn</Link>
          <span className="mx-2">|</span>
          <Link href="/https://www.instagram.com/ccd.capacitacion">Instagram</Link>
          <span className="mx-2">|</span>
          <Link href="/https://www.tiktok.com/@ccd.capacitacion">Tiktok</Link>
        </div>

        {/* Columna 4: Más */}
        <div>
          <h4 className="text-colors-cyan-ccd text-xl font-semibold mb-4">Más</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Verificar certificado
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Masterclass gratuitas
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Libro de reclamaciones
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Políticas de privacidad
              </Link>
            </li>
          </ul>          
        </div>
       
      </div>
    </footer>
    </>
  );
};

export default Footer;
