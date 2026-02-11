import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { APP_COPY } from '../constants/copy';

const Phase3: React.FC = () => {
    const navigate = useNavigate();
    const { marketTitles, setSelectedTitle } = useAppStore();
    const [localSelected, setLocalSelected] = useState<number | null>(null);

    // Se non ci sono titoli, usa dei placeholder (o reindirizza)
    const displayTitles = marketTitles.length > 0 ? marketTitles : APP_COPY.phase3.defaultTitles;

    const handleSelect = (index: number) => {
        setLocalSelected(index);
        setSelectedTitle(index);
    };

    const handleNext = () => {
        if (localSelected !== null) {
            navigate('/phase4');
        }
    };

    // Genera statistiche deterministiche o semi-casuali per dare "sapore" alle card
    const getStats = (index: number) => {
        const { statsLabels } = APP_COPY.phase3;
        if (index === 0) return [{ label: statsLabels.systems, val: 98 }, { label: statsLabels.vision, val: 85 }];
        if (index === 1) return [{ label: statsLabels.speed, val: 95 }, { label: statsLabels.impact, val: 88 }];
        return [{ label: statsLabels.strategy, val: 92 }, { label: statsLabels.risk, val: 45 }];
    };

    const getDesc = (index: number) => {
        return APP_COPY.phase3.defaultDescriptions[index] || APP_COPY.phase3.defaultDescriptions[0];
    };

    const getImg = (index: number) => {
        // Placeholder images
        return `https://picsum.photos/seed/${index + 10}/200/200`;
    };

    const cards = displayTitles.map((title, index) => ({
        id: index,
        title: title,
        desc: getDesc(index),
        img: getImg(index),
        stats: getStats(index)
    }));

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-start p-6 pt-10 md:p-12 relative overflow-y-auto">
            <div className="absolute top-20 text-center space-y-2 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-[10px] text-purple-200 tracking-wider mb-2">
                    <span className="material-icons text-[12px]">auto_awesome</span> {APP_COPY.phase3.badge}
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-xl uppercase">
                    {APP_COPY.phase3.title.main} <br />
                    {APP_COPY.phase3.title.highlight}
                </h1>
                <p className="text-gray-400 text-sm max-w-lg mx-auto font-light">
                    {APP_COPY.phase3.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full mt-48 z-10 pb-20">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleSelect(card.id)}
                        className={`
                            glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-500 cursor-pointer
                            flex flex-col
                            ${localSelected === card.id ? 'scale-105 border-purple-400 shadow-[0_0_40px_rgba(139,92,246,0.3)] bg-purple-900/10 z-20' : 'scale-95 opacity-60 hover:opacity-80 grayscale-[50%] hover:grayscale-0'}
                        `}
                    >
                        {localSelected === card.id && (
                            <div className="absolute top-4 right-4 text-purple-400 animate-pulse">
                                <span className="material-icons">verified</span>
                            </div>
                        )}

                        <div className="flex justify-center mb-6 relative">
                            {localSelected === card.id && <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full"></div>}
                            <img src={card.img} alt={card.title} className="w-24 h-24 rounded-lg object-cover border border-white/20 shadow-lg relative z-10" />
                        </div>

                        <h3 className="text-center font-display font-bold text-white text-lg mb-3 tracking-wide uppercase">{card.title}</h3>
                        <p className="text-center text-gray-400 text-xs leading-relaxed mb-8 flex-grow">
                            {card.desc}
                        </p>

                        <div className="mt-auto space-y-4">
                            {card.stats.map((stat, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase tracking-widest">
                                        <span>{stat.label}</span>
                                        <span>{stat.val}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${localSelected === card.id ? 'bg-gradient-to-r from-purple-500 to-indigo-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]' : 'bg-gray-600'}`}
                                            style={{ width: `${stat.val}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-10 z-30 w-full flex justify-center pointer-events-none">
                <div className="pointer-events-auto w-full max-w-md px-6">
                    <Button
                        onClick={handleNext}
                        icon="settings_suggest"
                        secondary={false}
                        className="shadow-2xl"
                        disabled={localSelected === null}
                    >
                        {APP_COPY.phase3.button}
                        <span className="material-icons ml-2 text-sm">chevron_right</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Phase3;