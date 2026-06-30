import type { NextConfig } from "next";

const FRAMER_CDN =
  "https://framerusercontent.com/sites/19kzo8dGYb5BnoFgUMccnz";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/favicon.ico",
          destination:
            "https://framerusercontent.com/images/FcrIXzrRYpAhh1hF1bPqjca57E.png",
        },
      ],
      // Local public/BOND_files wins first; missing Framer JS modules load from CDN
      afterFiles: [
        {
          source: "/BOND_files/:path*",
          destination: `${FRAMER_CDN}/:path*`,
        },
      ],
      // Framer client-side routes all need the same HTML shell
      fallback: [
        { source: "/", destination: "/index.html" },
        {
          source:
            "/:path((?!_next/|BOND_files/|favicon\\.ico$|index\\.html$|bond\\.html$).+)",
          destination: "/index.html",
        },
      ],
    };
  },
  async headers() {
    const js = { key: "Content-Type", value: "application/javascript; charset=utf-8" };

    return [
      { source: "/BOND_files/:path*.mjs", headers: [js] },
      { source: "/BOND_files/:path*.js.gz", headers: [js] },
      { source: "/BOND_files/:path*.js.download", headers: [js] },
      { source: "/BOND_files/script", headers: [js] },
      {
        source: "/:path(index.html|bond.html)",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
      {
        source: "/BOND_files/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
