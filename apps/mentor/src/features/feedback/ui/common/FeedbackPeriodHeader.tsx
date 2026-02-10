import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    label: string;
    onPrev: () => void;
    onNext: () => void;
}

/**
 * @description 개별 피드백 카드
 */
const FeedbackPeriodHeader = ({ label, onPrev, onNext }: Props) => {
    return (
        <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 text-primary-blue">
                <button onClick={onPrev}>
                    <ChevronLeft />
                </button>
                <h4 className="font-bold text-lg">{label}</h4>

                <button onClick={onNext}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default FeedbackPeriodHeader;
