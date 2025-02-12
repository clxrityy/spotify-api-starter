"use server"
import { BASE_URL } from "@/config";
import { setTokens } from "./useTokens";

export async function useCode(code?: string) {
    if (code) {
        try {
            const tokenResponse = await fetch(`${BASE_URL}/api/callback`, {
                method: 'POST',
                body: JSON.stringify({ code }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!tokenResponse.ok) {
                throw new Error(`HTTP error! status: ${tokenResponse.status}`);
            }

            const tokenData = await tokenResponse.json();

            try {
                await setTokens(tokenData.access_token, tokenData.refresh_token);
            } catch (e) {
                console.error(e);
            }

            const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`
                }
            });

            const userData = await userResponse.json();

            return userData;
        } catch (e) {
            console.error(e);
            return {
                error: e
            }
        }
    }
}