export type CremationFeeRow = {
  category: string;
  resident: string;
  nonResident: string;
};

export type CremationFees = {
  heading: string;
  lead: string;
  rows: CremationFeeRow[];
  footnote: string;
  changeNotice: string;
};

export type FeeTable = {
  heading: string;
  lead?: string;
  columns: string[];
  noteHeader?: string;
  rows: { category: string; values: string[]; note?: string }[];
  footnote?: string;
  footnotes?: string[];
};

export type CremationFurnace = {
  name: string;
  description?: string;
  image: { src: string; alt: string };
};

export type CremationWaitingRoom = {
  name: string;
  capacity: string;
  image: { src: string; alt: string };
};

export type HallRoom = {
  slug: string;
  name: string;
  location: string;
  feeNote?: string;
  description?: string;
  image: { src: string; alt: string };
  detailHref?: string;
};

export type Saijo = {
  slug: string;
  name: string;
  shortName: string;
  type: string;
  operator: string;
  postal?: string;
  address: string;
  intro: string;
  description: string;
  features: string[];
  ourSupport: string[];
  availablePlans: string[];
  facilityInfo: { label: string; value: string }[];
  access: {
    fromKawaguchi: string;
    stations: string[];
    car: string;
    parking: string;
  };
  faqs: { q: string; a: string }[];
  mapEmbedQuery: string;
  metaDescription: string;
  h1?: string;
  metaTitle?: string;
  importantNotice?: { heading: string; body: string };
  cremationFees?: CremationFees;
  photos?: { src: string; alt: string; label: string; caption: string }[];
  photosHeading?: string;
  photosLead?: string;
  photosFootnote?: string;
  flow?: { step: string; description: string }[];
  flowHeading?: string;
  flowLead?: string;
  availablePlansLabel?: string;
  availablePlansHeading?: string;
  availablePlansLead?: string;
  cremationFurnaces?: {
    heading: string;
    lead?: string;
    items: CremationFurnace[];
  };
  cremationWaitingRooms?: {
    heading: string;
    lead?: string;
    items: CremationWaitingRoom[];
    seatFeeNote?: string;
  };
  hallRooms?: {
    heading: string;
    lead?: string;
    items: HallRoom[];
  };
  feeTables?: FeeTable[];
  feeTablesNote?: string;
};

export const saijoMegurinomori: Saijo = {
  slug: "megurinomori",
  name: "川口市めぐりの森",
  shortName: "めぐりの森",
  type: "川口市の火葬場",
  operator: "株式会社 川口斎苑サービス",
  postal: "333-0826",
  address: "埼玉県川口市大字新井宿430-1",
  h1: "川口市めぐりの森（火葬場）での\n葬儀・火葬のご相談",
  metaTitle:
    "川口市めぐりの森（火葬場） | 川口市の葬儀・家族葬・直葬 | 川口典礼",
  intro:
    "川口市めぐりの森は、川口市営の火葬場です。通夜・告別式を行う葬儀式場は併設されていません。",
  description:
    "川口市の葬儀・家族葬・一日葬・直葬で川口市めぐりの森を利用する場合は、川口メモリアルホールなどの式場で葬儀式・お別れの時間を行い、その後、車で約5分の川口市めぐりの森へ移動して火葬を行う流れになります。川口典礼では、式場でのお別れから、川口市めぐりの森での火葬まで一貫してお手伝いします。",
  features: [
    "川口市の火葬場",
    "駐車場75台",
    "川口市民の市民葬制度に対応",
    "川口メモリアルホールから車で約5分",
    "ご家族中心のお見送りに適した、落ち着いた施設",
    "24時間365日、手配・搬送・式段取りまで川口典礼がサポート",
  ],
  ourSupport: [
    "川口メモリアルホールから、めぐりの森まで車で約5分",
    "直葬・花入れお別れ・一日葬・家族葬まで相談可能",
    "川口市民の市民葬制度にも対応",
    "火葬場予約、搬送、安置、式場準備までまとめて相談可能",
  ],
  availablePlans: [
    "direct-funeral",
    "hanaire-owakare",
    "oneday-funeral",
    "family-funeral",
    "kawaguchi-shimin",
  ],
  facilityInfo: [
    { label: "所在地", value: "〒333-0826 埼玉県川口市大字新井宿430-1" },
    { label: "運営", value: "株式会社 川口斎苑サービス" },
    { label: "電話", value: "048-242-5414（代）" },
    { label: "FAX", value: "048-242-5415" },
    { label: "施設種別", value: "火葬場" },
    {
      label: "葬儀式場の併設",
      value: "なし(通夜・告別式を行う式場は併設されていません)",
    },
    { label: "駐車場", value: "75台(火葬施設をご利用の方のみ)" },
    { label: "川口典礼から", value: "車で約5分" },
    {
      label: "問い合わせ・予約受付",
      value:
        "電話でのお問い合わせは17時まで(以降は翌日以降の対応となります)。ご予約はWebまたは音声ガイダンスにより24時間受付。",
    },
  ],
  access: {
    fromKawaguchi:
      "川口典礼(川口メモリアルホール・川口市西新井宿)から車で約5分",
    stations: ["埼玉高速鉄道「新井宿」駅より徒歩15分"],
    car: "首都高速川口線脇の県道239号沿いで、上り路線からのみ進入できます。首都高川口PAやイイナパーク川口からは入場できません。カーナビでは別の場所が表示される場合があるため、車両向けの地図でご確認のうえ、ご不明な場合は事前にお問い合わせください。",
    parking:
      "75台。火葬施設をご利用の方のみご利用いただけます。イイナパーク川口にお越しの方は、公園側駐車場をご利用ください。",
  },
  importantNotice: {
    heading: "めぐりの森は火葬場です。葬儀式は別会場で行います。",
    body: "川口市めぐりの森は火葬を行う施設であり、通夜・告別式を行う葬儀式場は併設されていません。葬儀式やお別れの時間は、川口メモリアルホールなどの式場で行い、その後、めぐりの森へ移動して火葬を行う流れになります。葬儀式やお別れの場所の手配、火葬予約、ご搬送、ご安置、当日の移動まで、川口典礼へご相談いただけます。",
  },
  cremationFees: {
    heading: "川口市めぐりの森の火葬料金",
    lead: "川口市めぐりの森の火葬料金は、市内居住者と市外居住者で異なります。",
    rows: [
      {
        category: "大人(12歳以上)",
        resident: "30,000円",
        nonResident: "100,000円",
      },
      {
        category: "子供(12歳未満)",
        resident: "15,000円",
        nonResident: "50,000円",
      },
      {
        category: "妊娠4ヶ月以上の胎児",
        resident: "15,000円",
        nonResident: "50,000円",
      },
      {
        category: "妊娠4ヶ月未満の胎児",
        resident: "7,500円",
        nonResident: "25,000円",
      },
      {
        category: "改葬遺骨",
        resident: "7,500円",
        nonResident: "25,000円",
      },
      {
        category: "身体の一部",
        resident: "7,500円",
        nonResident: "25,000円",
      },
    ],
    footnote:
      "火葬料金のほか、葬儀内容により搬送費、安置料、骨壺、ドライアイス、式場使用料、宗教者費用などが別途必要になる場合があります。総額がわかるお見積りをご希望の方は、川口典礼までお気軽にご相談ください。",
    changeNotice:
      "料金は変更になる場合があります。詳しくはご相談時にご確認ください。",
  },
  faqs: [
    {
      q: "川口市めぐりの森で通夜・告別式はできますか？",
      a: "いいえ。川口市めぐりの森は火葬を行う施設で、通夜・告別式を行う式場は併設されていません。葬儀式やお別れの時間は川口メモリアルホールなどの式場で行い、その後、めぐりの森へ移動して火葬を行う流れになります。",
    },
    {
      q: "川口市めぐりの森はどのような施設ですか？",
      a: "川口市が整備した火葬場です。火葬、待合、収骨などを行う施設で、葬儀式場ではありません。",
    },
    {
      q: "川口メモリアルホールから川口市めぐりの森までどのくらいですか？",
      a: "車で約5分です。葬儀式後の移動負担を抑えやすい距離で、ご親族のご負担も軽減できます。",
    },
    {
      q: "川口市めぐりの森を利用した家族葬や一日葬は相談できますか？",
      a: "はい。葬儀式やお別れの時間を川口メモリアルホールなどで行い、その後、川口市めぐりの森で火葬を行う流れでご相談いただけます。家族葬・一日葬の段取りから当日の移動まで、川口典礼が一貫してお手伝いします。",
    },
    {
      q: "川口市で火葬式や直葬を相談できますか？",
      a: "はい。火葬式と呼ばれる、宗教儀礼を行わずシンプルにお見送りする形式は、直葬プランや花入れお別れプランとしてご相談いただけます。ご家族の状況に合わせて、必要な手配を整えます。",
    },
    {
      q: "川口市民でなくても利用できますか？",
      a: "ご利用いただけます。川口市民の方と市外の方で火葬料金が異なります。詳しい料金は事前のご相談時にご案内します。",
    },
    {
      q: "市民葬制度は使えますか？",
      a: "川口市民の方の市民葬制度にも対応しています。プラン詳細は事前のご相談でご案内します。",
    },
  ],
  mapEmbedQuery: "埼玉県川口市大字新井宿430-1 川口市めぐりの森",
  metaDescription:
    "川口市めぐりの森は川口市営の火葬場です。通夜・告別式を行う式場は併設されていません。川口典礼では、川口メモリアルホールでの家族葬・一日葬・直葬から、川口市めぐりの森での火葬まで一貫してお手伝いします。",
  photos: [
    {
      src: "/images/saijo/megurinomori/exterior.png",
      alt: "川口市めぐりの森の外観",
      label: "外観",
      caption: "川口市めぐりの森の外観です。",
    },
    {
      src: "/images/saijo/megurinomori/crematory.png",
      alt: "川口市めぐりの森の火葬炉",
      label: "火葬炉",
      caption: "火葬を行う設備です。",
    },
    {
      src: "/images/saijo/megurinomori/waiting-room.png",
      alt: "川口市めぐりの森の待合室",
      label: "待合室",
      caption: "火葬の間にお待ちいただく待合室です。",
    },
    {
      src: "/images/saijo/megurinomori/corridor.png",
      alt: "川口市めぐりの森の館内通路",
      label: "館内通路",
      caption: "館内の通路です。",
    },
  ],
  photosHeading: "川口市めぐりの森の施設写真。",
  photosLead:
    "外観・火葬炉・待合室・館内通路の写真です。火葬を行う施設で、通夜・告別式を行う式場は併設されていません。",
  photosFootnote:
    "川口市めぐりの森は火葬場です。通夜・告別式を行う式場は併設されていません。葬儀式やお別れの時間は川口メモリアルホールなどの式場で行い、その後、火葬を行う流れになります。",
  flow: [
    {
      step: "川口メモリアルホールなどで葬儀式・お別れ",
      description:
        "ご家族・ご親族で、お別れの時間をお取りいただきます。式場手配、宗教者のお勤め、お料理・返礼品の段取りも川口典礼でご手配します。",
    },
    {
      step: "川口市めぐりの森へ移動",
      description:
        "霊柩車・送迎車で、川口メモリアルホール(川口市西新井宿)から車で約5分の川口市めぐりの森へ移動します。",
    },
    {
      step: "川口市めぐりの森で火葬",
      description:
        "川口市めぐりの森の火葬炉で火葬を行います。火葬の間は待合室でお待ちいただきます。",
    },
    {
      step: "収骨",
      description: "火葬後、ご家族で収骨を行います。",
    },
  ],
  flowHeading: "川口市めぐりの森を利用する葬儀の流れ。",
  flowLead:
    "式場でのお別れの後、川口市めぐりの森で火葬を行う一般的な流れです。火葬場予約、ご搬送、ご安置、式場でのお別れ、火葬当日の移動まで、川口典礼が一貫してお手伝いします。",
  availablePlansLabel: "めぐりの森での火葬を含む葬儀プラン",
  availablePlansHeading: "めぐりの森での火葬を含む葬儀プラン。",
  availablePlansLead:
    "川口典礼では、川口メモリアルホールなどでのお別れ・葬儀式から、川口市めぐりの森での火葬まで、ご家族のご希望に合わせて一貫してお手伝いします。直葬プラン、花入れお別れプラン、一日葬プラン、家族葬プラン、市民葬プランなど、内容に応じてご相談いただけます。",
};

export const saijoTodaSousaijyo: Saijo = {
  slug: "toda-sousaijyo",
  name: "戸田葬祭場",
  shortName: "戸田葬祭場",
  type: "東京都板橋区の火葬場併設斎場",
  operator: "事前相談時にご案内",
  postal: "174-0041",
  address: "東京都板橋区舟渡四丁目15番1号",
  h1: "戸田葬祭場での\n葬儀・火葬のご相談",
  metaTitle: "戸田葬祭場 | 東京都板橋区の火葬場併設斎場 | 川口典礼",
  intro:
    "戸田葬祭場は、東京都板橋区にある火葬場併設の斎場です。光の間・せせらぎの間・思食の間の3式場と、特別殯館・特別室・最上等の火葬炉を備えています。",
  description:
    "川口典礼では、戸田葬祭場でのご葬儀・火葬の手配を承ります。式場利用のご相談、ご搬送、ご安置、火葬予約、当日の進行までサポートします。戸田葬祭場は川口典礼が運営している施設ではありません。",
  features: [
    "東京都板橋区舟渡の火葬場併設斎場",
    "本館3階「光の間」、本館4階「せせらぎの間」、別館「思食の間」の3式場",
    "特別殯館・特別室・最上等の3種の火葬炉",
    "香・華・光の3種の待合室と椅子席(予約席)",
    "JR埼京線「浮間舟渡」駅、都営三田線「西台」駅からアクセス可",
    "24時間365日、手配・搬送・式段取りまで川口典礼がサポート",
  ],
  ourSupport: [
    "戸田葬祭場での葬儀・火葬の手配・予約",
    "ご搬送・ご安置・式場利用のご相談",
    "直葬・花入れお別れ・一日葬・家族葬まで相談可能",
    "葬儀当日の進行・宗教者の手配までサポート",
  ],
  availablePlans: [
    "direct-funeral",
    "hanaire-owakare",
    "oneday-funeral",
    "family-funeral",
    "kawaguchi-shimin",
  ],
  facilityInfo: [
    {
      label: "所在地",
      value: "〒174-0041 東京都板橋区舟渡四丁目15番1号",
    },
    { label: "電話", value: "03-3966-4241" },
    { label: "運営", value: "事前相談時にご案内" },
    { label: "施設種別", value: "火葬場併設斎場" },
    {
      label: "式場",
      value: "光の間(本館3階)・せせらぎの間(本館4階)・思食の間(別館)",
    },
    { label: "火葬炉", value: "特別殯館・特別室・最上等" },
    {
      label: "待合室",
      value: "香(1〜5)・華(1〜10)・光(1〜6)・椅子席(予約席)",
    },
    {
      label: "川口典礼のサポート範囲",
      value:
        "葬儀の手配・ご搬送・ご安置・式場利用相談・火葬予約・当日の進行",
    },
  ],
  access: {
    fromKawaguchi:
      "ご搬送・送迎は川口典礼で手配いたします。事前のご相談時にご案内します。",
    stations: [
      "JR埼京線「浮間舟渡」駅より徒歩約25分(快速・通勤快速は通過、各駅停車をご利用ください)",
      "都営三田線「西台」駅 東口より徒歩約30分",
    ],
    car: "国際興業バス「舟渡小学校」バス停下車、徒歩約5〜10分。浮間舟渡駅東口からバス約5分(東練01・東練05系統)、西台駅東口からバス約5分(東練05・浮舟80系統)でもアクセスいただけます。",
    parking:
      "駐車場の利用可否・台数については施設へ事前にご確認ください。詳しい交通手段は事前相談時にご案内します。",
  },
  importantNotice: {
    heading: "戸田葬祭場の運営は川口典礼ではありません。",
    body: "戸田葬祭場は東京都板橋区舟渡にある火葬場併設の斎場で、川口典礼が運営している施設ではありません。川口典礼では、戸田葬祭場でのご葬儀の手配・ご搬送・ご安置・式場利用相談・火葬予約・当日の進行をサポートします。葬儀のご相談は川口典礼までお気軽にお問い合わせください。",
  },
  flow: [
    {
      step: "葬儀式・お別れの時間",
      description:
        "戸田葬祭場の式場(光の間・せせらぎの間・思食の間)、または別会場でお別れの時間をお取りいただきます。式場手配、宗教者のお勤め、お料理・返礼品の段取りも川口典礼でご手配します。",
    },
    {
      step: "火葬場へ移動",
      description:
        "戸田葬祭場は式場と火葬場が同じ施設内にあります。霊柩車・送迎車の手配も川口典礼で承ります。",
    },
    {
      step: "戸田葬祭場で火葬",
      description:
        "特別殯館・特別室・最上等の火葬炉から、ご希望や予算に応じてご案内します。火葬の間は待合室でお待ちいただきます。",
    },
    {
      step: "収骨",
      description: "火葬後、ご家族で収骨を行います。",
    },
  ],
  faqs: [
    {
      q: "戸田葬祭場は川口典礼が運営しているのですか？",
      a: "いいえ。戸田葬祭場は東京都板橋区舟渡にある火葬場併設の斎場で、川口典礼が運営している施設ではありません。川口典礼は、戸田葬祭場でのご葬儀の手配・ご搬送・ご安置・式場利用相談・火葬予約・当日の進行をサポートする立場です。",
    },
    {
      q: "戸田葬祭場での家族葬や一日葬は相談できますか？",
      a: "はい。戸田葬祭場の式場(光の間・せせらぎの間・思食の間)を利用したご葬儀の手配を承ります。家族葬・一日葬の段取りから当日の進行まで、川口典礼が一貫してお手伝いします。",
    },
    {
      q: "川口市から戸田葬祭場までのご搬送もお願いできますか？",
      a: "はい。ご自宅・病院・施設からのご搬送、ご安置、戸田葬祭場までの当日の移動まで、川口典礼が手配します。",
    },
    {
      q: "戸田葬祭場の最寄駅はどこですか？",
      a: "JR埼京線「浮間舟渡」駅より徒歩約25分、都営三田線「西台」駅東口より徒歩約30分です。浮間舟渡駅・西台駅からは国際興業バス(東練01・東練05・浮舟80)で「舟渡小学校」バス停まで約5分、そこから徒歩約5〜10分です。",
    },
    {
      q: "戸田葬祭場の料金は変わることがありますか？",
      a: "施設利用料・火葬料は変更される可能性があります。最新の料金は事前のご相談時にご案内しますので、川口典礼までお問い合わせください。",
    },
    {
      q: "戸田葬祭場の料金と、川口典礼の葬儀プラン料金は同じですか？",
      a: "別途必要です。戸田葬祭場の式場料金・火葬料金・待合室料金は施設利用料として支払いが必要です。川口典礼の葬儀プラン料金とは別途必要となるため、総額のお見積りは事前にご案内します。",
    },
  ],
  mapEmbedQuery: "戸田葬祭場 東京都板橋区舟渡四丁目15番1号",
  metaDescription:
    "戸田葬祭場は東京都板橋区舟渡の火葬場併設斎場です。光の間・せせらぎの間・思食の間の3式場と複数の火葬炉・待合室を備えます。川口典礼では戸田葬祭場でのご葬儀の手配・搬送・安置・火葬予約・当日の進行を一貫してサポートします。",
  photos: [
    {
      src: "/images/saijo/toda-sousaijyo/exterior.png",
      alt: "戸田葬祭場の外観",
      label: "外観",
      caption: "戸田葬祭場の外観です。",
    },
    {
      src: "/images/saijo/toda-sousaijyo/information-counter.png",
      alt: "戸田葬祭場の総合案内",
      label: "総合案内",
      caption: "施設の総合案内カウンターです。",
    },
    {
      src: "/images/saijo/toda-sousaijyo/lobby.png",
      alt: "戸田葬祭場のロビー",
      label: "ロビー",
      caption: "施設内のロビーです。",
    },
    {
      src: "/images/saijo/toda-sousaijyo/waiting-chair-seats.png",
      alt: "戸田葬祭場の椅子席(予約席)",
      label: "椅子席(予約席)",
      caption: "ご予約いただける椅子席です。",
    },
  ],
  photosHeading: "戸田葬祭場の施設写真。",
  photosLead:
    "外観・総合案内・ロビー・椅子席の写真です。戸田葬祭場は、式場・火葬炉・待合室を備えた火葬場併設斎場です。",
  photosFootnote:
    "式場や火葬炉、待合室の利用については、川口典礼へご相談ください。",
  flowHeading: "戸田葬祭場を利用する葬儀の流れ。",
  flowLead:
    "式場でのお別れから火葬、収骨までの流れを、川口典礼が一貫してサポートします。",
  availablePlansLabel: "戸田葬祭場でのご葬儀に対応",
  availablePlansHeading: "戸田葬祭場の利用に対応する葬儀プラン。",
  availablePlansLead:
    "川口典礼では、戸田葬祭場での式場利用や火葬を含む葬儀のご相談に対応しています。施設利用料・火葬料は葬儀プラン料金とは別途必要です。",
  cremationFurnaces: {
    heading: "戸田葬祭場の火葬炉。",
    lead: "戸田葬祭場では、特別殯館・特別室・最上等の3種の火葬炉から、ご希望や予算に応じてご案内します。詳しい仕様や違いは事前相談時にご案内します。",
    items: [
      {
        name: "特別殯館",
        description: "上位グレードの火葬炉です。",
        image: {
          src: "/images/saijo/toda-sousaijyo/cremation/tokubetsu-hinkan.png",
          alt: "戸田葬祭場の特別殯館",
        },
      },
      {
        name: "特別室(仏心)",
        description: "中位グレードの火葬炉です。",
        image: {
          src: "/images/saijo/toda-sousaijyo/cremation/tokubetsu-shitsu.png",
          alt: "戸田葬祭場の特別室",
        },
      },
      {
        name: "最上等",
        description: "標準の火葬炉です。区民葬・市民葬の対象もこちらです。",
        image: {
          src: "/images/saijo/toda-sousaijyo/cremation/saijo-class.png",
          alt: "戸田葬祭場の最上等",
        },
      },
    ],
  },
  hallRooms: {
    heading: "戸田葬祭場の式場。",
    lead: "本館3階の「光の間」、本館4階の「せせらぎの間」、別館の「思食の間」の3式場があります。各式場の詳細・空き状況は事前相談時にご案内します。",
    items: [
      {
        slug: "hikari",
        name: "光の間",
        location: "本館3階",
        feeNote: "297,000円(税込)",
        description: "本館3階にある式場です。",
        image: {
          src: "/images/saijo/toda-sousaijyo/hikari/ceremony-room.png",
          alt: "戸田葬祭場 光の間 の式場",
        },
      },
      {
        slug: "seseragi",
        name: "せせらぎの間",
        location: "本館4階",
        feeNote: "198,000円(税込)",
        description: "本館4階にある式場です。",
        image: {
          src: "/images/saijo/toda-sousaijyo/seseragi/ceremony-room.png",
          alt: "戸田葬祭場 せせらぎの間 の式場",
        },
      },
      {
        slug: "shijiki",
        name: "思食の間",
        location: "別館",
        feeNote: "253,000円(税込)",
        description: "別館にある式場です。",
        image: {
          src: "/images/saijo/toda-sousaijyo/shijiki/ceremony-room.png",
          alt: "戸田葬祭場 思食の間 の式場",
        },
      },
    ],
  },
  cremationWaitingRooms: {
    heading: "戸田葬祭場の火葬待合室。",
    lead: "火葬の間は待合室でお待ちいただきます。来場者人数・ご希望に応じて、施設側がお部屋をご案内します。",
    items: [
      {
        name: "香(1〜5)",
        capacity: "各20名",
        image: {
          src: "/images/saijo/toda-sousaijyo/cremation-waiting/kou.png",
          alt: "戸田葬祭場の待合室「香」",
        },
      },
      {
        name: "華(1〜4)",
        capacity: "30〜120名",
        image: {
          src: "/images/saijo/toda-sousaijyo/cremation-waiting/hana-small.png",
          alt: "戸田葬祭場の待合室「華」",
        },
      },
      {
        name: "華(5〜10)・光(1〜6)",
        capacity: "30〜180名",
        image: {
          src: "/images/saijo/toda-sousaijyo/cremation-waiting/hana-hikari-large.png",
          alt: "戸田葬祭場の大型待合室「華・光」",
        },
      },
      {
        name: "椅子席(予約席)",
        capacity: "1席単位での予約",
        image: {
          src: "/images/saijo/toda-sousaijyo/cremation-waiting/reserved-chair-seats.png",
          alt: "戸田葬祭場の椅子席(予約席)",
        },
      },
    ],
    seatFeeNote:
      "椅子席は1席990円(税込)。待合室料金は来場者人数に席料を乗じた額となります。来場者人数に応じた部屋を施設側で指定します。未就学児は無料です。",
  },
  feeTablesNote:
    "以下の料金は戸田葬祭場の施設利用料・火葬料です。川口典礼の葬儀プラン料金とは別途必要です。",
  feeTables: [
    {
      heading: "式場料金一覧",
      columns: ["斎場(式場)名", "料金"],
      noteHeader: "摘要",
      rows: [
        { category: "3階 光の間", values: ["297,000円"], note: "消費税込" },
        {
          category: "4階 せせらぎの間",
          values: ["198,000円"],
          note: "消費税込",
        },
        { category: "別館 思食の間", values: ["253,000円"], note: "消費税込" },
      ],
    },
    {
      heading: "別間使用(清め料金)一覧",
      lead: "本館2階・3階の別間ご使用時の料金です。",
      columns: ["区分", "席数", "料金"],
      noteHeader: "摘要",
      rows: [
        {
          category: "2階・3階",
          values: ["30席", "37,400円"],
          note: "消費税込",
        },
        {
          category: "2階・3階",
          values: ["60席", "64,900円"],
          note: "消費税込",
        },
        {
          category: "2階・3階",
          values: ["90席", "92,400円"],
          note: "消費税込",
        },
        {
          category: "2階・3階",
          values: ["120席", "119,900円"],
          note: "消費税込",
        },
      ],
    },
    {
      heading: "火葬料金一覧(一般料金)",
      columns: ["区分", "大人", "小人"],
      noteHeader: "摘要",
      rows: [
        {
          category: "特別殯館",
          values: ["177,000円", "104,000円"],
          note: "非課税・収骨容器無料",
        },
        {
          category: "特別室(仏心)",
          values: ["107,500円", "54,500円"],
          note: "非課税・収骨容器無料",
        },
        {
          category: "最上等",
          values: ["80,000円", "44,000円"],
          note: "非課税・収骨容器無料",
        },
      ],
    },
    {
      heading: "火葬料金一覧(区民葬料金)",
      lead: "区民葬の対象となる方の料金です。",
      columns: ["区分", "大人", "小人"],
      noteHeader: "摘要",
      rows: [
        {
          category: "最上等",
          values: ["59,600円", "34,500円"],
          note: "非課税・収骨容器有料",
        },
      ],
    },
    {
      heading: "火葬料金一覧(市民葬料金)",
      lead: "市民葬の対象となる方の料金です。",
      columns: ["区分", "大人", "小人"],
      noteHeader: "摘要",
      rows: [
        {
          category: "最上等",
          values: ["72,000円", "39,600円"],
          note: "非課税・収骨容器無料",
        },
      ],
      footnotes: [
        "小人は満6歳以下です。",
        "市民葬適用の収骨容器以外は有料となります。",
        "料金は変更される可能性があるため、最新の料金はお問い合わせください。",
      ],
    },
    {
      heading: "待合室料金一覧",
      columns: ["区分", "料金"],
      noteHeader: "摘要",
      rows: [
        {
          category: "席料",
          values: ["1席 990円"],
          note: "消費税込",
        },
      ],
      footnotes: [
        "待合室料金は、来場者人数に椅子席料を乗じた額です。",
        "待合室は人数に応じた部屋を施設側で指定します。",
        "未就学児は無料です。",
      ],
    },
  ],
};

export const saijoList: Saijo[] = [saijoMegurinomori, saijoTodaSousaijyo];

export function getSaijo(slug: string): Saijo | undefined {
  return saijoList.find((s) => s.slug === slug);
}
