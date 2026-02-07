import { useState } from "react"
import arrowLeftIcon from "@/assets/icons/arrow-left.svg"
import arrowRightIcon from "@/assets/icons/arrow-right.svg"
import useMediaQuery from "@/shared/hooks/useMediaQuery"
import { clsx } from "clsx"
import { CalendarUtil } from "../utils/calendarUtil"
import CommonWeekCalendar from "./CommonWeekCalendar"

export interface ICalendarClassNames {
    header?: string
    arrow?: string
    weekday?: string
    date?: string
    selectedDate?: string
}

interface IMonthCalendarProps {
    selectedDate: Date | null
    displayMonth: Date
    onSelect: (d: Date) => void
    onChangeMonth: (d: Date) => void
    classNames?: ICalendarClassNames
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
    classNames,
    responsive = true,
}: IMonthCalendarProps) => {
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const [sheetOpen, setSheetOpen] = useState(false)
    const showDesktop = !responsive || isDesktop

    const firstDay = new Date(
        displayMonth.getFullYear(),
        displayMonth.getMonth(),
        1,
    )
    const start = CalendarUtil.startOfWeek(firstDay, 0)
    const days = Array.from({ length: 42 }).map((_, i) => CalendarUtil.addDays(start, i))

    const renderMonthGrid = (selectHandler: (d: Date) => void) => (
        <div className="w-full border-none flex flex-col gap-[15px] bg-transparent rounded-[24px]">
            <div className={isDesktop ? "react-calendar__navigation" : "react-calendar__navigation_mo"}>
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
                    className={clsx("px-2", classNames?.arrow)}
                >
                    <img src={arrowLeftIcon} alt="이전 달" />
                </button>

                <div className={clsx("font-semibold", classNames?.header)}>
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
                    className={clsx("px-2", classNames?.arrow)}
                >
                    <img src={arrowRightIcon} alt="다음 달" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center mt-[10px]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div
                        key={d}
                        className={clsx("text-[16px] text-point-yellow leading-[1.4]", classNames?.weekday)}
                    >
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
                                    isSelected && [
                                        "rounded-full bg-point-yellow text-black",
                                        classNames?.selectedDate,
                                    ],
                                    !isSelected && ["text-grayscale-bg-gray", classNames?.date],
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

    if (showDesktop) {
        return renderMonthGrid(onSelect)
    }

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
                classNames={classNames}
            />
            {sheetOpen && (
                <div
                    className="fixed inset-0 bg-black/30 flex items-center justify-center"
                    onClick={() => setSheetOpen(false)}
                >
                    <div
                        className="bg-primary-blue-dark rounded-2xl w-full max-w-[480px] px-6 py-2"
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
