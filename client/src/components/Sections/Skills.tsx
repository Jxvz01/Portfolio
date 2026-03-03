import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillGroups = [
    {
        label: 'ENGINEERING & ROBOTICS',
        color: '#07F49E',
        glow: 'rgba(7,244,158,0.35)',
        skills: [
            { name: 'Embedded Systems (Arduino)', level: 95 },
            { name: 'Sensor & Motor Integration', level: 92 },
            { name: 'Line Follower Architecture', level: 90 },
            { name: 'RC Vehicle Dynamics', level: 88 },
            { name: 'Component Planning', level: 94 },
            { name: 'Failure Analysis', level: 91 },
        ],
    },
    {
        label: 'PRODUCT DEVELOPMENT',
        color: '#FF8E53',
        glow: 'rgba(255,142,83,0.35)',
        skills: [
            { name: 'Roadmap & Phase Design', level: 92 },
            { name: 'MVP Planning', level: 90 },
            { name: 'Technical Documentation', level: 94 },
            { name: 'Execution Framework Design', level: 88 },
            { name: 'Performance Architecture', level: 91 },
        ],
    },
    {
        label: 'WEB & DIGITAL SYSTEMS',
        color: '#42C6FF',
        glow: 'rgba(66,198,255,0.35)',
        skills: [
            { name: 'HTML, CSS, JavaScript', level: 96 },
            { name: 'WordPress Production', level: 92 },
            { name: 'UI/UX System Design', level: 90 },
            { name: 'Color Architecture', level: 88 },
            { name: 'Conversion Optimization', level: 85 },
            { name: 'Dynamic Architecture', level: 89 },
        ],
    },
];

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section id="skills" className="relative py-40 px-6 overflow-hidden bg-[#0D0D0D]">
            <div style={{
                position: 'absolute', borderRadius: '50%', filter: 'blur(150px)',
                width: 700, height: 700, background: '#A855F7', opacity: 0.07,
                top: '10%', left: '-15%', animation: 'drift 16s ease-in-out infinite alternate',
            }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-aurora-5 uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
                        >
                            Skills & Arsenal
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-clash font-bold text-white leading-tight"
                        >
                            WHAT I<br />
                            <span className="gradient-text">MASTER.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-white/5 font-clash font-bold text-9xl md:text-[12rem] leading-none"
                    >
                        02
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillGroups.map((group, gi) => (
                        <motion.div
                            key={group.label}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: gi * 0.12 }}
                            className="glass-card p-10 backdrop-blur-3xl border-white/5"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div style={{ background: group.color, boxShadow: `0 0 15px ${group.glow}` }} className="w-3 h-3 rounded-full" />
                                <span className="font-inter text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: group.color }}>
                                    {group.label}
                                </span>
                            </div>

                            <div className="space-y-10">
                                {group.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                        className="relative cursor-default"
                                    >
                                        <div className="flex justify-between mb-3 text-sm font-semibold tracking-tight">
                                            <span className={hoveredSkill === skill.name ? "text-white" : "text-white/60 transition-colors"}>
                                                {skill.name}
                                            </span>
                                            <AnimatePresence>
                                                {hoveredSkill === skill.name && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 10 }}
                                                        style={{ color: group.color }}
                                                        className="font-mono text-xs"
                                                    >
                                                        {skill.level}%
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: gi * 0.1 + 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                style={{
                                                    background: `linear-gradient(90deg, ${group.color}, ${group.color}99)`,
                                                    boxShadow: hoveredSkill === skill.name ? `0 0 10px ${group.glow}` : 'none',
                                                }}
                                                className="h-full rounded-full transition-shadow"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
