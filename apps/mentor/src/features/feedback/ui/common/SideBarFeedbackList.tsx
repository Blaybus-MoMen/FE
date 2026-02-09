import FeedbackCard from '@/features/feedback/ui/common/FeedbackCard';
import { useGetMenteeTodosQuery } from '@/entities/manage/queries/manage.queries';
import { useGetWeeklyFeedbackListQuery, useGetMonthlyFeedbackListQuery } from '@/entities/feedback/queries/feedback.queries';
import type { FeedbackViewMode } from '@/shared/model/feedback';

const SUBJECT_LABEL: Record<string, '국어' | '영어' | '수학'> = {
    KOREAN: '국어',
    ENGLISH: '영어',
    MATH: '수학',
};

interface Props {
    mode: FeedbackViewMode;
    menteeId: number;
    dateParams: {
        yearMonth: string;
        weekStartDate: string;
        date: string;
        year: number;
        month: number;
    };
    selectedTodoId: number | null;
    selectedFeedbackId: number | null;
    onSelectTodo: (todoId: number) => void;
    onSelectFeedback: (feedbackId: number) => void;
}

/**
 * @description 사이드 탭바에 들어갈 피드백 목록
 */
const FeedbackList = ({
    mode,
    menteeId,
    dateParams,
    selectedTodoId,
    selectedFeedbackId,
    onSelectTodo,
    onSelectFeedback,
}: Props) => {
    const todosQuery = useGetMenteeTodosQuery({
        menteeId: mode === 'daily' ? menteeId : 0,
        yearMonth: dateParams.yearMonth,
        weekStartDate: dateParams.weekStartDate,
        date: dateParams.date,
    });

    const weeklyQuery = useGetWeeklyFeedbackListQuery(
        menteeId,
        { yearMonth: dateParams.yearMonth, weekStartDate: dateParams.weekStartDate },
        { enabled: mode === 'weekly' }
    );

    const monthlyQuery = useGetMonthlyFeedbackListQuery(
        menteeId,
        { yearMonth: dateParams.yearMonth, year: dateParams.year },
        { enabled: mode === 'monthly' }
    );

    const renderDailyCards = () => {
        const todos = todosQuery.data?.data ?? [];
        if (todos.length === 0) return <p className="text-center text-grayscale-dark-gray py-4">할 일이 없습니다.</p>;
        return todos.map((todo) => (
            <div key={todo.todoId} className="shrink-0 w-[280px] lg:w-auto">
                <FeedbackCard
                    subject={SUBJECT_LABEL[todo.subject] ?? '국어'}
                    task={todo.title}
                    isConfirmed={todo.mentorConfirmed}
                    goal={todo.goalDescription}
                    layout="compact"
                    selected={selectedTodoId === todo.todoId}
                    onClick={() => onSelectTodo(todo.todoId)}
                />
            </div>
        ));
    };

    const renderWeeklyCards = () => {
        const feedbacks = weeklyQuery.data?.data ?? [];
        if (feedbacks.length === 0) return <p className="text-center text-grayscale-dark-gray py-4">주간 피드백이 없습니다.</p>;
        return feedbacks.map((fb) => (
            <div key={fb.feedbackId} className="shrink-0 w-[280px] lg:w-auto">
                <FeedbackCard
                    subject="국어"
                    task={`${fb.weekStartDate} ~ ${fb.weekEndDate}`}
                    isConfirmed={!!fb.overallReview}
                    goal={fb.overallReview || '작성 전'}
                    layout="compact"
                    selected={selectedFeedbackId === fb.feedbackId}
                    onClick={() => onSelectFeedback(fb.feedbackId)}
                />
            </div>
        ));
    };

    const renderMonthlyCards = () => {
        const feedbacks = monthlyQuery.data?.data ?? [];
        if (feedbacks.length === 0) return <p className="text-center text-grayscale-dark-gray py-4">월간 피드백이 없습니다.</p>;
        return feedbacks.map((fb) => (
            <div key={fb.feedbackId} className="shrink-0 w-[280px] lg:w-auto">
                <FeedbackCard
                    subject="국어"
                    task={`${fb.year}년 ${fb.month}월`}
                    isConfirmed={!!fb.mentorComment}
                    goal={fb.mentorComment || '작성 전'}
                    layout="compact"
                    selected={selectedFeedbackId === fb.feedbackId}
                    onClick={() => onSelectFeedback(fb.feedbackId)}
                />
            </div>
        ));
    };

    return (
        <div className="flex-1 min-h-0 px-4 lg:px-6 pb-6">
            <div className="h-full flex flex-nowrap gap-4 overflow-x-auto lg:overflow-x-hidden overflow-y-hidden lg:overflow-y-auto no-scrollbar lg:flex-col">
                {mode === 'daily' && renderDailyCards()}
                {mode === 'weekly' && renderWeeklyCards()}
                {mode === 'monthly' && renderMonthlyCards()}
            </div>
        </div>
    );
};

export default FeedbackList;
