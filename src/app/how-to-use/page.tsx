import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용방법",
  description:
    "PDF 병합 및 분리 서비스 이용방법을 안내합니다. 파일 업로드부터 순서 변경, 병합, 분리, 다운로드까지 쉽게 따라 하세요.",
};

const splitSteps = [
  {
    title: "1. PDF 파일 업로드",
    description:
      "'PDF 분리' 메뉴로 이동한 뒤 분리할 PDF 파일 한 개를 업로드하세요. 업로드하면 파일명과 전체 페이지 수가 표시됩니다.",
  },
  {
    title: "2. 분리 방식 선택",
    description:
      "'모든 페이지를 개별 PDF로 분리'를 선택하면 각 페이지가 하나의 PDF가 되어 ZIP으로 묶입니다. '페이지 범위 추출'을 선택하면 1-3, 5 처럼 원하는 페이지만 골라 하나의 PDF로 만들 수 있습니다.",
  },
  {
    title: "3. 분리하기 & 다운로드",
    description:
      "'PDF 분리하기' 버튼을 누르면 브라우저 안에서 처리된 뒤 다운로드 버튼이 나타납니다. 버튼을 눌러 결과 파일을 저장하세요.",
  },
];

const steps = [
  {
    title: "1. PDF 파일 업로드",
    description:
      "메인 화면의 업로드 영역에 PDF 파일을 드래그 앤 드롭하거나, 영역을 클릭해 파일을 선택하세요. 여러 개의 파일을 한 번에 선택할 수 있습니다.",
  },
  {
    title: "2. 순서 변경",
    description:
      "업로드된 파일 목록에서 왼쪽의 손잡이(⠿) 아이콘을 끌어다 놓아 병합할 순서대로 자유롭게 재배열하세요. 필요 없는 파일은 삭제 버튼으로 제거할 수 있습니다.",
  },
  {
    title: "3. 병합하기 버튼 클릭",
    description:
      "순서를 확인한 뒤 '병합하기' 버튼을 누르면 브라우저 안에서 즉시 PDF가 하나로 합쳐집니다. 파일은 서버로 전송되지 않습니다.",
  },
  {
    title: "4. 다운로드",
    description:
      "병합이 완료되면 '병합된 PDF 다운로드' 버튼이 나타납니다. 버튼을 눌러 결과 파일을 내 기기에 저장하세요.",
  },
];

export default function HowToUsePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">이용방법</h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        간단한 단계만 거치면 PDF 파일을 하나로 합치거나 여러 개로 나눌 수
        있습니다.
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">PDF 병합하기</h2>
      <ol className="mt-4 flex flex-col gap-6">
        {steps.map((step) => (
          <li
            key={step.title}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <h3 className="font-semibold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <h2 className="mt-10 text-xl font-bold text-gray-900">PDF 분리하기</h2>
      <ol className="mt-4 flex flex-col gap-6">
        {splitSteps.map((step) => (
          <li
            key={step.title}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <h3 className="font-semibold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl bg-blue-50 p-5 text-sm text-blue-800">
        모든 처리는 사용자의 브라우저 안에서만 이루어지며, 업로드한 파일은
        서버에 저장되거나 전송되지 않습니다.
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
        >
          PDF 병합하러 가기
        </Link>
        <Link
          href="/split"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-blue-600 px-6 text-sm font-semibold text-blue-600 hover:bg-blue-50"
        >
          PDF 분리하러 가기
        </Link>
      </div>
    </div>
  );
}
