"use client";

import { useRef, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Image01Icon,
  Link01Icon,
  QuoteDownIcon,
  TextBoldIcon,
  TextItalicIcon,
  Heading02Icon,
  LeftToRightListBulletIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { uploadInlineImage } from "../actions";
import { inputClass } from "./ui";

type Tool = {
  icon: typeof TextBoldIcon;
  label: string;
  key?: string;
  apply: (selected: string) => { text: string; cursor?: number };
};

const TOOLS: Tool[] = [
  {
    icon: TextBoldIcon,
    label: "Bold",
    key: "b",
    apply: (s) => ({ text: `**${s || "bold"}**` }),
  },
  {
    icon: TextItalicIcon,
    label: "Italic",
    key: "i",
    apply: (s) => ({ text: `_${s || "italic"}_` }),
  },
  {
    icon: Heading02Icon,
    label: "Heading",
    apply: (s) => ({ text: `\n## ${s || "Heading"}\n` }),
  },
  {
    icon: QuoteDownIcon,
    label: "Quote",
    apply: (s) => ({ text: `\n> ${s || "Quote"}\n` }),
  },
  {
    icon: LeftToRightListBulletIcon,
    label: "List",
    apply: (s) => ({
      text: (s || "item")
        .split("\n")
        .map((l) => `- ${l}`)
        .join("\n"),
    }),
  },
  {
    icon: Link01Icon,
    label: "Link",
    key: "k",
    apply: (s) => ({ text: `[${s || "text"}](https://)` }),
  },
];

/** A markdown editor with a toolbar, image drops and a live preview. */
export function MarkdownEditor({
  name,
  defaultValue,
  required,
  onChange,
}: {
  name: string;
  defaultValue: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState(false);
  const [uploading, startUpload] = useTransition();
  const words = value.split(/\s+/).filter(Boolean).length;

  const update = (next: string, cursor?: number) => {
    setValue(next);
    onChange?.(next);
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.focus();
      if (cursor !== undefined) el.setSelectionRange(cursor, cursor);
    });
  };

  const insert = (text: string) => {
    const el = ref.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    update(
      value.slice(0, start) + text + value.slice(end),
      start + text.length,
    );
  };

  const applyTool = (tool: Tool) => {
    const el = ref.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const { text } = tool.apply(value.slice(start, end));
    update(
      value.slice(0, start) + text + value.slice(end),
      start + text.length,
    );
  };

  const uploadImages = (files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) return;
    startUpload(async () => {
      for (const file of images) {
        const data = new FormData();
        data.set("file", file);
        const result = await uploadInlineImage(data);
        if ("error" in result) toast.error(result.error);
        else
          insert(`\n![${file.name.replace(/\.[^.]+$/, "")}](${result.url})\n`);
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface px-2 py-1.5">
        {TOOLS.map((tool) => (
          <button
            key={tool.label}
            type="button"
            title={
              tool.key
                ? `${tool.label} (⌘${tool.key.toUpperCase()})`
                : tool.label
            }
            aria-label={tool.label}
            onClick={() => applyTool(tool)}
            className="flex size-8 items-center justify-center rounded-md text-foreground/70 hover:bg-surface-strong hover:text-foreground"
          >
            <HugeiconsIcon
              icon={tool.icon}
              className="size-4"
              strokeWidth={2}
            />
          </button>
        ))}
        <label
          title="Insert image"
          className="flex size-8 cursor-pointer items-center justify-center rounded-md text-foreground/70 hover:bg-surface-strong hover:text-foreground"
        >
          <HugeiconsIcon
            icon={Image01Icon}
            className="size-4"
            strokeWidth={2}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => uploadImages(Array.from(e.target.files ?? []))}
          />
        </label>
        <span className="ml-auto text-[12px] text-foreground/45">
          {uploading
            ? "Uploading image…"
            : `${words} words · ${Math.max(1, Math.round(words / 200))} min read`}
        </span>
        <div className="ml-2 flex rounded-full bg-surface-strong p-0.5 text-[12px] font-medium">
          {(["Write", "Preview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setPreview(tab === "Preview")}
              className={cn(
                "rounded-full px-3 py-1",
                preview === (tab === "Preview") && "bg-background shadow-sm",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <textarea
        ref={ref}
        name={name}
        value={value}
        required={required}
        rows={24}
        hidden={preview}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          const tool =
            (e.metaKey || e.ctrlKey) &&
            TOOLS.find((t) => t.key === e.key.toLowerCase());
          if (tool) {
            e.preventDefault();
            applyTool(tool);
          }
        }}
        onPaste={(e) => {
          const files = Array.from(e.clipboardData.files);
          if (files.length) {
            e.preventDefault();
            uploadImages(files);
          }
        }}
        onDrop={(e) => {
          if (e.dataTransfer.files.length) {
            e.preventDefault();
            uploadImages(Array.from(e.dataTransfer.files));
          }
        }}
        className={cn(
          inputClass,
          "rounded-none border-0 font-mono text-[14px] leading-relaxed focus:ring-0",
        )}
        placeholder="Write in markdown. Drop or paste images straight in."
      />
      {preview && (
        <div className="prose-essay min-h-[300px] space-y-5 p-6 text-[17px] leading-[1.6] text-foreground/85 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_h2]:text-[24px] [&_h2]:font-semibold [&_h3]:text-[19px] [&_h3]:font-semibold [&_img]:max-w-full [&_img]:rounded-xl [&_ul]:list-inside [&_ul]:list-disc">
          {value.trim() ? (
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-foreground/40">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
