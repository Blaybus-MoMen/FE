import FullCalendar from "@fullcalendar/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from "@fullcalendar/core/locales/ko";
import { useGetMonthlyTodoListQuery } from "@/entities/study/queries/study.queries";
import { CommonUtil } from "@/shared/utils/commonUtil";
import { SUBJECT_EVENT_COLOR } from "@/shared/constants/constants";
import { useModalActions } from "@/shared/store/modal.store";


const ReportMonthlyTodoList = () => {
    const calendarRef = useRef<FullCalendar>(null);

    const { openModal } = useModalActions();

    const [currentDate, setCurrentDate] = useState(new Date());

    const yearMonthText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

    const formattedCurrentDate = CommonUtil.formatDateToYYYYMM(currentDate);

    const { data: monthlyTodoList } = useGetMonthlyTodoListQuery(formattedCurrentDate);

    const handlePrev = () => {
        const calendarApi = calendarRef.current?.getApi();
        calendarApi?.prev();
        setCurrentDate(calendarApi?.getDate() ?? new Date());
    };

    const handleNext = () => {
        const calendarApi = calendarRef.current?.getApi();
        calendarApi?.next();
        setCurrentDate(calendarApi?.getDate() ?? new Date());
    };

    const calendarEvents = useMemo(() => {
        return monthlyTodoList?.map((todo) => ({
            id: String(todo.todoId),
            title: todo.title,
            start: todo.startDate,
            end: todo.endDate,
            backgroundColor: SUBJECT_EVENT_COLOR[todo.subject as 'KOREAN' | 'ENGLISH' | 'MATH'] ?? '#999999',
        })) ?? [];
    }, [monthlyTodoList]);

    return (
        <div className="flex flex-col pb-[80px]">
            <div className="flex items-center justify-center gap-4 pt-[32px] mb-[30px]">
                <button
                    onClick={handlePrev}
                    className="p-1 bg-transparent border-none hover:bg-transparent"
                >
                    <ChevronLeft size={24} />
                </button>

                <h2 className="text-[16px] font-normal">
                    {yearMonthText}
                </h2>

                <button
                    onClick={handleNext}
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
                    events={calendarEvents}
                    eventContent={(arg) => (
                        <div className="flex flex-col items-start text-[12px] font-normal border-none">
                            {arg.event.title}
                        </div>
                    )}
                    locale={koLocale}
                    dayCellContent={(arg) => <div>{arg.dayNumberText}</div>}
                />
            </div>
            <div className="w-full px-[16px]">
                <button
                    type="button"
                    className="w-full mt-[24px] py-[14px] rounded-[10px] bg-primary-blue text-white text-[14px] font-medium disabled:bg-grayscale-light-gray disabled:text-grayscale-dark-gray"
                    onClick={() => openModal('MONTH_FEEDBACK', { date: formattedCurrentDate })}
                >
                    월간 피드백 확인하기
                </button>
            </div>
        </div>
    )
}

export default ReportMonthlyTodoList;