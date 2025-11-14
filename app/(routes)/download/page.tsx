"use client";

import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import {MdGroups} from "react-icons/md";
import {FiExternalLink} from "react-icons/fi";

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-top bg-fixed bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/75 to-black"></div>
                <div className="pt-16 relative max-w-7xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-7xl font-semibold mb-6 text-gradient-animated">
                        Download
                    </h1>
                    <p className="text-xl md:text-xl text-gray-300 mb-8 max-w-2xl">
                        Looks like the client hasn&#39;t come out yet! Join our community to stay updated about when it will release.
                        If you really want to, join our beta testers!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                        <Link href="/community">
                            <button className="group h-[45px] cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] shadow-[#3a2a5a] shadow-md hover:shadow-lg px-6 rounded-md font-medium text-lg text-white transition-all flex items-center gap-2">
                                <MdGroups className="w-4 h-4" />
                                Join our Community
                                <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><FiExternalLink/></span>
                            </button>
                        </Link>
                        <Link href="https://forms.gle/rSKiydw8a9zRhP1AA" target="_blank" rel="noopener noreferrer">
                            <button className="border-2 h-[45px] border-gray-700 cursor-pointer hover:border-[#7a6a8a] px-6 rounded-lg font-medium text-lg shadow-[#3a2a5a] shadow-md transition-all hover:transform-stroke hover:shadow-lg">
                                Apply for Beta
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
