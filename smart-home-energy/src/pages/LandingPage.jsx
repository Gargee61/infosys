import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Smartphone, ShieldCheck, Cog, Globe, Cpu, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { GLSLHills } from '../components/ui/glsl-hills';
import './LandingPage.css';

// Hero Assets
import heroLaptop from '../assets/hero_laptop.png';
import heroInteract from '../assets/hero_interact.png';

// 3D Category Assets
import iconAnalyticsFinal from '../assets/icon_analytics_final_3d.png';
import iconOptimizationFinal from '../assets/icon_optimization_final_3d.png';
import iconRemoteFinal from '../assets/icon_remote_final_3d.png';
import iconSecurityFinal from '../assets/icon_security_final_3d.png';
import iconPredictiveFinal from '../assets/icon_predictive_final_3d.png';
import iconSolarFinal from '../assets/icon_solar_final_3d.png';
import iconMultiZoneFinal from '../assets/icon_multizone_final_3d.png';
import iconVoiceFinal from '../assets/icon_voice_final_3d.png';

const LandingPage = () => {
    const navigate = useNavigate();



    return (
        <div className="landing-container" style={{ position: 'relative' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <GLSLHills speed={0.3} />
            </div>
            {/* Background Decorative Elements */}
            <div className="bg-glow bg-glow-1" style={{ zIndex: 1 }}></div>
            <div className="bg-glow bg-glow-2" style={{ zIndex: 1 }}></div>

            {/* Hero Section */}
            <header className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
                <div className="container hero-container fade-in" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="hero-content">
                        <div className="hero-tag">Smart Home AI v3.0</div>
                        <h1 className="hero-title">
                            Future of <br /><span className="gradient-text">Energy Efficiency</span>
                        </h1>
                        <p className="hero-subtitle">
                            Monitor, optimize, and control your home energy in real-time with our advanced AI-driven management system.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                                Get Started <ArrowRight size={18} />
                            </button>
                            <button className="btn btn-secondary" onClick={() => navigate('/about')}>
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <div className="visual-glow"></div>
                                    <img 
                                        src={heroLaptop} 
                                        alt="Futuristic Energy Management" 
                                        className="hero-img float-animation"
                                    />
                                </div>
                                <div className="flip-card-back">
                                    <div className="visual-glow purple"></div>
                                    <img 
                                        src={heroInteract} 
                                        alt="Interactive Data Insights" 
                                        className="hero-img"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section section-padding">
                <div className="container-fluid">
                    <h2 className="section-title">Core Infinity Features</h2>
                    <div className="features-marquee">
                        <div className="features-track">
                            {[
                                { icon: <img src={iconAnalyticsFinal} className="icon-3d" alt="Analytics" />, title: "Real-time Analytics", desc: "Track results with millisecond precision and 100% data fidelity." },
                                { icon: <img src={iconOptimizationFinal} className="icon-3d" alt="Optimization" />, title: "Smart Optimization", desc: "AI adjusts settings to reduce costs by 40% without losing comfort." },
                                { icon: <img src={iconRemoteFinal} className="icon-3d" alt="Remote" />, title: "Remote Control", desc: "Toggle devices globally via our secure ultra-low latency app." },
                                { icon: <img src={iconSecurityFinal} className="icon-3d" alt="Security" />, title: "Secure Ecosystem", desc: "End-to-end AES-256 bit encryption for absolute home privacy." },
                                { icon: <img src={iconPredictiveFinal} className="icon-3d" alt="Predictive" />, title: "Predictive Maintenance", desc: "AI identifies device failures before they happen with smart alerts." },
                                { icon: <img src={iconSolarFinal} className="icon-3d" alt="Solar" />, title: "Solar Integration", desc: "Seamlessly track and manage renewable energy output and storage." },
                                { icon: <img src={iconMultiZoneFinal} className="icon-3d" alt="Multi-Zone" />, title: "Multi-Zone Control", desc: "Granular room-by-room controls for perfect energy distribution." },
                                { icon: <img src={iconVoiceFinal} className="icon-3d" alt="Voice" />, title: "Voice Control", desc: "Native integration with HomePod, Alexa, and Google Assistant." },
                                // Duplicating for infinite loop
                                { icon: <img src={iconAnalyticsFinal} className="icon-3d" alt="Analytics" />, title: "Real-time Analytics", desc: "Track results with millisecond precision and 100% data fidelity." },
                                { icon: <img src={iconOptimizationFinal} className="icon-3d" alt="Optimization" />, title: "Smart Optimization", desc: "AI adjusts settings to reduce costs by 40% without losing comfort." },
                                { icon: <img src={iconRemoteFinal} className="icon-3d" alt="Remote" />, title: "Remote Control", desc: "Toggle devices globally via our secure ultra-low latency app." },
                                { icon: <img src={iconSecurityFinal} className="icon-3d" alt="Security" />, title: "Secure Ecosystem", desc: "End-to-end AES-256 bit encryption for absolute home privacy." },
                                { icon: <img src={iconPredictiveFinal} className="icon-3d" alt="Predictive" />, title: "Predictive Maintenance", desc: "AI identifies device failures before they happen with smart alerts." },
                                { icon: <img src={iconSolarFinal} className="icon-3d" alt="Solar" />, title: "Solar Integration", desc: "Seamlessly track and manage renewable energy output and storage." },
                                { icon: <img src={iconMultiZoneFinal} className="icon-3d" alt="Multi-Zone" />, title: "Multi-Zone Control", desc: "Granular room-by-room controls for perfect energy distribution." },
                                { icon: <img src={iconVoiceFinal} className="icon-3d" alt="Voice" />, title: "Voice Control", desc: "Native integration with HomePod, Alexa, and Google Assistant." }
                            ].map((f, i) => (
                                <div className="glass-card feature-card-slide" key={i}>
                                    <div className="icon-wrapper-3d">
                                        {f.icon}
                                    </div>
                                    <h3>{f.title}</h3>
                                    <p>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* Testimonials */}
            <section className="testimonials-section section-padding">
                <div className="container">
                    <h2 className="section-title">User Stories</h2>
                    <div className="testimonials-grid">
                        <div className="glass-card testimonial-card fade-in">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">
                                "Reduced my energy bill by 30% in just two months. The UI is incredibly clean and intuitive."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>James Wilson</h4>
                                    <span>California Resident</span>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card testimonial-card fade-in" style={{ animationDelay: '0.3s' }}>
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">
                                "The real-time monitoring is unmatched. I can see exactly what's consuming power at any moment."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>Sarah Chen</h4>
                                    <span>Tech Early Adopter</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
