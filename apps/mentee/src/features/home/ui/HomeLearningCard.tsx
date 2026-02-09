import pdf from '@/assets/icons/pdf.svg';
import { CommonUtil } from '@/shared/utils/commonUtil';
import { HomeLearningCardTimer } from './HomeLearningCardTimer';

interface IHomeLearningCardProps {
    todoId: number;
    title: string;
    subject: string;
    goalDescription: string;
    startDate: string;
    endDate: string;
    isCompleted: boolean;
}



export const HomeLearningCard = ({
    todoId,
    title,
    subject,
    goalDescription,
    isCompleted,
}: IHomeLearningCardProps) => {
    const { headerBg, subjectBg } = CommonUtil.getTodoCardStyle(subject);

    return (
        <div className='min-w-full flex-shrink-0 snap-center flex flex-col gap-[8px]'>
            <div className={`h-[79px] flex ${headerBg} rounded-[25px]`}>
                <div className={`w-[50px] rounded-tl-[19px] rounded-bl-[19px] flex items-center justify-center ${subjectBg}`}>
                    <p className='text-ui-label text-grayscale-dark-gray'>{CommonUtil.getSubjectName(subject)}</p>
                </div>
                <div className='flex-1 flex items-center'>
                    <div className='pl-[20px] pr-[7px] flex justify-between w-full items-center'>
                        <div className='flex flex-col gap-[4px]'>
                            <p className='text-body-medium text-grayscale-black'>{title}</p>
                            <div className='flex flex-col'>
                                <p className='text-[12px] text-grayscale-black'>학습목표</p>
                                <p className='text-[12px] text-grayscale-black'>{goalDescription}</p>
                            </div>
                        </div>
                        {isCompleted ? <button className='h-fit text-[12px] bg-[#4CAF50] text-[#FEFEFE] rounded-[20px] px-[22px] py-[4px]'>
                            학습완료
                        </button> : <button className='h-fit text-[12px] bg-grayscale-light-gray text-grayscale-dark-gray rounded-[20px] px-[22px] py-[4px]'>
                            미완료
                        </button>}

                    </div>
                </div>
            </div>
            <div className='flex items-center w-full gap-[8px]'>
                <HomeLearningCardTimer todoId={todoId} />
                <div className='flex-1 rounded-[20px] bg-[#FEFEFE] p-[12px] h-[135px] flex flex-col justify-between'>
                    <div className='flex flex-col gap-[4px]'>
                        <p className='text-[14px] text-grayscale-dark-gray'>오늘의 학습지</p>
                        <p className='text-[12px] text-grayscale-dark-gray'>다운로드</p>
                    </div>
                    <div className='flex justify-end'>
                        <img src={pdf} alt='pdf' />
                    </div>
                </div>
            </div>
        </div>
    );
};
