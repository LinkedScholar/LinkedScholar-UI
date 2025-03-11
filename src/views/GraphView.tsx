import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ForceGraph from "../components/Graph/ForceGraph";
import Toolbar from "../components/Toolbar";
import MiniSearcher from "../components/MiniSearcher";
import ResearcherSidebar from "../components/Researcher-Sidebar/ResearcherSidebar";
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

    if (!networkData) {
        return <h2>No network data available</h2>;
    }

    const handleNodeClick = (node: NodeDatum) => {
        setSelectedNode(node);
    };

    const handleCloseSidebar = () => {
        setSelectedNode(null);
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
                            toggleGrid={() => setGridActive((prev) => !prev)}
                            toggleFilters={() => setFiltersActive((prev) => !prev)}
                            resetSimulation={() => forceGraphRef.current?.resetSimulation()}
                        />
                    </div>
                </div>
            </div>

            <div className="graph-container">
                <ForceGraph
                    nodes={networkData.nodes}
                    links={networkData.links}
                    onNodeClick={handleNodeClick}
                />
            </div>

            <ResearcherSidebar selectedNode={selectedNode} onClose={handleCloseSidebar} />
        </div>
    );
};

export default GraphView;
