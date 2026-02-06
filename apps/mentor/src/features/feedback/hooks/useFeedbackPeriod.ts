import { useMemo, useState } from 'react';

type Mode = 'daily' | 'weekly' | 'monthly';

export const useFeedbackPeriod = (mode: Mode) => {
    const [baseDate, setBaseDate] = useState(new Date());

    const label = useMemo(() => {
        const year = baseDate.getFullYear();
        const month = baseDate.getMonth();

        if (mode === 'monthly') {
            return `${month + 1}월`;
        }

        if (mode === 'weekly') {
            const firstDay = new Date(year, month, 1);
            const week = Math.ceil((baseDate.getDate() + firstDay.getDay()) / 7);
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
                    prev.getDate() - (mode === 'weekly' ? 7 : 0)
                )
        );
    };

    const moveNext = () => {
        setBaseDate(
            (prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() + (mode === 'monthly' ? 1 : 0),
                    prev.getDate() + (mode === 'weekly' ? 7 : 0)
                )
        );
    };

    return { label, movePrev, moveNext };
};
