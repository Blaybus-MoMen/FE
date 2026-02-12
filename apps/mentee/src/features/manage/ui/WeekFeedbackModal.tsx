import { useModalActions } from '@/shared/store/modal.store';
import { MODAL_KEY } from '@/shared/model/modal';
import { ChevronLeft } from 'lucide-react';
import WeekCalendarHeader from '@/shared/ui/WeekCalendarHeader';
import useCalendar from '@/shared/hooks/useCalendar';
import { CalendarUtil } from '@/shared/utils/calendarUtil';
import { useGetWeekTodoFeedbackQuery } from '@/entities/feedback/queries/feedback.queries';
import { CommonUtil } from '@/shared/utils/commonUtil';

const WeekFeedbackModal = ({ date }: { date: string }) => {
    const { closeModal } = useModalActions();
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar(new Date(date));


    const formattedSelectedDate = CommonUtil.formatDateToYYYYMMDD(selectedDate as Date);

    const { data } = useGetWeekTodoFeedbackQuery(formattedSelectedDate);

    return (
        <div
            className="fixed inset-0 z-[100] flex flex-col bg-[#F9F9F9]"
            role="dialog"
            aria-modal="true"
        >
            <header className="shrink-0 h-[56px] flex items-center px-4 bg-[#F9F9F9] border-b border-grayscale-border">
                <button
                    type="button"
                    onClick={() => closeModal(MODAL_KEY.WEEK_FEEDBACK)}
                    className="p-2 -ml-2 flex items-center justify-center text-grayscale-black"
                    aria-label="닫기"
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="flex-1 text-center text-[16px] font-medium text-grayscale-black pr-8">
                    주간 피드백
                </h1>
            </header>
            <main className="flex-1 overflow-auto min-h-0 p-4">
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
                <div className="mt-[27px] bg-[#FEFEFE] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[27px] py-[5px] text-[12px] text-grayscale-black font-bold'>멘토 총평</div>
                    <div className='text-[14px] h-full overflow-y-auto no-scrollbar'>{data?.[0]?.overallReview || ''}</div>
                </div>
                <div className="mt-[27px] bg-[#FEFEFE] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[16px] py-[5px] text-[12px] text-grayscale-black font-bold'>이번주 잘한점</div>
                    <div className='text-[14px] h-full overflow-y-auto no-scrollbar'>{data?.[0]?.wellDone || ''}</div>
                </div>
                <div className="mt-[27px] bg-[#FEFEFE] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[9px] py-[5px] text-[12px] text-grayscale-black font-bold'>다음주 보완할 점</div>
                    <div className='text-[14px] h-full overflow-y-auto no-scrollbar'>{data?.[0]?.toImprove || ''}</div>
                </div>
                <div className="mt-[27px] bg-[#FEFEFE] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[32px] py-[5px] text-[12px] text-grayscale-black font-bold'>AI 요약</div>
                    <div className='text-[14px] h-full overflow-y-auto no-scrollbar'>{data?.[0]?.aiSummary || ''}</div>
                </div>
            </main >
        </div >
    );
};

export default WeekFeedbackModal;
