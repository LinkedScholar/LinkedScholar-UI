import React from "react";
import { LinkDatum, NodeDatum } from "../../types/graphTypes";

interface ForceGraphLinkProps {
    link: LinkDatum;
}

const ForceGraphLink: React.FC<ForceGraphLinkProps> = ({ link }) => {
    const source = link.source as NodeDatum;
    const target = link.target as NodeDatum;
    return (
        <line
            x1={source.x!}
            y1={source.y!}
            x2={target.x!}
            y2={target.y!}
            stroke="#aaa"
        />
    );
};

export default ForceGraphLink;
