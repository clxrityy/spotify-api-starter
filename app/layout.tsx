import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-mont",
})

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
            <body className={montserrat.variable}>
                {children}
            </body>
        </html>
    )
}