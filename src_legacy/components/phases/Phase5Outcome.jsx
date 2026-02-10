import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, AlertTriangle, Download, Calendar, RefreshCw } from 'lucide-react';
import { useAppStore, BOOKING_URL } from '../../store/useAppStore';
import { generateSovereignPDF } from '../../services/pdfService';

function GoldParticles() {
    const [particles] = useState(() => Array.from({ length: 30 }, (_, i) => ({
        id: i, left: Math.random() * 100, delay: Math.random() * 2, size: 6 + Math.random() * 8
    })));

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {particles.map(p => (
                <div key={p.id} className="celebration-particle" style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, width: p.size, height: p.size }} />
            ))}
        </div>
    );
}

export default function Phase5Outcome() {
    const { getOutcome, marketTitles, selectedTitle, reset, setPhase, quadrants, gates } = useAppStore();
    const [showParticles, setShowParticles] = useState(false);

    const outcome = getOutcome();
    const isSuccess = outcome?.type === 'success';

    useEffect(() => {
        if (isSuccess && !showParticles) {
            const timer = setTimeout(() => setShowParticles(true), 100);
            const stopTimer = setTimeout(() => setShowParticles(false), 5100);
            return () => {
                clearTimeout(timer);
                clearTimeout(stopTimer);
            };
        }
    }, [isSuccess]);

    // Protezione anti-crash in caso di refresh o dati mancanti - DOPO gli Hook
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

    const handleBooking = () => window.open(BOOKING_URL, '_blank');
    const handleDownload = () => {
        try {
            generateSovereignPDF({
                marketTitle: marketTitles[selectedTitle],
                quadrants,
                gates,
                outcome
            });
        } catch (error) {
            console.error('Errore durante la generazione del PDF:', error);
            alert(`Errore Download: ${error.message}`);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            {showParticles && <GoldParticles />}

            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 backdrop-blur-md">
                    <span className="text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase font-bold">Rapporto Finale</span>
                </div>
                <h2 className={`text-6xl font-bold mb-6 tracking-tighter ${isSuccess ? 'text-[var(--gold)] text-glow-gold' : 'text-white'}`}>
                    {isSuccess ? 'The Alchemical Architect' : 'Calibrazione Necessaria'}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mb-8 opacity-50" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Certificate / Details */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div className={`glass-card p-10 relative overflow-hidden backdrop-blur-2xl ${isSuccess ? 'border-[var(--gold)]/30 box-shadow-gold' : 'border-red-500/30'}`}>
                        {/* Decorative Certificate Elements */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[var(--gold)]/20 rounded-tl-3xl m-4" />
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[var(--gold)]/20 rounded-tr-3xl m-4" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[var(--gold)]/20 rounded-bl-3xl m-4" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[var(--gold)]/20 rounded-br-3xl m-4" />

                        <div className="relative z-10">
                            <span className="text-[10px] tracking-[0.4em] text-[var(--text-muted)] uppercase font-bold block mb-2">
                                Asset Cristallizzato
                            </span>
                            <h3 className="text-3xl font-bold text-white mb-6 font-serif italic">
                                "{marketTitles[selectedTitle]}"
                            </h3>

                            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 font-light italic border-l-2 border-[var(--gold)]/50 pl-6 py-2">
                                {isSuccess
                                    ? '"Un ecosistema di design generativo che trasforma il caos creativo in strutture di mercato scalabili e autorevoli."'
                                    : '"Il nucleo è potente, ma l\'architettura richiede una ricalibrazione frequenziale per sostenere la piena sovranità."'}
                            </p>

                            <div className="grid grid-cols-2 gap-6 text-sm mb-8 border-t border-white/10 pt-6">
                                <div>
                                    <span className="block text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1">Codice Identità</span>
                                    <span className="font-mono text-[var(--gold)]">ARC-772-SNC</span>
                                </div>
                                <div>
                                    <span className="block text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1">Frequenza</span>
                                    <span className="font-mono text-[var(--cyan)]">963 Hz</span>
                                </div>
                            </div>

                            {/* Failure Details */}
                            {!isSuccess && outcome?.failures && (
                                <div className="space-y-3 mb-8">
                                    {outcome.failures.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-red-500/10 p-3 rounded border border-red-500/20 text-red-400 text-xs tracking-wide uppercase">
                                            <AlertTriangle size={14} className="shrink-0" />
                                            <span>{f.message}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-4">
                                {isSuccess ? (
                                    <button
                                        onClick={handleDownload}
                                        className="flex-1 bg-[var(--gold)] text-black font-bold py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-[var(--gold-light)] transition-colors uppercase tracking-widest text-xs"
                                    >
                                        <Download size={16} />
                                        <span>Scarica Decreto</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleBooking}
                                        className="flex-1 bg-red-600 text-white font-bold py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-red-500 transition-colors uppercase tracking-widest text-xs"
                                    >
                                        <Calendar size={16} />
                                        <span>Richiedi Calibrazione</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Radar Chart Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative flex justify-center items-center aspect-square md:aspect-auto h-[500px]"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-[var(--violet)]/20 to-transparent blur-3xl" />

                    {/* Radar Chart SVG */}
                    <div className="relative w-full max-w-[500px] h-[500px] glass-card rounded-3xl border-[var(--violet)]/20 bg-[var(--midnight-glass)] flex items-center justify-center">
                        <svg viewBox="0 0 400 400" className="w-[90%] h-[90%] visible">
                            {/* Grid Lines (Diamond Shape) */}
                            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                                <polygon
                                    key={i}
                                    points={`200,${200 - 150 * scale} ${200 + 150 * scale},200 200,${200 + 150 * scale} ${200 - 150 * scale},200`}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="1"
                                />
                            ))}

                            {/* Axis Lines */}
                            <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                            {/* Data Polygon (Simulated Data for visual) */}
                            {/* Ritual (Top), Sandbox (Right), Craft (Bottom), Mischief (Left) */}
                            <polygon
                                points="200,80 320,200 200,310 110,200"
                                fill="rgba(82, 17, 212, 0.3)"
                                stroke="var(--cyan)"
                                strokeWidth="2"
                                className="drop-shadow-[0_0_10px_rgba(0,212,170,0.5)]"
                            >
                                <animate attributeName="opacity" values="0.5;0.8;0.5" duration="4s" repeatCount="indefinite" />
                            </polygon>

                            {/* Points Decoration */}
                            <circle cx="200" cy="80" r="4" fill="var(--gold)" />
                            <circle cx="320" cy="200" r="4" fill="var(--gold)" />
                            <circle cx="200" cy="310" r="4" fill="var(--gold)" />
                            <circle cx="110" cy="200" r="4" fill="var(--gold)" />

                            {/* Labels */}
                            <text x="200" y="40" textAnchor="middle" fill="var(--text-muted)" fontSize="10" letterSpacing="2">RITUAL</text>
                            <text x="370" y="205" textAnchor="middle" fill="var(--text-muted)" fontSize="10" letterSpacing="2">SANDBOX</text>
                            <text x="200" y="370" textAnchor="middle" fill="var(--text-muted)" fontSize="10" letterSpacing="2">CRAFT</text>
                            <text x="30" y="205" textAnchor="middle" fill="var(--text-muted)" fontSize="10" letterSpacing="2">MISCHIEF</text>
                        </svg>

                        <div className="absolute bottom-6 text-[10px] text-[var(--text-muted)] max-w-xs text-center leading-relaxed">
                            Il tuo profilo bilancia l'ordine rituale con l'innovazione della Sandbox, creando una fondazione solida per la sovranità finanziaria.
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Reset Action */}
            <motion.button
                onClick={reset}
                className="mt-16 text-[var(--text-muted)] hover:text-[var(--violet)] transition-colors flex items-center gap-3 mx-auto text-xs tracking-[0.4em] font-bold uppercase group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                <span>Ricomincia Alchimia</span>
            </motion.button>
        </div>
    );
}
