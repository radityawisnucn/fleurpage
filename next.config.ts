/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack temporarily to resolve issues
  // We'll use the standard Next.js compiler instead
  compiler: {
    styledComponents: true,
  },
  // Enable better error reporting
  webpack(config: any) {
    return config;
  }
};

export default nextConfig;
