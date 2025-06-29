import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NetworkVisualization = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            title: "Visual Network Mapping",
            description: "Connect researchers, institutions, and publications to see how ideas flow through the ecosystem.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <circle cx="12" cy="12" r="8"/>
                    <circle cx="12" cy="12" r="1"/>
                </svg>
            ),
            image: "/images/network_mapping.png"
        },
        {
            title: "Snowballing Techniques",
            description: "Start with one paper and discover entire research lineages through smart citation exploration.",
            icon: (
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
            ),
            image: "/images/topic_page.png"
        },
        {
            title: "Save & Organize",
            description: "Bookmark papers and researchers in personalized collections for easy reference and tracking.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
            ),
            image: "/images/collections.png"
        },
        {
            title: "Rapid SOTA Understanding",
            description: "Quickly grasp the state-of-the-art in any field with AI-powered summaries and trend analysis.",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    <path d="M12 7v4"/>
                    <path d="M10 9h4"/>
                </svg>
            ),
            image: "/images/publications.png"
        }
    ];

    return (
        <section className="network-visualization" id='data-visualization'>
            <div className="network-visualization__container">
                <div className="network-visualization__content">
                    <div className="content-header">
                        <h3 className="capability-title">Map Your Research Ecosystem</h3>
                        <p className="capability-subtitle">Go Beyond Search. Visualize Connections.</p>
                    </div>

                    <p className="capability-description">
                        Stop guessing and start seeing. Our dynamic visualizations allow you to navigate the entire research landscape, revealing hidden patterns, key influencers, and strategic opportunities that simple data tables and search bars could never show you.
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
                        <Link to="/contact" className="action-button">
                            <span>Explore the Network</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14"/>
                                <path d="M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="network-visualization__visual">
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
                                    linkedscholar.io
                                </div>
                            </div>
                        </div>

                        {/* Content area with smooth transitions */}
                        <div className="mockup-content">
                            <div className="image-container">
                                <img
                                    src={features[activeFeature].image}
                                    alt={`${features[activeFeature].title} Visualization`}
                                    className="visual-image"
                                    key={activeFeature}
                                />

                                {/* Overlay with feature info */}
                                <div className="image-overlay">
                                    <div className="feature-badge">
                                        <div className="feature-badge-icon">
                                            {features[activeFeature].icon}
                                        </div>
                                        <span>{features[activeFeature].title}</span>
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
                </div>
            </div>
        </section>
    );
};

export default NetworkVisualization;