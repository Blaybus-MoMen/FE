import arrowLeftIcon from '@/assets/icons/arrow-left.svg';
import arrowRightIcon from '@/assets/icons/arrow-right.svg';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import { clsx } from 'clsx';
import { CalendarUtil } from '../utils/calendarUtil';

export interface ICalendarClassNames {
    header?: string;
    arrow?: string;
    weekday?: string;
    date?: string;
    selectedDate?: string;
    range?: string;
}
interface IMonthRangeCalendarProps {
    selectedDate: Date | null;
    displayMonth: Date;
    onSelect: (d: Date) => void;
    onChangeMonth: (d: Date) => void;
    rangeStart?: Date | null;
    rangeEnd?: Date | null;
    classNames?: ICalendarClassNames;
}

/**
 * @description 월 캘린더 컴포넌트 (단일 선택 + 구간 선택)
 */
const CommonMonthRangeCalendar = ({
    selectedDate,
    displayMonth,
    onSelect,
    onChangeMonth,
    rangeStart = null,
    rangeEnd = null,
    classNames,
}: IMonthRangeCalendarProps) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const firstDay = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1);
    const start = CalendarUtil.startOfWeek(firstDay, 0);
    const days = Array.from({ length: 42 }).map((_, i) => CalendarUtil.addDays(start, i));
    return (
        <div className="w-full border-none flex flex-col gap-[15px] bg-transparent rounded-[24px]">
            <div className={isDesktop ? 'react-calendar__navigation' : 'react-calendar__navigation_mo'}>
                <button
                    type="button"
                    onClick={() => onChangeMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1))}
                    className={clsx('px-2', classNames?.arrow)}
                >
                    <img src={arrowLeftIcon} alt="이전 달" />
                </button>

                <div className={clsx('font-semibold', classNames?.header)}>
                    {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
                </div>

                <button
                    type="button"
                    onClick={() => onChangeMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1))}
                    className={clsx('px-2', classNames?.arrow)}
                >
                    <img src={arrowRightIcon} alt="다음 달" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center mt-[10px]">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className={clsx('text-[16px] text-point-yellow leading-[1.4]', classNames?.weekday)}>
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-[10px]">
                {days.map((day) => {
                    const isCurrentMonth = CalendarUtil.isSameMonth(day, displayMonth);
                    const hasRange = rangeStart != null && rangeEnd != null;
                    const isRangeStart = hasRange && CalendarUtil.isSameDay(day, rangeStart);
                    const isRangeEnd = hasRange && CalendarUtil.isSameDay(day, rangeEnd);
                    const isSameDayRange = hasRange && CalendarUtil.isSameDay(rangeStart, rangeEnd);
                    const isInRange =
                        hasRange &&
                        !isRangeStart &&
                        !isRangeEnd &&
                        CalendarUtil.isBetweenInclusive(day, rangeStart, rangeEnd);
                    const isOnlyStartSet =
                        rangeStart != null && rangeEnd == null && CalendarUtil.isSameDay(day, rangeStart);
                    const isSelectedSingle =
                        (!hasRange && selectedDate !== null && CalendarUtil.isSameDay(day, selectedDate)) ||
                        isOnlyStartSet;
                    const isSelected = isRangeStart || isRangeEnd || isSelectedSingle;

                    const rangeShapeClass =
                        hasRange && (isRangeStart || isRangeEnd)
                            ? isSameDayRange
                                ? 'rounded-full'
                                : isRangeStart
                                  ? 'rounded-l-full'
                                  : 'rounded-r-full'
                            : isInRange
                              ? 'rounded-none'
                              : '';

                    const isRangeFilled = hasRange && (isInRange || isSelected);
                    const isSingleSelected = !hasRange && isSelected;

                    if (!isCurrentMonth) {
                        return <div key={day.toISOString()} className="min-h-[38px]" />;
                    }
                    return (
                        <button
                            type="button"
                            key={day.toISOString()}
                            onClick={() => onSelect(day)}
                            className={clsx(
                                'flex min-h-[38px] w-full items-center justify-center',
                                isRangeFilled && [
                                    classNames?.range ?? 'bg-point-yellow text-black',
                                    !classNames?.range && classNames?.selectedDate,
                                    isInRange
                                        ? rangeShapeClass
                                        : (isRangeStart || isRangeEnd) && !isSameDayRange
                                          ? rangeShapeClass
                                          : 'rounded-full',
                                ]
                            )}
                        >
                            <span
                                className={clsx(
                                    'text-[1rem] leading-[1.7] flex h-[38px] w-[38px] items-center justify-center',
                                    isSingleSelected && [
                                        'rounded-full bg-point-yellow text-black',
                                        classNames?.selectedDate,
                                    ],
                                    !isSingleSelected && !isRangeFilled && ['text-grayscale-bg-gray', classNames?.date]
                                )}
                            >
                                {day.getDate()}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CommonMonthRangeCalendar;
