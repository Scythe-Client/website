'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from "axios";
import Link from "next/link";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import NotFound from "@/app/not-found";
import {
    Calendar,
    Clock,
    User,
    ChevronLeft,
    Twitter,
    Facebook,
    Link as LinkIcon
} from "lucide-react";

const BLOG_POSTS: Record<string, any> = {
    "1": {
        title: "How to Download & Install Scythe Client",
        date: "November 22, 2025",
        readTime: "3 min read",
        author: "HerobrineTG",
        category: "Guide",
        image: "/images/bg.jpg",
        content: (
            <>
                <p>Getting started with Scythe Client is incredibly easy. We&#39;ve built a custom installer that handles all the Java dependencies and version management for you.</p>
                <br/>
                <h3>Step 1: Download the Installer</h3>
                <p>Head over to our <a href="/download">Download Page</a>. You will see options for Windows, macOS, and Linux. Click the button corresponding to your operating system to download the <code>ScytheInstaller.exe</code> (or .dmg/.deb).</p>
                <br/>
                <h3>Step 2: Run the Installer</h3>
                <p>Double-click the downloaded file. You might get a &#34;Windows SmartScreen&#34; warning because our certificate is new. Click &#34;More Info&#34; and then &#34;Run Anyway&#34;.</p>
                <br/>
                <h3>Step 3: Select Your Version</h3>
                <p>Once the installer opens, you can choose:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
                    <li><strong>Scythe 1.21.4</strong> (Recommended for SMPs/Survival)</li>
                </ul>
                <p>Click &#34;Install&#34;. The process usually takes about 15-30 seconds.</p>
                <br/>
                <h3>Step 4: Launch Scythe Client</h3>
                <p>Open the newly installed Scythe Client Launcher and hit Play!</p>
            </>
        )
    },
    "2": {
        title: "About the Release",
        date: "November 22, 2025",
        readTime: "2 min read",
        author: "PaidInMoney",
        category: "Announcement",
        image: "/images/bg.jpg",
        content: (
            <>
                <p>We want to give everyone a quick update on where Scythe Client is at. We aren't quite ready for release yet, but progress is moving fast.</p>

                <h3>Current Focus: Cosmetics</h3>
                <p>Right now, the team is fully focused on the <strong>Cosmetics System</strong>. We are building a robust engine that allows for capes, wings, and bandanas that render smoothly without impacting your FPS.</p>
                <p>We want to ensure that looking good doesn't cost you performance. It's a tricky balance, but the new rendering engine is handling the assets beautifully so far.</p>

                <h3>Beta Testing</h3>
                <p>We know many of you are asking for the download link. <strong>We have not started beta testing yet.</strong></p>
                <p>Once the cosmetic system is finalized and the UI is polished, we will officially open applications for our first wave of closed beta testers. If you want to help us shape the future of Scythe and hunt down bugs, keep an eye on our Discord for the announcement.</p>

                <h3>What's Next?</h3>
                <p>After the cosmetics integration is complete, we will move on to the HUD editor polish, and then... the Beta. Stay tuned.</p>
            </>
        )
    },
};

export default function BlogPost() {
    const params = useParams();
    const id = params?.id as string;

    const [post, setPost] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const localPost = BLOG_POSTS[id];
        if (localPost) {
            setPost(localPost);
            setIsLoading(false);
            return;
        }

        const fetchBlog = async () => {
            try {
                const res = await axios.get("/api/blogs");
                const blogs = res.data as any[];
                const b = blogs.find((blog) => blog._id === id);

                if (!b) {
                    setPost(null);
                    return;
                }

                const mapped = {
                    title: b.title,
                    date: new Date(b.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }),
                    readTime: b.readTime || "3 min read",
                    author: b.author,
                    category: b.tag || "Announcement",
                    image: b.backgroundImage || "/images/bg.jpg",
                    content: b.content,
                };
                setPost(mapped);
            } catch {
                setPost(null);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchBlog();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-[60]"
                style={{ width: `${scrollProgress * 100}%` }}
            />

            <Header currentPage="/blogs" />

            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-top bg-no-repeat bg-cover opacity-30" style={{ backgroundImage: `url('${post.image}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black"></div>

                <div className="relative max-w-4xl mx-auto text-center z-10">
                    <div className="flex items-center justify-center gap-4 text-sm font-medium text-purple-400 mb-6 animate-fade-in-up">
                        <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full uppercase tracking-wider text-xs">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" /> {post.date}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" /> {post.readTime}
                        </div>
                    </div>

                    <h1 className="font-[Horizon] text-4xl md:text-6xl font-bold mb-8 leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent drop-shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                        <div className="text-left">
                            <div className="text-sm text-gray-300 font-semibold">{post.author}</div>
                            <div className="text-xs text-gray-500">Scythe Client Team</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blogs
                    </Link>

                    <article className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-white
                        prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-purple-200
                        prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:mb-6
                        prose-strong:text-white
                        prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
                        prose-li:text-zinc-400
                    ">
                        {typeof post.content === "string" ? (
                            <p className="whitespace-pre-line">{post.content}</p>
                        ) : (
                            post.content
                        )}
                    </article>

                    <div className="h-px w-full bg-zinc-800 my-12" />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl">
                        <div>
                            <h4 className="text-white font-bold mb-1">Share this article</h4>
                            <p className="text-sm text-zinc-500">Help spread the word about Scythe Client.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 bg-zinc-800 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors text-zinc-400">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-zinc-800 rounded-full hover:bg-[#1877F2] hover:text-white transition-colors text-zinc-400">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-zinc-800 rounded-full hover:bg-purple-600 hover:text-white transition-colors text-zinc-400">
                                <LinkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}