import WeeklySummaryPanel from '@/features/feedback/ui/weekly/WeeklySummaryPanel';
import { Sparkles } from 'lucide-react';

interface AISummaryButtonProps {
    onClick?: () => void;
}

const AISummaryButton = ({ onClick }: AISummaryButtonProps) => {
    return (
        <button
            type="button"
            className="
                min-w-[160px]
                flex items-center justify-center gap-2
                h-[41px]
                rounded-full

                border-2 border-[#EBEEF5]

                bg-gradient-to-r
                from-secondary-sky
                via-accent-purple
                to-point-yellow

                text-grayscale-black
                ui-button
                shadow-lg
                backdrop-blur-sm
            "
            onClick={onClick}
        >
            <Sparkles size={18} />
            <span>AI 요약하기</span>
        </button>
    );
};

/**
 * @description 주간 피드백 전체 영역
 */

const WeeklyFeedbackLayout = () => {
    return (
        <section className="flex flex-1 flex-col gap-6 min-h-0 px-4 pb-6 lg:px-10 lg:pb-10">
            <div className="flex w-full gap-4">
                <h3 className="text-primary-blue-dark flex-1">2026년 2월 주간 피드백</h3>

                <div className="hidden lg:flex flex-row gap-4">
                    <AISummaryButton />
                    <button
                        type="button"
                        className="
                            min-w-[140px]
                            rounded-[37px]
                            bg-primary-blue-dark
                            px-[30px] py-[12px]
                            ui-button text-grayscale-bg-gray
                            shadow-xl
                        "
                    >
                        저장하기
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <WeeklySummaryPanel />
            </div>

            <div
                className="
                    flex gap-4
                    lg:hidden
                    flex-col
                    items-center
                    sm:flex-row
                    sm:justify-center
                "
            >
                <AISummaryButton />

                <button
                    type="button"
                    className="
                        min-w-[160px]
                        rounded-[37px]
                        bg-primary-blue-dark
                        px-[30px] py-[12px]
                        ui-button text-grayscale-bg-gray
                        shadow-xl
                    "
                >
                    저장하기
                </button>
            </div>
        </section>
    );
};

export default WeeklyFeedbackLayout;
