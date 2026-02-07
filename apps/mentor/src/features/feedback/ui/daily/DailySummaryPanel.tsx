import { ArrowRightLeft } from 'lucide-react';
import Box from '@/features/feedback/ui/common/Box';

/**
 * @description 일간 요약 패널
 */
const DailySummaryPanel = () => {
    return (
        <div className="flex flex-col gap-6">
            <Box title="이번주 잘 한 점" mentor={false} />
            <Box title="멘토 피드백" placeholder="피드백을 입력해주세요." />

            <section className="flex flex-col md:flex-row md:h-[250px] gap-6 box-border p-4 rounded-2xl bg-white shadow-md">
                <div className="flex flex-col gap-3 flex-1">
                    <span className="self-start inline-block rounded-full px-4 py-1 ui-overline bg-grayscale-border text-grayscale-dark-gray">
                        질문
                    </span>
                    <span className="flex-1 resize-none rounded-xl p-4 outline-none border-0 placeholder:text-grayscale-light-gray text-base" />
                </div>

                <div className="hidden md:flex items-start pt-1">
                    <ArrowRightLeft className="text-grayscale-light-gray" size={20} />
                </div>

                <div className="flex flex-col gap-3 flex-1">
                    <span className="self-start inline-block rounded-full px-4 py-1 ui-overline bg-grayscale-dark-gray text-white">
                        답변
                    </span>
                    <textarea
                        placeholder="답변을 입력해주세요."
                        className="flex-1 resize-none rounded-xl bg-grayscale-bg-gray p-4 outline-none border-0 placeholder:text-grayscale-light-gray text-base"
                    />
                </div>
            </section>
        </div>
    );
};

export default DailySummaryPanel;
