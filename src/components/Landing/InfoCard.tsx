import React from 'react';
import '../../styles/components/Landing/InfoCard.scss';
import { Link } from 'react-router-dom';

const InfoCard = () => {
    return (
        <div className="info-card">
            {/* Single line title */}
            <div className="info-card__header">
                <span className="info-card__title-primary">Transform Research</span>
                <span className="info-card__title-accent">Into Results</span>
            </div>

            <p className="info-card__description">
                LinkedScholar is{' '}
                built to accelerate{' '}
                <span className="text-emphasis">innovation</span>{' '}
                and{' '}
                <span className="text-emphasis">collaboration</span>{' '}
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
                            Interactive Visualizations
                        </span>
                        <span className="info-card__feature-text">
                            Visually map hidden connections between researchers, topics, and institutions.
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
                            Smart Collaboration
                        </span>
                        <span className="info-card__feature-text">
                            Use our AI to find ideal partners and match with EU funding calls.
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
                            Instant Trend Reports
                        </span>
                        <span className="info-card__feature-text">
                            Condense hundreds of academic papers into actionable insights in minutes.
                        </span>
                    </div>
                </li>
            </ul>

            <div className="info-card__cta-wrapper">
                <Link to="/contact">  
                <button className="info-card__cta">
                    <span className="info-card__cta-text">Start Discovering</span>
                    <div className="info-card__cta-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </button>
                </Link>
                <div className="info-card__cta-shine"></div>
            </div>
        </div>
    );
};

export default InfoCard;