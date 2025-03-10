import React from 'react';
import '../../styles/components/modals/registrationModal.scss';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSignUp = () => {
        window.location.href = "/login";
        onClose();
    };

    return (
        <div className="registration-modal-overlay" onClick={onClose}>
            <div className="registration-modal" onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <button className="close-button" onClick={onClose}>×</button>

                <div className="registration-content">
                    <div className="icon-container">
                        <i className="mdi mdi-account-lock"></i>
                    </div>

                    <h2>Free Search Limit Reached</h2>
                    <p>You've used all your free searches as a guest user.</p>

                    <p className="benefits">Sign up for free to continue and get:</p>
                    <ul className="benefits-list">
                        <li>5 searches per month</li>
                        <li>Save your search history</li>
                        <li>Access to all basic features</li>
                    </ul>

                    <button className="signup-button" onClick={handleSignUp}>
                        Sign Up Now
                    </button>

                    <p className="upgrade-note">
                        Want unlimited searches? <a href="/">Upgrade to Pro</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
