import { ChevronLeft, ChevronRight } from 'lucide-react';
import SelectBox, { type ISelectOption } from '@/shared/ui/SelectBox';
import { useState } from 'react';

interface Props {
    label: string;
    onPrev: () => void;
    onNext: () => void;
}

/**
 * @description 개별 피드백 카드
 */
const FeedbackPeriodHeader = ({ label, onPrev, onNext }: Props) => {
    const [sort, setSort] = useState('all');

    const options: ISelectOption[] = [
        { value: 'all', label: '전체' },
        { value: 'korean', label: '국어' },
        { value: 'english', label: '영어' },
        { value: 'math', label: '수학' },
    ];

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

            <SelectBox options={options} value={sort} onChange={setSort} triggerClassName="w-[110px]" />
        </div>
    );
};

export default FeedbackPeriodHeader;
