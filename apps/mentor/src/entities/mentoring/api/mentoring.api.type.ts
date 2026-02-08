export type Subjects = 'KOREAN' | 'ENGLISH' | 'MATH';

/** 멘티 카드 타입 */
export interface IMenteeCard {
    menteeId: number;
    userId: number;
    name: string;
    profileImageUrl: string | null;
    grade: string;
    subjects: Subjects[];
    cards: string[];
}

/** 멘티 목록 조회 응답 요청 타입 */
export type IGetMenteeListResponse = IMenteeCard[];
