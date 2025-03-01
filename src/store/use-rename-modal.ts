import { create } from "zustand";

const defaultValues: { id: string | null; title: string } = {
  id: null,
  title: "",
};

interface RenameModalStore {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

const useRenameModal = create<RenameModalStore>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
}));

export { useRenameModal };
