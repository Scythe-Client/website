import {SignInButton, SignUpButton, UserButton, useUser} from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const { isSignedIn } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-black/60 backdrop-blur-sm border-b border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <span className="text-2xl font-semibold">Scythe Client</span>
                    </Link>
                </div>
                <button
                    className="md:hidden flex flex-col gap-1.5"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
                <div className="hidden md:flex items-center gap-8">
                    <a href="/features" className="hover:text-[#7a4dba] transition-colors">Features</a>
                    <a href="/download" className="hover:text-[#7a4dba] transition-colors">Download</a>
                    <a href="/community" className="hover:text-[#7a4dba] transition-colors">Community</a>
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button className="hover:text-[#7a4dba] transition-colors cursor-pointer">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="group cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] hover:from-[#4a3a6a] hover:to-[#3a2a5a] border border-gray-950 px-4 py-2 rounded-md font-medium text-md text-white shadow-[0_0_20px_-5px_rgba(90,50,150,0.6)] transition-all flex items-center gap-2">
                                    Get Started
                                </button>
                            </SignUpButton>
                        </>
                    ) : (
                        <UserButton afterSignOutUrl="/" />
                    )}
                </div>
            </div>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 py-4 flex flex-col gap-4 bg-black/80 border-t border-gray-800">
                    <a href="/features" className="hover:text-[#7a4dba] transition-colors">Features</a>
                    <a href="/download" className="hover:text-[#7a4dba] transition-colors">Download</a>
                    <a href="/community" className="hover:text-[#7a4dba] transition-colors">Community</a>
                    {!isSignedIn ? (
                        <div className="flex flex-col gap-3 pt-2">
                            <SignInButton mode="modal">
                                <button className="hover:text-[#7a4dba] transition-colors cursor-pointer text-left">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="group cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] hover:from-[#4a3a6a] hover:to-[#3a2a5a] border border-gray-950 px-4 py-2 rounded-md font-medium text-md text-white shadow-[0_0_20px_-5px_rgba(90,50,150,0.6)] transition-all flex items-center gap-2 justify-center">
                                    Get Started
                                </button>
                            </SignUpButton>
                        </div>
                    ) : (
                        <div className="pt-2">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}