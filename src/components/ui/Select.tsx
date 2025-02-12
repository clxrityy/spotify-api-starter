"use client";
import { ICONS } from "@/config";
import { SyntheticEvent } from "react";

type Props = {
    onSelected: (e: SyntheticEvent<HTMLInputElement, Event>) => void;
}

export const Select = ({ onSelected }: Props) => {

    return (
        <div
            className="w-[300px] px-4 py-5 bg-transparent flex flex-col gap-3 rounded-lg shadow-[0px_0px_15px_rgba(0,0,0,0.09)]"
        >
            <legend className="text-xl font-semibold mb-3 select-none">
                {
                    /*
                        Placeholder
                    */
                }
            </legend>
            <label className="font-medium h-14 relative flex items-center px-3 gap-3 rounded-lg has-[:checked]:font-bold has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
                <div className="w-5 fill-blue-400">
                    <ICONS.artist />
                </div>
                Artists
                <input
                    onChange={(e) => {
                        onSelected(e);
                    }}
                    type="radio"
                    name="status"
                    className="peer/html w-4 h-4 absolute accent-current right-3"
                    id="artists"
                    value={"artists"}
                />
            </label>
            <label className="font-medium h-14 relative flex items-center px-3 gap-3 rounded-lg has-[:checked]:font-bold has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
                <div className="w-5 fill-blue-400">
                    <ICONS.track />
                </div>
                Tracks
                <input
                    onChange={(e) => {
                        onSelected(e);
                    }}
                    type="radio"
                    name="status"
                    className="peer/html w-4 h-4 absolute accent-current right-3"
                    id="tracks"
                    value={"tracks"}
                />
            </label>
        </div>
    );
}