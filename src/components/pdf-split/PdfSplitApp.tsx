"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import {
  extractPages,
  getPdfPageCount,
  isPdfFile,
  parsePageRanges,
  PDF_ERROR_MESSAGE,
  PDF_SPLIT_ERROR_MESSAGE,
  splitToIndividualPages,
} from "@/lib/pdf";
import { formatFileSize } from "@/lib/format";
import FileDropzone from "@/components/pdf-merge/FileDropzone";

type SplitMode = "all" | "range";

interface LoadedPdf {
  file: File;
  pageCount: number;
}

interface DownloadResult {
  url: string;
  name: string;
  label: string;
}

export default function PdfSplitApp() {
  const [loaded, setLoaded] = useState<LoadedPdf | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [mode, setMode] = useState<SplitMode>("all");
  const [rangeInput, setRangeInput] = useState("");

  const [isSplitting, setIsSplitting] = useState(false);
  const [splitError, setSplitError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  useEffect(() => {
    resultUrlRef.current = result?.url ?? null;
  }, [result]);

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const clearResult = useCallback(() => {
    setSplitError(null);
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;

      clearResult();
      setLoadError(null);
      setLoaded(null);

      if (!isPdfFile(file)) {
        setLoadError("PDF 파일만 업로드할 수 있습니다.");
        return;
      }

      setIsLoading(true);
      getPdfPageCount(file)
        .then((pageCount) => {
          setLoaded({ file, pageCount });
        })
        .catch(() => {
          setLoadError(PDF_ERROR_MESSAGE);
        })
        .finally(() => setIsLoading(false));
    },
    [clearResult],
  );

  const handleReset = useCallback(() => {
    clearResult();
    setLoaded(null);
    setLoadError(null);
    setRangeInput("");
    setMode("all");
  }, [clearResult]);

  const handleSplit = useCallback(async () => {
    if (!loaded) return;

    clearResult();
    setIsSplitting(true);

    try {
      const baseName = loaded.file.name.replace(/\.pdf$/i, "");

      if (mode === "all") {
        const parts = await splitToIndividualPages(loaded.file);
        const zip = new JSZip();
        parts.forEach((part) => zip.file(part.name, part.bytes));
        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        setResult({
          url,
          name: `${baseName}_split.zip`,
          label: `${parts.length}개 페이지로 분리 완료 (ZIP)`,
        });
      } else {
        const { pages, error } = parsePageRanges(rangeInput, loaded.pageCount);
        if (error) {
          setSplitError(error);
          setIsSplitting(false);
          return;
        }
        const bytes = await extractPages(loaded.file, pages);
        const blob = new Blob([new Uint8Array(bytes)], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);
        setResult({
          url,
          name: `${baseName}_extracted.pdf`,
          label: `${pages.length}개 페이지 추출 완료`,
        });
      }
    } catch {
      setSplitError(PDF_SPLIT_ERROR_MESSAGE);
    } finally {
      setIsSplitting(false);
    }
  }, [loaded, mode, rangeInput, clearResult]);

  const canSplit =
    !!loaded &&
    !isSplitting &&
    (mode === "all" || rangeInput.trim().length > 0);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          PDF 분리
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          하나의 PDF를 페이지별로 나누거나 원하는 페이지만 추출하세요. 파일은
          서버로 전송되지 않고 브라우저 안에서 안전하게 처리됩니다.
        </p>
      </div>

      <FileDropzone
        onFilesSelected={handleFilesSelected}
        disabled={isSplitting}
        multiple={false}
        hint="또는 클릭하여 파일 선택 (1개)"
      />

      {isLoading && (
        <p className="text-center text-sm text-gray-500">파일 확인 중...</p>
      )}

      {loadError && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {loadError}
        </p>
      )}

      {loaded && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-8 w-8 shrink-0 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">
                {loaded.file.name}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                {formatFileSize(loaded.file.size)} · {loaded.pageCount}페이지
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSplitting}
              aria-label="파일 제거"
              className="shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 disabled:opacity-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <fieldset className="flex flex-col gap-3" disabled={isSplitting}>
            <legend className="mb-1 text-sm font-medium text-gray-600">
              분리 방식 선택
            </legend>

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                mode === "all"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name="split-mode"
                value="all"
                checked={mode === "all"}
                onChange={() => {
                  setMode("all");
                  clearResult();
                }}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-medium text-gray-800">
                  모든 페이지를 개별 PDF로 분리
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  각 페이지가 하나의 PDF가 되며 ZIP 파일로 묶어 내려받습니다.
                </span>
              </span>
            </label>

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                mode === "range"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name="split-mode"
                value="range"
                checked={mode === "range"}
                onChange={() => {
                  setMode("range");
                  clearResult();
                }}
                className="mt-1"
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-gray-800">
                  페이지 범위 추출
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  선택한 페이지만 모아 하나의 PDF로 만듭니다.
                </span>
                {mode === "range" && (
                  <input
                    type="text"
                    value={rangeInput}
                    onChange={(e) => {
                      setRangeInput(e.target.value);
                      clearResult();
                    }}
                    placeholder={`예: 1-3, 5 (총 ${loaded.pageCount}페이지)`}
                    className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                )}
              </span>
            </label>
          </fieldset>

          <button
            type="button"
            onClick={handleSplit}
            disabled={!canSplit}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isSplitting && (
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
                />
              </svg>
            )}
            {isSplitting ? "분리 중..." : "PDF 분리하기"}
          </button>

          {splitError && <p className="text-sm text-red-600">{splitError}</p>}

          {result && (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-5 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-10 w-10 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div>
                <p className="font-medium text-green-800">{result.label}</p>
                <p className="mt-0.5 text-xs text-green-600">{result.name}</p>
              </div>
              <a
                href={result.url}
                download={result.name}
                className="flex h-11 w-full max-w-xs items-center justify-center rounded-lg bg-green-600 px-6 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
              >
                다운로드
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
