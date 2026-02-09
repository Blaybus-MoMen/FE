import { useState, useRef, useCallback, useEffect } from 'react';
import { HomeLearningCard } from './HomeLearningCard';
import { useGetDailyTodoListQuery } from '@/entities/study/queries/study.queries';


export const HomeLearningCardSlice = ({ date }: { date: string }) => {
    const { data } = useGetDailyTodoListQuery(date)
    const hasData = (data?.length ?? 0) > 0
    const cardCount = data?.length ?? 0

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const updateIndexFromScroll = useCallback((cardCount: number) => {
        const el = scrollRef.current;
        if (!el || cardCount <= 0) return;
        const scrollLeft = el.scrollLeft;
        const cardWidth = el.offsetWidth;
        const index = Math.round(scrollLeft / cardWidth);
        setCurrentCardIndex(Math.min(index, cardCount - 1));
    }, []);

    const scrollToIndex = useCallback((index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: el.offsetWidth * index, behavior: 'smooth' });
        setCurrentCardIndex(index);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handler = () => updateIndexFromScroll(cardCount);
        el.addEventListener('scrollend', handler);
        return () => el.removeEventListener('scrollend', handler);
    }, [updateIndexFromScroll, cardCount]);

    return (
        <>
            <div className='bg-[#FEFEFE80] rounded-[25px] p-[8px] mt-[12px] flex flex-col gap-[8px] overflow-hidden'>
                <div
                    ref={scrollRef}
                    className='flex overflow-x-auto gap-[8px] snap-x snap-mandatory scroll-smooth -mx-[8px] px-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    style={{ WebkitOverflowScrolling: 'touch' }}
                    onScroll={() => updateIndexFromScroll(cardCount)}
                >
                    {hasData ? (
                        data?.map((item) => (
                            <HomeLearningCard
                                key={item.todoId}
                                todoId={item.todoId}
                                title={item.title}
                                subject={item.subject}
                                goalDescription={item.goalDescription}
                                startDate={item.startDate}
                                endDate={item.endDate}
                                isCompleted={item.isCompleted}
                            />
                        ))
                    ) : (
                        <div className='min-w-full flex-shrink-0 snap-center flex flex-col gap-[8px] min-h-[222px]'>
                            <div className='flex-1 flex items-center justify-center rounded-[20px]'>
                                <p className='text-[14px] text-grayscale-medium-gray'>할일 없음</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {hasData && (
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
            )}
        </>
    );
};
