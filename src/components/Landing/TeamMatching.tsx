import React from 'react';
import '../../styles/components/Landing/TeamMatching.scss';

const TeamMatching = () => {
    return (
        <section className="team-matching">
            <div className="team-matching__container">
                <div className="team-matching__visual">
                    <div className="visual-card visual-card--primary">
                        <div className="visual-content">
                            <img src="/images/team_generator_background.png" alt="Team Collaboration Network" className="visual-image" />
                        </div>
                    </div>
                    <div className="visual-card visual-card--overlay">
                        <div className="visual-content">
                            <img src="/images/team_generator.png" alt="Team Generator Interface" className="visual-image" />
                        </div>
                    </div>
                </div>

                <div className="team-matching__content">
                    <div className="content-header">
                        <h3 className="capability-title">Intelligent Team & Funding Matchmaking</h3>
                        <p className="capability-subtitle">From Team Gaps to EU Grants, Automatically.</p>
                    </div>

                    <p className="capability-description">
                        Assemble the perfect project team with our AI-powered generator. Our system not only identifies ideal experts to fill collaboration gaps but also automatically recommends relevant EU funding opportunities. Invite applicants to your project and let our AI rank them by compatibility, ensuring you build the strongest possible consortium.
                    </p>

                    <div className="capability-features">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <span>AI-driven generator builds balanced or innovation-focused teams.</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v6m0 6v6"/>
                                    <path d="M1 12h6m6 0h6"/>
                                </svg>
                            </div>
                            <span>Automated detection of relevant Horizon Europe funding calls.</span>
                        </div>
                    </div>

                    <div className="capability-action">
                        <button className="action-button">
                            <span>Build Your Team</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14"/>
                                <path d="M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default TeamMatching;