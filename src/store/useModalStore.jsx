import {create} from "zustand/react";

const useModalStore = create((set) => ({
    isModalOpen: false,
    type: null,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    setType: (type) => set({ type}),
}));

export default useModalStore;
