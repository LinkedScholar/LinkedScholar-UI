import React from "react";
import { NodeDatum } from "../../types/graphTypes";

interface ForceGraphNodeProps {
    node: NodeDatum;
}

const getShortLabel = (text: string): string[] => {
    if (!text) return [];
    const tokens = text.trim().split(" ");
    return tokens.length >= 2 ? [tokens[0], tokens[1].charAt(0) + "."] : [tokens[0]];
};

const ForceGraphNode: React.FC<ForceGraphNodeProps> = ({ node }) => {
    const label = getShortLabel(node.name).join(" ");
    const radius = label.length * 3.5 + 12;
    return (
        <>
            <circle cx={node.x} cy={node.y} r={radius} className="rv-force__node" />
            <text
                className="rv-force__label"
                x={node.x}
                y={node.y}
                dy={4}
                textAnchor="middle"
            >
                {label}
            </text>
        </>
    );
};

export default ForceGraphNode;
