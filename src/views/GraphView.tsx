import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ForceGraph from "../components/graph/ForceGraph";
import Toolbar from "../components/Toolbar";
import MiniSearcher from "../components/MiniSearcher";
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

    const [gridActive, setGridActive] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);

    if (!networkData) {
        return <h2>No network data available</h2>;
    }

    const toggleGrid = () => setGridActive((prev) => !prev);
    const toggleFilters = () => setFiltersActive((prev) => !prev);
    const resetSimulation = () => forceGraphRef.current?.resetSimulation();

    return (
        <div className="graph-view-container">
            {/* Transparent Top Bar aligned with Navbar */}
            <div className="container position-absolute start-50 translate-middle-x mt-5 pt-5">
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                        <MiniSearcher />
                    </div>
                    <div className="col-auto">
                        <Toolbar
                            gridActive={gridActive}
                            filtersActive={filtersActive}
                            toggleGrid={toggleGrid}
                            toggleFilters={toggleFilters}
                            resetSimulation={resetSimulation}
                        />
                    </div>
                </div>
            </div>

            {/* Graph Content (Ensures Graph is visible) */}
            <div className="graph-container">
                <ForceGraph nodes={networkData.nodes} links={networkData.links} />
            </div>
        </div>
    );
};

export default GraphView;
