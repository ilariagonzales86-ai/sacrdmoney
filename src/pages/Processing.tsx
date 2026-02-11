import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_COPY } from '../constants/copy';

const Processing: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/report');
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-center relative overflow-hidden">
            {/* Light Beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>

            <div className="z-10 flex flex-col items-center gap-12">
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Crystal */}
                    <div className="absolute w-24 h-24 bg-gradient-to-tr from-purple-400 to-indigo-300 opacity-80 blur-lg rounded-full animate-pulse"></div>
                    <div className="w-32 h-32 relative animate-float">
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                            <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="url(#crystalGradient)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
                            <path d="M50 5 L50 95" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                            <path d="M5 25 L95 75" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                            <path d="M95 25 L5 75" stroke="rgba(255,255,255,0.4)" strokeWidth="0.2" />
                            <defs>
                                <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(200, 160, 255, 0.4)" />
                                    <stop offset="50%" stopColor="rgba(100, 50, 200, 0.6)" />
                                    <stop offset="100%" stopColor="rgba(50, 20, 100, 0.8)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    {/* Particles around crystal */}
                    <div className="absolute inset-0 animate-spin-slow">
                        <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                        <div className="absolute bottom-10 right-0 w-1.5 h-1.5 bg-purple-300 rounded-full shadow-[0_0_10px_purple]"></div>
                        <div className="absolute top-10 left-0 w-1 h-1 bg-indigo-300 rounded-full"></div>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-display font-light text-gray-300 tracking-[0.2em] uppercase">
                        {APP_COPY.processing.title.main} <span className="font-bold text-white text-shadow-glow">{APP_COPY.processing.title.highlight}</span>
                    </h2>
                    <p className="text-xs text-gray-500 tracking-widest uppercase">
                        {APP_COPY.processing.description}
                    </p>
                </div>

                <div className="w-64 space-y-2">
                    <div className="h-0.5 w-full bg-gray-800 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-white shadow-[0_0_15px_white] w-1/2 animate-[shimmer_1.5s_infinite_linear]"></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                        <span>{APP_COPY.processing.status}</span>
                        <span>68%</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 w-full flex justify-between px-10">
                <div className="flex gap-2 items-center bg-black/40 px-3 py-1 rounded border border-white/5 text-[9px] text-orange-300">
                    <span className="material-icons text-[10px]">shield</span> {APP_COPY.processing.footer.encrypted}
                </div>
                <div className="flex gap-2 items-center bg-black/40 px-3 py-1 rounded border border-white/5 text-[9px] text-green-400">
                    <span className="material-icons text-[10px]">radio_button_checked</span> {APP_COPY.processing.footer.node}
                </div>
                <div className="flex gap-2 items-center bg-black/40 px-3 py-1 rounded border border-white/5 text-[9px] text-orange-300">
                    {APP_COPY.processing.footer.phase}
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
};

export default Processing;