import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

const CONTACT_EMAIL = "ckbummy@naver.com";

export const metadata: Metadata = {
  title: "문의하기",
  description: `${SITE_NAME} 이용 중 궁금한 점이나 개선 의견이 있으시면 이메일로 문의해 주세요.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">문의하기</h1>
      <p className="mt-3 text-[15px] leading-7 text-gray-600">
        {SITE_NAME}을(를) 이용하시면서 궁금한 점, 오류 제보, 기능 제안 등
        어떤 내용이든 편하게 문의해 주세요. 확인 후 성실히 답변드리겠습니다.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-700">이메일</h2>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 block text-lg font-medium text-blue-600 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-4 text-sm leading-6 text-gray-500">
          문의 시 아래 내용을 함께 적어주시면 더 빠르게 도와드릴 수 있습니다.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-500">
          <li>사용 중인 브라우저와 기기 (예: Chrome, 아이폰)</li>
          <li>어떤 작업에서 문제가 발생했는지 (병합/분리)</li>
          <li>표시된 오류 메시지 내용</li>
        </ul>
      </div>

      <p className="mt-6 text-xs leading-6 text-gray-400">
        업로드하신 파일은 서버에 저장되지 않으므로, 문제 재현을 위해 실제 파일을
        보내주실 필요는 없습니다. 민감한 문서는 첨부하지 말아 주세요.
      </p>
    </div>
  );
}
