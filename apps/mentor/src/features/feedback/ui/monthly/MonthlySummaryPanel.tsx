import Box from '@/features/feedback/ui/common/Box';

interface Props {
    aiSummary: string;
    mentorComment: string;
    onChangeMentorComment: (v: string) => void;
}

/**
 * @description 월간 우측 패널 영역
 */
const MonthlySummaryPanel = ({ aiSummary, mentorComment, onChangeMentorComment }: Props) => {
    return (
        <div className="flex flex-col gap-6">
            <Box title="✨ AI 요약" height={300} mentor={false} value={aiSummary} />
            <Box
                title="코멘트"
                placeholder="코멘트를 입력해주세요."
                value={mentorComment}
                onChange={onChangeMentorComment}
            />
        </div>
    );
};

export default MonthlySummaryPanel;
