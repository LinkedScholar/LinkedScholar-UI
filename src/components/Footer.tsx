import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/footer.scss";

const Footer: React.FC = () => {
    return (
        <footer className="footer glass-footer py-3">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">

                {/* Footer Branding */}
                <div className="footer-brand">
                    <p className="mb-0">Linked<span>Scholar</span> &copy; 2025</p>
                </div>

                {/* Footer Navigation Links */}
                <nav className="footer-links d-flex flex-wrap justify-content-center">
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/help" className="nav-link">Help & FAQs</Link>
                    <Link to="/privacy" className="nav-link">Privacy</Link>
                    <Link to="/terms" className="nav-link">Terms</Link>
                    <Link to="/api" className="nav-link">API</Link>
                    <Link to="/contribute" className="nav-link">Contribute</Link>
                </nav>

                {/* Sponsor Section */}
                <div className="footer-sponsor">
                    <Link to="/sponsor" className="btn btn-outline-primary sponsor-link">
                        Become a Sponsor
                    </Link>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
