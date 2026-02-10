import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const triggerClass =
    'h-[28px] min-w-[56px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[50px] px-[15px] text-[14px] text-grayscale-black border-0 flex items-center justify-between gap-1 whitespace-nowrap';

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
};

export default MobileSelect;