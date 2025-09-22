import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ModalCreateProps } from "./modal.types";

const ModalCreate: React.FC<ModalCreateProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 transition-colors dark:bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 text-gray-900 shadow-lg transition-colors dark:bg-gray-800 dark:text-gray-100">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <div className="mt-4">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalCreate;
