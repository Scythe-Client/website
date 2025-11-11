import Link from "next/link";
import {FaDiscord, FaInstagram, FaTwitter} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-800 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
                <div className="flex flex-col gap-2">
                    <span className="font-semibold text-xl text-white">Scythe Client</span>
                    <p className="text-gray-500 text-sm md:max-w-xs">
                        © 2025 Scythe Client. Not affiliated with Mojang or Microsoft.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-gray-400 text-sm font-semibold">Socials</span>
                    <Link href="https://discord.scytheclient.com">
                        <button className="cursor-pointer text-gray-300 flex items-center gap-2 px-2 py-1 hover:text-[#7a4dba] transition-all rounded-md text-sm">
                            <FaDiscord className="w-5 h-5" />
                            Discord
                        </button>
                    </Link>
                    <Link href="">
                        <button className="cursor-pointer text-gray-300 flex items-center gap-2 px-2 py-1 hover:text-[#7a4dba] transition-all rounded-md text-sm">
                            <FaTwitter className="w-5 h-5" />
                            Twitter
                        </button>
                    </Link>
                    <Link href="">
                        <button className="cursor-pointer text-gray-300 flex items-center gap-2 px-2 py-1 hover:text-[#7a4dba] transition-all rounded-md text-sm">
                            <FaInstagram className="w-5 h-5" />
                            Instagram
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-gray-400 text-sm font-semibold">Legal</span>
                    <Link href="">
                        <button className="cursor-pointer text-gray-300 px-2 py-1 hover:text-[#7a4dba] transition-all rounded-md text-sm">Terms and Conditions</button>
                    </Link>
                    <Link href="">
                        <button className="cursor-pointer text-gray-300 px-2 py-1 hover:text-[#7a4dba] transition-all rounded-md text-sm">Privacy Policy</button>
                    </Link>
                </div>

            </div>
        </footer>
    );
}