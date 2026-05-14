export type CompanyInfo = {
  name: string;
  legalName: string;
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
  representative: string;
  founded: string;
  capital: string;
  business: string[];
  affiliations: string[];
  hallSlug: string;
  hallName: string;
  serviceAreas: string[];
  mapEmbedQuery: string;
};

export const company: CompanyInfo = {
  name: "川口典礼",
  legalName: "(要確認)株式会社川口典礼",
  shortDescription:
    "川口市・新井宿の地域密着葬儀社。川口メモリアルホールを拠点に、家族葬・一日葬・火葬式・直葬・川口市民葬まで対応します。",
  postal: "333-0833",
  address: "埼玉県川口市西新井宿440-1",
  addressRegion: "埼玉県",
  addressLocality: "川口市",
  streetAddress: "西新井宿440-1",
  phone: "0120-963-765",
  phoneTelLink: "tel:0120-963-765",
  email: "kawaguchi.memorial@gmail.com",
  hours: "24時間365日 受付",
  representative: "(要確認)",
  founded: "(要確認)",
  capital: "(要確認)",
  business: [
    "葬儀・告別式の請負",
    "事前相談・葬儀プランのご案内",
    "斎場・式場の運営(川口メモリアルホール)",
    "搬送・ご安置のサポート",
    "宗教者の手配",
    "法要・アフターサポート",
  ],
  affiliations: ["(要確認)加盟団体・認可情報"],
  hallSlug: "kawaguchi-memorial-hall",
  hallName: "川口メモリアルホール",
  serviceAreas: ["川口市", "戸田市", "蕨市", "草加市", "鳩ヶ谷"],
  mapEmbedQuery: "埼玉県川口市西新井宿440-1",
};

// LocalBusiness (FuneralHome) 構造化データ
// schema.org: https://schema.org/FuneralHome
export function getLocalBusinessJsonLd() {
  const tel = company.phone.replace(/-/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: company.name,
    description: company.shortDescription,
    address: {
      "@type": "PostalAddress",
      postalCode: company.postal,
      addressCountry: "JP",
      addressRegion: company.addressRegion,
      addressLocality: company.addressLocality,
      streetAddress: company.streetAddress,
    },
    telephone: `+81-${tel.startsWith("0") ? tel.slice(1) : tel}`,
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
  };
}
