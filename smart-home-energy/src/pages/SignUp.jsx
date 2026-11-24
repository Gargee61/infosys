import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '', otp: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [otpStep, setOtpStep] = useState('email'); // 'email', 'otp', 'reset'

    useEffect(() => {
        setIsForgotPassword(false);
        setOtpStep('email');
        setSuccessMsg('');
        setError('');
    }, [location.pathname]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        try {
            if (otpStep === 'email') {
                const response = await fetch(`http://localhost:8081/api/password/forgot`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);

                setOtpStep('otp');
                setSuccessMsg("OTP has been sent to your email!");
            }
            else if (otpStep === 'otp') {
                const response = await fetch(`http://localhost:8081/api/password/verify-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, otp: formData.otp })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);

                setOtpStep('reset');
                setSuccessMsg("OTP verified! Now enter your new password.");
            }
            else if (otpStep === 'reset') {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                const response = await fetch(`http://localhost:8081/api/password/reset`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: formData.otp, // In our custom flow, the OTP acts as the token
                        password: formData.password
                    })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);

                setSuccessMsg("Password reset successful! Redirecting to login...");
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isForgotPassword) {
            handleForgotPassword(e);
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const response = await fetch(`http://localhost:8081${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Authentication failed");

            localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            {/* Background Decorative Elements */}
            <div className="bg-glow bg-glow-1"></div>
            <div className="bg-glow bg-glow-2"></div>

            <div className="glass-card auth-card">
                <header className="auth-header fade-in">
                    <h2>
                        {isForgotPassword ? 'Reset Access' : isLogin ? 'System Login' : 'Register Unit'}
                    </h2>
                    <p>
                        {isForgotPassword
                            ? (otpStep === 'email' ? 'Identification required' : otpStep === 'otp' ? 'Enter neural-otp' : 'Set new parameters')
                            : isLogin ? 'Access your Command Center' : 'Initialize your Smart Home profile'}
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && !isForgotPassword && (
                        <div className="input-field">
                            <User className="input-icon" size={18} />
                            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
                        </div>
                    )}

                    {(!isForgotPassword || otpStep === 'email') && (
                        <div className="input-field">
                            <Mail className="input-icon" size={18} />
                            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                        </div>
                    )}

                    {isForgotPassword && otpStep === 'otp' && (
                        <div className="input-field">
                            <Lock className="input-icon" size={18} />
                            <input type="text" name="otp" placeholder="Enter 6-digit OTP" required value={formData.otp} onChange={handleChange} maxLength="6" />
                        </div>
                    )}

                    {(!isForgotPassword || otpStep === 'reset') && (
                        <>
                            <div className="input-field">
                                <Lock className="input-icon" size={18} />
                                <input type={showPassword ? "text" : "password"} name="password" placeholder={isForgotPassword ? "New Password" : "Password"} required value={formData.password} onChange={handleChange} />
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {isLogin && !isForgotPassword && (
                                <a href="#" className="forgot-password-link" onClick={(e) => { e.preventDefault(); setIsForgotPassword(true); setError(''); setSuccessMsg(''); }}>
                                    Neural Link Lost?
                                </a>
                            )}

                            {(!isLogin || (isForgotPassword && otpStep === 'reset')) && (
                                <div className="input-field">
                                    <Lock className="input-icon" size={18} />
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
                                </div>
                            )}
                        </>
                    )}

                    {error && <div className="error-msg fade-in">{error}</div>}
                    {successMsg && <div className="success-msg fade-in">{successMsg}</div>}

                    <button type="submit" className="btn btn-primary btn-block">
                        {isForgotPassword
                            ? (otpStep === 'email' ? 'Transmit OTP' : otpStep === 'otp' ? 'Validate' : 'Synchronize')
                            : isLogin ? 'Initialize' : 'Register'}
                    </button>
                </form>

                <div className="secondary-action">
                    {isForgotPassword ? (
                        <p>Remembered? <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotPassword(false); setError(''); setSuccessMsg(''); }}>Back to Login</a></p>
                    ) : isLogin ? (
                        <p>New operator? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup') }}>Create Profile</a></p>
                    ) : (
                        <p>Existing unit? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login') }}>Access Profile</a></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
