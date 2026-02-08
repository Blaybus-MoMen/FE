import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LEARNING_AREA_OPTIONS = [
    { value: "", label: "전체" },
    { value: "math", label: "최신순" },
    { value: "english", label: "등록일순" },
];

const ReportFilterSelectBox = ({ selected, setSelectedLabel }: { selected: string, setSelectedLabel: (label: string) => void }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = LEARNING_AREA_OPTIONS.find((o) => o.value === selected)?.label ?? "전체";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-between py-[5px] px-[16px] gap-[4px] text-[12px] text-grayscale-black bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset]"
            >
                <span>{selectedLabel}</span>
                <ChevronDown
                    size={16}
                    className={`shrink-0 text-grayscale-dark-gray transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
            </button>
            {dropdownOpen && (
                <ul className="absolute left-0 top-full mt-1 min-w-full py-1 bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset] shadow-lg z-10">
                    {LEARNING_AREA_OPTIONS.map((opt) => (
                        <li key={opt.value || "empty"}>
                            <button
                                type="button"
                                className="w-full text-left px-[16px] py-[6px] text-[12px] hover:bg-grayscale-bg-gray"
                                onClick={() => {
                                    setSelectedLabel(opt.value);
                                    setDropdownOpen(false);
                                }}
                            >
                                {opt.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default ReportFilterSelectBox;