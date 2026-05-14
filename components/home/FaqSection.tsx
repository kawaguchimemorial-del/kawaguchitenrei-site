import { getHomeFaqs } from "@/lib/faqs";

export function FaqSection() {
  const faqs = getHomeFaqs();

  return (
    <section id="faq" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            FAQ
          </p>
          <p className="mt-2 text-sm font-semibold text-ink-mid">
            よくある質問
          </p>
          <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
            葬儀前によくいただく、
            <br className="md:hidden" />
            ご質問。
          </h2>
          <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
            急なご葬儀でも、事前のご相談でも、わからないことがあれば遠慮なくお問い合わせください。
          </p>
        </div>

        <ul className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <li key={faq.id}>
              <details className="group rounded-lg border border-line bg-white shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left">
                  <span className="flex items-start gap-3 text-base font-bold text-ink-deep md:text-lg">
                    <span aria-hidden className="font-serif-jp text-brand">
                      Q.
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-line-soft px-5 py-5 text-base leading-8 text-ink-mid">
                  <span
                    aria-hidden
                    className="font-serif-jp mr-2 font-bold text-brand"
                  >
                    A.
                  </span>
                  {faq.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <a
            href="/faq/"
            className="block w-full rounded-lg border border-ink-deep bg-white px-5 py-4 text-center text-base font-bold text-ink-deep shadow-sm md:inline-flex md:w-auto"
          >
            よくある質問をもっと見る
          </a>
        </div>
      </div>
    </section>
  );
}
