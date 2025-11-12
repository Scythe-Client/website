import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import {connectDB} from "@/lib/db";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
            <body className="antialiased">{children}</body>
        </html>
    </ClerkProvider>
  );
}
