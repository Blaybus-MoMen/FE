import { useState, useRef, useEffect } from "react";
import ReportTabMenu from "@/features/report/ui/ReportTabMenu";
import useCalendar from "@/shared/hooks/useCalendar";
import CommonMonthCalendar from "@/shared/ui/modal/CommonMonthCalendard";
import { ChevronDown } from "lucide-react";
import alarm from '@/assets/icons/alarm.svg';

const LEARNING_AREA_OPTIONS = [
    { value: "", label: "전체" },
    { value: "math", label: "최신순" },
    { value: "english", label: "등록일순" },
];

const ReportPage = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();
    const [learningArea, setLearningArea] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = LEARNING_AREA_OPTIONS.find((o) => o.value === learningArea)?.label ?? "선택하세요";

    return (
        <div className="h-full w-full">
            <ReportTabMenu />
            <CommonMonthCalendar
                selectedDate={selectedDate}
                displayMonth={displayMonth}
                onSelect={setSelectedDate}
                onChangeMonth={setDisplayMonth}
            />
            <div className="h-[132px] flex items-center justify-center mt-[16px] px-[16px]">
                <div
                    className="rounded-[30px] w-full h-full shadow-[0px_0px_10px_0px_#0000001A] flex items-center justify-center flex-col"
                    style={{
                        background: '#FFFFFFB2',
                        border: '2px solid transparent',
                    }}
                >
                    <div className="flex items-center gap-[4px]">
                        <img src={alarm} alt='alarm' />
                        <p className='text-[14px] text-grayscale-dark-gray'>총 학습시간</p>
                    </div>
                    <p className="mt-[4px] text-[40px] text-primary-blue timer">00:00:00</p>
                </div>
            </div>
            <div className="rounded-tl-[24px] rounded-tr-[24px] h-full bg-primary-blue-pale mt-[26px] px-[16px] py-[30px]">
                <div className="flex flex-wrap items-center gap-[8px] mb-[16px]">
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
                                                setLearningArea(opt.value);
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
                    <button type="button" className="h-fit px-[16px] py-[6px] text-[12px] text-grayscale-black bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset]">
                        국어
                    </button>
                    <button type="button" className="h-fit px-[16px] py-[6px] text-[12px] text-grayscale-black bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset]">
                        영어
                    </button>
                    <button type="button" className="h-fit px-[16px] py-[6px] text-[12px] text-grayscale-black bg-[#FEFEFE] rounded-[14px] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset]">
                        수학
                    </button>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <div className="w-full rounded-[14px] bg-[#FEFEFE] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset] flex pr-[8px]">
                        <div className="p-[14px] bg-point-yellow rounded-tl-[14px] rounded-bl-[14px] flex items-center justify-center text-[14px] text-grayscale-dark-gray">영어</div>
                        <div className="flex items-center justify-between flex-1 pl-[12px]">
                            <p className="text-[16px] text-grayscale-black">수능특강 듣기 p.20-23</p>
                            <div className="bg-grayscale-bg-gray rounded-[7px] flex items-center justify-center timer px-[14px] py-[6px]">
                                00:00:00
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-[14px] bg-[#FEFEFE] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset] flex pr-[8px]">
                        <div className="p-[14px] bg-point-yellow rounded-tl-[14px] rounded-bl-[14px] flex items-center justify-center text-[14px] text-grayscale-dark-gray">영어</div>
                        <div className="flex items-center justify-between flex-1 pl-[12px]">
                            <p className="text-[16px] text-grayscale-black">수능특강 듣기 p.20-23</p>
                            <div className="bg-grayscale-bg-gray rounded-[7px] flex items-center justify-center timer px-[14px] py-[6px]">
                                00:00:00
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-[14px] bg-[#FEFEFE] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset] flex pr-[8px]">
                        <div className="p-[14px] bg-point-yellow rounded-tl-[14px] rounded-bl-[14px] flex items-center justify-center text-[14px] text-grayscale-dark-gray">영어</div>
                        <div className="flex items-center justify-between flex-1 pl-[12px]">
                            <p className="text-[16px] text-grayscale-black">수능특강 듣기 p.20-23</p>
                            <div className="bg-grayscale-bg-gray rounded-[7px] flex items-center justify-center timer px-[14px] py-[6px]">
                                00:00:00
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ReportPage;