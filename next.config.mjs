/** @type {import('next').NextConfig} */
const nextConfig = {
  // No ESLint setup in this repo. TypeScript errors do fail the build.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep the file trace. Excluding every file drops the Next.js server runtime
  // from Vercel functions, so server actions and API routes answer with a bare 500.
  experimental: {
    disableOptimizedLoading: true,
  },
  // The case studies started as static HTML files; keep their old links working.
  async redirects() {
    return [
      { source: "/case-studies", destination: "/#work", permanent: false },
      ...["licensing", "confluence-pack", "agent-workflow"].map((slug) => ({
        source: `/case-studies/${slug}.html`,
        destination: `/case-studies/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
