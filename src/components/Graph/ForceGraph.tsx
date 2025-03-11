import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../../styles/components/Graph/forceGraph.scss";
import { NodeDatum, LinkDatum } from "../../types/graphTypes";
import { createForceSimulation } from "../../utils/forceSimulation";

interface ForceGraphProps {
    nodes: NodeDatum[];
    links: LinkDatum[];
    onNodeClick: (node: NodeDatum | null) => void; // Allow null for unselection
    gridActive: boolean;
}

const ForceGraph: React.FC<ForceGraphProps> = ({ nodes, links, onNodeClick, gridActive }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [selectedNode, setSelectedNode] = useState<NodeDatum | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = window.innerWidth;
        const height = window.innerHeight;
        svg.attr("width", width).attr("height", height);

        // Create zoomable <g> group
        const zoomGroup = svg.append("g");

        // Append grid lines if gridActive is true
        if (gridActive) {
            const gridGroup = zoomGroup.append("g").attr("class", "grid-lines");
            const gridSpacing = 50; // Adjust grid spacing as needed
            // Vertical grid lines
            for (let x = 0; x <= width; x += gridSpacing) {
                gridGroup.append("line")
                    .attr("x1", x)
                    .attr("y1", 0)
                    .attr("x2", x)
                    .attr("y2", height)
                    .attr("stroke", "#ccc")
                    .attr("stroke-width", 1);
            }
            // Horizontal grid lines
            for (let y = 0; y <= height; y += gridSpacing) {
                gridGroup.append("line")
                    .attr("x1", 0)
                    .attr("y1", y)
                    .attr("x2", width)
                    .attr("y2", y)
                    .attr("stroke", "#ccc")
                    .attr("stroke-width", 1);
            }
        }

        // Zoom behavior
        svg.call(
            d3.zoom<SVGSVGElement, unknown>()
                .scaleExtent([0.5, 3])
                .filter((event) => event.type !== "dblclick" && event.target.tagName !== "circle")
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
                    })
            );

        // Add circle nodes
        nodeGroup.append("circle")
            .attr("r", 16)
            .attr("fill", "#0066cc")
            .attr("stroke", "#003366")
            .attr("stroke-width", 2)
            .attr("class", "node");

        // Add labels inside nodes
        nodeGroup.append("text")
            .attr("class", "node-label")
            .attr("dy", 5)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "white")
            .style("pointer-events", "none")
            .style("font-weight", "bold")
            .text((d) => d.name.split(" ")[0]);

        // Node click event: toggle selection
        nodeGroup.on("click", function (_, d) {
            if (selectedNode === d) {
                d.fx = d.x;
                d.fy = d.y;
                setSelectedNode(null);
                onNodeClick(null);
            } else {
                d.fx = d.x;
                d.fy = d.y;
                setSelectedNode(d);
                onNodeClick(d);
            }
        });

        // Mouseover/out for highlighting
        const updateHighlight = (selectedNode: NodeDatum | null) => {
            const connectedNodes = new Set();
            const connectedLinks = new Set();
            if (selectedNode) {
                links.forEach((link) => {
                    if (link.source === selectedNode || link.target === selectedNode) {
                        connectedNodes.add(link.source);
                        connectedNodes.add(link.target);
                        connectedLinks.add(link);
                    }
                });
            }
            nodeGroup.selectAll("circle").attr("fill", selectedNode ? "#aaa" : "#0066cc");
            linkSelection.attr("stroke-opacity", selectedNode ? 0.1 : 0.7);
            if (selectedNode) {
                nodeGroup
                    .filter((n) => connectedNodes.has(n))
                    .selectAll("circle")
                    .attr("fill", "#ffcc00");
                linkSelection
                    .filter((l) => connectedLinks.has(l))
                    .attr("stroke", "#ff9900")
                    .attr("stroke-opacity", 1)
                    .attr("stroke-width", 3);
            }
        };

        nodeGroup.on("mouseover", function (_, d) {
            if (!selectedNode) updateHighlight(d);
        });
        nodeGroup.on("mouseout", function () {
            if (!selectedNode) updateHighlight(null);
        });
        updateHighlight(selectedNode);

        simulation.on("tick", () => {
            linkSelection
                .attr("x1", (d) => (d.source as NodeDatum).x!)
                .attr("y1", (d) => (d.source as NodeDatum).y!)
                .attr("x2", (d) => (d.target as NodeDatum).x!)
                .attr("y2", (d) => (d.target as NodeDatum).y!);
            nodeGroup.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
        });

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

    }, [nodes, links, gridActive, onNodeClick, selectedNode]);

    return <svg ref={svgRef} className="force-graph-container" />;
};

export default ForceGraph;
