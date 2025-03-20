import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import * as d3 from "d3";
import "../../styles/components/Graph/forceGraph.scss";
import { NodeDatum, LinkDatum } from "../../types/graphTypes";
import { createForceSimulation } from "../../utils/forceSimulation";

export interface ForceGraphHandle {
    resetSimulation: () => void;
    centerOnNode: (node: NodeDatum) => void;
}

interface ForceGraphProps {
    nodes: NodeDatum[];
    links: LinkDatum[];
    onNodeClick: (node: NodeDatum | null) => void;
    gridActive: boolean;
    bfsPath: string[] | null;
    selectedAffiliations: string[];
    affiliationColorMap?: { [key: string]: string };
    updateHighlightRef: React.RefObject<(selNode: NodeDatum | null) => void>;
    selectedNodeRef: React.RefObject<NodeDatum | null>;
}

const ForceGraph = forwardRef<ForceGraphHandle, ForceGraphProps>(({
                                                                      nodes,
                                                                      links,
                                                                      onNodeClick,
                                                                      gridActive,
                                                                      bfsPath,
                                                                      selectedAffiliations,
                                                                      affiliationColorMap,
                                                                      updateHighlightRef,
                                                                      selectedNodeRef,
                                                                  }, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const zoomGroupRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
    const gridRectRef = useRef<d3.Selection<SVGRectElement, unknown, null, undefined> | null>(null);
    const [selectedNode, setSelectedNode] = useState<NodeDatum | null>(null);
    const simulationRef = useRef<d3.Simulation<NodeDatum, undefined> | null>(null);

    // Store the zoom behavior in a ref for centering functionality
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

    // Hold the latest selected affiliations
    const selectedAffiliationsRef = useRef<string[]>(selectedAffiliations);
    useEffect(() => {
        selectedAffiliationsRef.current = selectedAffiliations;
    }, [selectedAffiliations]);

    useEffect(() => {
        selectedNodeRef.current = selectedNode;
    }, [selectedNode]);

    useEffect(() => {
        if (!svgRef.current || !zoomGroupRef.current) return;
        const svg = d3.select(svgRef.current);
        const width = window.innerWidth * 25;
        const height = window.innerHeight * 25;
        // Remove any existing grid
        if (gridRectRef.current) {
            gridRectRef.current.remove();
            gridRectRef.current = null;
        }
        if (gridActive) {
            const gridSpacing = 50;
            // Ensure the grid pattern is defined
            let defs = svg.select<SVGDefsElement>("defs");
            if (defs.empty()) {
                defs = svg.append<SVGDefsElement>("defs");
            }
            if (defs.select("#grid").empty()) {
                defs
                    .append<SVGPatternElement>("pattern")
                    .attr("id", "grid")
                    .attr("width", gridSpacing)
                    .attr("height", gridSpacing)
                    .attr("patternUnits", "userSpaceOnUse")
                    .append("path")
                    .attr("d", `M ${gridSpacing} 0 L 0 0 L 0 ${gridSpacing}`)
                    .attr("fill", "none")
                    .attr("stroke", "#ccc")
                    .attr("stroke-width", 1);
            }
            gridRectRef.current = zoomGroupRef.current
                .insert("rect", ":first-child")
                .attr("x", -width / 2)
                .attr("y", -height / 2)
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "url(#grid)")
                .style("pointer-events", "none");
        }
    }, [gridActive]);

    // Main simulation effect
    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = window.innerWidth;
        const height = window.innerHeight;
        svg.attr("width", width).attr("height", height);

        // Create defs for markers and gradients
        const defs = svg.append("defs");

        // Create arrowhead marker for BFS path
        defs.append("marker")
            .attr("id", "bfs-arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#32CD32");

        // Create glow filter for BFS path
        const filter = defs.append("filter")
            .attr("id", "glow")
            .attr("x", "-40%")
            .attr("y", "-40%")
            .attr("width", "180%")
            .attr("height", "180%");

        filter.append("feGaussianBlur")
            .attr("stdDeviation", "3")
            .attr("result", "blur");

        filter.append("feComposite")
            .attr("in", "SourceGraphic")
            .attr("in2", "blur")
            .attr("operator", "over");

        // Create zoom group
        const zoomGroup = svg.append("g");
        zoomGroupRef.current = zoomGroup;

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 3])
            .filter((event) => event.type !== "dblclick")
            .on("zoom", (event) => {
                zoomGroup.attr("transform", event.transform);
                zoomGroup
                    .selectAll(".node-label")
                    .transition()
                    .duration(100)
                    .style("opacity", event.transform.k > 0.6 ? 1 : 0);
            });
        svg.call(zoom);
        // Store zoom behavior for centering
        zoomRef.current = zoom;

        // Initialize all nodes with fixed positions after initial simulation
        nodes.forEach(node => {
            if (node.x === undefined || node.y === undefined) {
                node.x = Math.random() * width;
                node.y = Math.random() * height;
            }
            // Initially do not fix the positions to allow the simulation to run once
            node.fx = null;
            node.fy = null;
        });

        const simulation = createForceSimulation(nodes, links, width, height);
        simulationRef.current = simulation;

        // Group for BFS path (should be drawn below the regular links)
        const bfsPathGroup = zoomGroup.append("g").attr("class", "bfs-path-group");

        // Add regular links
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

        // Add nodes
        const nodeGroup = zoomGroup
            .append("g")
            .attr("class", "nodes")
            .selectAll<SVGGElement, NodeDatum>("g")
            .data(nodes)
            .enter()
            .append("g")
            .call(
                d3.drag<SVGGElement, NodeDatum>()
                    .on("start", function (event, d) {
                        if (!event.active) simulation.alphaTarget(0.1).restart();
                        // Only make the current node draggable
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on("drag", function (event, d) {
                        // Update only the dragged node
                        d.fx = event.x;
                        d.fy = event.y;
                        // Now 'this' correctly refers to the dragged DOM element
                        d3.select(this).attr("transform", `translate(${event.x}, ${event.y})`);

                        // Update connected links manually
                        linkSelection
                            .filter((link) => link.source === d || link.target === d)
                            .attr("x1", (link) => {
                                const src = link.source as NodeDatum;
                                return src.fx ?? src.x ?? 0;
                            })
                            .attr("y1", (link) => {
                                const src = link.source as NodeDatum;
                                return src.fy ?? src.y ?? 0;
                            })
                            .attr("x2", (link) => {
                                const tgt = link.target as NodeDatum;
                                return tgt.fx ?? tgt.x ?? 0;
                            })
                            .attr("y2", (link) => {
                                const tgt = link.target as NodeDatum;
                                return tgt.fy ?? tgt.y ?? 0;
                            });

                        // Update BFS path if it exists
                        if (bfsPath && bfsPath.length > 0) {
                            drawBfsPath();
                        }
                    })
                    .on("end", function (event, d) {
                        if (!event.active) simulation.alphaTarget(0);
                        // Keep the node fixed at its new position
                        d.x = d.fx ?? d.x;
                        d.y = d.fy ?? d.y;
                    })
            );

        nodeGroup
            .append("circle")
            .attr("r", (d) => (d.type === "article" ? 10 : 25))
            .attr("stroke", "#003366")
            .attr("stroke-width", 2)
            .attr("class", (d) =>
                d.type === "article" ? "node article-node" : "node researcher-node"
            );

        nodeGroup
            .append("text")
            .attr("class", "node-label")
            .attr("dy", 5)
            .attr("text-anchor", "middle")
            .style("font-size", (d) => (d.type === "author" ? "14px" : "12px"))
            .style("fill", "white")
            .style("pointer-events", "none")
            .style("font-weight", "bold")
            .text((d) =>
                d.type === "author" ? (d.name ? d.name.split(" ")[0] : "") : ""
            )
            .style("opacity", (d) => (d.type === "author" ? 1 : 0));

        // Draw BFS indices – only for non-publication nodes (skip articles)
        if (bfsPath && bfsPath.length > 0) {
            const bfsNodeIndices = zoomGroup.append("g").attr("class", "bfs-node-indices");
            let counter = 1;
            bfsPath.forEach((nodeId) => {
                const node = nodes.find((n) => n.id.toString() === nodeId);
                if (node && node.type !== "article") {
                    const g = nodeGroup.filter((d) => d.id.toString() === nodeId);
                    g.append("circle")
                        .attr("r", 12)
                        .attr("fill", "#32CD32")
                        .attr("stroke", "white")
                        .attr("stroke-width", 2)
                        .attr("class", "bfs-index-circle")
                        .attr("cx", 20)
                        .attr("cy", -20);
                    g.append("text")
                        .attr("class", "bfs-index-text")
                        .attr("x", 20)
                        .attr("y", -20)
                        .attr("dy", 4)
                        .attr("text-anchor", "middle")
                        .style("font-size", "12px")
                        .style("fill", "white")
                        .style("font-weight", "bold")
                        .text(counter);
                    counter++;
                }
            });
        }

        // Tooltip for article nodes
        nodeGroup
            .filter((d) => d.type === "article")
            .each(function (d) {
                const g = d3.select(this);
                const tooltip = g.append("g").attr("class", "article-tooltip").style("opacity", 0);
                tooltip
                    .append("rect")
                    .attr("class", "tooltip-rect")
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("fill", "#0066cc");
                tooltip
                    .append("text")
                    .attr("class", "tooltip-text")
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .style("font-size", "14px")
                    .style("fill", "white")
                    .text(d.title || "");
            });

        // Node click & hover events
        nodeGroup.on("click", function (event, d) {
            event.stopPropagation();
            if (d.type === "article") return;
            if (selectedNodeRef.current === d) {
                // Keep the position fixed when selected, just toggle selection status
                setSelectedNode(null);
                selectedNodeRef.current = null;
                onNodeClick(null);
            } else {
                // Fix the position but don't let the simulation move it
                d.fx = d.x;
                d.fy = d.y;
                setSelectedNode(d);
                selectedNodeRef.current = d;
                onNodeClick(d);
            }
            if (updateHighlightRef.current) {
                updateHighlightRef.current(selectedNodeRef.current);
            }
        });

        nodeGroup
            .filter((d) => d.type !== "article")
            .on("mouseover", function (event, d) {
                if (updateHighlightRef.current) {
                    updateHighlightRef.current(d);
                }
            })
            .on("mouseout", function () {
                if (updateHighlightRef.current) {
                    updateHighlightRef.current(selectedNodeRef.current);
                }
            });

        // Update highlight styling based on selected node and connections
        const updateHighlight = (selNode: NodeDatum | null) => {
            const bfsSet = bfsPath ? new Set(bfsPath.map((id) => id.toString())) : new Set<string>();
            const bfsLinkSet = new Set<string>();
            if (bfsPath && bfsPath.length > 1) {
                for (let i = 0; i < bfsPath.length - 1; i++) {
                    const a = bfsPath[i].toString();
                    const b = bfsPath[i + 1].toString();
                    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
                    bfsLinkSet.add(key);
                }
            }
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
                const extraResearcherNodes = new Set<NodeDatum>();
                connectedNodes.forEach((node) => {
                    if (node.type === "article") {
                        links.forEach((link) => {
                            if (
                                link.source === node &&
                                (link.target as NodeDatum).type === "author" &&
                                (link.target as NodeDatum).id !== selNode.id
                            ) {
                                extraResearcherNodes.add(link.target as NodeDatum);
                            } else if (
                                link.target === node &&
                                (link.source as NodeDatum).type === "author" &&
                                (link.source as NodeDatum).id !== selNode.id
                            ) {
                                extraResearcherNodes.add(link.source as NodeDatum);
                            }
                        });
                    }
                });
                extraResearcherNodes.forEach((r) => connectedNodes.add(r));
            }

            nodeGroup
                .selectAll<SVGCircleElement, NodeDatum>("circle.node")
                .attr("fill", (d) => {
                    if (selNode) {
                        if (d === selNode) return "#ffcc00";
                        if (connectedNodes.has(d)) return "#ffcc00";
                    }
                    if (d.type === "author" && selectedAffiliationsRef.current.length > 0) {
                        let match = false;
                        if (Array.isArray(d.affiliation)) {
                            match = d.affiliation.some((a) => selectedAffiliationsRef.current.includes(a));
                        } else {
                            if (d.affiliation != null) {
                                match = selectedAffiliationsRef.current.includes(d.affiliation);
                            }
                        }
                        if (!match) return "#d3d3d3";
                    }
                    if (d.affiliation && affiliationColorMap) {
                        if (Array.isArray(d.affiliation)) {
                            const foundAff = d.affiliation.find((a) => affiliationColorMap[a]);
                            if (foundAff) return affiliationColorMap[foundAff];
                        } else if (affiliationColorMap[d.affiliation]) {
                            return affiliationColorMap[d.affiliation];
                        }
                    }
                    if (d.type === "article") return "#888888";
                    return "#0066cc";
                })
                .attr("stroke", (d) => {
                    const nodeId = d.id.toString();
                    if (bfsSet.has(nodeId)) return "#32CD32";
                    if (selNode && (d === selNode || connectedNodes.has(d))) return "#ff9900";
                    return "#003366";
                })
                .attr("stroke-width", (d) => {
                    const nodeId = d.id.toString();
                    if (bfsSet.has(nodeId)) return 3;
                    if (selNode && (d === selNode || connectedNodes.has(d))) return 3;
                    return 2;
                })
                .attr("filter", (d) => {
                    const nodeId = d.id.toString();
                    if (bfsSet.has(nodeId)) return "url(#glow)";
                    return null;
                });

            linkSelection
                .attr("stroke", (d) => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) return "#32CD32";
                    if (selNode && connectedLinks.has(d)) return "#ff9900";
                    return "#ccc";
                })
                .attr("stroke-opacity", (d) => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) return 1;
                    if (selNode) return 0.5;
                    return 0.7;
                })
                .attr("stroke-width", (d) => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) return 3;
                    if (selNode && connectedLinks.has(d)) return 3;
                    return 1.5;
                })
                .attr("filter", (d) => {
                    const sourceId = (d.source as NodeDatum).id.toString();
                    const targetId = (d.target as NodeDatum).id.toString();
                    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
                    if (bfsLinkSet.has(key)) return "url(#glow)";
                    return null;
                });
        };

        updateHighlightRef.current = updateHighlight;
        updateHighlight(null);

        // Tooltip events for articles
        nodeGroup
            .filter((d) => d.type === "article")
            .on("mouseover", function (event, d) {
                const tooltip = d3.select(this).select("g.article-tooltip");
                tooltip.attr("transform", "translate(0, -20)");
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

        // Draw static BFS path function
        const drawBfsPath = () => {
            bfsPathGroup.selectAll("*").remove();

            if (bfsPath && bfsPath.length > 1) {
                // Create a mapping of node IDs to node data
                const nodeMap = new Map<string, NodeDatum>();
                nodes.forEach((node) => {
                    nodeMap.set(node.id.toString(), node);
                });

                // Build path data from all nodes (including publication nodes)
                const pathData: [number, number][] = [];
                bfsPath.forEach((nodeId) => {
                    const node = nodeMap.get(nodeId);
                    // Use fx/fy if they exist (for dragged nodes), otherwise use x/y
                    if (node) {
                        const nodeX = node.fx !== null ? node.fx : node.x;
                        const nodeY = node.fy !== null ? node.fy : node.y;
                        if (nodeX !== undefined && nodeY !== undefined) {
                            pathData.push([nodeX, nodeY]);
                        }
                    }
                });

                if (pathData.length > 1) {
                    const lineGenerator = d3.line();

                    bfsPathGroup
                        .append("path")
                        .attr("d", lineGenerator(pathData))
                        .attr("fill", "none")
                        .attr("stroke", "#32CD32")
                        .attr("stroke-width", 3)
                        .attr("stroke-opacity", 0.9)
                        .attr("stroke-dasharray", "5,5")
                        .attr("stroke-linecap", "round")
                        .attr("filter", "url(#glow)")
                        .attr("class", "bfs-path");

                    // Draw individual segments with arrows (using an offset of 25)
                    for (let i = 0; i < pathData.length - 1; i++) {
                        const start = pathData[i];
                        const end = pathData[i + 1];

                        const dx = end[0] - start[0];
                        const dy = end[1] - start[1];
                        const length = Math.sqrt(dx * dx + dy * dy);
                        const normalized_dx = dx / length;
                        const normalized_dy = dy / length;

                        const shortenedEnd = [
                            end[0] - normalized_dx * 25,
                            end[1] - normalized_dy * 25,
                        ];

                        bfsPathGroup
                            .append("line")
                            .attr("x1", start[0])
                            .attr("y1", start[1])
                            .attr("x2", shortenedEnd[0])
                            .attr("y2", shortenedEnd[1])
                            .attr("stroke", "#32CD32")
                            .attr("stroke-width", 3)
                            .attr("stroke-opacity", 0.9)
                            .attr("stroke-linecap", "round")
                            .attr("filter", "url(#glow)")
                            .attr("class", "bfs-segment");
                    }
                }
            }
        };

        // Run the simulation for a short time to get initial positions
        simulation.tick(100);

        // After the initial layout, fix all node positions
        setTimeout(() => {
            // Fix all nodes in place after initial layout
            nodes.forEach(node => {
                node.fx = node.x;
                node.fy = node.y;
            });

            // Stop the simulation
            simulation.stop();

            // Initial render with fixed positions
            linkSelection
                .attr("x1", (d) => (d.source as NodeDatum).x ?? 0)
                .attr("y1", (d) => (d.source as NodeDatum).y ?? 0)
                .attr("x2", (d) => (d.target as NodeDatum).x ?? 0)
                .attr("y2", (d) => (d.target as NodeDatum).y ?? 0);

            nodeGroup.attr("transform", (d) => `translate(${d.x}, ${d.y})`);

            // Draw the BFS path with fixed positions
            drawBfsPath();
        }, 100);

        simulation.on("tick", () => {
            linkSelection
                .attr("x1", (d) => {
                    const source = d.source as NodeDatum;
                    return source.fx ?? source.x ?? 0;
                })
                .attr("y1", (d) => {
                    const source = d.source as NodeDatum;
                    return source.fy ?? source.y ?? 0;
                })
                .attr("x2", (d) => {
                    const target = d.target as NodeDatum;
                    return target.fx ?? target.x ?? 0;
                })
                .attr("y2", (d) => {
                    const target = d.target as NodeDatum;
                    return target.fy ?? target.y ?? 0;
                });

            nodeGroup.attr("transform", (d) => {
                const x = d.fx ?? d.x ?? 0;
                const y = d.fy ?? d.y ?? 0;
                return `translate(${x}, ${y})`;
            });

            // Update the static BFS path on each tick
            drawBfsPath();
        });

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            svg.attr("width", newWidth).attr("height", newHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            simulation.stop();
            window.removeEventListener("resize", handleResize);
        };
    }, [nodes, links, bfsPath, affiliationColorMap]);

    useEffect(() => {
        if (updateHighlightRef.current) {
            updateHighlightRef.current(selectedNode);
        }
    }, [selectedAffiliations, selectedNode]);

    // Add a function to reset the graph layout
    const resetLayout = () => {
        if (simulationRef.current) {
            // Unfix all nodes
            nodes.forEach(node => {
                node.fx = null;
                node.fy = null;
            });

            // Restart simulation
            simulationRef.current.alpha(1).restart();

            // After layout, fix all positions again
            setTimeout(() => {
                nodes.forEach(node => {
                    node.fx = node.x;
                    node.fy = node.y;
                });
                simulationRef.current?.stop();
            }, 2000);
        }
    };

    // Expose resetSimulation and centerOnNode via the ref
    useImperativeHandle(ref, () => ({
        resetSimulation: () => resetLayout(),
        centerOnNode: (node: NodeDatum) => {
            if (!svgRef.current || !zoomRef.current) return;
            const svgEl = svgRef.current;
            const currentTransform = d3.zoomTransform(svgEl);
            const scale = currentTransform.k;
            const { clientWidth, clientHeight } = svgEl;
            const tx = clientWidth / 2 - (node.x ?? 0) * scale;
            const ty = clientHeight / 2 - (node.y ?? 0) * scale;
            const newTransform = d3.zoomIdentity.translate(tx, ty).scale(scale);
            d3.select(svgEl)
                .transition()
                .duration(750)
                .call(zoomRef.current.transform, newTransform);
        }
    }));

    return <svg ref={svgRef} className="force-graph-container" />;
});

export default ForceGraph;
