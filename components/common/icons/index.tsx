/**
 * 共通インラインアイコン（B案：線アイコン stroke 1.75 / round）。
 *
 * OS 依存の絵文字（☎ ✓ → › ↗ ★）を統一された SVG に置き換えるための最小セット。
 * - 既定サイズは 1em（周囲のフォントサイズに追従）。`className="h-5 w-5"` 等で上書き可。
 * - 色は currentColor（親の text-* を継承）。
 * - すべて装飾用途のため既定で aria-hidden。ラベルは隣接テキストが担う。
 * - 依存追加なし（外部アイコンライブラリは使わない）。
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function baseProps(props: IconProps) {
  const {
    width = "1em",
    height = "1em",
    strokeWidth = 1.75,
    className,
    ...rest
  } = props;
  return {
    width,
    height,
    strokeWidth,
    className,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    focusable: false as const,
    ...rest,
  };
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 3.5h3l1.2 3.6-1.7 1.2a12 12 0 0 0 5 5l1.2-1.7 3.6 1.2v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 5 5.1 1.5 1.5 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5 10 17.5 19 6.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

/**
 * 星アイコン。filled=true は塗り、false は中線アウトライン（空の星）。
 * 評価表示では filled の数だけ塗り、残りをアウトラインで描く。
 */
export function StarIcon({
  filled = true,
  ...props
}: IconProps & { filled?: boolean }) {
  const star =
    "M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.6 9.3l5.8-.8z";
  if (filled) {
    return (
      <svg {...baseProps(props)} fill="currentColor" stroke="none">
        <path d={star} />
      </svg>
    );
  }
  return (
    <svg
      {...baseProps(props)}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
    >
      <path d={star} />
    </svg>
  );
}
