type Subject = '국어' | '영어' | '수학';

interface FeedbackCardProps {
    subject: Subject;
    task: string;
    isConfirmed: boolean;
    goal: string;
    layout?: 'default' | 'compact';
    selected?: boolean;
    onClick?: () => void;
}

const SUBJECT_STYLE: Record<Subject, string> = {
    국어: 'bg-secondary-sky-pale',
    영어: 'bg-accent-purple',
    수학: 'bg-point-yellow',
};

/**
 * @description 개별 피드백 카드
 */
const FeedbackCard = ({
    subject,
    task,
    isConfirmed,
    goal,
    layout = 'default',
    selected,
    onClick,
}: FeedbackCardProps) => {
    const isCompact = layout === 'compact';

    return (
        <div className={`flex w-full h-[140px] gap-4 flex-col md:flex-row cursor-pointer`} onClick={onClick}>
            <div
                className={`flex-1 rounded-2xl bg-white p-6 shadow-md ${selected ? 'ring-2 ring-primary-blue ring-inset rounded-2xl' : ''}`}
            >
                <div className="mb-4 flex items-center gap-3">
                    <span
                        className={`rounded-lg px-5 py-1.5 ui-caption ui-label text-grayscale-black ${SUBJECT_STYLE[subject]}`}
                    >
                        {subject}
                    </span>
                    <p className="font-bold text-black">{task}</p>
                    <span
                        className={`ml-auto rounded-full px-3 py-1 ui-caption ${isConfirmed ? 'bg-system-success text-white' : 'bg-grayscale-light-gray text-black'}`}
                    >
                        멘토 확인
                    </span>
                </div>
                <div
                    className={`mt-2 ui-caption ${isCompact ? 'flex flex-col gap-4' : 'flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-4'}`}
                >
                    <div className="flex items-center gap-3 ">
                        <span className="flex justify-center items-center rounded-md w-[72px] h-[25px] bg-grayscale-medium-gray text-white whitespace-nowrap">
                            학습 목표
                        </span>
                        <span className="text-grayscale-dark-gray">{goal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;
