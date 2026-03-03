import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        id: '01',
        title: 'High-Speed RWD RC Platform',
        category: 'Robotics',
        status: 'IN DEVELOPMENT',
        color: '#FF6B6B',
        stack: ['Robotics', 'Hardware', 'RWD', 'Embedded Systems'],
        year: '2025',
        desc: 'Designed and planned a rear-wheel-drive RC car focused on speed, balance, and modular upgrades. Structured component selection, drivetrain logic, and chassis design concepts.',
        objective: 'Build a tunable performance platform, not just a hobby car.'
    },
    {
        id: '02',
        title: 'Multi-Phase Line Follower Bot System',
        category: 'Robotics',
        status: 'IN DEVELOPMENT',
        color: '#42C6FF',
        stack: ['Robotics', 'Arduino', 'PID', 'Sensor Integration'],
        year: '2025',
        desc: 'Developed a structured 4-phase roadmap progressing from foundational build to advanced optimization. Focused on wiring architecture and sensor calibration strategy.',
        objective: 'Create a competitive-ready, upgrade-friendly bot architecture.'
    },
    {
        id: '03',
        title: 'Premium Cafe Digital Platforms (Mysore)',
        category: 'Web',
        status: 'COMPLETED',
        color: '#FFC93C',
        stack: ['Web', 'UI/UX', 'WordPress', 'Brand Design'],
        year: '2024',
        desc: 'Designed and prototyped production-grade websites for local cafes. Built complete UI systems including color palettes and storytelling layouts.',
        objective: 'Reposition local brands with enterprise-level digital presence.'
    },
    {
        id: '04',
        title: 'Institutional Content Optimization',
        category: 'Web',
        status: 'COMPLETED',
        color: '#A855F7',
        stack: ['Web', 'Content Architecture', 'UX', 'Optimization'],
        year: '2024',
        desc: 'Audited and restructured large-scale website content to remove redundancy while preserving critical information. Improved clarity and hierarchy.',
        objective: 'Convert clutter into structured information systems.'
    },
];

const Projects = () => {
    return (
        <section id="projects" className="relative py-40 px-6 overflow-hidden bg-[#0D0D0D]">
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-aurora-5/5 blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-40 gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-aurora-5 uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
                        >
                            Mission Logs
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-clash font-bold text-white leading-tight"
                        >
                            SELECTED<br />
                            <span className="gradient-text">PROJECTS.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-white/5 font-clash font-bold text-9xl md:text-[12rem] leading-none"
                    >
                        03
                    </motion.div>
                </div>

                {/* ── Featured Project (Full Width) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8"
                >
                    <FeaturedCard project={projects[0]} />
                </motion.div>

                {/* ── Grid Layout for Others ── */}
                <div className="flex flex-col gap-6">
                    {projects.slice(1).map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ProjectListItem project={project} reversed={i % 2 !== 0} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturedCard = ({ project }: { project: typeof projects[0] }) => (
    <div className="glass-card group overflow-hidden border-white/5 p-12 relative flex flex-col md:flex-row gap-16 min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="flex-1 relative z-10 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-10 text-xs font-bold tracking-[0.4em] uppercase">
                <span className="text-white/30">{project.id}</span>
                <span className="text-aurora-5">{project.category}</span>
                <span className="px-3 py-1 rounded-full border border-white/10 text-white/40">{project.status}</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-clash font-bold text-white mb-8 group-hover:gradient-text transition-all duration-500">{project.title}</h3>
            <p className="text-white/40 text-lg leading-relaxed mb-6 max-w-md">{project.desc}</p>
            <p className="text-aurora-5 font-inter text-sm font-bold mb-12 tracking-tight">Objective: {project.objective}</p>
            <div className="flex flex-wrap gap-3">
                {project.stack.map(s => (
                    <span key={s} className="px-4 py-2 bg-white/5 rounded-full text-white/60 text-xs font-bold border border-white/5 group-hover:border-white/10 transition-colors">
                        {s}
                    </span>
                ))}
            </div>
        </div>
        <div className="flex-1 min-h-[300px] glass-card bg-black/40 border-white/5 relative flex items-center justify-center overflow-hidden">
            <div className={`absolute inset-0 opacity-10 blur-3xl`} style={{ background: project.color }} />
            <span className="text-[15rem] font-clash font-black text-white/5 tracking-tighter transition-transform duration-1000 group-hover:scale-110">
                {project.id}
            </span>
            <div className="absolute bottom-10 right-10 flex items-center gap-4 group-hover:gap-6 transition-all duration-500 cursor-pointer">
                <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">Initialize Case Study</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                    →
                </div>
            </div>
        </div>
    </div>
);

const ProjectListItem = ({ project, reversed }: { project: typeof projects[0], reversed: boolean }) => (
    <div className={`glass-card p-12 border-white/5 flex flex-col md:flex-row gap-12 group transition-all duration-500 hover:bg-white/5 ${reversed ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1">
            <div className="flex items-center gap-4 mb-6 text-[10px] font-bold tracking-[0.4em] uppercase">
                <span style={{ color: project.color }}>{project.id} / {project.status}</span>
                <span className="text-white/20">/ {project.category}</span>
            </div>
            <h3 className="text-5xl font-clash font-bold text-white mb-6 transition-colors group-hover:text-white/80">{project.title}</h3>
            <p className="text-white/40 text-lg leading-relaxed mb-4 max-w-xl">{project.desc}</p>
            <p className="text-aurora-5 font-inter text-xs font-bold mb-10 opacity-70">Objective: {project.objective}</p>
            <div className="flex flex-wrap gap-2">
                {project.stack.map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-white/60 text-[10px] uppercase font-bold tracking-widest border border-transparent group-hover:border-white/10">
                        {s}
                    </span>
                ))}
            </div>
        </div>
        <div className={`flex-initial w-full md:w-80 h-64 glass-card bg-black/40 border-white/5 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
            <div className={`absolute inset-0 opacity-10 blur-xl`} style={{ background: project.color }} />
            <span className="text-9xl font-clash font-black text-white/5 group-hover:text-white/10 transition-colors">
                {project.id}
            </span>
        </div>
    </div>
);

export default Projects;
