export type Subjects = 'KOREAN' | 'ENGLISH' | 'MATH';

/** 멘티 카드 타입 */
export interface IMenteeCardResponse {
    menteeId: number;
    userId: number;
    name: string;
    profileImageUrl: string | null;
    grade: string;
    subjects: Subjects[];
    cards: string[];
}

export type CreatorType = 'MENTOR' | 'MENTEE';

export interface ITodoResponse {
    todoId: number;
    title: string;
    subject: Subjects;
    goalDescription: string;
    startDate: string;
    endDate: string;
    mentorConfirmed: boolean;
    creatorType: CreatorType;
    hasFeedback: boolean;

    materials?: {
        fileUrl: string;
        fileName: string;
    }[];
}

/** Todo 확인 토글 요청 */
export interface ITodoConfirmRequest {
    confirmed: boolean;
}

/** Todo 생성 요청 타입 */
export interface CreateTodoRequest {
    title: string;
    subject: Subjects;
    goalDescription: string;
    startDate: string;
    endDate: string;
    repeatDays?: string[];
    materials: {
        fileUrl: string;
        fileName: string;
    }[];
}

/** Todo 생성 응답 타입 */
export interface CreateTodoResponse {
    success: boolean;
    message: string;
    data: number[];
    errorCode?: string;
}

/** Todo 수정 요청 타입 */
export interface UpdateTodoRequest {
    title: string;
    subject: Subjects;
    goalDescription: string;
    startDate: string;
    endDate: string;
    isCompleted?: boolean;
    studyTime?: number;
    materials: {
        fileUrl: string;
        fileName: string;
    }[];
}

/** Todo 상세 정보 응답 타입 */
export interface ITodoDetailResponse {
    todoId: number;
    title: string;
    subject: Subjects;
    goalDescription: string;
    startDate: string;
    endDate: string;
    mentorConfirmed: boolean;
    creatorType: CreatorType;
    isCompleted: boolean;
    hasFeedback: boolean;
    studyTimeHours: string;
    studyTimeMinutes: string;
    studyTimeSeconds: string;
    materials: {
        fileUrl: string;
        fileName: string;
    }[];
}
