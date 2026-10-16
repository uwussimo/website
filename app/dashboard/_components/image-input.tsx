"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const MAX_SIDE = 1600;

// phone photos run to several megabytes; shrinking them in the browser
// keeps the upload small. the server converts whatever arrives to webp
async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  }).catch(() => null);
  if (!bitmap) return file;

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 1_000_000) return file;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  // png keeps a logo's transparency; everything else becomes jpeg
  const type = file.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, 0.88),
  );
  return blob ? new File([blob], file.name, { type }) : file;
}

/** A drop zone that also opens the file picker; shrinks photos on pick. */
export function ImageInput({
  name,
  multiple = false,
  required = false,
  onPreview,
  onFiles,
}: {
  name: string;
  multiple?: boolean;
  required?: boolean;
  onPreview?: (url: string) => void;
  onFiles?: (count: number) => void;
}) {
  const [label, setLabel] = useState<string | null>(null);
  const [over, setOver] = useState(false);

  const handle = async (input: HTMLInputElement) => {
    const files = Array.from(input.files ?? []);
    if (files.length === 0) return;
    setLabel("Preparing…");
    const transfer = new DataTransfer();
    for (const file of await Promise.all(files.map(shrink))) {
      transfer.items.add(file);
    }
    input.files = transfer.files;
    setLabel(
      files.length === 1 ? files[0].name : `${files.length} photos ready`,
    );
    onFiles?.(files.length);
    if (onPreview && files[0])
      onPreview(URL.createObjectURL(transfer.files[0]));
  };

  return (
    <label
      className={cn(
        "flex min-h-[72px] cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-3 text-[14px] transition-colors",
        over
          ? "border-foreground bg-surface-strong"
          : "border-foreground/25 hover:border-foreground/50",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const input = e.currentTarget.querySelector("input");
        if (input && e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          handle(input);
        }
      }}
    >
      <HugeiconsIcon
        icon={Upload01Icon}
        className="size-4 shrink-0 text-foreground/50"
        strokeWidth={1.8}
      />
      <span className="text-foreground/70">
        {label ??
          (multiple
            ? "Drop photos here, or click to choose"
            : "Drop a photo here, or click to choose")}
      </span>
      <input
        type="file"
        name={name}
        accept="image/*"
        multiple={multiple}
        required={required}
        className="sr-only"
        onChange={(e) => handle(e.currentTarget)}
      />
    </label>
  );
}
