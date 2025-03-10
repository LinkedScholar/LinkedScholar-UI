import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/components/modals/registrationModal.scss";
interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="registration-modal-overlay d-flex align-items-center justify-content-center">
            <div className="registration-modal card shadow-lg p-4">
                <button className="btn-close float-end" onClick={onClose}></button>

                <div className="text-center">
                    <div className="icon-container my-3">
                        <i className="bi bi-person-lock text-primary fs-1"></i>
                    </div>

                    <h2 className="text-primary">Free Search Limit Reached</h2>
                    <p className="text-muted">You've used all your free searches as a guest user.</p>

                    <p className="fw-bold">Sign up for free to continue and get:</p>
                    <ul className="list-unstyled">
                        <li>✔ 5 searches per month</li>
                        <li>✔ Save your search history</li>
                        <li>✔ Access to all basic features</li>
                    </ul>

                    <button className="btn btn-primary w-100 my-2">
                        Sign Up Now
                    </button>

                    <p className="text-muted mt-3">
                        Want unlimited searches? <a href="/" className="text-decoration-none">Upgrade to Pro</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
