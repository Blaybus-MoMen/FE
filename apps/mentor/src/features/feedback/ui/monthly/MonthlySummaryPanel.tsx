const Box = ({ title, height = 230 }: { title: string; height?: number }) => (
    <section
        className="flex flex-col gap-2 box-border p-3 rounded-2xl bg-white shadow-md"
        style={{ minHeight: height }}
    >
        <span className="inline-block rounded-full bg-grayscale-light-gray px-4 py-1 ui-overline">{title}</span>
        <span>
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
        </span>
    </section>
);

/**
 * @description 월간 우측 패널 영역
 */
const MonthlySummaryPanel = () => {
    return (
        <div className="flex flex-col gap-6">
            <Box title="✨ AI 요약" height={300} />
            <Box title="코멘트" />
        </div>
    );
};

export default MonthlySummaryPanel;
