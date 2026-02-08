import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface IAvatarProps extends ComponentPropsWithoutRef<"div"> {
    src?: string;
    alt?: string;
    children?: React.ReactNode;
    imgClassName?: string;
}

/**
 * @description 아바타 컴포넌트
 */
const Avatar = ({ src, alt = "", children, className, imgClassName, ...rest }: IAvatarProps) => {
    return (
        <div
            className={twMerge(
                "shrink-0 rounded-full flex items-center justify-center bg-grayscale-border overflow-hidden",
                className
            )}
            {...rest}
        >
            {src ? (
                <img src={src} alt={alt} className={twMerge("w-full h-full object-cover", imgClassName)} />
            ) : (
                children
            )}
        </div>
    );
};

export default Avatar;
