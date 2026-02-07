import Box from '@/features/feedback/ui/common/Box';

/**
 * @description 월간 우측 패널 영역
 */
const MonthlySummaryPanel = () => {
    return (
        <div className="flex flex-col gap-6">
            <Box title="✨ AI 요약" height={300} mentor={false} />
            <Box title="코멘트" mentor={false} />
        </div>
    );
};

export default MonthlySummaryPanel;
