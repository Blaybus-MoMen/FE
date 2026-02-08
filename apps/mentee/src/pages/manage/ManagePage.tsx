import useCalendar from "@/shared/hooks/useCalendar";
import { useModalActions } from "@/shared/store/modal.store";
import CommonMonthCalendar from "@/shared/ui/modal/CommonMonthCalendard";
import { Plus, Trash2 } from "lucide-react";

const ManagePage = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();

    const { openModal } = useModalActions()


    return (
        <div className="h-full w-full flex flex-col min-h-0 bg-[#f3f3f3]">
            <CommonMonthCalendar
                selectedDate={selectedDate}
                displayMonth={displayMonth}
                onSelect={setSelectedDate}
                onChangeMonth={setDisplayMonth}
            />
            <div className="overflow-auto flex-1 min-h-0 flex flex-col gap-[12px] pt-[14px] px-[13px] pb-[80px] no-scrollbar">
                <div className="bg-[#FEFEFE80] shadow-[0px_2px_5px_2px_#00000012] rounded-[25px] p-[8px]" aria-label="학습 리포트" onClick={() => openModal('LEARNING_INSPECTION')}>
                    <div className='bg-[#FFF59D26] h-[79px] flex'>
                        <div className='w-[50px] bg-point-yellow rounded-tl-[19px] rounded-bl-[19px] flex items-center justify-center'>
                            <p className='text-ui-label text-grayscale-dark-gray'>{11}</p>
                        </div>
                        <div className='flex-1 flex items-center'>
                            <div className='pl-[20px] pr-[7px] flex justify-between w-full items-center'>
                                <div className='flex flex-col gap-[4px]'>
                                    <p className='text-body-medium text-grayscale-black'>{22}</p>
                                    <div className='flex items-center gap-[6px]'>
                                        <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>{33}</p>
                                        <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>|</p>
                                        <p className='text-[12px] text-grayscale-medium-gray text-grayscale-black'>{44}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[4px]">
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); openModal('MONTH_FEEDBACK') }}
                                        className='text-[10px] rounded-[50px] bg-grayscale-medium-gray text-[#FEFEFE] py-[5px] px-[10px]'
                                    >
                                        피드백 확인하기
                                    </button>
                                    <button className='text-[10px] bg-grayscale-border text-grayscale-dark-gray rounded-[50px] flex gap-[4px] items-center py-[5px] px-[10px] justify-center'>
                                        <Trash2 size={15} />
                                        <p>삭제하기</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <button
                type="button"
                onClick={() => openModal('LEARNING_ADD')}
                aria-label="추가"
                className="fixed bottom-[90px] right-4 w-[55px] h-[55px] rounded-full bg-primary-blue flex items-center justify-center text-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] z-40"
            >
                <Plus size={24} strokeWidth={2.5} />
            </button>
        </div >
    )
}

export default ManagePage;