import { Trash2 } from 'lucide-react';

const actionBtnBase = 'border-3 border-primary-blue-dark rounded-full px-3 py-2 ui-button shadow-xl';

/**
 * @description 피드백 카드 우측 액션 버튼 영역
 */
const FeedbackActionBox = () => {
    return (
        <div className="w-full h-full lg:w-[200px] flex justify-center items-center rounded-2xl bg-grayscale-border p-4">
            <div className="w-full lg:w-[150px] flex flex-col gap-3">
                <div className="flex gap-1">
                    <button className={`${actionBtnBase} bg-white text-primary-blue-dark`}>수정하기</button>
                    <button className={`${actionBtnBase} bg-white text-primary-blue-dark`}>
                        <Trash2 />
                    </button>
                </div>

                <button className={`${actionBtnBase} bg-primary-blue-dark text-white`}>피드백 남기기</button>
            </div>
        </div>
    );
};

export default FeedbackActionBox;
