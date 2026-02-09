import MenteeCard from './MenteeCard';
import { useGetMenteeListQuery } from '@/entities/mentoring/queries/mentoring.queries';

/**
 * @description 멘티 목록 컴포넌트
 */
const MenteeList = () => {
    const { data } = useGetMenteeListQuery();

    const mentees = data?.data ?? [];

    return (
        <section className="mt-10 lg:mr-[475px] flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex min-w-0 min-h-0 flex-1 flex-col gap-5 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between">
                        <h2 className="text-primary-blue-dark">멘티 목록</h2>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col">
                        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1 no-scrollbar">
                            <div className="flex flex-col gap-4">
                                {mentees.map((mentee) => (
                                    <MenteeCard key={mentee.menteeId} mentee={mentee} />
                                ))}
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
