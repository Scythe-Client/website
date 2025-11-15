import {SignInButton, SignUpButton, UserButton, useUser} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
    const { isSignedIn } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full border-b z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-black/80 backdrop-blur-md border-gray-700/50 shadow-lg'
                : 'bg-black/40 backdrop-blur-sm border-gray-800/30'
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Image
                                src="/favicon.ico"
                                alt="Scythe Logo"
                                width={32}
                                height={32}
                                className="object-contain rounded-md"
                            />
                        </div>
                        <span className="text-2xl font-semibold group-hover:text-purple-400 transition-colors">Scythe Client</span>
                    </Link>
                </div>

                <button
                    className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-white/5 rounded transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="hover:text-purple-400 transition-colors font-medium">Home</Link>
                    <Link href="/features" className="hover:text-purple-400 transition-colors font-medium">Features</Link>
                    <Link href="/download" className="hover:text-purple-400 transition-colors font-medium">Download</Link>
                    <Link href="/community" className="hover:text-purple-400 transition-colors font-medium">Community</Link>
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button className="hover:text-purple-400 transition-colors cursor-pointer font-medium">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="relative group cursor-pointer bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all overflow-hidden">
                                    <span className="relative z-10">Get Started</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </SignUpButton>
                        </>
                    ) : (
                        <UserButton afterSignOutUrl="/" />
                    )}
                </div>
            </div>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 py-4 flex flex-col gap-4 bg-black/90 backdrop-blur-md border-t border-gray-700/50">
                    <Link href="/" className="hover:text-purple-400 transition-colors font-medium py-2">Home</Link>
                    <Link href="/features" className="hover:text-purple-400 transition-colors font-medium py-2">Features</Link>
                    <Link href="/download" className="hover:text-purple-400 transition-colors font-medium py-2">Download</Link>
                    <Link href="/community" className="hover:text-purple-400 transition-colors font-medium py-2">Community</Link>
                    {!isSignedIn ? (
                        <div className="flex flex-col gap-3 pt-2 border-t border-gray-800 mt-2">
                            <SignInButton mode="modal">
                                <button className="hover:text-purple-400 transition-colors cursor-pointer text-left font-medium py-2">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="relative group cursor-pointer bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all overflow-hidden">
                                    <span className="relative z-10">Get Started</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </SignUpButton>
                        </div>
                    ) : (
                        <div className="pt-2 border-t border-gray-800 mt-2">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}