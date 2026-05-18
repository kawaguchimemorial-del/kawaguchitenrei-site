import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/questionnaire",
        destination: "/column",
        permanent: true,
      },
      {
        source: "/questionnaire/:slug*",
        destination: "/column/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
