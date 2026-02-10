import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import WeeklySummaryPanel from '@/features/feedback/ui/weekly/WeeklySummaryPanel';
import {
    useGetWeeklyFeedbackListQuery,
    useSaveWeeklyFeedbackMutation,
    useRequestWeeklyAiSummaryMutation,
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
        weekStartDate: string;
        year: number;
        month: number;
    };
}

/**
 * @description 주간 피드백 전체 영역
 */
const WeeklyFeedbackLayout = ({ menteeId, dateParams }: Props) => {
    const { data } = useGetWeeklyFeedbackListQuery(menteeId, {
        yearMonth: dateParams.yearMonth,
        weekStartDate: dateParams.weekStartDate,
    });

    const feedback = data?.data?.[0];

    const [overallReview, setOverallReview] = useState('');
    const [wellDone, setWellDone] = useState('');
    const [toImprove, setToImprove] = useState('');
    const [aiSummary, setAiSummary] = useState('');

    useEffect(() => {
        if (!feedback) {
            setOverallReview('');
            setWellDone('');
            setToImprove('');
            setAiSummary('');
            return;
        }

        setOverallReview(feedback.overallReview ?? '');
        setWellDone(feedback.wellDone ?? '');
        setToImprove(feedback.toImprove ?? '');
        setAiSummary(feedback.aiSummary ?? '');
    }, [feedback?.feedbackId]);

    const saveMutation = useSaveWeeklyFeedbackMutation(menteeId);
    const aiMutation = useRequestWeeklyAiSummaryMutation(menteeId);

    const handleSave = () => {
        saveMutation.mutate({
            weekStartDate: dateParams.weekStartDate,
            overallReview,
            wellDone,
            toImprove,
            aiSummary,
        });
    };

    const handleAiSummary = () => {
        aiMutation.mutate(
            { weekStartDate: dateParams.weekStartDate },
            {
                onSuccess: (res) => {
                    if (res.data?.aiSummary) {
                        setAiSummary(res.data.aiSummary);
                    }
                },
            }
        );
    };

    const weekOfMonth = Math.ceil(new Date(dateParams.weekStartDate).getDate() / 7);

    const title = `${dateParams.year}년 ${dateParams.month}월 ${weekOfMonth}째 주 피드백`;

    return (
        <section className="flex flex-1 flex-col gap-6 min-h-0 px-4 pb-6 lg:px-10 lg:pb-10">
            <div className="flex w-full gap-4">
                <h3 className="text-primary -blue-dark flex-1">{title}</h3>
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
                <WeeklySummaryPanel
                    overallReview={overallReview}
                    wellDone={wellDone}
                    toImprove={toImprove}
                    aiSummary={aiSummary}
                    onChangeOverallReview={setOverallReview}
                    onChangeWellDone={setWellDone}
                    onChangeToImprove={setToImprove}
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
        </section>
    );
};

export default WeeklyFeedbackLayout;
