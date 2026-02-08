import { useState, useRef, useCallback, useEffect } from 'react';
import { ReportCard } from './ReportCard';
import type { ReportCardProps } from './ReportCard';

const CARD_WIDTH = 164;
const GAP = 16;
const CARD_STEP = CARD_WIDTH + GAP;

type ReportCardSliceProps = {
    items?: ReportCardProps[];
};

const DEFAULT_ITEMS: ReportCardProps[] = [
    { type: 'total', timeDisplay: '00:00:00' },
    { type: 'subject', subject: '국어', timeDisplay: '00:00:00' },
    { type: 'subject', subject: '영어', timeDisplay: '00:00:00' },
    { type: 'subject', subject: '수학', timeDisplay: '00:00:00' },
];

export const ReportCardSlice = ({ items = DEFAULT_ITEMS }: ReportCardSliceProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardCount = items.length;

    const updateIndexFromScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollLeft = el.scrollLeft;
        const index = Math.round(scrollLeft / CARD_STEP);
        setCurrentCardIndex(Math.min(Math.max(0, index), cardCount - 1));
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
                {items.map((item, index) => (
                    <ReportCard key={index} {...item} />
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
