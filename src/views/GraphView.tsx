import React, { useState, useRef, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ForceGraph, { ForceGraphHandle } from "../components/Graph/ForceGraph";
import Toolbar from "../components/Toolbar";
import ResearcherSidebar from "../components/Researcher-Sidebar/ResearcherSidebar";
import PathWindow from "../components/PathWindow";
import Filters from "../components/Filter-Sidebar/filters";
import { LinkDatum, NodeDatum } from "../types/graphTypes";
import { bfs } from "../utils/bfs";
import {getNetwork, getPath} from "../services/ApiGatewayService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/graphView.scss";
import { RootState } from "../redux/store";
import * as d3 from "d3";

interface NetworkData {
    nodes: NodeDatum[];
    links: LinkDatum[];
}

const GraphView: React.FC = () => {
    const location = useLocation();
    const rawNetworkData: any = location.state?.networkData;
    // Retrieve centerId passed from the Searcher view
    const centerId = location.state?.centerId;

    useEffect(() => {
        setPathWindowOpen(false);
        setFiltersActive(false);
        setBfsPath(null);
        setStartNode(null);
        setTargetNode(null);
    }, [rawNetworkData]);

    const computedNetworkData: NetworkData = useMemo(() => {
        if (!rawNetworkData) {
            return { nodes: [], links: [] };
        }
        if (rawNetworkData.authors && rawNetworkData.articles) {
            const authors: NodeDatum[] = rawNetworkData.authors.map((author: any) => ({
                ...author,
                type: "author",
            }));
            const articles: NodeDatum[] = rawNetworkData.articles.map((article: any) => ({
                id: article.id,
                type: "article",
                title: article.title,
                name: article.title,
            }));
            return {
                nodes: [...authors, ...articles],
                links: rawNetworkData.links,
            };
        }
        return rawNetworkData;
    }, [rawNetworkData]);

    const [graphData, setGraphData] = useState<NetworkData>(computedNetworkData);
    useEffect(() => {
        setGraphData(computedNetworkData);
    }, [computedNetworkData]);

    const affiliations = useMemo(() => {
        const affSet = new Set<string>();
        graphData.nodes.forEach((node) => {
            if (node.affiliation) {
                if (Array.isArray(node.affiliation)) {
                    node.affiliation.forEach((aff) => {
                        if (typeof aff === "string" && aff.trim() !== "") {
                            affSet.add(aff.trim());
                        }
                    });
                } else if (typeof node.affiliation === "string" && node.affiliation.trim() !== "") {
                    affSet.add(node.affiliation.trim());
                }
            }
        });
        return Array.from(affSet);
    }, [graphData]);

    const uniqueAffiliations = useMemo(() => {
        return Array.from(
            new Set(
                affiliations
                    .filter((aff) => typeof aff === "string")
                    .map((aff) => aff.trim())
                    .filter((aff) => aff !== "")
            )
        );
    }, [affiliations]);

    const colors = d3.schemeCategory10;
    const affiliationColorMap = useMemo(() => {
        const map: { [key: string]: string } = {};
        uniqueAffiliations.forEach((aff, i) => {
            map[aff] = colors[i % colors.length];
        });
        return map;
    }, [uniqueAffiliations]);

    const forceGraphRef = useRef<ForceGraphHandle | null>(null);
    const [selectedNode, setSelectedNode] = useState<NodeDatum | null>(null);
    const [gridActive, setGridActive] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);
    const [pathWindowOpen, setPathWindowOpen] = useState(false);
    const [startNode, setStartNode] = useState<{ value: string; label: string; id: string} | null>(null);
    const [targetNode, setTargetNode] = useState<{ value: string; label: string; id: string} | null>(null);
    const [bfsPath, setBfsPath] = useState<string[] | null>(null);
    const [targetType, setTargetType] = useState<"affiliation" | "author">("affiliation");
    const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>([]);
    const selectedNodeRef = useRef<NodeDatum | null>(null);
    const updateHighlightRef = useRef<(selNode: NodeDatum | null) => void>(() => {});

    const { authenticated } = useSelector((state: RootState) => state.auth);

    const handleNodeClick = (node: NodeDatum | null) => {
        setSelectedNode(node);
        if (node) {
            setStartNode({
                value: node.id.toString(),
                label: node.name || node.id.toString(),
                id: node.s2id || node.id.toString()
            });
        }
    };

    const handleCloseSidebar = () => {
        setSelectedNode(null);
        selectedNodeRef.current = null;
        if (updateHighlightRef.current) {
            console.log("disabling highlight");
            updateHighlightRef.current(null);
        }
    };

    const togglePathWindow = () => {
        setPathWindowOpen((prev) => !prev);
        if (!pathWindowOpen && filtersActive) {
            setFiltersActive(false);
        }
    };

    const handleExtendNetwork = async () => {
        if (!selectedNode?.s2id) return;
        try {
            const extendedData = await getNetwork(authenticated, selectedNode.name, "author", 1);
            const newAuthors = (extendedData.authors || []).map((a: any) => ({ ...a, type: "author" }));
            const newArticles = (extendedData.articles || []).map((a: any) => ({
                id: a.id,
                title: a.title,
                name: a.title,
                type: "article",
            }));
            const newLinks = extendedData.links || [];

            const incomingNodes = newAuthors.concat(newArticles);
            const existingNodes = graphData.nodes;

            const mergedNodes = [
                ...existingNodes.map((existingNode) => {
                    const incoming = incomingNodes.find((n: { id: string; }) => n.id === existingNode.id);
                    return incoming ? { ...existingNode, ...incoming } : existingNode;
                }),
                ...incomingNodes.filter((n: { id: string; }) => !existingNodes.some((e) => e.id === n.id))
            ];

            const mergedLinks = [...graphData.links];
            newLinks.forEach((l: LinkDatum) => {
                if (!mergedLinks.find((m) => m.source === l.source && m.target === l.target)) mergedLinks.push(l);
            });

            setGraphData({ nodes: mergedNodes, links: mergedLinks });
        } catch (error) {
            console.error("Error extending network:", error);
        }
    };

    const handleBfsSearch = async () => {
        if (!startNode || !targetNode) {
            return;
        }

        let updatedNodes = [...graphData.nodes];
        let updatedLinks = [...graphData.links];

        const startData = graphData.nodes.find(
            (n) => n.name === startNode.value || n.id.toString() === startNode.value
        );

        let targetData = null;
        if (targetType === "author") {
            targetData = graphData.nodes.find(
                (n) => n.name === targetNode.value || n.id.toString() === targetNode.value
            );
        }

        if (!startData || (targetType === "author" && !targetData) || (targetType === "affiliation" && !targetData)) {
            try {
                const newPathData = await getPath(authenticated, "s2id:"+startNode.id, targetNode.value, targetType);
                let parsedPathData = newPathData;
                if (typeof newPathData === "string") {
                    try {
                        parsedPathData = JSON.parse(newPathData);
                    } catch (e) {
                        console.error("Failed to parse getPath response:", e);
                        throw e;
                    }
                }
                let newNodes: any[] = [];
                if (parsedPathData.articles || parsedPathData.authors) {
                    if (parsedPathData.articles) {
                        newNodes = newNodes.concat(
                            parsedPathData.articles.map((article: any) => ({
                                id: article.id,
                                type: "article",
                                title: article.title,
                                name: article.title,
                            }))
                        );
                    }
                    if (parsedPathData.authors) {
                        newNodes = newNodes.concat(
                            parsedPathData.authors.map((author: any) => ({
                                ...author,
                                type: "author",
                            }))
                        );
                    }
                } else if (parsedPathData.nodes) {
                    newNodes = parsedPathData.nodes;
                }
                const newLinks = parsedPathData.links || [];
                newNodes.forEach((node: any) => {
                    if (!updatedNodes.find((n) => n.id === node.id)) {
                        updatedNodes.push(node);
                    }
                });
                newLinks.forEach((link: any) => {
                    updatedLinks.push(link);
                });
                setGraphData({ nodes: updatedNodes, links: updatedLinks });
            } catch (error) {
                console.error("Error fetching path:", error);
                return;
            }
        }

        const finalStartData = updatedNodes.find(
            (n) => n.name === startNode.value || n.id.toString() === startNode.value
        );
        const startId = finalStartData ? finalStartData.id : startNode.value;

        let targetValue: string;
        if (targetType === "author") {
            const finalTargetData = updatedNodes.find(
                (n) => n.name === targetNode.value || n.id.toString() === targetNode.value
            );
            if (!finalTargetData) {
                return;
            }
            targetValue = finalTargetData.id;
        } else {
            targetValue = targetNode.value;
        }

        const path = bfs(startId, targetValue, updatedNodes, updatedLinks, targetType);
        if (path) {
            setBfsPath(path);
        } else {
            setBfsPath(null);
        }

        // Mark and center the searched researcher node
        const researcherNode = updatedNodes.find(
            (node) => node.id.toString() === startId.toString()
        );
        if (researcherNode) {
            setSelectedNode(researcherNode);
            selectedNodeRef.current = researcherNode;
            if (updateHighlightRef.current) {
                updateHighlightRef.current(researcherNode);
            }
            forceGraphRef.current?.centerOnNode(researcherNode);
        }
    };

    const handleClearBfsSearch = () => {
        setStartNode(null);
        setTargetNode(null);
        setBfsPath(null);
    };

    const toggleFilters = () => {
        setFiltersActive((prev) => !prev);
        if (!filtersActive && pathWindowOpen) {
            setPathWindowOpen(false);
        }
    };

    // NEW: Once graph data is loaded, check if a centerId was passed and set that node as selected
    useEffect(() => {
        if (centerId && graphData.nodes.length > 0) {
            const centerNode = graphData.nodes.find(
                (node) => node.id.toString() === centerId.toString()
            );
            if (centerNode) {
                setSelectedNode(centerNode);
                selectedNodeRef.current = centerNode;
                if (updateHighlightRef.current) {
                    updateHighlightRef.current(centerNode);
                }
                forceGraphRef.current?.centerOnNode(centerNode);
            }
        }
    }, [centerId, graphData]);

    if (graphData.nodes.length === 0 && graphData.links.length === 0) {
        return <h2>No network data available</h2>;
    }

    return (
        <div className="graph-view-container">
            {/* Toolbar */}
            <div className="position-absolute" style={{ top: "100px", left: "80px", zIndex: 1000 }}>
                <Toolbar
                    gridActive={gridActive}
                    filtersActive={filtersActive}
                    pathWindowActive={pathWindowOpen}
                    toggleGrid={() => setGridActive((prev) => !prev)}
                    toggleFilters={toggleFilters}
                    togglePathWindow={togglePathWindow}
                    resetSimulation={() => forceGraphRef.current?.resetSimulation()}
                />
            </div>

            {/* Filters Sidebar */}
            {filtersActive && (
                <div className="position-absolute" style={{ top: "180px", left: "80px", zIndex: 1000 }}>
                    <Filters
                        affiliations={uniqueAffiliations}
                        selectedAffiliations={selectedAffiliations}
                        onFilterChange={setSelectedAffiliations}
                        onClose={() => setFiltersActive(false)}
                    />
                </div>
            )}

            {/* Path Window */}
            {pathWindowOpen && (
                <div className="position-absolute" style={{ top: "180px", left: "80px", zIndex: 1000 }}>
                    <PathWindow
                        bfsPath={bfsPath}
                        nodes={graphData.nodes}
                        expanded={true}
                        setExpanded={(expanded) => {
                            if (!expanded) setPathWindowOpen(false);
                        }}
                        startNode={startNode}
                        setStartNode={setStartNode}
                        targetType={targetType}
                        setTargetType={setTargetType}
                        targetNode={targetNode}
                        setTargetNode={setTargetNode}
                        handleSearch={handleBfsSearch}
                        handleClearSearch={handleClearBfsSearch}
                    />
                </div>
            )}

            {/* Main Graph */}
            <div className="graph-container">
                <ForceGraph
                    ref={forceGraphRef}
                    nodes={graphData.nodes}
                    links={graphData.links}
                    onNodeClick={handleNodeClick}
                    gridActive={gridActive}
                    bfsPath={bfsPath}
                    selectedAffiliations={selectedAffiliations}
                    affiliationColorMap={affiliationColorMap}
                    updateHighlightRef={updateHighlightRef}
                    selectedNodeRef={selectedNodeRef}
                />
            </div>

            <ResearcherSidebar
                selectedNode={selectedNode}
                onClose={handleCloseSidebar}
                onExtendNetwork={handleExtendNetwork}
            />
        </div>
    );
};

export default GraphView;
