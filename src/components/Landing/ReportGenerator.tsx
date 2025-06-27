import React from 'react';
import '../../styles/components/Landing/ReportGenerator.scss';

const ReportGenerator = () => {
    return (
        <section className="report-generator">
            <div className="report-generator__container">
                <div className="report-generator__content">
                    <div className="content-header">
                        <h3 className="capability-title">From Raw Data to Strategic Insight, Instantly</h3>
                        <p className="capability-subtitle">Turn Months of Manual Research into Minutes of Analysis</p>
                    </div>

                    <p className="capability-description">
                        Stop wrestling with fragmented data and costly market research. Our platform condenses hundreds of academic papers into clear, actionable reports. Uncover emerging trends, track key players, and make data-driven decisions with affordable, automated insights at your fingertips.
                    </p>

                    <div className="capability-features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Data Condensation</h4>
                                <p>Condense hundreds of papers into a single, clear report.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 6 2 18 2 18 9"/>
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                                    <rect x="6" y="14" width="12" height="8"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Custom Reports</h4>
                                <p>Customize reports for market analysis, technical deep-dives, or institutional research.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                    <polyline points="17 6 23 6 23 12"></polyline>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Research Tracking</h4>
                                <p>Track research trajectories and identify key players and institutions in any field.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 10h12M4 14h12M18.5 6a5.5 5.5 0 0 0-8.6 4.5A5.5 5.5 0 0 0 18.5 18"></path>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Affordable Insights</h4>
                                <p>Get affordable, automated insights without the high cost of traditional reports.</p>
                            </div>
                        </div>
                    </div>

                    <div className="capability-action">
                        <button className="action-button">
                            <span>Generate Your First Report</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14"/>
                                <path d="M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="report-generator__visual">
                    <div className="visual-card visual-card--report">
                        <div className="visual-content">
                            <iframe
                                allowFullScreen
                                width="100%"
                                height="100%"
                                src="https://embed.figma.com/slides/a0Yu6t5WRO5sdk8MOdGkGF/Report-q2-2025?node-id=1-107&embed-host=share"
                                title="Report Generator Demo"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ReportGenerator;