import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Simple breadcrumb logic
    const getPhase = () => {
        switch (location.pathname) {
            case '/phase1': return 'FASE 1 DI 5';
            case '/phase2': return 'FASE 2 DI 5';
            case '/phase3': return 'FASE 3 DI 5';
            case '/phase4': return 'FASE 4 DI 5';
            case '/report': return 'RAPPORTO';
            case '/certificate': return 'COMPLETATO';
            default: return '';
        }
    };

    const getTitle = () => {
        switch (location.pathname) {
            case '/phase1': return 'LA GRANDE OPERA';
            case '/phase2': return 'L\'ORGANIZZAZIONE';
            case '/phase3': return 'CRISTALLIZZAZIONE';
            case '/phase4': return 'VALIDAZIONE';
            case '/report': return 'SOVRANITÀ';
            case '/certificate': return 'CERTIFICATO';
            default: return '';
        }
    };

    return (
        <nav className="relative z-50 w-full px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-sm">
            <Link to="/" className="flex items-center gap-3 no-underline">
                <div className="w-8 h-8 rounded-full border border-purple-500/50 flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    <span className="material-icons text-purple-400 text-sm">all_inclusive</span>
                </div>
                <span className="text-white tracking-[0.2em] text-xs font-semibold uppercase">
                    Sacred <span className="text-gray-400">Money Studio</span>
                </span>
            </Link>

            {location.pathname !== '/' && (
                <div className="hidden md:flex flex-col items-center">
                    <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase mb-1">
                        <span className="text-white font-bold">{getPhase()}</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-400">{getTitle()}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                            style={{
                                width: location.pathname === '/phase1' ? '20%' :
                                    location.pathname === '/phase2' ? '40%' :
                                        location.pathname === '/phase3' ? '60%' :
                                            location.pathname === '/phase4' ? '80%' : '100%'
                            }}
                        ></div>
                    </div>
                </div>
            )}

            <div className="flex gap-4 items-center">
                <div className="hidden sm:flex text-[10px] tracking-wider text-gray-500 gap-4 mr-4">
                    <span onClick={() => navigate('/')} className="hover:text-purple-300 cursor-pointer transition-colors">DASHBOARD</span>
                    <span className="text-white border-b border-purple-500 pb-0.5 cursor-pointer">METODO</span>
                </div>
                <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white">
                    <span className="material-icons text-lg">grid_view</span>
                </button>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-600 border border-white/20 shadow-lg overflow-hidden">
                    <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;