export function UrgentCallout() {
  return (
    <aside
      role="note"
      aria-label="お急ぎの方へ"
      className="flex flex-col gap-4 rounded-lg border-2 border-emergency bg-white p-5 shadow-sm md:flex-row md:items-center md:gap-6 md:p-6"
    >
      <div className="flex-1">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emergency">
          For Urgent Calls
        </p>
        <p className="font-serif-jp mt-2 text-xl font-medium leading-[1.4] text-ink-deep md:text-2xl">
          お急ぎの方は、今すぐお電話ください。
        </p>
        <p className="mt-2 text-sm leading-7 text-ink-mid md:text-base">
          ご逝去直後の搬送・お迎えのご依頼は、24時間365日お電話で受け付けています。フォームのご返信はお時間をいただきます。
        </p>
      </div>
      <a
        href="tel:0120-963-765"
        className="flex shrink-0 items-center justify-center gap-3 rounded-lg bg-emergency px-6 py-4 text-white shadow-sm transition hover:bg-emergency-deep"
      >
        <span aria-hidden className="text-2xl">
          ☎
        </span>
        <span className="text-left">
          <span className="block font-serif-jp text-xl font-medium leading-tight">
            0120-963-765
          </span>
          <span className="mt-0.5 block text-xs font-semibold text-white/90">
            24時間365日 受付
          </span>
        </span>
      </a>
    </aside>
  );
}
