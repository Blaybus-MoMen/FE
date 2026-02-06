import type { AlertVariant } from '@/shared/model/modal'
import { useModalActions } from '@/shared/store/modal.store'
import { CheckCircle, XCircle } from 'lucide-react'

interface IAlertModalProps {
    message?: string
    variant?: AlertVariant
}

const variantConfig = {
    success: {
        Icon: CheckCircle,
        iconBgClass: 'bg-system-success/10',
        iconColorClass: 'text-system-success',
    },
    error: {
        Icon: XCircle,
        iconBgClass: 'bg-system-error/10',
        iconColorClass: 'text-system-error',
    },
} as const

const AlertModal = ({ message, variant = 'success' }: IAlertModalProps) => {
    const { Icon, iconBgClass, iconColorClass } = variantConfig[variant]

    const { closeAlert } = useModalActions();

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
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        type="button"
                        onClick={closeAlert}
                        className={'w-full md:max-w-[458px] h-14 bg-primary-blue hover:bg-primary-blue-dark text-white rounded-full px-6 py-4 mt-12 ui-button'}
                    >
                        확인
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AlertModal