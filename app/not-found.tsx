"use client";

import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

const PRIMARY_ORB_HORIZONTAL_OFFSET = 40;
const PRIMARY_ORB_VERTICAL_OFFSET = 20;

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white selection:bg-purple-500/30">
            <div
                aria-hidden={true}
                className="absolute inset-0 overflow-hidden pointer-events-none"
            >
                <motion.div
                    animate={{
                        x: [
                            0,
                            PRIMARY_ORB_HORIZONTAL_OFFSET,
                            -PRIMARY_ORB_HORIZONTAL_OFFSET,
                            0,
                        ],
                        y: [
                            0,
                            PRIMARY_ORB_VERTICAL_OFFSET,
                            -PRIMARY_ORB_VERTICAL_OFFSET,
                            0,
                        ],
                        rotate: [0, 10, -10, 0],
                    }}
                    className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-500/30 to-blue-500/30 blur-[100px]"
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 5,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    animate={{
                        x: [
                            0,
                            -PRIMARY_ORB_HORIZONTAL_OFFSET,
                            PRIMARY_ORB_HORIZONTAL_OFFSET,
                            0,
                        ],
                        y: [
                            0,
                            -PRIMARY_ORB_VERTICAL_OFFSET,
                            PRIMARY_ORB_VERTICAL_OFFSET,
                            0,
                        ],
                    }}
                    className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-[120px]"
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 6,
                        ease: "easeInOut",
                    }}
                />
            </div>
            <Empty className="relative z-10">
                <EmptyHeader>
                    <EmptyTitle className="font-[Horizon] font-extrabold text-8xl md:text-9xl bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter drop-shadow-2xl">
                        404
                    </EmptyTitle>

                    <EmptyDescription className="text-zinc-400 text-lg md:text-xl leading-relaxed mt-4">
                        The page you&#39;re looking for might have been <br className="hidden md:block" />
                        moved or doesn&#39;t exist.
                    </EmptyDescription>
                </EmptyHeader>

                <EmptyContent className="mt-8">
                    <Button asChild className="bg-white text-black hover:bg-zinc-300/90 transition-all font-bold text-md shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" /> Go Home
                        </Link>
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    );
}