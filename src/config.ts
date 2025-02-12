import { LoaderCircle, LogIn, Music, TriangleAlert, UserIcon } from "lucide-react";


export const ICONS = {
    login: LogIn,
    loading: LoaderCircle,
    track: Music,
    artist: UserIcon,
    error: TriangleAlert
}

export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://spotify-api-starter-kappa.vercel.app";