"use client";

import { type SpotifyUserData } from "../util/types";
import { ImageComponent } from "./ui/ImageComponent";
// import { useEffect, useState, useRef } from "react";

// function useOutsideClick(ref: React.RefObject<HTMLDivElement | null>, callback: () => void) {
//     useEffect(() => {
//         const handleClick = (event: MouseEvent) => {
//             if (ref.current && !ref.current.contains(event.target as Node)) {
//                 callback();
//             }
//         };

//         document.addEventListener("mousedown", handleClick);
//         return () => {
//             document.removeEventListener("mousedown", handleClick);
//         };
//     }, [ref, callback]);
// }

export const User = ({ userData, handleClick }: { 
    userData: SpotifyUserData | null,
    handleClick: () => void
}) => {
    if (!userData) return null;

    return (
        <button className="z-20 flex flex-col items-center justify-center gap-10 cursor-pointer rounded-md bg-gray-800/50 shadow drop-shadow-xl hover:border-[var(--primary)]/50 hover:scale-110 transition-all" onClick={handleClick}>
            <div className="flex flex-row items-center gap-4 px-4 py-3">
                <ImageComponent
                    image={{
                        src: userData.images[0].url,
                        alt: userData.display_name,
                        width: userData.images[0].width || 64,
                        height: userData.images[0].height || 64,
                    }}
                    className="rounded-full border-2 border-gray-600 w-10 h-10"
                />

                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{userData.display_name}</h3>
                </div>
            </div>
        </button>
    )
}