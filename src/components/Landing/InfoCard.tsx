import React from 'react';
import '../../styles/components/Landing/InfoCard.scss';

const InfoCard = () => {
    return (
        <div className="info-card">
            <div className="info-card__header">
                <div className="info-card__icon-wrapper">
                    <div className="info-card__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    </div>
                    <div className="info-card__icon-glow"></div>
                </div>
                <h3 className="info-card__title">
                    <span className="info-card__title-primary">Transform Research</span>
                    <span className="info-card__title-accent">Into Results</span>
                </h3>
            </div>

            <p className="info-card__description">
                Our mission is to build{' '}
                <span className="text-highlight">Europe's first</span>{' '}
                <span className="text-gradient">open-source research intelligence platform</span>,{' '}
                transforming{' '}
                <span className="text-emphasis">complex data</span>{' '}
                into{' '}
                <span className="text-emphasis">actionable insights</span>{' '}
                for{' '}
                <span className="text-accent">universities</span>,{' '}
                <span className="text-accent">industry</span>, and{' '}
                <span className="text-accent">researchers</span>.
            </p>

            <ul className="info-card__features">
                <li className="info-card__feature">
                    <div className="info-card__feature-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                    </div>
                    <div className="info-card__feature-content">
                        <span className="info-card__feature-title">
                            <span className="feature-accent">Interactive</span> Visualizations
                        </span>
                        <span className="info-card__feature-text">
                            Navigate the research landscape with{' '}
                            <span className="feature-highlight">dynamic</span>,{' '}
                            <span className="feature-highlight">real-time</span> data exploration
                        </span>
                    </div>
                </li>
                <li className="info-card__feature">
                    <div className="info-card__feature-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="6"></circle>
                            <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                    </div>
                    <div className="info-card__feature-content">
                        <span className="info-card__feature-title">
                            <span className="feature-accent">Instant</span> Trend Reports
                        </span>
                        <span className="info-card__feature-text">
                            Generate{' '}
                            <span className="feature-highlight">comprehensive</span> trend analysis on{' '}
                            <span className="feature-highlight">any topic</span> within minutes
                        </span>
                    </div>
                </li>
                <li className="info-card__feature">
                    <div className="info-card__feature-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div className="info-card__feature-content">
                        <span className="info-card__feature-title">
                            <span className="feature-accent">Smart</span> Collaboration
                        </span>
                        <span className="info-card__feature-text">
                            Discover{' '}
                            <span className="feature-highlight">ideal research partners</span> and unlock{' '}
                            <span className="feature-highlight">funding opportunities</span>
                        </span>
                    </div>
                </li>
            </ul>

            <div className="info-card__cta-wrapper">
                <button className="info-card__cta">
                    <span className="info-card__cta-text">Explore Network</span>
                    <div className="info-card__cta-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </button>
                <div className="info-card__cta-shine"></div>
            </div>
        </div>
    );
};

export default InfoCard;