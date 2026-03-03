import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative py-24 px-6 overflow-hidden bg-[#0D0D0D]">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Upper Part */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 mb-4 group cursor-pointer" onClick={scrollToTop}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-1 via-aurora-6 to-aurora-5 flex items-center justify-center p-[2px] transition-transform group-hover:scale-110">
                                <div className="w-full h-full bg-[#0D0D0D] rounded-[9px] flex items-center justify-center font-clash font-extrabold text-white text-xs">
                                    J.
                                </div>
                            </div>
                            <span className="font-clash font-bold text-xl tracking-tighter text-white">H. JEEVAN.</span>
                        </div>
                        <p className="text-white/30 text-xs tracking-[0.2em] font-medium uppercase text-center md:text-left">
                            Early-stage. Full conviction.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {[
                            { icon: <Github size={18} />, href: "#" },
                            { icon: <Twitter size={18} />, href: "#" },
                            { icon: <Linkedin size={18} />, href: "#" },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-white/5 border-white/5"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Lower Part */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
                    <div className="flex items-center gap-6 text-[10px] tracking-[0.3em] font-black text-white/20 uppercase">
                        <span>© 2026 H. JEEVAN | JXVZ01</span>
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-aurora-4/10 text-aurora-4 border border-aurora-4/20 animate-pulse">
                            <div className="w-1 h-1 rounded-full bg-aurora-4" />
                            <span>LIVE</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-bold text-white/20 uppercase">
                        PROUDLY BUILT WITH <Heart size={10} className="text-aurora-1 fill-aurora-1 mx-1" /> ON PLANET EARTH
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group text-[10px] tracking-[0.4em] font-black uppercase"
                    >
                        BACK TO TOP <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
