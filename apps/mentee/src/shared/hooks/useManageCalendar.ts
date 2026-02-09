import { useState } from "react";

/**
 * @description 관리 페이지용 캘린더 훅
 * - 월 이동 시에도 현재 선택된 날짜(일자)를 최대한 유지
 *   (해당 달에 없는 일자는 그 달의 마지막 날로 보정)
 */
const useManageCalendar = (initialDate?: Date | null) => {
    const today = new Date();
    const initial = initialDate ?? today;

    const [selectedDate, setSelectedDate] = useState<Date>(initial);
    const [displayMonth, setDisplayMonth] = useState<Date>(
        new Date(initial.getFullYear(), initial.getMonth(), 1),
    );

    /**
     * @description 월을 이동하면서 선택된 일자를 유지
     * @param dir -1: 이전 달, 1: 다음 달
     */
    const moveMonth = (dir: -1 | 1) => {
        const base = selectedDate ?? displayMonth;

        const targetYear = displayMonth.getFullYear();
        const targetMonthIndex = displayMonth.getMonth() + dir;

        const lastDayOfTargetMonth = new Date(targetYear, targetMonthIndex + 1, 0).getDate();

        const targetDay = Math.min(base.getDate(), lastDayOfTargetMonth);

        const nextSelected = new Date(targetYear, targetMonthIndex, targetDay);

        setSelectedDate(nextSelected);
        setDisplayMonth(new Date(nextSelected.getFullYear(), nextSelected.getMonth(), 1));
    };

    return {
        selectedDate,
        setSelectedDate,
        displayMonth,
        setDisplayMonth,
        moveMonth,
    };
};

export default useManageCalendar;

