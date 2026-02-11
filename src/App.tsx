import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Phase1 from './pages/Phase1';
import Phase2 from './pages/Phase2';
import Phase3 from './pages/Phase3';
import Phase4 from './pages/Phase4';
import Processing from './pages/Processing';
import Report from './pages/Report';
import Certificate from './pages/Certificate';
import Navbar from './components/Navbar';
import { supabase } from './services/supabase';

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
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col">
            <ScrollToTop />
            <Background />
            {!isLogin && <Navbar />}
            <main className="relative z-10 flex-grow flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
                {children}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Controlla la sessione corrente
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Ascolta i cambiamenti di stato
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black">
                <div className="text-white font-mono animate-pulse uppercase tracking-widest">Sincronizzazione...</div>
            </div>
        );
    }

    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={session ? <Phase1 /> : <Navigate to="/login" />} />
                    <Route path="/phase2" element={session ? <Phase2 /> : <Navigate to="/login" />} />
                    <Route path="/phase3" element={session ? <Phase3 /> : <Navigate to="/login" />} />
                    <Route path="/phase4" element={session ? <Phase4 /> : <Navigate to="/login" />} />
                    <Route path="/processing" element={session ? <Processing /> : <Navigate to="/login" />} />
                    <Route path="/report" element={session ? <Report /> : <Navigate to="/login" />} />
                    <Route path="/certificate" element={session ? <Certificate /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;