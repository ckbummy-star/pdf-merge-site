"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PdfFileItem } from "@/types/pdf-file";
import SortableFileItem from "./SortableFileItem";

interface FileListProps {
  items: PdfFileItem[];
  onReorder: (items: PdfFileItem[]) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export default function FileList({
  items,
  onReorder,
  onRemove,
  disabled,
}: FileListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  if (items.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <SortableFileItem
              key={item.id}
              item={item}
              index={index}
              onRemove={onRemove}
              disabled={disabled}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
