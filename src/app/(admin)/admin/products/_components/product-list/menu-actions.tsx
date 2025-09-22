import { cn } from "@/utils/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowPathIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/20/solid";
import { MenuActionsProps } from "./product.types";
import { useDeleteModal, useUpdateModal } from "../../../_/providers/modal-provider";

const MenuActions: React.FC<MenuActionsProps> = ({ id }) => {
  const { openUpdateModal } = useUpdateModal();
  const { openDeleteModal } = useDeleteModal();

  return (
    <Menu as="div" className="relative hidden sm:flex basis-10 justify-center">
      <MenuButton className="flex-center size-8 rounded hover:bg-slate-400/30 focus:outline-none">
        <EllipsisVerticalIcon className="size-5" />
      </MenuButton>

      <MenuItems
        className={cn(
          "absolute top-full left-0 z-10 mt-4 w-40 rounded-lg bg-gray-200 p-1 shadow-xl focus:outline-none dark:bg-slate-800",
        )}
      >
        <MenuItem>
          <div
            onClick={() => openUpdateModal(id)}
            className="flex cursor-pointer gap-x-2 rounded-lg p-2 text-sm transition-colors hover:bg-amber-400 hover:text-white dark:hover:bg-amber-500"
          >
            <ArrowPathIcon className="size-5" />
            <span>به‌روزرسانی</span>
          </div>
        </MenuItem>

        <MenuItem>
          <div
            onClick={() => openDeleteModal(id)}
            className="flex cursor-pointer gap-x-2 rounded-lg p-2 text-sm transition-colors hover:bg-red-400 hover:text-white dark:text-white dark:hover:bg-red-500"
          >
            <TrashIcon className="size-5" />
            <span>حذف</span>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default MenuActions;
