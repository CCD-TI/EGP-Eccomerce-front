import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export", // Comentado para evitar problemas con PWA
  trailingSlash: true,
  images: {
    domains: [
      'pub-3d37c601c64a44ff8ec0a62bc03016eb.r2.dev', // Primer dominio
      'pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev', // Segundo dominio
      // Puedes agregar más dominios aquí
    ],
  },
};

export default withPWA({
  dest: "public", // Directorio de salida para los archivos PWA
  register: true, // Registrar el manifest automáticamente
  // Otras opciones de configuración PWA
})(nextConfig);