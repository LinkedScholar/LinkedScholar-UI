import React from "react";
import { LinkDatum } from "../../types/graphTypes";

interface ForceGraphLinkProps {
    link: LinkDatum;
}

const ForceGraphLink: React.FC<ForceGraphLinkProps> = ({ link }) => {
    return (
        <line
            x1={(link.source as any).x}
            y1={(link.source as any).y}
            x2={(link.target as any).x}
            y2={(link.target as any).y}
            stroke="#aaa"
        />
    );
};

export default ForceGraphLink;
