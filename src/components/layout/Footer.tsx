import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-4 py-8 text-sm text-gray-400 sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
        <nav className="flex gap-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-600">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
