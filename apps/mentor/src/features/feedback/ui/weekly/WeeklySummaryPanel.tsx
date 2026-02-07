const Box = ({ title }: { title: string }) => (
    <section className="flex flex-col gap-2 box-border p-3 rounded-2xl bg-white shadow-md min-h-[180px]">
        <span className="inline-block rounded-full bg-grayscale-light-gray px-4 py-1 ui-overline">{title}</span>
        <span>
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
        </span>
    </section>
);

/**
 * @description 주간 피드백 영역
 */
const WeeklySummaryPanel = () => {
    return (
        <div className="flex flex-col gap-4 lg:gap-6">
            <Box title="멘토 총평" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Box title="이번주 잘한점" />
                <Box title="다음주 보완점" />
            </div>

            <Box title="✨ AI 요약" />
        </div>
    );
};

export default WeeklySummaryPanel;
