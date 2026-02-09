import arrowLeftIcon from '@/assets/icons/arrow-left.svg';
import arrowRightIcon from '@/assets/icons/arrow-right.svg';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import { CalendarUtil } from '../utils/calendarUtil';

interface IMonthCalendarProps {
    selectedDate: Date | null;
    displayMonth: Date;
    onSelect: (d: Date) => void;
    onChangeMonth: (d: Date) => void;
}

/**
 * @description 월 캘린더 컴포넌트
 */
const MonthCalendar = ({ selectedDate, displayMonth, onSelect, onChangeMonth }: IMonthCalendarProps) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const firstDay = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1);

    const start = CalendarUtil.startOfWeek(firstDay, 0);
    const days = Array.from({ length: 42 }).map((_, i) => CalendarUtil.addDays(start, i));

    return (
        <div className="w-full border-none flex flex-col gap-[20px] bg-transparent rounded-[24px] px-4 py-4">
            <div className={isDesktop ? 'react-calendar__navigation' : 'react-calendar__navigation_mo'}>
                <button
                    onClick={() => onChangeMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1))}
                    className="px-2"
                >
                    <img src={arrowLeftIcon} alt="이전 달" />
                </button>

                <div className="font-semibold">
                    {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
                </div>

                <button
                    onClick={() => onChangeMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1))}
                    className="px-2"
                >
                    <img src={arrowRightIcon} alt="다음 달" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-[16px] text-point-yellow leading-[1.4] mb-[16px]">
                        {d}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-[27px]">
                {days.map((day) => {
                    const isSelected = selectedDate !== null && day.toDateString() === selectedDate.toDateString();

                    const isCurrentMonth = CalendarUtil.isSameMonth(day, displayMonth);

                    const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;

                    if (!isCurrentMonth) {
                        return <div key={key} />;
                    }
                    return (
                        <button
                            key={key}
                            onClick={() => onSelect(day)}
                            className="flex flex-col items-center justify-center"
                        >
                            <span
                                className={`
                                    text-[1rem] leading-[1.7] flex items-center justify-center
                                    w-[38px] h-[38px]
                                    ${isSelected ? 'bg-point-yellow text-black rounded-full' : 'text-grayscale-bg-gray'}
                                `}
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

export default MonthCalendar;
