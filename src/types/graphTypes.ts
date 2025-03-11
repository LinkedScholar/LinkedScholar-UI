import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

export interface NodeDatum extends SimulationNodeDatum {
    id: string;
    name: string;
    affiliation: string;
    fx?: number | null;
    fy?: number | null;
    fixed?: boolean;
}

export interface LinkDatum extends SimulationLinkDatum<NodeDatum> {
    source: NodeDatum | string;
    target: NodeDatum | string;
}