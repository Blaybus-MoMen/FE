import { useModalActions } from "@/shared/store/modal.store";
import { CommonUtil } from "@/shared/utils/commonUtil";
import { Trash2, Edit3 } from "lucide-react";
import clsx from "clsx";
import { useDeleteTodoMutation } from "@/entities/study/queries/study.queries";
import { useQueryClient } from "@tanstack/react-query";

interface ITodoCardProps {
    todoId: number;
    title: string;
    subject: string;
    goalDescription: string;
    hasFeedback: boolean;
    studyTimeHours: string;
    studyTimeMinutes: string;
    studyTimeSeconds: string;
    date: string;
    isCompleted: boolean;
    creatorType: string;
}


const TodoCard = (props: ITodoCardProps) => {
    const queryClient = useQueryClient();
    const { todoId, title, subject, goalDescription, hasFeedback, studyTimeHours, studyTimeMinutes, studyTimeSeconds, date, isCompleted, creatorType } = props;
    const { openModal } = useModalActions()

    const { headerBg, subjectBg } = CommonUtil.getTodoCardStyle(subject);

    const { mutate: deleteTodo } = useDeleteTodoMutation();

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openModal('FEEDBACK_CONFIRM', { todoId: todoId, title: title, subject: subject, goalDescription: goalDescription, studyTimeHours: studyTimeHours, studyTimeMinutes: studyTimeMinutes, studyTimeSeconds: studyTimeSeconds, isCompleted: isCompleted });
    };

    const handleOpenEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openModal('LEARNING_EDIT', { date: date, todoId: todoId });
    };

    const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openModal('CONFIRM', {
            message: '해당 학습을 삭제하시겠습니까?',
            variant: 'warning',
            onConfirm: async () => {
                await deleteTodo(todoId);
                queryClient.invalidateQueries({
                    queryKey: ['getDailyTodoList', date],
                });
            },
        });
    };

    return (
        <div className="bg-[#FEFEFE80] shadow-[0px_2px_5px_2px_#00000012] rounded-[25px] p-[8px]" aria-label="학습 리포트" onClick={() => openModal('LEARNING_INSPECTION', { todoId: todoId, title: title, subject: subject, goalDescription: goalDescription, studyTimeHours: studyTimeHours, studyTimeMinutes: studyTimeMinutes, studyTimeSeconds: studyTimeSeconds, isCompleted: isCompleted })}>
            <div className={clsx('h-[79px] flex rounded-[25px]', headerBg)}>
                <div className={clsx('w-[50px] rounded-tl-[19px] rounded-bl-[19px] flex items-center justify-center', subjectBg)}>
                    <p className='text-ui-label text-[14px] text-grayscale-dark-gray'>{CommonUtil.getSubjectName(subject)}</p>
                </div>
                <div className='flex-1 flex items-center'>
                    <div className='pl-[20px] pr-[7px] flex justify-between w-full items-center gap-3 min-w-0'>
                        <div className='flex flex-col min-w-0 flex-1'>
                            <div className='flex items-center gap-[6px] min-w-0'>
                                <p className='text-body-medium text-grayscale-black truncate min-w-0 max-w-[140px] text-[16px]'>{title}</p>
                                {creatorType === 'MENTEE' && (
                                    <button
                                        type="button"
                                        onClick={handleOpenEditModal}
                                        className='shrink-0 text-primary-blue'
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                )}
                            </div>
                            <div className='flex items-center gap-[6px] min-w-0'>
                                <p className='text-[12px]  text-grayscale-black shrink-0'>학습목표</p>
                                <p className='text-[12px] text-grayscale-black shrink-0'>|</p>
                                <p className='text-[12px] text-grayscale-black truncate min-w-0'>{goalDescription}</p>
                            </div>
                            <div className='flex items-center gap-[6px]'>
                                <p className='text-[12px] text-grayscale-black'>학습시간</p>
                                <p className='text-[12px] text-grayscale-black'>|</p>
                                <p className='text-[12px] text-grayscale-black'>{studyTimeHours}:{studyTimeMinutes}:{studyTimeSeconds}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[4px] shrink-0">
                            <button
                                type="button"
                                onClick={handleOpenModal}
                                disabled={!hasFeedback}
                                className={clsx(
                                    'text-[10px] rounded-[50px] py-[5px] px-[10px]',
                                    hasFeedback
                                        ? 'bg-primary-blue text-[#FEFEFE]'
                                        : 'bg-grayscale-light-gray text-grayscale-dark-gray'
                                )}
                            >
                                피드백
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteTodo}
                                className='text-[10px] bg-[#FEFEFE] text-[#F94848] rounded-[50px] flex gap-[4px] items-center py-[5px] px-[10px] justify-center'
                            >
                                <Trash2 size={15} />
                                <p>삭제하기</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoCard;