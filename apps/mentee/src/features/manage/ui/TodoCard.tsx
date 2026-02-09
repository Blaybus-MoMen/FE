import { useModalActions } from "@/shared/store/modal.store";
import { CommonUtil } from "@/shared/utils/commonUtil";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

interface ITodoCardProps {
    title: string;
    subject: string;
    goalDescription: string;
    mentorConfirmed: boolean;
    hasFeedback: boolean;
    studyTimeHours: string;
    studyTimeMinutes: string;
    studyTimeSeconds: string;
}


const TodoCard = (props: ITodoCardProps) => {
    const { title, subject, goalDescription, hasFeedback, studyTimeHours, studyTimeMinutes, studyTimeSeconds } = props;
    const { openModal } = useModalActions()

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openModal('MONTH_FEEDBACK');
    };

    return (
        <div className="bg-[#FEFEFE80] shadow-[0px_2px_5px_2px_#00000012] rounded-[25px] p-[8px]" aria-label="학습 리포트" onClick={() => openModal('LEARNING_INSPECTION')}>
            <div className='bg-[#FFF59D26] h-[79px] flex'>
                <div className='w-[50px] bg-point-yellow rounded-tl-[19px] rounded-bl-[19px] flex items-center justify-center'>
                    <p className='text-ui-label text-grayscale-dark-gray'>{CommonUtil.getSubjectName(subject)}</p>
                </div>
                <div className='flex-1 flex items-center'>
                    <div className='pl-[20px] pr-[7px] flex justify-between w-full items-center gap-3 min-w-0'>
                        <div className='flex flex-col gap-[4px] min-w-0 flex-1'>
                            <p className='text-body-medium text-grayscale-black truncate min-w-0'>{title}</p>
                            <div className='flex items-center gap-[6px] min-w-0'>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black shrink-0'>학습목표</p>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black shrink-0'>|</p>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black truncate min-w-0'>{goalDescription}</p>
                            </div>
                            <div className='flex items-center gap-[6px]'>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>학습시간</p>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>|</p>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>{studyTimeHours}:{studyTimeMinutes}:{studyTimeSeconds}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[4px] shrink-0">
                            <button
                                type="button"
                                onClick={handleOpenModal}
                                disabled={!hasFeedback}
                                className={clsx('text-[10px] rounded-[50px] bg-grayscale-medium-gray text-[#FEFEFE] py-[5px] px-[10px]', !hasFeedback && 'opacity-50')}
                            >
                                피드백
                            </button>
                            <button className='text-[10px] bg-grayscale-border text-grayscale-dark-gray rounded-[50px] flex gap-[4px] items-center py-[5px] px-[10px] justify-center'>
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