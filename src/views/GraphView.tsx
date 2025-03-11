import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ForceGraph from "../components/graph/ForceGraph";
import Toolbar from "../components/Toolbar";
import { LinkDatum, NodeDatum } from "../types/graphTypes";

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

    const toggleGrid = () => {
        setGridActive((prev) => !prev);
    };

    const toggleFilters = () => {
        setFiltersActive((prev) => !prev);
    };

    const resetSimulation = () => {
        if (forceGraphRef.current) {
            forceGraphRef.current.resetSimulation();
        }
    };

    return (
        <div className="graph-view-container">
            <div className="navbar-placeholder"></div>

            <div className="toolbar-container">
                <Toolbar
                    gridActive={gridActive}
                    filtersActive={filtersActive}
                    toggleGrid={toggleGrid}
                    toggleFilters={toggleFilters}
                    resetSimulation={resetSimulation}
                />
            </div>

            <div className="graph-container">
                <ForceGraph nodes={networkData.nodes} links={networkData.links} />
            </div>
        </div>
    );
};

export default GraphView;
