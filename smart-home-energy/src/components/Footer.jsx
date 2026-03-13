import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="container footer-content">
                <div className="footer-section brand">
                    <h3>Energy<span className="highlight">Smart</span></h3>
                    <p>
                        Revolutionizing potential energy consumption with AI-driven insights
                        and real-time monitoring. Live smart, save more.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon"><Github size={20} /></a>
                        <a href="#" className="social-icon"><Linkedin size={20} /></a>
                        <a href="#" className="social-icon"><Twitter size={20} /></a>
                    </div>
                </div>

                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/features">Features</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h4>Contact Us</h4>
                    <ul>
                        <li>
                            <MapPin size={16} className="icon" />
                            <span>123 Innovation Drive, Tech City, ST 54321</span>
                        </li>
                        <li>
                            <Phone size={16} className="icon" />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <Mail size={16} className="icon" />
                            <span>support@energysmart.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} EnergySmart Systems. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
