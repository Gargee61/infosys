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
        <div className="auth-container fade-in">
            <div className="auth-card">
                <header className="auth-header">
                    <h2>
                        {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p>
                        {isForgotPassword
                            ? (otpStep === 'email' ? 'Enter email for OTP' : otpStep === 'otp' ? 'Enter 6-digit OTP' : 'Set new password')
                            : isLogin ? 'Log in to your dashboard' : 'Join Smart Home Energy Management'}
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && !isForgotPassword && (
                        <div className="input-field">
                            <User className="input-icon" size={20} />
                            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
                        </div>
                    )}

                    {!isForgotPassword || otpStep === 'email' ? (
                        <div className="input-field">
                            <Mail className="input-icon" size={20} />
                            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                        </div>
                    ) : null}

                    {isForgotPassword && otpStep === 'otp' && (
                        <div className="input-field">
                            <Lock className="input-icon" size={20} />
                            <input type="text" name="otp" placeholder="Enter 6-digit OTP" required value={formData.otp} onChange={handleChange} maxLength="6" />
                        </div>
                    )}

                    {(!isForgotPassword || otpStep === 'reset') && (
                        <>
                            <div className="input-field">
                                <Lock className="input-icon" size={20} />
                                <input type={showPassword ? "text" : "password"} name="password" placeholder={isForgotPassword ? "New Password" : "Password"} required value={formData.password} onChange={handleChange} />
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {isLogin && !isForgotPassword && (
                                <a href="#" className="forgot-password-link" onClick={(e) => { e.preventDefault(); setIsForgotPassword(true); setError(''); setSuccessMsg(''); }}>
                                    Forgot Password?
                                </a>
                            )}

                            {(!isLogin || (isForgotPassword && otpStep === 'reset')) && (
                                <div className="input-field">
                                    <Lock className="input-icon" size={20} />
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
                                </div>
                            )}
                        </>
                    )}

                    {error && <div className="error-msg">{error}</div>}
                    {successMsg && <div className="success-msg">{successMsg}</div>}

                    <button type="submit" className="btn btn-primary btn-block">
                        {isForgotPassword
                            ? (otpStep === 'email' ? 'Send OTP' : otpStep === 'otp' ? 'Verify OTP' : 'Update Password')
                            : isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="auth-footer">
                    {isForgotPassword ? (
                        <p>Remember password? <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotPassword(false); setError(''); setSuccessMsg(''); }}>Back to Login</a></p>
                    ) : isLogin ? (
                        <p>Don't have an account? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup') }}>Sign Up</a></p>
                    ) : (
                        <p>Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login') }}>Login</a></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
