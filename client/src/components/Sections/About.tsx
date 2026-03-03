import React from 'react';
import { motion } from 'framer-motion';

const bentoItems = [
    {
        title: "Based in India.",
        content: "Working remotely with teams worldwide from the heart of tech hubs.",
        size: "col-span-1 row-span-1",
        color: "from-aurora-5 to-aurora-6",
        delay: 0.1,
    },
    {
        title: "Full-Stack Engineer.",
        content: "Obsessed with building clean, scalable, and high-performance digital products.",
        size: "col-span-2 row-span-1",
        color: "from-aurora-1 to-aurora-2",
        delay: 0.2,
    },
    {
        title: "3D & Interactive.",
        content: "Pushing the boundaries of the web with Three.js and GSAP simulations.",
        size: "col-span-2 row-span-1",
        color: "from-aurora-4 to-aurora-5",
        delay: 0.3,
    },
    {
        title: "Philosophy.",
        content: "Code is poetry. Design is clarity. Ship it to perfection.",
        size: "col-span-1 row-span-1",
        color: "from-aurora-6 to-aurora-7",
        delay: 0.4,
    }
];

const About = () => {
    return (
        <section id="about" className="relative py-40 px-6 overflow-hidden bg-[#0D0D0D]">
            {/* Aurora Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aurora-5/5 blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <span className="text-aurora-5 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Manifesto</span>
                    <h2 className="text-6xl md:text-8xl font-clash font-bold text-white leading-tight">
                        <span className="gradient-text">Building scalable systems</span><br />
                        with intent.
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-12 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 md:p-12 space-y-8"
                    >
                        <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-inter">
                            I'm a full stack vibe coder as well as an engineering student building at the intersection of robotics, product systems, and digital experiences.
                        </p>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed font-inter">
                            I don't treat projects as assignments. I treat them as prototypes for larger ventures.
                        </p>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed font-inter">
                            From designing high-speed RC platforms to structuring multi-phase robotics roadmaps and building premium production websites for local brands, I focus on one thing: building scalable systems with intent.
                        </p>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed font-inter">
                            I believe in disciplined execution, structured iteration, and shipping before perfection. Every project is a testbed. Every failure is logged. Every build compounds.
                        </p>

                        <div className="pt-8 border-t border-white/5">
                            <h4 className="text-aurora-5 uppercase tracking-[0.2em] text-sm font-bold mb-6">Currently building toward:</h4>
                            <ul className="space-y-4 text-white/70 text-lg font-inter">
                                <li className="flex items-start gap-3">
                                    <span className="text-aurora-5">→</span>
                                    <span>Advanced robotics systems</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-aurora-5">→</span>
                                    <span>Performance-focused hardware platforms</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-aurora-5">→</span>
                                    <span>Scalable digital products for local businesses</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-aurora-5">→</span>
                                    <span>Structured engineering teams with clear execution pipelines</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <p className="text-white/40 text-lg font-hand italic">
                                "Long term goal: build products that move fast, look premium, and operate intelligently. This is early-stage foundation work."
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Tech Marquee */}
                <div className="mt-40 overflow-hidden relative py-10">
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10" />
                    <div className="marquee-track flex gap-20 whitespace-nowrap">
                        {["REACT", "NEXT.JS", "TYPESCRIPT", "THREE.JS", "NODE.JS", "SUPABASE", "GSAP", "TAILWIND", "RUST", "PYTHON"].map((tech, i) => (
                            <span key={i} className="text-white/10 font-clash font-black text-6xl tracking-tighter hover:text-white/30 transition-colors cursor-default">
                                {tech}
                            </span>
                        ))}
                        {/* Duplicate for seamlessness */}
                        {["REACT", "NEXT.JS", "TYPESCRIPT", "THREE.JS", "NODE.JS", "SUPABASE", "GSAP", "TAILWIND", "RUST", "PYTHON"].map((tech, i) => (
                            <span key={`dup-${i}`} className="text-white/10 font-clash font-black text-6xl tracking-tighter hover:text-white/30 transition-colors cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
