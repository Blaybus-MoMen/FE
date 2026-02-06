import MeetingCard from "@/features/mentor/ui/MeetingCard";

/**
 * @description 미팅 목록 컴포넌트
 */
const MeetingList = () => {
    return (
        <section className="mt-0 flex flex-col gap-5">
            <h3 className="text-grayscale-bg-gray pl-[38px] lg:pl-0">금일 미팅</h3>
            <div
                className="
                    flex flex-col gap-5 max-h-[260px] overflow-y-auto no-scrollbar
                    md:flex-row md:flex-nowrap md:gap-4 md:max-h-none md:overflow-y-visible md:overflow-x-auto
                    lg:flex-col lg:overflow-x-visible lg:max-h-none lg:overflow-y-visible
                "
            >
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
            </div>
        </section>
    )
}

export default MeetingList;