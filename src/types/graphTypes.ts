import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

export type NodeType = "researcher" | "article";

export interface NodeDatum extends SimulationNodeDatum {
    id: string;
    type: NodeType;
    name: string;
    affiliation?: string | undefined;
    title?: string;
    fx?: number | null;
    fy?: number | null;
    fixed?: boolean;
}

export interface LinkDatum extends SimulationLinkDatum<NodeDatum> {
    source: NodeDatum | string;
    target: NodeDatum | string;
}
