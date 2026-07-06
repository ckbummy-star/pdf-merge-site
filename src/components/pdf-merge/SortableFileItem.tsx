"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PdfFileItem } from "@/types/pdf-file";
import { formatFileSize } from "@/lib/format";

interface SortableFileItemProps {
  item: PdfFileItem;
  index: number;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export default function SortableFileItem({
  item,
  index,
  onRemove,
  disabled,
}: SortableFileItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm ${
        isDragging ? "z-10 opacity-70 shadow-md" : "border-gray-200"
      } ${item.status === "error" ? "border-red-300 bg-red-50" : ""}`}
    >
      <button
        type="button"
        aria-label="순서 변경 핸들"
        disabled={disabled}
        className="shrink-0 cursor-grab touch-none rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        {...attributes}
        {...listeners}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M9 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9-14a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
        {index + 1}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className={`h-8 w-8 shrink-0 ${item.status === "error" ? "text-red-400" : "text-red-500"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-800" title={item.name}>
          {item.name}
        </p>
        <p className="mt-0.5 text-xs text-gray-400">
          {formatFileSize(item.size)}
          {item.status === "ready" && item.pageCount !== null && (
            <> · {item.pageCount}페이지</>
          )}
          {item.status === "loading" && <> · 확인 중...</>}
        </p>
        {item.status === "error" && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {item.errorMessage}
          </p>
        )}
      </div>

      {item.status === "loading" && (
        <svg
          className="h-5 w-5 shrink-0 animate-spin text-blue-500"
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

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        disabled={disabled}
        aria-label={`${item.name} 삭제`}
        className="shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-400"
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
    </li>
  );
}
