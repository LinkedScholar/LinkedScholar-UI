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
import { getNetwork, getPath } from "../services/ApiGatewayService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/graphView.scss";
import { RootState } from "../redux/store";
import * as d3 from "d3";
import {toast} from "sonner";
import RegistrationModal from "../components/modals/RegistrationModal";
import {registerErrorHandlers} from "../utils/errorHandler";

interface NetworkData {
    nodes: NodeDatum[];
    links: LinkDatum[];
}

interface GraphViewProps {
    clientId: string;
}

const GraphView: React.FC<GraphViewProps> = ({ clientId }) => {
    const location = useLocation();
    const rawNetworkData: any = location.state?.networkData;
    const centerId = location.state?.centerId;
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    const computedNetworkData: NetworkData = useMemo(() => {
        if (!rawNetworkData) return { nodes: [], links: [] };
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
            return { nodes: [...authors, ...articles], links: rawNetworkData.links };
        }
        return rawNetworkData;
    }, [rawNetworkData]);

    const [graphData, setGraphData] = useState<NetworkData>(computedNetworkData);
    const [selectedNode, setSelectedNode] = useState<NodeDatum | null>(null);
    const [gridActive, setGridActive] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);
    const [pathWindowOpen, setPathWindowOpen] = useState(false);
    const [startNode, setStartNode] = useState<{ value: string; label: string; id: string } | null>(null);
    const [targetNode, setTargetNode] = useState<{ value: string; label: string; id: string } | null>(null);
    const [bfsPath, setBfsPath] = useState<string[] | null>(null);
    const [targetType, setTargetType] = useState<"affiliation" | "author">("affiliation");
    const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>([]);
    const [initialCenterDone, setInitialCenterDone] = useState(false);

    const selectedNodeRef = useRef<NodeDatum | null>(null);
    const forceGraphRef = useRef<ForceGraphHandle | null>(null);
    const updateHighlightRef = useRef<(selNode: NodeDatum | null) => void>(() => {});

    const { authenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        registerErrorHandlers(
            setIsRegistrationModalOpen,
        );
    }, []);

    useEffect(() => {
        setPathWindowOpen(false);
        setFiltersActive(false);
        setBfsPath(null);
        setStartNode(null);
        setTargetNode(null);
        setInitialCenterDone(false);
    }, [rawNetworkData]);
    useEffect(() => {
        if (pathWindowOpen && selectedNode) {
            setStartNode({
                value: selectedNode.id.toString(),
                label: selectedNode.name || selectedNode.id.toString(),
                id: selectedNode.s2id || selectedNode.id.toString(),
            });
        }
    }, [pathWindowOpen, selectedNode]);
    useEffect(() => {
        setGraphData(computedNetworkData);
    }, [computedNetworkData]);

    useEffect(() => {
        document.body.classList.add('network-view-page');
        
        return () => {
            document.body.classList.remove('network-view-page');
        };
    }, []);

    const affiliations = useMemo(() => {
        const affSet = new Set<string>();
        graphData.nodes.forEach((node) => {
            if (node.affiliation) {
                if (Array.isArray(node.affiliation)) {
                    node.affiliation.forEach((aff) => {
                        if (typeof aff === "string" && aff.trim() !== "") affSet.add(aff.trim());
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

    const handleNodeClick = (node: NodeDatum | null) => {
        setSelectedNode(node);
        if (node) {
            setStartNode({
                value: node.id.toString(),
                label: node.name || node.id.toString(),
                id: node.s2id || node.id.toString(),
            });
        }
    };

    const handleCloseSidebar = () => {
        setSelectedNode(null);
        selectedNodeRef.current = null;
        if (updateHighlightRef.current) {
            updateHighlightRef.current(null);
        }
    };

    const togglePathWindow = () => {
        setPathWindowOpen((prev) => !prev);
        if (!pathWindowOpen && filtersActive) setFiltersActive(false);
    };

    const toggleFilters = () => {
        setFiltersActive((prev) => !prev);
        if (!filtersActive && pathWindowOpen) setPathWindowOpen(false);
    };

    const handleExtendNetwork = async () => {
        if (!selectedNode?.s2id) return;
        try {
            const extendedData = await getNetwork(authenticated, "s2id:" + selectedNode.s2id, "author", 1, clientId);
            const newAuthors = (extendedData.data.authors || []).map((a: any) => ({ ...a, type: "author" }));
            const newArticles = (extendedData.data.articles || []).map((a: any) => ({
                id: a.id,
                title: a.title,
                name: a.title,
                type: "article",
            }));
            const newLinks: LinkDatum[] = extendedData.data.links || [];

            const existingNodes = graphData.nodes;
            const incomingNodes = [...newAuthors, ...newArticles];
            const mergedNodes = [
                ...existingNodes,
                ...incomingNodes.filter((n) => !existingNodes.some((e) => e.id === n.id)),
            ];

            const existingLinks = graphData.links;
            const mergedLinks = [
                ...existingLinks,
                ...newLinks.filter(
                    (l) =>
                        !existingLinks.some(
                            (existing) => existing.source === l.source && existing.target === l.target
                        )
                ),
            ];

            setGraphData({ nodes: mergedNodes, links: mergedLinks });

            const updatedSelected = mergedNodes.find((n) => n.id === selectedNode.id);
            if (updatedSelected) {
                setSelectedNode(updatedSelected);
                selectedNodeRef.current = updatedSelected;
                if (updateHighlightRef.current) {
                    updateHighlightRef.current(null);
                    requestAnimationFrame(() => updateHighlightRef.current(updatedSelected));
                }
                forceGraphRef.current?.centerOnNode(updatedSelected);
            }
        } catch (error) {
            console.error("Error extending network:", error);
        }
    };

    const handleBfsSearch = async () => {
        if (!startNode || !targetNode) return;

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

        if (!targetData || (targetType === "author" && !targetData)) {
            try {
                const { data: newPathData, status } = await getPath(
                    authenticated,
                    "s2id:" + startNode.id,
                    targetNode.value,
                    targetType,
                    clientId
                );

                if (status === 204) {
                    const isAffiliationSearch = targetType === "affiliation";
                    const targetLabel = targetNode?.label || targetNode?.value;

                    toast(
                        <div>
                            <strong>Heads up!</strong>
                            <div style={{ marginTop: "0.5rem" }}>
                                {isAffiliationSearch ? (
                                    <>
                                        We couldn't find a path from{" "}
                                        <strong>{startNode?.label}</strong> to the{" "}
                                        <strong>{targetLabel}</strong> affiliation.
                                    </>
                                ) : (
                                    <>
                                        No visible connection found between{" "}
                                        <strong>{startNode?.label}</strong> and{" "}
                                        <strong>{targetLabel}</strong>.
                                    </>
                                )}
                            </div>
                            <div style={{ marginTop: "0.75rem" }}>
                                Try changing your selection, or{" "}
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="/contact"
                                    style={{
                                        color: "var(--primary-color)",
                                        textDecoration: "underline",
                                        fontWeight: "bold",
                                    }}
                                >
                                    contact us →
                                </a>
                            </div>
                        </div>,
                        {
                            position: "top-center",
                            className: "blue-toast",
                        }
                    );
                    return;
                }

                const parsed = typeof newPathData === "string" ? JSON.parse(newPathData) : newPathData;
                let newNodes: NodeDatum[] = [];

                if (parsed.articles) {
                    newNodes.push(
                        ...parsed.articles.map((article: any) => ({
                            id: article.id,
                            type: "article",
                            title: article.title,
                            name: article.title,
                        }))
                    );
                }
                if (parsed.authors) {
                    newNodes.push(...parsed.authors.map((author: any) => ({ ...author, type: "author" })));
                }
                if (parsed.nodes) {
                    newNodes.push(...parsed.nodes);
                }

                const newLinks = parsed.links || [];

                newNodes.forEach((node) => {
                    if (!updatedNodes.find((n) => n.id === node.id)) {
                        updatedNodes.push(node);
                    }
                });
                newLinks.forEach((link: LinkDatum) => updatedLinks.push(link));

                setGraphData({ nodes: updatedNodes, links: updatedLinks });
            } catch (e) {
                console.error("Error fetching path:", e);
                return;
            }
        }

        const startId = (graphData.nodes.find((n) => n.name === startNode.value || n.id.toString() === startNode.value)
            ?.id || startNode.value) as string;

        let targetValue: string;
        if (targetType === "author") {
            const t = updatedNodes.find((n) => n.name === targetNode.value || n.id.toString() === targetNode.value);
            if (!t) return;
            targetValue = t.id;
        } else {
            targetValue = targetNode.value;
        }

        const path = bfs(startId, targetValue, updatedNodes, updatedLinks, targetType);
        setBfsPath(path ?? null);

        const researcherNode = updatedNodes.find((node) => node.id.toString() === startId.toString());
        if (researcherNode) {
            setSelectedNode(researcherNode);
            selectedNodeRef.current = researcherNode;
            if (updateHighlightRef.current) updateHighlightRef.current(researcherNode);
            forceGraphRef.current?.centerOnNode(researcherNode);
        }
    };

    const handleClearBfsSearch = () => {
        setStartNode(null);
        setTargetNode(null);
        setBfsPath(null);
    };

    useEffect(() => {
        if (!initialCenterDone && centerId && computedNetworkData.nodes.length > 0) {
            const centerNode = computedNetworkData.nodes.find(
                (node) => node.id.toString() === centerId.toString()
            );
            if (centerNode) {
                setSelectedNode(centerNode);
                selectedNodeRef.current = centerNode;
                if (updateHighlightRef.current) updateHighlightRef.current(centerNode);
                forceGraphRef.current?.centerOnNode(centerNode);
                setInitialCenterDone(true);
            }
        }
    }, [centerId, computedNetworkData, initialCenterDone]);

    if (graphData.nodes.length === 0 && graphData.links.length === 0) {
        return <h2>No network data available</h2>;
    }

    return (
        <div className="graph-view-container">
            <div className="toolbar-container">
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

            {filtersActive && (
                <div className="sidebar-container">
                    <Filters
                        affiliations={uniqueAffiliations}
                        selectedAffiliations={selectedAffiliations}
                        onFilterChange={setSelectedAffiliations}
                        onClose={() => setFiltersActive(false)}
                    />
                </div>
            )}

            {pathWindowOpen && (
                <div className="sidebar-container">
                    <PathWindow
                        bfsPath={bfsPath}
                        nodes={graphData.nodes}
                        expanded={true}
                        setExpanded={(expanded) => !expanded && setPathWindowOpen(false)}
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

            <RegistrationModal
                isOpen={isRegistrationModalOpen}
                onClose={() => setIsRegistrationModalOpen(false)}
            />

            <div className="graph-note">
                This alpha version includes only authors with relevant publications (i.e., more than 10 citations) up to the year 2018.
                The final release will include all research data up to date.
            </div>
        </div>
    );
};

export default GraphView;
