import { useState } from "react";
import { useModalActions } from "@/shared/store/modal.store";
import { clsx } from "clsx";

const FEATURES = [
    '1등급 목표',
    '2등급 목표',
    '3등급 목표',
    '팩폭 환영',
    '유리 멘탈',
    '자기 주도',
    '아침형 인간',
    '내신 올킬',
    '벼락치기형',
    '체계적인',
    '꼼꼼함',
    '질문 많음',
    '이해 중심',
    '암기형',
    '기초부터',
    '슬로우한',
    '끈기있는',
    '만점목표'
] as const;

const MAX_SELECTION = 3;

const FEATURES_SET = new Set(FEATURES);

const FeatureModal = ({ features }: { features: string[] }) => {
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
                                "py-[4px] px-[14px] rounded-[20px] text-[14px] border-primary-blue border",
                                selected.includes(feature) ? "bg-[#E1ECFF80]" : "bg-[#FEFEFE]"
                            )}
                        >
                            {feature}
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    disabled={selected.length < MAX_SELECTION}
                    className={clsx(
                        "w-full mt-[24px] py-[14px] rounded-[10px] text-white text-[14px] font-medium",
                        selected.length >= MAX_SELECTION ? "bg-primary-blue" : "bg-primary-blue/70 cursor-not-allowed"
                    )}
                >
                    추가하기
                </button>
            </div>
        </div >
    )
}

export default FeatureModal;