import React from 'react';
import TeamMatching from './TeamMatching';
import NetworkVisualization from './NetworkVisualization';
import ReportGenerator from './ReportGenerator';
import '../../styles/components/Landing/PlatformCapabilities.scss';

const PlatformCapabilities = () => {
    return (
        <div className="platform-capabilities">
            <div className="platform-capabilities__header">
                <h2 className="platform-capabilities__title" id="platform-capabilities">
                    <span className="title-linked">Unlock Insight,</span>
                    <span className="title-scholar">Accelerate Innovation</span>
                </h2>
                <p className="platform-capabilities__subtitle">
                    An integrated suite of tools designed to help you visualize research networks, build winning teams, and generate strategic insights instantly.
                </p>
            </div>

            <div className="platform-capabilities__content">
                <section className="capability-section" id="network-visualization">
                    <NetworkVisualization />
                </section>

                <div className="capability-section">
                    <TeamMatching />
                </div>

                <div className="capability-section">
                    <ReportGenerator />
                </div>
            </div>
        </div>
    );
};

export default PlatformCapabilities;