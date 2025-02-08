import Image from "next/image"
import Link from "next/link"

export const Header = () => {
    return (
        <header style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5rem 2.5rem",
            gap: "1rem",
        }}>
            <h1>
                <Link href="/">
                    Spotify API Starter
                </Link>
            </h1>
            <Image src="/android-chrome-512x512.png" alt="Spotify API Starter" width={50} height={50} />
        </header>
    )
}