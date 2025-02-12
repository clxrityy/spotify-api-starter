"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "./Skeleton";

export const ImageComponent = (props: {
    image: Omit<ImageProps, "width" | "height"> & {
        width: number;
        height: number;
    }, 
    className?: string;
}) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={props.className}>
            {isLoading && (
                <Skeleton size={{
                    width: props.image.width,
                    height: props.image.height
                }} />
            )}
            <Image
                className={props.className}
                {...props.image}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    )
}