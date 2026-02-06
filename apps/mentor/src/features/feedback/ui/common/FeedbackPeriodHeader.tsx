import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';
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
    const [sort, setSort] = useState('latest');

    const options: ISelectOption[] = [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' },
    ];

    return (
        <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 text-primary-blue">
                <button onClick={onPrev}>
                    <img src={arrowLeft} className="text-primary-blue" />
                </button>
                <h4 className="font-bold text-lg">{label}</h4>
                <button onClick={onNext}>
                    <img src={arrowRight} />
                </button>
            </div>

            <SelectBox options={options} value={sort} onChange={setSort} triggerClassName="w-[110px]" />
        </div>
    );
};

export default FeedbackPeriodHeader;
