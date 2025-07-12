import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReportGenerator: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            title: "Data Condensation",
            description: "Condense hundreds of papers into a single, clear report.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
            )
        },
        {
            title: "Custom Reports",
            description: "Customize reports for market analysis, technical deep-dives, or institutional research.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                </svg>
            )
        },
        {
            title: "Research Tracking",
            description: "Track research trajectories and identify key players and institutions in any field.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
            )
        },
        {
            title: "Affordable Insights",
            description: "Get affordable, automated insights without the high cost of traditional reports.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10h12M4 14h12M18.5 6a5.5 5.5 0 0 0-8.6 4.5A5.5 5.5 0 0 0 18.5 18"></path>
                </svg>
            )
        }
    ];

    return (
        <section className="report-generator" id='trend-reports'>
            <div className="report-generator__container">
                {/* Content on the left - keeping original layout */}
                <div className="report-generator__content">
                    <div className="content-header">
                        <h3 className="capability-title">From Raw Data to Strategic Insight, Instantly</h3>
                        <p className="capability-subtitle">Turn Months of Manual Research into Minutes of Analysis</p>
                    </div>

                    <p className="capability-description">
                        Stop wrestling with fragmented data and costly market research. Our platform condenses hundreds of academic papers into clear, actionable reports. Uncover emerging trends, track key players, and make data-driven decisions with affordable, automated insights at your fingertips.
                    </p>

                    {/* Changed from grid to vertical stacking */}
                    <div className="capability-features-vertical">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-item ${activeFeature === index ? 'feature-item--active' : ''}`}
                                onClick={() => setActiveFeature(index)}
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <div className="feature-content">
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="capability-action">
                        <Link to="/contact">
                        <button className="action-button">
                            <span>Generate Your First Report</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14"/>
                                <path d="M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                        </Link>
                    </div>
                </div>

                {/* Visual on the right - PRESENTATION INTERFACE */}
                <div className="report-generator__visual">
                    <div className="presentation-viewer">
                        {/* Presentation Header */}
                        <div className="presentation-header">
                            <div className="presentation-title">
                                <div className="title-text">
                                    <h4>Agentic AI · 2025 Trend Report</h4>
                                    <span>Generated in 2 minutes · 24 pages</span>
                                </div>
                            </div>
                            <div className="presentation-actions">
                                <button className="action-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/>
                                    </svg>
                                </button>
                                <button className="action-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="18" cy="5" r="3"/>
                                        <circle cx="6" cy="12" r="3"/>
                                        <circle cx="18" cy="19" r="3"/>
                                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Pages Overview Grid */}
                        <div className="pages-overview">
                        
                            <div className="reports-grid">
                                <div className="report-item">
                                    <div className="page-number">01</div>
                                    <img 
                                        src="/images/report-demo-4.png" 
                                        alt="Executive Summary"
                                        className="report-preview"
                                    />
                                    <div className="page-title">Executive Summary</div>
                                </div>
                                <div className="report-item">
                                    <div className="page-number">02</div>
                                    <img 
                                        src="/images/report-demo-3.png" 
                                        alt="Market Overview"
                                        className="report-preview"
                                    />
                                    <div className="page-title">Market Overview</div>
                                </div>
                                <div className="report-item">
                                    <div className="page-number">03</div>
                                    <img 
                                        src="/images/report-demo-1.png" 
                                        alt="Regional Analysis"
                                        className="report-preview"
                                    />
                                    <div className="page-title">Regional Analysis</div>
                                </div>
                                <div className="report-item">
                                    <div className="page-number">04</div>
                                    <img 
                                        src="/images/report-demo-2.png" 
                                        alt="Strategic Roadmap"
                                        className="report-preview"
                                    />
                                    <div className="page-title">Strategic Roadmap</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Navigation */}
                        <div className="presentation-footer">
                            <div className="navigation-controls">
                                <button className="nav-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="15 18 9 12 15 6"/>
                                    </svg>
                                    Previous
                                </button>
                                <div className="page-indicator">
                                    <span>Page 1-4</span>
                                </div>
                                <button className="nav-btn">
                                    Next
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 18 15 12 9 6"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReportGenerator;