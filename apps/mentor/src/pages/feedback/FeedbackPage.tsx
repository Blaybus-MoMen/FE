import Avatar from '@/shared/ui/Avatar';
import FeedbackSidebar from '@/features/feedback/ui/common/FeedbackSidebar';
import MonthlyFeedbackLayout from '@/features/feedback/ui/monthly/MonthlyFeedbackLayout';
import WeeklyFeedbackLayout from '@/features/feedback/ui/weekly/WeeklyFeedbackLayout';
import DailyFeedbackLayout from '@/features/feedback/ui/daily/DailyFeedbackLayout';
import { useEffect, useMemo, useState } from 'react';
import { useGetMenteeListQuery } from '@/entities/mentoring/queries/mentoring.queries';
import { useGetMenteeTodosQuery } from '@/entities/manage/queries/manage.queries';
import { useFeedbackPeriod } from '@/features/feedback/hooks/useFeedbackPeriod';
import type { FeedbackViewMode } from '@/shared/model/feedback';
import { useParams } from 'react-router';

const SUBJECT_LABEL: Record<string, '국어' | '영어' | '수학'> = {
    KOREAN: '국어',
    ENGLISH: '영어',
    MATH: '수학',
};

const FeedbackPage = () => {
    const [mode, setMode] = useState<FeedbackViewMode>('daily');
    const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);

    /** ✅ menteeId는 URL에서만 가져옴 */
    const { menteeId } = useParams<{ menteeId: string }>();
    const selectedMenteeId = Number(menteeId);

    const { data: menteeListData } = useGetMenteeListQuery();
    const menteeList = useMemo(() => menteeListData?.data ?? [], [menteeListData]);

    const { label, movePrev, moveNext, dateParams } = useFeedbackPeriod(mode);

    /** 모드 변경 시 선택 초기화 */
    useEffect(() => {
        setSelectedTodoId(null);
        setSelectedFeedbackId(null);
    }, [mode]);

    /** 일간 todo 목록 */
    const todosQuery = useGetMenteeTodosQuery({
        menteeId: selectedMenteeId,
        yearMonth: dateParams.yearMonth,
        weekStartDate: dateParams.weekStartDate,
        date: dateParams.date,
    });

    const selectedTodo = useMemo(() => {
        if (!selectedTodoId) return null;
        return (todosQuery.data?.data ?? []).find((t) => t.todoId === selectedTodoId) ?? null;
    }, [selectedTodoId, todosQuery.data]);

    return (
        <main className="relative h-full w-full lg:overflow-hidden overflow-y-auto bg-feedback-layout">
            <div className="flex h-full w-full flex-col lg:flex-row">
                <FeedbackSidebar
                    mode={mode}
                    onChangeMode={setMode}
                    menteeList={menteeList}
                    selectedMenteeId={selectedMenteeId}
                    selectedTodoId={selectedTodoId}
                    selectedFeedbackId={selectedFeedbackId}
                    onSelectTodo={setSelectedTodoId}
                    onSelectFeedback={setSelectedFeedbackId}
                    periodLabel={label}
                    onPeriodPrev={movePrev}
                    onPeriodNext={moveNext}
                    dateParams={dateParams}
                />

                <section className="flex flex-1 flex-col bg-primary-blue-pale">
                    <header className="flex items-center justify-between px-4 lg:px-10 py-6 lg:py-8">
                        <div className="hidden lg:flex ml-auto items-center gap-[9px] rounded-[100px] bg-[#666666]/30 pl-[20px] shadow-[inset_0px_2px_4px_1px_#00000040]">
                            <p className="ui-label text-white">설쌤</p>
                            <Avatar className="h-[36px] w-[36px]">
                                <span>쌤</span>
                            </Avatar>
                        </div>
                    </header>

                    {mode === 'daily' && selectedTodo && (
                        <DailyFeedbackLayout
                            subject={SUBJECT_LABEL[selectedTodo.subject] ?? '국어'}
                            title={selectedTodo.title}
                            todoId={selectedTodo.todoId}
                        />
                    )}

                    {mode === 'daily' && !selectedTodo && (
                        <div className="flex flex-1 items-center justify-center text-grayscale-medium-gray">
                            <p>학습을 선택해주세요.</p>
                        </div>
                    )}

                    {mode === 'weekly' && <WeeklyFeedbackLayout menteeId={selectedMenteeId} dateParams={dateParams} />}

                    {mode === 'monthly' && (
                        <MonthlyFeedbackLayout menteeId={selectedMenteeId} dateParams={dateParams} />
                    )}
                </section>
            </div>
        </main>
    );
};

export default FeedbackPage;
