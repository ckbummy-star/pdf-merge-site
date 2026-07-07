import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { GUIDES, getGuide } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guide/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/guide/${guide.slug}`,
      publishedTime: guide.date,
    },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/guide/${guide.slug}`,
  };

  return (
    <article className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <JsonLd data={articleJsonLd} />

      <nav className="mb-6 text-sm text-gray-400">
        <Link href="/guide" className="hover:text-blue-600">
          가이드
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">{guide.title}</span>
      </nav>

      <h1 className="text-2xl font-bold leading-9 text-gray-900 sm:text-3xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-xs text-gray-400">
        {guide.date} · 약 {guide.readingMinutes}분 분량
      </p>
      <p className="mt-4 text-base leading-7 text-gray-600">
        {guide.description}
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-gray-900">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="mt-3 text-[15px] leading-7 text-gray-700">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 rounded-xl bg-blue-50 p-6 text-center">
        <p className="text-sm font-medium text-blue-900">
          지금 바로 PDF를 병합하거나 분리해 보세요.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
          >
            PDF 병합하기
          </Link>
          <Link
            href="/split"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-blue-600 px-6 text-sm font-semibold text-blue-600 hover:bg-blue-100"
          >
            PDF 분리하기
          </Link>
        </div>
      </div>
    </article>
  );
}
