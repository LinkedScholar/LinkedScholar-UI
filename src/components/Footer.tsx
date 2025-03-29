import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/footer.scss";

const Footer: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth <= 768;
            setIsMobile(newIsMobile);
            if (!newIsMobile) {
                setIsCollapsed(true); // Reset to collapsed when returning to desktop
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleFooter = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Only apply mobile modifications when on mobile
    if (isMobile) {
        return (
            <footer className={`footer glass-footer py-3 mobile-footer ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                <div className="mobile-footer-header" onClick={toggleFooter}>
                    <div className="footer-brand">
                        <p className="mb-0">Linked<span>Scholar</span> &copy; 2025</p>
                    </div>
                    <div className="mobile-toggle">
                        <i className={`mdi ${isCollapsed ? 'mdi-chevron-up' : 'mdi-chevron-down'}`}></i>
                    </div>
                </div>
                
                {!isCollapsed && (
                    <div className="mobile-footer-content">
                        <nav className="footer-links">
                            <Link to="/contact" className="nav-link">Contact</Link>
                            <Link to="/help" className="nav-link">Help & FAQs</Link>
                            <Link to="/privacy" className="nav-link">Privacy</Link>
                            <Link to="/terms" className="nav-link">Terms</Link>
                            <Link to="/api" className="nav-link">API</Link>
                            <Link to="/contribute" className="nav-link">Contribute</Link>
                        </nav>
                        
                        <div className="footer-sponsor">
                            <Link to="/sponsor" className="btn btn-outline-primary sponsor-link">
                                Become a Sponsor
                            </Link>
                        </div>
                    </div>
                )}
            </footer>
        );
    }

    // Return the original footer for non-mobile screens
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
