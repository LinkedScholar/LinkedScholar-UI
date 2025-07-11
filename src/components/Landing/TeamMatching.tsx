import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FloatingCard {
    program: string;
    title: string;
    budget: string;
    deadline: string;
    recommendation: string;
    recommendationColor: string;
}

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
    image?: string;
    displayType: 'browser' | 'floating';
    floatingCards?: FloatingCard[];
}

const TeamMatching = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features: Feature[] = [
        {
            title: "AI Team Generator",
            description: "AI-driven generator builds balanced or innovation-focused teams.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
            ),
            image: "/images/landing_features/5_team_matchmaking.png",
            displayType: "browser"
        },
        {
            title: "Funding Opportunities",
            description: "Automated detection of relevant Horizon Europe funding calls.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
            ),
            displayType: "floating",
            image: "/images/landing_features/6_funding_matchmaking.svg"
        },
        {
            title: "Smart Ranking",
            description: "Invite and automatically rank project applicants with an AI-powered compatibility score.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
            ),
            image: "/images/landing_features/8_Applicant_selection.png",
            displayType: "browser"
        },
        {
            title: "Gap Analysis",
            description: "Identify and fill expertise gaps in your team with targeted expert suggestions.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <path d="M12 18v-6"/>
                    <path d="M9 15h6"/>
                </svg>
            ),
            image: "/images/landing_features/7_expertise.svg",
            displayType: "floating"
        }
    ];

    const renderBrowserMockup = (feature: Feature) => (
        <div className="visual-mockup">
            {/* Browser-like header */}
            <div className="mockup-header">
                <div className="browser-controls">
                    <div className="control-dot control-dot--red"></div>
                    <div className="control-dot control-dot--yellow"></div>
                    <div className="control-dot control-dot--green"></div>
                </div>
                <div className="address-bar">
                    <div className="address-input">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="m12 1-3 6h6l-3-6Z"/>
                            <path d="m12 23 3-6H9l3 6Z"/>
                        </svg>
                        linkedscholar.io/team-builder
                    </div>
                </div>
            </div>

            {/* Content area with smooth transitions */}
            <div className="mockup-content">
                <div className="image-container">
                    <img
                        src={feature.image}
                        alt={`${feature.title} Visualization`}
                        className="visual-image"
                        key={activeFeature}
                    />

                    {/* Overlay with feature info */}
                    <div className="image-overlay">
                        <div className="feature-badge">
                            <div className="feature-badge-icon">
                                {feature.icon}
                            </div>
                            <span>{feature.title}</span>
                        </div>
                    </div>

                    {/* Loading shimmer effect during transitions */}
                    <div className="loading-shimmer" key={`shimmer-${activeFeature}`}></div>
                </div>
            </div>

            {/* Feature indicators */}
            <div className="feature-indicators">
                {features.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${activeFeature === index ? 'indicator--active' : ''}`}
                        onClick={() => setActiveFeature(index)}
                    />
                ))}
            </div>

            {/* Decorative elements */}
            <div className="mockup-decoration">
                <div className="glow-effect glow-effect--primary"></div>
                <div className="glow-effect glow-effect--secondary"></div>
            </div>
        </div>
    );

    const renderFloatingCards = (feature: Feature) => (
        <div className="floating-cards-container">
            <img
                src={feature.image}
                alt={`${feature.title} Visualization`}
                className="floating-image"
                key={activeFeature}
            />

            {/* Overlay with feature info */}
            <div className="floating-feature-badge">
                <div className="feature-badge-icon">
                    {feature.icon}
                </div>
                <span>{feature.title}</span>
            </div>

            {/* Loading shimmer effect during transitions */}
            <div className="loading-shimmer" key={`shimmer-${activeFeature}`}></div>

            {/* Feature indicators for floating view */}
            <div className="floating-indicators">
                {features.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${activeFeature === index ? 'indicator--active' : ''}`}
                        onClick={() => setActiveFeature(index)}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <section className="team-matching" id='matchmaking'>
            <div className="team-matching__container">
                {/* Visual on the left - switching between browser and floating */}
                <div className="team-matching__visual">
                    {features[activeFeature].displayType === 'browser'
                        ? renderBrowserMockup(features[activeFeature])
                        : renderFloatingCards(features[activeFeature])
                    }
                </div>

                {/* Content on the right - but LEFT ALIGNED text */}
                <div className="team-matching__content">
                    <div className="content-header">
                        <h3 className="capability-title">Intelligent Team & Funding Matchmaking</h3>
                        <p className="capability-subtitle">From Team Gaps to EU Grants, Automatically.</p>
                    </div>

                    <p className="capability-description">
                        Assemble the perfect project team with our AI-powered generator. Our system not only identifies ideal experts to fill collaboration gaps but also automatically recommends relevant EU funding opportunities. Invite applicants to your project and let our AI rank them by compatibility, ensuring you build the strongest possible consortium.
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
                                <span>Build Your Team</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamMatching;