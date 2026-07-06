import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE_NAME} 개인정보처리방침. 업로드하신 파일은 서버에 저장되지 않으며, 모든 처리는 사용자의 브라우저 내에서만 이루어집니다.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        개인정보처리방침
      </h1>
      <p className="mt-2 text-sm text-gray-500">시행일자: 2026년 7월 7일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-6 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            1. 파일 처리 방식
          </h2>
          <p className="mt-2 rounded-xl bg-blue-50 p-4 font-medium text-blue-900">
            업로드하신 파일은 서버에 저장되지 않으며, 모든 처리는 사용자의
            브라우저 내에서만 이루어집니다.
          </p>
          <p className="mt-2">
            {SITE_NAME}은(는) pdf-lib 라이브러리를 이용해 PDF 병합 작업을
            사용자의 로컬 브라우저에서 직접 수행합니다. 업로드한 PDF 파일과
            병합 결과물은 어떠한 형태로도 서버에 전송, 저장, 백업되지 않으며,
            운영자를 포함한 제3자가 파일 내용을 열람할 수 없습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            2. 수집하는 개인정보 항목
          </h2>
          <p className="mt-2">
            본 서비스는 회원가입 없이 이용할 수 있으며, 이름, 이메일 등 이용자를
            식별할 수 있는 개인정보를 별도로 수집하지 않습니다. 다만, 서비스
            개선을 위해 접속 로그, 브라우저 종류, 기기 정보 등 비식별
            통계 정보가 웹 호스팅 및 아래의 광고 서비스 제공자를 통해 자동으로
            수집될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            3. 쿠키 및 광고 서비스
          </h2>
          <p className="mt-2">
            본 사이트는 Google을 포함한 제3자 광고 공급업체를 이용해 광고를
            게재할 수 있으며, 이 과정에서 쿠키가 사용될 수 있습니다. Google과
            같은 제3자 공급업체는 쿠키를 사용하여 사용자가 본 사이트 또는 다른
            사이트를 방문한 기록을 바탕으로 맞춤 광고를 게재합니다.
          </p>
          <p className="mt-2">
            이용자는{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google 광고 설정 페이지
            </a>
            에서 맞춤 광고 게재를 원하지 않도록 설정하거나, 브라우저 설정에서
            쿠키 저장을 거부할 수 있습니다. 단, 쿠키 저장을 거부할 경우 일부
            서비스 이용에 어려움이 있을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            4. 개인정보의 보유 및 이용기간
          </h2>
          <p className="mt-2">
            본 서비스는 이용자의 파일이나 개인정보를 서버에 저장하지 않으므로,
            별도의 개인정보 보유 및 파기 절차가 발생하지 않습니다. 광고
            서비스 제공자가 수집하는 정보의 보유기간은 해당 제공자의 정책을
            따릅니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            5. 이용자의 권리
          </h2>
          <p className="mt-2">
            이용자는 언제든지 브라우저 쿠키를 삭제하거나 광고 개인화 설정을
            변경함으로써 자신의 정보 활용 범위를 조정할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. 문의처</h2>
          <p className="mt-2">
            개인정보처리방침에 대해 문의사항이 있으신 경우 아래 이메일로
            연락해 주시기 바랍니다.
          </p>
          <p className="mt-2 font-medium text-gray-900">
            이메일: ckbummy@naver.com
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            7. 개정 및 고지
          </h2>
          <p className="mt-2">
            본 개인정보처리방침은 관련 법령 및 서비스 정책에 따라 변경될 수
            있으며, 변경 시 본 페이지를 통해 공지합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
