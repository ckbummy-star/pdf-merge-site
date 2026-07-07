import Link from "next/link";
import { HEADER_LINKS, SITE_NAME } from "@/lib/site";

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900">
          {SITE_NAME}
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-gray-500 sm:gap-6">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
