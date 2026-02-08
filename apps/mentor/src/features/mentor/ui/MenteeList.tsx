import SelectBox, { type ISelectOption } from '@/shared/ui/SelectBox';
import MenteeCard from './MenteeCard';
import { useMemo, useState } from 'react';
import { useGetMenteeListQuery } from '@/entities/mentoring/queries/mentoring.queries';
import type { IMenteeCard } from '@/entities/mentoring/api/mentoring.api.type';

const MENTEE_SORT_OPTIONS: ISelectOption[] = [
    { value: 'high', label: '고학년순' },
    { value: 'low', label: '저학년순' },
];

const getGradeNumber = (grade: string): number => {
    const match = grade.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
};

/**
 * @description 멘티 목록 컴포넌트
 */
const MenteeList = () => {
    const [sortOrder, setSortOrder] = useState<'high' | 'low'>('high');

    const { data } = useGetMenteeListQuery();

    const mentees = data?.data ?? [];

    const sortedMentees = useMemo(() => {
        return [...mentees].sort((a, b) => {
            const gradeA = getGradeNumber(a.grade);
            const gradeB = getGradeNumber(b.grade);

            return sortOrder === 'high' ? gradeB - gradeA : gradeA - gradeB;
        });
    }, [mentees, sortOrder]);

    return (
        <section className="mt-10 lg:mr-[475px] flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex min-w-0 min-h-0 flex-1 flex-col gap-5 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between">
                        <h2 className="text-primary-blue-dark">멘티 목록</h2>
                        <SelectBox
                            options={MENTEE_SORT_OPTIONS}
                            value={sortOrder}
                            onChange={(value) => setSortOrder(value as 'high' | 'low')}
                        />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col">
                        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1 no-scrollbar">
                            <div className="flex flex-col gap-4">
                                {sortedMentees.length === 0 ? (
                                    <p className="text-center text-grayscale-bg-gray py-10">등록된 멘티가 없습니다.</p>
                                ) : (
                                    sortedMentees.map((mentee) => <MenteeCard key={mentee.menteeId} mentee={mentee} />)
                                )}
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-primary-blue hover:bg-primary-blue-dark rounded-full flex items-center justify-center rounded-[37px]">
                                    <p className="ui-button text-grayscale-bg-gray px-[58px] py-[16px]">+ 추가하기</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MenteeList;
