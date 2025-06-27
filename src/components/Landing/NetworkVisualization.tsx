import React from 'react';
import '../../styles/components/Landing/NetworkVisualization.scss';

const NetworkVisualization = () => {
    return (
        <section className="network-visualization">
            <div className="network-visualization__container">
                <div className="network-visualization__content">
                    <div className="content-header">
                        <h3 className="capability-title">Instantly Map Your Research Ecosystem</h3>
                        <p className="capability-subtitle">Go Beyond Search. Visualize Connections.</p>
                    </div>

                    <p className="capability-description">
                        Stop guessing and start seeing. Our dynamic visualizations allow you to navigate the entire research landscape, revealing hidden patterns, key influencers, and strategic opportunities that simple data tables and search bars could never show you.
                    </p>

                    <div className="capability-features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <circle cx="12" cy="12" r="8"/>
                                    <circle cx="12" cy="12" r="1"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Visual Network Mapping</h4>
                                <p>Connect researchers, institutions, and publications to see how ideas flow through the ecosystem.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                    <circle cx="12" cy="17" r="1"/>
                                    <path d="M12 2v2"/>
                                    <path d="M12 20v2"/>
                                    <path d="M4.93 4.93l1.41 1.41"/>
                                    <path d="M17.66 17.66l1.41 1.41"/>
                                    <path d="M2 12h2"/>
                                    <path d="M20 12h2"/>
                                    <path d="M6.34 17.66l-1.41 1.41"/>
                                    <path d="M19.07 4.93l-1.41 1.41"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Snowballing Techniques</h4>
                                <p>Start with one paper and discover entire research lineages through smart citation exploration.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Save & Organize</h4>
                                <p>Bookmark papers and researchers in personalized collections for easy reference and tracking.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                    <path d="M12 7v4"/>
                                    <path d="M10 9h4"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h4>Rapid SOTA Understanding</h4>
                                <p>Quickly grasp the state-of-the-art in any field with AI-powered summaries and trend analysis.</p>
                            </div>
                        </div>
                    </div>

                    <div className="capability-action">
                        <button className="action-button">
                            <span>Explore the Network</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14"/>
                                <path d="M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="network-visualization__visual">
                    <div className="visual-grid">
                        <div className="visual-card visual-card--grid">
                            <div className="visual-content">
                                <img src="/images/topic_page.png" alt="Topic Analysis" className="visual-image" />
                            </div>
                        </div>
                        <div className="visual-card visual-card--grid">
                            <div className="visual-content">
                                <img src="/images/publications.png" alt="Publications Network" className="visual-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NetworkVisualization;