import { useModalActions } from '@/shared/store/modal.store';
import { MODAL_KEY } from '@/shared/model/modal';
import { ChevronLeft } from 'lucide-react';
import noti from '@/assets/icons/noti.svg';

const FeedbackConfirmModal = () => {
    const { closeModal } = useModalActions();

    return (
        <div
            className="fixed inset-0 z-[100] flex flex-col bg-[#F9F9F9]"
            role="dialog"
            aria-modal="true"
        >
            <header className="shrink-0 h-[56px] flex items-center px-4 bg-[#F9F9F9] border-b border-grayscale-border">
                <button
                    type="button"
                    onClick={() => closeModal(MODAL_KEY.LEARNING_INSPECTION)}
                    className="p-2 -ml-2 flex items-center justify-center text-grayscale-black"
                    aria-label="닫기"
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="flex-1 text-center text-[16px] font-medium text-grayscale-black pr-8">
                    피드백
                </h1>
                <img src={noti} alt="알림" />
            </header>
            <main className="flex-1 overflow-auto min-h-0 p-4">
                <div className='bg-[#FFF59D26] flex'>
                    <div className='w-[50px] bg-point-yellow rounded-tl-[19px] rounded-bl-[19px] flex items-center justify-center'>
                        <p className='text-ui-label text-grayscale-dark-gray'>{11}</p>
                    </div>
                    <div className='flex-1 flex items-center py-[18px]'>
                        <div className='pl-[20px] pr-[7px] flex justify-between w-full items-center'>
                            <div className='flex flex-col gap-[4px] w-full'>
                                <div className='flex justify-between w-full'>
                                    <p className='text-body-medium text-grayscale-black'>{22}</p>
                                    <div
                                        className='text-[12px] rounded-[20px] text-[#FEFEFE] py-[4px] px-[15px] bg-[#4CAF50]'
                                    >
                                        학습 완료
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex items-center gap-[6px]'>
                                        <p className='text-[12px] text-grayscale-black'>학습 목표</p>
                                        <p className='text-[12px] text-grayscale-black'>|</p>
                                        <p className='text-[12px] text-grayscale-black font-bold'>영어 듣기 향샹</p>
                                    </div>
                                    <div className='flex items-center gap-[6px]'>
                                        <p className='text-[12px] text-grayscale-black'>학습시간</p>
                                        <p className='text-[12px] text-grayscale-black'>|</p>
                                        <p className='text-[12px] text-grayscale-black font-bold'>54:50:30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[27px] bg-[#FEFEFE] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[12px] py-[5px] text-[12px] text-grayscale-black font-bold'>멘토 피드백</div>
                </div>
                <textarea className="mt-[20px] w-full bg-[#FEFEFE] h-[162px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] resize-none p-[14px] outline-none focus:outline-none text-[16px]" placeholder='멘토에게 궁금한 내용을 질문해주세요.' />
                <div className="bg-[#FEFEFE] mt-[14px] h-[169px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] p-[13px]">
                    <div className='bg-grayscale-border w-fit rounded-[182.13px] px-[39px] py-[5px] text-[12px] text-grayscale-black font-bold'>답변</div>
                </div>
                <button
                    type="button"
                    className="w-full mt-[24px] py-[14px] rounded-[10px] bg-primary-blue text-white text-[14px] font-medium"
                >
                    저장하기
                </button>

            </main >
        </div >
    );
};

export default FeedbackConfirmModal;
