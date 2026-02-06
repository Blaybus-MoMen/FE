import MeetingCard from "@/features/mentor/ui/MeetingCard";

/**
 * @description 미팅 목록 컴포넌트
 */
const MeetingList = () => {
    return (
        <section className="mt-0 flex flex-col gap-5">
            <h3 className="text-grayscale-bg-gray pl-[38px] lg:pl-0">
                금일 미팅 <span className="ml-1 text-[14px] align-middle">7건</span>
            </h3>
            <div
                className="
                    flex flex-row flex-nowrap gap-4 overflow-x-auto no-scrollbar
                    md:flex-row md:flex-nowrap md:gap-4 md:overflow-x-auto
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