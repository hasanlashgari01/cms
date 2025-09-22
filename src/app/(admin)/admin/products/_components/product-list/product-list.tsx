"use client";

import { Dropdown } from "@/app/_components/dropdown/dropdown";
import Pagiantion from "@/app/_components/pagination/pagiantion";
import { Button } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteModal } from "../../../_/components/modal/delete-modal";
import ModalCreate from "../../../_/components/modal/modal-create";
import { UpdateModal } from "../../../_/components/modal/update-modal";
import Search from "../../../_/components/search/search";
import { deleteProduct, getProducts } from "../../../_/services/products";
import { SortBy } from "../../../_/types/product-query.types";
import CreateProduct from "../product-form/create-product";
import ProductForm from "../product-form/product-form";
import ProductItem from "./product-item";
import { Product } from "@/types/product.types";
import Loading from "@/app/_components/loading/loading";

const options: { value: SortBy; label: string }[] = [
  { value: "created_at", label: "جدیدترین" },
  { value: "views", label: "پربازدیدترین" },
  { value: "price", label: "گران ترین" },
];

const ProductList: React.FC = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [sort, setSort] = useState<SortBy>("created_at");
  const [open, setOpen] = useState<boolean>(false);

  const search: string = searchParams.get("q") ?? "";
  const page: number = Number(searchParams.get("page")) || 1;
  const limit: number = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    setIsLoading(true);
    getProducts({ page, limit, search, sortBy: sort })
      .then(({ data, totalPages }) => {
        setProducts(data || []);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, limit, search, sort]);

  return (
    <>
      <div className="flex justify-between gap-3 max-md:flex-col">
        <Search />
        <div className="flex gap-4">
          <Dropdown options={options} value={sort} onChange={setSort} />
          <Button className="btn" onClick={() => setOpen(true)}>
            ایجاد محصول
          </Button>
        </div>
      </div>
      <div className="box h-185 min-h-120 md:h-200">
        <div className="divide-secondary-100/50 dark:divide-secondary-800 divide-y-1">
          {isLoading ? (
            <Loading />
          ) : products?.length > 0 ? (
            products?.map((product) => <ProductItem key={product.id} {...product} />)
          ) : (
            <td colSpan={3} className="border p-2 text-center">
              محصولی یافت نشد
            </td>
          )}
        </div>
      </div>
      <Pagiantion currentPage={page} totalPages={totalPages} />

      <UpdateModal title="آپدیت محصول">
        <ProductForm />
      </UpdateModal>
      <DeleteModal text="محصول" onDelete={deleteProduct} />
      <ModalCreate isOpen={open} onClose={() => setOpen(false)} title="ایجاد محصول">
        <CreateProduct />
      </ModalCreate>
    </>
  );
};

export default ProductList;
