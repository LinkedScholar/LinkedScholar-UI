import React from "react";
import { NodeDatum } from "../../types/graphTypes";

interface ForceGraphNodeProps {
    node: NodeDatum;
    onNodeClick: (node: NodeDatum) => void;
}

const getShortLabel = (node: NodeDatum): string[] => {
    const text = node.type === "article" ? node.title || "" : node.name || "";
    if (!text) return [];
    const tokens = text.trim().split(" ");
    return tokens.length >= 2 ? [tokens[0], tokens[1].charAt(0) + "."] : [tokens[0]];
};

const ForceGraphNode: React.FC<ForceGraphNodeProps> = ({ node, onNodeClick }) => {
    const label = getShortLabel(node).join(" ");
    const radius = label.length * 3.5 + 12;

    return (
        <>
            <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                className="rv-force__node"
                onClick={(e) => {
                    e.stopPropagation();
                    onNodeClick(node);
                }}
                style={{ cursor: "pointer" }}
            />
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
