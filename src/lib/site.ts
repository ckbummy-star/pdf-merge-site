export const SITE_NAME = "PDF 병합";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdf-merge-site.vercel.app";

export const SITE_DESCRIPTION =
  "여러 PDF 파일을 순서대로 정렬해 하나로 합치세요. 파일은 서버로 전송되지 않고 브라우저에서만 처리됩니다.";

export const NAV_LINKS = [
  { href: "/", label: "PDF 병합" },
  { href: "/split", label: "PDF 분리" },
  { href: "/how-to-use", label: "이용방법" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "개인정보처리방침" },
] as const;
