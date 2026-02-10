import { motion } from 'framer-motion';
import { Target, Check, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function Phase3MarketCrystal() {
    const { marketTitles, selectedTitle, setSelectedTitle, setPhase } = useAppStore();

    const handleContinue = () => {
        if (selectedTitle !== null) {
            setPhase(4);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-[var(--violet)]/10 border border-[var(--violet)]/20 backdrop-blur-md">
                    <span className="text-[10px] tracking-[0.3em] text-[var(--violet)] uppercase font-bold">Fase 3 di 5</span>
                </div>
                <h2 className="text-5xl font-bold mb-4 tracking-tighter text-white">
                    Cristallo di <span className="text-[var(--violet)] text-glow">Mercato</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed font-light">
                    Il tuo Asset Sovrano si sta cristallizzando. Scegli la risonanza che meglio definisce il tuo ingresso nel mercato.
                </p>
            </motion.div>

            {/* Rich Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {marketTitles.map((title, index) => {
                    // Generate pseudo-random stats for visual flair based on title length
                    const systemsScore = 85 + (title.length % 15);
                    const visionScore = 90 + (index * 2);
                    const riskScore = 40 + (index * 5);

                    return (
                        <motion.div
                            key={index}
                            className={`relative h-full flex flex-col p-[1px] rounded-2xl transition-all duration-500 cursor-pointer group ${selectedTitle === index ? 'scale-105 z-10' : 'hover:scale-[1.02]'}`}
                            onClick={() => setSelectedTitle(index)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            {/* Gradient Border Background */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${selectedTitle === index
                                ? 'from-[var(--violet)] via-[var(--cyan)] to-[var(--violet)]'
                                : 'from-white/10 to-white/5 group-hover:from-white/20'}`}
                            />

                            {/* Card Content */}
                            <div className="relative h-full bg-[var(--obsidian)]/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col overflow-hidden">
                                {/* Top Badge */}
                                {selectedTitle === index && (
                                    <div className="absolute top-4 right-4 animate-pulse">
                                        <div className="bg-[var(--violet)]/20 border border-[var(--violet)] px-3 py-1 rounded-full flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[var(--violet)] rounded-full animate-ping" />
                                            <span className="text-[10px] uppercase tracking-widest text-[var(--violet)] font-bold">Resonance Detected</span>
                                        </div>
                                    </div>
                                )}

                                {/* Icon Placeholder (Crystal) */}
                                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center group-hover:border-[var(--violet)]/50 transition-colors shadow-2xl shadow-[var(--violet)]/5">
                                    <Target className={`w-8 h-8 ${selectedTitle === index ? 'text-[var(--cyan)]' : 'text-white/20'}`} />
                                </div>

                                {/* Title */}
                                <h3 className={`text-xl font-bold uppercase tracking-wide text-center mb-2 ${selectedTitle === index ? 'text-white text-glow' : 'text-white/60'}`}>
                                    {title}
                                </h3>

                                {/* Description Placeholder */}
                                <p className="text-center text-sm text-[var(--text-muted)] mb-8 font-light leading-relaxed">
                                    Un'architettura di mercato unica che combina visione strategica e profonda risonanza emotiva.
                                </p>

                                {/* Stats Visuals */}
                                <div className="mt-auto space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                            <span>Systems</span>
                                            <span>{systemsScore}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[var(--violet)]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${systemsScore}%` }}
                                                transition={{ delay: 0.5 + (index * 0.1), duration: 1 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                            <span>Vision</span>
                                            <span>{visionScore}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[var(--cyan)]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${visionScore}%` }}
                                                transition={{ delay: 0.7 + (index * 0.1), duration: 1 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                            <span>Risk</span>
                                            <span>{riskScore}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-white/20"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${riskScore}%` }}
                                                transition={{ delay: 0.9 + (index * 0.1), duration: 1 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Continue button */}
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <button
                    onClick={handleContinue}
                    disabled={selectedTitle === null}
                    className="group relative px-12 py-5 bg-[var(--violet)] text-white font-bold text-sm tracking-[0.2em] uppercase rounded-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_50px_var(--violet-glow)] transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center gap-3">
                        Inizia i Cancelli di Validazione
                        <ArrowRight size={16} />
                    </span>
                </button>
            </motion.div>
        </div>
    );
}
