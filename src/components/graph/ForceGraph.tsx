import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../../styles/components/Graph/forceGraph.scss";
import { NodeDatum, LinkDatum } from "../../types/graphTypes";
import { createForceSimulation } from "../../utils/forceSimulation";

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

        const width = window.innerWidth;
        const height = window.innerHeight;

        svg.attr("width", width).attr("height", height);

        // Create zoomable <g> group
        const zoomGroup = svg.append("g");

        // Enable zoom and pan
        svg.call(
            d3.zoom<SVGSVGElement, unknown>()
                .scaleExtent([0.5, 3])
                .on("zoom", (event) => {
                    zoomGroup.attr("transform", event.transform);
                    zoomGroup.selectAll(".node-label")
                        .style("opacity", event.transform.k > 1 ? 1 : 0);
                })
        );

        // Create force simulation
        const simulation = createForceSimulation(nodes, links, width, height);

        // Add links
        const linkSelection = zoomGroup.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke", "#ccc")
            .attr("stroke-opacity", 0.7)
            .attr("stroke-width", 1.5);

        // Create node groups
        const nodeGroup = zoomGroup.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(nodes)
            .enter()
            .append("g")
            .call(
                d3.drag<SVGGElement, NodeDatum>()
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

        // Add circle nodes
        nodeGroup.append("circle")
            .attr("r", 16) // Fixed size
            .attr("fill", "#0066cc")
            .attr("stroke", "#003366")
            .attr("stroke-width", 2);

        // Add labels inside nodes
        nodeGroup.append("text")
            .attr("class", "node-label")
            .attr("dy", 5)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "white")
            .style("pointer-events", "none")
            .style("font-weight", "bold")
            .text((d) => d.name.split(" ")[0]); // Shorten label

        // Simulation tick updates
        simulation.on("tick", () => {
            linkSelection
                .attr("x1", (d) => (d.source as NodeDatum).x!)
                .attr("y1", (d) => (d.source as NodeDatum).y!)
                .attr("x2", (d) => (d.target as NodeDatum).x!)
                .attr("y2", (d) => (d.target as NodeDatum).y!);

            nodeGroup.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
        });

        // Resize handling
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            svg.attr("width", newWidth).attr("height", newHeight);
            simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2)).alpha(1).restart();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            simulation.stop();
            window.removeEventListener("resize", handleResize);
        };
    }, [nodes, links]);

    return (
        <svg ref={svgRef} className="force-graph-container" />
    );
};

export default ForceGraph;
