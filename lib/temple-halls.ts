/**
 * 川口市内の寺院会館・民営式場。
 * `/saijo/` と広告LP `/lp/` の両方で使うため、データはこの1か所で持つ。
 * 掲載施設はいずれも川口典礼が運営する施設ではない（表示側で必ず注記する）。
 */
export type TempleHall = {
  name: string;
  address: string;
  parking: string;
  capacity: string;
  feeNote: string;
};

export type AreaLink = {
  label: string;
  href: string;
};

export type TempleHallArea = {
  id: string;
  groupName: string;
  description: string;
  halls: TempleHall[];
  areaLinks: AreaLink[];
};

export const templeHallAreas: TempleHallArea[] = [
  {
    id: "asahi-minami-hatogaya",
    groupName: "朝日・南鳩ヶ谷方面",
    description:
      "川口市朝日・南鳩ヶ谷・三ツ和エリアの寺院会館。南鳩ヶ谷駅周辺からアクセスしやすく、地域に根ざしたお別れに向いています。「朝日 葬儀場」「南鳩ヶ谷 葬儀場」をお探しの方の選択肢となります。",
    halls: [
      {
        name: "薬林寺会館",
        address: "埼玉県川口市朝日1-4-33",
        parking: "約70台",
        capacity: "着席80名 / 会葬150名",
        feeNote: "250,000円",
      },
      {
        name: "実正寺 弘法館",
        address: "埼玉県川口市南鳩ヶ谷3-15-14",
        parking: "約30台",
        capacity: "ご相談時に確認",
        feeNote: "100,000円〜",
      },
      {
        name: "源永寺会館",
        address: "埼玉県川口市三ツ和2-19-7",
        parking: "約50台",
        capacity: "着席80名",
        feeNote: "250,000円",
      },
    ],
    areaLinks: [
      { label: "南鳩ヶ谷の葬儀・家族葬", href: "/area/minami-hatogaya/" },
      { label: "鳩ヶ谷の葬儀・家族葬", href: "/area/hatogaya/" },
    ],
  },
  {
    id: "honcho-funado",
    groupName: "本町・舟戸町方面",
    description:
      "川口駅西側・本町・舟戸町エリアの寺院会館。川口駅周辺に位置し、参列者が集まりやすい立地です。「本町 葬儀場」「川口駅 葬儀場」をお探しの方の選択肢となります。",
    halls: [
      {
        name: "錫杖寺",
        address: "埼玉県川口市本町2-4-37",
        parking: "約15台",
        capacity: "着席100名",
        feeNote: "確認のうえご案内します",
      },
      {
        name: "善光寺",
        address: "埼玉県川口市舟戸町1-29",
        parking: "約50台",
        capacity: "着席50名",
        feeNote: "250,000円",
      },
      {
        name: "明王会館",
        address: "埼玉県川口市本町3-3-17",
        parking: "ご相談時に確認",
        capacity: "100席",
        feeNote: "150,000円",
      },
    ],
    areaLinks: [
      { label: "川口駅周辺の葬儀・家族葬", href: "/area/kawaguchi-ekimae/" },
    ],
  },
  {
    id: "motogo-ryoke",
    groupName: "元郷・領家方面",
    description:
      "川口市元郷・領家エリアの寺院会館。川口駅・川口元郷駅から利用しやすい立地で、家族葬から一般葬まで対応しやすい規模感の式場があります。",
    halls: [
      {
        name: "随泉寺会館",
        address: "埼玉県川口市元郷3-4-17",
        parking: "約20台",
        capacity: "着席100名",
        feeNote: "50,000円〜100,000円",
      },
      {
        name: "実相寺会館 鷲峰殿",
        address: "埼玉県川口市領家2-14-11",
        parking: "約80台",
        capacity: "80席",
        feeNote: "1日葬 120,000円 / 2日葬 200,000円",
      },
    ],
    areaLinks: [
      { label: "川口元郷の葬儀・家族葬", href: "/area/kawaguchi-motogo/" },
    ],
  },
  {
    id: "kamiaoki-aoki",
    groupName: "上青木・青木方面",
    description:
      "川口駅東側・上青木・青木エリアの寺院会館。地域に根ざした寺院に併設され、家族葬・一日葬に向いた規模感です。「上青木 葬儀場」「青木 葬儀場」をお探しの方の選択肢となります。",
    halls: [
      {
        name: "専称寺会館 迎了殿",
        address: "埼玉県川口市上青木5-3-43",
        parking: "約30台",
        capacity: "着席50名",
        feeNote: "200,000円",
      },
      {
        name: "龍泉寺 清龍会館",
        address: "埼玉県川口市青木5-5-36",
        parking: "約30台",
        capacity: "60席程度",
        feeNote: "170,000円",
      },
    ],
    areaLinks: [
      { label: "上青木の葬儀・家族葬", href: "/area/kamiaoki/" },
      { label: "青木の葬儀・家族葬", href: "/area/aoki/" },
    ],
  },
  {
    id: "edobukuro-shinbori",
    groupName: "江戸袋・新堀方面",
    description:
      "川口市東部・江戸袋・新堀エリアの寺院会館。新郷・神根寄りの落ち着いた立地で、家族葬を中心としたお別れに向いています。「新郷 葬儀場」をお探しの方にも選択肢となります。",
    halls: [
      {
        name: "東光院会館",
        address: "埼玉県川口市江戸袋1-20-32",
        parking: "ご相談時に確認",
        capacity: "ご相談時に確認",
        feeNote: "確認のうえご案内します",
      },
      {
        name: "正源寺会館",
        address: "埼玉県川口市新堀933-4",
        parking: "約40台",
        capacity: "着席40名程度",
        feeNote: "150,000円",
      },
    ],
    areaLinks: [
      { label: "新郷の葬儀・家族葬", href: "/area/shingo/" },
      { label: "神根の葬儀・家族葬", href: "/area/kamine/" },
    ],
  },
  {
    id: "angyo-tozuka-angyo",
    groupName: "安行・戸塚安行方面",
    description:
      "川口市東部・安行・戸塚安行エリアの寺院会館。駐車場が比較的広く、参列者の多いお別れにも対応しやすい規模感の式場があります。「安行 葬儀場」「戸塚安行 葬儀場」をお探しの方の選択肢となります。",
    halls: [
      {
        name: "密蔵院 松雲",
        address: "埼玉県川口市安行原2008",
        parking: "約200台",
        capacity: "着席150席",
        feeNote: "1日葬 100,000円 / 2日葬 170,000円",
      },
      {
        name: "新隆寺 法要殿 観音堂",
        address: "埼玉県川口市安行出羽4-5-18",
        parking: "あり",
        capacity: "20〜200名",
        feeNote: "1日葬 110,000円前後 / 2日葬 165,000円前後",
      },
    ],
    areaLinks: [
      { label: "安行の葬儀・家族葬", href: "/area/angyo/" },
      { label: "戸塚安行の葬儀・家族葬", href: "/area/tozuka-angyo/" },
    ],
  },
  {
    id: "hagimatsu-shingo-sashima",
    groupName: "榛松・新郷・差間方面",
    description:
      "川口市東端・東川口寄りエリアの寺院会館・民営式場。榛松・差間は東川口駅からのアクセスも考えやすく、新郷エリア寄りのお別れに向いています。「東川口 葬儀場」「新郷 葬儀場」をお探しの方の選択肢となります。",
    halls: [
      {
        name: "東礼川口",
        address: "埼玉県川口市榛松1980-1",
        parking: "ご相談時に確認",
        capacity: "ご相談時に確認",
        feeNote: "110,000円",
      },
      {
        name: "興照寺センゲンホール",
        address: "埼玉県川口市差間2-13-5",
        parking: "ご相談時に確認",
        capacity: "ご相談時に確認",
        feeNote: "150,000円",
      },
    ],
    areaLinks: [
      { label: "新郷の葬儀・家族葬", href: "/area/shingo/" },
      { label: "東川口の葬儀・家族葬", href: "/area/higashikawaguchi/" },
    ],
  },
];
