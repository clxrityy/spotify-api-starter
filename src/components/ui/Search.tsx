"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { Skeleton } from "./Skeleton";
import { SpotifyArtistResponse, SpotifyProfileTopTrackItem } from "@/util/types";
import { SearchArtistResult, SearchTrackResult } from "../SearchResult";
import { BASE_URL, ICONS } from "@/config";
import debounce from "lodash/debounce"


export const Search = ({ type }: { type: "artist" | "track" }) => {

    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const [results, setResults] = useState<SpotifyArtistResponse | SpotifyProfileTopTrackItem>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function getData({ type, query }: { type: "artist" | "track", query: string }) {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/search/${type}/${query}`, {
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        setResults(data);
        setLoading(false);

        return data;
    }

    const debouncedSearch = useCallback(debounce(async (searchQuery: string) => {

        if (searchQuery.length) {
            try {
                setLoading(true);
                await getData({ type: type, query: searchQuery });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
                console.error(err);
                setResults(undefined);
            }
            finally {
                setLoading(false);
            }
        }

    }, 300),
        [type]
    );

    const onChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setQuery(value);

        debouncedSearch(value);

    }, [debouncedSearch]);

    const onClick = useCallback((event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setActive(false);
            window.removeEventListener("click", onClick);
        }
    }, [searchRef]);

    const onFocus = useCallback(() => {
        setActive(true);
        window.addEventListener("click", onClick);
    }, [onClick]);

    const renderedResults = useMemo(() => {
        if (!results) return <ICONS.loading className="loader fill-white/50" size={200} />;

        return results.type === "artist" ? (
            <SearchArtistResult
                data={results as SpotifyArtistResponse}
            />
        ) : (
            <SearchTrackResult
                data={results as SpotifyProfileTopTrackItem}
            />
        );
    }, [results]);

    return (
        <div className="flex items-center justify-center">
            <div className="container">
                <div ref={searchRef} className={`flex flex-col space-y-10 items-center justify-end 2xl:flex-row 2xl:space-x-10`}>

                    <input
                        className="w-full h-12 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={onChange}
                        onFocus={onFocus}
                        value={query}
                        type="text"
                        placeholder={`Search for ${type === "artist" ? "Artists" : "Tracks"}`}
                    />
                    {
                        !error && active && query.length > 3 ? (
                            <div>
                                <div className="flex flex-col space-y-4">
                                    {renderedResults}
                                </div>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center">
                                <ICONS.error className="text-red-500" size={100} />
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : loading && (
                            <Skeleton className="w-full h-12" />
                        )
                    }
                </div>
            </div>
        </div>
    )
}