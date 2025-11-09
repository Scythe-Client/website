import {SignInButton, SignUpButton, UserButton, useUser} from "@clerk/nextjs";

export default function Header() {
    const { isSignedIn } = useUser();
    return (
        <nav className="fixed w-full bg-black/60 backdrop-blur-sm border-b border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold">Scythe Client</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="/features" className="hover:text-[#7a4dba] transition-colors">Features</a>
                    <a href="/download" className="hover:text-[#7a4dba] transition-colors">Download</a>
                    <a href="/community" className="hover:text-[#7a4dba] transition-colors">Community</a>
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button className="hover:text-[#7a4dba] transition-colors cursor-pointer">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="group cursor-pointer bg-gradient-to-r from-[#3a2a5a] via-[#4a3a6a] to-[#2a1a4a] hover:from-[#4a3a6a] hover:to-[#3a2a5a] border border-gray-950 px-4 py-2 rounded-md font-medium text-md text-white shadow-[0_0_20px_-5px_rgba(90,50,150,0.6)] transition-all flex items-center gap-2">
                                    Get Started
                                </button>
                            </SignUpButton>
                        </>
                    ) : (
                        <UserButton afterSignOutUrl="/" />
                    )}
                </div>
            </div>
        </nav>
    );
}