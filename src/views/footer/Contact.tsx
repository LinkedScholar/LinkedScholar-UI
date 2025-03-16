import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/views/footer/contact.scss';

const Contact: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        const serviceId = 'service_jrgov99';
        const templateId = 'template_y1w8v9d';
        const userId = 'Q0tzAQdm791WSxTrd';

        emailjs.sendForm(serviceId, templateId, formRef.current!, userId)
            .then((result) => {
                console.log('Email successfully sent!', result.text);
                setSuccess('Message sent! We will get back to you soon.');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }, (error) => {
                console.error('Failed to send email:', error.text);
                setError('Failed to send message. Please try again later.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="page-container">
            <main className="content">
                <h1 className="footer-page-title">Contact Us</h1>
                <p className="contact-description">
                    Have questions or need assistance? Fill out the form below, and we'll get back to you as soon as possible.
                </p>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Contact;