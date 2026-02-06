/** 모달 키 타입 */
export const MODAL_KEY = {
    ALERT: 'ALERT',
    CONFIRM: 'CONFIRM',
    FEEDBACK: 'FEEDBACK',
} as const

export type ModalKey = keyof typeof MODAL_KEY

export type ModalVariant = 'success' | 'error' | 'warning'

export type AlertVariant = Exclude<ModalVariant, 'warning'>
export type ConfirmVariant = Exclude<ModalVariant, 'error'>

export interface OpenedAlertModal {
    key: 'ALERT'
    data?: ModalPayloadMap['ALERT']
}

export interface OpenedConfirmModal {
    key: 'CONFIRM'
    data?: ModalPayloadMap['CONFIRM']
}

export type GenericModalKey = Exclude<ModalKey, 'ALERT' | 'CONFIRM'>

export interface OpenedGenericModal {
    key: GenericModalKey
    data?: ModalPayloadMap[GenericModalKey]
}


export type OpenedModal =
    | OpenedAlertModal
    | OpenedConfirmModal
    | OpenedGenericModal


/** 모달 페이로드 타입 */
export interface ModalPayloadMap {
    ALERT: {
        message?: string
        variant?: AlertVariant
    }
    CONFIRM: {
        message?: string
        variant?: ConfirmVariant
        onConfirm?: () => void
    }
    FEEDBACK: {
        id?: string
    }
}