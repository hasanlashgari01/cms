"use client";

import ImageUploader from "@/app/_components/image-uploader/image-uploader";
import { cn } from "@/utils/cn";
import { useState } from "react";

const NewProduct = () => {
  const [isShowModal, setIsShowModal] = useState(true);
  const [isActive, setIsActive] = useState<"no" | "yes">("no");

  return (
    <div className={cn("invisible fixed inset-0", { visible: isShowModal })}>
      <div
        className={cn("bg-secondary-900/50 invisible absolute inset-0 z-10", {
          visible: isShowModal,
        })}
        onClick={() => setIsShowModal(false)}
      ></div>
      <div className="border-primary-3 dark:bg-secondary-600 absolute inset-1/2 z-20 h-140 translate-x-1/2 -translate-y-1/2 overflow-y-scroll border-r bg-white p-4 sm:w-2xl">
        <h1>Create new product</h1>
        <form className="form mt-6 space-y-4">
          <input type="text" className="input" placeholder="عنوان" />
          <input type="text" className="input" placeholder="قیمت" />
          <textarea name="" id="" cols={30} placeholder="توضیحات" className="input"></textarea>
          <div className="flex items-center gap-x-5">
            <span>Is Active</span>
            <div className="flex flex-1">
              <input
                type="radio"
                name="is_active"
                id="no"
                className="peer hidden appearance-none border-none"
                value={isActive}
                onChange={() => setIsActive("no")}
                checked={isActive === "no"}
              />
              <label
                htmlFor="no"
                className="bg-secondary-100 w-full flex-1 cursor-pointer rounded-3xl py-2 text-center"
              >
                No
              </label>
            </div>
            <div className="flex flex-1">
              <input
                type="radio"
                name="is_active"
                id="yes"
                className="peer hidden appearance-none border-none"
                value={isActive}
                onChange={() => setIsActive("yes")}
                checked={isActive === "yes"}
              />
              <label htmlFor="yes" className="bg-secondary w-full flex-1 cursor-pointer">
                Yes
              </label>
            </div>
          </div>
          <ImageUploader />
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
