"use client";

import Image from "next/image";
import { useActionState } from "react";
import type { Field, Row } from "@/lib/admin/resources";
import { mediaUrl } from "@/lib/media-url";
import type { FormState } from "../actions";
import { ImageInput } from "./image-input";
import {
  helpClass,
  inputClass,
  labelClass,
  primaryButton,
  submitWithoutReset,
} from "./ui";

function FieldInput({ field, value }: { field: Field; value: unknown }) {
  const { name, type, required } = field;
  const text = value == null ? "" : String(value);

  switch (type) {
    case "textarea":
      return (
        <textarea
          id={name}
          name={name}
          defaultValue={text}
          required={required}
          rows={3}
          className={inputClass}
        />
      );
    case "markdown":
      return (
        <textarea
          id={name}
          name={name}
          defaultValue={text}
          required={required}
          rows={24}
          className={`${inputClass} font-mono text-[14px] leading-relaxed`}
        />
      );
    case "lines":
      return (
        <textarea
          id={name}
          name={name}
          defaultValue={Array.isArray(value) ? value.join("\n") : ""}
          rows={5}
          className={inputClass}
        />
      );
    case "select":
      return (
        <select
          id={name}
          name={name}
          defaultValue={text || field.options?.[0]?.value}
          className={inputClass}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return (
        <input
          id={name}
          name={name}
          type="checkbox"
          defaultChecked={Boolean(value)}
          className="size-4 accent-foreground"
        />
      );
    case "image":
      return (
        <div className="space-y-3">
          {typeof value === "string" && (
            <div className="flex items-center gap-4">
              <div className="relative size-24 overflow-hidden rounded-lg border border-border bg-secondary">
                <Image
                  src={mediaUrl(value)}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              {!required && (
                <label className="flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    name={`${name}__remove`}
                    className="size-4 accent-foreground"
                  />
                  remove
                </label>
              )}
            </div>
          )}
          <ImageInput name={name} required={required && !value} />
        </div>
      );
    default:
      return (
        <input
          id={name}
          name={name}
          type="text"
          inputMode={type === "number" ? "decimal" : undefined}
          defaultValue={text}
          required={required}
          className={inputClass}
        />
      );
  }
}

export function RecordForm({
  fields,
  record,
  action,
}: {
  fields: Field[];
  record: Row | null;
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form onSubmit={submitWithoutReset(formAction)} className="space-y-6">
      {fields.map((field) => {
        // a new essay is published and a new record is otherwise unticked
        const value = record
          ? record[field.name]
          : field.name === "published"
            ? true
            : undefined;
        const inline = field.type === "checkbox";
        return (
          <div key={field.name}>
            <div className={inline ? "flex items-center gap-3" : undefined}>
              {inline && <FieldInput field={field} value={value} />}
              <label
                htmlFor={field.name}
                className={inline ? "text-[14px] font-semibold" : labelClass}
              >
                {field.label}
                {field.required && !inline && (
                  <span className="text-foreground/40"> *</span>
                )}
              </label>
              {!inline && <FieldInput field={field} value={value} />}
            </div>
            {field.help && <p className={helpClass}>{field.help}</p>}
          </div>
        );
      })}
      {state.error && (
        <p role="alert" className="text-[14px] text-destructive">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "saving…" : "save"}
      </button>
    </form>
  );
}
