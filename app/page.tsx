'use client';

import {Sword, Zap, Shield} from 'lucide-react';
import {
    FaDiscord,
} from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import SCCard from "@/components/custom/SCCard/SCCard";
import {FaDownload} from "react-icons/fa6";
import { useEffect, useState } from 'react';
import {MdGroups} from "react-icons/md";
import {FiExternalLink} from "react-icons/fi";

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
            <Header />
            <section className="relative pt-40 pb-28 px-6 overflow-hidden bg-top bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black"></div>
                <div className="pt-16 relative max-w-7xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-[#6b5499] via-[#9677c4] to-[#432e6e] bg-clip-text text-transparent opacity-0 animate-fade-in-up drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.1s" }}>
                        Scythe Client
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-6 opacity-0 animate-fade-in-up drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.2s" }}>
                        The <span className="text-gradient-animated">Absolute Cinema</span> of Minecraft Clients
                    </h2>
                    <p className="text-xl md:text-xl text-gray-300 mb-8 max-w-2xl opacity-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                        Stripped of bloat. Tuned for reaction. Built for victory.
                        The client that keeps up when every click, swing, and step counts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center opacity-0 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
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
                    <div className="mt-12 flex items-center gap-8 text-sm text-gray-500 opacity-0 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>100+ Active Users</span>
                        </div>
                        <div>•</div>
                        <div>Windows</div>
                        <div>•</div>
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
                        style={{animationDelay: '0.1s'}}
                    >
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent md:text-5xl font-semibold mb-4">Unmatched Performance</h2>
                        <p className="text-gray-400 text-lg">Features designed for competitive excellence</p>
                    </div>
                    <div
                        id="features-cards"
                        data-animate
                        className={`flex justify-center items-center gap-8 p-4 mb-20 flex-wrap ${visibleSections.has('features-cards') ? 'visible' : ''}`}
                        style={{animationDelay: '0.3s'}}
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

                    <div className="relative max-w-5xl mx-auto py-20 px-6">
                        <div className="absolute left-1/2 top-10 bottom-10 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-500/60 to-transparent pointer-events-none shadow-[0_0_35px_8px_rgba(168,85,247,0.25)]" />
                        <div
                            id="timeline-1"
                            data-animate
                            className={`flex flex-col md:flex-row items-center mb-28 relative group ${visibleSections.has('timeline-1') ? 'visible' : ''}`}
                        >
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_6px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform z-10" />
                            <div className="md:w-5/12 w-full md:mr-auto rounded-xl border border-purple-400/20 bg-[#0d0717] p-8 shadow-[0_0_25px_rgba(168,85,247,0.1)] transition-transform duration-300 group-hover:-translate-y-2">
                                <Zap className="w-8 h-8 text-yellow-400 mb-4 mx-auto md:mx-0" />
                                <h3 className="font-[Minecraft] text-2xl font-semibold text-white text-center md:text-left mb-3">
                                    Lightning Fast
                                </h3>
                                <p className="text-gray-400 text-center md:text-left">
                                    Optimized for maximum FPS with minimal resource usage.
                                </p>
                            </div>
                        </div>
                        <div
                            id="timeline-2"
                            data-animate
                            className={`flex flex-col md:flex-row items-center mb-28 relative group ${visibleSections.has('timeline-2') ? 'visible' : ''}`}
                        >
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_6px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform z-10" />

                            <div className="md:w-5/12 w-full md:ml-auto rounded-xl border border-purple-400/20 bg-[#0d0717] p-8 shadow-[0_0_25px_rgba(168,85,247,0.1)] transition-transform duration-300 group-hover:-translate-y-2">
                                <Shield className="w-8 h-8 text-green-400 mb-4 mx-auto md:ml-auto md:mr-0" />
                                <h3 className="font-[Minecraft] text-2xl text-white font-semibold text-center md:text-right mb-3">
                                    Secure and Safe
                                </h3>
                                <p className="text-gray-400 text-center md:text-right">
                                    Built with security in mind. Regular updates ensure your safety.
                                </p>
                            </div>
                        </div>
                        <div
                            id="timeline-3"
                            data-animate
                            className={`flex flex-col md:flex-row items-center relative group ${visibleSections.has('timeline-3') ? 'visible' : ''}`}
                        >
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_6px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform z-10" />
                            <div className="md:w-5/12 w-full md:mr-auto rounded-xl border border-purple-400/20 bg-[#0d0717] p-8 shadow-[0_0_25px_rgba(168,85,247,0.1)] transition-transform duration-300 group-hover:-translate-y-2">
                                <Sword className="w-8 h-8 text-pink-400 mb-4 mx-auto md:mx-0" />
                                <h3 className="font-[Minecraft] text-2xl text-white font-semibold text-center md:text-left mb-3">
                                    Competitive Edge
                                </h3>
                                <p className="text-gray-400 text-center md:text-left">
                                    Custom HUD, auto-sprint, and PvP-focused enhancements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="download" className="py-20 px-6 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div
                        id="download-title"
                        data-animate
                        className={visibleSections.has('download-title') ? 'visible' : ''}
                        style={{animationDelay: '0.1s'}}
                    >
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent md:text-5xl font-semibold mb-6">Ready to dominate?</h2>
                        <p className="text-gray-400 text-lg mb-12">
                            Join our team to test Scythe Client before its release!
                        </p>
                    </div>
                    <div
                        id="download-card"
                        data-animate
                        className={`bg-black border border-gray-800 rounded-2xl p-12 ${visibleSections.has('download-card') ? 'visible' : ''}`}
                        style={{animationDelay: '0.3s'}}
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
                        style={{animationDelay: '0.1s'}}
                    >
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent text-4xl md:text-5xl font-bold mb-4">Join Our Community</h2>
                        <p className="text-gray-400 text-lg">Connect with players worldwide</p>
                    </div>

                    <div
                        id="community-stats"
                        data-animate
                        className={`grid md:grid-cols-3 gap-8 mb-12 ${visibleSections.has('community-stats') ? 'visible' : ''}`}
                        style={{animationDelay: '0.3s'}}
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-[#7a4dba] mb-2">100+</div>
                            <div className="text-gray-400">Active Users</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-[#7a4dba] mb-2">100+</div>
                            <div className="text-gray-400">Downloads</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-[#7a4dba] mb-2">24/7</div>
                            <div className="text-gray-400">Support</div>
                        </div>
                        <div className="md:col-span-3 flex justify-center">
                            <Link href="/community">
                                <button className="group h-[45px] cursor-pointer bg-gradient-to-r from-purple-950/80 via-purple-700/50 to-purple-950/70 shadow-purple-950 shadow-md hover:shadow-lg px-6 rounded-md font-medium text-lg text-white transition-all flex items-center gap-2">
                                    <MdGroups className="w-4 h-4" />
                                    Join our Community
                                    <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><FiExternalLink/></span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}