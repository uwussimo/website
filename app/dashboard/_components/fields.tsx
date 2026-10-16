"use client";

import Image from "next/image";
import { useState } from "react";
import type { Field } from "@/lib/admin/resources";
import { slugify } from "@/lib/admin/slug";
import { mediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/content";
import type { Stat, StripPhoto } from "@/lib/settings";
import { ImageInput } from "./image-input";
import { MarkdownEditor } from "./markdown-editor";
import { StatsEditor } from "./stats-editor";
import { StripEditor } from "./strip-editor";
import { helpClass, inputClass, labelClass } from "./ui";

export type FieldContext = {
  /** every photo on the site, for pickers */
  photos?: Photo[];
};

type Props = {
  field: Field;
  value: unknown;
  /** every value in the form, for fields derived from another */
  values: Record<string, unknown>;
  invalid?: boolean;
  onChange?: (name: string, value: string) => void;
  context?: FieldContext;
};

/** One form field: label, the right widget for its type, help, error. */
export function FieldRow({
  field,
  value,
  values,
  invalid,
  onChange,
  context,
  error,
}: Props & { error?: string }) {
  const inline = field.type === "checkbox";
  return (
    <div>
      {inline ? (
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name={field.name}
            defaultChecked={Boolean(value)}
            className="size-5 rounded accent-foreground"
          />
          <span className="text-[15px] font-medium">{field.label}</span>
        </label>
      ) : (
        <>
          <label htmlFor={field.name} className={labelClass}>
            {field.label}
            {!field.required && field.type !== "focus" && (
              <span className="ml-1.5 font-normal text-foreground/40">
                optional
              </span>
            )}
          </label>
          <Widget
            field={field}
            value={value}
            values={values}
            invalid={invalid}
            onChange={onChange}
            context={context}
          />
        </>
      )}
      {error ? (
        <p
          role="alert"
          className="mt-1.5 text-[13px] font-medium text-destructive"
        >
          {error}
        </p>
      ) : (
        field.help && <p className={helpClass}>{field.help}</p>
      )}
    </div>
  );
}

function Widget({ field, value, values, invalid, onChange, context }: Props) {
  const { name, type, required, placeholder } = field;
  const text = value == null ? "" : String(value);
  const common = {
    id: name,
    name,
    required,
    placeholder,
    "aria-invalid": invalid || undefined,
    className: inputClass,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange?.(name, e.target.value),
  };

  switch (type) {
    case "textarea":
      return <textarea {...common} defaultValue={text} rows={3} />;
    case "markdown":
      return (
        <MarkdownEditor
          name={name}
          defaultValue={text}
          required={required}
          onChange={(v) => onChange?.(name, v)}
        />
      );
    case "stats":
      return (
        <StatsEditor
          name={name}
          value={(value as Stat[]) ?? []}
          onChange={() => onChange?.(name, "")}
        />
      );
    case "strip":
      return (
        <StripEditor
          name={name}
          value={(value as StripPhoto[]) ?? []}
          photos={context?.photos ?? []}
          onChange={() => onChange?.(name, "")}
        />
      );
    case "lines":
      return (
        <textarea
          {...common}
          defaultValue={Array.isArray(value) ? value.join("\n") : ""}
          rows={5}
        />
      );
    case "number":
      return (
        <input
          {...common}
          type="text"
          inputMode="decimal"
          defaultValue={text}
        />
      );
    case "url":
      return (
        <input {...common} type="text" inputMode="url" defaultValue={text} />
      );
    case "date":
      return (
        <input
          {...common}
          type="date"
          defaultValue={text}
          className={cn(inputClass, "max-w-[220px]")}
        />
      );
    case "month":
      return <MonthWidget field={field} value={text} invalid={invalid} />;
    case "segmented":
      return (
        <Segmented
          name={name}
          options={field.options ?? []}
          value={text || field.options?.[0]?.value}
          onChange={onChange}
        />
      );
    case "slug":
      return (
        <SlugWidget
          field={field}
          value={text}
          values={values}
          invalid={invalid}
        />
      );
    case "image":
      return <ImageWidget field={field} value={text} />;
    case "focus":
      return <FocusWidget field={field} value={text} values={values} />;
    default:
      return <input {...common} type="text" defaultValue={text} />;
  }
}

function Segmented({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (name: string, value: string) => void;
}) {
  const [current, setCurrent] = useState(value);
  return (
    <div
      className="inline-flex flex-wrap gap-1 rounded-full bg-surface-strong p-1"
      role="radiogroup"
    >
      {options.map((option) => {
        const active = current === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2 text-[14px] font-medium leading-none transition-colors",
              active
                ? "bg-background shadow-sm"
                : "text-foreground/60 hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={active}
              onChange={() => {
                setCurrent(option.value);
                onChange?.(name, option.value);
              }}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

// start and end dates as month pickers; the end can be "still here"
function MonthWidget({
  field,
  value,
  invalid,
}: {
  field: Field;
  value: string;
  invalid?: boolean;
}) {
  const [present, setPresent] = useState(value === "present");
  const initial =
    value === "present" ? "" : value.length === 4 ? `${value}-01` : value;
  return (
    <div className="flex flex-wrap items-center gap-4">
      <input
        id={field.name}
        name={field.name}
        type="month"
        defaultValue={initial}
        disabled={present}
        aria-invalid={invalid || undefined}
        className={cn(inputClass, "max-w-[200px] disabled:opacity-40")}
      />
      {field.presentLabel && (
        <label className="flex cursor-pointer items-center gap-2 text-[14px]">
          <input
            type="checkbox"
            name={`${field.name}__present`}
            checked={present}
            onChange={(e) => setPresent(e.target.checked)}
            className="size-4 accent-foreground"
          />
          {field.presentLabel}
        </label>
      )}
    </div>
  );
}

// filled in from another field until the user edits it by hand
function SlugWidget({
  field,
  value,
  values,
  invalid,
}: {
  field: Field;
  value: string;
  values: Record<string, unknown>;
  invalid?: boolean;
}) {
  const [touched, setTouched] = useState(Boolean(value));
  const [manual, setManual] = useState(value);
  const derived = field.from ? slugify(String(values[field.from] ?? "")) : "";
  const shown = touched ? manual : derived;
  return (
    <div className="flex items-center gap-2">
      <input
        id={field.name}
        name={field.name}
        type="text"
        value={shown}
        onChange={(e) => {
          setTouched(true);
          setManual(slugify(e.target.value) || e.target.value);
        }}
        aria-invalid={invalid || undefined}
        className={cn(inputClass, "font-mono text-[14px]")}
        placeholder={field.from ? "filled in automatically" : undefined}
      />
      {touched && field.from && (
        <button
          type="button"
          onClick={() => {
            setTouched(false);
            setManual("");
          }}
          className="shrink-0 text-[13px] font-medium text-foreground/55 hover:text-foreground"
        >
          Reset
        </button>
      )}
    </div>
  );
}

function ImageWidget({ field, value }: { field: Field; value: string }) {
  const [removed, setRemoved] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const current = value && !removed ? mediaUrl(value) : null;
  const shown = preview ?? current;
  return (
    <div className="flex flex-wrap items-start gap-4">
      {shown && (
        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-strong">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shown} alt="" className="size-full object-cover" />
        </div>
      )}
      <div className="min-w-[220px] flex-1 space-y-2">
        <ImageInput
          name={field.name}
          required={field.required && !current}
          onPreview={(url) => {
            setPreview(url);
            setRemoved(false);
          }}
        />
        {current && !preview && !field.required && (
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-foreground/65">
            <input
              type="checkbox"
              name={`${field.name}__remove`}
              checked={removed}
              onChange={(e) => setRemoved(e.target.checked)}
              className="size-4 accent-foreground"
            />
            Remove the current photo
          </label>
        )}
      </div>
    </div>
  );
}

// click on the photo to choose what the crop keeps in view
function FocusWidget({
  field,
  value,
  values,
}: {
  field: Field;
  value: string;
  values: Record<string, unknown>;
}) {
  const imageId = field.from ? values[field.from] : null;
  const [x, y] = (value || "50% 50%")
    .split(" ")
    .map((v) => parseFloat(v) || 50);
  const [point, setPoint] = useState({ x, y });
  if (typeof imageId !== "string" || !imageId) {
    return (
      <p className="text-[13px] text-foreground/45">
        Add a photo and save, then pick the focus here.
      </p>
    );
  }
  return (
    <div>
      <div
        className="relative aspect-[4/3] w-full max-w-[320px] cursor-crosshair overflow-hidden rounded-xl bg-surface-strong"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPoint({
            x: Math.round(((e.clientX - r.left) / r.width) * 100),
            y: Math.round(((e.clientY - r.top) / r.height) * 100),
          });
        }}
      >
        <Image
          src={mediaUrl(imageId)}
          alt=""
          fill
          sizes="320px"
          className="object-contain"
        />
        <span
          className="pointer-events-none absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-foreground/70 shadow"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        />
      </div>
      <input
        type="hidden"
        name={field.name}
        value={`${point.x}% ${point.y}%`}
      />
      <p className={helpClass}>
        Click where the subject is, so crops keep it in view.
      </p>
    </div>
  );
}
