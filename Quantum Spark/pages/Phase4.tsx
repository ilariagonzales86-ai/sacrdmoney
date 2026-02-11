import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Phase4: React.FC = () => {
    const navigate = useNavigate();
    
    // State to track validated gates
    const [gates, setGates] = useState([false, false, false]);

    const toggleGate = (index: number) => {
        const newGates = [...gates];
        newGates[index] = !newGates[index];
        setGates(newGates);
    };

    const allValidated = gates.every(g => g);

    const gateData = [
        {
            title: "Risonanza Unica",
            desc: "Valuta l'allineamento della frequenza del tuo asset rispetto alla base collettiva.",
            icon: "graphic_eq",
            status: "IN ATTESA"
        },
        {
            title: "Craft Scalabile",
            desc: "Verifica l'integrità strutturale per un'espansione infinita. L'architettura deve reggere.",
            icon: "architecture",
            status: "IN ATTESA DI INPUT",
            center: true
        },
        {
            title: "Autorità Sovrana",
            desc: "Conferma la firma di proprietà. Stabilisci il dominio sull'asset.",
            icon: "verified_user",
            status: "IN ATTESA"
        }
    ];

    const handleNext = () => {
        navigate('/processing');
    };

    return (
        <div className="w-full flex-grow flex flex-col items-center p-6 pt-10 relative">
            
            {/* Corner Decorative Elements */}
            <div className="fixed top-24 left-6 w-12 h-12 border-t-2 border-l-2 border-purple-500/50 rounded-tl-xl pointer-events-none"></div>
            <div className="fixed top-24 right-6 w-12 h-12 border-t-2 border-r-2 border-purple-500/50 rounded-tr-xl pointer-events-none"></div>
            <div className="fixed bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-purple-500/50 rounded-bl-xl pointer-events-none"></div>
            <div className="fixed bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-purple-500/50 rounded-br-xl pointer-events-none"></div>

            <div className="max-w-5xl w-full z-10 flex flex-col items-center gap-12 mb-24">
                
                <div className="text-center space-y-2 mt-8">
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-200 drop-shadow-xl uppercase tracking-tight">
                        Fase 4: I Cancelli di <span className="text-white">Validazione</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto font-light">
                        Sottoponi il tuo Asset Sovrano alla prova. Solo il resiliente entra nel mercato.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-end">
                    {gateData.map((gate, idx) => (
                        <div 
                            key={idx} 
                            className={`
                                glass-panel rounded-t-full rounded-b-lg p-6 pt-12 relative overflow-hidden transition-all duration-500 border-t-2
                                flex flex-col items-center text-center
                                ${gate.center ? 'md:-mt-12 md:pb-12 h-[420px] border-purple-400 bg-purple-900/10 z-10' : 'h-[380px] border-purple-500/20 bg-black/20'}
                                ${gates[idx] ? 'shadow-[0_0_30px_rgba(139,92,246,0.3)] border-purple-400' : ''}
                            `}
                        >
                            {/* Glowing outline effect for center */}
                            {gate.center && <div className="absolute inset-0 border border-purple-500/30 rounded-t-full rounded-b-lg animate-pulse-slow"></div>}

                            <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl
                                ${gates[idx] ? 'bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)]' : 'bg-white/5 text-purple-300'}
                            `}>
                                <span className="material-icons">{gates[idx] ? 'check' : gate.icon}</span>
                            </div>

                            <h3 className="font-display font-bold text-white text-lg mb-3 tracking-wide uppercase">{gate.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed mb-auto px-2">
                                {gate.desc}
                            </p>

                            <div className="w-full mt-6">
                                <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-widest mb-2 px-1">
                                    <span>Status</span>
                                    <span className={gates[idx] ? 'text-green-400' : 'text-purple-400'}>{gates[idx] ? 'VALIDATO' : gate.status}</span>
                                </div>
                                <button
                                    onClick={() => toggleGate(idx)}
                                    className={`
                                        w-full py-3 rounded border text-xs font-bold tracking-widest uppercase transition-all
                                        ${gates[idx] 
                                            ? 'bg-green-900/20 border-green-500/50 text-green-400 hover:bg-green-900/30' 
                                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50'}
                                    `}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="material-icons text-sm">{gates[idx] ? 'lock' : 'play_circle'}</span>
                                        {gates[idx] ? 'Valida' : 'Valida'} 
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`transition-all duration-700 w-full max-w-md ${allValidated ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale'}`}>
                     <Button 
                        onClick={handleNext} 
                        disabled={!allValidated}
                        icon="diamond"
                        className="h-16 text-lg shadow-[0_0_40px_rgba(139,92,246,0.4)]"
                    >
                        Calcola Risultato
                    </Button>
                    <p className="text-center mt-4 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                        Completa tutte le validazioni per procedere
                    </p>
                </div>

            </div>
            
            {/* Footer Stats */}
             <div className="absolute bottom-4 left-0 w-full flex justify-between px-10 text-[9px] text-gray-500 font-mono">
                <span className="flex items-center gap-2"><span className="material-icons text-[10px]">lock</span> ENCRYPTED: AES-256</span>
                <span className="flex items-center gap-2"><span className="material-icons text-[10px]">dns</span> NODE: OBSIDIAN-ALPHA</span>
                <span className="flex items-center gap-2"><span className="material-icons text-[10px]">timer</span> LATENCY: 12MS</span>
            </div>
        </div>
    );
};

export default Phase4;