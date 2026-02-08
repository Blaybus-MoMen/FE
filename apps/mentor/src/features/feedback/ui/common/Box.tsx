interface BoxProps {
    title: string;
    height?: number;
    mentor?: boolean;
    placeholder?: string;
}

const Box = ({ title, height = 200, mentor = true, placeholder }: BoxProps) => (
    <section
        className="flex flex-col gap-3 box-border p-4 rounded-2xl bg-white shadow-md"
        style={{ minHeight: height }}
    >
        <span
            className={`self-start inline-block rounded-full box-border px-4 py-1 ui-overline ${
                mentor ? 'bg-grayscale-dark-gray text-white' : 'bg-grayscale-border text-grayscale-dark-gray'
            }`}
        >
            {title}
        </span>

        {mentor ? (
            <textarea
                placeholder={placeholder}
                className="flex-1 w-full resize-none rounded-xl bg-grayscale-bg-gray p-4 outline-none border-0 placeholder:text-grayscale-light-gray text-base"
            />
        ) : (
            <div className="flex-1 rounded-xl p-4 text-base text-grayscale-dark-gray"></div>
        )}
    </section>
);

export default Box;
