import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import Drone from './Drone';
import HUD from './HUD';

const taglines = [
    "Building at the intersection of robotics and digital systems.",
    "Shipping scalable systems with intent.",
    "Prototyping the future, one build at a time."
];

const Hero = () => {
    const [tagIdx, setTagIdx] = useState(0);
    const mouse = useRef<[number, number]>([0, 0]);
    const [isHovered, setIsHovered] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTagIdx((prev) => (prev + 1) % taglines.length);
        }, 3000);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = [
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1,
            ];
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            clearInterval(interval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0D0D0D]">

            {/* ── Custom Cursor ── */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[1000] mix-blend-difference hidden md:block"
                animate={{
                    x: cursorPos.x - 16,
                    y: cursorPos.y - 16,
                    scale: isHovered ? 2.5 : 1,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
                style={{
                    background: 'linear-gradient(45deg, #FF6B6B, #42C6FF)',
                    backdropFilter: 'blur(4px)',
                }}
            />

            {/* ── Background Aurora Blobs ── */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="aurora-blob w-[600px] h-[600px] bg-aurora-6 top-[-10%] left-[-10%]" />
                <div className="aurora-blob w-[500px] h-[500px] bg-aurora-5 bottom-[-10%] right-[-10%]" />
                <div className="aurora-blob w-[400px] h-[400px] bg-aurora-1 top-[40%] right-[15%]" />
            </div>

            {/* ── 3D Scene ── */}
            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Suspense fallback={null}>
                        <Drone mouse={mouse} />
                        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                        <Environment preset="city" />
                    </Suspense>
                </Canvas>
            </div>

            {/* ── HUD Overlay ── */}
            <HUD />

            {/* ── Content ── */}
            <div className="relative z-20 text-center px-6 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-white/50 text-xs tracking-[0.3em] uppercase">
                        Open to opportunities · Based in Mysore, India
                    </span>
                    <h1 className="font-clash text-7xl md:text-[10rem] font-bold leading-none tracking-tighter text-white mb-6">
                        H. JEEVAN<br />
                        <span className="gradient-text uppercase">Vibe Coder.</span>
                    </h1>
                    <div className="absolute -top-12 -right-12 md:-right-24 opacity-10 pointer-events-none">
                        <span className="font-clash text-9xl font-black text-white tracking-widest">JXVZ01</span>
                    </div>
                </motion.div>

                <div className="h-12 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={taglines[tagIdx]}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: 'circOut' }}
                            className="font-inter text-xl md:text-2xl text-white/40 tracking-tight"
                        >
                            {taglines[tagIdx]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-16 pointer-events-auto"
                >
                    <a
                        href="#projects"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative px-10 py-5 bg-white text-black font-clash font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 inline-block no-underline"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-aurora-2 to-aurora-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            SEE MY WORK
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* ── Scroll Indicator ── */}
            <motion.div
                className="absolute bottom-10 flex flex-col items-center gap-3 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase">Initialize Scroll</span>
                <motion.div
                    className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent"
                    animate={{ scaleY: [0, 1, 0], originY: ["0%", "0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
