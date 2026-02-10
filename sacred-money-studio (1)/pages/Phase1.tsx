import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Phase1: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                navigate('/phase2');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-center p-6 md:p-12 relative">
            <div className="max-w-4xl w-full z-10 flex flex-col gap-8">
                
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-xl">
                        Fase 1: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">Discarica Creativa della</span><br />
                        <span className="text-white">Grande Opera</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Svuota la mente. Elenca tutto ciò che fai, conosci o padroneggi. 
                        Fluisci senza filtri.
                    </p>
                </div>

                <div className="glass-panel w-full h-[400px] rounded-xl p-1 relative overflow-hidden group shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                    <div className="absolute top-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 z-20">
                         <div className="w-3 h-3 rounded-full bg-white/20"></div>
                         <div className="w-3 h-3 rounded-full bg-white/20"></div>
                         <div className="w-3 h-3 rounded-full bg-white/20"></div>
                         <div className="ml-auto text-[10px] text-gray-500 uppercase tracking-widest">Modalità Input Grezzo</div>
                    </div>
                    <textarea 
                        className="w-full h-full bg-black/40 text-gray-300 p-6 pt-12 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scrollbar placeholder-gray-600/50"
                        placeholder="Inizia a scrivere qui... lascia che il flusso di coscienza si riversi sul vetro..."
                    ></textarea>
                    
                    {/* Bottom Status Bar */}
                    <div className="absolute bottom-0 w-full h-8 bg-white/5 border-t border-white/5 flex items-center justify-between px-4 z-20 text-[10px] text-gray-500">
                        <span className="flex items-center gap-2"><span className="material-icons text-[12px]">keyboard_return</span> Markdown supportato</span>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Salvataggio auto</span>
                    </div>

                     {/* Glow Effects */}
                    <div className="absolute -left-10 top-1/2 w-20 h-full bg-purple-500/10 blur-xl pointer-events-none"></div>
                    <div className="absolute -right-10 top-1/2 w-20 h-full bg-indigo-500/10 blur-xl pointer-events-none"></div>
                </div>

                <div className="flex justify-center mt-4">
                    <div className="w-full max-w-xs">
                        <Button onClick={() => navigate('/phase2')} icon="auto_fix_high">
                            Cristallizza Analisi
                        </Button>
                        <p className="text-center mt-3 text-[10px] text-gray-600 font-mono tracking-widest">
                            PREMI CTRL + INVIO PER PROCESSARE L'OPERA
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Phase1;