import { useState, useRef, useCallback, useEffect } from 'react';
import { HomeLearningCard } from './HomeLearningCard';
import type { HomeLearningCardProps } from './HomeLearningCard';

type HomeLearningCardSliceProps = {
    items?: HomeLearningCardProps[];
};

const DEFAULT_ITEMS: HomeLearningCardProps[] = [
    {},
    {},
    {},
];

export const HomeLearningCardSlice = ({ items = DEFAULT_ITEMS }: HomeLearningCardSliceProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardCount = Math.min(items.length, 8);

    const updateIndexFromScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollLeft = el.scrollLeft;
        const cardWidth = el.offsetWidth;
        const index = Math.round(scrollLeft / cardWidth);
        setCurrentCardIndex(Math.min(index, cardCount - 1));
    }, [cardCount]);

    const scrollToIndex = useCallback((index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: el.offsetWidth * index, behavior: 'smooth' });
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
            <div className='bg-[#FEFEFE80] rounded-[25px] p-[8px] mt-[12px] flex flex-col gap-[8px] overflow-hidden'>
                <div
                    ref={scrollRef}
                    className='flex overflow-x-auto gap-[8px] snap-x snap-mandatory scroll-smooth -mx-[8px] px-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    style={{ WebkitOverflowScrolling: 'touch' }}
                    onScroll={updateIndexFromScroll}
                >
                    {items.map((item, index) => (
                        <HomeLearningCard key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center gap-[8px] mt-[8px]'>
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
