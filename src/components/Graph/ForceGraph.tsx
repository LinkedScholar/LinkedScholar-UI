import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../../styles/components/Graph/forceGraph.scss";
import { NodeDatum, LinkDatum } from "../../types/graphTypes";
import { createForceSimulation } from "../../utils/forceSimulation";

interface ForceGraphProps {
    nodes: NodeDatum[];
    links: LinkDatum[];
    onNodeClick: (node: NodeDatum | null) => void;
    gridActive: boolean;
    bfsPath: string[] | null;
    selectedAffiliations: string[];
}

const ForceGraph: React.FC<ForceGraphProps> = ({
                                                   nodes,
                                                   links,
                                                   onNodeClick,
                                                   gridActive,
                                                   bfsPath,
                                                   selectedAffiliations,
                                               }) => {
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
            const defs = svg.append("defs");
            const gridPattern = defs
                .append("pattern")
                .attr("id", "grid")
                .attr("width", gridSpacing)
                .attr("height", gridSpacing)
                .attr("patternUnits", "userSpaceOnUse");
            gridPattern
                .append("path")
                .attr("d", `M ${gridSpacing} 0 L 0 0 L 0 ${gridSpacing}`)
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .attr("stroke-width", 1);
            zoomGroup
                .insert("rect", ":first-child")
                .attr("x", -width)
                .attr("y", -height)
                .attr("width", width * 3)
                .attr("height", height * 3)
                .attr("fill", "url(#grid)");
        }

        // Zoom behavior
        svg.call(
            d3
                .zoom<SVGSVGElement, unknown>()
                .scaleExtent([0.5, 3])
                .filter((event) => event.type !== "dblclick" && event.target.tagName !== "circle")
                .on("zoom", (event) => {
                    zoomGroup.attr("transform", event.transform);
                    zoomGroup
                        .selectAll(".node-label")
                        .style("opacity", event.transform.k > 1 ? 1 : 0);
                })
        );

        // Create force simulation
        const simulation = createForceSimulation(nodes, links, width, height);

        // Add links
        const linkSelection = zoomGroup
            .append("g")
            .attr("class", "links")
            .selectAll<SVGLineElement, LinkDatum>("line")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke", "#ccc")
            .attr("stroke-opacity", 0.7)
            .attr("stroke-width", 1.5);

        // Create node groups
        const nodeGroup = zoomGroup
            .append("g")
            .attr("class", "nodes")
            .selectAll<SVGGElement, NodeDatum>("g")
            .data(nodes)
            .enter()
            .append("g")
            .call(
                d3
                    .drag<SVGGElement, NodeDatum>()
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

        // Add circle nodes with conditional styling:
        // - Researcher nodes: radius 16, class "researcher-node"
        // - Article nodes: radius 10, class "article-node"
        nodeGroup
            .append("circle")
            .attr("r", d => (d.type === "article" ? 10 : 16))
            .attr("stroke", "#003366")
            .attr("stroke-width", 2)
            .attr("class", d =>
                d.type === "article" ? "node article-node" : "node researcher-node"
            );

        // Append text labels:
        // - Researcher nodes show a short label (first word) permanently.
        // - Article nodes: leave the regular label empty.
        nodeGroup
            .append("text")
            .attr("class", "node-label")
            .attr("dy", 5)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "white")
            .style("pointer-events", "none")
            .style("font-weight", "bold")
            .text(d => (d.type === "researcher" ? (d.name ? d.name.split(" ")[0] : "") : ""))
            .style("opacity", d => (d.type === "researcher" ? 1 : 0));

        // For article nodes, append a tooltip group (initially hidden) that contains a rect and text.
        nodeGroup
            .filter(d => d.type === "article")
            .each(function(d) {
                const g = d3.select(this);
                const tooltip = g
                    .append("g")
                    .attr("class", "article-tooltip")
                    .style("opacity", 0);
                tooltip
                    .append("rect")
                    .attr("class", "tooltip-rect")
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("fill", "#0066cc"); // Secondary color
                tooltip
                    .append("text")
                    .attr("class", "tooltip-text")
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "14px")
                    .style("fill", "white")
                    .text(d.title || "");
            });


        nodeGroup.on("click", function (_, d) {
            if (d.type === "article") {
                // Do nothing for article nodes.
                return;
            }
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


        const updateHighlight = (selNode: NodeDatum | null) => {
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

            // Compute immediate neighbors of the selected node.
            const connectedNodes = new Set<NodeDatum>();
            const connectedLinks = new Set<LinkDatum>();
            if (selNode) {
                links.forEach(link => {
                    if (link.source === selNode || link.target === selNode) {
                        connectedNodes.add(link.source as NodeDatum);
                        connectedNodes.add(link.target as NodeDatum);
                        connectedLinks.add(link);
                    }
                });
                // For each article neighbor, add researcher nodes connected to that article.
                const extraResearcherNodes = new Set<NodeDatum>();
                connectedNodes.forEach(node => {
                    if (node.type === "article") {
                        links.forEach(link => {
                            if (link.source === node && (link.target as NodeDatum).type === "researcher" && (link.target as NodeDatum).id !== selNode.id) {
                                extraResearcherNodes.add(link.target as NodeDatum);
                            } else if (link.target === node && (link.source as NodeDatum).type === "researcher" && (link.source as NodeDatum).id !== selNode.id) {
                                extraResearcherNodes.add(link.source as NodeDatum);
                            }
                        });
                    }
                });
                extraResearcherNodes.forEach(r => connectedNodes.add(r));
            }

            nodeGroup
                .selectAll<SVGCircleElement, NodeDatum>("circle")
                .attr("fill", d => {
                    const nodeId = d.id.toString();
                    if (bfsSet.has(nodeId)) return "#32CD32"; // BFS highlight
                    if (selNode) {
                        if (d === selNode) return "#ffcc00"; // Selected node
                        if (connectedNodes.has(d)) return "#ffcc00"; // Neighbor highlight
                    }
                    if (selectedAffiliations.includes(d.affiliation as string)) return "#FF6347"; // Affiliation highlight
                    if (d.type === "article") return "#888888"; // Muted color for articles
                    return "#0066cc"; // Default color for researchers
                });

            linkSelection
                .attr("stroke", d => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) return "#32CD32";
                    if (selNode && connectedLinks.has(d)) return "#ff9900";
                    return "#ccc";
                })
                .attr("stroke-opacity", d => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) return 1;
                    if (selNode) return 0.1;
                    return 0.7;
                })
                .attr("stroke-width", d => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) return 3;
                    if (selNode && connectedLinks.has(d)) return 3;
                    return 1.5;
                });
        };

        nodeGroup.on("mouseover", function (_, d) {
            if (!selectedNode) updateHighlight(d);
        });
        nodeGroup.on("mouseout", function () {
            if (!selectedNode) updateHighlight(null);
        });
        updateHighlight(selectedNode);

        // Additional handlers for article nodes: show tooltip group on hover.
        nodeGroup
            .filter(d => d.type === "article")
            .on("mouseover", function (event, d) {
                const tooltip = d3.select(this).select("g.article-tooltip");
                // Position the tooltip above the node
                tooltip.attr("transform", "translate(0, -20)");
                // Get the bounding box of the tooltip text to size the rect accordingly.
                const textEl = tooltip.select("text.tooltip-text").node() as SVGTextElement;
                if (textEl) {
                    const bbox = textEl.getBBox();
                    tooltip
                        .select("rect.tooltip-rect")
                        .attr("x", bbox.x - 4)
                        .attr("y", bbox.y - 2)
                        .attr("width", bbox.width + 8)
                        .attr("height", bbox.height + 4);
                }
                tooltip.transition().duration(200).style("opacity", 1);
            })
            .on("mouseout", function () {
                d3.select(this).select("g.article-tooltip").transition().duration(200).style("opacity", 0);
            });

        simulation.on("tick", () => {
            linkSelection
                .attr("x1", d => (d.source as NodeDatum).x!)
                .attr("y1", d => (d.source as NodeDatum).y!)
                .attr("x2", d => (d.target as NodeDatum).x!)
                .attr("y2", d => (d.target as NodeDatum).y!);
            nodeGroup.attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            svg.attr("width", newWidth).attr("height", newHeight);
            simulation
                .force("center", d3.forceCenter(newWidth / 2, newHeight / 2))
                .alpha(1)
                .restart();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            simulation.stop();
            window.removeEventListener("resize", handleResize);
        };
    }, [nodes, links, gridActive, onNodeClick, selectedNode, bfsPath, selectedAffiliations]);

    return <svg ref={svgRef} className="force-graph-container" />;
};

export default ForceGraph;
