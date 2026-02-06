const Box = ({ title }: { title: string }) => (
    <section className="box-border p-3 rounded-2xl bg-white shadow-md h-[180px]">
        <span className="inline-block rounded-full bg-grayscale-light-gray px-4 py-1 ui-overline">{title}</span>
    </section>
);

/**
 * @description 주간 피드백 영역
 */
const WeeklySummaryPanel = () => {
    return (
        <div className="flex flex-col gap-6">
            <Box title="멘토 총평" />

            <div className="grid grid-cols-2 gap-6">
                <Box title="이번주 잘한점" />
                <Box title="다음주 보완점" />
            </div>

            <Box title="✨ AI 요약" />
        </div>
    );
};

export default WeeklySummaryPanel;
