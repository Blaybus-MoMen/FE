import { useMemo, useState } from 'react';

type Mode = 'daily' | 'weekly' | 'monthly';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

/** 날짜를 YYYY-MM 형식으로 변환 */
const toYearMonth = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
};

/** 날짜를 YYYY-MM-DD 형식으로 변환 */
const toDateString = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

/** 해당 날짜가 속한 주의 월요일을 구함 */
const getWeekStartDate = (d: Date) => {
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
    return toDateString(monday);
};

export const useFeedbackPeriod = (mode: Mode) => {
    const [baseDate, setBaseDate] = useState(new Date());

    const label = useMemo(() => {
        const year = baseDate.getFullYear();
        const month = baseDate.getMonth();
        const date = baseDate.getDate();
        const day = DAY_LABELS[baseDate.getDay()];

        if (mode === 'daily') {
            return `${month + 1}월 ${date}일 (${day})`;
        }

        if (mode === 'monthly') {
            return `${month + 1}월`;
        }

        if (mode === 'weekly') {
            const firstDay = new Date(year, month, 1);
            const week = Math.ceil((date + firstDay.getDay()) / 7);
            return `${month + 1}월 ${week}째 주`;
        }

        return '';
    }, [baseDate, mode]);

    const movePrev = () => {
        setBaseDate(
            (prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() - (mode === 'monthly' ? 1 : 0),
                    prev.getDate() - (mode === 'weekly' ? 7 : mode === 'daily' ? 1 : 0)
                )
        );
    };

    const moveNext = () => {
        setBaseDate(
            (prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() + (mode === 'monthly' ? 1 : 0),
                    prev.getDate() + (mode === 'weekly' ? 7 : mode === 'daily' ? 1 : 0)
                )
        );
    };

    /** API 호출용 날짜 파라미터 */
    const dateParams = useMemo(() => {
        return {
            yearMonth: toYearMonth(baseDate),
            weekStartDate: getWeekStartDate(baseDate),
            date: toDateString(baseDate),
            year: baseDate.getFullYear(),
            month: baseDate.getMonth() + 1,
        };
    }, [baseDate]);

    return { label, movePrev, moveNext, baseDate, dateParams };
};
