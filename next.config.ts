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
        source: "/QA/kazokusou_1",
        destination: "/column/kazokusou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_1/",
        destination: "/column/kazokusou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_2",
        destination: "/column/ichinichi-sou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_2/",
        destination: "/column/ichinichi-sou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_3",
        destination: "/column/kazokusou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_3/",
        destination: "/column/kazokusou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_4",
        destination: "/column/fuhou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_4/",
        destination: "/column/fuhou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_7",
        destination: "/column/sougidai/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_7/",
        destination: "/column/sougidai/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_8",
        destination: "/column/sougi_flow/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_8/",
        destination: "/column/sougi_flow/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_9",
        destination: "/column/hiyou/",
        permanent: true,
      },
      {
        source: "/QA/kazokusou_9/",
        destination: "/column/hiyou/",
        permanent: true,
      },
      {
        source: "/QA/chokusou_1",
        destination: "/plan/direct-funeral/",
        permanent: true,
      },
      {
        source: "/QA/chokusou_1/",
        destination: "/plan/direct-funeral/",
        permanent: true,
      },
      {
        source: "/QA/flow",
        destination: "/column/sougi_flow/",
        permanent: true,
      },
      {
        source: "/QA/flow/",
        destination: "/column/sougi_flow/",
        permanent: true,
      },
      {
        source: "/QA/mosyu_1",
        destination: "/column/mosyu/",
        permanent: true,
      },
      {
        source: "/QA/mosyu_1/",
        destination: "/column/mosyu/",
        permanent: true,
      },
      {
        source: "/QA/mosyu_2",
        destination: "/column/mosyu/",
        permanent: true,
      },
      {
        source: "/QA/mosyu_2/",
        destination: "/column/mosyu/",
        permanent: true,
      },
      {
        source: "/QA/yukan",
        destination: "/column/yukan/",
        permanent: true,
      },
      {
        source: "/QA/yukan/",
        destination: "/column/yukan/",
        permanent: true,
      },
      {
        source: "/QA/info-1",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/QA/info-1/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/8xhJXcZx",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/8xhJXcZx/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/RKDapyrF",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/RKDapyrF/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/SmrhNZZl",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/SmrhNZZl/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/v6jFx5md",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/v6jFx5md/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/sougimade",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/sougimade/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/kP-rSeSF",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/kP-rSeSF/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/eH0hUogJ",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/eH0hUogJ/",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/Column_list/:slug*",
        destination: "/column/:slug*",
        permanent: true,
      },
      {
        source: "/QA/:slug*",
        destination: "/column/",
        permanent: true,
      },
      {
        source: "/kawaguchishi-megurinomori",
        destination: "/saijo/megurinomori/",
        permanent: true,
      },
      {
        source: "/kawaguchishi-megurinomori/",
        destination: "/saijo/megurinomori/",
        permanent: true,
      },
      {
        source: "/chokusou",
        destination: "/plan/direct-funeral/",
        permanent: true,
      },
      {
        source: "/chokusou/",
        destination: "/plan/direct-funeral/",
        permanent: true,
      },
      {
        source: "/kazoku_sou",
        destination: "/plan/family-funeral/",
        permanent: true,
      },
      {
        source: "/kazoku_sou/",
        destination: "/plan/family-funeral/",
        permanent: true,
      },
      {
        source: "/shimin_sou",
        destination: "/plan/kawaguchi-shimin/",
        permanent: true,
      },
      {
        source: "/shimin_sou/",
        destination: "/plan/kawaguchi-shimin/",
        permanent: true,
      },
      {
        source: "/kawaguchi_hall",
        destination: "/hall/kawaguchi-memorial-hall/",
        permanent: true,
      },
      {
        source: "/kawaguchi_hall/",
        destination: "/hall/kawaguchi-memorial-hall/",
        permanent: true,
      },
      {
        source: "/kawaguchi/hall",
        destination: "/hall/kawaguchi-memorial-hall/",
        permanent: true,
      },
      {
        source: "/kawaguchi/hall/",
        destination: "/hall/kawaguchi-memorial-hall/",
        permanent: true,
      },
      {
        source: "/kawaguchi/main",
        destination: "/area/kawaguchi/",
        permanent: true,
      },
      {
        source: "/kawaguchi/main/",
        destination: "/area/kawaguchi/",
        permanent: true,
      },
      {
        source: "/toda-sousaijyo",
        destination: "/saijo/toda-sousaijyo/",
        permanent: true,
      },
      {
        source: "/toda-sousaijyo/",
        destination: "/saijo/toda-sousaijyo/",
        permanent: true,
      },
      {
        source: "/toda",
        destination: "/saijo/toda-sousaijyo/",
        permanent: true,
      },
      {
        source: "/toda/",
        destination: "/saijo/toda-sousaijyo/",
        permanent: true,
      },
      {
        source: "/kasou_sikijou",
        destination: "/area/kawaguchi/",
        permanent: true,
      },
      {
        source: "/kasou_sikijou/",
        destination: "/area/kawaguchi/",
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
