import { ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarUtil } from "../utils/calendarUtil"

interface WeekCalendarHeaderProps {
    displayMonth: Date
    weekStartDate: Date
    weekStart: number
    onPrev: () => void
    onNext: () => void
    onClick?: () => void
    onlyMonth?: boolean
}

/**
 * @description "2026년 2월 3째주" 형식 + 좌우 화살표를 가진 독립 헤더 (onPrev/onNext로 주 이동 또는 월 이동 등 동작 지정)
 */
const WeekCalendarHeader = ({
    displayMonth,
    weekStartDate,
    weekStart,
    onPrev,
    onNext,
    onClick,
    onlyMonth = false,
}: WeekCalendarHeaderProps) => {
    const firstWeek = CalendarUtil.firstWeekOfMonth(displayMonth, weekStart)
    const diffMs = weekStartDate.getTime() - firstWeek.getTime()
    const diffWeeks = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000))
    const weekNumber = Math.max(1, 1 + diffWeeks)

    const label = onlyMonth ? `${displayMonth.getFullYear()}년 ${displayMonth.getMonth() + 1}월` : `${displayMonth.getFullYear()}년 ${displayMonth.getMonth() + 1}월 ${weekNumber}째주`

    return (
        <div className="flex w-fit mx-auto justify-between items-center text-[24px] leading-[1.35] text-grayscale-bg-gray pb-[16px]">
            <button type="button" onClick={onPrev} className="px-5" aria-label="이전">
                <ChevronLeft size={18} className="text-grayscale-black" />
            </button>
            <button
                type="button"
                onClick={onClick}
                className="font-normal text-base text-grayscale-black"
            >
                {label}
            </button>
            <button type="button" onClick={onNext} className="px-5" aria-label="다음">
                <ChevronRight size={18} className="text-grayscale-black" />
            </button>
        </div>
    )
}

export default WeekCalendarHeader
