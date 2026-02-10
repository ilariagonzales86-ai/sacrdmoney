import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';

const Report: React.FC = () => {
    const navigate = useNavigate();
    const {
        quadrants,
        gates,
        marketTitles,
        selectedTitle,
        getOutcome
    } = useAppStore();

    const outcome = getOutcome();
    const isSuccess = outcome?.type === 'success';

    // Se non c'è un titolo selezionato, torna indietro (o usa default)
    const currentTitle = selectedTitle !== null && marketTitles[selectedTitle]
        ? marketTitles[selectedTitle]
        : "ARCHITETTO DELL'ETERE";

    // Calcola i dati per il grafico Radar basati sulla lunghezza degli array nei quadranti
    // Normalizziamo a 150 come valore massimo
    const getDataValue = (arr: string[]) => Math.min((arr?.length || 0) * 30 + 50, 150);

    const data = [
        { subject: 'RITUAL', A: getDataValue(quadrants.ritual), fullMark: 150 },
        { subject: 'SANDBOX', A: getDataValue(quadrants.sandbox), fullMark: 150 },
        { subject: 'CRAFT', A: getDataValue(quadrants.craft), fullMark: 150 },
        { subject: 'MISCHIEF', A: getDataValue(quadrants.mischief), fullMark: 150 },
    ];

    const stats = [
        { label: 'RESONANCE', val: gates.resonance ? '100%' : 'PENDING', highlight: gates.resonance === true },
        { label: 'SCALABILITY', val: gates.scalability ? '100%' : 'PENDING', highlight: gates.scalability === true },
        { label: 'AUTHORITY', val: gates.authority ? '100%' : 'PENDING', highlight: gates.authority === true },
    ];

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-start p-6 pt-8 md:p-12 relative overflow-y-auto">

            <div className="text-center mb-10 z-10">
                <p className="text-[10px] tracking-[0.3em] text-orange-300 uppercase mb-2">Rapporto Finale: La Tua Sovranità</p>
                <h1 className="text-4xl md:text-5xl font-serif italic text-orange-100 drop-shadow-xl">
                    {currentTitle}
                </h1>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-orange-400/50 to-transparent mx-auto mt-6"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full z-10 items-stretch">
                {/* Left Side: Stats */}
                <div className="flex-shrink-0 w-full lg:w-80 flex flex-col gap-4">
                    <div className="glass-panel p-6 rounded-lg border-l-2 border-l-gray-500">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] uppercase tracking-widest text-gray-400">
                                {isSuccess ? 'Asset Cristallizzato' : 'Asset In Attesa'}
                            </span>
                            <span className="material-icons text-gray-600">diamond</span>
                        </div>
                        <p className="text-gray-300 font-serif italic text-lg leading-relaxed mb-6">
                            {isSuccess
                                ? "\"Il Motore conferma l'integrità strutturale dell'opera. La via è libera per l'espansione.\""
                                : "\"Rilevata dissonanza nei parametri vitali. È richiesta la ricalibrazione dell'intento.\""}
                        </p>
                        <div className="flex justify-between text-[10px] text-gray-500 font-mono border-t border-white/5 pt-3">
                            <span>Codice Identità</span>
                            <span className="text-orange-300">ARC-{Math.floor(Math.random() * 1000)}-SNC</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 font-mono pt-1">
                            <span>Frequenza</span>
                            <span className="text-purple-300">963 Hz</span>
                        </div>
                    </div>

                    {stats.map((stat, idx) => (
                        <div key={idx} className="glass-panel p-4 rounded-lg flex items-center justify-between relative overflow-hidden">
                            {stat.highlight && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400 shadow-[0_0_10px_orange]"></div>}
                            {!stat.highlight && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-600"></div>}

                            <div className="flex flex-col">
                                <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{stat.label}</span>
                                <span className="text-2xl font-light text-white font-display">{stat.val}</span>
                            </div>
                            {stat.highlight && <span className="material-icons text-orange-400/50">verified</span>}
                        </div>
                    ))}
                </div>

                {/* Right Side: Chart */}
                <div className="flex-grow glass-panel rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center relative min-h-[400px]">
                    {/* Chart Background Grid Decoration */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="w-full h-[350px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, letterSpacing: '2px' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                    name="Profile"
                                    dataKey="A"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    fill="#8b5cf6"
                                    fillOpacity={0.3}
                                />
                            </RadarChart>
                        </ResponsiveContainer>

                        {/* Manual overlay icons for chart nodes to match design exactly (simplified for code) */}
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <span className="material-icons text-yellow-200 text-sm mb-1">auto_fix_high</span>
                        </div>
                        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <span className="material-icons text-yellow-600 text-sm mt-1">handyman</span>
                        </div>
                    </div>

                    <p className="text-center text-gray-500 text-xs mt-4 max-w-md mx-auto">
                        Il tuo profilo bilancia l'ordine rituale con l'innovazione della Sandbox, creando una fondazione solida per la sovranità finanziaria.
                    </p>
                </div>
            </div>

            <div className="mt-12 mb-8 relative group">
                {isSuccess && <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-orange-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>}
                <button
                    onClick={() => isSuccess ? navigate('/certificate') : navigate('/phase4')}
                    className="relative w-64 md:w-80 px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center space-x-4 border border-white/10"
                >
                    <span className="material-icons text-gray-400 group-hover:text-white transition-colors">
                        {isSuccess ? 'history_edu' : 'build'}
                    </span>
                    <span className="text-gray-200 group-hover:text-white transition-colors uppercase tracking-widest font-bold text-sm">
                        {isSuccess ? 'Scarica il Decreto' : 'Ricalibra Parametri'}
                    </span>
                </button>
            </div>

            <div
                onClick={() => navigate('/')}
                className="text-[10px] text-gray-600 cursor-pointer hover:text-white transition-colors uppercase tracking-wider mb-8 flex items-center gap-1"
            >
                <span className="material-icons text-[12px]">arrow_back</span> Ritorna all'archivio
            </div>

        </div>
    );
};

export default Report;