import TodoItem from '@/features/manage/ui/TodoItem';
import { useModalActions } from '@/shared/store/modal.store';
import { format } from 'date-fns';
import { useGetMenteeTodosQuery } from '@/entities/manage/queries/manage.queries';
import { useTodoActions } from '../hooks/useTodoActions';

interface Props {
    menteeId: number;
    selectedDate: Date;
}

/**
 * @description 학습 리스트 섹션
 */
const TodoList = ({ menteeId, selectedDate }: Props) => {
    const { openModal } = useModalActions();

    const yearMonth = format(selectedDate, 'yyyy-MM');
    const date = format(selectedDate, 'yyyy-MM-dd');

    const { toggleConfirm, deleteTodo } = useTodoActions({ menteeId, date });

    const weekStartDate = format(
        new Date(selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay())),
        'yyyy-MM-dd'
    );

    const { data } = useGetMenteeTodosQuery({
        menteeId,
        yearMonth,
        weekStartDate,
        date,
    });

    const todos = data?.data ?? [];

    return (
        <section className="flex flex-1 flex-col gap-6 min-h-0 px-4 md:px-10 pb-10">
            <div className="flex items-start justify-end md:justify-between gap-4">
                <div className="w-full md:w-auto gap-4">
                    <h3 className="text-primary-blue-dark">{format(selectedDate, 'yyyy년 M월 d일')}</h3>
                </div>

                <div className="hidden md:flex gap-3">
                    <button
                        onClick={() => openModal('TODO')}
                        type="button"
                        className="
                        hidden md:block
                        rounded-[37px]
                        bg-primary-blue-dark
                        px-[30px] py-[12px]
                        ui-button text-grayscale-bg-gray
                        shadow-xl
                    "
                    >
                        + 추가하기
                    </button>
                </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto no-scrollbar">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.todoId}
                        subject={todo.subject}
                        task={todo.title}
                        goal={todo.goalDescription}
                        isConfirmed={todo.mentorConfirmed}
                        showActions={todo.creatorType === 'MENTOR' && !todo.hasFeedback}
                        onEdit={() =>
                            openModal('TODO', {
                                mode: 'edit',
                                menteeId,
                                todo,
                            })
                        }
                        onDelete={() =>
                            openModal('CONFIRM', {
                                message: '해당 학습을 삭제하시겠습니까?',
                                variant: 'warning',
                                onConfirm: () => deleteTodo(todo.todoId),
                            })
                        }
                        onToggleConfirm={() => toggleConfirm(todo.todoId, todo.mentorConfirmed)}
                    />
                ))}
            </div>

            <div className="flex sm:hidden justify-center pt-2">
                <button
                    onClick={() =>
                        openModal('TODO', {
                            mode: 'create',
                            menteeId,
                        })
                    }
                    type="button"
                    className="rounded-[37px] bg-primary-blue-dark px-[58px] py-[16px] ui-button text-grayscale-bg-gray shadow-xl"
                >
                    + 추가하기
                </button>
            </div>
        </section>
    );
};

export default TodoList;
