import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "../components/Header";


const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-mont",
    preload: true,
})

export const metadata: Metadata = {
    title: "Spotify API Starter",
    icons: [
        {
            url: "/favicon.ico",
            type: "image/x-icon",
        },
        {
            url: "/favicon-32x32.png",
            type: "image/png",
            sizes: "32x32",
        },
        {
            url: "/favicon-16x16.png",
            type: "image/png",
            sizes: "16x16",
        },
        {
            url: "/apple-touch-icon.png",
            type: "image/png",
            sizes: "180x180",
        },
        {
            url: "/android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
        },
        {
            url: "/android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
        },
    ]
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="favicon.ico" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <link rel="manifest" href="site.webmanifest" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
            </head>
            <body className={montserrat.variable}>
                <Header />
                {children}
            </body>
        </html>
    );
}