"use client";

import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { FaDownload } from "react-icons/fa";
import {Shield, Sword, Zap} from "lucide-react";
import {SCCombobox} from "@/components/custom/SCCombobox";

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <section
                className="relative pt-48 pb-32 px-6 overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black"></div>
                <div className="relative max-w-7xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent">
                        DOWNLOAD
                    </h1>
                    <p className="text-xl md:text-xl text-gray-400 mb-8 max-w-2xl">
                        Download the best version of Scythe Client that suits you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                        <div className="relative inline-flex items-center gap-2">
                            <Link href="https://discord.scytheclient.com">
                                <button className="group cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] hover:from-[#4a3a6a] hover:to-[#3a2a5a] border-2 border-gray-950 px-6 py-2.5 rounded-md font-medium text-lg text-white shadow-[0_0_20px_-5px_rgba(90,50,150,0.6)] transition-all flex items-center gap-2">
                                    <FaDownload className="w-4 h-4" />
                                    Download
                                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                </button>
                            </Link>
                            <SCCombobox/>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="bg-gradient-to-r from-[#6a5a7a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent md:text-5xl font-semibold mb-4">Unmatched Performance</h2>
                        <p className="text-gray-400 text-lg">Features designed for competitive excellence</p>
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
            <Footer />
        </div>
    );
}
