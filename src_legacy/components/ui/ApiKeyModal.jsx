import { motion } from 'framer-motion';
import { X, Key } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useState } from 'react';

export default function ApiKeyModal({ onClose }) {
    const { apiKey, setApiKey } = useAppStore();
    const [inputKey, setInputKey] = useState(apiKey);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputKey.trim()) {
            setApiKey(inputKey.trim());
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card p-8 w-full max-w-md relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--cyan)]/20 flex items-center justify-center">
                        <Key className="text-[var(--cyan)]" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Configurazione Gratis</h2>
                        <p className="text-sm text-[var(--text-muted)]">OpenRouter (Free Models)</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">
                            Inserisci la tua API Key OpenRouter
                        </label>
                        <input
                            type="password"
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            placeholder="sk-or-v1-..."
                            className="api-key-input"
                            autoFocus
                        />
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-[var(--text-muted)]">
                                <a href="https://openrouter.ai/keys" target="_blank" rel="noopener" className="text-[var(--cyan)] hover:underline">
                                    Ottieni chiave gratis qui →
                                </a>
                            </p>
                            {apiKey && (
                                <button
                                    type="button"
                                    onClick={() => { useAppStore.getState().clearApiKey(); setInputKey(''); }}
                                    className="text-xs text-red-400 hover:text-red-300 transition-colors underline"
                                >
                                    Resetta Chiave
                                </button>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        {apiKey ? 'Aggiorna Chiave' : 'Attiva Motore Gratis'}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}
