import FeedbackCard from '@/features/feedback/ui/common/FeedbackCard';

/**
 * @description 사이드 탭바에 들어갈 피드백 목록
 */
const FeedbackList = () => {
    return (
        <div className="flex-1 min-h-0 px-6 pb-6">
            <div className="h-full flex flex-col gap-4 overflow-y-auto pr-2 no-scrollbar">
                <FeedbackCard
                    subject="국어"
                    task="독서 2지문"
                    isConfirmed
                    goal="문항 독해력 향상"
                    period="26.02.12-26.02.18"
                    days={['월', '수']}
                    showEditActions={false}
                    layout="compact"
                />
                <FeedbackCard
                    subject="국어"
                    task="독서 2지문"
                    isConfirmed
                    goal="문항 독해력 향상"
                    period="26.02.12-26.02.18"
                    days={['월', '수']}
                    showEditActions={false}
                    layout="compact"
                />
                <FeedbackCard
                    subject="국어"
                    task="독서 2지문"
                    isConfirmed
                    goal="문항 독해력 향상"
                    period="26.02.12-26.02.18"
                    days={['월', '수']}
                    showEditActions={false}
                    layout="compact"
                />
            </div>
        </div>
    );
};

export default FeedbackList;
