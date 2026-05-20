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
        source: "/Column_list/sougi_納得",
        destination: "/column/sougi_nattoku/",
        permanent: true,
      },
      {
        source: "/Column_list/sougi_%E7%B4%8D%E5%BE%97",
        destination: "/column/sougi_nattoku/",
        permanent: true,
      },
      {
        source: "/column/6cm52Rik",
        destination: "/column/seshu-moshu/",
        permanent: true,
      },
      {
        source: "/column/6cm52Rik/",
        destination: "/column/seshu-moshu/",
        permanent: true,
      },
      {
        source: "/Column_list/6cm52Rik",
        destination: "/column/seshu-moshu/",
        permanent: true,
      },
      {
        source: "/Column_list/6cm52Rik/",
        destination: "/column/seshu-moshu/",
        permanent: true,
      },
      {
        source: "/column/s_njTeQ9",
        destination: "/column/chokusou-fukusou/",
        permanent: true,
      },
      {
        source: "/column/s_njTeQ9/",
        destination: "/column/chokusou-fukusou/",
        permanent: true,
      },
      {
        source: "/Column_list/s_njTeQ9",
        destination: "/column/chokusou-fukusou/",
        permanent: true,
      },
      {
        source: "/Column_list/s_njTeQ9/",
        destination: "/column/chokusou-fukusou/",
        permanent: true,
      },
      {
        source: "/column/xGsLB4Wb",
        destination: "/column/ichinichi-sou/",
        permanent: true,
      },
      {
        source: "/column/xGsLB4Wb/",
        destination: "/column/ichinichi-sou/",
        permanent: true,
      },
      {
        source: "/Column_list/xGsLB4Wb",
        destination: "/column/ichinichi-sou/",
        permanent: true,
      },
      {
        source: "/Column_list/xGsLB4Wb/",
        destination: "/column/ichinichi-sou/",
        permanent: true,
      },
      {
        source: "/column/C0IHfdrz",
        destination: "/column/bukkyou-shuha-13/",
        permanent: true,
      },
      {
        source: "/column/C0IHfdrz/",
        destination: "/column/bukkyou-shuha-13/",
        permanent: true,
      },
      {
        source: "/Column_list/C0IHfdrz",
        destination: "/column/bukkyou-shuha-13/",
        permanent: true,
      },
      {
        source: "/Column_list/C0IHfdrz/",
        destination: "/column/bukkyou-shuha-13/",
        permanent: true,
      },
      {
        source: "/column/DDK0uG6r",
        destination: "/column/mushukyo-sou/",
        permanent: true,
      },
      {
        source: "/column/DDK0uG6r/",
        destination: "/column/mushukyo-sou/",
        permanent: true,
      },
      {
        source: "/Column_list/DDK0uG6r",
        destination: "/column/mushukyo-sou/",
        permanent: true,
      },
      {
        source: "/Column_list/DDK0uG6r/",
        destination: "/column/mushukyo-sou/",
        permanent: true,
      },
      {
        source: "/column/VWorrTRf",
        destination: "/column/jitakusou-merit/",
        permanent: true,
      },
      {
        source: "/column/VWorrTRf/",
        destination: "/column/jitakusou-merit/",
        permanent: true,
      },
      {
        source: "/Column_list/VWorrTRf",
        destination: "/column/jitakusou-merit/",
        permanent: true,
      },
      {
        source: "/Column_list/VWorrTRf/",
        destination: "/column/jitakusou-merit/",
        permanent: true,
      },
      {
        source: "/column/5w7LS4x1",
        destination: "/column/sousai-fujo/",
        permanent: true,
      },
      {
        source: "/column/5w7LS4x1/",
        destination: "/column/sousai-fujo/",
        permanent: true,
      },
      {
        source: "/Column_list/5w7LS4x1",
        destination: "/column/sousai-fujo/",
        permanent: true,
      },
      {
        source: "/Column_list/5w7LS4x1/",
        destination: "/column/sousai-fujo/",
        permanent: true,
      },
      {
        source: "/column/xK_jXyB6",
        destination: "/column/kenshi-nagare/",
        permanent: true,
      },
      {
        source: "/column/xK_jXyB6/",
        destination: "/column/kenshi-nagare/",
        permanent: true,
      },
      {
        source: "/Column_list/xK_jXyB6",
        destination: "/column/kenshi-nagare/",
        permanent: true,
      },
      {
        source: "/Column_list/xK_jXyB6/",
        destination: "/column/kenshi-nagare/",
        permanent: true,
      },
      {
        source: "/Column_list/:slug*",
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
