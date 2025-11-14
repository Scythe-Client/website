'use client';

import { Sword, Zap, Shield, Users, TrendingUp, Star } from 'lucide-react';
import {
    FaDiscord, FaInstagram, FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";

export default function Community() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-top bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/30 via-black to-black"></div>
                <div className="relative max-w-7xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-7xl font-semibold mb-6 text-gradient-animated">
                        Our Community
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                        Join our community with hundreds of active players across various social media platforms!
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl">
                        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 text-center">
                            <Users className="w-8 h-8 mx-auto mb-2 text-red-500" />
                            <div className="text-2xl font-bold">1K+</div>
                            <div className="text-sm text-gray-400">Members</div>
                        </div>
                        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 text-center">
                            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                            <div className="text-2xl font-bold">100+</div>
                            <div className="text-sm text-gray-400">Active Daily</div>
                        </div>
                        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 text-center">
                            <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                            <div className="text-2xl font-bold">24/7</div>
                            <div className="text-sm text-gray-400">Support</div>
                        </div>
                        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 text-center">
                            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                            <div className="text-2xl font-bold">4.8★</div>
                            <div className="text-sm text-gray-400">Rating</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <Link href="https://discord.scytheclient.com" target="_blank">
                            <div className="group bg-[#5865F2]/10 border border-[#5865F2]/30 hover:border-[#5865F2] p-6 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#5865F2]/50 hover:-translate-y-2">
                                <FaDiscord className="w-12 h-12 text-[#5865F2] group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-2xl font-semibold mt-4 mb-2">Discord</h3>
                                <p className="text-gray-400 text-sm mb-3">Chat, updates & support.</p>
                                <div className="flex items-center gap-2 text-[#5865F2] text-sm font-semibold">
                                    <span>Join Server</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                        <Link href="https://x.com" target="_blank">
                            <div className="group bg-neutral-900/40 border border-neutral-700 hover:border-white p-6 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-neutral-600 hover:-translate-y-2">
                                <FaTwitter className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-2xl font-semibold mt-4 mb-2">X</h3>
                                <p className="text-gray-400 text-sm mb-3">Announcements & showcase.</p>
                                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                                    <span>Follow Us</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                        <Link href="https://instagram.com" target="_blank">
                            <div className="group bg-pink-900/20 p-6 rounded-xl border border-pink-800 hover:border-pink-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-pink-500/50 hover:-translate-y-2">
                                <FaInstagram className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-2xl font-semibold mt-4 mb-2">Instagram</h3>
                                <p className="text-gray-100 text-sm mb-3">Sneak peeks & reels.</p>
                                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                                    <span>Follow Page</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="pt-20 max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Why Join Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl hover:border-purple-500/50 transition-all">
                                <Sword className="w-10 h-10 text-purple-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Exclusive Events</h3>
                                <p className="text-gray-400 text-sm">Participate in tournaments, giveaways & special community challenges.</p>
                            </div>
                            <div className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl hover:border-blue-500/50 transition-all">
                                <Shield className="w-10 h-10 text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Direct Support</h3>
                                <p className="text-gray-400 text-sm">Get help from our staff team & experienced community members instantly.</p>
                            </div>
                            <div className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 p-6 rounded-xl hover:border-green-500/50 transition-all">
                                <Zap className="w-10 h-10 text-green-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Early Access</h3>
                                <p className="text-gray-400 text-sm">Be the first to test new features & updates before public release.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}