'use client';

import {Sword, Zap, Shield, Download} from 'lucide-react';
import {
    FaDiscord,
    FaEnvelopeOpenText,
} from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import SCCard from "@/components/custom/SCCard/SCCard";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <section className="relative pt-48 pb-10 px-6 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black"></div>
                <div className="relative max-w-7xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent">
                        Scythe Client
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">
                        Built for competitors who play to win — every frame, click, and move optimized for peak performance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                        <Link href="https://discord.scytheclient.com">
                            <button className="group cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] hover:from-[#4a3a6a] hover:to-[#3a2a5a] border-2 border-gray-950 px-6 py-2.5 rounded-md font-medium text-lg text-white shadow-[0_0_20px_-5px_rgba(90,50,150,0.6)] transition-all flex items-center gap-2">
                                <FaEnvelopeOpenText className="w-4 h-4" />
                                Join the Waitlist
                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </Link>
                        <Link href="https://forms.gle/rSKiydw8a9zRhP1AA">
                            <button className="border-2 border-gray-700 cursor-pointer hover:border-[#7a6a8a] px-6 py-2.5 rounded-lg font-medium text-lg shadow-[#7a4dba] shadow transition-all hover:transform-stroke hover:shadow-purple-800">
                                Apply for Beta
                            </button>
                        </Link>
                    </div>
                    <div className="mt-12 flex items-center gap-8 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>100+ Active Users</span>
                        </div>
                        <div>•</div>
                        <div>Windows / Mac / Linux</div>
                        <div>•</div>
                        <div>Free Forever</div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent md:text-5xl font-semibold mb-4">Unmatched Performance</h2>
                        <p className="text-gray-400 text-lg">Features designed for competitive excellence</p>
                    </div>
                    <div className="flex justify-center items-center gap-8 p-4 mb-20 flex-wrap">
                        <SCCard
                            title="Performance"
                            paragraph="Optimized for maximum FPS with minimal resource usage. Experience Minecraft at its finest."
                            featured={true}
                        />
                        <SCCard
                            title="PvP Optimized"
                            paragraph="Enjoy smooth mechanics, precise hit detection, and optimized settings crafted for competitive player-versus-player combat."
                            featured={true}
                        />
                        <SCCard
                            title="24/7 Support"
                            paragraph="Get quick and reliable help from our team whenever you need it, ensuring minimal downtime and maximum playtime."
                            featured={true}
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 p-8 rounded-xl transition-all hover:scale-105">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                <Zap className="w-8 h-8 text-[#7a4dba]" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
                            <p className="text-gray-400">
                                Optimized for maximum FPS with minimal resource usage. Experience buttery smooth gameplay even in intense battles.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 p-8 rounded-xl transition-all hover:scale-105">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                <Shield className="w-8 h-8 text-[#7a4dba]" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Secure & Safe</h3>
                            <p className="text-gray-400">
                                Built with security in mind. Regular updates and community-audited code ensure your safety while playing.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 p-8 rounded-xl transition-all hover:scale-105">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                <Sword className="w-8 h-8 text-[#7a4dba]" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Competitive Edge</h3>
                            <p className="text-gray-400">
                                Advanced features including auto-sprint, keystrokes display, and customizable HUD for the competitive advantage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="download" className="py-20 px-6 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent md:text-5xl font-semibold mb-6">Ready to dominate?</h2>
                    <p className="text-gray-400 text-lg mb-12">
                        Join thousands of players who have already upgraded their Minecraft experience
                    </p>
                    <div className="bg-black border border-gray-800 rounded-2xl p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <h3 className="text-3xl font-semibold mb-2">Scythe Client v1.0</h3>
                                <p className="text-gray-400 mb-4">Compatible with Minecraft 1.8 and 1.21.4</p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Windows</span>
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">macOS</span>
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Linux</span>
                                </div>
                            </div>
                            <button className="group cursor-not-allowed bg-gray-600 px-6 py-2.5 rounded-md font-medium text-lg shadow shadow-black transition-all hover:transform-stroke flex items-center gap-2">
                                Apply for Beta
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="community" className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent text-4xl md:text-5xl font-bold mb-4">Join Our Community</h2>
                        <p className="text-gray-400 text-lg">Connect with players worldwide</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                            <Link href="https://discord.scytheclient.com">
                                <button className="flex gap-3 px-6 bg-gradient-to-br from-blue-600 via-blue-800 to-blue-700 cursor-pointer border-1 border-gray-800 hover:border-blue-900 hover:shadow-blue-900 shadow-2xl p-4 rounded-lg transition-all">
                                    <FaDiscord className="w-6 h-6" />
                                    Join our Discord!
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
