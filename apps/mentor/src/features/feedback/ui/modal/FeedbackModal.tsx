import { useModalActions } from "@/shared/store/modal.store";

/**
 * @description 피드백 모달
 */
const FeedbackModal = () => {
    const { closeModal } = useModalActions();
    return (
        <div
            className="fixed inset-0 z-999 flex items-center justify-center bg-[#22222266] px-[38px] py-[27px]"
        >
            <div
                className="relative w-full max-w-[611px] min-h-[756px] bg-primary-blue-pale rounded-2xl p-8 shadow-[0px_2px_4px_1px_#00000040]"
            >
                <button
                    type="button"
                    className="absolute top-4 right-4 text-white text-xl"
                    onClick={() => closeModal('FEEDBACK')}
                >
                    ✕
                </button>

                <h1 className="text-white text-2xl font-bold">피드백 모달</h1>
                <p className="mt-4 text-white">내용을 여기에 넣으세요</p>
            </div>
        </div>
    )
}

export default FeedbackModal