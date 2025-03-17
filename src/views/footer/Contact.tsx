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
    const [status, setStatus] = useState<{message: string, isError: boolean} | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ message: 'Please fill in all required fields.', isError: true });
            return;
        }

        setIsSubmitting(true);

        // Replace with your actual EmailJS credentials
        const serviceId = 'YOUR_SERVICE_ID';
        const templateId = 'YOUR_TEMPLATE_ID';
        const userId = 'Q0tzAQdm791WSxTrd';

        emailjs.sendForm(serviceId, templateId, formRef.current!, userId)
            .then(() => {
                setStatus({ message: 'Message sent! We\'ll get back to you soon.', isError: false });
                setFormData({ name: '', email: '', subject: '', message: '' });
            })
            .catch(() => {
                setStatus({ message: 'Failed to send message. Please try again.', isError: true });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                <h2 className="contact-title">Contact Us</h2>
                
                {status && (
                    <div className={status.isError ? "status-message error" : "status-message success"}>
                        {status.message}
                    </div>
                )}

                <form className="compact-form" ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name *"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Your message *"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
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
            </div>
        </div>
    );
};

export default Contact;