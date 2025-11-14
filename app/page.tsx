'use client';

import {Sword, Zap, Shield} from 'lucide-react';
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
            <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-top bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/75 to-black"></div>
                <div className="pt-16 relative max-w-7xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-7xl font-semibold mb-6 text-gradient-animated">
                        Scythe Client
                    </h1>
                    <p className="text-xl md:text-xl text-gray-300 mb-8 max-w-2xl">
                        Stripped of bloat. Tuned for reaction. Built for victory.
                        The client that keeps up when every click, swing, and step counts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                        <Link href="https://discord.scytheclient.com" target="_blank" rel="noopener noreferrer">
                            <button className="group h-[45px] cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] shadow-[#3a2a5a] shadow-md hover:shadow-lg px-6 rounded-md font-medium text-lg text-white transition-all flex items-center gap-2">
                                <FaEnvelopeOpenText className="w-4 h-4" />
                                Join the Waitlist
                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </Link>
                        <Link href="https://forms.gle/rSKiydw8a9zRhP1AA" target="_blank" rel="noopener noreferrer">
                            <button className="border-2 h-[45px] border-gray-700 cursor-pointer hover:border-[#7a6a8a] px-6 rounded-lg font-medium text-lg shadow-[#3a2a5a] shadow-md transition-all hover:transform-stroke hover:shadow-lg">
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
                        <div>Windows</div>
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

                    <div className="relative max-w-5xl mx-auto py-16 px-6">
                        <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -translate-x-1/2 z-0 pointer-events-none shadow-lg shadow-purple-500/50"></div>
                        <div className="flex flex-col md:flex-row items-center mb-24 relative group">
                            <div className="absolute left-1/2 w-4 h-4 bg-purple-500 rounded-full z-10 transform -translate-x-1/2 mt-8 md:mt-0 shadow-lg shadow-purple-500/80 group-hover:w-6 group-hover:h-6 group-hover:shadow-purple-500 transition-all duration-300 animate-pulse"></div>
                            <div className="md:w-5/12 md:mr-auto md:ml-0 ml-0 mr-auto w-full order-2 md:order-1 relative rounded-xl overflow-hidden p-[1px] group-hover:-translate-y-2 transition-transform duration-300" style={{background: 'conic-gradient(from 0deg, #8a7a9a, #6a5a7a, #8a7a9a)'}}>
                                <div className="relative z-10 bg-[#0d0717] rounded-xl p-8 transition-all duration-500 hover:scale-102">
                                    <Zap className="w-8 h-8 text-yellow-400 mb-4 mx-auto md:mx-0" />
                                    <h3 className="font-[Minecraft] text-2xl font-semibold mb-4 md:text-left text-center text-white">Lightning Fast</h3>
                                    <p className="text-gray-400 leading-relaxed md:text-left text-center">
                                        Optimized for maximum FPS with minimal resource usage. Experience buttery smooth gameplay even in intense battles.
                                    </p>
                                </div>
                            </div>
                            <div className="w-16 h-px bg-transparent md:w-px md:h-16 md:bg-gradient-to-b md:from-purple-500/50 md:to-transparent hidden md:block order-1 md:order-2"></div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center mb-24 relative group">
                            <div className="absolute left-1/2 w-4 h-4 bg-purple-500 rounded-full z-10 transform -translate-x-1/2 mt-8 md:mt-0 shadow-lg shadow-purple-500/80 group-hover:w-6 group-hover:h-6 group-hover:shadow-purple-500 transition-all duration-300 animate-pulse"></div>
                            <div className="w-16 h-px bg-transparent md:w-px md:h-16 md:bg-gradient-to-b md:from-transparent md:to-purple-500/50 hidden md:block"></div>
                            <div className="md:w-5/12 md:ml-auto md:mr-0 ml-0 mr-auto w-full relative rounded-xl group-hover:-translate-y-2 transition-transform duration-300 border border-[#8a7a9a]">
                                <div className="relative z-10 bg-[#0d0717] rounded-xl p-8 transition-all duration-500 hover:scale-102">
                                    <Shield className="w-8 h-8 text-green-400 mb-4 mx-auto md:mx-0 md:ml-auto" />
                                    <h3 className="font-[Minecraft] text-2xl font-semibold mb-4 md:text-right text-center text-white">Secure and Safe</h3>
                                    <p className="text-gray-400 leading-relaxed md:text-right text-center">
                                        Built with security in mind. Regular updates and community-audited code ensure your safety while playing.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center relative group">
                            <div className="absolute left-1/2 w-4 h-4 bg-purple-500 rounded-full z-10 transform -translate-x-1/2 mt-8 md:mt-0 shadow-lg shadow-purple-500/80 group-hover:w-6 group-hover:h-6 group-hover:shadow-purple-500 transition-all duration-300 animate-pulse"></div>
                            <div className="md:w-5/12 md:mr-auto md:ml-0 ml-0 mr-auto w-full order-2 md:order-1 relative rounded-xl group-hover:-translate-y-2 transition-transform duration-300 border border-[#8a7a9a]">
                                <div className="relative z-10 bg-[#0d0717] rounded-xl p-8 transition-all duration-500 hover:scale-102">
                                    <Sword className="w-8 h-8 text-pink-400 mb-4 mx-auto md:mx-0" />
                                    <h3 className="font-[Minecraft] text-2xl font-semibold mb-4 md:text-left text-center text-white">Competitive Edge</h3>
                                    <p className="text-gray-400 leading-relaxed md:text-left text-center">
                                        Advanced features including auto-sprint, keystrokes display, and customizable HUD for the competitive advantage.
                                    </p>
                                </div>
                            </div>
                            <div className="w-16 h-px bg-transparent md:w-px md:h-16 md:bg-gradient-to-t md:from-transparent md:to-purple-500/50 hidden md:block order-1 md:order-2"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="download" className="py-20 px-6 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent md:text-5xl font-semibold mb-6">Ready to dominate?</h2>
                    <p className="text-gray-400 text-lg mb-12">
                        Join our team to test Scythe Client before its release!
                    </p>
                    <div className="bg-black border border-gray-800 rounded-2xl p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <h3 className="text-3xl font-semibold mb-2">Scythe Client v1.0 Beta</h3>
                                <p className="text-gray-400 mb-4">Compatible with Minecraft 1.8 and 1.21.4</p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Windows</span>
                                </div>
                            </div>
                            <Link href="https://forms.gle/rSKiydw8a9zRhP1AA" target="_blank" rel="noopener noreferrer">
                                <button className="group h-[45px] cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] shadow-[#3a2a5a] shadow-md hover:shadow-lg px-6 rounded-md font-medium text-lg text-white transition-all flex items-center gap-2">
                                    Apply for Beta
                                </button>
                            </Link>
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
                                <button className="flex h-[45px] gap-3 px-6 bg-gradient-to-br from-blue-600 via-blue-800 to-blue-700 cursor-pointer border-1 border-gray-800 hover:border-blue-900 hover:shadow-blue-900 shadow-2xl p-2.5 rounded-lg transition-all">
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
