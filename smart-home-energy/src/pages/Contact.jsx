import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, RotateCcw, Upload, CheckCircle, Ticket, ArrowLeft } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        queryType: 'General Query',
        message: '',
        attachment: null
    });

    const [submitted, setSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate a random Ticket ID
        const newTicketId = 'ESH-' + Math.floor(100000 + Math.random() * 900000);
        setTicketId(newTicketId);

        // Mock successful submission
        setSubmitted(true);

        // In a real app, you would send data to the server here
        console.log('Form Submitted:', formData);
    };

    const handleReset = () => {
        setFormData({
            fullName: '',
            email: '',
            mobile: '',
            queryType: 'General Query',
            message: '',
            attachment: null
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (submitted) {
        return (
            <div className="contact-container container fade-in">
                <div className="success-card">
                    <div className="success-icon">
                        <CheckCircle size={64} color="#2ECC71" />
                    </div>
                    <h1>Thank You!</h1>
                    <p className="success-msg">Your request has been submitted successfully.</p>

                    <div className="ticket-summary">
                        <div className="ticket-item">
                            <Ticket size={20} />
                            <span>Ticket ID: <strong>{ticketId}</strong></span>
                        </div>
                        <p className="notif-txt">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
                    </div>

                    <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                        Submit Another Request
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contact-container container fade-in">
            <button className="back-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>
            <header className="contact-header">
                <h1>Contact Us</h1>
                <p>Have a question or facing an issue? Our team is here to help.</p>
            </header>

            <div className="contact-card">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address <span className="required">*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mobile">Mobile Number (Optional)</label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="queryType">Query Type <span className="required">*</span></label>
                            <select
                                id="queryType"
                                name="queryType"
                                value={formData.queryType}
                                onChange={handleChange}
                                required
                            >
                                <option value="Technical Issue">Technical Issue</option>
                                <option value="Device Issue">Device Issue</option>
                                <option value="Account Support">Account Support</option>
                                <option value="General Query">General Query</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message Box <span className="required">*</span></label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Describe your issue or feedback in detail..."
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Upload Attachment (Screenshots/Images)</label>
                        <div className="file-upload-wrapper">
                            <input
                                type="file"
                                id="attachment"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <button
                                type="button"
                                className="upload-btn"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Upload size={18} />
                                {formData.attachment ? formData.attachment.name : 'Choose File'}
                            </button>
                            {formData.attachment && (
                                <span className="file-name">Selected: {formData.attachment.name}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-reset" onClick={handleReset}>
                            <RotateCcw size={18} />
                            Reset
                        </button>
                        <button type="submit" className="btn btn-primary submit-btn">
                            <Send size={18} />
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
