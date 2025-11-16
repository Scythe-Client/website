'use client';

import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header currentPage="/tos"/>

            <section className="relative pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-6xl font-semibold mb-6 text-gradient-animated">
                        Terms of Service
                    </h1>
                    <p className="text-gray-400 text-lg mb-2">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">1. Agreement to Terms</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                By downloading, installing, and using Scythe Client, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the software.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">2. Use License</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Scythe Client is provided to you as-is for personal, non-commercial use. We grant you a limited, non-exclusive, non-transferable license to use our software in accordance with these terms. You may not:
                            </p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="text-gray-300">- Modify or copy the software</li>
                                <li className="text-gray-300">- Reverse engineer, decompile, or attempt to discover source code</li>
                                <li className="text-gray-300">- Use the software for any illegal purpose or in violation of Minecraft's EULA</li>
                                <li className="text-gray-300">- Distribute, sell, or rent the software</li>
                                <li className="text-gray-300">- Use the software to gain unfair advantage in multiplayer environments where prohibited</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">3. Minecraft Compliance</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Scythe Client is a third-party modification for Minecraft. You acknowledge that your use must comply with Minecraft's End User License Agreement and Terms of Service. You are solely responsible for ensuring your use of Scythe Client complies with server rules, anti-cheat policies, and applicable law.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">4. Disclaimer of Warranties</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Scythe Client is provided "as-is" without any warranties, express or implied. We do not warrant that the software will be error-free, uninterrupted, or free of viruses or other harmful components. Your use of the software is at your own risk.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">5. Limitation of Liability</h2>
                            <p className="text-gray-300 leading-relaxed">
                                To the fullest extent permitted by law, Scythe Client and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of profits, or account suspension resulting from your use of or inability to use the software.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">6. User Responsibility</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                You are responsible for:
                            </p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="text-gray-300">- Keeping your login credentials secure</li>
                                <li className="text-gray-300">- Understanding and complying with server rules and policies</li>
                                <li className="text-gray-300">- Maintaining a backup of your game files</li>
                                <li className="text-gray-300">- Reporting bugs or security vulnerabilities responsibly</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">7. Account Termination</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We reserve the right to terminate or suspend your access to Scythe Client at any time, with or without cause. This includes use in violation of these terms, Minecraft's EULA, or server anti-cheat policies.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">8. Modifications to Terms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may modify these Terms of Service at any time. Continued use of Scythe Client following changes constitutes acceptance of the updated terms. We will notify users of significant changes via our Discord community.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">9. Governing Law</h2>
                            <p className="text-gray-300 leading-relaxed">
                                These Terms of Service are governed by and construed in accordance with applicable law, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">10. Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have questions or concerns about these Terms of Service, please reach out to us on our{' '}
                                <Link href="https://discord.scytheclient.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    Discord server
                                </Link>
                                .
                            </p>
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-700">
                            <p className="text-gray-400 text-sm">
                                By using Scythe Client, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}