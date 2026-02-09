import { createPortal } from "react-dom"
import { useModalStore } from "../store/modal.store"
import AlertModal from "../ui/modal/AlertModal"
import ConfirmModal from "../ui/modal/ConfirmModal"
import type { GenericModalKey, ModalPayloadMap } from "../model/modal"
import type { ComponentType } from "react"
import LearningAddModal from "@/features/manage/ui/LearningAddModal"
import LearningInspectionModal from "@/features/manage/ui/LearningInspectionModal"
import FeedbackConfirmModal from "@/features/manage/ui/FeedbackConfirmModal"
import WeekFeedbackModal from "@/features/manage/ui/WeekFeedbackModal"
import MonthFeedbackModal from "@/features/manage/ui/MonthFeedbackModal"
import CheerUpdateModal from "@/features/home/ui/CheerUpdateModal"
import FeatureModal from "@/features/mypage/ui/FeatureModal"
import LearningEditModal from "@/features/manage/ui/LearningEditModal"


/** 일반 모달 컴포넌트 매핑 */
const GENERIC_MODALS: Partial<Record<GenericModalKey, ComponentType<unknown>>> = {
    LEARNING_ADD: LearningAddModal as ComponentType<unknown>,
    LEARNING_INSPECTION: LearningInspectionModal as ComponentType<unknown>,
    FEEDBACK_CONFIRM: FeedbackConfirmModal,
    WEEK_FEEDBACK: WeekFeedbackModal as ComponentType<unknown>,
    MONTH_FEEDBACK: MonthFeedbackModal as ComponentType<unknown>,
    CHEER_UPDATE: CheerUpdateModal as ComponentType<unknown>,
    FEATURE: FeatureModal as ComponentType<unknown>,
    LEARNING_EDIT: LearningEditModal as ComponentType<unknown>,
}
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