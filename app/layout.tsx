import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { connectDB } from "@/lib/db";
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from "react";
import localFont from "next/font/local";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const cal = localFont({
    src: "../public/fonts/CalSans.ttf",
    variable: "--font-calsans",
    weight: "400",
});

export const metadata: Metadata = {
    title: {
        default: "Scythe Client - Best Minecraft PvP Client for Performance",
        template: "%s | Scythe Client"
    },
    description: "Scythe Client is a high-performance Minecraft client with Sodium, optimized for PvP. Get 200%+ FPS boost, custom crosshairs, and essential combat features. Free download for Windows.",
    keywords: ["Minecraft client", "PvP client", "Sodium client", "Minecraft FPS boost", "best Minecraft client", "Minecraft performance", "custom crosshair", "Minecraft mods"],
    authors: [{ name: "Scythe Client Team" }],
    creator: "Scythe Client",
    publisher: "Scythe Client",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://scytheclient.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Scythe Client - Best Minecraft PvP Client for Performance",
        description: "High-performance Minecraft client with 200%+ FPS boost. Built on Sodium with essential PvP features. Free download available.",
        url: 'https://scytheclient.com',
        siteName: 'Scythe Client',
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Scythe Client - Minecraft Performance Client',
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Scythe Client - Best Minecraft PvP Client",
        description: "High-performance Minecraft client with 200%+ FPS boost. Free download available.",
        images: ['/images/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/images/apple-touch-icon.png',
    },
};

export const viewport: Viewport = {
    themeColor: '#7a4dba',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await connectDB();
    
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: '#7a4dba',
                },
                elements: {
                    card: 'bg-black text-white border border-gray-800',
                    formButtonPrimary:
                        'bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] hover:from-[#4a3a6a] hover:to-[#3a2a5a] text-white font-semibold border-none !border-0 !shadow-none',
                },
            }}
        >
            <SpeedInsights />
            <html lang="en" className={poppins.variable}>
                <body className={`antialiased ${cal.variable}`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}