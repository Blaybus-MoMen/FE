import { useState } from 'react';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import WeeklyCalendar from '@/shared/ui/WeekCalendar';
import MonthCalendar from '@/shared/ui/MonthCalendar';

interface Props {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

/**
 * @description 캘린더 컴포넌트
 */
const Calendar = ({ selectedDate, onSelectDate }: Props) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [weekBaseDate, setWeekBaseDate] = useState(selectedDate);
    const [displayMonth, setDisplayMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <>
            {isDesktop ? (
                <MonthCalendar
                    selectedDate={selectedDate}
                    displayMonth={displayMonth}
                    onSelect={(d) => {
                        onSelectDate(d);
                        setWeekBaseDate(d);
                        setDisplayMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                    }}
                    onChangeMonth={setDisplayMonth}
                />
            ) : (
                <WeeklyCalendar
                    weekBaseDate={weekBaseDate}
                    selectedDate={selectedDate}
                    displayMonth={displayMonth}
                    setWeekBaseDate={setWeekBaseDate}
                    setDisplayMonth={setDisplayMonth}
                    setSelectedDate={onSelectDate}
                    showWeekend={true}
                    onOpenSheet={() => setSheetOpen(true)}
                />
            )}
            {sheetOpen && (
                <div
                    className="fixed inset-0 bg-black/30 flex items-center justify-center"
                    onClick={() => setSheetOpen(false)}
                >
                    <div
                        className="bg-primary-blue-dark rounded-2xl w-full max-w-[480px] px-6 py-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MonthCalendar
                            selectedDate={selectedDate}
                            displayMonth={displayMonth}
                            onSelect={(d) => {
                                onSelectDate(d);
                                setWeekBaseDate(d);
                                setDisplayMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                                setSheetOpen(false);
                            }}
                            onChangeMonth={setDisplayMonth}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Calendar;
