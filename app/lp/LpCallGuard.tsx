"use client";

import { useEffect } from "react";

// ポケットの中での誤発信を減らす（2026-09-23）。
// 同日、ページを開いたままのスマホから「明らかにポケットでの発信」が2件あり、
// GA4 では同じ端末が3分間に5回電話ボタンを押していた。
// 画面の上下に常時出ている電話ボタンに、布が触れて押されたものと判断した。
//
// 普通のタップ（短く・1本の指）は止めない。止めるのは次の2つだけ：
//  A. 電話ボタンで発信を開始してから10秒以内の、再度の電話ボタンのタップ
//  B. 0.6秒以上押し続けた、または複数の場所に同時に触れていたタッチ
//
// 止めたタップは、GA4（lp_click_tel / click_tel）にも広告の「電話タップCV」にも
// 数えないよう、window のキャプチャ段階で伝播ごと止める（GTM・LpAnalytics は
// document で受けるため、ここで止めれば届かない）。
const COOLDOWN_MS = 10_000;
const LONG_PRESS_MS = 600;

export function LpCallGuard() {
  useEffect(() => {
    const active = new Set<number>();
    let downAt = 0;
    let multiTouch = false;
    let lastCallAt = 0;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      active.add(event.pointerId);
      if (active.size === 1) {
        downAt = event.timeStamp;
        multiTouch = false;
      } else {
        multiTouch = true;
      }
    };
    const onUp = (event: PointerEvent) => {
      active.delete(event.pointerId);
    };

    const onClick = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="tel:"]')
          : null;
      if (!link) return;

      const now = Date.now();
      // pointerdown が記録されていないクリック（キーボード・支援技術）は長押し判定をしない
      const pressedMs = downAt ? event.timeStamp - downAt : 0;
      const accidental =
        now - lastCallAt < COOLDOWN_MS ||
        multiTouch ||
        pressedMs > LONG_PRESS_MS;

      downAt = 0;
      multiTouch = false;

      if (accidental) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      lastCallAt = now;
    };

    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("pointerup", onUp, true);
    window.addEventListener("pointercancel", onUp, true);
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("pointercancel", onUp, true);
      window.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
