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
        fundings: 20000,
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
    { id: 'fundings', title: 'Funding & Tenders', icon: 'credit-card' },
];

const useOnScreen = (ref: React.RefObject<HTMLDivElement | null>, threshold = 0.1) => {
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

                    <div className="hero-content-card">
                        
                        <div className="hero-tagline">
                            <span className="hero-tagline__chip">
                                Living Networks of Knowledge
                            </span>
                        </div>

                        <div className="hero-headline">
                            <h1>
                                <span className="hero-headline__primary">The</span>
                                {' '}
                                <span className="hero-headline__gradient">Research Intelligence Platform</span><br />
                                {' '}
                                <span className="hero-headline__primary">for Institutional Decision-Making</span>
                            </h1>
                        </div>

                        <div className="hero-description">
                            LinkedScholar connects{' '}
                            <span className="text-highlight">research</span>,{' '}
                            <span className="text-highlight">innovation</span>, and{' '}
                            <span className="text-highlight">the market,</span>{' '}
                            by unifying institutional and external data sources into {' '}
                            <span className="text-emphasis">living networks of knowledge</span> {' '}
                            - AI-prepared, FAIR-compliant, and human-centered - while ensuring  {' '}
                            <span className="text-emphasis">data sovereignty remains within the institutions.</span>
                        </div>
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

            {/* NEW: Secondary section with InfoCard
            <div className="key-figures-secondary">
                <div className="key-figures-secondary-content">
                    <InfoCard />
                </div>
            </div>
             */}
        </div>
    );
};

export default KeyFigures;