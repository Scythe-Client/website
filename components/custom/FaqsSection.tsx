import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export function FaqsSection() {
    return (
        <section id="faq" className="py-24 px-6 bg-black text-white">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
                <div className="flex flex-col justify-start pt-2">
                    <h2 className="font-[Horizon] bg-gradient-to-r from-[#7a6a8a] via-purple-200 to-[#3a2a5a] bg-clip-text text-transparent text-5xl md:text-6xl font-bold mb-6 tracking-tight ">
                        FAQ
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 max-w-md leading-relaxed">
                        Quick answers to common questions about Scythe Client.
                        Everything you need to know about performance, compatibility, and safety.
                    </p>
                    <p className="text-zinc-400 text-sm">
                        {"Can't find what you're looking for? "}
                        <Link className="text-purple-400 hover:text-purple-300 font-medium underline-offset-4 hover:underline transition-colors" href="https://discord.scytheclient.com">
                            Contact Support
                        </Link>
                    </p>
                </div>

                <div className="relative">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-[15px] w-px bg-zinc-800 hidden md:block"
                    />

                    <Accordion collapsible type="single" className="w-full">
                        {faqs.map((item) => (
                            <AccordionItem
                                className="group relative border-b border-zinc-800 pb-1 last:border-b-0 md:pl-12"
                                key={item.id}
                                value={item.id}
                            >
                                <div className="absolute left-[11px] top-5 hidden md:block z-10">
                                    <PlusIcon
                                        aria-hidden="true"
                                        className="h-2 w-2 text-purple-500 transition-transform duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:scale-125"
                                    />
                                </div>

                                <AccordionTrigger className="cursor-pointer text-lg font-medium text-zinc-200 hover:text-purple-400 hover:no-underline transition-colors text-left py-4">
                                    {item.title}
                                </AccordionTrigger>

                                <AccordionContent className="text-zinc-400 leading-relaxed pb-6 text-base">
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

const faqs = [
    {
        id: "item-1",
        title: "What is Scythe Client?",
        content:
            "Scythe Client is a high-performance PvP client built for competitive Minecraft gaming. It is specifically tuned to run smoothly even on older hardware.",
    },
    {
        id: "item-2",
        title: "How do I download Scythe Client?",
        content:
            "You can download Scythe Client for free on our download page. Simply select your operating system and run the installer.",
    },
    {
        id: "item-3",
        title: "Is Scythe Client free?",
        content:
            "Yes, Scythe Client is completely free to use. We offer an optional Scythe+ subscription for players who want exclusive cosmetics and early access to beta features.",
    },
    {
        id: "item-4",
        title: "Can I customize mods?",
        content:
            "Absolutely. Every built-in mod is fully customizable, allowing you to adjust positions, sizes, and visual settings to match your playstyle.",
    },
    {
        id: "item-5",
        title: "What features are included?",
        content:
            "Scythe includes FPS optimizations, keystrokes, armor status, potion effects, toggle sprint, and dozens of other PvP-focused mods.",
    },
    {
        id: "item-6",
        title: "How do I get support?",
        content:
            "Join our Discord server and open a support ticket. Our staff is available 24/7 to assist you with installation or bugs.",
    },
    {
        id: "item-7",
        title: "Are there in-app purchases?",
        content:
            "The client itself is free. The only purchases available are for cosmetic items like capes, wings, and bandanas, which do not provide any in-game advantage.",
    },
];