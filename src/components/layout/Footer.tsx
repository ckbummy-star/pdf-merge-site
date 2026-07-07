import Link from "next/link";
import { FOOTER_SECTIONS, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-base font-bold text-gray-900">{SITE_NAME}</p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              서버 전송 없이 브라우저에서 안전하게 PDF를 병합하고 분리하는 무료
              도구입니다.
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <nav key={section.title} className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-700">
                {section.title}
              </p>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <p className="mt-10 border-t border-gray-100 pt-6 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
