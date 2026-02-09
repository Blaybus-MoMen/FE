import arrowLeftIcon from '@/assets/icons/arrow-left.svg';
import arrowRightIcon from '@/assets/icons/arrow-right.svg';
import { CalendarUtil } from '../utils/calendarUtil';
import { useEffect } from 'react';

interface IWeeklyCalendarProps {
    weekBaseDate: Date;
    selectedDate: Date | null;
    displayMonth: Date;
    setWeekBaseDate: (d: Date) => void;
    setDisplayMonth: (d: Date) => void;
    setSelectedDate: (d: Date) => void;
    onOpenSheet: () => void;
    showWeekend: boolean;

    headerClassName?: string;
    arrowClassName?: string;
    weekdayClassName?: string;
    dateClassName?: string;
    selectedDateClassName?: string;
}

/**
 * @description 주 캘린더 컴포넌트
 */
const WeeklyCalendar = ({
    weekBaseDate,
    selectedDate,
    displayMonth,
    setWeekBaseDate,
    setDisplayMonth,
    setSelectedDate,
    onOpenSheet,
    showWeekend,
}: IWeeklyCalendarProps) => {
    const weekStart = showWeekend ? 0 : 1;
    const daysCount = showWeekend ? 7 : 5;

    const weekStartDate = CalendarUtil.startOfWeek(weekBaseDate, weekStart);

    const getWeekDays = (base: Date) => Array.from({ length: daysCount }).map((_, i) => CalendarUtil.addDays(base, i));

    const days = getWeekDays(weekStartDate);

    const hasAnyDayInMonth = (weekStart: Date, month: Date) =>
        getWeekDays(weekStart).some((d) => CalendarUtil.isSameMonth(d, month));

    const moveWeek = (dir: -1 | 1) => {
        const nextWeekStart = CalendarUtil.addDays(weekStartDate, dir * 7);
        const nextMonth = new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), 1);

        if (!CalendarUtil.isSameMonth(displayMonth, nextMonth) && hasAnyDayInMonth(weekStartDate, nextMonth)) {
            setDisplayMonth(nextMonth);
            return;
        }

        if (hasAnyDayInMonth(nextWeekStart, nextMonth)) {
            setWeekBaseDate(nextWeekStart);
            setDisplayMonth(nextMonth);
            return;
        }
        let probe = nextWeekStart;
        while (true) {
            const m = new Date(probe.getFullYear(), probe.getMonth(), 1);
            if (hasAnyDayInMonth(probe, m)) {
                setWeekBaseDate(probe);
                setDisplayMonth(m);
                return;
            }
            probe = CalendarUtil.addDays(probe, dir * 7);
        }
    };
    const moveMonth = (dir: -1 | 1) => {
        const nextMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + dir, 1);

        if (hasAnyDayInMonth(weekStartDate, nextMonth)) {
            setDisplayMonth(nextMonth);
            return;
        }

        let probe = CalendarUtil.firstWeekOfMonth(nextMonth, weekStart);
        while (!hasAnyDayInMonth(probe, nextMonth)) {
            probe = CalendarUtil.addDays(probe, 7);
        }

        setWeekBaseDate(probe);
        setDisplayMonth(nextMonth);
    };

    const selectDate = (d: Date) => {
        const selected = new Date(d);

        setSelectedDate(selected);
        setWeekBaseDate(CalendarUtil.startOfWeek(selected, showWeekend ? 0 : 1));
    };

    return (
        <div className="w-full border-none flex flex-col gap-4 md:gap-[35px] bg-transparent rounded-[24px] px-4 py-3 md:px-6 md:py-5">
            <div className="react-calendar__navigation_mo">
                <button onClick={() => moveMonth(-1)} className="px-2">
                    <img src={arrowLeftIcon} alt="이전 달" />
                </button>
                <button onClick={onOpenSheet} className="font-semibold">
                    {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
                </button>
                <button onClick={() => moveMonth(1)} className="px-2">
                    <img src={arrowRightIcon} alt="다음 달" />
                </button>
            </div>
            <div className="flex items-center justify-between">
                <button onClick={() => moveWeek(-1)} className="text-grayscale-bg-gray text-[24px]">
                    <img src={arrowLeftIcon} alt="이전 주" />
                </button>
                <div className="flex flex-1 justify-between mx-1 md:mx-2">
                    {days.map((day) => {
                        const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                        const isCurrentMonth = CalendarUtil.isSameMonth(day, displayMonth);
                        const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;

                        return (
                            <button
                                key={key}
                                onClick={() => selectDate(day)}
                                className="flex flex-col items-center flex-1 mx-1"
                            >
                                <span className="text-[12px] md:text-[16px] text-point-yellow leading-[1.4] mb-[4px] md:mb-[8px]">
                                    {day.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                    })}
                                </span>
                                <span
                                    className={`
                                        text-[0.875rem] md:text-[1rem] leading-[1.7] flex items-center justify-center
                                        w-[30px] h-[30px] md:w-[38px] md:h-[38px]
                                        ${
                                            isSelected
                                                ? 'bg-point-yellow text-black rounded-full'
                                                : 'text-grayscale-bg-gray'
                                        }
                                        ${!isCurrentMonth ? 'text-medium-gray' : ''}
                                    `}
                                >
                                    {day.getDate()}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <button onClick={() => moveWeek(1)} className="text-grayscale-bg-gray text-[24px]">
                    <img src={arrowRightIcon} alt="다음 주" />
                </button>
            </div>
        </div>
    );
};

export default WeeklyCalendar;
