"use client";

import Image from "next/image";
import Status from "../../../_/components/status/status";
import { updateProductStatus } from "../../../_/services/products";
import MenuActions from "./menu-actions";
import { ProductItemProps } from "./product.types";

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  title,
  price,
  image_url,
  views,
  category,
  is_active,
}) => {
  const handleUpdateStatus = async () => {
    await updateProductStatus(id, !is_active).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-2 not-last:not-first:py-1 first:pb-1 last:pt-1 md:gap-4">
      <div className="flex-center size-16 shrink-0 overflow-hidden px-1 py-4 sm:h-17.5 md:w-33 md:px-2">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            width={100}
            height={100}
            className="w-full object-cover"
          />
        ) : (
          <div className="flex-center size-full rounded-md bg-gray-100 text-xs text-gray-500 dark:bg-gray-800">
            بدون عکس
          </div>
        )}
      </div>
      <div className="flex flex-1 items-center justify-between gap-x-4 pl-4 text-xs md:text-sm lg:text-base">
        <div className="w-36 sm:w-44 md:w-56 lg:w-64">
          <h1 className="line-clamp-1 w-full">{title}</h1>
          <h2 className="text-secondary-300 mt-2 lg:hidden">{category.title}</h2>
        </div>
        <div className="flex-1 text-center max-lg:hidden">{category.title}</div>
        <div className="text-center sm:flex-1">{price.toLocaleString()} $</div>
        <div className="flex-1 text-center max-sm:hidden">{views}</div>
        <Status is_active={is_active} onClick={handleUpdateStatus} />
        <MenuActions id={id} />
      </div>
    </div>
  );
};

export default ProductItem;
