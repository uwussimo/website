"use client";

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HugeiconsIcon } from "@hugeicons/react";
import { DragDropVerticalIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/**
 * Drag-to-reorder for any list. Shows the new order at once and tells the
 * caller, which saves it. Keyboard: focus the handle, space, arrows, space.
 */
export function Sortable<T extends { id: string }>({
  items,
  onReorder,
  render,
  layout = "list",
  className,
}: {
  items: T[];
  onReorder: (orderedIds: string[]) => void;
  render: (item: T, index: number) => React.ReactNode;
  layout?: "list" | "grid";
  className?: string;
}) {
  const [order, setOrder] = useState(items);
  const key = items.map((i) => i.id).join("|");
  const [seenKey, setSeenKey] = useState(key);
  // the server is the source of truth once it re-renders the list
  if (key !== seenKey) {
    setSeenKey(key);
    setOrder(items);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = order.findIndex((i) => i.id === active.id);
    const to = order.findIndex((i) => i.id === over.id);
    const next = arrayMove(order, from, to);
    setOrder(next);
    onReorder(next.map((i) => i.id));
  };

  return (
    <DndContext
      id={`sortable-${key.length}-${order.length}`}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={order.map((i) => i.id)}
        strategy={
          layout === "grid" ? rectSortingStrategy : verticalListSortingStrategy
        }
      >
        <div className={className}>
          {order.map((item, index) => (
            <SortableRow key={item.id} id={item.id} layout={layout}>
              {render(item, index)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  id,
  layout,
  children,
}: {
  id: string;
  layout: "list" | "grid";
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "relative",
        isDragging && "z-10 opacity-90 shadow-[0_12px_32px_rgb(0_0_0/0.12)]",
        layout === "list" ? "bg-background" : "rounded-xl",
      )}
    >
      <button
        ref={setActivatorNodeRef}
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className={cn(
          "absolute z-10 flex cursor-grab items-center justify-center rounded-md text-foreground/35 hover:bg-surface-strong hover:text-foreground active:cursor-grabbing",
          layout === "list"
            ? "left-1 top-1/2 size-8 -translate-y-1/2"
            : "left-1.5 top-1.5 size-7 bg-background/80 backdrop-blur",
        )}
      >
        <HugeiconsIcon
          icon={DragDropVerticalIcon}
          className="size-4"
          strokeWidth={2}
        />
      </button>
      {children}
    </div>
  );
}
