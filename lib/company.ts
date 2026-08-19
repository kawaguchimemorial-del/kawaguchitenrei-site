export type CompanyInfo = {
  name: string;
  legalName?: string;
  shortDescription: string;
  postal: string;
  address: string;
  addressRegion: string;
  addressLocality: string;
  streetAddress: string;
  phone: string;
  phoneTelLink: string;
  email: string;
  hours: string;
  // Googleマップの口コミ（第三者検証用リンク）
  googleReviewsUrl?: string;
  representative?: string;
  founded: string;
  foundedYear: number;
  yearsInBusiness: number;
  annualCases: string;
  // 累計施行件数（確定事実・推測しない）
  cumulativeCases: string;
  // アンケートに基づく満足度（実在の集計・保守的表記）
  satisfactionRate: string;
  // Google クチコミ（実在値。件数は変動するため目安）
  reviewRating: number;
  reviewCount: number;
  // 川口市の葬祭事業（市民葬）登録店かどうか（確定事実）
  citizenFuneralRegistered: boolean;
  // 実績数値の可視化用（すべて確定事実・誇張しない §11）
  trackRecord: { value: string; label: string; note?: string }[];
  capital?: string;
  business: string[];
  affiliations: string[];
  hallSlug: string;
  hallName: string;
  serviceAreas: string[];
  mapEmbedQuery: string;
  parkingCapacity: string;
  distanceToMegurinomori: string;
  maxFuneralScale: string;
};

export const company: CompanyInfo = {
  name: "川口典礼",
  // 登記上の正式名称。GBP の登録名称「株式会社川口典礼 川口メモリアルホール」と名寄せするために保持
  legalName: "株式会社川口典礼",
  shortDescription:
    "川口市・新井宿の地域密着葬儀社。川口メモリアルホール(駐車場70台・川口市めぐりの森まで車5分)を拠点に、家族葬から200名規模の一般葬まで対応します。創業20年、年間約260件の施行実績。",
  postal: "333-0833",
  address: "埼玉県川口市西新井宿440-1",
  addressRegion: "埼玉県",
  addressLocality: "川口市",
  streetAddress: "西新井宿440-1",
  phone: "0120-963-765",
  phoneTelLink: "tel:0120-963-765",
  email: "kawaguchi.memorial@gmail.com",
  hours: "24時間365日 受付",
  googleReviewsUrl: "https://www.google.com/maps?cid=8136740303180194415",
  founded: "2006年(創業20年)",
  foundedYear: 2006,
  yearsInBusiness: 20,
  annualCases: "年間約260件",
  cumulativeCases: "4,600件以上",
  satisfactionRate: "97%以上",
  reviewRating: 4.5,
  reviewCount: 27,
  citizenFuneralRegistered: true,
  trackRecord: [
    {
      value: "20年",
      label: "創業",
      note: "2006年〜、川口市・新井宿でお見送りをお手伝い",
    },
    {
      value: "4,600件以上",
      label: "累計の施行実績",
      note: "創業から川口市・近隣で重ねてきたお見送りの累計",
    },
    {
      value: "約260件",
      label: "年間の施行実績",
      note: "家族葬・一日葬・直葬・一般葬・市民葬まで",
    },
    {
      value: "97%以上",
      label: "アンケート満足度",
      note: "ご葬儀後にお答えいただいたアンケートの満足度",
    },
    {
      value: "登録店",
      label: "川口市の葬祭事業（市民葬）",
      note: "申請手続きから川口市めぐりの森での火葬までご相談に対応",
    },
  ],
  business: [
    "葬儀・告別式の請負(家族葬・一日葬・直葬ほか)",
    "事前相談・葬儀プランのご案内",
    "斎場・式場の運営(川口メモリアルホール・駐車場70台)",
    "搬送・ご安置のサポート",
    "宗教者の手配(仏式・神式・キリスト教式・無宗教葬)",
    "法要・アフターサポート",
    "川口市民葬制度の活用ご案内",
  ],
  affiliations: ["川口市の葬祭事業（市民葬）登録店"],
  hallSlug: "kawaguchi-memorial-hall",
  hallName: "川口メモリアルホール",
  serviceAreas: [
    "川口市",
    "戸田市",
    "蕨市",
    "草加市",
    "鳩ヶ谷",
    "足立区",
    "板橋区",
    "北区",
  ],
  mapEmbedQuery: "川口メモリアルホール 埼玉県川口市西新井宿440-1",
  parkingCapacity: "70台",
  distanceToMegurinomori: "車で約5分",
  maxFuneralScale: "最大200名規模の一般葬まで対応",
};

const SITE_URL = "https://kawaguchitenrei.com";
const HALL_IMAGE_URL = `${SITE_URL}/images/home/hall/hall-exterior.jpg`;
const LOGO_URL = `${SITE_URL}/icon.png`;

// LocalBusiness (FuneralHome) 構造化データ
// schema.org: https://schema.org/FuneralHome
export function getLocalBusinessJsonLd() {
  const tel = company.phone.replace(/-/g, "");
  const internationalTel = `+81-${tel.startsWith("0") ? tel.slice(1) : tel}`;

  return {
    "@context": "https://schema.org",
    // エンティティ名寄せ用に @graph でノードを分離:
    // FuneralHome(実店舗/式場) ・ Organization(事業者=川口典礼) ・ WebSite。
    // @id で相互リンクし、LLM/AI の名寄せと知識グラフ整合を高める。
    "@graph": [
      {
    // FuneralHome(実店舗/式場エンティティ)。aggregateRating はこのノードに保持。
    // Google のレビュースニペットは LocalBusiness を親型として認識するため
    // FuneralHome 単独でなく LocalBusiness を併記して無効判定を避ける。
    "@type": ["FuneralHome", "LocalBusiness"],
    "@id": `${SITE_URL}/#funeralhome`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    name: company.name,
    alternateName: company.hallName,
    url: `${SITE_URL}/`,
    image: HALL_IMAGE_URL,
    logo: LOGO_URL,
    description: company.shortDescription,
    foundingDate: String(company.foundedYear),
    // 同一事業者の名寄せ用。実値が確認できているもののみ記載（推測URLは追加しない）
    sameAs: company.googleReviewsUrl ? [company.googleReviewsUrl] : undefined,
    // Google クチコミの実在集計（人間承認済み・実値のみ。件数は変動する目安）
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.reviewRating,
      reviewCount: company.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    address: {
      "@type": "PostalAddress",
      postalCode: company.postal,
      addressCountry: "JP",
      addressRegion: company.addressRegion,
      addressLocality: company.addressLocality,
      streetAddress: company.streetAddress,
    },
    telephone: internationalTel,
    email: company.email,
    priceRange: "正式なお見積りでご案内",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: internationalTel,
      contactType: "customer service",
      availableLanguage: "ja",
      areaServed: "JP",
    },
    knowsAbout: [
      "家族葬",
      "一日葬",
      "直葬・火葬式",
      "一般葬",
      "川口市民葬（葬祭事業）",
      "川口市めぐりの森での火葬",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: company.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "駐車場",
        value: "70台(敷地内・無料)",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "対応規模",
        value: "家族葬から最大200名規模の一般葬まで",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "近隣火葬場",
        value: "川口市めぐりの森まで車で約5分",
      },
    ],
      },
      {
        // Organization(事業者エンティティ=川口典礼)。社名の名寄せを明確化。
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: company.name,
        legalName: company.legalName,
        url: `${SITE_URL}/`,
        logo: LOGO_URL,
        image: HALL_IMAGE_URL,
        description: company.shortDescription,
        foundingDate: String(company.foundedYear),
        telephone: internationalTel,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          postalCode: company.postal,
          addressCountry: "JP",
          addressRegion: company.addressRegion,
          addressLocality: company.addressLocality,
          streetAddress: company.streetAddress,
        },
        // 実値が確認できているもののみ(推測URLは追加しない)
        sameAs: company.googleReviewsUrl ? [company.googleReviewsUrl] : undefined,
      },
      {
        // WebSite(サイトエンティティ)。publisher を Organization に紐付け。
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: company.name,
        inLanguage: "ja",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
