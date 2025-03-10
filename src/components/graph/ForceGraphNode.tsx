import React from "react";
import { NodeDatum } from "../../types/graphTypes";

interface ForceGraphNodeProps {
    node: NodeDatum;
}

const ForceGraphNode: React.FC<ForceGraphNodeProps> = ({ node }) => {
    return <circle cx={node.x} cy={node.y} r={10} fill="#69b3a2" />;
};

export default ForceGraphNode;
