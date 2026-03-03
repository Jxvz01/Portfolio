import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Pencil, Trash2, Zap } from 'lucide-react';

const initialSkills = [
    { id: 1, name: 'Embedded Systems', category: 'Robotics', level: 95 },
    { id: 2, name: 'Roadmap Design', category: 'Product', level: 92 },
    { id: 3, name: 'UI/UX System Design', category: 'Web', level: 90 },
];

const SkillCRUD = () => {
    const [items, setItems] = useState(initialSkills);
    const [showForm, setShow] = useState(false);
    const [name, setName] = useState('');
    const [cat, setCat] = useState('');
    const [level, setLevel] = useState('');

    const addSkill = () => {
        if (!name) return;
        setItems([...items, { id: Date.now(), name, category: cat || 'General', level: parseInt(level, 10) || 0 }]);
        setName(''); setCat(''); setLevel(''); setShow(false);
    };

    const remove = (id: number) => setItems(items.filter(s => s.id !== id));

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 pb-24">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-6xl font-bold tracking-tighter text-white mb-2 uppercase">ARSENAL CONTROL</h1>
                    <p className="text-white/30 text-xs tracking-[0.4em] font-black uppercase">MANAGE SECURITY & SYSTEM CAPABILITIES</p>
                </div>
                <button onClick={() => setShow(true)} className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black tracking-widest text-[10px] rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5 uppercase">
                    <Plus size={16} /> NEW CAPACITY
                </button>
            </div>

            <div className="glass-card border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            {['IDENTIFIER', 'CLASSIFICATION', 'LOAD CAPACITY', 'ACTIONS'].map((h, i) => (
                                <th key={i} className="px-8 py-6 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.map((s) => (
                            <tr key={s.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6 flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-aurora-5">
                                        <Zap size={14} />
                                    </div>
                                    <div className="text-lg font-bold tracking-tight text-white">{s.name}</div>
                                </td>
                                <td className="px-8 py-6 uppercase font-black tracking-widest text-xs text-white/20">{s.category}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4 max-w-[120px]">
                                        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                                            <div style={{ width: `${s.level}%` }} className="h-full bg-gradient-to-r from-aurora-5 to-aurora-6" />
                                        </div>
                                        <span className="font-mono text-[10px] text-[#07F49E]">{s.level}%</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><Pencil size={18} /></button>
                                    <button onClick={() => remove(s.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/40 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#070707]/80 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card w-full max-w-lg p-12 border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aurora-4 to-aurora-5" />
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-10 flex justify-between items-center uppercase">
                                INITIALIZE CAPACITY
                                <button onClick={() => setShow(false)} className="text-white/20 hover:text-white transition-colors"><X size={24} /></button>
                            </h2>
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-white/20 text-[10px] tracking-widest uppercase ml-2">SKILL IDENTIFIER</label>
                                    <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Skill Name" className="terminal-input" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-white/20 text-[10px] tracking-widest uppercase ml-2">CLASSIFICATION</label>
                                    <input value={cat} onChange={e => setCat(e.target.value)} type="text" placeholder="e.g. FRONTEND" className="terminal-input" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-white/20 text-[10px] tracking-widest uppercase ml-2">LOAD CAPACITY (0-100)</label>
                                    <input value={level} onChange={e => setLevel(e.target.value)} type="number" placeholder="85" className="terminal-input" />
                                </div>
                                <button onClick={addSkill} className="w-full py-5 bg-white text-black font-black tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-transform uppercase">STRENGTHEN ARSENAL</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SkillCRUD;
