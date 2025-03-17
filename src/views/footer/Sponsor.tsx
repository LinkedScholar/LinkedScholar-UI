import React from 'react';
import '../../styles/views/footer/sponsor.scss';

const Sponsor: React.FC = () => {
    return (
        <div className="page-container">

            <main className="content sponsor-content" style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 className="footer-page-title">Become a Sponsor</h1>
                <p className="sponsor-description">
                    Support <strong>LinkedScholar</strong> and help researchers connect, collaborate, and innovate.
                    Your sponsorship will fund the development and maintenance of this platform.
                </p>

                {/* Sponsorship Tiers */}
                <div className="sponsorship-tiers">
                    <div className="sponsor-card">
                        <h3 style={{ fontWeight: 'bold' }}>Donator</h3>
                        <ul>
                            <li>Access to our Discord</li>
                            <li>Be featured as a Donator</li>
                        </ul>
                        <a href="https://www.paypal.com/ncp/payment/FBPRA5T7Z936J" target="_blank" rel="noopener noreferrer">
                            <button className="donate-button">Donate $10</button>
                        </a>
                    </div>

                    <div className="sponsor-card">
                        <h3 style={{ fontWeight: 'bold' }}>Supporter</h3>
                        <ul>
                            <li>Be featured as a Supporter</li>
                            <li>Access to our Discord</li>
                            <li>Access to development channels</li>
                        </ul>
                        <a href="https://www.paypal.com/ncp/payment/HSXLQN4NQHWEA" target="_blank" rel="noopener noreferrer">
                            <button className="donate-button">Donate $50</button>
                        </a>
                    </div>

                    <div className="sponsor-card">
                        <h3 style={{ fontWeight: 'bold' }}>Partner</h3>
                        <ul>
                            <li>Everything included in Supporter</li>
                            <li>Direct contact with founders</li>
                            <li>Special API usage plan</li>
                            <li>Company logo on the website</li>
                        </ul>
                        <a href="mailto:contact@linkedscholar.io">
                            <button className="donate-button">Contact Us</button>
                        </a>
                    </div>
                </div>

                {/* Separator */}
                <hr className="sponsor-separator" />
                
                
                {/* DISABLED FOR NOW - Buy Me a Coffee and Custom Donation */}
                {/*
                <div className="sponsorship-tiers">
                    <div className="sponsor-card">
                        <h3 style={{ fontWeight: 'bold' }}>☕ Buy Me a Coffee</h3>
                        <ul>
                            <li>If you love what we're doing, consider buying us a coffee!</li>
                        </ul>

                        <a href="https://www.buymeacoffee.com/YOUR_BMC_USERNAME" target="_blank" rel="noopener noreferrer">
                            <button className="coffee-button">Buy Me a Coffee</button>
                        </a>
                    </div>
                    <div className="sponsor-card">
                        <h3 style={{ fontWeight: 'bold' }}>Custom Donation</h3>
                        <ul>
                            <li>Choose your own donation amount to support LinkedScholar.</li>
                        </ul>

                        <a href="https://www.paypal.com/donate/?business=YOUR_PAYPAL_BUSINESS_EMAIL" target="_blank" rel="noopener noreferrer">
                            <button className="donate-button">Donate Any Amount</button>
                        </a>
                    </div>
                </div>
                */}
            </main>

        </div>
    );
};

export default Sponsor;
