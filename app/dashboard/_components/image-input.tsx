"use client";

import { inputClass } from "./ui";

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

export function ImageInput({
  name,
  multiple = false,
  required = false,
}: {
  name: string;
  multiple?: boolean;
  required?: boolean;
}) {
  return (
    <input
      type="file"
      name={name}
      accept="image/*"
      multiple={multiple}
      required={required}
      className={inputClass}
      onChange={async (event) => {
        const input = event.currentTarget;
        const files = Array.from(input.files ?? []);
        if (files.length === 0) return;
        const transfer = new DataTransfer();
        for (const file of await Promise.all(files.map(shrink))) {
          transfer.items.add(file);
        }
        input.files = transfer.files;
      }}
    />
  );
}
