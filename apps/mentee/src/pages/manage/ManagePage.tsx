import { useGetDailyTodoListQuery } from "@/entities/study/queries/study.queries";
import TodoCard from "@/features/manage/ui/TodoCard";
import useCalendar from "@/shared/hooks/useCalendar";
import { useModalActions } from "@/shared/store/modal.store";
import CommonMonthCalendar from "@/shared/ui/modal/CommonMonthCalendard";
import { CommonUtil } from "@/shared/utils/commonUtil";
import { Plus } from "lucide-react";

const ManagePage = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();

    const { openModal } = useModalActions()

    const formattedSelectedDate = CommonUtil.formatDateToYYYYMMDD(selectedDate as Date);

    const { data } = useGetDailyTodoListQuery(formattedSelectedDate)

    return (
        <div className="h-full w-full flex flex-col min-h-0 bg-[#e1ecff]">
            <CommonMonthCalendar
                selectedDate={selectedDate}
                displayMonth={displayMonth}
                onSelect={setSelectedDate}
                onChangeMonth={setDisplayMonth}
            />
            <div className="overflow-auto flex-1 min-h-0 flex flex-col gap-[12px] pt-[14px] px-[13px] pb-[80px] no-scrollbar">
                {!data?.length ? (
                    <div className="flex-1 flex items-center justify-center min-h-[200px]">
                        <p className="text-[14px] text-grayscale-medium-gray">조회된 항목이 없습니다</p>
                    </div>
                ) : (
                    data.map((todo) => (
                        <TodoCard key={todo.todoId} title={todo.title} subject={todo.subject} goalDescription={todo.goalDescription} mentorConfirmed={todo.mentorConfirmed} hasFeedback={todo.hasFeedback} studyTimeHours={todo.studyTimeHours} studyTimeMinutes={todo.studyTimeMinutes} studyTimeSeconds={todo.studyTimeSeconds} />
                    ))
                )}
            </div>
            <button
                type="button"
                onClick={() => openModal('LEARNING_ADD', { date: formattedSelectedDate })}
                aria-label="추가"
                className="fixed bottom-[90px] right-4 w-[55px] h-[55px] rounded-full bg-primary-blue flex items-center justify-center text-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] z-40"
            >
                <Plus size={24} strokeWidth={2.5} />
            </button>
        </div >
    )
}

export default ManagePage;