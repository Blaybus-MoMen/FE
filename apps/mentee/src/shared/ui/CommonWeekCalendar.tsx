import { ChevronLeft, ChevronRight } from "lucide-react"
import { clsx } from "clsx"
import { CalendarUtil } from "../utils/calendarUtil"

interface IWeeklyCalendarProps {
    weekBaseDate: Date
    selectedDate: Date | null
    displayMonth: Date
    setWeekBaseDate: (d: Date) => void
    setDisplayMonth: (d: Date) => void
    setSelectedDate: (d: Date) => void
    onOpenSheet: () => void
    showWeekend: boolean
}

/**
 * @description 주 캘린더 컴포넌트
 */
const CommonWeekCalendar = ({
    weekBaseDate,
    selectedDate,
    displayMonth,
    setWeekBaseDate,
    setDisplayMonth,
    setSelectedDate,
    onOpenSheet,
    showWeekend,
}: IWeeklyCalendarProps) => {
    const weekStart = showWeekend ? 0 : 1
    const daysCount = showWeekend ? 7 : 5

    const weekStartDate = CalendarUtil.startOfWeek(weekBaseDate, weekStart)

    const getWeekDays = (base: Date) =>
        Array.from({ length: daysCount }).map((_, i) => CalendarUtil.addDays(base, i))

    const days = getWeekDays(weekStartDate)

    const hasAnyDayInMonth = (weekStart: Date, month: Date) =>
        getWeekDays(weekStart).some((d) => CalendarUtil.isSameMonth(d, month))

    const moveWeek = (dir: -1 | 1) => {
        const nextWeekStart = CalendarUtil.addDays(weekStartDate, dir * 7)
        const nextMonth = new Date(
            nextWeekStart.getFullYear(),
            nextWeekStart.getMonth(),
            1,
        )

        if (
            !CalendarUtil.isSameMonth(displayMonth, nextMonth) &&
            hasAnyDayInMonth(weekStartDate, nextMonth)
        ) {
            setDisplayMonth(nextMonth)
            return
        }

        if (hasAnyDayInMonth(nextWeekStart, nextMonth)) {
            setWeekBaseDate(nextWeekStart)
            setDisplayMonth(nextMonth)
            return
        }
        let probe = nextWeekStart
        while (true) {
            const m = new Date(probe.getFullYear(), probe.getMonth(), 1)
            if (hasAnyDayInMonth(probe, m)) {
                setWeekBaseDate(probe)
                setDisplayMonth(m)
                return
            }
            probe = CalendarUtil.addDays(probe, dir * 7)
        }
    }
    const moveMonth = (dir: -1 | 1) => {
        const nextMonth = new Date(
            displayMonth.getFullYear(),
            displayMonth.getMonth() + dir,
            1,
        )

        if (hasAnyDayInMonth(weekStartDate, nextMonth)) {
            setDisplayMonth(nextMonth)
            return
        }

        let probe = CalendarUtil.firstWeekOfMonth(nextMonth, weekStart)
        while (!hasAnyDayInMonth(probe, nextMonth)) {
            probe = CalendarUtil.addDays(probe, 7)
        }

        setWeekBaseDate(probe)
        setDisplayMonth(nextMonth)
    }

    const selectDate = (d: Date) => {
        setSelectedDate(d)
        setWeekBaseDate(d)
        setDisplayMonth(new Date(d.getFullYear(), d.getMonth(), 1))
    }

    return (
        <div className="w-full border-none flex flex-col gap-4 md:gap-[35px] bg-transparent rounded-[24px] px-4 py-3 md:px-6 md:py-5">
            <div className="react-calendar__navigation_mo">
                <button onClick={() => moveMonth(-1)} className="px-2" aria-label="이전 달">
                    <ChevronLeft size={18} className="text-grayscale-black" />
                </button>
                <button onClick={onOpenSheet} className="font-semibold text-base text-grayscale-black">
                    {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
                </button>
                <button onClick={() => moveMonth(1)} className="px-2" aria-label="다음 달">
                    <ChevronRight size={18} className="text-grayscale-black" />
                </button>
            </div>
            <div className="flex items-center justify-between">
                <button onClick={() => moveWeek(-1)} className="text-grayscale-black" aria-label="이전 주">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex flex-1 justify-between mx-1 md:mx-2">
                    {days.map((day) => {
                        const isSelected =
                            selectedDate &&
                            day.toDateString() === selectedDate.toDateString()
                        const isCurrentMonth = CalendarUtil.isSameMonth(day, displayMonth)
                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => selectDate(day)}
                                className="flex flex-col items-center flex-1 mx-1"
                            >
                                <span className="text-[11px] md:text-[14px] leading-[1.4] mb-[4px] md:mb-[8px] text-grayscale-black">
                                    {day.toLocaleDateString("ko-KR", {
                                        weekday: "short",
                                    })}
                                </span>
                                <span
                                    className={clsx(
                                        "text-[0.75rem] md:text-[0.875rem] leading-[1.7] flex items-center justify-center w-[28px] h-[28px] md:w-[34px] md:h-[34px]",
                                        isSelected && "rounded-full bg-primary-blue text-white",
                                        !isSelected && "text-grayscale-black",
                                        !isCurrentMonth && "text-medium-gray",
                                    )}
                                >
                                    {day.getDate()}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <button onClick={() => moveWeek(1)} className="text-grayscale-black" aria-label="다음 주">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}


export default CommonWeekCalendar;