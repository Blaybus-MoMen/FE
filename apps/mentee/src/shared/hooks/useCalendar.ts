import { useState } from "react"

/**
 * @description 단일 캘린더(CommonMonthCalendar)용 상태 훅
 * - selectedDate, displayMonth + setter만 제공
 */
const useCalendar = (initialDate?: Date | null) => {
    const today = new Date()
    const initial = initialDate ?? today

    const [selectedDate, setSelectedDate] = useState<Date | null>(initial)
    const [displayMonth, setDisplayMonth] = useState(
        new Date(initial.getFullYear(), initial.getMonth(), 1)
    )

    return {
        selectedDate,
        setSelectedDate,
        displayMonth,
        setDisplayMonth,
    }
}
export default useCalendar