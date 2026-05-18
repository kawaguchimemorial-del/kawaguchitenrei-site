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
      {
        source: "/case/20-oneday-memorial-hall",
        destination: "/case/kawaguchi-memorial-buddhist-20-oneday-1100k",
        permanent: true,
      },
      {
        source: "/case/5-cremation-megurinomori",
        destination: "/case",
        permanent: true,
      },
      {
        source: "/case/30-family-funeral-memorial-hall",
        destination: "/case/kawaguchi-memorial-buddhist-20-family-1100k",
        permanent: true,
      },
      {
        source: "/case/8-direct-funeral-home-placement",
        destination: "/case/home-buddhist-10-oneday-1600k",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
