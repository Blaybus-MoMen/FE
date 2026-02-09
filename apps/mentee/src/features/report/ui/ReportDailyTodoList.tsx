import { useGetDailyStudyTimeQuery, useGetDailyTodoListQuery } from "@/entities/study/queries/study.queries";
import CommonMonthCalendar from "@/shared/ui/modal/CommonMonthCalendard";
import ReportSubjectCard from "./ReportSubjectCard";
import alarm from '@/assets/icons/alarm.svg';
import { useState } from "react";
import { SUBJECT_LIST } from "@/shared/constants/constants";
import { CommonUtil } from "@/shared/utils/commonUtil";
import useCalendar from "@/shared/hooks/useCalendar";


const ReportDailyTodoList = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();

    const formattedSelectedDate = CommonUtil.formatDateToYYYYMMDD(selectedDate as Date);


    const [filterSubject, setFilterSubject] = useState<string[]>([]);

    const handleFilterSubject = (subject: string) => {
        setFilterSubject((prev) =>
            prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
        )
    }

    const { data } = useGetDailyTodoListQuery(formattedSelectedDate, filterSubject);

    const { data: studyTimeData } = useGetDailyStudyTimeQuery(formattedSelectedDate);


    return (
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
                    <p className="mt-[4px] text-[40px] text-primary-blue timer">{studyTimeData?.totalHours ?? '00'}:{studyTimeData?.totalMinutes ?? '00'}:{studyTimeData?.totalSeconds ?? '00'}</p>
                </div>
            </div>
            <div className="rounded-tl-[24px] rounded-tr-[24px] flex-1 min-h-0 flex flex-col bg-grayscale-bg-gray mt-[26px] px-[16px] py-[30px]">
                {!!data?.length && (
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
                )}
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
        </div>
    )
}

export default ReportDailyTodoList;