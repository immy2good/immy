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
  // Disable tracing to avoid permission errors
  outputFileTracingExcludes: {
    "*": ["**/*"],
  },
  experimental: {
    disableOptimizedLoading: true,
  },
};

export default nextConfig;
