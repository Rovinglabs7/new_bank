import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/bond.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/BOND_files/BOND.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/ramp-lottie/assets/:path*",
          destination: "https://assets.ramp.com/:path*",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/:path(framer-styles.css|framer-body.html)",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
