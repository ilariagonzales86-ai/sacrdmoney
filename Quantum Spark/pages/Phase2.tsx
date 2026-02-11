import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Phase2: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                navigate('/phase3');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    const quadrants = [
        {
            id: 'nw',
            title: 'RITUALE',
            position: 'QUADRANTE NORD-OVEST',
            icon: 'temple_buddhist',
            desc: 'Le abitudini quotidiane che ancorano la tua presenza. Cosa ti tiene centrato prima di iniziare?',
            meta: '3 elementi definiti',
            metaIcon: 'playlist_add_check'
        },
        {
            id: 'ne',
            title: 'SANDBOX',
            position: 'QUADRANTE NORD-EST',
            icon: 'explore',
            desc: 'Lo spazio della sperimentazione pura e del gioco creativo. Dove esplori senza il peso del risultato?',
            meta: 'Aggiungi nuova esplorazione',
            metaIcon: 'add_circle_outline'
        },
        {
            id: 'sw',
            title: 'MISCHIEF',
            position: 'QUADRANTE SUD-OVEST',
            icon: 'auto_awesome',
            desc: 'L\'audacia creativa e la rottura degli schemi. Quale "caos sacro" vuoi portare nel mondo oggi?',
            meta: 'Pronto per l\'attivazione',
            metaIcon: 'bolt'
        },
        {
            id: 'se',
            title: 'CRAFT',
            position: 'QUADRANTE SUB-EST • FOCUS ATTIVO',
            icon: 'diamond',
            desc: 'L\'esecuzione magistrale della tua Opera. Il lavoro profondo che richiede la tua totale padronanza.',
            meta: 'Richiede attenzione focalizzata',
            metaIcon: 'priority_high',
            active: true
        }
    ];

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-start p-6 pt-10 md:p-12 relative">
            <div className="max-w-6xl w-full z-10 flex flex-col gap-10">
                
                <div className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-xl">
                        Fase 2: Strutturazione <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">dell'Opera</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Mappa la tua visione nei quattro quadranti fondamentali. <br/>
                        Incarna l'intento e dai forma al tuo flusso di sovranità.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {quadrants.map((q) => (
                        <div key={q.id} className={`glass-panel rounded-xl p-8 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] ${q.active ? 'border-purple-500/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]' : ''}`}>
                            {q.active && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent pointer-events-none"></div>
                            )}
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">{q.position}</span>
                                <span className={`material-icons text-xl ${q.active ? 'text-purple-300' : 'text-gray-600'}`}>{q.icon}</span>
                            </div>
                            
                            <h3 className="text-2xl font-display font-semibold text-white mb-4 tracking-wide">{q.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light min-h-[40px]">
                                {q.desc}
                            </p>

                            <div className="pt-4 border-t border-white/5 flex items-center text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                                <span className="material-icons text-sm mr-2">{q.metaIcon}</span>
                                {q.meta}
                            </div>

                            {/* Hover effect light sweep */}
                            <div className="absolute -left-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease-in-out]"></div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 pb-10">
                    <div className="w-full max-w-md">
                        <Button onClick={() => navigate('/phase3')} icon="filter_vintage" className="rounded-full py-4">
                            Continua Verso La Cristallizzazione
                        </Button>
                         <p className="text-center mt-4 text-[10px] text-gray-600 font-mono tracking-widest">
                            PREMI CTRL + INVIO PER PROCEDERE
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Phase2;