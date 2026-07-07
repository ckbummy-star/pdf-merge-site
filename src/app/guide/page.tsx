import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "PDF 활용 가이드",
  description:
    "PDF 병합·분리부터 개인정보 보호, 업무 활용 팁까지. PDF를 더 똑똑하게 다루는 방법을 안내하는 가이드 모음입니다.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndexPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        PDF 활용 가이드
      </h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        PDF를 더 편리하고 안전하게 다루는 방법을 정리했습니다.
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guide/${guide.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h2 className="font-semibold text-gray-900">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {guide.description}
              </p>
              <p className="mt-3 text-xs text-gray-400">
                {guide.date} · 약 {guide.readingMinutes}분 분량
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
