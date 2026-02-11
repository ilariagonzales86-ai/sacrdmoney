import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { APP_COPY } from '../constants/copy';

const Certificate: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-center p-6 md:p-12 relative">

            {/* Top Progress */}
            <div className="absolute top-10 w-full max-w-3xl px-4 hidden md:block">
                <div className="flex justify-between text-[10px] text-orange-200 uppercase tracking-widest mb-2 font-semibold">
                    <span>{APP_COPY.certificate.timeline.phase1}</span>
                    <span>{APP_COPY.certificate.timeline.phase2}</span>
                    <span>{APP_COPY.certificate.timeline.phase3}</span>
                    <span>{APP_COPY.certificate.timeline.phase4}</span>
                    <span className="text-white">{APP_COPY.certificate.timeline.phase5}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex gap-1 p-0.5">
                    <div className="h-full w-1/5 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>
                    <div className="h-full w-1/5 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>
                    <div className="h-full w-1/5 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>
                    <div className="h-full w-1/5 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>
                    <div className="h-full w-1/5 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse"></div>
                </div>
                <div className="text-right mt-1 text-[9px] text-white tracking-widest">{APP_COPY.certificate.timeline.completed}</div>
            </div>

            <div className="relative mt-16 md:mt-0 z-10 animate-float">
                {/* Gold particles background behind card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="glass-panel-heavy w-full max-w-2xl bg-black/40 border border-yellow-500/30 rounded-lg p-2 relative">
                    {/* Inner Gold Border */}
                    <div className="border-2 border-yellow-500/20 rounded h-full w-full p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">

                        {/* Decorative Corners */}
                        <div className="absolute top-2 left-2 text-yellow-500/40 text-4xl leading-none">╔</div>
                        <div className="absolute top-2 right-2 text-yellow-500/40 text-4xl leading-none">╗</div>
                        <div className="absolute bottom-2 left-2 text-yellow-500/40 text-4xl leading-none">╚</div>
                        <div className="absolute bottom-2 right-2 text-yellow-500/40 text-4xl leading-none">╝</div>

                        <div className="mb-6">
                            <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-1">{APP_COPY.certificate.labels.certificate}</p>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-400 mb-2 drop-shadow-lg">
                            {APP_COPY.certificate.labels.title1}
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-400 mb-8 drop-shadow-lg">
                            {APP_COPY.certificate.labels.title2}
                        </h2>

                        <p className="text-gray-300 font-light text-sm mb-8 italic">
                            {APP_COPY.certificate.labels.tagline}
                        </p>

                        <div className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-200 text-[10px] tracking-widest uppercase mb-10 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                            {APP_COPY.certificate.labels.validated}
                        </div>

                        <div className="grid grid-cols-3 gap-8 w-full border-t border-yellow-500/20 pt-6">
                            <div>
                                <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{APP_COPY.certificate.labels.authority.label}</p>
                                <p className="text-white font-serif text-lg">{APP_COPY.certificate.labels.authority.value}</p>
                            </div>
                            <div className="border-l border-r border-yellow-500/10">
                                <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{APP_COPY.certificate.labels.marketFit.label}</p>
                                <p className="text-white font-serif text-lg">{APP_COPY.certificate.labels.marketFit.value}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{APP_COPY.certificate.labels.potential.label}</p>
                                <p className="text-white font-serif text-lg">{APP_COPY.certificate.labels.potential.value}</p>
                            </div>
                        </div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-y-12 animate-pulse-slow pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <div className="mt-12 z-20">
                <button
                    onClick={() => navigate('/')}
                    className="group relative px-8 py-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/40 rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:border-yellow-400/60"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="flex items-center gap-2 text-yellow-100 font-medium tracking-wide text-sm relative z-10">
                        <span className="material-icons text-yellow-300">diamond</span>
                        {APP_COPY.certificate.button}
                    </span>
                </button>
            </div>

            <div className="absolute bottom-6 text-[10px] text-gray-600">
                {APP_COPY.certificate.labels.footer}
            </div>

        </div>
    );
};

export default Certificate;