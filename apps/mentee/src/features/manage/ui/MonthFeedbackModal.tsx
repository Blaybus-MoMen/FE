import { useModalActions } from '@/shared/store/modal.store';
import { MODAL_KEY } from '@/shared/model/modal';
import { ChevronLeft } from 'lucide-react';
import noti from '@/assets/icons/noti.svg';
import useCalendar from '@/shared/hooks/useCalendar';
import MonthCalendarHeader from '@/shared/ui/MonthCalendarHeader';
import { CommonUtil } from '@/shared/utils/commonUtil';
import { useGetMonthTodoFeedbackQuery } from '@/entities/feedback/queries/feedback.queries';

const MonthFeedbackModal = ({ date }: { date: string }) => {
    const { closeModal } = useModalActions();
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar(new Date(date));

    const formattedSelectedDate = CommonUtil.formatDateToYYYYMM(selectedDate as Date);

    const { data } = useGetMonthTodoFeedbackQuery(formattedSelectedDate);
    return (
        <div
            className="fixed inset-0 z-[100] flex flex-col bg-[#F9F9F9]"
            role="dialog"
            aria-modal="true"
        >
            <header className="shrink-0 h-[56px] flex items-center px-4 bg-[#F9F9F9] border-b border-grayscale-border">
                <button
                    type="button"
                    onClick={() => closeModal(MODAL_KEY.MONTH_FEEDBACK)}
                    className="p-2 -ml-2 flex items-center justify-center text-grayscale-black"
                    aria-label="닫기"
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="flex-1 text-center text-[16px] font-medium text-grayscale-black pr-8">
                    월간 피드백
                </h1>
                <img src={noti} alt="알림" />
            </header>
            <main className="flex-1 overflow-auto min-h-0 p-4">
                <MonthCalendarHeader
                    displayMonth={displayMonth}
                    onPrev={() => {
                        const prevMonth = new Date(
                            displayMonth.getFullYear(),
                            displayMonth.getMonth() - 1,
                            1,
                        );
                        setSelectedDate(prevMonth);
                        setDisplayMonth(prevMonth);
                    }}
                    onNext={() => {
                        const nextMonth = new Date(
                            displayMonth.getFullYear(),
                            displayMonth.getMonth() + 1,
                            1,
                        );
                        setSelectedDate(nextMonth);
                        setDisplayMonth(nextMonth);
                    }}
                />
                <div className="mt-[27px] bg-[#FEFEFE] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[32px] py-[5px] text-[12px] text-grayscale-black font-bold'>AI 요약</div>
                    <div className='text-[14px] h-full overflow-y-auto no-scrollbar'>{data?.[0]?.aiSummary || ''}</div>
                </div>
                <div className="mt-[27px] bg-[#FEFEFE] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[33px] py-[5px] text-[12px] text-grayscale-black font-bold'>코멘트</div>
                    <div className='text-[14px] h-full overflow-y-auto no-scrollbar'>{data?.[0]?.mentorComment || ''}</div>
                </div>
            </main >
        </div >
    );
};

export default MonthFeedbackModal;
