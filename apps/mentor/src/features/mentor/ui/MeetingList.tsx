import MeetingCard from "@/features/mentor/ui/MeetingCard";

/**
 * @description 미팅 목록 컴포넌트
 */
const MeetingList = () => {
    return (
        <section className="mt-16 flex-1 min-h-0 flex flex-col gap-5">
            <h3 className="text-grayscale-bg-gray">금일 미팅</h3>
            <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar">
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
            </div>
        </section>
    )
}

export default MeetingList;