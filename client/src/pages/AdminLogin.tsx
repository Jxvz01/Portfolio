import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate secure verification delay
        await new Promise(r => setTimeout(r, 1500));

        if (password === 'admin123') { // In real app, verify against server
            localStorage.setItem('admin_token', 'demo_token');
            navigate('/admin/dashboard');
        } else {
            setError('Access Denied: Invalid Security Credential.');
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#070707] flex flex-col items-center justify-center p-6 font-clash">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-aurora-6/5 blur-[200px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-aurora-1/5 blur-[150px] -z-10" />

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-aurora-2 to-aurora-6" />

                    <div className="flex justify-center mb-10">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Shield className="text-white/60" size={36} />
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white tracking-tighter mb-4">SYSTEM ACCESS</h1>
                        <p className="text-white/30 text-xs tracking-[0.3em] font-black uppercase">Level 4 Clearance Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-white/20 text-[10px] tracking-[0.4em] font-black uppercase ml-4">
                                SECURITY CREDENTIAL
                            </label>
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-aurora-5 transition-colors">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    placeholder="ENTER_PASSCODE"
                                    className="terminal-input pl-16 tracking-[0.5em] group-focus-within:border-aurora-5/30"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <span className="text-red-500 font-mono text-[10px] tracking-widest uppercase">{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-5 rounded-2xl font-black tracking-[0.5em] transition-all flex items-center justify-center gap-4 ${isLoading
                                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                    : 'bg-white text-black hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/5'
                                }`}
                        >
                            {isLoading ? 'ENCRYPTING...' : 'INITIATE LOGIN'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-white/10 text-[9px] tracking-[0.5em] uppercase">
                            Emergency? <span className="text-white/30 hover:text-white cursor-pointer transition-colors">Contact Protocol</span>
                        </p>
                    </div>
                </motion.div>

                <p className="text-white/10 text-[10px] tracking-[0.5em] uppercase mt-12 text-center opacity-50 font-black">
                    Unauthorized access will be logged. IP: 182.1.09.X
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
