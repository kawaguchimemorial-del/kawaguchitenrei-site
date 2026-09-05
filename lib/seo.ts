/** Shared social image. Nested openGraph metadata does not inherit parent images. */
export const defaultOpenGraphImages = [
  {
    url: "/images/home/hall/hall-exterior.jpg",
    width: 1200,
    height: 800,
    alt: "川口メモリアルホールの外観",
  },
];

/** Record substantive page changes explicitly; deployments alone are not updates. */
export const pageContentUpdatedAt: Record<string, string> = {
  "/": "2026-09-06",
  "/plan/cremation/": "2026-09-06",
  "/plan/family-funeral/": "2026-09-06",
  "/plan/oneday-funeral/": "2026-09-06",
};
