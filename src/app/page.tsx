import DailyQuote from "@/components/DailyQuote";
import PdfMergeApp from "@/components/pdf-merge/PdfMergeApp";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript. Requires a modern web browser.",
  inLanguage: "ko-KR",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  featureList: [
    "여러 PDF 파일을 하나로 병합",
    "드래그 앤 드롭으로 순서 변경",
    "PDF를 페이지별로 분리",
    "원하는 페이지 범위만 추출",
    "브라우저 내 처리로 개인정보 보호",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={appJsonLd} />
      <DailyQuote />
      <PdfMergeApp />
    </>
  );
}
