const Box = ({ title, height = 230 }: { title: string; height?: number }) => (
    <section className="box-border p-3 rounded-2xl bg-white shadow-md" style={{ height: height }}>
        <span className="inline-block mb-3 rounded-full bg-grayscale-light-gray px-4 py-1 ui-overline">{title}</span>
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
