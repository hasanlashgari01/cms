import { JSX } from "react";

export type ModalProps = {
  children: React.ReactNode;
  selectedItem: number | null;
  handleCancel: () => void;
};

export type ModalCreateProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export type UpdateModalProps = {
  children: JSX.Element;
  title: string;
};

export type DeleteModalProps = {
  text: string;
  onDelete: (id: number) => Promise<number | null>;
};
