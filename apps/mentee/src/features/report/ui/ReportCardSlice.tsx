import { useState, useRef, useCallback, useEffect } from 'react';
import { ReportCard } from './ReportCard';
import { useGetWeeklyStudyTimeQuery } from '@/entities/study/queries/study.queries';

const CARD_WIDTH = 164;
const GAP = 16;
const CARD_STEP = CARD_WIDTH + GAP;





export const ReportCardSlice = ({ date }: { date: string }) => {
    const { data } = useGetWeeklyStudyTimeQuery(date);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const subjectEntries =
        data && data.subjectStudyTime
            ? Object.entries(data.subjectStudyTime)
            : [];

    const cards =
        data == null
            ? []
            : [
                {
                    type: 'total' as const,
                    timeDisplay: `${String(data.totalHours ?? '00').padStart(2, '0')}:${String(
                        data.totalMinutes ?? '00',
                    ).padStart(2, '0')}:${String(data.totalSeconds ?? '00').padStart(2, '0')}`,
                },
                ...subjectEntries.map(([subjectCode, timeInfo]) => ({
                    type: 'subject' as const,
                    subjectCode,
                    timeDisplay: `${String(timeInfo.hours ?? '00').padStart(2, '0')}:${String(
                        timeInfo.minutes ?? '00',
                    ).padStart(2, '0')}:${String(timeInfo?.seconds ?? '00').padStart(2, '0')}`,
                })),
            ];

    const cardCount = cards.length;

    const updateIndexFromScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollLeft = el.scrollLeft;
        const index = Math.round(scrollLeft / CARD_STEP);
        setCurrentCardIndex(Math.min(Math.max(0, index), Math.max(cardCount - 1, 0)));
    }, [cardCount]);

    const scrollToIndex = useCallback((index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: CARD_STEP * index, behavior: 'smooth' });
        setCurrentCardIndex(index);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onScrollEnd = () => updateIndexFromScroll();
        el.addEventListener('scrollend', onScrollEnd);
        return () => el.removeEventListener('scrollend', onScrollEnd);
    }, [updateIndexFromScroll]);

    return (
        <>
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-[16px] snap-x snap-mandatory scroll-smooth px-[16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ WebkitOverflowScrolling: 'touch' }}
                onScroll={updateIndexFromScroll}
            >
                {cards.map((item, index) => (
                    <ReportCard key={index} {...item} date={date} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-[8px] mt-[8px]">
                {Array.from({ length: cardCount }).map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`${i + 1}번째 카드`}
                        onClick={() => scrollToIndex(i)}
                        className={`w-[8px] h-[8px] rounded-full shrink-0 transition-colors ${i === currentCardIndex ? 'bg-primary-blue' : 'bg-primary-blue/30'}`}
                    />
                ))}
            </div>
        </>
    );
};
