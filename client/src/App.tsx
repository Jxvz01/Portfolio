import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/UI/Navbar';

function App() {
    return (
        <Router>
            <div className="relative min-h-screen bg-[#0D0D0D] selection:bg-white/20 selection:text-white">
                <Navbar />
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

                {/* Global Scanlines Overlay */}
                <div className="scanlines" />
            </div>
        </Router>
    );
}

export default App;
