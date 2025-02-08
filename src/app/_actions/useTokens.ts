"use server";
import { cookies } from "next/headers";

export async function setTokens(accessToken: string, refreshToken?: string) {

    (await cookies()).set({
        name: "spotify_token",
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (refreshToken) {
        (await cookies()).set({
            name: "spotify_refresh_token",
            value: refreshToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }
}

export async function getToken() {
    const token = (await cookies()).get("spotify_token");

    return token?.value;
}

export async function deleteToken() {
    (await cookies()).delete("spotify_token");
}