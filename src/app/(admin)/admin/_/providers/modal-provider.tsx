"use client";

import { createContext, useContext, useState } from "react";

type ModalContextProps = {
  id: string | number | null;
  isDeleteModal: boolean;
  openDeleteModal: (id: string | number) => void;
  closeDeleteModal: () => void;
  isUpdateModal: boolean;
  openUpdateModal: (id: string | number) => void;
  closeUpdateModal: () => void;
};

const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [id, setId] = useState<string | number | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);

  const openDeleteModal = (id: string | number) => {
    setId(id);
    setIsDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setId(null);
    setIsDeleteModal(false);
  };

  const openUpdateModal = (id: string | number) => {
    setId(id);
    setIsUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setId(null);
    setIsUpdateModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        id,
        isDeleteModal,
        openDeleteModal,
        closeDeleteModal,
        isUpdateModal,
        openUpdateModal,
        closeUpdateModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useDeleteModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useDeleteModal باید داخل ModalProvider استفاده بشه");
  }

  const { id, isDeleteModal, openDeleteModal, closeDeleteModal } = context;

  return {
    id,
    isDeleteModal,
    openDeleteModal,
    closeDeleteModal,
  };
};

export const useUpdateModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useDeleteModal باید داخل ModalProvider استفاده بشه");
  }

  const { id, isUpdateModal, openUpdateModal, closeUpdateModal } = context;

  return {
    id,
    isUpdateModal,
    openUpdateModal,
    closeUpdateModal,
  };
};
