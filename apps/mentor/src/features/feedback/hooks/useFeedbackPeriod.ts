import { useMemo, useState } from 'react';

type Mode = 'daily' | 'weekly' | 'monthly';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

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

    return { label, movePrev, moveNext };
};
