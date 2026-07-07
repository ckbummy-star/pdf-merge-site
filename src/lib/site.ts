export const SITE_NAME = "PDF 병합";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdf-merge-site.vercel.app";

export const SITE_DESCRIPTION =
  "여러 PDF 파일을 순서대로 정렬해 하나로 합치거나, 원하는 페이지만 분리하세요. 파일은 서버로 전송되지 않고 브라우저에서만 처리됩니다.";

// Google AdSense 퍼블리셔 ID (예: "ca-pub-0000000000000000").
// 배포 환경변수 NEXT_PUBLIC_ADSENSE_ID 로 주입하면 광고 스크립트가 활성화됩니다.
export const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

// Google Search Console 소유 확인용 토큰(선택).
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

// 헤더에 노출할 주요 링크
export const HEADER_LINKS = [
  { href: "/", label: "PDF 병합" },
  { href: "/split", label: "PDF 분리" },
  { href: "/guide", label: "가이드" },
  { href: "/faq", label: "FAQ" },
] as const;

// 푸터에 그룹으로 노출할 링크
export const FOOTER_SECTIONS = [
  {
    title: "도구",
    links: [
      { href: "/", label: "PDF 병합" },
      { href: "/split", label: "PDF 분리" },
    ],
  },
  {
    title: "이용 안내",
    links: [
      { href: "/guide", label: "가이드" },
      { href: "/how-to-use", label: "이용방법" },
      { href: "/faq", label: "자주 묻는 질문" },
    ],
  },
  {
    title: "정보",
    links: [
      { href: "/about", label: "소개" },
      { href: "/contact", label: "문의하기" },
      { href: "/terms", label: "이용약관" },
      { href: "/privacy", label: "개인정보처리방침" },
    ],
  },
] as const;
