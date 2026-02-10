import { motion } from 'framer-motion';
import { Brain, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { analyzeQuadrants } from '../../services/supabase';

export default function Phase1BrainDump() {
    const {
        brainDumpInput,
        setBrainDumpInput,
        setPhase,
        setQuadrants,
        isProcessing,
        setIsProcessing
    } = useAppStore();

    const handleAnalyze = async () => {
        if (!brainDumpInput.trim()) return;

        setIsProcessing(true);
        try {
            const result = await analyzeQuadrants(brainDumpInput);
            setQuadrants(result);
            setPhase(2);
        } catch (error) {
            console.error('Errore analisi detalata:', error);
            alert(`Errore Motore: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-[var(--violet)]/10 border border-[var(--violet)]/20 backdrop-blur-md">
                    <span className="text-[10px] tracking-[0.3em] text-[var(--violet)] uppercase font-bold">Fase 1 di 5</span>
                </div>
                <h2 className="text-5xl font-bold mb-4 tracking-tighter text-white">
                    Discarica Creativa della <span className="text-[var(--violet)] text-glow">Grande Opera</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed font-light">
                    Svuota la mente. Elenca tutto ciò che fai, conosci o padroneggi.
                    <span className="block mt-1 text-[var(--text-muted)]">Fluisci senza filtri.</span>
                </p>
            </motion.div>

            {/* Glass Window Input */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[var(--midnight-glass)] backdrop-blur-xl"
            >
                {/* Window Chrome */}
                <div className="h-10 bg-black/40 border-b border-white/5 flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="text-[10px] items-center gap-2 uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono hidden sm:flex">
                        Modalità Input Grezzo
                    </span>
                    <div className="w-16" /> {/* Spacer for balance */}
                </div>

                {/* Textarea */}
                <div className="relative">
                    <textarea
                        className="w-full min-h-[400px] p-8 text-lg leading-relaxed bg-transparent border-none focus:ring-0 text-[var(--silver-ethereal)] placeholder:text-[var(--text-muted)]/50 resize-y font-light selection:bg-[var(--violet)]/30"
                        placeholder="Inizia a scrivere qui... lascia che il flusso di coscienza si riversi sul vetro..."
                        value={brainDumpInput}
                        onChange={(e) => setBrainDumpInput(e.target.value)}
                        disabled={isProcessing}
                        spellCheck="false"
                    />

                    {/* Status Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/20 border-t border-white/5 flex items-center px-6 justify-between text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <Zap size={10} />
                            <span>Markdown supportato</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span>Salvataggio auto</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Action Area */}
            <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="p-[1px] rounded-lg bg-gradient-to-r from-transparent via-[var(--violet)] to-transparent">
                    <button
                        onClick={handleAnalyze}
                        disabled={!brainDumpInput.trim() || isProcessing}
                        className="bg-[var(--violet)]/20 hover:bg-[var(--violet)]/30 text-white py-4 px-16 rounded-lg text-sm tracking-[0.2em] transition-all duration-500 uppercase font-bold backdrop-blur-md border border-[var(--violet)]/50 hover:shadow-[0_0_40px_var(--violet-glow)] relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {isProcessing ? (
                                <>
                                    <div className="loader w-4 h-4 border-white/20 border-top-white" />
                                    <span>Elaborazione...</span>
                                </>
                            ) : (
                                <>
                                    <Zap size={16} />
                                    <span>Cristallizza Analisi</span>
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--violet)] to-[var(--violet-deep)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                </div>

                <div className="absolute bottom-[-40px] left-0 right-0 text-center">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.3em] opacity-50">
                        Premi Ctrl + Invio per processare l'opera
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
