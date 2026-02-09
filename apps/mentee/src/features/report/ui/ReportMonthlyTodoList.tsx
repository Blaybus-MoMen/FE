import FullCalendar from "@fullcalendar/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from "@fullcalendar/core/locales/ko";
import { useGetMonthlyTodoListQuery } from "@/entities/study/queries/study.queries";


const ReportMonthlyTodoList = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const handleDatesSet = (arg: { start: Date }) => {
        setCurrentDate(arg.start);
    };
    const yearMonthText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

    // const { data: monthlyTodoList } = useGetMonthlyTodoListQuery(currentDate.toISOString());


    // console.log(monthlyTodoList);

    return (
        <>
            <div className="flex items-center justify-center gap-4 pt-[32px] mb-[30px]">
                <button
                    onClick={() => calendarRef.current?.getApi().prev()}
                    className="p-1 bg-transparent border-none hover:bg-transparent"
                >
                    <ChevronLeft size={24} />
                </button>

                <h2 className="text-[16px] font-normal">
                    {yearMonthText}
                </h2>

                <button
                    onClick={() => calendarRef.current?.getApi().next()}
                    className="p-1 bg-transparent border-none hover:bg-transparent"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="w-full px-[16px]">
                <FullCalendar
                    height={458}
                    ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    headerToolbar={false}
                    events={[
                        { title: '국어 공부', start: '2026-02-08', end: '2026-02-10', backgroundColor: '#FFD700' },
                        { title: '영어 시험', start: '2026-02-10', backgroundColor: '#00BFFF' },
                    ]}
                    eventContent={(arg) => (
                        <div className="flex flex-col items-start text-[12px] font-normal border-none">
                            {arg.event.title}
                        </div>
                    )}
                    locale={koLocale}
                    datesSet={handleDatesSet}
                    dayCellContent={(arg) => <div>{arg.dayNumberText}</div>}
                />
            </div>
        </>
    )
}

export default ReportMonthlyTodoList;