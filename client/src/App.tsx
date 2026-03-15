import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/UI/Navbar';

function AppContent() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className={`relative min-h-screen ${isHome ? '' : 'bg-[#0D0D0D] selection:bg-white/20 selection:text-white'}`}>
            {!isHome && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            {!isHome && <div className="scanlines" />}
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
