"use client";

import { useRef, useState } from "react";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  multiple?: boolean;
  hint?: string;
}

export default function FileDropzone({
  onFilesSelected,
  disabled,
  multiple = true,
  hint,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onFilesSelected(Array.from(fileList));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragActive(false);
        if (disabled) return;
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-colors sm:p-12 ${
        disabled
          ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
          : isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-12 w-12 text-blue-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
        />
      </svg>
      <div>
        <p className="text-base font-medium text-gray-700 sm:text-lg">
          PDF 파일을 여기에 끌어다 놓으세요
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {hint ?? "또는 클릭하여 파일 선택 (여러 개 선택 가능)"}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
