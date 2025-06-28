import React, { useEffect, useState, useRef } from 'react';
import '../../styles/components/Landing/KeyFigures.scss';
import NetworkBackground from './NetworkBackground';
import StatCard from './StatCard';
import InfoCard from './InfoCard';

// Mock API and types (same as before)
const getStatistics = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        institutions: 39000,
        articles: 6000000,
        authors: 10000000,
        topics: 150000,
        companies: 125000,
        fundings: 850000,
    };
};

type NodeId = 'institutions' | 'articles' | 'authors' | 'topics' | 'companies' | 'fundings';
type Statistics = Record<NodeId, number>;

const STAT_CONFIG: { id: NodeId; title: string; icon: string }[] = [
    { id: 'institutions', title: 'Institutions', icon: 'home' },
    { id: 'authors', title: 'Authors', icon: 'users' },
    { id: 'articles', title: 'Articles', icon: 'file-text' },
    { id: 'topics', title: 'Topics', icon: 'tag' },
    { id: 'companies', title: 'Companies', icon: 'briefcase' },
    { id: 'fundings', title: 'Projects', icon: 'briefcase' },
];

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
            
            {/* NEW STRUCTURE: Center-aligned hero section */}
            <div className="key-figures-hero">
                <div className="key-figures-hero-content">
                    {/* Main headline - center aligned */}
                    <div className="hero-headline">
                        <h1>
                            <span className="hero-headline__primary">Europe's First</span>
                            {' '}
                            <span className="hero-headline__gradient">Open-Source</span><br />
                            {' '}
                            <span className="hero-headline__primary">Research Intelligence Platform</span>
                        </h1>
                    </div>

                    {/* Body text - center aligned */}
                    <div className="hero-description">
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

                    {/* Key stats - center aligned */}
                    <div className={`hero-stats-grid ${isVisible ? 'is-visible' : ''}`} ref={gridRef}>
                        {STAT_CONFIG.map((stat, index) => (
                            <StatCard
                                key={stat.id}
                                icon={stat.icon}
                                title={stat.title}
                                value={stats ? stats[stat.id] : null}
                                isVisible={isVisible}
                                delayIndex={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* NEW: Secondary section with InfoCard */}
            <div className="key-figures-secondary">
                <div className="key-figures-secondary-content">
                    <InfoCard />
                </div>
            </div>
        </div>
    );
};

export default KeyFigures;