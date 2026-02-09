import { SUBJECT_COLOR, SUBJECT_NAME } from '@/shared/constants/constants'

/**
 * 공통 유틸리티 함수
 */
export class CommonUtil {
    /**
     * @description Date를 "YYYY-MM-DD" 형식 문자열로 변환
     * @param date 날짜
     * @returns "2026-02-25" 형식 문자열
     */
    static formatDateToYYYYMMDD(date: Date): string {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    /**
     * @description 과목 코드로 과목명 반환 (KOREAN → 국어 등)
     * @param subjectKey 과목 코드 (KOREAN, ENGLISH, MATH 등)
     * @returns 일치하는 과목명, 없으면 빈 문자열
     */
    static getSubjectName(subjectKey: string): string {
        return SUBJECT_NAME[subjectKey as keyof typeof SUBJECT_NAME] ?? ''
    }

    /**
     * @description 과목 코드로 색상 클래스 반환 (constants.ts SUBJECT_COLOR 기준)
     * @param subjectKey 과목 코드 (KOREAN, ENGLISH, MATH 등)
     * @returns 일치하는 Tailwind 배경 클래스 (국어: sky, 영어: purple, 수학: yellow), 없으면 빈 문자열
     */
    static getSubjectColor(subjectKey: string): string {
        const subjectName = this.getSubjectName(subjectKey)
        return SUBJECT_COLOR[subjectName as keyof typeof SUBJECT_COLOR] ?? ''
    }
}
