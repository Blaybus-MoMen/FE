import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import type { ModalKey, ModalPayloadMap } from '@/shared/model/modal'

export interface OpenedModal<K extends ModalKey = ModalKey> {
    key: K
    data?: ModalPayloadMap[K]
}

interface ModalState {
    modals: OpenedModal[]
    openModal: <K extends ModalKey>(key: K, data?: ModalPayloadMap[K]) => void
    openAlert: (data?: ModalPayloadMap['ALERT']) => void
    openConfirm: (data?: ModalPayloadMap['CONFIRM']) => void
    closeModal: (modalKey: ModalKey) => void
    closeAll: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    modals: [],
    openModal: (key, data) =>
        set((state) => ({
            modals: [...state.modals, { key, data }],
        })),

    openAlert: (data) =>
        set((state) => ({
            modals: [...state.modals, { key: 'ALERT', data }],
        })),

    openConfirm: (data) =>
        set((state) => ({
            modals: [...state.modals, { key: 'CONFIRM', data }],
        })),

    closeModal: (modalKey: ModalKey) =>
        set((state) => ({
            modals: modalKey
                ? state.modals.filter((modal) => modal.key !== modalKey)
                : state.modals.slice(0, -1),
        })),
    closeAll: () => set({ modals: [] }),
}))

export const useModalActions = () => {
    const store = useModalStore(
        useShallow((state) => ({
            openModal: state.openModal,
            openAlert: state.openAlert,
            openConfirm: state.openConfirm,
            closeModal: state.closeModal,
            closeAll: state.closeAll,
        }))
    );
    return {
        ...store,
        closeAlert: () => store.closeModal('ALERT'),
        closeConfirm: () => store.closeModal('CONFIRM'),
    };
};