import { useState } from "react";
import { useModalActions } from "@/shared/store/modal.store";
import { clsx } from "clsx";
import { useUpdateCardMutation } from "@/entities/study/queries/study.queries";
import { useQueryClient } from "@tanstack/react-query";

const FEATURES = [
    '팩폭 환영',
    '유리 멘탈',
    '아침형 인간',
    '내신 올킬',
    '벼락치기형',
    '전교 1등 도전',
    '꼼꼼함',
    '끈기있는',
    '질문 많음',
    '집중력 갑',
    '집중력 부족',
    '이해 중심',
    '암기형',
    '기초부터',
    '만점목표',
    '인서울 목표',
    '수포자 탈출',
    '영포자 탈출',
    '슬로우 스타터',
] as const;


const MAX_SELECTION = 3;

const FEATURES_SET = new Set(FEATURES);

const FeatureModal = ({ features }: { features: string[] }) => {
    const queryClient = useQueryClient();
    const { closeModal } = useModalActions();
    const [selected, setSelected] = useState<(typeof FEATURES)[number][]>(() =>
        features.filter((f): f is (typeof FEATURES)[number] => FEATURES_SET.has(f as (typeof FEATURES)[number]))
    );

    const handleSelect = (feature: (typeof FEATURES)[number]) => {
        setSelected((prev) =>
            prev.includes(feature)
                ? prev.filter((f) => f !== feature)
                : prev.length < MAX_SELECTION
                    ? [...prev, feature]
                    : prev
        );
    };

    const { mutateAsync: updateCard } = useUpdateCardMutation();

    const handleUpdateCard = async () => {
        try {
            await updateCard({ cards: selected });
            queryClient.invalidateQueries({
                queryKey: ['getMyPageInfo'],
            });
            closeModal('FEATURE');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col justify-end "
            role="presentation"
            onClick={() => closeModal('FEATURE')}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white min-h-[457px] shadow-[0px_7px_33px_0px_rgba(0,0,0,0.25)] py-[24px] px-[22px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center">
                    <h3 className="font-medium text-primary-blue">특징 선택하기</h3>
                </div>
                <div className="grid grid-cols-3 gap-[12px] mt-[24px]">
                    {FEATURES.map((feature) => (
                        <button
                            key={feature}
                            type="button"
                            onClick={() => handleSelect(feature)}
                            className={clsx(
                                "py-[4px] px-[7px] rounded-[20px] text-[14px] border-primary-blue border",
                                selected.includes(feature) ? "bg-[#D5E4FF]" : "bg-[#FEFEFE]"
                            )}
                        >
                            {feature}
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    disabled={selected.length < MAX_SELECTION}
                    onClick={handleUpdateCard}
                    className={clsx(
                        "w-full mt-[24px] py-[14px] rounded-[10px] text-[14px] font-medium",
                        selected.length >= MAX_SELECTION
                            ? "bg-primary-blue text-white"
                            : "bg-grayscale-light-gray text-grayscale-dark-gray cursor-not-allowed"
                    )}
                >
                    수정하기
                </button>
            </div>
        </div >
    )
}

export default FeatureModal;