'use client';

import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";

export default function Home() {
    return (
        <>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
            <div className="bg-black">
                <h1 className="text-white text-5xl p-3 m-2">Scythe Client</h1>
                <p className="text-white text-2xl p-2 m-2">Scythe Client: page.tsx<br/>Directory: '/'</p>
            </div>
        </>
    )
}
