import FeedbackActionBox from '@/features/feedback/ui/daily/FeedbackActionBox';

type Subject = '국어' | '영어' | '수학';

interface FeedbackCardProps {
    subject: Subject;
    task: string;
    isConfirmed: boolean;
    goal: string;
    period: string;
    days: string[];
    showEditActions?: boolean;
    layout?: 'default' | 'compact';
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
    period,
    days,
    showEditActions = true,
    layout = 'default',
}: FeedbackCardProps) => {
    const isCompact = layout === 'compact';

    return (
        <div className={`flex w-full gap-4 ${isCompact ? 'flex-col' : 'flex-col lg:flex-row'}`}>
            <div className="flex-1 rounded-2xl bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                    <span
                        className={`rounded-lg px-5 py-1.5 ui-caption ui-label text-grayscale-black ${SUBJECT_STYLE[subject]}`}
                    >
                        {subject}
                    </span>

                    <p className="font-bold">{task}</p>

                    <span
                        className={`ml-auto rounded-full px-3 py-1 ui-caption ${
                            isConfirmed ? 'bg-system-success text-white' : 'bg-grayscale-light-gray text-black'
                        }`}
                    >
                        멘토 확인
                    </span>
                </div>

                <div
                    className={`
                        mt-2 ui-caption
                        ${isCompact ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-x-10 gap-y-4'}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <span className="rounded-md bg-grayscale-medium-gray px-3 py-1 text-white whitespace-nowrap">
                            학습 목표
                        </span>
                        <span className="text-grayscale-dark-gray">{goal}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="rounded-md bg-grayscale-medium-gray px-3 py-1 text-white whitespace-nowrap">
                            학습 기간
                        </span>
                        <span className="text-grayscale-dark-gray">{period}</span>
                    </div>

                    <div className={`flex items-center gap-3 ${isCompact ? '' : 'col-span-2'}`}>
                        <span className="rounded-md bg-grayscale-medium-gray px-3 py-1 text-white whitespace-nowrap">
                            학습 요일
                        </span>
                        <div className="flex gap-2 flex-wrap">
                            {days.map((day) => (
                                <span
                                    key={day}
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-grayscale-light-gray text-black"
                                >
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showEditActions && <FeedbackActionBox />}
        </div>
    );
};

export default FeedbackCard;
