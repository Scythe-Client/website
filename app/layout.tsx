import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {connectDB} from "@/lib/db";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scythe Client",
  description: "Scythe Client website",
};

await connectDB();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en" className={poppins.variable}>
            <body className="antialiased">{children}</body>
        </html>
    </ClerkProvider>
  );
}
