import type { Metadata } from "next";
import { defaultOpenGraphImages } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { PhoneIcon } from "@/components/common/icons";

const SITE_URL = "https://kawaguchitenrei.com";

const PET_TITLE =
  "ペット火葬 川口市｜流れ・お立ち会い・収骨のご相談｜川口典礼";
const PET_DESCRIPTION =
  "川口市周辺でペット火葬をお考えの方へ。お立ち会い・収骨・日程など、お見送りの流れを個別にご案内します。対応可否や費用はペットの大きさやご希望により異なるため、まずはお電話またはお問い合わせフォームよりお気軽にご相談ください。";

export const metadata: Metadata = {
  title: PET_TITLE,
  description: PET_DESCRIPTION,
  alternates: { canonical: "/pet/" },
  openGraph: {
    title: PET_TITLE,
    description: PET_DESCRIPTION,
    url: "/pet/",
    type: "article",
    images: defaultOpenGraphImages,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "川口典礼",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "ペット火葬のご相談",
      item: `${SITE_URL}/pet/`,
    },
  ],
};

export default function PetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        eyebrow="Pet"
        subLabel="ペット火葬のご相談"
        title="川口市のペット火葬のご相談"
        description={
          <p>
            大切なご家族であるペットのお見送りについて、お立ち会いや収骨を含めた流れ・日程を個別にご案内します。対応可否やご希望に沿えるかは、お電話またはお問い合わせフォームよりお気軽にご相談ください。
          </p>
        }
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "ペット火葬のご相談" },
        ]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            About
          </p>
          <h2 className="font-serif-jp mt-3 text-2xl font-medium leading-[1.5] text-ink-deep md:text-3xl">
            ペット火葬のご相談も承っています。
          </h2>

          <div className="mt-8 space-y-6 text-base leading-9 text-ink md:text-lg">
            <p>
              川口典礼は埼玉県川口市で人のご葬儀を中心にお手伝いしておりますが、ご家族として暮らされたペットのお見送りについても、ご相談いただくことがあります。
            </p>
            <p>
              ペット火葬は、人の葬儀とは内容や対応できる範囲が異なります。日程・地域・ご希望の形によってご案内できる内容が変わるため、お電話またはお問い合わせフォームで個別にご相談ください。
            </p>
            <p>
              対応可否や費用は、ペットの種類・サイズ・ご希望の形（お立ち会いの有無、収骨方法など）によって異なります。ご家族のお気持ちを丁寧にお伺いしながら、可能な範囲でご提案いたします。
            </p>
          </div>

          <div className="mt-12 rounded-lg border border-line bg-paper px-6 py-7 md:px-8 md:py-9">
            <p className="font-serif-jp text-lg font-medium text-ink-deep md:text-xl">
              ご相談時にお伺いする主な内容
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 inline-block h-1 w-3 bg-brand" />
                <span>ペットの種類・サイズ</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 inline-block h-1 w-3 bg-brand" />
                <span>ご希望の日程・お時間帯</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 inline-block h-1 w-3 bg-brand" />
                <span>お立ち会いの有無、収骨のご希望</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 inline-block h-1 w-3 bg-brand" />
                <span>ご相談者様のお住まいの地域</span>
              </li>
            </ul>
          </div>

          <div className="mt-12 rounded-lg border-l-4 border-brand bg-paper px-5 py-5 md:px-6 md:py-6">
            <p className="text-sm font-semibold text-ink-deep md:text-base">
              ご案内にあたって
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-mid md:text-base md:leading-8">
              対応地域・日程・ご希望内容により、ご対応できない場合があります。費用や流れについては個別に確認してご案内しますので、まずはお電話またはお問い合わせフォームでお気軽にご相談ください。
            </p>
          </div>
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-24 bg-deep py-16 text-white md:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand-tint uppercase">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            ご相談ください
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] md:text-[2.4rem]">
            まずは、お電話またはフォームでご相談ください。
          </h2>
          <p className="mt-5 text-base leading-9 text-white/80 md:text-lg">
            ご家族として暮らされたペットのお見送りについて、ご家族のお気持ちを丁寧にお伺いします。
          </p>

          <div className="mt-9 hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
            <a
              href="tel:0120-963-765"
              className="flex items-center justify-center gap-3 rounded-lg bg-emergency px-5 py-5 text-white shadow-sm transition hover:bg-emergency-deep"
            >
              <PhoneIcon className="h-7 w-7" />
              <span className="text-left">
                <span className="block text-lg font-bold leading-tight">
                  0120-963-765
                </span>
                <span className="mt-1 block text-xs font-semibold text-white/90">
                  24時間365日 受付
                </span>
              </span>
            </a>
            <a
              href="/contact/"
              className="rounded-lg bg-white px-5 py-5 text-center text-base font-bold text-brand-deep shadow-sm transition hover:bg-paper"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
