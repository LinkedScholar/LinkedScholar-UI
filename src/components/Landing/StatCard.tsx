import React, { useRef, useEffect, useState } from 'react';
import { FiHome, FiUsers, FiFileText, FiTag, FiBriefcase, FiCreditCard } from 'react-icons/fi';

const CountUp = ({ end, duration = 2.5 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        const updateCount = () => {
            const now = Date.now();
            if (now >= endTime) { setCount(end); return; }
            const progress = (now - startTime) / (duration * 1000);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(end * easeOutQuart));
            frameRef.current = requestAnimationFrame(updateCount);
        };
        frameRef.current = requestAnimationFrame(updateCount);
        return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
    }, [end, duration]);

    const formatNumber = (num: number) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString('de-DE');
    };

    return <span>{formatNumber(count)}+</span>;
};

// Updated iconMap with cleaner credit card icon
const iconMap: { [key: string]: any } = {
    home: FiHome,
    users: FiUsers,
    'file-text': FiFileText,
    tag: FiTag,
    briefcase: FiBriefcase,
    'credit-card': FiCreditCard,
};

interface StatCardProps {
    icon: string;
    title: string;
    value: number | null;
    isVisible: boolean;
    delayIndex: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, isVisible, delayIndex }) => {
    const IconComponent = iconMap[icon];

    // Add debugging to see what's happening
    if (!IconComponent) {
        console.warn(`Icon "${icon}" not found in iconMap`);
        return null;
    }

    return (
        <div
            className="stat-card"
            style={{ '--delay-index': delayIndex } as React.CSSProperties}
        >
            <div className="stat-card__header">
                <IconComponent className="stat-card__icon" />
                <span className="stat-card__title">{title}</span>
            </div>
            <div className="stat-card__value">
                {value !== null && isVisible && <CountUp end={value} duration={5} />}
            </div>
        </div>
    );
};

export default StatCard;