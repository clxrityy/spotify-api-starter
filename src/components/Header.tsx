import Link from "next/link"
import { ImageComponent } from "./ui/ImageComponent"

export const Header = () => {
    return (
        <header style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "6rem 2.5rem",
            gap: "1rem",
        }}>
            <h1>
                <Link href="/">
                    Spotify API Starter
                </Link>
            </h1>
            <ImageComponent 
                image={{
                    src: "/android-chrome-512x512.png",
                    alt: "Spotify API Starter",
                    width: 64,
                    height: 64,
                }} 
            />
        </header>
    )
}