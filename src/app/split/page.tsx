import type { Metadata } from "next";
import PdfSplitApp from "@/components/pdf-split/PdfSplitApp";

export const metadata: Metadata = {
  title: "PDF 분리",
  description:
    "하나의 PDF를 페이지별로 나누거나 원하는 페이지만 추출하세요. 파일은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
  alternates: { canonical: "/split" },
};

export default function SplitPage() {
  return <PdfSplitApp />;
}
