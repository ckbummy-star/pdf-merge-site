import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${SITE_NAME} - 브라우저에서 안전하게 PDF 병합·분리`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -2 }}>
          PDF 병합 · 분리
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            opacity: 0.9,
            display: "flex",
          }}
        >
          서버 전송 없이 브라우저에서 안전하게
        </div>
      </div>
    ),
    { ...size },
  );
}
