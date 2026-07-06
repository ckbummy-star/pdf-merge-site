import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "PDF 병합 서비스에 대해 자주 묻는 질문과 답변을 확인하세요. 개인정보 보호, 파일 용량, 지원 형식 등을 안내합니다.",
};

const faqs = [
  {
    q: "업로드한 파일이 서버로 전송되나요?",
    a: "아니요. 모든 PDF 처리는 사용자의 브라우저 안에서만 이루어지며, 파일은 서버로 전송되거나 저장되지 않습니다.",
  },
  {
    q: "회원가입이나 로그인이 필요한가요?",
    a: "필요하지 않습니다. 별도의 가입 절차 없이 누구나 바로 이용할 수 있습니다.",
  },
  {
    q: "파일 개수나 용량에 제한이 있나요?",
    a: "서버로 파일을 전송하지 않기 때문에 별도의 업로드 용량 제한은 없지만, 처리 속도와 안정성은 사용 중인 기기와 브라우저의 메모리 성능에 따라 달라질 수 있습니다.",
  },
  {
    q: "PDF가 아닌 파일도 업로드할 수 있나요?",
    a: "아니요. PDF 파일(.pdf)만 업로드할 수 있으며, 다른 형식의 파일을 선택하면 오류 메시지가 표시됩니다.",
  },
  {
    q: "비밀번호로 보호된 PDF도 병합할 수 있나요?",
    a: "비밀번호나 암호화가 적용된 일부 PDF는 정상적으로 처리되지 않을 수 있습니다. 이 경우 손상되었거나 지원하지 않는 파일이라는 안내 메시지가 표시됩니다.",
  },
  {
    q: "병합 순서를 바꿀 수 있나요?",
    a: "네. 업로드된 파일 목록에서 드래그 앤 드롭으로 순서를 자유롭게 변경할 수 있습니다.",
  },
  {
    q: "PDF를 여러 개로 나눌 수도 있나요?",
    a: "네. 'PDF 분리' 메뉴에서 하나의 PDF를 페이지별 개별 파일(ZIP)로 나누거나, 원하는 페이지 범위만 추출해 하나의 PDF로 만들 수 있습니다.",
  },
  {
    q: "특정 페이지만 뽑아낼 수 있나요?",
    a: "'PDF 분리'의 '페이지 범위 추출'에서 1-3, 5 와 같이 입력하면 해당 페이지만 모아 새로운 PDF로 저장할 수 있습니다.",
  },
  {
    q: "모바일에서도 사용할 수 있나요?",
    a: "네. 반응형으로 제작되어 스마트폰과 태블릿 브라우저에서도 동일하게 사용할 수 있습니다.",
  },
  {
    q: "이용 요금이 있나요?",
    a: "아니요, 무료로 이용할 수 있는 서비스입니다.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        자주 묻는 질문
      </h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        궁금하신 내용을 빠르게 확인해 보세요.
      </p>

      <dl className="mt-8 flex flex-col gap-4">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-xl border border-gray-200 bg-white p-5">
            <dt className="font-semibold text-gray-900">Q. {item.q}</dt>
            <dd className="mt-2 text-sm leading-6 text-gray-600">
              A. {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
