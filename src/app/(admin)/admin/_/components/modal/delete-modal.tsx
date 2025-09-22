import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTransition } from "react";
import { useDeleteModal } from "../../providers/modal-provider";
import { DeleteModalProps } from "./modal.types";

export const DeleteModal: React.FC<DeleteModalProps> = ({ text, onDelete }) => {
  const { id, isDeleteModal, closeDeleteModal } = useDeleteModal();
  const [isPending, startTransition] = useTransition();

  if (!id) return;

  const handleDelete = () => {
    startTransition(async () => {
      const status = await onDelete(id as number);
      if (status == 204) {
        closeDeleteModal();
        window.location.reload();
      }
    });
  };

  return (
    <Dialog
      open={isDeleteModal}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeDeleteModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 dark:bg-gray-800"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium">
              آیا مطمئن هستید که می‌خواهید این {text} را حذف کنید؟
            </DialogTitle>
            <div className="mt-4 flex gap-3">
              <Button
                className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                onClick={handleDelete}
              >
                {isPending ? "در حال پردازش..." : "حذف"}
              </Button>
              <Button
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                onClick={closeDeleteModal}
              >
                انصراف
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
