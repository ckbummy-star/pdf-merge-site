import { PDFDocument } from "pdf-lib";

export const PDF_ERROR_MESSAGE =
  "손상되었거나 지원하지 않는 PDF 파일입니다. 다른 파일을 시도해 주세요.";

/**
 * Loads a PDF and returns its page count. Throws if the file is not a
 * valid/readable PDF (corrupted, not a PDF, or unsupported encryption).
 */
export async function getPdfPageCount(file: File): Promise<number> {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return pdf.getPageCount();
}

export function isPdfFile(file: File): boolean {
  const hasPdfExtension = file.name.toLowerCase().endsWith(".pdf");
  const hasPdfMimeType = file.type === "application/pdf" || file.type === "";
  return hasPdfExtension && hasPdfMimeType;
}

export const PDF_MERGE_ERROR_MESSAGE =
  "병합 중 오류가 발생했습니다. 파일을 확인한 뒤 다시 시도해 주세요.";

/**
 * Merges PDF files (in the given order) into a single PDF, entirely
 * client-side. Returns the merged PDF as bytes ready to be downloaded.
 */
export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const donorPdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(
      donorPdf,
      donorPdf.getPageIndices(),
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

export const PDF_SPLIT_ERROR_MESSAGE =
  "분리 중 오류가 발생했습니다. 파일을 확인한 뒤 다시 시도해 주세요.";

export interface SplitResult {
  name: string;
  bytes: Uint8Array;
}

function stripPdfExtension(fileName: string): string {
  return fileName.replace(/\.pdf$/i, "");
}

/**
 * Splits a PDF so that every page becomes its own single-page PDF.
 * Returns one entry per page, ready to be bundled (e.g. into a zip).
 */
export async function splitToIndividualPages(
  file: File,
): Promise<SplitResult[]> {
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = src.getPageCount();
  const baseName = stripPdfExtension(file.name);
  const padWidth = String(total).length;

  const results: SplitResult[] = [];
  for (let i = 0; i < total; i++) {
    const doc = await PDFDocument.create();
    const [page] = await doc.copyPages(src, [i]);
    doc.addPage(page);
    const pageNumber = String(i + 1).padStart(padWidth, "0");
    results.push({
      name: `${baseName}_page_${pageNumber}.pdf`,
      bytes: await doc.save(),
    });
  }
  return results;
}

/**
 * Extracts the given 1-indexed page numbers (in order) into a single PDF.
 */
export async function extractPages(
  file: File,
  pageNumbers: number[],
): Promise<Uint8Array> {
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const doc = await PDFDocument.create();
  const indices = pageNumbers.map((n) => n - 1);
  const pages = await doc.copyPages(src, indices);
  pages.forEach((page) => doc.addPage(page));
  return doc.save();
}

export interface PageRangeResult {
  pages: number[];
  error?: string;
}

/**
 * Parses a page-range expression like "1-3, 5, 7-9" into an ordered list of
 * 1-indexed page numbers, validating against the document's page count.
 */
export function parsePageRanges(input: string, max: number): PageRangeResult {
  const parts = input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { pages: [], error: "추출할 페이지 범위를 입력해 주세요. (예: 1-3, 5)" };
  }

  const pages: number[] = [];
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    const singleMatch = part.match(/^(\d+)$/);

    if (rangeMatch) {
      let start = parseInt(rangeMatch[1], 10);
      let end = parseInt(rangeMatch[2], 10);
      if (start > end) [start, end] = [end, start];
      if (start < 1 || end > max) {
        return {
          pages: [],
          error: `1부터 ${max} 사이의 페이지 번호를 입력해 주세요.`,
        };
      }
      for (let i = start; i <= end; i++) pages.push(i);
    } else if (singleMatch) {
      const n = parseInt(singleMatch[1], 10);
      if (n < 1 || n > max) {
        return {
          pages: [],
          error: `1부터 ${max} 사이의 페이지 번호를 입력해 주세요.`,
        };
      }
      pages.push(n);
    } else {
      return {
        pages: [],
        error: `'${part}' 형식이 올바르지 않습니다. 예: 1-3, 5`,
      };
    }
  }

  return { pages };
}
