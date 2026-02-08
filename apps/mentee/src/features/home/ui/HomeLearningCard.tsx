import alarm from '@/assets/icons/alarm.svg';
import play from '@/assets/icons/play.svg';
import pdf from '@/assets/icons/pdf.svg';

export type HomeLearningCardProps = {
    subject?: string;
    title?: string;
    goalLabel?: string;
    goalText?: string;
    status?: string;
    timerDisplay?: string;
};

export const HomeLearningCard = ({
    subject = '수학',
    title = '수능특강 듣기 p.20-23',
    goalLabel = '학습 목표',
    goalText = '영어 듣기 향상',
    status = '미완료',
    timerDisplay = '00:00',
}: HomeLearningCardProps) => {
    return (
        <div className='min-w-full flex-shrink-0 snap-center flex flex-col gap-[8px]'>
            <div className='bg-[#FFF59D26] h-[79px] flex'>
                <div className='w-[50px] bg-point-yellow rounded-tl-[19px] rounded-bl-[19px] flex items-center justify-center'>
                    <p className='text-ui-label text-grayscale-dark-gray'>{subject}</p>
                </div>
                <div className='flex-1 flex items-center'>
                    <div className='pl-[20px] pr-[7px] flex justify-between w-full items-center'>
                        <div className='flex flex-col gap-[4px]'>
                            <p className='text-body-medium text-grayscale-black'>{title}</p>
                            <div className='flex items-center gap-[6px]'>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>{goalLabel}</p>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>|</p>
                                <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>{goalText}</p>
                            </div>
                        </div>
                        <button className='h-fit text-[12px] bg-grayscale-bg-gray text-grayscale-medium-gray rounded-[20px] px-[22px] py-[4px]'>
                            {status}
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex items-center w-full gap-[8px]'>
                <div className='flex-1 rounded-[20px] bg-[#FEFEFE] p-[12px] h-[135px]'>
                    <div className='flex gap-[4px]'>
                        <img src={alarm} alt='alarm' />
                        <p className='text-[14px] text-grayscale-dark-gray'>타이머</p>
                    </div>
                    <p className='text-[28px] text-grayscale-dark-gray'>{timerDisplay}</p>
                    <div className='flex justify-end'>
                        <img src={play} alt='play' />
                    </div>
                </div>
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
