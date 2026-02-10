import { motion } from 'framer-motion';
import { Grid3X3, Compass, Sparkles, Wrench, Crown, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { generateMarketTitles } from '../../services/supabase';

const quadrantConfig = {
    ritual: {
        title: 'RITUALE',
        subtitle: 'Ancoramento Energetico',
        icon: Compass,
        color: 'var(--text-muted)'
    },
    sandbox: {
        title: 'SANDBOX',
        subtitle: 'Spazio di Sperimentazione',
        icon: Sparkles,
        color: 'var(--text-secondary)'
    },
    mischief: {
        title: 'MISCHIEF',
        subtitle: 'Caos Sacro Creativo',
        icon: Wrench,
        color: 'var(--violet)'
    },
    craft: {
        title: 'CRAFT',
        subtitle: 'Opera di Maestria',
        icon: Crown,
        color: 'var(--gold)'
    }
};

export default function Phase2QuadrantSort() {
    const {
        quadrants,
        setPhase,
        setMarketTitles,
        isProcessing,
        setIsProcessing
    } = useAppStore();

    const handleCraftClick = async () => {
        if (!quadrants.craft || quadrants.craft.length === 0) return;

        setIsProcessing(true);
        try {
            const titles = await generateMarketTitles(quadrants.craft);
            setMarketTitles(titles);
            setPhase(3);
        } catch (error) {
            console.error('Errore generazione titoli:', error);
            alert('Errore durante la generazione dei titoli.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="glass-card p-12 relative w-full">
            <div className="corner-accent top-left border-[var(--violet)]" />
            <div className="corner-accent bottom-right border-[var(--violet)]" />

            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-center gap-3 mb-6">
                    <Grid3X3 className="text-[var(--violet)]" size={40} />
                    <span className="text-sm tracking-[0.4em] text-[var(--text-muted)] uppercase font-semibold">
                        Fase 02 · L'Organizzazione
                    </span>
                </div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">
                    Fase 2: Strutturazione dell'<span className="text-[var(--violet)]">Opera</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
                    Mappa la tua visione nei quattro quadranti fondamentali.
                    <span className="block mt-1 text-[var(--text-muted)] text-base italic">Incarna l'intento e dai forma al tuo flusso di sovranità.</span>
                </p>
            </motion.div>

            {/* Quadrant Grid */}
            <motion.div
                className="quadrant-grid grid grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {Object.entries(quadrantConfig).map(([key, config], index) => {
                    const Icon = config.icon;
                    const items = quadrants[key] || [];
                    const isCraft = key === 'craft';

                    return (
                        <motion.div
                            key={key}
                            className={`quadrant-card p-8 rounded-lg border transition-all duration-500 relative overflow-hidden ${isCraft
                                ? 'bg-gradient-to-br from-[rgba(212,175,55,0.1)] to-transparent border-[var(--gold)] cursor-pointer'
                                : 'bg-[var(--midnight-glass)] border-white/5'
                                }`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={isCraft ? handleCraftClick : undefined}
                            whileHover={isCraft ? { scale: 1.02, boxShadow: "0 0 40px rgba(212,175,55,0.15)" } : {}}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-lg ${isCraft ? 'bg-[var(--gold)]/10 text-[var(--gold)]' : 'bg-white/5 text-[var(--text-muted)]'}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold tracking-wider uppercase ${isCraft ? 'text-[var(--gold)]' : 'text-white'}`}>
                                        {config.title}
                                    </h3>
                                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] font-medium">{config.subtitle}</p>
                                </div>
                            </div>

                            {/* Items */}
                            <ul className="space-y-2">
                                {items.length > 0 ? (
                                    items.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            className="text-sm text-[var(--text-secondary)] flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.05 }}
                                        >
                                            <span className={isCraft ? 'text-[var(--gold)]' : 'text-[var(--text-muted)]'}>•</span>
                                            {item}
                                        </motion.li>
                                    ))
                                ) : (
                                    <li className="text-sm text-[var(--text-muted)] italic py-6 text-center border border-dashed border-white/10 rounded-lg">
                                        Territorio Inesplorato
                                    </li>
                                )}
                            </ul>

                            {/* Craft Pulse for Highlight */}
                            {isCraft && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/5 blur-3xl rounded-full -mr-16 -mt-16 animate-pulse" />
                            )}

                            {/* Craft CTA */}
                            {isCraft && items.length > 0 && (
                                <motion.div
                                    className="mt-8 pt-6 border-t border-[var(--gold)]/20 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center justify-center gap-3 text-[var(--gold)] font-bold">
                                            <div className="loader w-5 h-5 border-2 border-[var(--gold)]/20 border-t-[var(--gold)]" />
                                            <span className="text-sm tracking-widest">CRISTALLIZZAZIONE...</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Seleziona il tuo CRAFT</span>
                                            <span className="text-sm text-[var(--gold)] tracking-[0.2em] font-bold uppercase hover:text-[var(--gold-light)] transition-colors inline-flex items-center justify-center gap-2">
                                                Avvia Alchimia <Zap size={14} />
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
