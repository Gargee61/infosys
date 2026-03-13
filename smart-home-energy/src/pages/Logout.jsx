import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './Auth.css'; // Use shared auth styles for container

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000); // Auto-redirect after 3 seconds
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="auth-container fade-in">
            <div className="auth-card text-center">
                <div className="logout-icon-wrapper">
                    <LogOut size={48} color="#4A90E2" />
                </div>
                <h2 className="logout-title">Successfully Logged Out</h2>
                <p className="logout-msg">Thank you for using EnergySmart. You will be redirected shortly.</p>
                <div className="logout-actions">
                    <button className="btn btn-primary btn-block" onClick={() => navigate('/')}>
                        Return to Home Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
