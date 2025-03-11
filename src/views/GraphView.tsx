import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ForceGraph from "../components/Graph/ForceGraph";
import Toolbar from "../components/Toolbar";
import MiniSearcher from "../components/MiniSearcher";
import ResearcherSidebar from "../components/Researcher-Sidebar/ResearcherSidebar";
import PathWindow from "../components/PathWindow";
import { LinkDatum, NodeDatum } from "../types/graphTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/graphView.scss";

interface NetworkData {
    nodes: NodeDatum[];
    links: LinkDatum[];
}

const GraphView: React.FC = () => {
    const location = useLocation();
    const networkData: NetworkData | undefined = location.state?.networkData;
    const forceGraphRef = useRef<{ resetSimulation: () => void } | null>(null);

    const [selectedNode, setSelectedNode] = useState<NodeDatum | null>(null);
    const [gridActive, setGridActive] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);
    const [pathWindowOpen, setPathWindowOpen] = useState(false);
    const [startNode, setStartNode] = useState<{ value: string; label: string } | null>(null);
    const [targetNode, setTargetNode] = useState<{ value: string; label: string } | null>(null);
    const [bfsPath, setBfsPath] = useState<string[] | null>(null);
    const [targetType, setTargetType] = useState<"Affiliation" | "researcher">("Affiliation");

    if (!networkData) {
        return <h2>No network data available</h2>;
    }

    const handleNodeClick = (node: NodeDatum | null) => {
        setSelectedNode(node);
        if (node) {
            // Update start node when a different node is clicked.
            setStartNode({ value: node.id.toString(), label: node.name || node.id.toString() });
        }
    };

    const handleCloseSidebar = () => {
        setSelectedNode(null);
    };

    const togglePathWindow = () => {
        setPathWindowOpen((prev) => !prev);
    };

    const handleBfsSearch = () => {
        if (!startNode || !targetNode) {
            alert("Please select both start and end nodes.");
            return;
        }
        const startId = startNode.value;
        const endId = targetNode.value;

        // Build an adjacency list from the network data
        const adjList: { [key: string]: string[] } = {};
        networkData.nodes.forEach((node) => {
            const nodeId = node.id.toString();
            adjList[nodeId] = [];
        });
        networkData.links.forEach((link) => {
            const sourceId =
                typeof link.source === "object"
                    ? link.source.id.toString()
                    : link.source.toString();
            const targetId =
                typeof link.target === "object"
                    ? link.target.id.toString()
                    : link.target.toString();
            if (adjList[sourceId]) {
                adjList[sourceId].push(targetId);
            }
            if (adjList[targetId]) {
                adjList[targetId].push(sourceId);
            }
        });

        // Perform a breadth-first search (BFS)
        const queue: string[] = [startId];
        const visited = new Set<string>();
        const parent: { [key: string]: string | null } = {};
        visited.add(startId);
        parent[startId] = null;
        let found = false;
        while (queue.length > 0) {
            const current = queue.shift()!;
            if (current === endId) {
                found = true;
                break;
            }
            for (const neighbor of adjList[current] || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    parent[neighbor] = current;
                    queue.push(neighbor);
                }
            }
        }
        if (!found) {
            alert("No path found between the selected nodes.");
            setBfsPath(null);
            return;
        }
        // Reconstruct the path from end to start
        const path: string[] = [];
        let curr: string | null = endId;
        while (curr !== null) {
            path.push(curr);
            curr = parent[curr];
        }
        path.reverse();
        setBfsPath(path);
    };

    const handleClearBfsSearch = () => {
        setStartNode(null);
        setTargetNode(null);
        setBfsPath(null);
    };

    return (
        <div className="graph-view-container">
            <div className="container position-absolute start-50 translate-middle-x mt-5 pt-5">
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                        <MiniSearcher />
                    </div>
                    <div className="col-auto">
                        <Toolbar
                            gridActive={gridActive}
                            filtersActive={filtersActive}
                            pathWindowActive={pathWindowOpen}
                            toggleGrid={() => setGridActive((prev) => !prev)}
                            toggleFilters={() => setFiltersActive((prev) => !prev)}
                            togglePathWindow={togglePathWindow}
                            resetSimulation={() => forceGraphRef.current?.resetSimulation()}
                        />
                    </div>
                </div>
            </div>

            {pathWindowOpen && (
                <div
                    className="position-absolute"
                    style={{ top: "160px", left: "80px", zIndex: 1000 }}
                >
                    <PathWindow
                        bfsPath={bfsPath}
                        nodes={networkData.nodes}
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

            <div className="graph-container">
                <ForceGraph
                    nodes={networkData.nodes}
                    links={networkData.links}
                    onNodeClick={handleNodeClick}
                    gridActive={gridActive}
                />
            </div>

            <ResearcherSidebar selectedNode={selectedNode} onClose={handleCloseSidebar} />
        </div>
    );
};

export default GraphView;
