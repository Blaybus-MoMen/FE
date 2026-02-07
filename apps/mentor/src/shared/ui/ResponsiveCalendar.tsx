import useMediaQuery from "@/shared/hooks/useMediaQuery"
import { type ReactNode } from "react"
import WeeklyCalendar from "@/shared/ui/WeekCalendar"

export interface ResponsiveCalendarProps {
    /** PC(1024px 이상)에서 보여줄 캘린더. 모바일 시트 열었을 때도 동일 컴포넌트 사용 */
    desktop: ReactNode
    /** true면 항상 데스크톱 UI만 표시(모바일에서도 위클리 없이 desktop만) */
    forceDesktop?: boolean
    /** 모바일 WeeklyCalendar + 시트용 상태 (forceDesktop이면 미사용) */
    selectedDate: Date | null
    setSelectedDate: (d: Date | null) => void
    weekBaseDate: Date
    setWeekBaseDate: (d: Date) => void
    displayMonth: Date
    setDisplayMonth: (d: Date) => void
    sheetOpen: boolean
    setSheetOpen: (open: boolean) => void
    /** WeeklyCalendar 스타일 (모바일) */
    classNames?: {
        header?: string
        arrow?: string
        weekday?: string
        date?: string
        selectedDate?: string
    }
}

/**
 * @description 반응형 캘린더: PC에서는 desktop만, 모바일에서는 WeeklyCalendar + 시트(시트 안에는 desktop).
 * forceDesktop이면 항상 desktop만 표시.
 */
const ResponsiveCalendar = ({
    desktop,
    forceDesktop = false,
    selectedDate,
    setSelectedDate,
    weekBaseDate,
    setWeekBaseDate,
    displayMonth,
    setDisplayMonth,
    sheetOpen,
    setSheetOpen,
    classNames,
}: ResponsiveCalendarProps) => {
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const showDesktop = forceDesktop || isDesktop
    if (showDesktop) {
        return <>{desktop}</>
    }
    return (
        <>
            <WeeklyCalendar
                weekBaseDate={weekBaseDate}
                selectedDate={selectedDate}
                displayMonth={displayMonth}
                setWeekBaseDate={setWeekBaseDate}
                setDisplayMonth={setDisplayMonth}
                setSelectedDate={setSelectedDate}
                showWeekend={true}
                onOpenSheet={() => setSheetOpen(true)}
                headerClassName={classNames?.header}
                arrowClassName={classNames?.arrow}
                weekdayClassName={classNames?.weekday}
                dateClassName={classNames?.date}
                selectedDateClassName={classNames?.selectedDate}
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
                        {desktop}
                    </div>
                </div>
            )}
        </>
    )
}

export default ResponsiveCalendar
