import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="research-footer py-3">
            {/* Footer Branding */}
            <b>
                <p className="footer-text">Linked Scholar &copy; 2025</p>
            </b>

            {/* Footer Navigation Links */}
            <nav className="footer-links">
                <Link to="/contact">Contact</Link>
                <Link to="/help">Help & FAQs</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/api">API</Link>
                <Link to="/contribute">Contribute</Link>
            </nav>

            {/* Sponsor Section */}
            <div className="footer-sponsor">
                <Link to="/sponsor" className="sponsor-link">Become a Sponsor</Link>
            </div>
        </footer>
    );
};

export default Footer;
