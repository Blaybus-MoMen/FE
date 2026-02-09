import WeekCalendarHeader from "@/shared/ui/WeekCalendarHeader";
import { CalendarUtil } from "@/shared/utils/calendarUtil";
import ReportSubjectCard from "./ReportSubjectCard";
import ReportFilterSelectBox from "./ReportFilterSelectBox";
import { ReportCardSlice } from "./ReportCardSlice";
import { useState } from "react";
import useCalendar from "@/shared/hooks/useCalendar";
import { useGetWeeklyTodoListQuery } from "@/entities/study/queries/study.queries";

const ReportWeeklyTodoList = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();

    const [filterOption, setFilterOption] = useState("");

    // const { data } = useGetWeeklyTodoListQuery(selectedDate?.toISOString() ?? "");


    // console.log(data);

    return (
        <>
            <div className="pt-[32px] flex flex-col">
                <WeekCalendarHeader
                    displayMonth={displayMonth}
                    weekStartDate={CalendarUtil.startOfWeek(selectedDate ?? new Date(), 0)}
                    weekStart={0}
                    onPrev={() => {
                        const base = selectedDate ?? new Date();
                        const weekStart = CalendarUtil.startOfWeek(base, 0);
                        const prev = CalendarUtil.addDays(weekStart, -7);
                        setSelectedDate(prev);
                        setDisplayMonth(new Date(prev.getFullYear(), prev.getMonth(), 1));
                    }}
                    onNext={() => {
                        const base = selectedDate ?? new Date();
                        const weekStart = CalendarUtil.startOfWeek(base, 0);
                        const next = CalendarUtil.addDays(weekStart, 7);
                        setSelectedDate(next);
                        setDisplayMonth(new Date(next.getFullYear(), next.getMonth(), 1));
                    }}
                />
                <ReportCardSlice />
            </div>
            <div className="rounded-tl-[24px] rounded-tr-[24px] flex-1 min-h-0 flex flex-col bg-grayscale-bg-gray mt-[26px] px-[16px] py-[30px]">
                <div className="flex flex-wrap items-center gap-[8px] mb-[16px] shrink-0">
                    <button type="button" className="h-fit px-[16px] py-[6px] text-[12px] text-grayscale-black bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset]">
                        국어
                    </button>
                    <button type="button" className="h-fit px-[16px] py-[6px] text-[12px] text-grayscale-black bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset]">
                        영어
                    </button>
                    <button type="button" className="h-fit px-[16px] py-[6px] text-[12px] text-grayscale-black bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset]">
                        수학
                    </button>
                </div>
                <div className="flex flex-col gap-[12px] flex-1 min-h-0 overflow-y-auto pb-24 no-scrollbar">
                    <ReportSubjectCard />
                    <ReportSubjectCard />
                    <ReportSubjectCard />
                </div>
            </div>
        </>
    )
}

export default ReportWeeklyTodoList;