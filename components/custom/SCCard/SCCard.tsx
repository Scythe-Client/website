import styles from './SCCard.module.css';
import Link from "next/link";

interface SCCardProps {
    title: string;
    paragraph: string;
    featured?: boolean;
}

export default function SCCard({ title, paragraph, featured }: SCCardProps) {
    return (
        <div className="card relative overflow-visible w-[256px] h-[354px]">
            <div
                className={`content w-full h-full ${styles['transform-style-preserve-3d']} transition-transform duration-300 ease-in-out hover:${styles['rotate-y-180']} rounded-lg shadow-[0_0_10px_1px_#000000ee]`}
            >
                <div
                    className={`back absolute inset-0 bg-[#151515] ${styles['backface-hidden']} rounded-lg flex justify-center items-center overflow-hidden`}
                >
                    <div
                        className={`absolute w-[160px] h-[160%] bg-gradient-to-r from-transparent via-[#8a7a9a] to-transparent ${styles['animate-rotation_481']}`}
                    ></div>

                    <div className="back-content absolute w-[99%] h-[99%] bg-[#151515] rounded-lg text-white p-6 flex flex-col justify-between">

                        <div className="flex flex-col items-start gap-4 cursor-default">
                            {featured && (
                                <div className="badge self-start bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm text-xs font-medium">
                                    Featured
                                </div>
                            )}

                            <h3 className="text-xl font-bold">
                                {title}
                            </h3>

                            <p className="text-sm leading-relaxed text-gray-300">
                                {paragraph}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <Link href="/features">
                                <button className="text-xs cursor-pointer font-medium text-purple-400 hover:text-purple-300 transition-colors focus:outline-none">
                                    Learn More →
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    className={`circle absolute w-[90px] h-[90px] rounded-full bg-[#7a6a9a99] blur-xl ${styles['animate-floating']} left-5 top-5`}
                ></div>
            </div>
        </div>
    );
}