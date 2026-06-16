import Image from "next/image";
import { ArrowRightIcon } from "@/components/common/icons";

const hallFeatures = [
  "川口市めぐりの森まで車で約5分",
  "敷地内駐車場70台完備",
  "家族葬〜200名規模の一般葬まで対応",
  "控室・相談スペース・バリアフリー対応",
  "他斎場・寺院会館での葬儀にも対応",
];

const hallGallery = [
  {
    label: "外観",
    src: "/images/home/hall/hall-exterior.jpg",
    alt: "川口メモリアルホールの外観",
    aspect: "aspect-[4/3]",
  },
  {
    label: "式場",
    src: "/images/home/hall/hall-ceremony-room.jpg",
    alt: "川口メモリアルホールの式場",
    aspect: "aspect-[4/3]",
  },
  {
    label: "控室",
    src: "/images/home/hall/hall-family-waiting-room.jpg",
    alt: "川口メモリアルホールの親族控室",
    aspect: "aspect-[4/3]",
  },
  {
    label: "エントランス",
    src: "/images/home/hall/hall-interior.jpg",
    alt: "川口メモリアルホールのエントランス",
    aspect: "aspect-[4/3]",
  },
];

export function HallSection() {
  return (
    <section id="hall" className="bg-warm py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Hall
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">自社ホール</p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            川口市西新井宿の、
            <br className="md:hidden" />
            川口メモリアルホール。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            川口市めぐりの森まで車で約5分、敷地内駐車場70台。家族葬から最大200名規模の一般葬まで、ご家族の希望に合わせて対応します。自社ホール以外にも、谷塚斎場・戸田葬祭場・町屋斎場・寺院会館でのご葬儀に対応します。事前相談・ホール見学はお気軽にお越しください。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="grid grid-cols-2 gap-3">
            {hallGallery.map((item, i) => (
              <div
                key={item.label}
                data-reveal
                data-reveal-delay={String(Math.min(i, 3))}
                className={`${item.aspect} relative overflow-hidden rounded-lg border border-line bg-warm`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 320px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8"
          >
            <p className="text-lg font-bold text-ink-deep md:text-xl">
              ホールの特長
            </p>
            <ul className="mt-5 space-y-3">
              {hallFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-lg bg-paper px-4 py-3 text-base leading-7 text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <a
                href="/hall/kawaguchi-memorial-hall/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-brand-deep sm:w-auto"
              >
                ホールの詳細を見る
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <p className="mt-4 text-sm leading-7 text-ink-mid">
                川口市めぐりの森での葬儀をお考えの方は、
                <a
                  href="/saijo/megurinomori/"
                  className="font-bold text-brand hover:underline"
                >
                  川口市めぐりの森の葬儀案内
                </a>
                もご覧ください。
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-mid">
                自社ホール以外の式場をご検討の方は、
                <a
                  href="/saijo/"
                  className="font-bold text-brand hover:underline"
                >
                  川口市・近隣で利用できる葬儀場を見る
                </a>
                からご覧いただけます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
