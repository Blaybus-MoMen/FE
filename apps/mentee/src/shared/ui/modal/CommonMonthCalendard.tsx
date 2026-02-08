import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { clsx } from "clsx"
import { CalendarUtil } from "@/shared/utils/calendarUtil"
import CommonWeekCalendar from "../CommonWeekCalendar"

interface IMonthCalendarProps {
    selectedDate: Date | null
    displayMonth: Date
    onSelect: (d: Date) => void
    onChangeMonth: (d: Date) => void
    responsive?: boolean
}

/**
 * @description 월 캘린더 컴포넌트. responsive 시 모바일에서는 위클리 + 시트(월 캘린더).
 */
const CommonMonthCalendar = ({
    selectedDate,
    displayMonth,
    onSelect,
    onChangeMonth,
}: IMonthCalendarProps) => {
    const [sheetOpen, setSheetOpen] = useState(false)

    const firstDay = new Date(
        displayMonth.getFullYear(),
        displayMonth.getMonth(),
        1,
    )
    const start = CalendarUtil.startOfWeek(firstDay, 0)
    const days = Array.from({ length: 42 }).map((_, i) => CalendarUtil.addDays(start, i))

    const renderMonthGrid = (selectHandler: (d: Date) => void) => (
        <div className="w-full border-none flex flex-col gap-[15px] bg-transparent rounded-[24px]">
            <div className={"react-calendar__navigation_mo"}>
                <button
                    onClick={() =>
                        onChangeMonth(
                            new Date(
                                displayMonth.getFullYear(),
                                displayMonth.getMonth() - 1,
                                1,
                            ),
                        )
                    }
                    className="px-2"
                    aria-label="이전 달"
                >
                    <ChevronLeft size={18} className="text-grayscale-black" />
                </button>

                <div className="font-semibold text-base text-grayscale-black">
                    {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
                </div>

                <button
                    onClick={() =>
                        onChangeMonth(
                            new Date(
                                displayMonth.getFullYear(),
                                displayMonth.getMonth() + 1,
                                1,
                            ),
                        )
                    }
                    className="px-2"
                    aria-label="다음 달"
                >
                    <ChevronRight size={18} className="text-grayscale-black" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center mt-[10px]">
                {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                    <div key={d} className="text-[16px] text-grayscale-black leading-[1.4]">
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-[10px]">
                {days.map((day) => {
                    const isCurrentMonth = CalendarUtil.isSameMonth(day, displayMonth)
                    const isSelected =
                        selectedDate !== null && CalendarUtil.isSameDay(day, selectedDate)

                    if (!isCurrentMonth) {
                        return <div key={day.toISOString()} className="min-h-[38px]" />
                    }
                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => selectHandler(day)}
                            className={clsx(
                                "flex min-h-[38px] w-full items-center justify-center",
                            )}
                        >
                            <span
                                className={clsx(
                                    "text-[1rem] leading-[1.7] flex h-[38px] w-[38px] items-center justify-center",
                                    isSelected && "rounded-full bg-primary-blue text-white",
                                    !isSelected && "text-grayscale-black",
                                )}
                            >
                                {day.getDate()}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
    const weekBaseDate = selectedDate ?? displayMonth
    return (
        <>
            <CommonWeekCalendar
                weekBaseDate={weekBaseDate}
                selectedDate={selectedDate}
                displayMonth={displayMonth}
                setWeekBaseDate={(d) => {
                    onSelect(d)
                    onChangeMonth(new Date(d.getFullYear(), d.getMonth(), 1))
                }}
                setDisplayMonth={onChangeMonth}
                setSelectedDate={(d) => onSelect(d)}
                showWeekend={true}
                onOpenSheet={() => setSheetOpen(true)}
            />
            {sheetOpen && (
                <div
                    className="fixed inset-0 z-[999] bg-black/30 flex items-center justify-center"
                    onClick={() => setSheetOpen(false)}
                >
                    <div
                        className="rounded-2xl w-full max-w-[320px] px-4 py-[15px] shadow-xl bg-background-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {renderMonthGrid((d) => {
                            onSelect(d)
                            setSheetOpen(false)
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default CommonMonthCalendar
