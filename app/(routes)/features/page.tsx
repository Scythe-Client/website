'use client';

import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { useEffect, useState } from 'react';
import {GridItem} from "@/components/custom/GridItem";
import {Box, Search, Settings, Sparkles, Lock, Crosshair, Zap, Target, Shield, Sword} from "lucide-react";

export default function Features() {
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
                        Features
                    </h1>
                    <p className="text-xl md:text-xl text-gray-300 mb-8 max-w-2xl opacity-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                        Explore the features that Scythe Client offers to improve performance and PvP features to enhance your combat skills.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center opacity-0 animate-fade-in-up" style={{animationDelay: '0.5s'}}>

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
                        <h2 className="bg-gradient-to-r from-green-400/40 via-green-100 to-green-500/40 bg-clip-text text-transparent text-5xl md:text-6xl font-semibold mb-4">Performance</h2>
                        <p className="text-gray-300 text-lg">Optimizations to improve Minecraft FPS and a smoother gameplay.</p>
                    </div>
                    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                        <GridItem
                            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                            icon={<Box className="h-4 w-4 text-white" />}
                            title="Sodium Rendering"
                            description="Modern rendering engine that replaces Minecraft's outdated system for massive FPS gains."
                        />

                        <GridItem
                            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                            icon={<Settings className="h-4 w-4 text-white" />}
                            title="Memory Optimization"
                            description="Smart memory management prevents leaks and reduces RAM usage during long sessions."
                        />

                        <GridItem
                            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                            icon={<Lock className="h-4 w-4 text-white" />}
                            title="Chunk Loading"
                            description="Faster world loading and rendering with optimized chunk management systems."
                        />

                        <GridItem
                            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                            icon={<Sparkles className="h-4 w-4 text-white" />}
                            title="Reduced Stuttering"
                            description="Eliminates frame drops and micro-stutters for buttery smooth gameplay."
                        />

                        <GridItem
                            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                            icon={<Search className="h-4 w-4 text-white" />}
                            title="Entity Culling"
                            description="Only renders what you can see, dramatically improving performance in crowded areas."
                        />
                    </ul>
                </div>
                <div className="max-w-7xl mx-auto mt-24">
                    <div
                        id="features-title"
                        data-animate
                        className={`text-center mb-16 ${visibleSections.has('features-title') ? 'visible' : ''}`}
                        style={{animationDelay: '0.1s'}}
                    >
                        <h2 className="bg-gradient-to-r from-red-600/40 via-red-100 to-red-700/70 bg-clip-text text-transparent text-5xl md:text-6xl font-semibold mb-4">PvP Features</h2>
                        <p className="text-gray-300 text-lg">Competitive advantages and tools to dominate in combat.</p>
                    </div>
                    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                        <GridItem
                            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                            icon={<Crosshair className="h-4 w-4 text-white" />}
                            title="Hit Detection"
                            description="Improved hit registration and reduced phantom hits for more accurate combat."
                        />

                        <GridItem
                            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                            icon={<Zap className="h-4 w-4 text-white" />}
                            title="Low Input Lag"
                            description="Optimized input handling for instant response to your clicks and movements."
                        />

                        <GridItem
                            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                            icon={<Target className="h-4 w-4 text-white" />}
                            title="Custom Crosshairs"
                            description="Extensive crosshair customization with dynamic colors and styles for better aim."
                        />

                        <GridItem
                            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                            icon={<Shield className="h-4 w-4 text-white" />}
                            title="Armor HUD"
                            description="Real-time durability tracking and armor status display for strategic gameplay."
                        />

                        <GridItem
                            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                            icon={<Sword className="h-4 w-4 text-white" />}
                            title="Potion Effects"
                            description="Clear potion HUD showing active effects and timers during intense fights."
                        />
                    </ul>
                </div>
            </section>
            <Footer />
        </div>
    );
}