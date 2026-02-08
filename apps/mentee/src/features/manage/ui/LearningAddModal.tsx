import { useState, useRef, useEffect } from 'react';
import { useModalActions } from '@/shared/store/modal.store';
import { MODAL_KEY } from '@/shared/model/modal';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

const YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();
const DAYS = (year: number, month: number) =>
    Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

const triggerClass =
    'h-[28px] min-w-[56px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[50px] px-[14px] text-[14px] text-grayscale-black border-0 flex items-center justify-between gap-1 whitespace-nowrap';

const MobileSelect = <T extends number | string>({
    value,
    options,
    getLabel,
    onChange,
    placeholder,
}: {
    value: T;
    options: T[];
    getLabel: (v: T) => string;
    onChange: (v: T) => void;
    placeholder?: string;
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('click', close, true);
        return () => document.removeEventListener('click', close, true);
    }, [open]);

    const label = options.includes(value) ? getLabel(value) : placeholder ?? '선택';

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={triggerClass}
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <span>{label}</span>
                <ChevronDown size={16} className={clsx('shrink-0 opacity-70', open && 'rotate-180')} aria-hidden />
            </button>
            {open && (
                <ul
                    role="listbox"
                    className="absolute top-full left-0 mt-1 z-[60] min-w-full max-h-[160px] overflow-y-auto rounded-[6px] bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] border border-grayscale-border py-1 list-none p-0 m-0"
                >
                    {options.map((opt) => (
                        <li
                            key={String(opt)}
                            role="option"
                            aria-selected={value === opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={clsx(
                                'px-3 py-2 text-[14px] text-grayscale-black cursor-pointer',
                                value === opt && 'bg-primary-blue-pale text-primary-blue'
                            )}
                        >
                            {getLabel(opt)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const SUBJECTS = ['국어', '영어', '수학'] as const;


const LearningAddModal = () => {
    const { closeModal } = useModalActions();
    const now = new Date();
    const [startYear, setStartYear] = useState(now.getFullYear());
    const [startMonth, setStartMonth] = useState(now.getMonth() + 1);
    const [startDay, setStartDay] = useState(now.getDate());
    const [endYear, setEndYear] = useState(now.getFullYear());
    const [endMonth, setEndMonth] = useState(now.getMonth() + 1);
    const [endDay, setEndDay] = useState(now.getDate());

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col justify-end "
            role="presentation"
            onClick={() => closeModal(MODAL_KEY.LEARNING_ADD)}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white min-h-[457px] shadow-[0px_7px_33px_0px_rgba(0,0,0,0.25)] py-[24px] px-[22px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center">
                    <h3 className="font-medium text-primary-blue">학습 추가</h3>
                </div>
                <div className='mt-[24px] flex flex-col gap-[16px] pb-[26px] border-b border-grayscale-bg-gray'>
                    <div className="flex gap-[28px] items-center">
                        <h4 className='text-[14px]'>과목</h4>
                        <div className="flex gap-[18px]">
                            {SUBJECTS.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    className={clsx(
                                        'py-[4px] px-[17px] rounded-[8px] text-[14px] shadow-[0px_2px_4px_0px_#00000026]',
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-[28px] items-center">
                        <h4 className='text-[14px]'>제목</h4>
                        <input
                            type="text"
                            className="h-[28px] w-[265px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[50px] px-[11px] py-[4px] text-[14px] placeholder:text-[12px]"
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                </div>
                <div className='mt-[13px] flex flex-col gap-[25px]'>
                    <div className="flex gap-[28px] items-center">
                        <h4 className='text-[14px]'>학습 목표</h4>
                        <input
                            type="text"
                            className="h-[28px] w-[242px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[50px] px-[11px] py-[4px] text-[14px] placeholder:text-[12px]"
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <ul className="flex flex-col gap-[13px] list-none p-0 m-0">
                        <li className="flex gap-[28px] items-center">
                            <h4 className="text-[14px] w-[72px] shrink-0">학습 시작</h4>
                            <div className="flex items-center gap-[6px] flex-wrap">
                                <MobileSelect
                                    value={startYear}
                                    options={YEARS}
                                    getLabel={(y) => `${y}년`}
                                    onChange={(y) => {
                                        setStartYear(y);
                                        const maxDay = getDaysInMonth(y, startMonth);
                                        if (startDay > maxDay) setStartDay(maxDay);
                                    }}
                                />
                                <MobileSelect
                                    value={startMonth}
                                    options={MONTHS}
                                    getLabel={(m) => `${m}월`}
                                    onChange={(m) => {
                                        setStartMonth(m);
                                        const maxDay = getDaysInMonth(startYear, m);
                                        if (startDay > maxDay) setStartDay(maxDay);
                                    }}
                                />
                                <MobileSelect
                                    value={Math.min(startDay, getDaysInMonth(startYear, startMonth))}
                                    options={DAYS(startYear, startMonth)}
                                    getLabel={(d) => `${d}일`}
                                    onChange={setStartDay}
                                />
                            </div>
                        </li>
                        <li className="flex gap-[28px] items-center">
                            <h4 className="text-[14px] w-[72px] shrink-0">학습 종료</h4>
                            <div className="flex items-center gap-[6px] flex-wrap">
                                <MobileSelect
                                    value={endYear}
                                    options={YEARS}
                                    getLabel={(y) => `${y}년`}
                                    onChange={(y) => {
                                        setEndYear(y);
                                        const maxDay = getDaysInMonth(y, endMonth);
                                        if (endDay > maxDay) setEndDay(maxDay);
                                    }}
                                />
                                <MobileSelect
                                    value={endMonth}
                                    options={MONTHS}
                                    getLabel={(m) => `${m}월`}
                                    onChange={(m) => {
                                        setEndMonth(m);
                                        const maxDay = getDaysInMonth(endYear, m);
                                        if (endDay > maxDay) setEndDay(maxDay);
                                    }}
                                />
                                <MobileSelect
                                    value={Math.min(endDay, getDaysInMonth(endYear, endMonth))}
                                    options={DAYS(endYear, endMonth)}
                                    getLabel={(d) => `${d}일`}
                                    onChange={setEndDay}
                                />
                            </div>
                        </li>
                    </ul>
                    <div className="flex flex-col gap-[17px] md:flex-row md:gap-[51px]">
                        <h4>학습 요일</h4>
                        <div className="w-full md:w-[75%] flex gap-[15px] items-center">
                            <button
                                type="button"
                                className="w-[37px] h-[37px] bg-grayscale-bg-gray rounded-full text-grayscale-medium-gray"
                            >
                                일
                            </button>
                            <button
                                type="button"
                                className="w-[37px] h-[37px] bg-grayscale-bg-gray rounded-full text-grayscale-medium-gray"
                            >
                                월
                            </button>
                            <button
                                type="button"
                                className="w-[37px] h-[37px] bg-grayscale-bg-gray rounded-full text-grayscale-medium-gray"
                            >
                                화
                            </button>
                            <button
                                type="button"
                                className="w-[37px] h-[37px] bg-[#001871] rounded-full text-[#FEFEFE]"
                            >
                                수
                            </button>
                            <button
                                type="button"
                                className="w-[37px] h-[37px] bg-grayscale-bg-gray rounded-full text-grayscale-medium-gray"
                            >
                                목
                            </button>
                            <button
                                type="button"
                                className="w-[37px] h-[37px] bg-grayscale-bg-gray rounded-full text-grayscale-medium-gray"
                            >
                                금
                            </button>
                            <button
                                type="button"
                                className="w-[37px] h-[37px] bg-grayscale-bg-gray rounded-full text-grayscale-medium-gray"
                            >
                                토
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="w-full mt-[24px] py-[14px] rounded-[50px] bg-primary-blue text-white text-[14px] font-medium"
                >
                    추가하기
                </button>
            </div>
        </div >
    );
};

export default LearningAddModal;
