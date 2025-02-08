import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Spotify API Starter",
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                
            </head>
            <body>{children}</body>
        </html>
    )
}