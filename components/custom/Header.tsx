"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface HeaderProps {
    currentPage: string;
}

export default function Header({ currentPage }: HeaderProps) {
    const { isSignedIn } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'Download', href: '/download' },
        { name: 'Community', href: '/community' },
        { name: 'Blogs', href: '/blogs' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.div
                ref={headerRef}
                layout
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className={cn(
                    "relative bg-black/60 backdrop-blur-xl shadow-2xl shadow-gray-950 overflow-hidden pointer-events-auto",
                    isScrolled
                        ? "w-[95vw] md:w-[900px] rounded-2xl border border-zinc-800 mt-6"
                        : "w-full rounded-none border-b border-zinc-800 border-x-0 border-t-0 mt-0"
                )}
            >
                <div className="flex items-center justify-between px-6 py-4 relative z-20">
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-8 h-8 flex items-center justify-center relative">
                            <Image
                                src="/favicon.ico"
                                alt="Scythe Logo"
                                width={32}
                                height={32}
                                className="object-contain rounded-md"
                            />
                        </div>
                        <span className="text-lg font-semibold group-hover:text-purple-400 transition-colors text-white whitespace-nowrap">
                            Scythe Client
                        </span>
                    </Link>

                    <div className="flex items-center gap-3 shrink-0">
                        {isSignedIn && !isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <UserButton afterSignOutUrl="/" />
                            </motion.div>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-30 text-xs font-bold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full"
                        >
                            {isOpen ? "Close" : "Menu"}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-zinc-800/50"
                        >
                            <div className="flex flex-col items-center px-4 pb-3">
                                <div className="flex flex-col items-center gap-1 py-4 w-full">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="w-full text-center"
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full hover:bg-white/5 rounded-xl transition-colors group"
                                            >
                                                <h3 className={cn(
                                                    "text-2xl font-bold tracking-tight uppercase transition-all duration-200",
                                                    currentPage === link.href
                                                        ? "text-purple-400"
                                                        : "text-white group-hover:text-purple-300"
                                                )}>
                                                    {link.name}
                                                </h3>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-full bg-zinc-900/30 rounded-2xl p-1 border border-zinc-800/50"
                                >
                                    {!isSignedIn ? (
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <SignInButton mode="modal">
                                                <button className="flex-1 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-all uppercase tracking-wider">
                                                    Sign In
                                                </button>
                                            </SignInButton>
                                            <SignUpButton mode="modal">
                                                <button className="flex-1 py-3 rounded-xl font-bold text-sm text-white shadow-lg bg-gradient-to-r from-purple-950/80 via-purple-800/50 to-purple-950/70 transition-all hover:shadow-purple-950/70 uppercase tracking-wider">
                                                    Get Started
                                                </button>
                                            </SignUpButton>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between px-4 py-2">
                                            <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Logged in as</span>
                                            <div className="scale-110">
                                                <UserButton afterSignOutUrl="/" showName />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header>
    );
}