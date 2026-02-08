import type { ITodoResponse } from '@/entities/manage/api/manage.api.type';

/** 모달 종류를 구분하는 키 상수 */
export const MODAL_KEY = {
    ALERT: 'ALERT',
    CONFIRM: 'CONFIRM',
    TODO: 'TODO',
} as const;

/** MODAL_KEY에서 추출한 모달 키 타입  */
export type ModalKey = keyof typeof MODAL_KEY;

/** 공통 모달 스타일 변형 (성공/에러/경고) */
export type ModalVariant = 'success' | 'error' | 'warning';

/** 알림 모달용 변형*/
export type AlertVariant = Exclude<ModalVariant, 'warning'>;
/** 확인 모달용 변형 */
export type ConfirmVariant = Exclude<ModalVariant, 'error'>;

/** 열린 알림 모달 타입 */
export interface OpenedAlertModal {
    key: 'ALERT';
    data?: ModalPayloadMap['ALERT'];
}

/** 열린 확인 모달 타입 */
export interface OpenedConfirmModal {
    key: 'CONFIRM';
    data?: ModalPayloadMap['CONFIRM'];
}

/** ALERT, CONFIRM을 제외한 나머지 모달 키  */
export type GenericModalKey = Exclude<ModalKey, 'ALERT' | 'CONFIRM'>;

/** ALERT/CONFIRM 외 공통 모달 타입 */
export interface OpenedGenericModal {
    key: GenericModalKey;
    data?: ModalPayloadMap[GenericModalKey];
}

/** 열린 모달의 유니온 타입 */
export type OpenedModal = OpenedAlertModal | OpenedConfirmModal | OpenedGenericModal;

/** 모달 키별로 전달하는 페이로드 타입 맵 */
export interface ModalPayloadMap {
    ALERT: {
        message?: string;
        variant?: AlertVariant;
    };
    CONFIRM: {
        message?: string;
        variant?: ConfirmVariant;
        onConfirm?: () => void;
    };
    TODO: {
        mode: 'create' | 'edit';
        menteeId: number;
        todo?: ITodoResponse;
    };
}
