import { useEffect, useRef, useState } from 'react';
import arrowBottomSvg from '@/assets/icons/arrow-bottom.svg';

export interface ISelectOption {
    value: string;
    label: string;
};

interface ISelectBoxProps {
    options: ISelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    triggerClassName?: string;
    dropdownClassName?: string;
    optionClassName?: string;
};

/**
 * @description 커스텀 셀렉트 박스
 */
const SelectBox = ({
    options,
    value = '',
    onChange,
    placeholder = '선택',
    triggerClassName = '',
    dropdownClassName = '',
    optionClassName = '',
}: ISelectBoxProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayLabel = selectedOption?.label ?? placeholder;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex w-[130px] items-center justify-between gap-[3px] rounded-[8px] border border-grayscale-border bg-white pt-2 pr-[5px] pb-2 pl-5 text-left body-medium text-grayscale-dark-gray shadow-[inset_0px_4px_4px_0px_#00000040] outline-none ${triggerClassName}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{displayLabel}</span>
                <img
                    src={arrowBottomSvg}
                    alt=""
                    className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                />
            </button>

            {isOpen && (
                <ul
                    className={`absolute top-full left-0 z-10 mt-1 max-h-60 w-full min-w-[120px] overflow-auto rounded-lg border border-grayscale-border bg-white py-1 shadow-lg ${dropdownClassName}`}
                    role="listbox"
                >
                    {options.map((option) => (
                        <li key={option.value} role="option" aria-selected={value === option.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange?.(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left body-medium hover:bg-grayscale-bg-gray outline-none ${value === option.value ? 'bg-primary-blue-pale text-primary-blue-dark' : 'text-grayscale-dark-gray'
                                    } ${optionClassName}`}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectBox;
