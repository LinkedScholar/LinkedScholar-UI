
import React from 'react';

const PLEXUS_NODES = [
    // Core hub nodes (central backbone)
    { id: 'core1', pos: { cx: 35, cy: 40 } },
    { id: 'core2', pos: { cx: 65, cy: 40 } },
    { id: 'core3', pos: { cx: 50, cy: 25 } },
    { id: 'core4', pos: { cx: 50, cy: 65 } },

    // Primary distribution nodes
    { id: 'dist1', pos: { cx: 20, cy: 20 } },
    { id: 'dist2', pos: { cx: 80, cy: 20 } },
    { id: 'dist3', pos: { cx: 15, cy: 60 } },
    { id: 'dist4', pos: { cx: 85, cy: 60 } },
    { id: 'dist5', pos: { cx: 35, cy: 10 } },
    { id: 'dist6', pos: { cx: 65, cy: 10 } },

    // Edge access nodes
    { id: 'edge1', pos: { cx: 5, cy: 15 } },
    { id: 'edge2', pos: { cx: 95, cy: 15 } },
    { id: 'edge3', pos: { cx: 5, cy: 45 } },
    { id: 'edge4', pos: { cx: 95, cy: 45 } },
    { id: 'edge5', pos: { cx: 25, cy: 85 } },
    { id: 'edge6', pos: { cx: 75, cy: 85 } },
    { id: 'edge7', pos: { cx: 10, cy: 75 } },
    { id: 'edge8', pos: { cx: 90, cy: 75 } },

    // Secondary nodes for redundancy
    { id: 'sec1', pos: { cx: 40, cy: 55 } },
    { id: 'sec2', pos: { cx: 60, cy: 55 } },
    { id: 'sec3', pos: { cx: 30, cy: 30 } },
    { id: 'sec4', pos: { cx: 70, cy: 30 } },
];

// Professional network topology with redundant paths
const PLEXUS_EDGES = [
    // Core backbone (high-capacity links)
    ['core1', 'core2'], ['core2', 'core3'], ['core3', 'core4'], ['core4', 'core1'],
    ['core1', 'core3'], ['core2', 'core4'], // Cross-connections for redundancy

    // Core to distribution layer
    ['core1', 'dist1'], ['core1', 'dist3'], ['core1', 'dist5'],
    ['core2', 'dist2'], ['core2', 'dist4'], ['core2', 'dist6'],
    ['core3', 'dist1'], ['core3', 'dist2'], ['core3', 'dist5'], ['core3', 'dist6'],
    ['core4', 'dist3'], ['core4', 'dist4'],

    // Distribution to edge
    ['dist1', 'edge1'], ['dist1', 'edge3'],
    ['dist2', 'edge2'], ['dist2', 'edge4'],
    ['dist3', 'edge3'], ['dist3', 'edge5'], ['dist3', 'edge7'],
    ['dist4', 'edge4'], ['dist4', 'edge6'], ['dist4', 'edge8'],
    ['dist5', 'edge1'], ['dist6', 'edge2'],

    // Secondary layer connections
    ['core1', 'sec1'], ['core1', 'sec3'],
    ['core2', 'sec2'], ['core2', 'sec4'],
    ['core4', 'sec1'], ['core4', 'sec2'],

    // Cross-layer redundancy
    ['sec1', 'dist3'], ['sec2', 'dist4'],
    ['sec3', 'dist1'], ['sec4', 'dist2'],

    // Edge redundancy
    ['edge5', 'edge7'], ['edge6', 'edge8'],
    ['dist3', 'sec1'], ['dist4', 'sec2'],
];

const getNodeById = (id: string) => PLEXUS_NODES.find(n => n.id === id);

const generateCurvePath = (sx: number, sy: number, ex: number, ey: number): string => {
    const distance = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
    const midX = (sx + ex) / 2;
    const midY = (sy + ey) / 2;

    // More subtle curves for professional look
    const curveFactor = Math.min(distance * 0.08, 3);
    const ctrlX = midX + (sy - ey) * curveFactor * 0.01;
    const ctrlY = midY + (ex - sx) * curveFactor * 0.01;

    return `M ${sx} ${sy} Q ${ctrlX} ${ctrlY} ${ex} ${ey}`;
};

const NetworkBackground = () => (
    <div className="network-background" aria-hidden="true">
        <svg className="network-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
                {/* Professional gradient scheme */}
                <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e40af" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="distGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>

                {/* Define all paths */}
                {PLEXUS_EDGES.map(([id1, id2], index) => {
                    const node1 = getNodeById(id1);
                    const node2 = getNodeById(id2);
                    if (!node1 || !node2) return null;
                    return (
                        <path
                            key={`path-${index}`}
                            id={`path-${index}`}
                            d={generateCurvePath(node1.pos.cx, node1.pos.cy, node2.pos.cx, node2.pos.cy)}
                        />
                    );
                })}
            </defs>

            {/* Network edges with professional styling */}
            {PLEXUS_EDGES.map((edge, index) => {
                const [id1, id2] = edge;
                const node1 = getNodeById(id1);
                const node2 = getNodeById(id2);
                if (!node1 || !node2) return null;

                const isCore = (id1.startsWith('core') && id2.startsWith('core'));
                const isDist = (id1.startsWith('core') && id2.startsWith('dist')) ||
                    (id1.startsWith('dist') && id2.startsWith('core'));

                return (
                    <g key={`edge-group-${index}`}>
                        {/* Static connection line */}
                        <line
                            x1={node1.pos.cx}
                            y1={node1.pos.cy}
                            x2={node2.pos.cx}
                            y2={node2.pos.cy}
                            className={`network-svg__line ${isCore ? 'network-svg__line--core' : isDist ? 'network-svg__line--dist' : 'network-svg__line--access'}`}
                            style={{ '--delay': `${index * 0.02}s` } as React.CSSProperties}
                        />
                        {/* Animated edge effect */}
                        <use
                            href={`#path-${index}`}
                            className={`network-svg__edge ${isCore ? 'network-svg__edge--core' : isDist ? 'network-svg__edge--dist' : 'network-svg__edge--access'}`}
                            style={{ '--delay': `${index * 0.03}s` } as React.CSSProperties}
                        />
                    </g>
                );
            })}

            {/* Data flow particles */}
            <g>
                {PLEXUS_EDGES.map((edge, index) => {
                    const [id1] = edge;
                    const isHighTraffic = id1.startsWith('core') || id1.startsWith('dist');

                    return (
                        <circle
                            key={`particle-${index}`}
                            r={isHighTraffic ? "1" : "0.6"}
                            fill="url(#coreGradient)"
                            className="network-svg__particle"
                            style={{ '--delay': `${index * 0.08}s` } as React.CSSProperties}
                        >
                            <animateMotion
                                dur={`${isHighTraffic ? 4 : 6 + (index % 3)}s`}
                                repeatCount="indefinite"
                            >
                                <mpath href={`#path-${index}`} />
                            </animateMotion>
                        </circle>
                    );
                })}
            </g>

            {/* Network nodes with hierarchical styling */}
            {PLEXUS_NODES.map((node, i) => {
                const nodeType = node.id.startsWith('core') ? 'core' :
                    node.id.startsWith('dist') ? 'dist' :
                        node.id.startsWith('sec') ? 'sec' : 'edge';

                const radius = nodeType === 'core' ? 3.5 :
                    nodeType === 'dist' ? 2.8 :
                        nodeType === 'sec' ? 2.2 : 1.8;

                return (
                    <circle
                        key={`node-${node.id}`}
                        cx={node.pos.cx}
                        cy={node.pos.cy}
                        r={radius}
                        className={`network-svg__node network-svg__node--${nodeType}`}
                        style={{ '--delay': `${0.3 + i * 0.04}s` } as React.CSSProperties}
                    />
                );
            })}
        </svg>
    </div>
);

export default NetworkBackground;