import { useRef, useState } from "react";
import ReportTabMenu from "@/features/report/ui/ReportTabMenu";
import useCalendar from "@/shared/hooks/useCalendar";
import CommonMonthCalendar from "@/shared/ui/modal/CommonMonthCalendard";
import { CalendarUtil } from "@/shared/utils/calendarUtil";
import alarm from '@/assets/icons/alarm.svg';
import ReportSubjectCard from "@/features/report/ui/ReportSubjectCard";
import ReportFilterSelectBox from "@/features/report/ui/ReportFilterSelectBox";
import WeekCalendarHeader from "@/shared/ui/WeekCalendarHeader";
import { ReportCardSlice } from "@/features/report/ui/ReportCardSlice";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ChevronLeft, ChevronRight } from "lucide-react";
import koLocale from "@fullcalendar/core/locales/ko";


export type Tab = "monthly" | "weekly" | "daily"


const ReportPage = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();
    const [learningArea, setLearningArea] = useState("");

    const [activeTab, setActiveTab] = useState<Tab>("daily")
    const calendarRef = useRef<FullCalendar>(null);

    const [currentDate, setCurrentDate] = useState(new Date());

    const handleDatesSet = (arg: { start: Date }) => {
        setCurrentDate(arg.start);
    };
    const yearMonthText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;


    return (
        <div className="h-full w-full flex flex-col min-h-0 bg-[#f3f3f3]">
            <ReportTabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "monthly" && (
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
                    <FullCalendar
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
                </>
            )}
            {activeTab === "weekly" && (
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
                    <div className="rounded-tl-[24px] rounded-tr-[24px] flex-1 min-h-0 flex flex-col bg-primary-blue-pale mt-[26px] px-[16px] py-[30px]">
                        <div className="flex flex-wrap items-center gap-[8px] mb-[16px] shrink-0">
                            <ReportFilterSelectBox selected={learningArea} setSelectedLabel={setLearningArea} />
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
            )}
            {activeTab === "daily" && (
                <div className="flex flex-col flex-1 pt-[32px]">
                    <CommonMonthCalendar
                        selectedDate={selectedDate}
                        displayMonth={displayMonth}
                        onSelect={setSelectedDate}
                        onChangeMonth={setDisplayMonth}
                    />
                    <div className="h-[132px] shrink-0 flex items-center justify-center mt-[16px] px-[16px]">
                        <div
                            className="rounded-[30px] w-full h-full shadow-[0px_0px_10px_0px_#0000001A] flex items-center justify-center flex-col"
                            style={{
                                background: '#FFFFFFB2',
                                border: '2px solid transparent',
                            }}
                        >
                            <div className="flex items-center gap-[4px]">
                                <img src={alarm} alt='alarm' />
                                <p className='text-[14px] text-grayscale-dark-gray'>총 학습시간</p>
                            </div>
                            <p className="mt-[4px] text-[40px] text-primary-blue timer">00:00:00</p>
                        </div>
                    </div>
                    <div className="rounded-tl-[24px] rounded-tr-[24px] flex-1 min-h-0 flex flex-col bg-primary-blue-pale mt-[26px] px-[16px] py-[30px]">
                        <div className="flex flex-wrap items-center gap-[8px] mb-[16px] shrink-0">
                            <ReportFilterSelectBox selected={learningArea} setSelectedLabel={setLearningArea} />
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
                </div>
            )}
        </div >
    )
}

export default ReportPage;