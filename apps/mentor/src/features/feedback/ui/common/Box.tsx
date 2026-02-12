interface BoxProps {
    title: string;
    height?: number;
    mentor?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    children?: React.ReactNode;
}

const Box = ({ title, height = 200, mentor = true, placeholder, value, onChange, children }: BoxProps) => (
    <section
        className="flex flex-col gap-3 box-border p-4 rounded-2xl bg-white shadow-md"
        style={{ minHeight: height }}
    >
        <span
            className={`self-start inline-block rounded-full px-4 py-1 ui-overline ${
                mentor ? 'bg-grayscale-dark-gray text-white' : 'bg-grayscale-border text-grayscale-dark-gray'
            }`}
        >
            {title}
        </span>

        {children ? (
            <div className="flex-1">{children}</div>
        ) : mentor ? (
            <textarea
                placeholder={placeholder}
                value={value ?? ''}
                onChange={(e) => onChange?.(e.target.value)}
                className="flex-1 w-full resize-none rounded-xl bg-grayscale-bg-gray p-4 outline-none border-0 placeholder:text-grayscale-light-gray text-base"
            />
        ) : (
            <div className="flex-1 rounded-xl p-4 text-base text-grayscale-dark-gray whitespace-pre-wrap">
                {value ?? ''}
            </div>
        )}
    </section>
);

export default Box;
