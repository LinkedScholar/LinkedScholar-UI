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

                    <div className="capability-features">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <circle cx="12" cy="12" r="8"/>
                                    <circle cx="12" cy="12" r="1"/>
                                </svg>
                            </div>
                            <span>Visually connect researchers, institutions, and publications to see how ideas flow.</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                                </svg>
                            </div>
                            <span>Identify emerging research trajectories and trending topics before they become mainstream.</span>
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