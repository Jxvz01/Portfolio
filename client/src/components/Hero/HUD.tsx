import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HUD = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [conn, setConn] = useState(98);

    useEffect(() => {
        const iv = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setConn(Math.round(96 + Math.random() * 4));
        }, 2000);
        return () => clearInterval(iv);
    }, []);

    return (
        <div style={{
            position: 'fixed', inset: 0, pointerEvents: 'none',
            zIndex: 10, fontFamily: 'Inter, monospace', fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
        }}>
            {/* Top-left */}
            <div style={{ position: 'absolute', top: 40, left: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#07F49E', boxShadow: '0 0 8px #07F49E', display: 'inline-block' }} className="animate-pulse" />
                <span style={{ letterSpacing: '0.35em', textTransform: 'uppercase' }}>DRONE LINK: ACTIVE</span>
            </div>

            {/* Top-right */}
            <div style={{ position: 'absolute', top: 40, right: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ letterSpacing: '0.35em', textTransform: 'uppercase' }}>NODE: 0x82A1C</span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#42C6FF', boxShadow: '0 0 8px #42C6FF', display: 'inline-block' }} />
            </div>

            {/* Bottom-left: timestamp */}
            <div style={{ position: 'absolute', bottom: 32, left: 32 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginBottom: 4 }}>LOCAL TIME</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{time}</div>
            </div>

            {/* Bottom-right: connection bars */}
            <div style={{ position: 'absolute', bottom: 32, right: 32, display: 'flex', gap: 3, alignItems: 'flex-end', height: 28 }}>
                {[4, 6, 8, 10, 8, 6, 9, 7].map((h, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: [h * 2, h * 3, h * 2] }}
                        transition={{ duration: 1.5 + i * 0.1, repeat: Infinity, delay: i * 0.09 }}
                        style={{
                            width: 3, borderRadius: 2,
                            background: i < 3 ? '#FF6B6B' : i < 6 ? '#A855F7' : '#42C6FF',
                            opacity: 0.5,
                            minHeight: 4,
                        }}
                    />
                ))}
            </div>

            {/* Left: vertical connection strength */}
            <div style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', marginBottom: 12 }}>
                    SIGNAL
                </div>
                <div style={{ width: 2, height: 80, background: 'rgba(255,255,255,0.05)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                        animate={{ height: [`${conn}%`, `${conn - 3}%`, `${conn}%`] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '100%', position: 'absolute', bottom: 0, borderRadius: 2, background: '#42C6FF', boxShadow: '0 0 8px #42C6FF' }}
                    />
                </div>
            </div>

            {/* Right: efficiency bar */}
            <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ writingMode: 'vertical-rl', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', marginBottom: 12 }}>
                    LOAD
                </div>
                <div style={{ width: 2, height: 80, background: 'rgba(255,255,255,0.05)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                        animate={{ height: ['60%', '75%', '55%', '70%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ width: '100%', position: 'absolute', bottom: 0, borderRadius: 2, background: '#A855F7', boxShadow: '0 0 8px #A855F7' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HUD;
