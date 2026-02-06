import { useState } from "react";
import ArrowDoubleDown from '@/assets/icons/arrow-double-down.svg';
import Calendar from "@/shared/ui/Calendar";
import MeetingList from "@/features/mentor/ui/MeetingList";

/**
 * @description 미팅 캘린더 패널(사이드, 하단 바) 컴포넌트
 */
const MeetCalendarPanel = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(true)
    return (
        <aside
            className="
            z-0 flex flex-col overflow-hidden bg-primary-blue
            fixed inset-x-0 bottom-0 w-full mt-6 rounded-t-[32px] pt-[11px] pb-[35px] px-4
            lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:inset-x-auto
            lg:w-[475px] lg:mt-0 lg:rounded-l-[40px] lg:rounded-tr-none lg:rounded-t-[0px]
            lg:pt-28 lg:pb-[35px] lg:px-14
        "
        >
            <button
                type="button"
                className="mb-3 flex w-full items-center justify-center lg:hidden cursor-default"
            >
                <img
                    src={ArrowDoubleDown}
                    alt={isAsideOpen ? "섹션 접기" : "섹션 펼치기"}
                    onClick={() => setIsAsideOpen(prev => !prev)}
                    className={`cursor-pointer transition-transform duration-200 ${isAsideOpen ? "" : "rotate-180"}`}
                />
            </button>
            <div
                className={
                    isAsideOpen
                        ? "flex-1 min-h-0 flex flex-col gap-5 lg:overflow-y-auto no-scrollbar"
                        : "flex-1 min-h-0 hidden lg:flex lg:flex-col gap-5 lg:overflow-y-auto no-scrollbar"
                }
            >
                <Calendar />
                <MeetingList />
            </div>
        </aside>
    )
}

export default MeetCalendarPanel;