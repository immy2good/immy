/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep the file trace. Excluding every file drops the Next.js server runtime
  // from Vercel functions, so server actions and API routes answer with a bare 500.
  experimental: {
    disableOptimizedLoading: true,
  },
};

export default nextConfig;
