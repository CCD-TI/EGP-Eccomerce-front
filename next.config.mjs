import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  //output:"export",
  trailingSlash: true,
  images: {
    domains: ['pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev'],
  },
};

export default withPWA({
  dest: "public", // Default output directory for generated PWA assets
  register: true, // Register manifest automatically (recommended)

  // Add other PWA configuration options as needed (see below)
})(nextConfig);
