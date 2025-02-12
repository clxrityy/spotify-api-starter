import { cn } from "../../util/cn";
import { ComponentProps, CSSProperties } from "react";

interface Props extends ComponentProps<"div"> {
    gray?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
    opacity?: number;
    size?: {
        width: number | string;
        height: number | string;
    }
}

export const Skeleton = ({ gray, opacity, size, ...props }: Props) => {
    const { width, height } = size || { width: "100%", height: "100%" };

    const style: CSSProperties = {
        opacity,
        ...props.style
    };

    return (
        <div style={style} className={cn(`${gray ? `bg-gray-[${gray}]` : "bg-gray-600/75"} rounded-xl loader w-[${width}] h-[${height}]`)} />
    )
}