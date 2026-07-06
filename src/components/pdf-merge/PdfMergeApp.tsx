"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PdfFileItem } from "@/types/pdf-file";
import {
  getPdfPageCount,
  isPdfFile,
  mergePdfs,
  PDF_ERROR_MESSAGE,
  PDF_MERGE_ERROR_MESSAGE,
} from "@/lib/pdf";
import FileDropzone from "./FileDropzone";
import FileList from "./FileList";

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function buildMergedFileName(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(
    now.getHours(),
  )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `merged-${stamp}.pdf`;
}

export default function PdfMergeApp() {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeError, setMergeError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mergedFileName, setMergedFileName] = useState<string | null>(null);
  const [mergedPageCount, setMergedPageCount] = useState<number | null>(null);
  const downloadUrlRef = useRef<string | null>(null);

  useEffect(() => {
    downloadUrlRef.current = downloadUrl;
  }, [downloadUrl]);

  useEffect(() => {
    return () => {
      if (downloadUrlRef.current) URL.revokeObjectURL(downloadUrlRef.current);
    };
  }, []);

  const clearMergeResult = useCallback(() => {
    setMergeError(null);
    setDownloadUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setMergedFileName(null);
    setMergedPageCount(null);
  }, []);

  const handleFilesSelected = useCallback(
    (newFiles: File[]) => {
      clearMergeResult();

      const items: PdfFileItem[] = newFiles.map((file) => ({
        id: createId(),
        file,
        name: file.name,
        size: file.size,
        pageCount: null,
        status: "loading",
      }));

      setFiles((prev) => [...prev, ...items]);

      items.forEach((item) => {
        if (!isPdfFile(item.file)) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? {
                    ...f,
                    status: "error",
                    errorMessage: "PDF 파일만 업로드할 수 있습니다.",
                  }
                : f,
            ),
          );
          return;
        }

        getPdfPageCount(item.file)
          .then((pageCount) => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === item.id ? { ...f, status: "ready", pageCount } : f,
              ),
            );
          })
          .catch(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === item.id
                  ? { ...f, status: "error", errorMessage: PDF_ERROR_MESSAGE }
                  : f,
              ),
            );
          });
      });
    },
    [clearMergeResult],
  );

  const handleRemove = useCallback(
    (id: string) => {
      clearMergeResult();
      setFiles((prev) => prev.filter((f) => f.id !== id));
    },
    [clearMergeResult],
  );

  const handleReorder = useCallback(
    (reordered: PdfFileItem[]) => {
      clearMergeResult();
      setFiles(reordered);
    },
    [clearMergeResult],
  );

  const handleClearAll = useCallback(() => {
    clearMergeResult();
    setFiles([]);
  }, [clearMergeResult]);

  const readyCount = files.filter((f) => f.status === "ready").length;
  const hasErrors = files.some((f) => f.status === "error");
  const isProcessing = files.some((f) => f.status === "loading");
  const canMerge = readyCount >= 2 && !isProcessing && !isMerging;

  const handleMerge = useCallback(async () => {
    const readyFiles = files.filter((f) => f.status === "ready");
    if (readyFiles.length < 2) return;

    setMergeError(null);
    setDownloadUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setIsMerging(true);

    try {
      const mergedBytes = await mergePdfs(readyFiles.map((f) => f.file));
      const blob = new Blob([new Uint8Array(mergedBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setMergedFileName(buildMergedFileName());
      setMergedPageCount(
        readyFiles.reduce((sum, f) => sum + (f.pageCount ?? 0), 0),
      );
    } catch {
      setMergeError(PDF_MERGE_ERROR_MESSAGE);
    } finally {
      setIsMerging(false);
    }
  }, [files]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          PDF 병합
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          여러 PDF 파일을 하나로 합쳐보세요. 파일은 서버로 전송되지 않고
          브라우저 안에서 안전하게 처리됩니다.
        </p>
      </div>

      <FileDropzone onFilesSelected={handleFilesSelected} disabled={isMerging} />

      {files.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              업로드된 파일 {files.length}개
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              disabled={isMerging}
              className="text-sm font-medium text-gray-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              전체 삭제
            </button>
          </div>

          <FileList
            items={files}
            onReorder={handleReorder}
            onRemove={handleRemove}
            disabled={isMerging}
          />

          {hasErrors && (
            <p className="text-sm text-red-600">
              오류가 있는 파일은 병합에서 제외됩니다. 삭제하거나 다른 파일로
              교체해 주세요.
            </p>
          )}

          <button
            type="button"
            onClick={handleMerge}
            disabled={!canMerge}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isMerging && (
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
            {isMerging
              ? "병합 중..."
              : isProcessing
                ? "파일 확인 중..."
                : `PDF ${readyCount}개 병합하기`}
          </button>

          {mergeError && (
            <p className="text-sm text-red-600">{mergeError}</p>
          )}

          {downloadUrl && mergedFileName && (
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
                <p className="font-medium text-green-800">
                  병합이 완료되었습니다{mergedPageCount !== null && ` (총 ${mergedPageCount}페이지)`}
                </p>
                <p className="mt-0.5 text-xs text-green-600">{mergedFileName}</p>
              </div>
              <a
                href={downloadUrl}
                download={mergedFileName}
                className="flex h-11 w-full max-w-xs items-center justify-center rounded-lg bg-green-600 px-6 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
              >
                병합된 PDF 다운로드
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
