import alarm from '@/assets/icons/alarm.svg';
import { useModalActions } from '@/shared/store/modal.store';
import { CommonUtil } from '@/shared/utils/commonUtil';

export type ReportCardProps = {
    type: 'total' | 'subject';
    subjectCode?: string;
    timeDisplay?: string;
    date?: string;
};

export const ReportCard = ({
    type,
    subjectCode = 'KOREAN',
    timeDisplay = '00:00:00',
    date,
}: ReportCardProps) => {
    const isTotal = type === 'total';

    const { openModal } = useModalActions();

    const { subjectBg } = CommonUtil.getTodoCardStyle(subjectCode);
    const subjectLabel = CommonUtil.getSubjectName(subjectCode);

    const subjectBgColorMap: Record<string, string> = {
        KOREAN: '#BFEAFE80',
        ENGLISH: '#D7C1F280',
        MATH: '#FFF59D80',
    };
    const subjectCardBg = subjectBgColorMap[subjectCode] ?? '#BFEAFE80';

    const cardClassName =
        'w-full h-full rounded-[23px] flex items-center justify-center flex-col gap-[8px]';

    const totalGradientBorder = isTotal ? (
        <div
            className="w-[164px] h-[164px] shrink-0 snap-center rounded-[25px] p-[2px] shadow-[0px_0px_8px_0px_#0000001A]"
            style={{
                background: 'linear-gradient(270deg, #FEFEFE 0%, rgba(254, 254, 254, 0) 50%, #FEFEFE 100%)',
            }}
        >
            <div className="w-full h-full rounded-[23px] bg-[#FEFEFEB2] flex flex-col items-center justify-center gap-[8px]">
                {renderContent()}
            </div>
        </div>
    ) : null;

    function renderContent() {
        return (
            <>
                <div className="flex items-center gap-[4px]">
                    {isTotal ? (
                        <>
                            <img src={alarm} alt="alarm" />
                            <p className="text-[14px] text-grayscale-dark-gray">총 학습시간</p>
                        </>
                    ) : (
                        <>
                            <div className={`text-[14px] text-grayscale-dark-gray px-[12px] py-[2px] rounded-[5px] ${subjectBg}`}>
                                {subjectLabel}
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
                {isTotal && (
                    <button
                        onClick={() => openModal('WEEK_FEEDBACK', { date: date ?? '' })}
                        type="button"
                        className="px-[22px] py-[12px] rounded-[16px] text-[#FEFEFE] text-[12px] font-medium bg-primary-blue"
                    >
                        주간 피드백 확인하기
                    </button>
                )}
            </>
        );
    }
    if (isTotal) {
        return totalGradientBorder;
    }
    return (
        <div
            className="w-[164px] h-[164px] shrink-0 snap-center rounded-[25px] p-[2px] shadow-[0px_0px_8px_0px_#0000001A]"
            style={{
                borderRadius: '25px',
                background:
                    'linear-gradient(270deg, #FEFEFE 0%, rgba(254, 254, 254, 0) 50%, #FEFEFE 100%)',
            }}
        >
            <div
                className={cardClassName}
                style={{
                    background: subjectCardBg,
                }}
            >
                {renderContent()}
            </div>
        </div>
    );
};
