import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { generateMarketTitles } from '../services/supabase';
import { APP_COPY } from '../constants/copy';

const Phase2: React.FC = () => {
    const navigate = useNavigate();
    const {
        quadrants,
        setMarketTitles,
        isProcessing,
        setIsProcessing
    } = useAppStore();

    const handleNext = async () => {
        if (!quadrants.craft || quadrants.craft.length === 0) {
            alert(APP_COPY.phase2.emptyInfo);
            return;
        }

        setIsProcessing(true);
        try {
            const titles = await generateMarketTitles(quadrants.craft);
            setMarketTitles(titles);
            navigate('/phase3');
        } catch (error) {
            console.error('Errore generazione titoli:', error);
            alert('Errore nella generazione dei titoli.');
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [quadrants, navigate]);

    // Mappa i dati dello store ai quadranti UI
    const quadrantsConfig = [
        {
            id: 'ritual',
            title: APP_COPY.phase2.quadrants.ritual.title,
            position: APP_COPY.phase2.quadrants.ritual.position,
            icon: 'temple_buddhist',
            desc: APP_COPY.phase2.quadrants.ritual.desc,
            items: quadrants.ritual || [],
            metaIcon: 'playlist_add_check'
        },
        {
            id: 'sandbox',
            title: APP_COPY.phase2.quadrants.sandbox.title,
            position: APP_COPY.phase2.quadrants.sandbox.position,
            icon: 'explore',
            desc: APP_COPY.phase2.quadrants.sandbox.desc,
            items: quadrants.sandbox || [],
            metaIcon: 'add_circle_outline'
        },
        {
            id: 'mischief',
            title: APP_COPY.phase2.quadrants.mischief.title,
            position: APP_COPY.phase2.quadrants.mischief.position,
            icon: 'auto_awesome',
            desc: APP_COPY.phase2.quadrants.mischief.desc,
            items: quadrants.mischief || [],
            metaIcon: 'bolt'
        },
        {
            id: 'craft',
            title: APP_COPY.phase2.quadrants.craft.title,
            position: APP_COPY.phase2.quadrants.craft.position,
            icon: 'diamond',
            desc: APP_COPY.phase2.quadrants.craft.desc,
            items: quadrants.craft || [],
            metaIcon: 'priority_high',
            active: true
        }
    ];

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-start p-6 pt-10 md:p-12 relative">
            <div className="max-w-6xl w-full z-10 flex flex-col gap-10">

                <div className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-xl">
                        {APP_COPY.phase2.title.fase} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">{APP_COPY.phase2.title.highlight}</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        {APP_COPY.phase2.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {quadrantsConfig.map((q) => (
                        <div key={q.id} className={`glass-panel rounded-xl p-8 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] ${q.active ? 'border-purple-500/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]' : ''}`}>
                            {q.active && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent pointer-events-none"></div>
                            )}
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">{q.position}</span>
                                <span className={`material-icons text-xl ${q.active ? 'text-purple-300' : 'text-gray-600'}`}>{q.icon}</span>
                            </div>

                            <h3 className="text-2xl font-display font-semibold text-white mb-2 tracking-wide">{q.title}</h3>
                            <p className="text-gray-400 text-xs mb-6 font-light">{q.desc}</p>

                            {/* List of items */}
                            <ul className="space-y-2 mb-4 min-h-[100px]">
                                {q.items.length > 0 ? (
                                    q.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 font-light border-b border-white/5 pb-2 last:border-0">
                                            <span className={`mt-1 w-1.5 h-1.5 rounded-full ${q.active ? 'bg-purple-500' : 'bg-gray-600'}`}></span>
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-600 italic text-sm">{APP_COPY.phase2.emptyInfo}</li>
                                )}
                            </ul>

                            <div className="pt-4 border-t border-white/5 flex items-center text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                                <span className="material-icons text-sm mr-2">{q.metaIcon}</span>
                                {q.items.length} {APP_COPY.phase2.elementsCount}
                            </div>

                            {/* Hover effect light sweep */}
                            <div className="absolute -left-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease-in-out]"></div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 pb-10">
                    <div className="w-full max-w-md">
                        <Button
                            onClick={handleNext}
                            disabled={isProcessing}
                            icon={isProcessing ? "hourglass_empty" : "filter_vintage"}
                            className="rounded-full py-4"
                        >
                            {isProcessing ? APP_COPY.phase2.button.processing : APP_COPY.phase2.button.idle}
                        </Button>
                        <p className="text-center mt-4 text-[10px] text-gray-600 font-mono tracking-widest">
                            {APP_COPY.phase2.shortcut}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Phase2;