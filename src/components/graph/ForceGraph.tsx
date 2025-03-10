import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { NodeDatum, LinkDatum } from "../../types/graphTypes";

interface ForceGraphProps {
    nodes: NodeDatum[];
    links: LinkDatum[];
}

const ForceGraph: React.FC<ForceGraphProps> = ({ nodes, links }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        const simulation = d3
            .forceSimulation<NodeDatum>(nodes)
            .force("link", d3.forceLink<NodeDatum, LinkDatum>(links).id((d) => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const linkSelection = svg
            .append("g")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "#aaa");

        const nodeSelection = svg
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("fill", "#69b3a2")
            .call(
                d3.drag<SVGCircleElement, NodeDatum>()
                    .on("start", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on("drag", (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on("end", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        nodeSelection.append("title").text((d) => d.name);

        simulation.on("tick", () => {
            linkSelection
                .attr("x1", (d) => (d.source as NodeDatum).x!)
                .attr("y1", (d) => (d.source as NodeDatum).y!)
                .attr("x2", (d) => (d.target as NodeDatum).x!)
                .attr("y2", (d) => (d.target as NodeDatum).y!);

            nodeSelection.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
        });

        return () => {
            simulation.stop();
        };
    }, [nodes, links]);

    return <svg ref={svgRef} style={{ width: "100%", height: "80vh" }} />;
};

export default ForceGraph;
