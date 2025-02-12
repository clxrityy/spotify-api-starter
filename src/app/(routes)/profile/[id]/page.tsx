"use client";

import { deleteToken, getToken } from "@/app/_actions/useTokens";
import { ImageComponent } from "@/components/ui/ImageComponent";
import { ICONS } from "@/config";
import { SpotifyProfileTopArtistItem, SpotifyProfileTopData, SpotifyProfileTopTrackItem, SpotifyUserData } from "@/util/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface Props {
    params: Promise<{
        id: string;
    }>
}

export default function Page({ params }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<SpotifyUserData | null>(null);

    const [topArtistsData, setTopArtistsData] = useState<SpotifyProfileTopData<SpotifyProfileTopArtistItem> | null>(null);
    const [topTracksData, setTopTracksData] = useState<SpotifyProfileTopData<SpotifyProfileTopTrackItem> | null>(null);

    const router = useRouter();

    const { id } = use(params);

    // this effect is used to fetch the user data from the spotify api

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();

            if (!token) {
                setIsLoading(false);
                return router.push('/');
            }

            try {
                const userResponse = await fetch(`https://api.spotify.com/v1/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (userResponse.ok) {
                    setUserData(await userResponse.json());
                } else {
                    console.error("Error fetching user data:", userResponse.status);
                }

            } catch (err) {
                await deleteToken();
                return router.push('/');
            } finally {
                setIsLoading(false);
            }
        }

        if (!userData) {
            fetchData();
        }

    }, [params, router]);

    // this effect is used to fetch the top artists & tracks data from the spotify api
    useEffect(() => {
        async function fetchTopData() {
            try {
                const topArtistsResponse = await fetch(`http://localhost:3000/api/auth/profile/top/artists`)

                if (topArtistsResponse.ok) {
                    setTopArtistsData(await topArtistsResponse.json());
                } else {
                    console.error("Error fetching top artists data:", topArtistsResponse.status);
                }
            } catch (err) {
                console.error("Error occurred", err);
            }

            try {
                const topTracksResponse = await fetch(`http://localhost:3000/api/auth/profile/top/tracks`)

                if (topTracksResponse.ok) {
                    setTopTracksData(await topTracksResponse.json());
                } else {
                    console.error("Error fetching top tracks data:", topTracksResponse.status);
                }
            } catch (err) {
                console.error("Error occurred", err);
            }
        }

        if (!topArtistsData && !topTracksData) {
            fetchTopData();
        }
    }, [params, router]);


    if (isLoading) {
        return (
            <div className="w-full h-fit flex flex-col items-center justify-center gap-5">
                <ICONS.loading className="loader" size={200} />
            </div>
        );
    }

    if (userData && !isLoading) {
        return (
            <div className="w-full h-fit flex items-center justify-center py-8 px-10 relative mb-20">
                <div className="flex flex-col items-center justify-center gap-10 rounded-md shadow drop-shadow-xl z-10 w-full">
                    <div className="flex flex-row items-center justify-between gap-4 px-4 py-3">
                        {
                            userData.images[0] ? (
                                <ImageComponent image={{ src: userData.images[0].url, alt: userData.display_name, width: userData.images[0].width || 64, height: userData.images[0].height || 64 }} className="rounded-full w-10 h-10" />
                            ) : <ICONS.artist className="w-10 h-10 fill-blue-400" />
                        }
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold">{userData.display_name}</h3>
                            <p className="text-sm text-gray-400">{userData.id}</p>
                        </div>
                    </div>
                    <h1>
                        Current Top 10's
                    </h1>
                    <div className="flex flex-row items-center justify-center gap-10 w-full">
                        <div className="flex flex-col items-center justify-center gap-5 w-max">
                            <h2>
                                Artists
                            </h2>
                            <div className="flex flex-col gap-5 border border-blue-950 rounded-lg p-5 bg-gray-800 px-6 py-3 w-2/3">
                                {
                                    topArtistsData?.items ? (topArtistsData?.items.map((item, index) => (
                                        <div key={index} className="flex flex-row items-center justify-start gap-5 px-4 mx-1">
                                            <ImageComponent image={{ src: item.images[0].url, alt: item.name, width: 64, height: 64 }} className="rounded-full w-10 h-10" />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                            </div>
                                        </div>
                                    ))) : (
                                        <ICONS.loading className="loader" size={50} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5 w-max">
                            <h2>
                                Tracks
                            </h2>
                            {
                                topTracksData?.items ? (
                                    <div className="flex flex-col gap-5 border border-blue-950 rounded-lg p-5 bg-gray-800 py-3 px-4 w-2/3">
                                        {
                                            topTracksData?.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center justify-start gap-5 px-4 mx-1">
                                                    <ImageComponent image={{ src: item.album.images[0].url, alt: item.name!, width: 64, height: 64 }} className="rounded-full w-10 h-10" />
                                                    <div className="flex flex-col gap-2">
                                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                                        <p className="text-sm text-gray-400">{item.artists.map(artist => artist.name).join(", ")}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <ICONS.loading className="loader" size={50} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}