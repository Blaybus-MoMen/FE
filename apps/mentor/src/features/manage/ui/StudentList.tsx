import { useState } from 'react';
import SelectBox, { type ISelectOption } from '@/shared/ui/SelectBox';
import StudentItem from '@/features/manage/ui/StudentItem';
import { useModalActions } from '@/shared/store/modal.store';

/**
 * @description 학생(멘티) 리스트 섹션
 */
const StudentList = () => {
    const [sort, setSort] = useState('latest');

    const { openModal } = useModalActions();

    const options: ISelectOption[] = [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' },
    ];

    return (
        <section className="flex flex-1 flex-col gap-6 min-h-0 px-4 md:px-10 pb-10">
            <div className="flex items-start justify-end md:justify-between gap-4">
                <div className="flex w-full justify-between md:w-auto md:justify-start gap-4">
                    <h3 className="text-primary-blue-dark">2026년 2월 18일</h3>

                    <SelectBox options={options} value={sort} onChange={setSort} triggerClassName="w-[110px]" />
                </div>

                <div className="hidden md:flex gap-3">
                    <button
                        onClick={() => openModal('FEEDBACK')}
                        type="button"
                        className="
                        hidden md:block
                        rounded-[37px]
                        bg-primary-blue-dark
                        px-[30px] py-[12px]
                        ui-button text-grayscale-bg-gray
                        shadow-xl
                    "
                    >
                        + 추가하기
                    </button>
                </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto no-scrollbar">
                <StudentItem
                    subject="국어"
                    task="독서 2지문"
                    isConfirmed={true}
                    goal="문항 독해력 향상"
                    showActions={false}
                />
                <StudentItem subject="영어" task="영어 1단원 본문" isConfirmed={true} goal="문법 학습" />
                <StudentItem subject="수학" task="확률과 통계" isConfirmed={false} goal="계산 능력 향상" />
                <StudentItem
                    subject="수학"
                    task="확률과 통계"
                    isConfirmed={false}
                    goal="계산 능력 향상"
                    showActions={false}
                />
                <StudentItem subject="영어" task="영어 1단원 본문" isConfirmed={true} goal="문법 학습" />
            </div>

            <div className="flex sm:hidden justify-center pt-2">
                <button
                    onClick={() => openModal('FEEDBACK')}
                    type="button"
                    className="rounded-[37px] bg-primary-blue-dark px-[58px] py-[16px] ui-button text-grayscale-bg-gray shadow-xl"
                >
                    + 추가하기
                </button>
            </div>
        </section>
    );
};

export default StudentList;
