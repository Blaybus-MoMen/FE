import Calendar from 'react-calendar';
import ArrowLeftSvg from '@/assets/icons/arrow-left.svg';
import ArrowRightSvg from '@/assets/icons/arrow-right.svg';
import { useState } from 'react';
import type { CalendarValue } from '@/shared/model/type';

/**
 * @description 미팅 캘린더 컴포넌트
 */
const MeetingCalendar = () => {
    const [date, setDate] = useState<CalendarValue>(new Date());

    return (
        <Calendar
            locale="ko-KR"
            calendarType="gregory"
            formatShortWeekday={(_, date) =>
                date.toLocaleDateString('en-US', { weekday: 'short' })
            }
            formatDay={(_, date) => String(date.getDate())}
            showNeighboringMonth={false}
            onChange={(value) => setDate(value)}
            value={date}
            view="month"
            minDetail="month"
            maxDetail="month"
            prev2Label={null}
            next2Label={null}
            prevLabel={<img src={ArrowLeftSvg} alt="arrow-left" />}
            nextLabel={<img src={ArrowRightSvg} alt="arrow-right" />}
        />
    )
}

export default MeetingCalendar;