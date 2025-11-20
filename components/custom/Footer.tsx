"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-zinc-400 border-t border-white/10">
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="relative grid grid-cols-1 border-x border-white/10 md:grid-cols-4 md:divide-x md:divide-white/10">

                    <div className="flex flex-col justify-between p-4 md:p-6">
                        <div>
                            <h3 className="font-semibold text-xl text-white mb-2">Scythe Client</h3>
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                Not affiliated with Mojang or Microsoft.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <SocialCard
                            href="https://discord.scytheclient.com"
                            title="Discord"
                            icon={<FaDiscord className="h-5 w-5" />}
                            className="border-t-0"
                        />
                        <LinksGroup
                            title="Pages"
                            links={[
                                { title: "Features", href: "/features" },
                                { title: "Download", href: "/download" },
                                { title: "community", href: "/community" },
                            ]}
                        />
                    </div>

                    <div className="flex flex-col">
                        <SocialCard
                            href="https://x.com/ScytheClient"
                            title="X (Twitter)"
                            icon={<FaTwitter className="h-4 w-4" />}
                        />
                        <LinksGroup
                            title="Company"
                            links={[
                                { title: "About", href: "/about" },
                                { title: "Support", href: "https://discord.scytheclient.com" },
                                { title: "Jobs", href: "/careers" },
                            ]}
                        />
                    </div>

                    <div className="flex flex-col">
                        <SocialCard
                            href="https://www.instagram.com/scytheclient"
                            title="Instagram"
                            icon={<FaInstagram className="h-5 w-5" />}
                        />
                        <LinksGroup
                            title="Legal"
                            links={[
                                { title: "Terms and Conditions", href: "/tos" },
                                { title: "Privacy Policy", href: "/privacy" },
                                { title: "License", href: "/license" },
                            ]}
                        />
                    </div>

                </div>
            </div>

            <div className="flex justify-center border-t border-white/10 p-6 bg-black">
                <p className="text-zinc-600 text-xs">
                    &copy; {currentYear} Scythe Client. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

type LinksGroupProps = {
    title: string;
    links: { title: string; href: string }[];
};

function LinksGroup({ title, links }: LinksGroupProps) {
    return (
        <div className="p-4 md:p-6">
            <h3 className="mb-4 font-medium text-zinc-300 text-xs uppercase tracking-wider">
                {title}
            </h3>
            <ul className="space-y-2">
                {links.map((link) => (
                    <li key={link.title}>
                        <Link
                            className="text-zinc-500 text-xs hover:text-[#7a4dba] transition-colors duration-200 block"
                            href={link.href}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SocialCard({
                        title,
                        href,
                        icon,
                        className,
                    }: {
    title: string;
    href: string;
    icon: React.ReactNode;
    className?: string;
}) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group flex items-center justify-between border-y border-white/10 p-4 md:p-4 text-sm hover:bg-zinc-900/50 transition-all md:border-t-0",
                className
            )}
        >
            <div className="flex items-center gap-3 text-zinc-300 group-hover:text-[#7a4dba] transition-colors">
                {icon}
                <span className="font-medium">{title}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#7a4dba] -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </Link>
    );
}