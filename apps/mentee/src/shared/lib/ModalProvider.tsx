import { createPortal } from "react-dom"
import { useModalStore } from "../store/modal.store"
import AlertModal from "../ui/modal/AlertModal"
import ConfirmModal from "../ui/modal/ConfirmModal"
import type { GenericModalKey, ModalPayloadMap } from "../model/modal"
import type { ComponentType } from "react"


/** 일반 모달 컴포넌트 매핑 */
const GENERIC_MODALS: Partial<Record<GenericModalKey, ComponentType<unknown>>> = {}

const ModalProvider = () => {
    const modals = useModalStore((state) => state.modals)
    if (!modals.length) return null
    return createPortal(
        <>
            {modals.map((modal) => {
                if (modal.key === 'ALERT') return <AlertModal key={modal.key} {...(modal.data as ModalPayloadMap['ALERT'])} />
                if (modal.key === 'CONFIRM') return <ConfirmModal key={modal.key} {...(modal.data as ModalPayloadMap['CONFIRM'])} />

                const Component = GENERIC_MODALS[modal.key as keyof typeof GENERIC_MODALS]
                return Component ? <Component key={modal.key} {...modal.data} /> : null
            })}
        </>,
        document.body
    )
}


export default ModalProvider