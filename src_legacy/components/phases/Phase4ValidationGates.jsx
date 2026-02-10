import { motion } from 'framer-motion';
import { Users, Zap, Award, ArrowRight, Shield } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const gateConfig = [
    {
        key: 'resonance',
        icon: Users,
        title: 'RISONANZA UNICA',
        description: 'Valuta l\'allineamento della frequenza del tuo asset rispetto alla base collettiva.',
        question: 'Le persone ti hanno cercato spontaneamente per questo specifico servizio?'
    },
    {
        key: 'scalability',
        icon: Zap,
        title: 'CRAFT SCALABILE',
        description: 'Verifica l\'integrità strutturale per un\'espansione infinita. L\'architettura deve reggere.',
        question: 'Puoi erogare questo valore senza la tua presenza fisica costante?'
    },
    {
        key: 'authority',
        icon: Award,
        title: 'AUTORITÀ SOVRANA',
        description: 'Conferma la firma di proprietà. Stabilisci il dominio sull\'asset.',
        question: 'Hai già prove tangibili o un metodo proprietario validato?'
    }
];

export default function Phase4ValidationGates() {
    const { gates, setGate, setPhase, marketTitles, selectedTitle } = useAppStore();

    // Protezione anti-crash in caso di refresh o dati mancanti
    if (selectedTitle === null || !marketTitles || marketTitles.length === 0) {
        return (
            <div className="text-center p-12 glass-card">
                <p className="text-[var(--text-secondary)] mb-6">Dati non trovati. Il ciclo deve essere riavviato.</p>
                <button onClick={() => setPhase(1)} className="btn-primary px-8 py-3 rounded-full bg-[var(--violet)] text-white">
                    Torna all'Inizio
                </button>
            </div>
        );
    }

    const allAnswered = gates.resonance !== null && gates.scalability !== null && gates.authority !== null;

    return (
        <div className="glass-card p-12 relative w-full text-white">
            <div className="corner-accent top-left border-[var(--violet)]" />
            <div className="corner-accent bottom-right border-[var(--violet)]" />

            {/* Header */}
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-center gap-4 mb-6">
                    <Shield className="text-[var(--violet)]" size={40} />
                    <span className="text-sm tracking-[0.4em] text-[var(--text-muted)] uppercase font-semibold">Fase 04 · Sacred Money Studio</span>
                </div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight uppercase">Fase 4: I <span className="text-[var(--violet)]">Cancelli</span> di Validazione</h2>
                <p className="text-[var(--text-secondary)] text-base mb-6 max-w-2xl mx-auto leading-relaxed">Sottoponi il tuo Asset Sovrano alla prova. Solo l'architetto consapevole attraversa il portale del mercato.</p>
                <div className="inline-block px-8 py-4 rounded-lg bg-[var(--violet)]/10 border border-[var(--violet)]/20 backdrop-blur-md shadow-[0_0_20px_rgba(82,17,212,0.1)]">
                    <span className="text-[var(--violet)] font-bold tracking-widest text-lg uppercase italic">{marketTitles[selectedTitle]}</span>
                </div>
            </motion.div>

            {/* Gates Arches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
                {gateConfig.map((gate, index) => {
                    const Icon = gate.icon;
                    const val = gates[gate.key];

                    return (
                        <motion.div
                            key={gate.key}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.15) }}
                            className="relative group perspective"
                        >
                            {/* Arch Construction */}
                            <div className={`relative h-[500px] flex flex-col items-center p-1 transition-all duration-700 ${val === true ? 'scale-105' : 'hover:scale-[1.02]'
                                }`}>
                                {/* Glass Arch Structure */}
                                <div className={`absolute inset-0 rounded-t-full border-t-2 border-x-2 backdrop-blur-sm transition-all duration-500 ${val === true
                                        ? 'border-[var(--violet)] bg-[var(--violet)]/5 shadow-[0_0_50px_var(--violet-glow)]'
                                        : val === false
                                            ? 'border-red-500/50 bg-red-500/5'
                                            : 'border-white/10 bg-white/5 group-hover:border-[var(--violet)]/30'
                                    }`} />

                                {/* Inner Portal Glow */}
                                <div className={`absolute inset-4 rounded-t-full opacity-0 transition-opacity duration-700 ${val === true ? 'opacity-100 bg-gradient-to-b from-[var(--violet)]/20 to-transparent' : ''
                                    }`} />

                                {/* Keystone Icon */}
                                <div className={`relative z-10 -mt-6 w-16 h-16 rounded-full flex items-center justify-center border-2 bg-[var(--obsidian)] transition-all duration-500 ${val === true
                                        ? 'border-[var(--violet)] text-[var(--violet)] shadow-[0_0_30px_var(--violet-glow)] scale-110'
                                        : val === false
                                            ? 'border-red-500 text-red-500'
                                            : 'border-white/10 text-white/20 group-hover:border-[var(--violet)]/50 group-hover:text-white'
                                    }`}>
                                    <Icon size={28} />
                                </div>

                                {/* Content Container */}
                                <div className="relative z-10 flex flex-col items-center text-center px-6 pt-12 pb-8 h-full">
                                    <h3 className={`text-xl font-bold uppercase tracking-widest mb-4 transition-colors duration-300 ${val === true ? 'text-white text-glow' : 'text-white/60 group-hover:text-white'
                                        }`}>
                                        {gate.title}
                                    </h3>

                                    <div className="w-8 h-px bg-white/20 mb-6" />

                                    <p className="text-sm text-[var(--text-secondary)] mb-8 font-light leading-relaxed">
                                        {gate.description}
                                    </p>

                                    <p className="text-white font-medium leading-snug mb-auto bg-black/20 p-4 rounded-lg border border-white/5">
                                        "{gate.question}"
                                    </p>

                                    {/* Validation Controls */}
                                    <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                                        <button
                                            onClick={() => setGate(gate.key, false)}
                                            className={`py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${val === false
                                                    ? 'bg-red-500 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                                    : 'bg-transparent text-white/30 border-white/10 hover:border-red-500/50 hover:text-red-400'
                                                }`}
                                        >
                                            Nega
                                        </button>
                                        <button
                                            onClick={() => setGate(gate.key, true)}
                                            className={`py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${val === true
                                                    ? 'bg-[var(--violet)] text-white border-[var(--violet)] shadow-[0_0_20px_var(--violet-glow)]'
                                                    : 'bg-transparent text-white/30 border-white/10 hover:border-[var(--violet)]/50 hover:text-[var(--cyan)]'
                                                }`}
                                        >
                                            Valida
                                        </button>
                                    </div>
                                </div>

                                {/* Portal Beam Effect */}
                                {val === true && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-[var(--violet)] blur-sm shadow-[0_0_20px_var(--violet)]" />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="text-center">
                <button
                    onClick={() => allAnswered && setPhase(5)}
                    disabled={!allAnswered}
                    className="btn-primary bg-[var(--violet)] text-white py-5 px-12 rounded-lg text-lg tracking-widest hover:shadow-[0_0_35px_var(--violet-glow)] transition-all duration-500 flex items-center gap-4 mx-auto disabled:opacity-20 uppercase font-bold"
                >
                    <span>RIVELA IL DECRETO ALCHEMICO</span><ArrowRight size={22} />
                </button>
            </div>
        </div>
    );
}
