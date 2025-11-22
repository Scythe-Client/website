'use client';

import { Box, Settings, Lock, Sparkles, Users } from 'lucide-react';
import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import SCCard from "@/components/custom/SCCard/SCCard";
import { FaDownload } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { MdGroups } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { GridItem } from "@/components/custom/GridItem";
import { FaqsSection } from "@/components/custom/FaqsSection";

export default function Home() {
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
        <div className="min-h-screen bg-black text-white">
            <Header currentPage="/" />
            <section className="relative pt-40 pb-28 px-6 overflow-hidden bg-top bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black"></div>
                <div className="pt-16 relative max-w-7xl mx-auto">
                    <h1 className="font-[Horizon] text-6xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-[#6b5499] via-[#9677c4] to-[#432e6e] bg-clip-text text-transparent opacity-0 animate-fade-in-up drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.1s" }}>
                        Scythe Client
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-6 opacity-0 animate-fade-in-up drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.2s" }}>
                        The <span className="text-gradient-animated">Absolute Cinema</span> of Minecraft Clients
                    </h2>
                    <p className="text-xl md:text-xl text-gray-300 mb-8 max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        Stripped of bloat. Tuned for reaction. Built for victory.
                        The client that keeps up when every click, swing, and step counts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <Link href="/download">
                            <button className="group h-[45px] cursor-pointer bg-gradient-to-r from-purple-950/80 via-purple-700/50 to-purple-950/70 shadow-purple-950 shadow-md hover:shadow-lg px-6 rounded-md font-medium text-lg text-white transition-all flex items-center gap-2">
                                <FaDownload className="w-4 h-4" />
                                Download
                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </Link>
                        <Link href="https://forms.gle/rSKiydw8a9zRhP1AA" target="_blank" rel="noopener noreferrer">
                            <button className="border-2 h-[45px] border-gray-700 cursor-pointer hover:border-[#7a6a8a] px-6 rounded-lg font-medium text-lg shadow-[#3a2a5a] shadow-md transition-all hover:transform-stroke hover:shadow-lg">
                                Apply for Beta
                            </button>
                        </Link>
                    </div>
                    <div className="mt-12 flex flex-col md:flex-row md:flex-wrap items-center gap-4 md:gap-8 text-sm text-gray-300 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>100+ Active Users</span>
                        </div>
                        <div className="hidden md:block">•</div>
                        <div>Windows</div>
                        <div className="hidden md:block">•</div>
                        <div>Free Forever</div>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                    <div className="animate-bounce text-purple-400 text-3xl font-light">
                        ↓
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div
                        id="features-title"
                        data-animate
                        className={`text-center mb-16 ${visibleSections.has('features-title') ? 'visible' : ''}`}
                        style={{ animationDelay: '0.1s' }}
                    >
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent text-5xl md:text-6xl font-semibold mb-4">Unmatched Performance</h2>
                        <p className="text-gray-300 text-lg">Features designed for competitive excellence</p>
                    </div>
                    <div
                        id="features-cards"
                        data-animate
                        className={`flex justify-center items-center gap-8 p-4 mb-20 flex-wrap ${visibleSections.has('features-cards') ? 'visible' : ''}`}
                        style={{ animationDelay: '0.3s' }}
                    >
                        <SCCard
                            title="Performance"
                            paragraph="Optimized for maximum FPS with minimal resource usage. Experience Minecraft at its finest."
                            featured={true}
                            learnMore="See Optimization Details"
                        />
                        <SCCard
                            title="PvP Optimized"
                            paragraph="Enjoy smooth mechanics, precise hit detection, and optimized settings crafted for competitive player-versus-player combat."
                            featured={true}
                            learnMore="Explore PvP Features"
                        />
                        <SCCard
                            title="24/7 Support"
                            paragraph="Get quick and reliable help from our team whenever you need it, ensuring minimal downtime and maximum playtime."
                            featured={true}
                            learnMore="Get Support"
                        />
                    </div>
                    <div
                        id="grid-cards"
                        data-animate
                        className={`animate-fade-in-up ${visibleSections.has('grid-cards') ? 'visible' : ''}`}
                        style={{ animationDelay: '0.3s' }}
                    >
                        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                            <GridItem
                                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                                icon={<Box className="h-4 w-4 text-white" />}
                                title="Built for Performance"
                                description="Optimized rendering engine that pushes your FPS to the limit without compromising quality."
                            />

                            <GridItem
                                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                                icon={<Settings className="h-4 w-4 text-white" />}
                                title="Fully Customizable"
                                description="Tweak every setting to match your playstyle. From keybinds to visual mods, you're in control."
                            />

                            <GridItem
                                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                                icon={<Lock className="h-4 w-4 text-white" />}
                                title="Safe & Secure"
                                description="Regular updates and anti-cheat compliance keep you protected while you play."
                            />

                            <GridItem
                                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                                icon={<Sparkles className="h-4 w-4 text-white" />}
                                title="Modern Interface"
                                description="Clean, intuitive menus designed for speed. No bloat, just what you need."
                            />

                            <GridItem
                                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                                icon={<Users className="h-4 w-4 text-white" />}
                                title="Active Community"
                                description="Join thousands of players sharing configs, tips, and custom mods in our Discord."
                            />
                        </ul>
                    </div>
                </div>
            </section>

            <section id="download" className="py-20 px-6 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div
                        id="download-title"
                        data-animate
                        className={visibleSections.has('download-title') ? 'visible' : ''}
                        style={{ animationDelay: '0.1s' }}
                    >
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent text-5xl md:text-6xl font-semibold mb-6">Ready to dominate?</h2>
                        <p className="text-gray-300 text-lg mb-12">
                            Join our team to test Scythe Client before its release!
                        </p>
                    </div>
                    <div
                        id="download-card"
                        data-animate
                        className={`bg-black border border-gray-800 rounded-2xl p-12 ${visibleSections.has('download-card') ? 'visible' : ''}`}
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <h3 className="text-3xl font-semibold mb-2">Scythe Client v1.0 Beta</h3>
                                <p className="text-gray-400 mb-4">Compatible with Minecraft 1.8 and 1.21.4</p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Windows</span>
                                </div>
                            </div>
                            <Link href="https://forms.gle/rSKiydw8a9zRhP1AA" target="_blank" rel="noopener noreferrer">
                                <button className="group h-[45px] cursor-pointer bg-gradient-to-r from-purple-950/80 via-purple-700/50 to-purple-950/70 shadow-purple-950 shadow-md hover:shadow-lg px-6 rounded-md font-medium text-lg text-white transition-all flex items-center gap-2">
                                    Apply for Beta
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section id="community" className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div
                        id="community-title"
                        data-animate
                        className={`text-center mb-16 ${visibleSections.has('community-title') ? 'visible' : ''}`}
                        style={{ animationDelay: '0.1s' }}
                    >
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent text-5xl md:text-6xl font-semibold mb-4">Join Our Community</h2>
                        <p className="text-gray-300 text-lg">Connect with players worldwide</p>
                    </div>

                    <div
                        id="community-stats"
                        data-animate
                        className={`grid md:grid-cols-3 gap-8 mb-12 ${visibleSections.has('community-stats') ? 'visible' : ''}`}
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center transition-all hover:border-purple-400/40 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="text-4xl font-bold text-[#8a5dca] mb-2">100+</div>
                                <div className="text-gray-300">Active Users</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center transition-all hover:border-purple-400/40 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="text-4xl font-bold text-[#8a5dca] mb-2">1k+</div>
                                <div className="text-gray-300">Members</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center transition-all hover:border-purple-400/40 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="text-4xl font-bold text-[#8a5dca] mb-2">24/7</div>
                                <div className="text-gray-300">Support</div>
                            </div>
                        </div>
                        <div className="md:col-span-3 flex justify-center">
                            <Link href="/community">
                                <button className="group h-[45px] cursor-pointer bg-gradient-to-r from-purple-950/80 via-purple-700/50 to-purple-950/70 shadow-purple-950 shadow-md hover:shadow-lg px-6 rounded-md font-medium text-lg text-white transition-all flex items-center gap-2">
                                    <MdGroups className="w-4 h-4" />
                                    Join our Community
                                    <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><FiExternalLink /></span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <FaqsSection />

            <Footer />
        </div>
    );
}