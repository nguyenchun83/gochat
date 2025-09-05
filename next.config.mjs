/** @type {import('next').NextConfig} */
const nextConfig = {
  // Opsi untuk menonaktifkan Turbopack
  experimental: {
    // Memaksa Next.js untuk menggunakan SWC
    forceSwcTransforms: true,
  },
};

// Ganti baris ini
// module.exports = nextConfig;

// Dengan ini
export default nextConfig;
