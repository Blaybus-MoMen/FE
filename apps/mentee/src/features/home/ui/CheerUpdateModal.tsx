import { useState } from "react";
import { useModalActions } from "@/shared/store/modal.store";
import { MODAL_KEY } from "@/shared/model/modal";
import { useUpdateCheerMessageMutation } from "@/entities/study/queries/study.queries";

interface CheerUpdateModalProps {
    initialCheerMessage?: string;
}

const CheerUpdateModal = ({ initialCheerMessage = "" }: CheerUpdateModalProps) => {
    const { closeModal } = useModalActions();
    const { mutateAsync: updateCheerMessage } = useUpdateCheerMessageMutation();
    const [cheerMessageValue, setCheerMessageValue] = useState(initialCheerMessage);

    const handleConfirm = async () => {
        const trimmed = cheerMessageValue.trim();
        if (!trimmed || trimmed === initialCheerMessage) {
            closeModal(MODAL_KEY.CHEER_UPDATE);
            return;
        }
        try {
            await updateCheerMessage({ cheerMessage: trimmed });
            closeModal(MODAL_KEY.CHEER_UPDATE);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/50 p-6"
            role="presentation"
        >
            <div
                className="flex w-full max-w-[480px] flex-col items-center gap-4 rounded-2xl border border-gray-300 bg-white px-10 py-8 shadow-sm"
                role="dialog"
            >
                <h2 className="text-lg font-semibold text-grayscale-black">응원 메시지 수정</h2>
                <input
                    type="text"
                    value={cheerMessageValue}
                    onChange={(e) => setCheerMessageValue(e.target.value)}
                    placeholder="응원 메시지를 입력하세요"
                    className="w-full rounded-lg text-[16px] border border-grayscale-border px-4 py-3 text-grayscale-black outline-none placeholder:text-grayscale-light-gray focus:outline-none focus:border-grayscale-border"
                />
                <div className="flex w-full flex-row gap-3 mt-2">
                    <button
                        type="button"
                        className="w-full h-14 rounded-full border-2 border-grayscale-border bg-white px-6 py-4 text-grayscale-dark-gray hover:bg-grayscale-bg-gray ui-button"
                        onClick={() => closeModal(MODAL_KEY.CHEER_UPDATE)}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="w-full h-14 rounded-full bg-primary-blue px-6 py-4 text-white hover:bg-primary-blue-dark ui-button"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheerUpdateModal;
