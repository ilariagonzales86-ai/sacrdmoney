import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        navigate('/phase1');
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md animate-float">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                        Accedi al Tuo <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-gray-400">Potere Sovrano</span>
                    </h2>
                    <p className="text-gray-400 text-sm tracking-wide mt-3 font-light">
                        Sincronizza la tua mente. Domina il flusso.
                    </p>
                </div>

                <div className="glass-panel bg-glass-gradient rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <label htmlFor="email" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 ml-1">Email Astrale</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons text-gray-500 group-focus-within:text-purple-400 transition-colors text-sm">alternate_email</span>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-black/40 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-purple-500/80 sm:text-sm transition-all duration-300 input-glow"
                                    placeholder="nome@esempio.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label htmlFor="password" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 ml-1">Chiave d'Accesso</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons text-gray-500 group-focus-within:text-purple-400 transition-colors text-sm">lock_open</span>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-black/40 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-purple-500/80 sm:text-sm transition-all duration-300 input-glow"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                                    <span className="material-icons text-gray-600 hover:text-gray-400 text-sm">visibility_off</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-white/5" />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-400">Ricordami</label>
                            </div>
                            <div className="text-xs">
                                <a href="#" className="font-medium text-purple-300 hover:text-purple-200 transition-colors">
                                    Password dimenticata?
                                </a>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button type="submit" icon="auto_awesome">Inizia l'Opera</Button>
                            <p className="text-center mt-3 text-[10px] text-gray-500 font-mono">PREMI INVIO PER ACCEDERE</p>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-gray-400 text-sm">
                        Non hai ancora un account?{' '}
                        <a href="#" className="font-medium text-white hover:text-purple-300 transition-colors underline decoration-purple-500/50 underline-offset-4">
                            Crea un Account
                        </a>
                    </p>
                </div>
            </div>

            <div className="absolute bottom-6 left-0 w-full text-center">
                <div className="flex items-center justify-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
                    <span className="w-12 h-[1px] bg-gray-800"></span>
                    <span>Sacred Money Studio © 2024</span>
                    <span className="w-12 h-[1px] bg-gray-800"></span>
                </div>
                <p className="text-[9px] text-gray-700 mt-2 uppercase tracking-wider">Mastery of Sovereign Flow</p>
            </div>
        </div>
    );
};

export default Login;