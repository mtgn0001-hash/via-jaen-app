/** @type {import('next').NextConfig} */
const nextConfig = {
  // Forzamos un directorio de construcción distinto para evitar conflictos con la caché corrupta
  distDir: '.next_dev',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['wav'],
};

export default nextConfig;