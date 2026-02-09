import { ChevronLeft, ChevronRight } from "lucide-react"

interface MonthCalendarHeaderProps {
    displayMonth: Date
    onPrev: () => void
    onNext: () => void
    onClick?: () => void
}

/**
 * @description "2026년 2월" 형식 + 좌우 화살표를 가진 월간 전용 헤더
 * - 디자인은 `WeekCalendarHeader`와 동일, 라벨만 월 단위
 */
const MonthCalendarHeader = ({
    displayMonth,
    onPrev,
    onNext,
    onClick,
}: MonthCalendarHeaderProps) => {
    const label = `${displayMonth.getFullYear()}년 ${displayMonth.getMonth() + 1}월`

    return (
        <div className="flex w-fit mx-auto justify-between items-center text-[24px] leading-[1.35] text-grayscale-bg-gray pb-[16px]">
            <button type="button" onClick={onPrev} className="px-5" aria-label="이전 달">
                <ChevronLeft size={18} className="text-grayscale-black" />
            </button>
            <button
                type="button"
                onClick={onClick}
                className="font-normal text-base text-grayscale-black"
            >
                {label}
            </button>
            <button type="button" onClick={onNext} className="px-5" aria-label="다음 달">
                <ChevronRight size={18} className="text-grayscale-black" />
            </button>
        </div>
    )
}

export default MonthCalendarHeader