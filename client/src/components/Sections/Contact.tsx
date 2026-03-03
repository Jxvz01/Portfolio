import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSent(false), 5000);
        }, 2000);
    };

    return (
        <section id="contact" className="relative py-40 px-6 overflow-hidden bg-[#0D0D0D]">
            {/* Aurora Background */}
            <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-aurora-6/10 blur-[200px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-aurora-4/10 blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-aurora-5 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Secure Channel</span>
                    <h2 className="text-6xl md:text-9xl font-clash font-bold text-white leading-none">
                        LET'S BUILD<br />
                        <span className="gradient-text tracking-tighter uppercase">Something.</span>
                    </h2>
                    <p className="mt-8 text-white/40 text-lg md:text-xl font-inter max-w-2xl mx-auto">
                        Open to robotics projects, web builds, collaborations, and conversations.
                    </p>
                </motion.div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-20">
                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <div className="space-y-16">
                            {[
                                { label: 'DIRECT LINK', value: 'hello@portfolio.dev', color: 'text-aurora-5' },
                                { label: 'NEURAL HUB', value: 'Mysore, India', color: 'text-aurora-1' },
                                { label: 'SOCIAL MAPPING', value: 'GitHub — Twitter — LinkedIn', color: 'text-aurora-6' }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <span className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold block mb-4 group-hover:text-white/40 transition-colors">
                                        {item.label}
                                    </span>
                                    <span className={`text-2xl md:text-4xl font-clash font-bold text-white hover:gradient-text transition-all duration-300 cursor-default block`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 flex gap-10">
                            <div className="w-16 h-[1px] bg-white/10 mt-3" />
                            <p className="text-white/40 leading-relaxed max-w-xs font-hand italic text-lg">
                                Currently open to select freelance missions and high-impact full-time roles.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-12 backdrop-blur-3xl overflow-hidden relative"
                    >
                        <AnimatePresence mode="wait">
                            {!isSent ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6 relative z-10"
                                >
                                    <div className="space-y-2">
                                        <label className="text-white/30 text-xs font-bold tracking-widest uppercase ml-4">Identifier</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            className="terminal-input"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/30 text-xs font-bold tracking-widest uppercase ml-4">Neural Address</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@email.com"
                                            className="terminal-input"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/30 text-xs font-bold tracking-widest uppercase ml-4">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Project Inquiry"
                                            className="terminal-input"
                                            value={form.subject}
                                            onChange={e => setForm({ ...form, subject: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/30 text-xs font-bold tracking-widest uppercase ml-4">Payload</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Brief describe your mission objective..."
                                            className="terminal-input resize-none"
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full py-6 group relative bg-white text-black font-clash font-bold text-lg rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-aurora-5 to-aurora-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="relative z-10 group-hover:text-white transition-colors duration-300 uppercase tracking-widest">
                                            {isSending ? 'PROTOCOL INITIALIZING...' : 'TRANSMIT MISSION'}
                                        </span>
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-20"
                                >
                                    <div className="w-24 h-24 rounded-full bg-aurora-4/20 flex items-center justify-center mb-8 border border-aurora-4/30">
                                        <span className="text-4xl text-aurora-4">✓</span>
                                    </div>
                                    <h3 className="text-4xl font-clash font-bold text-white mb-4 uppercase tracking-tight">TRANSMISSION RECEIVED</h3>
                                    <p className="text-white/40 max-w-xs leading-relaxed">
                                        Message encrypted and routed successfully. I'll get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
