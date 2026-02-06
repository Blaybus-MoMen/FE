import WeeklySummaryPanel from '@/features/feedback/ui/weekly/WeeklySummaryPanel';

/**
 * @description 주간 피드백 전체 영역
 */
const WeeklyFeedbackLayout = () => {
    return (
        <section className="flex flex-1 flex-col gap-6 min-h-0 px-10 pb-10">
            <div className="flex w-full justify-between gap-4">
                <h3 className="text-primary-blue-dark">2026년 2월 주간 피드백</h3>

                <button
                    type="button"
                    className="rounded-[37px] bg-primary-blue-dark px-[30px] py-[12px] ui-button text-grayscale-bg-gray shadow-xl"
                >
                    + 추가하기
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <WeeklySummaryPanel />
            </div>
        </section>
    );
};

export default WeeklyFeedbackLayout;
