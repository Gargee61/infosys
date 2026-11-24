import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Activity, LayoutDashboard, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isAuthenticated = localStorage.getItem('user');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <Zap className="logo-icon" size={28} />
                    <span className="logo-text">FX<span className="text-secondary">ENERGY</span></span>
                </div>

                <div className="desk-menu">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Command
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Vision
                    </NavLink>
                    
                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                            <NavLink to="/signup" className="btn btn-primary">Join Network</NavLink>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                             <NavLink to="/dashboard" className="nav-link">
                                <LayoutDashboard size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                Dash
                             </NavLink>
                             <button onClick={handleLogout} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <LogOut size={16} />
                                Terminate
                             </button>
                        </div>
                    )}
                </div>

                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" onClick={() => setIsOpen(false)} className="mobile-link">Command Center</NavLink>
                    <NavLink to="/about" onClick={() => setIsOpen(false)} className="mobile-link">The Vision</NavLink>
                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" onClick={() => setIsOpen(false)} className="mobile-link">Login Access</NavLink>
                            <NavLink to="/signup" onClick={() => setIsOpen(false)} className="mobile-link">Join Network</NavLink>
                        </>
                    ) : (
                        <button onClick={() => { handleLogout(); setIsOpen(false); }} className="mobile-link logout">
                            <LogOut size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                            Terminate Session
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
