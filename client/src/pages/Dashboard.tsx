import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Zap,
    LogOut,
    Settings,
    Bell,
    Search,
    Plus,
    ArrowUpRight,
    TrendingUp,
    Cpu,
    Database,
    Globe
} from 'lucide-react';
import ProjectCRUD from '../components/Admin/ProjectCRUD';
import SkillCRUD from '../components/Admin/SkillCRUD';

const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'OVERVIEW', path: '/admin/dashboard', color: 'from-aurora-5 to-aurora-6' },
    { icon: <FolderKanban size={20} />, label: 'PROJECTS', path: '/admin/projects', color: 'from-aurora-1 to-aurora-2' },
    { icon: <Zap size={20} />, label: 'SKILLS', path: '/admin/skills', color: 'from-aurora-4 to-aurora-5' },
    { icon: <Settings size={20} />, label: 'SETTINGS', path: '/admin/settings', color: 'from-aurora-6 to-aurora-7' },
];

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-[#070707] font-clash text-white overflow-hidden selection:bg-white/10 selection:text-white">
            {/* ── Sidebar ── */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="relative bg-[#0D0D0D] border-r border-white/5 flex flex-col z-[100]"
            >
                <div className="p-8 flex items-center justify-between mb-12">
                    {isSidebarOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-aurora-1 via-aurora-6 to-aurora-5 flex items-center justify-center font-black text-xs">J</div>
                            <span className="font-bold tracking-tighter text-xl">H. JEEVAN.</span>
                        </motion.div>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                        <Search size={18} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative overflow-hidden ${location.pathname === item.path ? 'bg-white/5 text-white shadow-lg' : 'text-white/30 hover:text-white hover:bg-white/[0.02]'
                                }`}
                        >
                            {location.pathname === item.path && (
                                <motion.div layoutId="active" className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5 -z-10`} />
                            )}
                            <span className={`${location.pathname === item.path ? 'text-white' : 'group-hover:text-white transition-colors'}`}>{item.icon}</span>
                            {isSidebarOpen && <span className="font-black tracking-[0.3em] text-[10px] uppercase">{item.label}</span>}
                            {location.pathname === item.path && isSidebarOpen && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all group"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-black tracking-[0.3em] text-[10px] uppercase">TERMINATE SESSION</span>}
                    </button>
                </div>
            </motion.aside>

            {/* ── Main Content ── */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 z-10 bg-[#070707]/80 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-aurora-4 shadow-[0_0_8px_#07F49E]" />
                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/40">NODE-01 / MISSION STATUS: OPERATIONAL</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-white/40 hover:text-white transition-colors">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-aurora-1" />
                        </button>
                        <div className="h-8 w-[1px] bg-white/5" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <div className="text-[10px] font-black tracking-widest text-white leading-none mb-1 uppercase">H. JEEVAN</div>
                                <div className="text-[8px] font-bold tracking-widest text-[#07F49E] uppercase leading-none italic">CODE: JXVZ01</div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-[2px]">
                                <div className="w-full h-full bg-gradient-to-br from-aurora-2 via-aurora-6 to-aurora-5 rounded-[9px]" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="projects" element={<ProjectCRUD />} />
                            <Route path="skills" element={<SkillCRUD />} />
                        </Routes>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

/* ── Dashboard Overview Page ── */
const Overview = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-12"
    >
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-6xl font-bold tracking-tighter text-white mb-2 uppercase">COMMAND CENTER</h1>
                <p className="text-white/30 text-xs tracking-[0.4em] font-black uppercase">GLOBAL SYSTEM ANALYTICS & MONITORING</p>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black tracking-widest text-[10px] rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5">
                <Plus size={16} /> NEW DEPLOYMENT
            </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
                { label: 'PROJECTS', value: '18', sub: '+3 this month', icon: <FolderKanban size={24} />, color: 'text-aurora-5' },
                { label: 'SYSTEM LOAD', value: '42%', sub: 'Optimal', icon: <Cpu size={24} />, color: 'text-aurora-6' },
                { label: 'RESOURCES', value: '55GB', sub: '92% Available', icon: <Database size={24} />, color: 'text-aurora-1' },
                { label: 'GLOBAL REACH', value: '12', sub: 'Nodes Active', icon: <Globe size={24} />, color: 'text-aurora-4' },
            ].map((stat, i) => (
                <div key={i} className="glass-card p-8 border-white/5 group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-10">
                        <span className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>{stat.icon}</span>
                        <TrendingUp size={16} className="text-[#07F49E]" />
                    </div>
                    <div className="text-4xl font-bold tracking-tighter text-white mb-1">{stat.value}</div>
                    <div className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase mb-4">{stat.label}</div>
                    <div className="text-[10px] font-bold text-white/40 italic">{stat.sub}</div>
                </div>
            ))}
        </div>

        {/* Big Interactive Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-card p-10 border-white/5 relative overflow-hidden min-h-[400px]">
                <div className="flex justify-between items-start mb-12 relative z-10">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">NETWORK TRAFFIC</h3>
                        <p className="text-xs text-white/30 tracking-widest uppercase">REAL-TIME PACKET TRACKING</p>
                    </div>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all">
                        <ArrowUpRight size={18} />
                    </button>
                </div>

                {/* Faux Graph */}
                <div className="absolute inset-x-12 bottom-12 top-40 flex items-end gap-[6px]">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${20 + Math.random() * 80}%` }}
                            transition={{ duration: 0.8 + Math.random(), repeat: Infinity, repeatType: 'reverse' }}
                            className={`flex-1 rounded-t-sm bg-gradient-to-t from-transparent to-white/10 group-hover:to-aurora-5/40 transition-all`}
                        />
                    ))}
                </div>
            </div>

            <div className="glass-card bg-gradient-to-br from-aurora-6/10 to-transparent p-10 border-white/5 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-aurora-6">
                        <Settings size={24} />
                    </div>
                    <h3 className="text-4xl font-black tracking-tighter leading-none">SYSTEM<br />HEALTH.</h3>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40 uppercase">
                            <span>CPU STABILITY</span>
                            <span>98.4%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[98%] bg-aurora-6 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40 uppercase">
                            <span>UPTIME</span>
                            <span>1,421H</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-aurora-5 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

export default Dashboard;
