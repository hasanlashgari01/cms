import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useUpdateModal } from "../../providers/modal-provider";
import { UpdateModalProps } from "./modal.types";

export const UpdateModal: React.FC<UpdateModalProps> = ({ children, title }) => {
  const { id, isUpdateModal, closeUpdateModal } = useUpdateModal();

  if (!id) return;

  return (
    <Dialog
      open={isUpdateModal}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeUpdateModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 dark:bg-gray-800"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium">
              {title}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
