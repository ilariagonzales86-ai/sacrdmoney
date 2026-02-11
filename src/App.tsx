import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Phase1 from './pages/Phase1';
import Phase2 from './pages/Phase2';
import Phase3 from './pages/Phase3';
import Phase4 from './pages/Phase4';
import Processing from './pages/Processing';
import Report from './pages/Report';
import Certificate from './pages/Certificate';
import Navbar from './components/Navbar';

const Background = () => (
    <>
        <div className="fixed inset-0 z-0 w-full h-full bg-particles"></div>
        <div className="fixed inset-0 z-0 w-full h-full overlay-gradient"></div>
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </>
);

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const main = document.querySelector('main');
        if (main) {
            main.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col">
            <ScrollToTop />
            <Background />
            <Navbar />
            <main className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
                {children}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Phase1 />} />
                    <Route path="/phase2" element={<Phase2 />} />
                    <Route path="/phase3" element={<Phase3 />} />
                    <Route path="/phase4" element={<Phase4 />} />
                    <Route path="/processing" element={<Processing />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/certificate" element={<Certificate />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;