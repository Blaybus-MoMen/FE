import alarm from '@/assets/icons/alarm.svg';

export type ReportCardProps = {
    type: 'total' | 'subject';
    subject?: string;
    timeDisplay?: string;
};

export const ReportCard = ({
    type,
    subject = '국어',
    timeDisplay = '00:00:00',
}: ReportCardProps) => {
    const isTotal = type === 'total';

    const cardClassName = [
        'w-[164px] h-[164px] shrink-0 snap-center flex items-center justify-center rounded-[25px] flex-col gap-[8px] shadow-[0px_0px_8px_0px_#0000001A]',
        isTotal ? 'bg-[#FEFEFEB2]' : 'bg-[#BFEAFE80]',
    ].join(' ');

    const cardStyle = isTotal
        ? {
            border: '2px solid transparent',
            borderImage: 'linear-gradient(270deg, #FEFEFE 0%, rgba(254, 254, 254, 0) 50%, #FEFEFE 100%) 1',
            borderImageSlice: 1,
        }
        : undefined;

    return (
        <div className={cardClassName} style={cardStyle}>
            <div className="flex items-center gap-[4px]">
                {isTotal ? (
                    <>
                        <img src={alarm} alt="alarm" />
                        <p className="text-[14px] text-grayscale-dark-gray">총 학습시간</p>
                    </>
                ) : (
                    <>
                        <div className="text-[14px] text-grayscale-dark-gray bg-grayscale-light-gray px-[12px] py-[2px] rounded-[5px]">
                            {subject}
                        </div>
                        <p className="text-[14px] text-grayscale-dark-gray">학습시간</p>
                    </>
                )}
            </div>
            <p
                className={`text-[28px] timer ${isTotal ? 'text-primary-blue' : 'text-grayscale-dark-gray'}`}
            >
                {timeDisplay}
            </p>
        </div>
    );
};
