import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container container fade-in">
            <header className="about-header section-padding">
                <h1>About the Project</h1>
                <p>Learn more about our mission to revolutionize home energy management</p>
            </header>

            <div className="about-grid">
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        We aim to empower homeowners to take control of their energy consumption through
                        intelligent insights and automated control. Our goal is to reduce carbon footprints,
                        lower utility bills, and create a sustainable future for smart living.
                    </p>
                </div>

                <div className="about-section highlight-bg">
                    <h2>How It Works</h2>
                    <p>
                        The Smart Home Energy Management System integrates IoT sensors with a powerful
                        React-based dashboard. It collects real-time data from your appliances, analyzes usage patterns using AI algorithms,
                        and provides actionable recommendations to optimize efficiency without compromising comfort.
                    </p>
                </div>

                <div className="tech-stack section-padding">
                    <h2>Technologies Used</h2>
                    <div className="tech-cards">
                        <div className="tech-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" />
                            <h3>React.js</h3>
                            <p>Frontend UI</p>
                        </div>
                        <div className="tech-card">
                            <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="Java Spring Boot" style={{ background: '#fff', padding: '5px', borderRadius: '4px' }} />
                            <h3>Java Spring Boot</h3>
                            <p>Backend API</p>
                        </div>
                        <div className="tech-card">
                            <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="MongoDB" />
                            <h3>MongoDB</h3>
                            <p>Database</p>
                        </div>
                        <div className="tech-card">
                            <div className="icon-placeholder">IoT</div>
                            <h3>IoT Sensors</h3>
                            <p>Data Collection</p>
                        </div>
                        <div className="tech-card">
                            <div className="icon-placeholder">AI</div>
                            <h3>AI Models</h3>
                            <p>Analytics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
