import { Sword, Zap, Shield, Download, Github, Twitter } from 'lucide-react';
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed w-full bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold">Scythe Client</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="hover:text-purple-500 transition-colors">Features</a>
                        <a href="#download" className="hover:text-purple-500 transition-colors">Download</a>
                        <a href="#community" className="hover:text-purple-500 transition-colors">Community</a>
                        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                        <span className="text-purple-400 text-sm font-semibold">In Beta</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-semibold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-950 bg-clip-text text-transparent">
                        Scythe Client
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        The ultimate Minecraft client for competitive players. Dominate the battlefield with cutting-edge features.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="#download">
                            <button className="group cursor-pointer bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-md font-medium text-lg shadow shadow-black transition-all hover:transform-stroke flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Now
                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </Link>
                        <button className="border-2 border-gray-700 cursor-pointer hover:border-purple-500 px-6 py-2.5 rounded-lg font-bold text-lg shadow-purple-700 shadow transition-all hover:transform-stroke hover:shadow-purple-800">
                            View Documentation
                        </button>
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>0 Active Users</span>
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
                        <h2 className="text-4xl md:text-5xl font-semibold mb-4">Unmatched Performance</h2>
                        <p className="text-gray-400 text-lg">Features designed for competitive excellence</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 p-8 rounded-xl transition-all hover:scale-105">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                <Zap className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
                            <p className="text-gray-400">
                                Optimized for maximum FPS with minimal resource usage. Experience buttery smooth gameplay even in intense battles.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 p-8 rounded-xl transition-all hover:scale-105">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                <Shield className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Secure & Safe</h3>
                            <p className="text-gray-400">
                                Built with security in mind. Regular updates and community-audited code ensure your safety while playing.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 p-8 rounded-xl transition-all hover:scale-105">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                <Sword className="w-8 h-8 text-purple-500" />
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
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6">Ready to dominate?</h2>
                    <p className="text-gray-400 text-lg mb-12">
                        Join thousands of players who have already upgraded their Minecraft experience
                    </p>
                    <div className="bg-black border border-gray-800 rounded-2xl p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <h3 className="text-3xl font-semibold mb-2">Scythe Client v1.0</h3>
                                <p className="text-gray-400 mb-4">Compatible with Minecraft 1.8 - 1.20</p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Windows</span>
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">macOS</span>
                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Linux</span>
                                </div>
                            </div>
                            <button className="group cursor-not-allowed bg-gray-600 px-6 py-2.5 rounded-md font-medium text-lg shadow shadow-black transition-all hover:transform-stroke flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="community" className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community</h2>
                        <p className="text-gray-400 text-lg">Connect with players worldwide</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-purple-500 mb-2">50K+</div>
                            <div className="text-gray-400">Active Users</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-purple-500 mb-2">1M+</div>
                            <div className="text-gray-400">Downloads</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-purple-500 mb-2">24/7</div>
                            <div className="text-gray-400">Support</div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-purple-500 p-4 rounded-lg transition-all">
                            <Github className="w-6 h-6" />
                        </button>
                        <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-purple-500 p-4 rounded-lg transition-all">
                            <Twitter className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </section>

            <footer className="border-t border-gray-800 py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Sword className="w-6 h-6 text-purple-500" />
                        <span className="font-bold">Scythe Client</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © 2024 Scythe Client. Not affiliated with Mojang or Microsoft.
                    </p>
                </div>
            </footer>
        </div>
    );
}
