import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isHome) return null;

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[100] px-6 py-8 transition-all duration-500 ${scrolled ? 'py-4 backdrop-blur-3xl bg-black/40 border-b border-white/5' : ''}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-1 via-aurora-6 to-aurora-5 flex items-center justify-center p-[2px] shadow-lg shadow-aurora-6/20 transition-transform group-hover:scale-110">
                            <div className="w-full h-full bg-[#0D0D0D] rounded-[9px] flex items-center justify-center font-clash font-extrabold text-[#fff]">
                                J.
                            </div>
                        </div>
                        <span className="font-clash font-bold text-xl tracking-tighter text-white group-hover:gradient-text transition-all duration-300">
                            H. JEEVAN.
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-4 glass-card bg-black/20 px-4 py-2 border-white/5">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="font-inter text-[10px] tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-6">
                        <Link to="/admin/login" className="hidden lg:block text-[10px] tracking-[0.4em] font-black text-white/20 hover:text-white/60 transition-colors uppercase">
                            Admin
                        </Link>
                        <button
                            className="hidden md:block group relative px-8 py-3 bg-white text-black font-clash font-extrabold text-xs rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-aurora-5 to-aurora-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase">
                                LAUNCH CV
                            </span>
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex flex-col gap-1.5 p-2 bg-white/5 rounded-xl border border-white/10"
                        >
                            <div className={`w-6 h-[2px] bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                            {!isOpen && <div className="w-4 h-[2px] bg-white ml-auto" />}
                            <div className={`w-6 h-[2px] bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[99] bg-[#0D0D0D]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-12"
                    >
                        {navLinks.map((link, i) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-clash font-black text-6xl text-white/20 hover:text-white transition-colors hover:gradient-text"
                            >
                                {link.label}
                            </a>
                        ))}
                        <button className="group relative px-10 py-5 bg-white text-black font-clash font-black text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 mt-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-aurora-5 to-aurora-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300 uppercase tracking-widest">
                                LAUNCH CV
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
