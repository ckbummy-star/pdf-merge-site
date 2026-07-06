export type FileStatus = "loading" | "ready" | "error";

export interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: FileStatus;
  errorMessage?: string;
}
