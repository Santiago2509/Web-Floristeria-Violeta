import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las fuentes del catálogo PDF se leen del disco en el servidor
  outputFileTracingIncludes: {
    '/catalogo/pdf': ['./lib/pdf/fonts/**/*'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default nextConfig;
