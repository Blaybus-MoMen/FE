import FeedbackCard from '@/features/feedback/ui/common/FeedbackCard';
import { useGetMenteeTodosQuery } from '@/entities/manage/queries/manage.queries';
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
    selectedTodoId?: number | null;
    onSelectTodo: (todoId: number) => void;
}

/**
 * @description 사이드 탭바에 들어갈 피드백 목록
 */
const FeedbackList = ({ mode, menteeId, dateParams, selectedTodoId, onSelectTodo }: Props) => {
    const todosQuery = useGetMenteeTodosQuery({
        menteeId,
        date: mode === 'daily' ? dateParams.date : undefined,
        weekStartDate: mode === 'weekly' ? dateParams.weekStartDate : undefined,
        yearMonth: mode === 'monthly' ? dateParams.yearMonth : undefined,
    });

    const renderTodoCards = () => {
        const todos = todosQuery.data?.data ?? [];

        if (todos.length === 0) {
            return <p className="text-center text-grayscale-dark-gray py-4">할 일이 없습니다.</p>;
        }

        return todos.map((todo) => (
            <div key={todo.todoId} className="shrink-0 w-[280px] lg:w-auto">
                <FeedbackCard
                    subject={SUBJECT_LABEL[todo.subject]}
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

    return (
        <div className="flex-1 min-h-0 px-4 lg:px-6 pb-6">
            <div className="h-full flex flex-nowrap gap-3 overflow-x-auto lg:overflow-x-hidden overflow-y-hidden lg:overflow-y-auto no-scrollbar lg:flex-col">
                {renderTodoCards()}
            </div>
        </div>
    );
};

export default FeedbackList;
