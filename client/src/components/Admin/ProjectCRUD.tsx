import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Pencil, Trash2, ExternalLink } from 'lucide-react';

const initialProjects = [
    { id: 1, title: 'High-Speed RWD RC Platform', category: 'Robotics', status: 'Draft', date: '2025-01-12' },
    { id: 2, title: 'Multi-Phase Line Follower Bot System', category: 'Robotics', status: 'Draft', date: '2025-02-05' },
    { id: 3, title: 'Premium Cafe Digital Platforms', category: 'Web', status: 'Live', date: '2024-03-01' },
];

const ProjectCRUD = () => {
    const [projects, setProjects] = useState(initialProjects);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('');

    const addProject = () => {
        if (!title) return;
        setProjects([...projects, { id: Date.now(), title, category: cat || 'General', status: 'Draft', date: new Date().toISOString().split('T')[0] }]);
        setTitle(''); setCat(''); setShowModal(false);
    };

    const deleteProject = (id: number) => setProjects(projects.filter(p => p.id !== id));

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 pb-24">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-6xl font-bold tracking-tighter text-white mb-2 uppercase">MISSION LOGS</h1>
                    <p className="text-white/30 text-xs tracking-[0.4em] font-black uppercase">MANAGE DEPLOYED ASSETS & OPERATIONS</p>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black tracking-widest text-[10px] rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5 uppercase">
                    <Plus size={16} /> NEW DEPLOYMENT
                </button>
            </div>

            {/* Table Area */}
            <div className="glass-card border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            {['IDENTIFIER', 'CLASSIFICATION', 'DEPLOYMENT DATE', 'STATUS', 'ACTIONS'].map((h, i) => (
                                <th key={i} className="px-8 py-6 text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {projects.map((p) => (
                            <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="text-lg font-bold tracking-tight text-white">{p.title}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">{p.category}</span>
                                </td>
                                <td className="px-8 py-6 font-mono text-xs text-white/20">{p.date}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'Live' ? 'bg-[#07F49E] shadow-[0_0_8px_#07F49E]' : 'bg-white/10'}`} />
                                        <span className={`text-[10px] font-black tracking-widest uppercase ${p.status === 'Live' ? 'text-[#07F49E]' : 'text-white/20'}`}>{p.status}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><Pencil size={18} /></button>
                                        <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/40 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                                        <button className="p-2 hover:bg-aurora-5/10 rounded-lg text-aurora-5/40 hover:text-aurora-5 transition-all"><ExternalLink size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#070707]/80 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card w-full max-w-lg p-12 border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aurora-1 to-aurora-6" />
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-10 flex justify-between items-center uppercase">
                                INITIALIZE MISSION
                                <button onClick={() => setShowModal(false)} className="text-white/20 hover:text-white transition-colors"><X size={24} /></button>
                            </h2>
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-white/20 text-[10px] tracking-widest uppercase ml-2">MISSION IDENTIFIER</label>
                                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Project Name" className="terminal-input" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-white/20 text-[10px] tracking-widest uppercase ml-2">CLASSIFICATION</label>
                                    <input value={cat} onChange={e => setCat(e.target.value)} type="text" placeholder="e.g. INFRASTRUCTURE" className="terminal-input" />
                                </div>
                                <button onClick={addProject} className="w-full py-5 bg-white text-black font-black tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-transform uppercase">DEPLOY PROTOCOL</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectCRUD;
