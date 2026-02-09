
import type { ConfirmVariant } from '@/shared/model/modal'
import { useModalActions } from '@/shared/store/modal.store'
import { AlertTriangle, CheckCircle } from 'lucide-react'

interface IConfirmModalProps {
    message?: string
    variant?: ConfirmVariant
    onConfirm?: () => void
}

const variantConfig = {
    success: {
        Icon: CheckCircle,
        iconBgClass: 'bg-system-success/10',
        iconColorClass: 'text-system-success',
    },
    warning: {
        Icon: AlertTriangle,
        iconBgClass: 'bg-system-warning/10',
        iconColorClass: 'text-system-warning',
    },
} as const

/**
 * @description Confirm 모달 컴포넌트
 */
const ConfirmModal = ({ message, variant = 'success', onConfirm }: IConfirmModalProps) => {
    const { Icon, iconBgClass, iconColorClass } = variantConfig[variant]
    const { closeConfirm } = useModalActions();
    return (
        <div
            className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/50 p-6"
            role="presentation"
        >
            <div
                className="flex w-full max-w-[480px] flex-col items-center gap-5 rounded-2xl border border-gray-300 bg-white px-10 py-8 shadow-sm"
                role="dialog"
            >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBgClass}`}>
                    <Icon className={`h-10 w-10 ${iconColorClass}`} aria-hidden />
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                    {message && (
                        <p className="whitespace-pre-wrap text-base font-medium leading-relaxed text-gray-600">
                            {message}
                        </p>
                    )}
                </div>
                <div className="flex w-full gap-3">
                    <button
                        type="button"
                        onClick={closeConfirm}
                        className="w-full h-14 rounded-full border-2 border-grayscale-border bg-white px-6 py-4 mt-12 text-grayscale-dark-gray hover:bg-grayscale-bg-gray ui-button"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm?.()
                            closeConfirm()
                        }}
                        className="w-full h-14 rounded-full bg-primary-blue px-6 py-4 mt-12 text-white hover:bg-primary-blue-dark ui-button"
                    >
                        확인
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ConfirmModal