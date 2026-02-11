import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { APP_COPY } from '../constants/copy';
import { signIn, signUp, validateAccessKey, useAccessKey } from '../services/supabase';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                // 1. Validate Access Key
                const isValid = await validateAccessKey(accessKey);
                if (!isValid) {
                    setError(APP_COPY.login.errors.invalidKey);
                    setLoading(false);
                    return;
                }

                // 2. Perform Sign Up
                const authData = await signUp(email, password);

                // 3. Mark Key as Used if signup was successful
                if (authData?.user) {
                    await useAccessKey(accessKey, authData.user.id);
                }

                alert('Account creato! Ora puoi accedere.');
                setIsSignUp(false);
            } else {
                await signIn(email, password);
                navigate('/phase1');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || APP_COPY.login.errors.generic);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md animate-float">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                        {isSignUp ? APP_COPY.login.signup.title : APP_COPY.login.title.main} <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-gray-400">
                            {isSignUp ? APP_COPY.login.signup.highlight : APP_COPY.login.title.highlight}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm tracking-wide mt-3 font-light">
                        {APP_COPY.login.description}
                    </p>
                </div>

                <div className="glass-panel bg-glass-gradient rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

                    {error && (
                        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <label htmlFor="email" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 ml-1">{APP_COPY.login.labels.email}</label>
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
                                    placeholder={APP_COPY.login.placeholders.email}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label htmlFor="password" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 ml-1">{APP_COPY.login.labels.password}</label>
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {isSignUp && (
                            <div className="relative group">
                                <label htmlFor="accessKey" className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 ml-1">{APP_COPY.login.signup.accessKey}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-gray-500 group-focus-within:text-purple-400 transition-colors text-sm">vpn_key</span>
                                    </div>
                                    <input
                                        id="accessKey"
                                        name="accessKey"
                                        type="text"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-black/40 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-purple-500/80 sm:text-sm transition-all duration-300 input-glow"
                                        placeholder={APP_COPY.login.placeholders.accessKey}
                                        value={accessKey}
                                        onChange={(e) => setAccessKey(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {!isSignUp && (
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-white/5" />
                                    <label htmlFor="remember-me" className="ml-2 block text-gray-400">{APP_COPY.login.labels.remember}</label>
                                </div>
                                <div className="text-xs">
                                    <a href="#" className="font-medium text-purple-300 hover:text-purple-200 transition-colors">
                                        {APP_COPY.login.labels.forgot}
                                    </a>
                                </div>
                            </div>
                        )}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                icon={loading ? "refresh" : "auto_awesome"}
                                className={loading ? "animate-spin-slow" : ""}
                                disabled={loading}
                            >
                                {loading ? "Processamento..." : (isSignUp ? APP_COPY.login.signup.button : APP_COPY.login.button)}
                            </Button>
                            <p className="text-center mt-3 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                {loading ? "Verifica Licenza" : "Premi invio per procedere"}
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-gray-400 text-sm">
                        {isSignUp ? (
                            <button
                                onClick={() => setIsSignUp(false)}
                                className="font-medium text-white hover:text-purple-300 transition-colors underline decoration-purple-500/50 underline-offset-4"
                            >
                                {APP_COPY.login.signup.back}
                            </button>
                        ) : (
                            <>
                                {APP_COPY.login.signup.text}{' '}
                                <button
                                    onClick={() => setIsSignUp(true)}
                                    className="font-medium text-white hover:text-purple-300 transition-colors underline decoration-purple-500/50 underline-offset-4"
                                >
                                    {APP_COPY.login.signup.link}
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>

            <div className="absolute bottom-6 left-0 w-full text-center">
                <div className="flex items-center justify-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
                    <span className="w-12 h-[1px] bg-gray-800"></span>
                    <span>{APP_COPY.login.footer.copyright}</span>
                    <span className="w-12 h-[1px] bg-gray-800"></span>
                </div>
                <p className="text-[9px] text-gray-700 mt-2 uppercase tracking-wider">{APP_COPY.login.footer.tagline}</p>
            </div>
        </div>
    );
};

export default Login;