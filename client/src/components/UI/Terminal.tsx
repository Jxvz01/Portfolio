import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
    lines: string[];
}

const Terminal = ({ lines }: TerminalProps) => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < lines.length) {
                setDisplayedLines(prev => [...prev, lines[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
            }
        }, 300);
        return () => clearInterval(interval);
    }, [lines]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayedLines]);

    return (
        <div ref={scrollRef} className="bg-bg-base/80 font-mono text-[11px] p-6 border border-white/5 h-full overflow-y-auto rounded-3xl glass-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-aurora-6 opacity-10 blur-[40px] rounded-full"></div>

            {displayedLines.map((line, i) => (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i}
                    className="mb-2 flex items-start gap-3"
                >
                    <span className="text-aurora-6 font-bold">{'>'}</span>
                    <span className="text-white/60 leading-relaxed uppercase tracking-widest">{line}</span>
                </motion.div>
            ))}

            <div className="flex items-center gap-3 mt-4">
                <div className="w-1.5 h-3 bg-aurora-6 animate-pulse shadow-[0_0_10px_#A855F7] rounded-[1px]"></div>
                <span className="text-aurora-6/40 text-[9px] animate-pulse">Establishing uplink...</span>
            </div>
        </div>
    );
};

export default Terminal;
