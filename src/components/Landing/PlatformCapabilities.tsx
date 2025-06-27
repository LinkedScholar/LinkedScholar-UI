import React from 'react';
import TeamMatching from './TeamMatching';
import NetworkVisualization from './NetworkVisualization';
import ReportGenerator from './ReportGenerator';
import '../../styles/components/Landing/PlatformCapabilities.scss';

const PlatformCapabilities = () => {
    return (
        <div className="platform-capabilities">
            <div className="platform-capabilities__header">
                <h2 className="platform-capabilities__title">
                    <span className="title-accent">Unlock Insight,</span>
                    <span className="title-primary">Accelerate Innovation</span>
                </h2>
                <p className="platform-capabilities__subtitle">
                    An integrated suite of tools designed to help you visualize research networks, build winning teams, and generate strategic insights instantly.
                </p>
            </div>

            <div className="platform-capabilities__content">
                <NetworkVisualization />
                <TeamMatching />
                <ReportGenerator />
            </div>
        </div>
    );
};

export default PlatformCapabilities;