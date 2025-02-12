"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { setTokens, deleteToken, getToken } from "./_actions/useTokens";
import { Suspense, useEffect, useState } from "react";
import { SpotifyUserData } from "../util/types";
import { BASE_URL, ICONS } from "../config";
import { User } from "../components/User";
import { Search } from "../components/ui/Search";


function Main() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    const router = useRouter();

    const [userData, setUserData] = useState<SpotifyUserData | null>(null);

    const handleUserClick = () => {
        if (userData) {
            router.push(`/profile/${userData.id}`);
        }
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();

            if (!token) {
                setIsLoading(false);
                return router.push('/');
            }

            try {
                const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (userResponse.ok) {
                    setUserData(await userResponse.json());
                }

            } catch (err) {
                await deleteToken();
                return router.push('/');
            } finally {
                setIsLoading(false);
            }

        }

        async function callback() {
            if (code) {
                try {
                    const response = await fetch(`${BASE_URL}/api/callback`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    });

                    if (!response.ok) {
                        console.log(await response.json());
                        throw new Error("Failed to exchange code for token");
                    }

                    const data = await response.json();

                    await setTokens(data.access_token, data.refresh_token);

                    return router.push("/");
                } catch (e) {
                    console.error(`Auth error: ${e}`);
                    return router.push("/");
                }
            }
        }

        if (code) {
            callback();
        }

        fetchData();
    }, [code, router]);

    if (isLoading) {
        return (
            <main className="flex h-full items-center justify-center">
                <ICONS.loading className="loader" size={200} />
            </main>
        );
    }


    if (userData) {
        return (
            <main className="p-8 relative">
                <nav className="fixed top-0 right-0 flex justify-between items-center p-4">
                    <User handleClick={handleUserClick} userData={userData} />
                </nav>
                <div className="flex flex-col items-center justify-center gap-10 w-1/2">
                    <h1 className="text-2xl mb-4">Welcome, {userData.display_name}!</h1>
                    <div className="flex flex-col items-center justify-center gap-5 px-5 py-2">
                        <Suspense fallback={<ICONS.loading className="loader" size={200} />}>
                            <Search type="artist" />
                            <Search type="track" />
                        </Suspense>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center gap-16 justify-center w-full">
            <button className="login-button">
                <Link
                    href={`/api/auth`}
                    className="flex flex-row items-center text-center justify-between gap-4"
                >
                    <svg viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                        </g>
                        <g id="SVGRepo_iconCarrier">
                            <title>Spotify-color</title>
                            <desc>Created with Sketch.</desc>
                            <defs> </defs>
                            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Color-" transform="translate(-200.000000, -460.000000)" fill="#ffffff"> <path d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460" id="Spotify">
                                </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Continue with Spotify
                </Link>
            </button>
            <div className="flex flex-col items-center justify-around gap-5 px-5 py-2">
                <Suspense fallback={<ICONS.loading className="loader" size={200} />}>
                    <Search type="artist" />
                    <Search type="track" />
                </Suspense>
            </div>
        </main>
    );
}

export default function Home() {
    return (
        <Suspense>
            <Main />
        </Suspense>
    )
}