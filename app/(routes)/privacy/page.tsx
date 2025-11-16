'use client';

import Link from "next/link";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header currentPage="/privacy"/>

            <section className="relative pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-[Horizon] text-5xl md:text-6xl font-semibold mb-6 text-gradient-animated">
                        Privacy Policy
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
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">1. Introduction</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Scythe Client ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our software.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">2. Information We Collect</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We collect information in the following ways:
                            </p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="text-gray-300">- <span className="text-purple-400">Usage Data:</span> Information about how you interact with Scythe Client, including features used and performance metrics</li>
                                <li className="text-gray-300">- <span className="text-purple-400">Device Information:</span> Operating system, hardware specifications, and unique device identifiers</li>
                                <li className="text-gray-300">- <span className="text-purple-400">Error Reports:</span> Crash logs and diagnostic information to improve stability</li>
                                <li className="text-gray-300">- <span className="text-purple-400">Configuration Data:</span> Your client settings and preferences</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">3. What We Do Not Collect</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                For clarity, we explicitly do NOT collect:
                            </p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="text-gray-300">- Your Minecraft username or password</li>
                                <li className="text-gray-300">- Microsoft account credentials</li>
                                <li className="text-gray-300">- Chat messages or personal conversations</li>
                                <li className="text-gray-300">- Account login tokens or session data</li>
                                <li className="text-gray-300">- Any personally identifiable information (PII) unless voluntarily provided</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">4. How We Use Your Information</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                The information we collect is used to:
                            </p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="text-gray-300">- Improve software performance and stability</li>
                                <li className="text-gray-300">- Fix bugs and develop new features</li>
                                <li className="text-gray-300">- Analyze usage patterns to understand how users interact with the client</li>
                                <li className="text-gray-300">- Provide technical support</li>
                                <li className="text-gray-300">- Comply with legal obligations</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">5. Data Sharing and Disclosure</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We do not sell or rent your personal information. We may share data only:
                            </p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="text-gray-300">- With service providers who assist in operating our software and services</li>
                                <li className="text-gray-300">- When required by law or in response to valid legal requests</li>
                                <li className="text-gray-300">- To protect our rights, privacy, safety, or property</li>
                                <li className="text-gray-300">- In aggregated, anonymized form for analytics and research</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">6. Data Retention</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We retain usage data for up to 90 days. Crash logs and error reports are retained for 30 days unless needed for ongoing support. You can request deletion of your data at any time by contacting us through our Discord community.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">7. Security Measures</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We implement industry-standard security measures including encryption, secure servers, and limited access protocols. However, no system is 100% secure. We cannot guarantee absolute security of your information.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">8. Third-Party Services</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Scythe Client may use third-party services for analytics and crash reporting. These services have their own privacy policies, which we encourage you to review. We are not responsible for third-party privacy practices.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">9. User Rights</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="text-gray-300">- Request access to the data we hold about you</li>
                                <li className="text-gray-300">- Request correction of inaccurate data</li>
                                <li className="text-gray-300">- Request deletion of your data</li>
                                <li className="text-gray-300">- Opt-out of data collection by disabling analytics in settings</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">10. Changes to This Policy</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update this Privacy Policy periodically. Continued use of Scythe Client following changes constitutes your acceptance of the updated policy. We will announce significant changes on our Discord community.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-purple-300">11. Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have privacy concerns or questions, please reach out to us on our{' '}
                                <Link href="https://discord.scytheclient.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    Discord server
                                </Link>
                                .
                            </p>
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-700">
                            <p className="text-gray-400 text-sm">
                                By using Scythe Client, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}