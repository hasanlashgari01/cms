"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  defaultSelected?: string;
  className?: string;
}

export default function ImageUploader({
  value = null,
  onChange,
  defaultSelected,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof value === "string" && value !== "") {
      setPreview(value);
    } else {
      setPreview(defaultSelected ?? "");
    }
  }, [value, defaultSelected]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onChange?.(selectedFile);
  };

  const handleRemove = () => {
    setPreview("");
    onChange?.(null);
  };

  return (
    <div className="relative inline-flex flex-col gap-4">
      <label htmlFor="file" aria-label="آپلود تصویر">
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className={className}>
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              width={224}
              height={224}
              className="size-full rounded-3xl object-cover shadow"
            />
          ) : (
            <div className="flex size-full items-center justify-center rounded-3xl bg-gray-100 dark:bg-gray-900"></div>
          )}
        </div>
      </label>
      {preview !== defaultSelected && (
        <button
          type="button"
          className="flex-center absolute top-2 right-2 size-6 cursor-pointer rounded-full border-2 border-none bg-white text-xs dark:bg-gray-700"
          onClick={handleRemove}
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
