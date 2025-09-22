"use client";

import Pagiantion from "@/app/_components/pagination/pagiantion";
import { DeleteModal } from "../../../_/components/modal/delete-modal";
import { UpdateModal } from "../../../_/components/modal/update-modal";
import { deleteDiscount, getDiscounts } from "../../../_/services/discounts";
import UpdateDiscount from "../discount-form/update-discount";
import DiscountItem from "./discount-item";
import ModalCreate from "../../../_/components/modal/modal-create";
import { Dropdown } from "@/app/_components/dropdown/dropdown";
import Search from "../../../_/components/search/search";
import { Button } from "@headlessui/react";
import { SortBy } from "../../../_/types/discount-query.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Discount } from "@/types/discount.types";
import CreateDiscount from "../discount-form/create-discount";
import Loading from "@/app/_components/loading/loading";

const options: { value: SortBy; label: string }[] = [
  { value: "percentage", label: "بیشترین تخفیف" },
  { value: "expires_at", label: "نزدیک‌ترین انقضا" },
  { value: "used_count", label: "پرمصرف‌ترین" },
  { value: "created_at", label: "جدیدترین" },
];

const DiscountList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [sort, setSort] = useState<SortBy>("created_at");
  const [open, setOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const page: number = Number(searchParams.get("page")) || 1;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const search: string = searchParams.get("q") ?? "";

  useEffect(() => {
    setIsLoading(true);
    getDiscounts({ page, limit, search, sortBy: sort })
      .then(({ data, totalPages }) => {
        setDiscounts(data || []);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, limit, search, sort]);

  return (
    <>
      <div className="flex justify-between">
        <Search />
        <div className="flex gap-4">
          <Dropdown options={options} value={sort} onChange={setSort} />
          <Button className="btn" onClick={() => setOpen(true)}>
            ایجاد کد تخفیف
          </Button>
        </div>
      </div>
      <div className="box h-195 min-h-120">
        <div className="divide-secondary-100/50 dark:divide-secondary-800 divide-y-1">
          {isLoading ? (
            <Loading />
          ) : discounts?.length > 0 ? (
            discounts?.map((discount) => <DiscountItem key={discount.id} {...discount} />)
          ) : (
            <td colSpan={3} className="border p-2 text-center">
              کد تخفیف یافت نشد
            </td>
          )}
        </div>
      </div>
      <Pagiantion currentPage={page} totalPages={totalPages} />

      <UpdateModal title="آپدیت کد تخفیف">
        <UpdateDiscount />
      </UpdateModal>
      <DeleteModal text="کد تخفیف" onDelete={deleteDiscount} />
      <ModalCreate isOpen={open} onClose={() => setOpen(false)} title="ایجاد محصول">
        <CreateDiscount />
      </ModalCreate>
    </>
  );
};

export default DiscountList;
