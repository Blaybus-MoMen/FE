
/**
 * 캘린더 유틸리티 함수
 */
export class CalendarUtil {
    /**
     * @description 날짜에 일 수를 더함
     * @param date 날짜
     * @param days 일 수
     * @returns 날짜
     */
    static addDays(date: Date, days: number) {
        const d = new Date(date)
        d.setDate(d.getDate() + days)
        return d
    }
    /**
     * @description 날짜를 주간 시작 날짜로 변환
     * @param date 날짜
     * @param weekStart 주간 시작 요일
     * @returns 날짜
     */
    static startOfWeek(date: Date, weekStart: number) {
        const d = new Date(date)
        const diff = (d.getDay() - weekStart + 7) % 7
        d.setDate(d.getDate() - diff)
        return d
    }
    /**
     * @description 날짜가 같은 달인지 확인
     * @param a 날짜
     * @param b 날짜
     * @returns 날짜가 같은 달인지 여부
     */
    static isSameMonth(a: Date, b: Date) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
    }

    /** 같은 날인지 (년월일) */
    static isSameDay(a: Date, b: Date) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
    }

    /** day가 [start, end] 구간 안에 있는지 (start, end 정규화됨) */
    static isBetweenInclusive(day: Date, start: Date, end: Date) {
        const t = day.getTime()
        const s = start.getTime()
        const e = end.getTime()
        return t >= Math.min(s, e) && t <= Math.max(s, e)
    }
    /**
     * @description 월의 첫 번째 주 날짜 반환
     * @param month 월
     * @param weekStart 주간 시작 요일
     * @returns 월의 첫 번째 주 날짜
     */
    static firstWeekOfMonth(month: Date, weekStart: number) {
        return this.startOfWeek(
            new Date(month.getFullYear(), month.getMonth(), 1),
            weekStart,
        )
    }
}
