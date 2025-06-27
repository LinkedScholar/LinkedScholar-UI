// src/components/Landing/KeyFigures.tsx

import React, { useEffect, useState, useRef } from 'react';
// We no longer import icons here
import '../../styles/components/Landing/KeyFigures.scss';
import NetworkBackground from './NetworkBackground';
import StatCard from './StatCard';
import InfoCard from './InfoCard';

// --- MOCK API & TYPES ---
const getStatistics = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        institutions: 50000,
        articles: 7000000,
        authors: 3000000,
        topics: 150000,
        companies: 125000,
        fundings: 850000,
    };
};
type NodeId = 'institutions' | 'articles' | 'authors' | 'topics' | 'companies' | 'fundings';
type Statistics = Record<NodeId, number>;

// --- FIX: The 'icon' property is now a simple string identifier ---
const STAT_CONFIG: { id: NodeId; title: string; icon: string }[] = [
    { id: 'institutions', title: 'Institutions', icon: 'home' },
    { id: 'authors', title: 'Researchers', icon: 'users' },
    { id: 'articles', title: 'Publications', icon: 'file-text' },
    { id: 'topics', title: 'Topics', icon: 'tag' },
    { id: 'companies', title: 'Companies', icon: 'briefcase' },
    { id: 'fundings', title: 'Projects', icon: 'briefcase' },
];

// useOnScreen hook for animations
const useOnScreen = (ref: React.RefObject<HTMLDivElement | null>, threshold = 0.2) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
                observer.unobserve(entry.target);
            }
        }, { threshold });
        const currentRef = ref.current;
        if (currentRef) { observer.observe(currentRef); }
        return () => { if (currentRef) { observer.unobserve(currentRef); } };
    }, [ref, threshold]);
    return isIntersecting;
};

const KeyFigures = () => {
    const [stats, setStats] = useState<Statistics | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const isVisible = useOnScreen(gridRef);

    useEffect(() => {
        const fetchStatistics = async () => {
            const data = await getStatistics();
            setStats(data);
        };
        fetchStatistics();
    }, []);

    return (
        <div className="key-figures-container">
            <NetworkBackground />
            <div className="key-figures-layout">
                {/* Left Column */}
                <div className="key-figures-content">
                    <div className="key-figures-header">
                        <h2>
                            <span className="key-figures-header__accent">The EU's</span>
                            {' '}
                            <span className="key-figures-header__primary">Open Research</span>
                            {' '}
                            <span className="key-figures-header__gradient">Intelligence Platform</span>
                        </h2>
                        <p>
                            We help{' '}
                            <span className="text-highlight">companies</span>,{' '}
                            <span className="text-highlight">research institutions</span>, and{' '}
                            <span className="text-highlight">researchers</span>{' '}
                            to connect and navigate the global research ecosystem, accelerating{' '}
                            <span className="text-emphasis">R&D</span>,{' '}
                            <span className="text-emphasis">funding discovery</span>, and maximizing{' '}
                            <span className="text-emphasis">innovation</span>.
                        </p>
                    </div>
                    <div className={`key-figures-grid ${isVisible ? 'is-visible' : ''}`} ref={gridRef}>
                        {STAT_CONFIG.map((stat, index) => (
                            <StatCard
                                key={stat.id}
                                icon={stat.icon} // Now passing a string like "home"
                                title={stat.title}
                                value={stats ? stats[stat.id] : null}
                                isVisible={isVisible}
                                delayIndex={index}
                            />
                        ))}
                    </div>
                </div>
                <div className="key-figures-info-panel">
                    <InfoCard />
                </div>
            </div>
        </div>
    );
};

export default KeyFigures;