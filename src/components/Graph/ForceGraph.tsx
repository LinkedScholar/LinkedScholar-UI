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
    bfsPath: string[] | null;
}

const ForceGraph: React.FC<ForceGraphProps> = ({ nodes, links, onNodeClick, gridActive, bfsPath }) => {
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

        // Append infinite grid if gridActive is true
        if (gridActive) {
            const gridSpacing = 50; // Adjust grid spacing as needed

            // Define grid pattern
            const defs = svg.append("defs");
            const gridPattern = defs.append("pattern")
                .attr("id", "grid")
                .attr("width", gridSpacing)
                .attr("height", gridSpacing)
                .attr("patternUnits", "userSpaceOnUse");
            gridPattern.append("path")
                .attr("d", `M ${gridSpacing} 0 L 0 0 L 0 ${gridSpacing}`)
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .attr("stroke-width", 1);

            // Insert a rectangle with the grid pattern as fill that covers a large area
            zoomGroup.insert("rect", ":first-child")
                .attr("x", -width)
                .attr("y", -height)
                .attr("width", width * 3)
                .attr("height", height * 3)
                .attr("fill", "url(#grid)");
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

        // Add links with proper type annotation
        const linkSelection = zoomGroup.append("g")
            .attr("class", "links")
            .selectAll<SVGLineElement, LinkDatum>("line")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke", "#ccc")
            .attr("stroke-opacity", 0.7)
            .attr("stroke-width", 1.5);

        // Create node groups with proper type annotation
        const nodeGroup = zoomGroup.append("g")
            .attr("class", "nodes")
            .selectAll<SVGGElement, NodeDatum>("g")
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

        // Combined highlighting for selected node and BFS path
        const updateHighlight = (selNode: NodeDatum | null) => {
            // Build BFS sets if a BFS path exists
            const bfsSet = bfsPath ? new Set(bfsPath.map(id => id.toString())) : new Set<string>();
            const bfsLinkSet = new Set<string>();
            if (bfsPath && bfsPath.length > 1) {
                for (let i = 0; i < bfsPath.length - 1; i++) {
                    const a = bfsPath[i].toString();
                    const b = bfsPath[i + 1].toString();
                    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
                    bfsLinkSet.add(key);
                }
            }

            // Compute connected nodes for selected node (for neighbor highlighting)
            const connectedNodes = new Set<NodeDatum>();
            const connectedLinks = new Set<LinkDatum>();
            if (selNode) {
                links.forEach((link) => {
                    if (link.source === selNode || link.target === selNode) {
                        connectedNodes.add(link.source as NodeDatum);
                        connectedNodes.add(link.target as NodeDatum);
                        connectedLinks.add(link);
                    }
                });
            }

            // Update node fill colors using generic selection so d is typed as NodeDatum
            nodeGroup.selectAll<SVGCircleElement, NodeDatum>("circle")
                .attr("fill", (d) => {
                    const nodeId = d.id.toString();
                    if (bfsSet.has(nodeId)) {
                        return "#32CD32"; // BFS highlight color (green)
                    } else if (selNode) {
                        if (d === selNode) return "#ffcc00"; // Selected node color
                        if (connectedNodes.has(d)) return "#aaaaaa"; // Connected neighbor highlight
                        return "#0066cc"; // Default color
                    } else {
                        return "#0066cc"; // Default color
                    }
                });

            // Update link styling
            linkSelection
                .attr("stroke", (d) => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) {
                        return "#32CD32"; // BFS link highlight color
                    } else if (selNode && connectedLinks.has(d)) {
                        return "#ff9900"; // Neighbor link highlight for selected node
                    } else {
                        return "#ccc"; // Default link color
                    }
                })
                .attr("stroke-opacity", (d) => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) {
                        return 1;
                    } else if (selNode) {
                        return 0.1;
                    } else {
                        return 0.7;
                    }
                })
                .attr("stroke-width", (d) => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) {
                        return 3;
                    } else if (selNode && connectedLinks.has(d)) {
                        return 3;
                    } else {
                        return 1.5;
                    }
                });
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
    }, [nodes, links, gridActive, onNodeClick, selectedNode, bfsPath]);

    return <svg ref={svgRef} className="force-graph-container" />;
};

export default ForceGraph;
