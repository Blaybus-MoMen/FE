import { useState } from "react"

const useRangeCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [displayMonth, setDisplayMonth] = useState<Date>(new Date())
    const [rangeStart, setRangeStart] = useState<Date | null>(null)
    const [rangeEnd, setRangeEnd] = useState<Date | null>(null)

    const handleRangeSelect = (d: Date) => {
        if (rangeStart == null || (rangeStart != null && rangeEnd != null)) {
            setRangeStart(d)
            setRangeEnd(null)
            setSelectedDate(d)
        } else {
            if (d.getTime() < rangeStart.getTime()) {
                setRangeStart(d)
                setRangeEnd(rangeStart)
            } else {
                setRangeEnd(d)
            }
            setSelectedDate(d)
        }
        setDisplayMonth(new Date(d.getFullYear(), d.getMonth(), 1))
    }
    const effectiveSelectedDate = selectedDate ?? (rangeEnd ?? rangeStart)

    return {
        rangeStart,
        rangeEnd,
        displayMonth,
        handleRangeSelect,
        effectiveSelectedDate,
        setDisplayMonth,
    }
}

export default useRangeCalendar