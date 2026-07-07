import Script from "next/script";
import { ADSENSE_ID } from "@/lib/site";

/**
 * Loads the Google AdSense script only when NEXT_PUBLIC_ADSENSE_ID is set.
 * Before approval / without an ID this renders nothing, so it is safe to keep
 * mounted in the layout at all times.
 */
export default function AdSense() {
  if (!ADSENSE_ID) return null;

  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
    />
  );
}
