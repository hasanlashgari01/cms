"use client";

import { Dropdown } from "@/app/_components/dropdown/dropdown";
import { Table } from "../_/types/tables.types";
import { useState } from "react";
import { Button } from "@headlessui/react";

type Format = "json" | "csv";

const tableOptions: { value: Table; label: string }[] = [
  { value: "products", label: "محصولات" },
  { value: "users", label: "کاربران" },
  { value: "comments", label: "نظرات" },
  { value: "discounts", label: "کد تخفیف" },
  { value: "tickets", label: "تیکت ها" },
];

const formatOptions: { value: Format; label: string }[] = [
  { value: "json", label: "JSON" },
  { value: "csv", label: "CSV" },
];

const ExportPage = () => {
  const [entity, setEntity] = useState<Table>("products");
  const [format, setFormat] = useState<Format>("json");

  const handleDownload = () => window.open(`/api/export/${entity}/${format}`, "_blank");

  return (
    <div className="box h-full p-5">
      <div className="max-w-xl">
        <h1 className="text-xl font-bold lg:text-2xl">خروجی گرفتن از دیتابیس</h1>
        <div className="mt-5 flex gap-5">
          <Dropdown value={entity} onChange={setEntity} options={tableOptions} />
          <Dropdown value={format} onChange={setFormat} options={formatOptions} />
        </div>
        <Button className="btn mt-5" onClick={handleDownload}>
          دانلود
        </Button>
      </div>
    </div>
  );
};

export default ExportPage;
