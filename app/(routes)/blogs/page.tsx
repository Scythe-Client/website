'use client';

import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { Calendar, Clock, ChevronRight, Tag, User } from "lucide-react";

const BLOG_POSTS = [
    {
        id: "1",
        title: "How to Download & Install Scythe Client",
        excerpt: "A step-by-step guide to getting the fastest Minecraft client up and running on your machine in under 2 minutes.",
        date: "November 22, 2025",
        readTime: "3 min read",
        category: "Guide",
        author: "HerobrineTG",
        image: "/images/download-and-install.png",
        gradient: "from-purple-900 to-purple-800"
    },
    {
        id: "2",
        title: "About the Release",
        excerpt: "It's still happening under closed doors, but the beta testing will be out sooner than you expect!",
        date: "November 22, 2025",
        readTime: "5 min read",
        category: "Announcement",
        author: "PaidInMoney",
        image: "/images/about-the-release.png",
        gradient: "from-purple-900 to-purple-800"
    },
];

export default function Blogs() {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set(prev).add(entry.target.id));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Header currentPage="/blogs" />

            <section className="relative pt-40 pb-28 px-6 overflow-hidden bg-top bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black"></div>
                <div className="pt-16 relative max-w-7xl mx-auto z-10">
                    <h1 className="font-[Horizon] text-[45px] md:text-7xl font-semibold mb-6 bg-gradient-to-r from-[#6b5499] via-[#9677c4] to-[#432e6e] bg-clip-text text-transparent opacity-0 animate-fade-in-up drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.1s" }}>
                        Latest News
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl opacity-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                        The central hub for detailed patch notes, performance deep-dives, and essential guides to help you maximize your FPS and gameplay experience.
                    </p>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
                    <div className="animate-bounce text-purple-400 text-3xl font-light">
                        ↓
                    </div>
                </div>
            </section>

            <section id="blog-grid" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div
                        id="latest-posts"
                        data-animate
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${visibleSections.has('latest-posts') ? 'animate-fade-in-up' : 'opacity-0'}`}
                        style={{ animationDelay: '0.2s' }}
                    >
                        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                        {BLOG_POSTS.map((post, index) => (
                            <Link
                                href={`/blogs/${post.id}`}
                                key={post.id}
                                className="group relative flex flex-col bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                            >
                                <div
                                    className={`h-48 w-full opacity-80 group-hover:opacity-100 transition-all duration-500 relative overflow-hidden ${
                                        post.image
                                            ? "bg-cover bg-center bg-no-repeat"
                                            : `bg-gradient-to-br ${post.gradient || "from-purple-900 to-purple-800"}`
                                    }`}
                                    style={post.image ? { backgroundImage: `url('${post.image}')` } : undefined}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white rounded-full border border-white/10 flex items-center gap-1">
                                            <Tag className="w-3 h-3" /> {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-zinc-400 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight">
                                        {post.title}
                                    </h3>

                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-auto">
                                        <div className="flex items-center gap-2 text-sm text-zinc-300">
                                            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                <User className="w-3 h-3" />
                                            </div>
                                            {post.author}
                                        </div>
                                        <span className="text-purple-400 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Read Article <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}