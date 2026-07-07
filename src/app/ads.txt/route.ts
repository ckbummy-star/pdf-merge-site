import { ADSENSE_ID } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Serves /ads.txt for Google AdSense. When NEXT_PUBLIC_ADSENSE_ID is set
 * (e.g. "ca-pub-0000000000000000"), emits the standard AdSense line;
 * otherwise returns an empty file so nothing invalid is published.
 */
export function GET() {
  const publisherId = ADSENSE_ID.replace(/^ca-/, ""); // -> pub-XXXX
  const body = ADSENSE_ID
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "";

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
