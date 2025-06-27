import React, { useEffect, useState, useRef } from 'react';
// We no longer import icons here
import '../../styles/components/Landing/KeyFigures.scss';
import NetworkBackground from './NetworkBackground';
import StatCard from './StatCard';
import InfoCard from './InfoCard';

// --- MOCK API & TYPES ---
// Updated statistics to align with the pitch deck
const getStatistics = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        institutions: 39000, // from pitch
        articles: 6000000,  // from pitch
        authors: 10000000,  // from pitch
        topics: 150000,
        companies: 125000,
        fundings: 850000,
    };
};
type NodeId = 'institutions' | 'articles' | 'authors' | 'topics' | 'companies' | 'fundings';
type Statistics = Record<NodeId, number>;

// --- FIX: The 'icon' property is now a simple string identifier ---
// Updated titles to align with pitch deck terminology
const STAT_CONFIG: { id: NodeId; title: string; icon: string }[] = [
    { id: 'institutions', title: 'Institutions', icon: 'home' },
    { id: 'authors', title: 'Authors', icon: 'users' },
    { id: 'articles', title: 'Articles', icon: 'file-text' },
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
                            <span className="key-figures-header__primary">Europe's First</span>
                            {' '}
                            <span className="key-figures-header__gradient">Open-Source</span>
                            {' '}
                            <span className="key-figures-header__accent">Research Intelligence Platform</span>
                        </h2>
                        <p>
                            We empower{' '}
                            <span className="text-highlight">universities</span>,{' '}
                            <span className="text-highlight">researchers</span>, and{' '}
                            <span className="text-highlight">private companies</span>{' '}
                            to visualize the complex research landscape, identify{' '}
                            <span className="text-emphasis">collaboration opportunities</span>, and make smarter{' '}
                            <span className="text-emphasis">funding decisions</span> to accelerate innovation.
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