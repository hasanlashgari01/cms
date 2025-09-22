import { Product } from "@/types/product.types";
import Image from "next/image";

const LatestProductItem: React.FC<Product> = ({ image_url, title, category, price }) => {
  return (
    <div className="flex items-center justify-between text-xs md:text-sm lg:text-base">
      <div className="flex items-center gap-x-4">
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
        <div>
          <h3>{title}</h3>
          <h4 className="text-secondary-300">{category.title}</h4>
        </div>
      </div>
      <div>
        <h3>{price.toLocaleString()} $</h3>
      </div>
    </div>
  );
};

export default LatestProductItem;
