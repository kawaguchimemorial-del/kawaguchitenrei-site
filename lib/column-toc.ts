import type { ColumnBlock } from "./columns";

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function headingId(h2Count: number, h3Count?: number): string {
  return h3Count && h3Count > 0 ? `s-${h2Count}-${h3Count}` : `s-${h2Count}`;
}

export function extractToc(body: ColumnBlock[]): TocItem[] {
  const items: TocItem[] = [];
  let h2Count = 0;
  let h3Count = 0;
  for (const block of body) {
    if (block.type === "h2") {
      h2Count += 1;
      h3Count = 0;
      items.push({ id: headingId(h2Count), text: block.text, level: 2 });
    } else if (block.type === "h3") {
      h3Count += 1;
      items.push({ id: headingId(h2Count, h3Count), text: block.text, level: 3 });
    }
  }
  return items;
}
