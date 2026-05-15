const emergencySteps = [
  "病院・施設・警察署など、お迎え先をお知らせください。",
  "ご安置場所やご希望を伺い、必要な手続きを整理します。",
  "葬儀の日程、式場、費用を一つずつ確認します。",
];

export function EmergencySection() {
  return (
    <section id="emergency" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-lg border border-line bg-paper p-6 md:grid md:grid-cols-[0.95fr_1.05fr] md:gap-10 md:p-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
              Emergency
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-mid">
              もしもの時は
            </p>
            <h2 className="font-serif-jp mt-4 text-3xl font-medium leading-[1.4] text-ink-deep md:text-[2.4rem]">
              深夜・早朝でも、
              <br />
              まずはお電話ください。
            </h2>
            <p className="mt-5 text-base leading-9 text-ink-mid md:text-lg">
              急なご逝去の際も、24時間365日対応します。何から進めればよいか分からない場合も、状況を伺いながら落ち着いてご案内します。
            </p>
            <a
              href="tel:0120-963-765"
              className="mt-7 hidden w-full items-center justify-center gap-2 rounded-lg bg-emergency px-6 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-emergency-deep sm:w-auto md:inline-flex"
            >
              <span aria-hidden>☎</span>
              電話で相談する
            </a>
          </div>

          <div className="mt-9 space-y-4 md:mt-0">
            {emergencySteps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-lg bg-white p-5 shadow-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-base font-bold text-brand">
                  {index + 1}
                </span>
                <p className="text-base leading-8 text-ink-mid md:text-lg">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
