import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Zap, BarChart, Smartphone, ShieldCheck, Layout, Cog, Clock, Bell, Tablet, MessageCircle, HelpCircle } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container hero-content fade-in">
                    <h1 className="hero-title">
                        Welcome to <span className="text-primary">Smart Home</span> Energy Management System
                    </h1>
                    <p className="hero-subtitle">
                        Monitor. Control. Save Energy. Live Smart.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                            Get Started <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/about')}>
                            Learn More
                        </button>
                        <a href="#faqs" className="btn btn-outline">
                            FAQs
                        </a>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section section-padding">
                <div className="container">
                    <h2 className="section-title text-center">Why Choose Us?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="icon-wrapper">
                                <Activity size={32} />
                            </div>
                            <h3>Real-time Energy Monitoring</h3>
                            <p>Track your energy usage in real-time with precise analytics and insights.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper">
                                <Smartphone size={32} />
                            </div>
                            <h3>Smart Device Control</h3>
                            <p>Control all your smart devices remotely from anywhere using our intuitive app.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper">
                                <Zap size={32} />
                            </div>
                            <h3>AI-based Recommendations</h3>
                            <p>Get personalized AI-driven tips to optimize consumption and reduce waste.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper">
                                <BarChart size={32} />
                            </div>
                            <h3>Monthly Bill Estimation</h3>
                            <p>Predict your monthly bills accurately and avoid surprises at the end of the month.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section id="faqs" className="faq-section section-padding">
                <div className="container">
                    <div className="faq-header text-center fade-in">
                        <span className="faq-badge">Support Center</span>
                        <h2 className="section-title">Common Questions</h2>
                        <p className="section-subtitle">Everything you need to know about our Smart Home Energy Management System</p>
                    </div>

                    <div className="faq-grid-custom">
                        {/* Account & Login */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow account">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3>Account & Login</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>How do I create an account?</summary>
                                    <div className="faq-answer">Click on the "Get Started" or "Sign Up" button. Enter your details and verify your email to begin your smart home journey.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Forgot my password?</summary>
                                    <div className="faq-answer">Go to the login page and click "Forgot Password". We'll send a reset link to your registered email address.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Multiple device access?</summary>
                                    <div className="faq-answer">Yes, you can log into your account on multiple smartphones, tablets, or computers simultaneously.</div>
                                </details>
                            </div>
                        </div>

                        {/* Device Setup */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow setup">
                                    <Layout size={24} />
                                </div>
                                <h3>Device Setup</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>How can I add a new device?</summary>
                                    <div className="faq-answer">In the dashboard, navigate to "Devices" and click "Add New Device". Follow the on-screen instructions for your specific brand.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Supported devices?</summary>
                                    <div className="faq-answer">We support most major smart home brands including Philips Hue, Nest, Ring, Ecobee, and smart plugs from various manufacturers.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Device not connecting?</summary>
                                    <div className="faq-answer">Ensure the device is powered on and within range of your Wi-Fi. Try power-cycling the device and checking for firmware updates.</div>
                                </details>
                            </div>
                        </div>

                        {/* Device Control */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow control">
                                    <Cog size={24} />
                                </div>
                                <h3>Device Control</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>How do I turn devices ON/OFF?</summary>
                                    <div className="faq-answer">Each device in your dashboard has a simple toggle switch for instant manual control.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Control room-wise?</summary>
                                    <div className="faq-answer">Yes, you can group devices into rooms (e.g., Living Room, Bedroom) for easier management and bulk control.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Real-time status?</summary>
                                    <div className="faq-answer">Absolutely. The dashboard reflects the live status and power consumption of every connected device.</div>
                                </details>
                            </div>
                        </div>

                        {/* Automation */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow auto">
                                    <Clock size={24} />
                                </div>
                                <h3>Automation</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>Create a rule?</summary>
                                    <div className="faq-answer">Head to the "Automation" tab and use our 'If-This-Then-That' builder to create rules based on time, triggers, or motion.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Schedule devices?</summary>
                                    <div className="faq-answer">Yes, you can set daily or weekly schedules for any device or group of devices.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Offline functionality?</summary>
                                    <div className="faq-answer">Basic schedules are stored locally on your hub and will continue to work, but remote access and AI updates will be paused.</div>
                                </details>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow security">
                                    <Bell size={24} />
                                </div>
                                <h3>Security & Alerts</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>Enable security alerts?</summary>
                                    <div className="faq-answer">Toggle "Security Modes" in the dashboard to receive push notifications for unusual energy spikes or motion detection.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Away from home alerts?</summary>
                                    <div className="faq-answer">Yes, push notifications are sent directly to your smartphone wherever you have an internet connection.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Data security?</summary>
                                    <div className="faq-answer">We use end-to-end encryption and multi-factor authentication to ensure only you can access your home data.</div>
                                </details>
                            </div>
                        </div>

                        {/* Energy Monitoring */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow energy">
                                    <Zap size={24} />
                                </div>
                                <h3>Energy Monitoring</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>Check consumption?</summary>
                                    <div className="faq-answer">Detailed breakdown of energy usage is available in the "Analytics" tab, showing daily, weekly, and monthly trends.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Help in reduction?</summary>
                                    <div className="faq-answer">Yes! Our AI suggests optimizations like dimming lights or scheduling appliances during off-peak hours to save costs.</div>
                                </details>
                            </div>
                        </div>

                        {/* App & System */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow app">
                                    <Tablet size={24} />
                                </div>
                                <h3>App & System</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>Mobile availability?</summary>
                                    <div className="faq-answer">Yes, our app is available for download on both iOS (App Store) and Android (Google Play Store).</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Multiple users?</summary>
                                    <div className="faq-answer">Yes, the primary account holder can invite family members as authorized users with custom permissions.</div>
                                </details>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="faq-category-card">
                            <div className="category-card-header">
                                <div className="icon-glow support">
                                    <MessageCircle size={24} />
                                </div>
                                <h3>Support</h3>
                            </div>
                            <div className="faq-items-list">
                                <details className="faq-details">
                                    <summary>System not working?</summary>
                                    <div className="faq-answer">Try restarting your main bridge or application. If issues persist, check our online status page or contact support.</div>
                                </details>
                                <details className="faq-details">
                                    <summary>Contact support?</summary>
                                    <div className="faq-answer">You can reach us through the "Help" section in the app or by emailing support@energysmart.com.</div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="testimonials-section section-padding">
                <div className="container">
                    <h2 className="section-title text-center">What Our Users Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">
                                "This system has completely changed how I manage my home. My electricity bill has dropped by 25% in just two months!"
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar initials">JS</div>
                                <div className="author-info">
                                    <h4>Jane Smith</h4>
                                    <span>Homeowner</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">
                                "The real-time monitoring is addictive. I love being able to turn off my AC from the office when I forget."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar initials">MK</div>
                                <div className="author-info">
                                    <h4>Mark Kaslov</h4>
                                    <span>Tech Enthusiast</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="stars">★★★★★</div>
                            <p className="testimonial-text">
                                "Simple, intuitive, and effective. The AI recommendations are actually useful and not just gimmicks."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar initials">SL</div>
                                <div className="author-info">
                                    <h4>Sarah Lee</h4>
                                    <span>Eco-Conscious Parent</span>
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
