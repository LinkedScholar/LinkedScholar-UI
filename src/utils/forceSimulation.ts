import * as d3 from "d3";
import { NodeDatum, LinkDatum } from "../types/graphTypes";

export const createForceSimulation = (
    nodes: NodeDatum[],
    links: LinkDatum[],
    width: number,
    height: number
) => {
    return d3
        .forceSimulation<NodeDatum>(nodes)
        .force("link", d3.forceLink<NodeDatum, LinkDatum>(links)
            .id((d) => d.id)
            .distance(120)
        )
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(15));
};
