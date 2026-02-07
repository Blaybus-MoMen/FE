import FeedbackCard from '@/features/feedback/ui/common/FeedbackCard';

/**
 * @description 사이드 탭바에 들어갈 피드백 목록
 */
const FeedbackList = () => {
    return (
        <div className="flex-1 min-h-0 px-4 lg:px-6 pb-6">
            <div
                className="
                    h-full
                    flex flex-nowrap gap-4
                    overflow-x-auto lg:overflow-x-hidden
                    overflow-y-hidden lg:overflow-y-auto
                    no-scrollbar
                    lg:flex-col
                "
            >
                <div className="shrink-0 w-[280px] lg:w-auto">
                    <FeedbackCard
                        subject="국어"
                        task="독서 2지문"
                        isConfirmed
                        goal="문항 독해력 향상"
                        layout="compact"
                    />
                </div>

                <div className="shrink-0 w-[280px] lg:w-auto">
                    <FeedbackCard
                        subject="국어"
                        task="독서 2지문"
                        isConfirmed
                        goal="문항 독해력 향상"
                        layout="compact"
                    />
                </div>

                <div className="shrink-0 w-[280px] lg:w-auto">
                    <FeedbackCard
                        subject="국어"
                        task="독서 2지문"
                        isConfirmed
                        goal="문항 독해력 향상"
                        layout="compact"
                    />
                </div>

                <div className="shrink-0 w-[280px] lg:w-auto">
                    <FeedbackCard
                        subject="국어"
                        task="독서 2지문"
                        isConfirmed
                        goal="문항 독해력 향상"
                        layout="compact"
                    />
                </div>
            </div>
        </div>
    );
};

export default FeedbackList;
