import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, User, LogOut, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Hide navbar on login/signup pages? User asked for Navbar link to login.
    // So Navbar should be visible. But maybe simplified on Login/Signup.
    // "Navigation bar at top - Links: Home | About | Sign Up | Login | Logout"

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

    // Check auth status (mock)
    const isAuthenticated = localStorage.getItem('user');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/logout');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${(['/', '/login', '/signup'].includes(location.pathname) && !isAuthenticated) ? 'on-landing' : ''}`}>
            <div className="container nav-content">
                <div className="logo" onClick={() => navigate('/')}>
                    <Sun className="logo-icon" size={28} />
                    <span className="logo-text">Energy<span className="highlight">Smart</span></span>
                </div>

                <div className="desk-menu">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        About
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Contact
                    </NavLink>
                    {location.pathname === '/' && (
                        <a href="#faqs" className="nav-link">
                            FAQs
                        </a>
                    )}
                    <a href="#testimonials" className="nav-link">
                        Testimonials
                    </a>

                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/signup" className="nav-link btn btn-primary nav-btn">Sign Up</NavLink>
                            <NavLink to="/login" className="nav-link btn btn-secondary nav-btn text-blue">Login</NavLink>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="nav-link btn btn-secondary nav-btn logout-btn">
                            Logout
                        </button>
                    )}
                </div>

                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" onClick={() => setIsOpen(false)} className="mobile-link">Home</NavLink>
                    <NavLink to="/about" onClick={() => setIsOpen(false)} className="mobile-link">About</NavLink>
                    <NavLink to="/contact" onClick={() => setIsOpen(false)} className="mobile-link">Contact</NavLink>
                    <a href="#testimonials" onClick={() => setIsOpen(false)} className="mobile-link">Testimonials</a>
                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/signup" onClick={() => setIsOpen(false)} className="mobile-link">Sign Up</NavLink>
                            <NavLink to="/login" onClick={() => setIsOpen(false)} className="mobile-link">Login</NavLink>
                        </>
                    ) : (
                        <button onClick={() => { handleLogout(); setIsOpen(false); }} className="mobile-link logout">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
