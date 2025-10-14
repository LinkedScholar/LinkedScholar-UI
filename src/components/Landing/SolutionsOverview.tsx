import React from 'react';
import '../../styles/components/Landing/SolutionOverview.scss';

const SolutionOverview: React.FC = () => {
    const steps = [
        {
            number: "01",
            title: "Integrate",
            subtitle: "Unify Data Sources",
            description: "Connect institutional repositories, publication databases, funding records, and external research sources into a single structured environment.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
            ),
            features: [
                "Multiple data source connectors",
                "Automated data harmonization",
                "FAIR-compliant structuring"
            ]
        },
        {
            number: "02",
            title: "Analyze",
            subtitle: "Generate Intelligence",
            description: "Track institutional performance metrics, benchmark against peer institutions, and identify patterns in research networks and collaboration opportunities.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="20" x2="12" y2="10"/>
                    <line x1="18" y1="20" x2="18" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="16"/>
                </svg>
            ),
            features: [
                "Real-time KPI tracking",
                "Network visualization",
                "Comparative benchmarking"
            ]
        },
        {
            number: "03",
            title: "Exploit",
            subtitle: "Drive Decisions",
            description: "Apply research intelligence to strategic decisions—from identifying funding opportunities to building optimal project teams and generating trend reports.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            ),
            features: [
                "Automated funding matching",
                "AI-powered team builder",
                "Strategic trend reports"
            ]
        }
    ];

    const scrollToCapabilities = () => {
        const capabilitiesSection = document.getElementById('platform-capabilities');
        if (capabilitiesSection) {
            capabilitiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="solution-overview">
            <div className="solution-overview__background"></div>

            <div className="solution-overview__container">
                {/* Header */}
                <div className="solution-overview__header">
                    <h2 className="solution-overview__title">
                        How LinkedScholar Works
                    </h2>
                    <p className="solution-overview__subtitle">
                        Three integrated layers that transform fragmented institutional 
                        data into strategic research intelligence
                    </p>
                </div>

                {/* Process Steps */}
                <div className="solution-overview__steps">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <div className="step-card__badge">{step.number}</div>
                            
                            <div className="step-card__icon">
                                {step.icon}
                            </div>

                            <h3 className="step-card__title">{step.title}</h3>
                            <p className="step-card__subtitle">{step.subtitle}</p>
                            <p className="step-card__description">{step.description}</p>

                            <ul className="step-card__features">
                                {step.features.map((feature, idx) => (
                                    <li key={idx} className="feature-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionOverview;