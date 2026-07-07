import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description: `${SITE_NAME}은(는) 서버 전송 없이 브라우저에서 안전하게 PDF를 병합하고 분리하는 무료 웹 도구입니다. 서비스의 목적과 특징을 소개합니다.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {SITE_NAME} 소개
      </h1>

      <div className="mt-8 flex flex-col gap-8 text-[15px] leading-7 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            어떤 서비스인가요?
          </h2>
          <p className="mt-3">
            {SITE_NAME}은(는) 여러 개의 PDF 파일을 하나로 합치거나, 하나의 PDF를
            여러 개로 나누는 작업을 누구나 무료로 할 수 있도록 만든 웹
            도구입니다. 별도의 프로그램 설치나 회원가입 없이, 웹 브라우저만
            있으면 바로 사용할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            무엇이 다른가요?
          </h2>
          <p className="mt-3">
            가장 큰 특징은 <strong>파일이 서버로 전송되지 않는다</strong>는
            점입니다. 대부분의 온라인 PDF 도구는 파일을 외부 서버에 업로드해
            처리하지만, 본 서비스는 pdf-lib 기술을 이용해 모든 병합·분리 작업을
            사용자의 브라우저 안에서 직접 수행합니다.
          </p>
          <p className="mt-3">
            덕분에 계약서, 신분증, 급여명세서처럼 민감한 문서를 다룰 때도
            안심하고 사용할 수 있습니다. 업로드한 파일은 네트워크로 나가지 않고,
            작업이 끝나면 곧바로 다운로드됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">주요 기능</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>여러 PDF 파일을 원하는 순서로 병합</li>
            <li>드래그 앤 드롭으로 간편하게 순서 변경</li>
            <li>하나의 PDF를 페이지별 개별 파일로 분리</li>
            <li>원하는 페이지 범위만 골라 추출</li>
            <li>PC와 모바일 모두 지원하는 반응형 화면</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            운영 방침
          </h2>
          <p className="mt-3">
            본 서비스는 이용자의 개인정보와 파일을 수집하지 않는 것을 원칙으로
            합니다. 자세한 내용은{" "}
            <Link href="/privacy" className="text-blue-600 underline">
              개인정보처리방침
            </Link>
            에서 확인하실 수 있으며, 궁금한 점은{" "}
            <Link href="/contact" className="text-blue-600 underline">
              문의하기
            </Link>{" "}
            페이지를 통해 언제든 연락 주시기 바랍니다.
          </p>
        </section>
      </div>
    </div>
  );
}
