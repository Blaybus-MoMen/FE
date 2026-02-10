import WeekCalendarHeader from "@/shared/ui/WeekCalendarHeader";
import { CalendarUtil } from "@/shared/utils/calendarUtil";
import ReportSubjectCard from "./ReportSubjectCard";
import { ReportCardSlice } from "./ReportCardSlice";
import { useState } from "react";
import useCalendar from "@/shared/hooks/useCalendar";
import { useGetWeeklyTodoListQuery } from "@/entities/study/queries/study.queries";
import { CommonUtil } from "@/shared/utils/commonUtil";
import { SUBJECT_LIST } from "@/shared/constants/constants";

const ReportWeeklyTodoList = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();

    const [filterSubject, setFilterSubject] = useState<string[]>([]);

    const handleFilterSubject = (subject: string) => {
        setFilterSubject((prev) =>
            prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
        )
    }

    const formattedSelectedDate = CommonUtil.formatDateToYYYYMMDD(selectedDate as Date);

    const { data } = useGetWeeklyTodoListQuery(formattedSelectedDate, filterSubject);

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
                <ReportCardSlice date={formattedSelectedDate} />
            </div>
            <div className="rounded-tl-[24px] rounded-tr-[24px] flex-1 min-h-0 flex flex-col bg-grayscale-bg-gray mt-[26px] px-[16px] py-[30px]">
                <div className="flex flex-wrap items-center gap-[8px] mb-[16px] shrink-0">
                    {SUBJECT_LIST.map((subject) => {
                        const isIncluded = filterSubject.includes(subject.value)
                        return (
                            <button
                                key={subject.value}
                                type="button"
                                className={`h-fit px-[16px] py-[6px] text-[12px] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset] ${isIncluded ? 'text-grayscale-black bg-[#FEFEFE]' : 'bg-[var(--color-grayscale-border)] text-grayscale-dark-gray'}`}
                                onClick={() => handleFilterSubject(subject.value)}
                            >
                                {subject.label}
                            </button>
                        )
                    })}
                </div>
                <div className="flex flex-col gap-[12px] flex-1 min-h-0 overflow-y-auto pb-24 no-scrollbar">
                    {!data?.length ? (
                        <div className="flex-1 flex items-center justify-center min-h-[120px]">
                            <p className="text-[14px] text-grayscale-medium-gray">조회된 항목이 없습니다</p>
                        </div>
                    ) : (
                        data.map((ev) => (
                            <ReportSubjectCard
                                key={ev.todoId}
                                subject={ev.subject}
                                time={`${ev.studyTimeHours ?? '00'}:${ev.studyTimeMinutes ?? '00'}:${ev.studyTimeSeconds ?? '00'}`}
                                title={ev.title}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default ReportWeeklyTodoList;