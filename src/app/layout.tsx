import "./globals.css";
import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/provider/provider";
import Script from "next/script";
import { environment } from "@/environments/environment";
import { GoogleTagManager } from '@next/third-parties/google'


export const metadata: Metadata = {
  // Título y descripción general del sitio para mostrar en resultados de búsqueda
  title: {
    template: "%s - Centro de Capacitación y Desarrollo CCD",
    default: "Inicio",
  },
  description:
    "Centro de Capacitación y Desarrollo - Ofrecemos programas de capacitación en derecho, ingeniería, y gestión pública. Formación continua para profesionales a nivel internacional.",
  // Palabras clave para mejorar el SEO
  keywords: [
    "Centro de Capacitación",
    "Desarrollo profesional",
    "Cursos en Perú",
    "Formación continua",
    "Capacitación en derecho",
    "Ingeniería",
    "Gestión pública",
  ],
  // Configuración de Open Graph para redes sociales
  openGraph: {
    title: "Centro de Capacitación y Desarrollo CCD",
    description:
      "Descubre programas de formación continua y capacitación profesional en Perú.",
    url: "https://www.ccdcapacitacion.edu.pe",
    siteName: "Centro de Capacitación y Desarrollo CCD",
    images: [
      {
        url:
          environment.baseUrlStorage +
          "/Multimedia/Imagen/Ccd/Logos/LogoCCD.png", // Actualiza con la URL de tu imagen
        width: 1200,
        height: 630,
        alt: "Centro de Capacitación y Desarrollo",
      },
    ],
    locale: "es_PE", // Lenguaje y región (español para Perú)
    type: "website",
  },
  // Configuración para Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@CCD", // Cambia a la cuenta de Twitter si tienes una
    title: "Centro de Capacitación y Desarrollo CCD",
    description:
      "Ofrecemos capacitación profesional en derecho, ingeniería y gestión pública en Perú.",
    images:
      environment.baseUrlStorage + "/Multimedia/Imagen/Ccd/Logos/LogoCCD.png", // Mismo enlace que Open Graph
  },
  // Robots para controlar la indexación y el seguimiento
  robots: {
    index: true, // Permite que los motores de búsqueda indexen la página
    follow: true, // Permite que sigan los enlaces en la página
  },
  // Definir el publicador
  publisher: "Centro de Capacitación y Desarrollo CCD",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const googletk: string = environment.googletoken;
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '572641148664209'); // Insert your pixel ID here.
            fbq('track', 'PageView');
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(a,m,o,c,r,m){
              a[m] = {
                id: "1027653",
                hash: "8bd968458cff72ccb4028dfdb991dc397e160155ae95d086d970c2e73bdfbbb5",
                locale: "es",
                setMeta: function(p) {
                  this.params = (this.params || []).concat([p]);
                }
              };
              a[o] = a[o] || function() {
                (a[o].q = a[o].q || []).push(arguments);
              };
              var d = a.document,
                  s = d.createElement('script');
              s.async = true;
              s.id = m + '_script';
              s.src = 'https://static.elfsight.com/platform/platform.js';
              s.onload = function() {
                const button = document.getElementById('crm_plugin_button');
                if (button) {
                  button.style.zIndex = '9999';
                  button.style.position = 'fixed';
                }
              };
              d.head && d.head.appendChild(s);
            })(window, 0, 'crmPlugin', 0, 0, 'crm_plugin');
          `,
          }}
        />

        <script
          src="https://static.elfsight.com/platform/platform.js"
          async
        ></script>

        <script
          src="https://source.zoom.us/3.1.6/lib/vendor/lodash.min.js"
          async
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=572641148664209&ev=PageView&noscript=1"
          />
        </noscript>
        <link
          rel="icon"
          href={
            environment.baseUrlStorage +
            "/Multimedia/Imagen/Ccd/Logos/LogoCCD.png"
          }
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://api.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon-reset.css"
        />
        <Script src="https://api.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js"></Script>

        {/* Google Tag (gtag.js) */}
        {/* <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11095668623"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11095668623');
          `}
        </Script> */}

        {/* Google Analitics 2025 */}
        {/* <!-- Google tag (gtag.js) --> */}
        {/* <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P1R9JJ38NW"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-P1R9JJ38NW');
  `}
        </Script> */}
      </head>
      <body className={"font-sans custom-scrollbar"}>
        <Providers>
        <GoogleTagManager gtmId={googletk} />
          {children}</Providers>
      </body>
    </html>
  );
}
