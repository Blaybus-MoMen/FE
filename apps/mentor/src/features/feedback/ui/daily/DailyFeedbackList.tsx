import { useState } from 'react';
import SelectBox, { type ISelectOption } from '@/shared/ui/SelectBox';
import FeedbackCard from '@/features/feedback/ui/common/FeedbackCard';
import { useModalActions } from '@/shared/store/modal.store';

/**
 * @description 피드백 리스트 섹션
 */
const FeedbackList = () => {
    const [sort, setSort] = useState('latest');

    const { openModal } = useModalActions();

    const options: ISelectOption[] = [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' },
    ];

    return (
        <section className="flex flex-1 flex-col gap-6 min-h-0 px-4 lg:px-10 pb-10">
            <div className="flex items-center justify-end lg:justify-between gap-4">
                <div className="flex w-full justify-between lg:w-auto lg:justify-start gap-4">
                    <h3 className="text-primary-blue-dark">2026년 2월 18일</h3>

                    <SelectBox options={options} value={sort} onChange={setSort} triggerClassName="w-[110px]" />
                </div>

                <div className="hidden lg:flex gap-3">
                    <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-primary-blue-dark text-white shadow-xl">
                        –
                    </button>
                    <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-primary-blue-dark text-white shadow-xl" onClick={() => openModal('FEEDBACK')}>
                        +
                    </button>
                </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto no-scrollbar">
                <FeedbackCard
                    subject="국어"
                    task="독서 2지문"
                    isConfirmed={true}
                    goal="문항 독해력 향상"
                    period="26.02.12 - 26.02.18"
                    days={['월', '수']}
                />
                <FeedbackCard
                    subject="영어"
                    task="영어 1단원 본문"
                    isConfirmed={true}
                    goal="문법 학습"
                    period="26.02.12 - 26.02.18"
                    days={['화', '수']}
                />
                <FeedbackCard
                    subject="수학"
                    task="확률과 통계"
                    isConfirmed={false}
                    goal="계산 능력 향상"
                    period="26.02.12 - 26.02.28"
                    days={['화', '금']}
                />
                <FeedbackCard
                    subject="수학"
                    task="확률과 통계"
                    isConfirmed={false}
                    goal="계산 능력 향상"
                    period="26.02.12 - 26.02.28"
                    days={['화', '금']}
                />
                <FeedbackCard
                    subject="영어"
                    task="영어 1단원 본문"
                    isConfirmed={true}
                    goal="문법 학습"
                    period="26.02.12 - 26.02.18"
                    days={['화', '수']}
                />
            </div>

            <div className="flex justify-center pt-2">
                <button
                    type="button"
                    className="rounded-[37px] bg-primary-blue-dark px-[58px] py-[16px] ui-button text-grayscale-bg-gray shadow-xl"
                    onClick={() => openModal('FEEDBACK')}
                >
                    + 추가하기
                </button>
            </div>
        </section>
    );
};

export default FeedbackList;
