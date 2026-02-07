import Box from '@/features/feedback/ui/common/Box';

/**
 * @description 주간 피드백 영역
 */
const WeeklySummaryPanel = () => {
    return (
        <div className="flex flex-col gap-4 lg:gap-6">
            <Box title="멘토 총평" placeholder="이번주 총평을 입력해주세요." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Box title="이번주 잘한점" placeholder="이번주 멘티가 잘한점을 알려주세요." />
                <Box title="다음주 보완점" placeholder="이번주 멘티가 보완할점을 알려주세요." />
            </div>

            <Box title="✨ AI 요약" mentor={false} />
        </div>
    );
};

export default WeeklySummaryPanel;
