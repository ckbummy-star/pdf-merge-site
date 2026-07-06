"use client";

import { useSyncExternalStore } from "react";
import { getTodayQuote, type Quote } from "@/lib/quotes";

// Never changes during a session, so an empty subscribe is fine.
const emptySubscribe = () => () => {};

export default function DailyQuote() {
  // Returns null during SSR/prerender (so static export doesn't freeze the
  // quote at build time) and the actual quote on the client after hydration.
  // getTodayQuote() returns a stable reference from QUOTES, so this is safe.
  const quote = useSyncExternalStore<Quote | null>(
    emptySubscribe,
    () => getTodayQuote(),
    () => null,
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-8 sm:pt-12">
      <figure className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
          오늘의 명언
        </div>
        {quote ? (
          <>
            <blockquote className="text-base font-medium leading-7 text-gray-800 sm:text-lg">
              “{quote.text}”
            </blockquote>
            <figcaption className="text-right text-sm text-gray-500">
              — {quote.author}
            </figcaption>
          </>
        ) : (
          <div className="space-y-2" aria-hidden="true">
            <div className="h-5 w-full animate-pulse rounded bg-blue-100" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-blue-100" />
          </div>
        )}
      </figure>
    </div>
  );
}
