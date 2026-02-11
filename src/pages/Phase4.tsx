import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { APP_COPY } from '../constants/copy';

const Phase4: React.FC = () => {
    const navigate = useNavigate();
    const { gates, setGate } = useAppStore();

    // Map store gates to array for UI iteration or access directly
    // Order: Resonance, Scalability, Authority
    const gateKeys = ['resonance', 'scalability', 'authority'] as const;

    const toggleGate = (index: number) => {
        const key = gateKeys[index];
        const currentValue = gates[key];
        // Toggle between true and null (or false? Store uses null/true/false)
        // Let's assume toggle means: null/false -> true, true -> false
        setGate(key, !currentValue);
    };

    const isGateActive = (index: number) => {
        return gates[gateKeys[index]] === true;
    };

    const allValidated = gateKeys.every(k => gates[k] === true);

    const gateData = [
        {
            title: APP_COPY.phase4.gates[0].title,
            desc: APP_COPY.phase4.gates[0].desc,
            icon: "graphic_eq",
            status: APP_COPY.phase4.gates[0].status
        },
        {
            title: APP_COPY.phase4.gates[1].title,
            desc: APP_COPY.phase4.gates[1].desc,
            icon: "architecture",
            status: APP_COPY.phase4.gates[1].status,
            center: true
        },
        {
            title: APP_COPY.phase4.gates[2].title,
            desc: APP_COPY.phase4.gates[2].desc,
            icon: "verified_user",
            status: APP_COPY.phase4.gates[2].status
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
                        {APP_COPY.phase4.title.main} <span className="text-white">{APP_COPY.phase4.title.highlight}</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto font-light">
                        {APP_COPY.phase4.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-end">
                    {gateData.map((gate, idx) => {
                        const isActive = isGateActive(idx);
                        return (
                            <div
                                key={idx}
                                className={`
                                    glass-panel rounded-t-full rounded-b-lg p-6 pt-12 relative overflow-hidden transition-all duration-500 border-t-2
                                    flex flex-col items-center text-center
                                    ${gate.center ? 'md:-mt-12 md:pb-12 h-[420px] border-purple-400 bg-purple-900/10 z-10' : 'h-[380px] border-purple-500/20 bg-black/20'}
                                    ${isActive ? 'shadow-[0_0_30px_rgba(139,92,246,0.3)] border-purple-400' : ''}
                                `}
                            >
                                {/* Glowing outline effect for center */}
                                {gate.center && <div className="absolute inset-0 border border-purple-500/30 rounded-t-full rounded-b-lg animate-pulse-slow pointer-events-none"></div>}

                                <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl
                                    ${isActive ? 'bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)]' : 'bg-white/5 text-purple-300'}
                                `}>
                                    <span className="material-icons">{isActive ? 'check' : gate.icon}</span>
                                </div>

                                <h3 className="font-display font-bold text-white text-lg mb-3 tracking-wide uppercase">{gate.title}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed mb-auto px-2">
                                    {gate.desc}
                                </p>

                                <div className="w-full mt-6">
                                    <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-widest mb-2 px-1">
                                        <span>Status</span>
                                        <span className={isActive ? 'text-green-400' : 'text-purple-400'}>{isActive ? APP_COPY.phase4.status.validated : gate.status}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleGate(idx)}
                                        className={`
                                            w-full py-3 rounded border text-xs font-bold tracking-widest uppercase transition-all
                                            ${isActive
                                                ? 'bg-green-900/20 border-green-500/50 text-green-400 hover:bg-green-900/30'
                                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50'}
                                        `}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="material-icons text-sm">{isActive ? 'lock' : 'play_circle'}</span>
                                            {APP_COPY.phase4.button.validate}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={`transition-all duration-700 w-full max-w-md ${allValidated ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale'}`}>
                    <Button
                        onClick={handleNext}
                        disabled={!allValidated}
                        icon="diamond"
                        className="h-16 text-lg shadow-[0_0_40px_rgba(139,92,246,0.4)]"
                    >
                        {APP_COPY.phase4.button.calculate}
                    </Button>
                    <p className="text-center mt-4 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                        {APP_COPY.phase4.shortcut}
                    </p>
                </div>

            </div>

            {/* Footer Stats */}
            <div className="absolute bottom-4 left-0 w-full flex justify-between px-10 text-[9px] text-gray-500 font-mono">
                <span className="flex items-center gap-2"><span className="material-icons text-[10px]">lock</span> {APP_COPY.phase4.footer.encrypted}</span>
                <span className="flex items-center gap-2"><span className="material-icons text-[10px]">dns</span> {APP_COPY.phase4.footer.node}</span>
                <span className="flex items-center gap-2"><span className="material-icons text-[10px]">timer</span> {APP_COPY.phase4.footer.latency}</span>
            </div>
        </div>
    );
};

export default Phase4;