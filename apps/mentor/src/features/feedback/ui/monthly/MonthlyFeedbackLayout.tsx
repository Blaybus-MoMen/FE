import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import MonthlySummaryPanel from './MonthlySummaryPanel';
import {
    useGetMonthlyFeedbackListQuery,
    useSaveMonthlyFeedbackMutation,
    useRequestMonthlyAiSummaryMutation,
} from '@/entities/feedback/queries/feedback.queries';

interface AISummaryButtonProps {
    onClick?: () => void;
    disabled?: boolean;
}

const AISummaryButton = ({ onClick, disabled }: AISummaryButtonProps) => {
    return (
        <button
            type="button"
            disabled={disabled}
            className="min-w-[160px] flex items-center justify-center gap-2 h-[41px] rounded-full border-2 border-[#EBEEF5] bg-gradient-to-r from-secondary-sky via-accent-purple to-point-yellow text-grayscale-black ui-button shadow-lg backdrop-blur-sm disabled:opacity-50"
            onClick={onClick}
        >
            <Sparkles size={18} />
            <span>{disabled ? '요약 중...' : 'AI 요약하기'}</span>
        </button>
    );
};

interface Props {
    menteeId: number;
    dateParams: {
        yearMonth: string;
        year: number;
        month: number;
    };
}

/**
 * @description 월간 전체 레이아웃
 */
const MonthlyFeedbackLayout = ({ menteeId, dateParams }: Props) => {
    const { data } = useGetMonthlyFeedbackListQuery(menteeId, {
        yearMonth: dateParams.yearMonth,
        year: dateParams.year,
    });

    const feedback = data?.data?.[0];

    const [aiSummary, setAiSummary] = useState('');
    const [mentorComment, setMentorComment] = useState('');

    useEffect(() => {
        if (feedback) {
            setAiSummary(feedback.aiSummary ?? '');
            setMentorComment(feedback.mentorComment ?? '');
        }
    }, [feedback]);

    useEffect(() => {
        setAiSummary('');
        setMentorComment('');

        if (feedback) {
            setAiSummary(feedback.aiSummary ?? '');
            setMentorComment(feedback.mentorComment ?? '');
        }
    }, [dateParams.year, dateParams.month, feedback]);

    const saveMutation = useSaveMonthlyFeedbackMutation(menteeId);
    const aiMutation = useRequestMonthlyAiSummaryMutation(menteeId);

    const handleSave = () => {
        saveMutation.mutate({
            year: dateParams.year,
            month: dateParams.month,
            aiSummary,
            mentorComment,
        });
    };

    const handleAiSummary = () => {
        aiMutation.mutate(
            { year: dateParams.year, month: dateParams.month },
            {
                onSuccess: (res) => {
                    if (res.data?.aiSummary) {
                        setAiSummary(res.data.aiSummary);
                    }
                },
            }
        );
    };

    const title = `${dateParams.year}년 ${dateParams.month}월 월간 피드백`;

    return (
        <div className="flex flex-1 flex-col gap-6 min-h-0 px-4 pb-6 lg:px-10 lg:pb-10">
            <div className="flex w-full justify-between gap-4">
                <h3 className="text-primary-blue-dark">{title}</h3>
                <div className="hidden lg:flex flex-row gap-4">
                    <AISummaryButton onClick={handleAiSummary} disabled={aiMutation.isPending} />
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saveMutation.isPending}
                        className="min-w-[140px] rounded-[37px] bg-primary-blue-dark px-[30px] py-[12px] ui-button text-grayscale-bg-gray shadow-xl disabled:opacity-50"
                    >
                        {saveMutation.isPending ? '저장 중...' : '저장하기'}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <MonthlySummaryPanel
                    aiSummary={aiSummary}
                    mentorComment={mentorComment}
                    onChangeMentorComment={setMentorComment}
                />
            </div>

            <div className="flex gap-4 lg:hidden flex-col items-center sm:flex-row sm:justify-center">
                <AISummaryButton onClick={handleAiSummary} disabled={aiMutation.isPending} />
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveMutation.isPending}
                    className="min-w-[160px] rounded-[37px] bg-primary-blue-dark px-[30px] py-[12px] ui-button text-grayscale-bg-gray shadow-xl disabled:opacity-50"
                >
                    {saveMutation.isPending ? '저장 중...' : '저장하기'}
                </button>
            </div>
        </div>
    );
};

export default MonthlyFeedbackLayout;
