import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: `${SITE_NAME} 서비스 이용약관입니다. 서비스 이용 조건과 책임의 한계를 안내합니다.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">이용약관</h1>
      <p className="mt-2 text-sm text-gray-500">시행일자: 2026년 7월 7일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-6 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">제1조 (목적)</h2>
          <p className="mt-2">
            본 약관은 {SITE_NAME}(이하 &ldquo;서비스&rdquo;)이 제공하는 PDF
            병합·분리 기능의 이용 조건과 절차, 이용자와 운영자의 권리 및 의무를
            규정하는 것을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            제2조 (서비스의 내용)
          </h2>
          <p className="mt-2">
            서비스는 이용자가 업로드한 PDF 파일을 사용자의 브라우저 내에서
            병합하거나 분리하는 기능을 제공합니다. 모든 처리는 이용자의 기기에서
            이루어지며, 파일은 운영자의 서버로 전송되거나 저장되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            제3조 (이용료)
          </h2>
          <p className="mt-2">
            서비스는 무료로 제공됩니다. 운영 유지를 위해 광고가 게재될 수
            있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            제4조 (이용자의 책임)
          </h2>
          <p className="mt-2">
            이용자는 본인이 정당한 권한을 가진 파일에 한하여 서비스를 이용해야
            하며, 타인의 저작권 및 권리를 침해하는 용도로 사용해서는 안 됩니다.
            서비스 이용 과정에서 발생한 결과물의 관리 책임은 이용자에게 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            제5조 (책임의 한계)
          </h2>
          <p className="mt-2">
            서비스는 안정적인 동작을 위해 노력하나, 이용자의 브라우저 환경,
            파일의 상태, 기기 성능 등에 따라 작업이 정상적으로 수행되지 않을 수
            있습니다. 운영자는 서비스 이용으로 인해 발생한 직접적·간접적 손해에
            대하여 관련 법령이 허용하는 범위 내에서 책임을 지지 않습니다.
          </p>
          <p className="mt-2">
            중요한 문서는 작업 전 반드시 원본을 별도로 보관하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            제6조 (약관의 변경)
          </h2>
          <p className="mt-2">
            본 약관은 관련 법령 및 서비스 정책에 따라 변경될 수 있으며, 변경 시
            본 페이지를 통해 공지합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
