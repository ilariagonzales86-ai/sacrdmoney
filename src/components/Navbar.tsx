import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { APP_COPY } from '../constants/copy';
const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Simple breadcrumb logic
    const getPhase = () => {
        const { phases } = APP_COPY.navbar;
        switch (location.pathname) {
            case '/':
            case '/phase1': return phases.p1;
            case '/phase2': return phases.p2;
            case '/phase3': return phases.p3;
            case '/phase4': return phases.p4;
            case '/report': return phases.report;
            case '/certificate': return phases.completed;
            default: return '';
        }
    };

    const getTitle = () => {
        const { titles } = APP_COPY.navbar;
        switch (location.pathname) {
            case '/':
            case '/phase1': return titles.p1;
            case '/phase2': return titles.p2;
            case '/phase3': return titles.p3;
            case '/phase4': return titles.p4;
            case '/report': return titles.report;
            case '/certificate': return titles.certificate;
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
                    {APP_COPY.navbar.brand.first} <span className="text-gray-400">{APP_COPY.navbar.brand.second}</span>
                </span>
            </Link>

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
                            width: (location.pathname === '/' || location.pathname === '/phase1') ? '20%' :
                                location.pathname === '/phase2' ? '40%' :
                                    location.pathname === '/phase3' ? '60%' :
                                        location.pathname === '/phase4' ? '80%' : '100%'
                        }}
                    ></div>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <div className="hidden sm:flex text-[10px] tracking-wider text-gray-500 gap-4 mr-4">
                    <span onClick={() => navigate('/')} className="hover:text-purple-300 cursor-pointer transition-colors">{APP_COPY.navbar.menu.dashboard}</span>
                    <span className="text-white border-b border-purple-500 pb-0.5 cursor-pointer">{APP_COPY.navbar.menu.method}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-600 border border-white/20 shadow-lg overflow-hidden">
                    <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;